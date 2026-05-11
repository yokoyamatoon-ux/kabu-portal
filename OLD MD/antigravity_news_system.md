# Antigravity 実装プロンプト
## ニュースシステム全面刷新：RSS自動取得 ＋ ホーム固定4枠 ＋ ニュース一覧ページ

---

## 前提ルール（毎回必須）

HTMLを表示する場合は必ず `st.markdown(html, unsafe_allow_html=True)` を使うこと。
`st.write()` や `st.text()` は絶対に使わないこと。

---

## 全体設計

```
ホーム
└ ニュース4枠（固定カテゴリ・常に最新1件ずつ表示）
  ├ 日本の株価（日経電子版RSSから最新1件）
  ├ 注目の銘柄（Reuters日本語RSSから最新1件）
  ├ 初心者向け（NISAタグ記事から最新1件）
  └ 海外の株価（Bloomberg日本語RSSから最新1件）

ナビゲーション（4ページに拡張）
├ 🏠 ホーム
├ 📰 ニュース一覧　← 新規追加
├ 🔍 探す・シミュレーション
└ 📖 学ぶ・遊ぶ
```

---

## 実装① `modules/news_unit.py` を全面書き換え

```python
import streamlit as st
import feedparser
import base64
import os
from datetime import datetime

# -----------------------------------------------
# RSS フィード定義
# カテゴリ → RSSソース のマッピング
# -----------------------------------------------
RSS_SOURCES = {
    "日本の株価": [
        "https://www.minkabu.co.jp/news/rss",          # みんかぶ（安定）
        "https://kabutan.jp/rss/news",                     # 株探
    ],
    "注目の銘柄": [
        "https://www.minkabu.co.jp/news/rss/attention",  # みんかぶ注目銘柄
        "https://kabutan.jp/rss/hot",                      # 株探・注目
    ],
    "初心者・NISA": [
        "https://media.rakuten-sec.net/rss",          # 楽天証券メディア（NISA記事多め）
        "https://www.toushin.com/rss/",                    # 投信ドットコム
    ],
    "海外の株価": [
        "https://www.minkabu.co.jp/news/rss/us",             # みんかぶ米国株
        "https://kabutan.jp/rss/foreign",                # 株探・海外
    ],
}

# RSSが取得できない場合のモックデータ（フォールバック用）
MOCK_NEWS = {
    "日本の株価": {
        "title": "日経平均、半導体関連が牽引し続伸",
        "url": "https://www.nikkei.com",
        "date": "2026/03/12",
        "summary": "東京株式市場で日経平均株価が上昇。半導体関連銘柄が相場を牽引した。",
    },
    "注目の銘柄": {
        "title": "AI銘柄への資金流入が加速、専門家は「第3波」と指摘",
        "url": "https://jp.reuters.com",
        "date": "2026/03/11",
        "summary": "生成AIブームが第3フェーズに突入し、関連銘柄への機関投資家の買いが加速している。",
    },
    "初心者・NISA": {
        "title": "新NISA活用術：初心者が最初に買うべき3つのETF",
        "url": "https://www.nikkei.com",
        "date": "2026/03/10",
        "summary": "新NISAを始めたばかりの初心者が最初に検討すべきETFを専門家が解説。",
    },
    "海外の株価": {
        "title": "米S&P500が最高値更新、利下げ期待で買い優勢",
        "url": "https://www.bloomberg.co.jp",
        "date": "2026/03/12",
        "summary": "ニューヨーク株式市場でS&P500指数が最高値を更新。FRBの利下げ観測が追い風となった。",
    },
}

# カテゴリ設定（バナー画像・絵文字・色）
CATEGORY_CONFIG = {
    "日本の株価": {
        "icon": "🇯🇵",
        "color": "#FF6B6B",
        "bg": "linear-gradient(135deg, #FFE8E8, #FFF0F0)",
        "banner_path": r"D:\Antigravity\Kabu\image\kabuka_J.png"
    },
    "注目の銘柄": {
        "icon": "🔥",
        "color": "#FF9F43",
        "bg": "linear-gradient(135deg, #FFF0E0, #FFF8E8)",
        "banner_path": r"D:\Antigravity\Kabu\image\meigara.png"
    },
    "初心者・NISA": {
        "icon": "🌱",
        "color": "#00B894",
        "bg": "linear-gradient(135deg, #E8FFF0, #F0FFF8)",
        "banner_path": r"D:\Antigravity\Kabu\image\NISA.png"
    },
    "海外の株価": {
        "icon": "🌍",
        "color": "#4ECDC4",
        "bg": "linear-gradient(135deg, #E8FFFF, #F0FFFF)",
        "banner_path": r"D:\Antigravity\Kabu\image\kaigai.png"
    },
}


def get_image_base64(path: str) -> str:
    try:
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode()
    except:
        return ""


@st.cache_data(ttl=1800)  # 30分キャッシュ（RSSを頻繁に叩かない）
def fetch_latest_news_by_category() -> dict:
    """
    各カテゴリのRSSから最新1件を取得して返す。
    取得失敗した場合はMOCK_NEWSを返す。
    """
    result = {}

    for category, rss_urls in RSS_SOURCES.items():
        fetched = None
        for url in rss_urls:
            try:
                feed = feedparser.parse(url)
                if feed.entries:
                    entry = feed.entries[0]
                    fetched = {
                        "title":   entry.get("title", ""),
                        "url":     entry.get("link", "#"),
                        "date":    entry.get("published", "")[:10] if entry.get("published") else "",
                        "summary": entry.get("summary", "")[:120] + "..." if entry.get("summary") else "",
                    }
                    break
            except:
                continue

        result[category] = fetched if fetched else MOCK_NEWS.get(category, {})

    return result


@st.cache_data(ttl=1800)
def fetch_all_news() -> dict:
    """
    ニュース一覧ページ用：各カテゴリから最大10件取得
    """
    result = {}

    for category, rss_urls in RSS_SOURCES.items():
        articles = []
        for url in rss_urls:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries[:10]:
                    articles.append({
                        "title":    entry.get("title", ""),
                        "url":      entry.get("link", "#"),
                        "date":     entry.get("published", "")[:10] if entry.get("published") else "",
                        "summary":  entry.get("summary", "")[:100] + "..." if entry.get("summary") else "",
                        "category": category,
                    })
                if articles:
                    break
            except:
                continue

        # フォールバック
        if not articles:
            mock = MOCK_NEWS.get(category)
            if mock:
                articles = [{**mock, "category": category}]

        result[category] = articles

    return result


# -----------------------------------------------
# ホーム用：固定4枠ニュース表示
# -----------------------------------------------
def render_home_news():
    """ホームに固定4カテゴリの最新ニュースを表示"""

    st.markdown('<div class="section-title">📰 今日の株ニュース</div>',
                unsafe_allow_html=True)

    news_data = fetch_latest_news_by_category()

    st.markdown("""
    <style>
    .home-news-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    @media (max-width: 960px) { .home-news-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .home-news-grid { grid-template-columns: 1fr; } }

    .hnews-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.07);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .hnews-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

    .hnews-thumb {
      width: 100%; height: 120px;
      display: flex; align-items: center; justify-content: center;
      font-size: 3rem;
    }
    .hnews-thumb img { width: 100%; height: 120px; object-fit: cover; }

    /* スマホはサムネイル非表示・横長テキストカード */
    @media (max-width: 640px) {
      .hnews-thumb { display: none !important; }
      .hnews-card { border-radius: 12px; }
    }

    .hnews-body { padding: 12px 14px 14px; }
    .hnews-category {
      display: inline-block;
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 0.72rem;
      font-weight: 800;
      color: white;
      margin-bottom: 6px;
    }
    .hnews-date { font-size: 0.72rem; color: #aaa; margin-bottom: 4px; }
    .hnews-title {
      font-size: 0.88rem; font-weight: 700;
      color: #2D3436; line-height: 1.5; margin-bottom: 10px;
    }
    .hnews-title a { color: #2D3436; text-decoration: none; }
    .hnews-title a:hover { color: #FF6B6B; }
    .hnews-ask-btn {
      background: #FFF9F0;
      border: 2px solid #FFE082;
      border-radius: 20px;
      padding: 5px 14px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      color: #2D3436;
    }
    .hnews-ask-btn:hover { background: #FFF0D0; }
    </style>
    """, unsafe_allow_html=True)

    # モーダル
    st.markdown("""
    <div class="kabu-modal-overlay" id="kabuModalHome">
      <div class="kabu-modal">
        <button class="kabu-modal-close" onclick="document.getElementById('kabuModalHome').classList.remove('open')">✕</button>
        <div style="font-weight:800;font-size:1rem;margin-bottom:12px;">🌿 カブ博士のやさしい解説</div>
        <div class="kabu-modal-body">
          <div style="font-size:2.5rem;flex-shrink:0;">🥬</div>
          <div class="kabu-modal-text" id="kabuModalHomeText">読み込み中...</div>
        </div>
      </div>
    </div>
    <script>
    const homeExplanations = {};
    function openHomeModal(idx) {
      document.getElementById("kabuModalHomeText").innerHTML = homeExplanations[idx] || "解説を準備中じゃ...";
      document.getElementById("kabuModalHome").classList.add("open");
    }
    document.getElementById("kabuModalHome").addEventListener("click", function(e) {
      if (e.target === this) this.classList.remove("open");
    });
    </script>
    """, unsafe_allow_html=True)

    cards_html = '<div class="home-news-grid">'
    explanations_js = ""

    for i, (category, news) in enumerate(news_data.items()):
        cfg = CATEGORY_CONFIG[category]

        # サムネイル
        if cfg.get("banner_path"):
            b64 = get_image_base64(cfg["banner_path"])
            thumb_html = (
                f'<img src="data:image/png;base64,{b64}">'
                if b64 else
                f'<div style="height:120px;background:{cfg["bg"]};display:flex;align-items:center;justify-content:center;font-size:3.5rem;">{cfg["icon"]}</div>'
            )
        else:
            thumb_html = f'<div style="height:120px;background:{cfg["bg"]};display:flex;align-items:center;justify-content:center;font-size:3.5rem;">{cfg["icon"]}</div>'

        explanation = (
            f"「{news.get('title','')}」の解説じゃ！<br><br>"
            f"{news.get('summary','')}<br><br>"
            f"このカテゴリは<b>「{category}」</b>に関するニュースじゃぞ。"
            f"毎日チェックして市場の流れを掴もう！"
        )
        # JSのバッククォート内でシングルクォートに変換
        explanations_js += f"homeExplanations[{i}] = `{explanation.replace('`', chr(39))}`;\n"

        cards_html += f"""
        <div class="hnews-card">
          <div class="hnews-thumb">{thumb_html}</div>
          <div class="hnews-body">
            <span class="hnews-category" style="background:{cfg['color']};">{cfg['icon']} {category}</span>
            <div class="hnews-date">{news.get('date','')}</div>
            <div class="hnews-title">
              <a href="{news.get('url','#')}" target="_blank" rel="noopener">{news.get('title','')}</a>
            </div>
            <button class="hnews-ask-btn" onclick="openHomeModal({i})">🥬 カブ博士に聞く</button>
          </div>
        </div>
        """

    cards_html += f"</div><script>{explanations_js}</script>"
    st.markdown(cards_html, unsafe_allow_html=True)


# -----------------------------------------------
# ニュース一覧ページ
# -----------------------------------------------
def render_news_list_page():
    """ニュース一覧ページ：カテゴリタブで全記事を表示"""

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;">📰 ニュース一覧</h2>',
                unsafe_allow_html=True)

    all_news = fetch_all_news()
    categories = list(all_news.keys())

    # Streamlit のタブで切り替え
    tabs = st.tabs([f"{CATEGORY_CONFIG[c]['icon']} {c}" for c in categories])

    for tab, category in zip(tabs, categories):
        with tab:
            articles = all_news[category]
            cfg = CATEGORY_CONFIG[category]

            if not articles:
                st.info("現在ニュースを取得できませんでした。しばらくしてから再読み込みしてください。")
                continue

            for article in articles:
                st.markdown(f"""
                <div style="
                  background: white;
                  border-radius: 14px;
                  padding: 14px 18px;
                  margin-bottom: 10px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                  border-left: 4px solid {cfg['color']};
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 16px;
                ">
                  <div style="flex:1;">
                    <div style="font-size:0.72rem;color:#aaa;margin-bottom:4px;">{article.get('date','')}</div>
                    <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px;">
                      <a href="{article.get('url','#')}" target="_blank" rel="noopener"
                         style="color:#2D3436;text-decoration:none;">
                        {article.get('title','')}
                      </a>
                    </div>
                    <div style="font-size:0.82rem;color:#636E72;line-height:1.6;">
                      {article.get('summary','')}
                    </div>
                  </div>
                  <a href="{article.get('url','#')}" target="_blank" rel="noopener"
                     style="
                       background:{cfg['color']};color:white;border-radius:20px;
                       padding:6px 16px;font-size:0.78rem;font-weight:700;
                       text-decoration:none;white-space:nowrap;flex-shrink:0;
                     ">詳しく見る →</a>
                </div>
                """, unsafe_allow_html=True)

            # 更新ボタン
            if st.button(f"🔄 {category}を再取得", key=f"refresh_{category}"):
                st.cache_data.clear()
                st.rerun()
```

---

## 実装② `app.py` のナビゲーションを4ページに拡張

### 修正場所
`app.py` の `pages` 辞書と `current_page` の分岐処理を以下に変更してください。

```python
# ページ定義を4つに拡張
pages = {
    "home":    {"label": "🏠 ホーム"},
    "news":    {"label": "📰 ニュース"},   # ← 新規追加
    "explore": {"label": "🔍 探す"},
    "learn":   {"label": "📖 学ぶ"},
}

# サイドバーのナビボタン（4つに拡張）
with st.sidebar:
    for key, info in pages.items():
        is_active = st.session_state.get("current_page") == key
        if st.button(info["label"], key=f"sb_{key}",
                     use_container_width=True,
                     type="primary" if is_active else "secondary"):
            st.session_state.current_page = key
            st.rerun()

# ページ描画の分岐に追加
current = st.session_state.get("current_page", "home")

if current == "home":
    render_home_page()
elif current == "news":
    from modules.news_unit import render_news_list_page
    render_news_list_page()
elif current == "explore":
    render_explore_page()
elif current == "learn":
    render_learn_page()
```

---

## 実装③ `requirements.txt` に追加

```
feedparser
```

インストールコマンド：
```
pip install feedparser
```

---

## バナー画像の差し替え方（後からでもOK）

バナー画像が用意できたら `CATEGORY_CONFIG` の `banner_path` にパスを入れるだけ：

```python
"日本の株価": {
    "banner_path": r"D:\Antigravity\Kabu\image\banner_japan.png",
},
"注目の銘柄": {
    "banner_path": r"D:\Antigravity\Kabu\image\banner_hot.png",
},
"初心者・NISA": {
    "banner_path": r"D:\Antigravity\Kabu\image\banner_nisa.png",
},
"海外の株価": {
    "banner_path": r"D:\Antigravity\Kabu\image\banner_world.png",
},
```

---

## 確認手順

1. `pip install feedparser` を実行する
2. 保存してStreamlitをリロードする
3. ホームに4枠のニュースカードが表示されることを確認
4. サイドバーに「📰 ニュース」が追加されていることを確認
5. ニュースページでカテゴリタブが4つ表示され、各タブに記事一覧が出ることを確認
6. RSSが取得できない場合はモックデータが表示されることを確認（エラーにならないこと）
7. 「🔄 再取得」ボタンでキャッシュが更新されることを確認
8. HTMLタグが文字として見えていたら `unsafe_allow_html=True` が抜けているので追加すること
