import streamlit as st
import feedparser
import base64
import os
import re
from datetime import datetime, timezone, timedelta
from modules.ui_components import character_explain, CHARA, IMAGE_DIR

def get_news_fetch_period() -> str:
    """日本時間で 7:00, 13:00, 17:00 を基準にしたキャッシュキーを生成"""
    jst = timezone(timedelta(hours=9))
    now = datetime.now(jst)
    
    if now.hour < 7:
        prev_day = now - timedelta(days=1)
        return f"{prev_day.strftime('%Y-%m-%d')}_17:00"
    elif now.hour < 13:
        return f"{now.strftime('%Y-%m-%d')}_07:00"
    elif now.hour < 17:
        return f"{now.strftime('%Y-%m-%d')}_13:00"
    else:
        return f"{now.strftime('%Y-%m-%d')}_17:00"

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
def get_mock_news():
    now_str = datetime.now().strftime('%Y/%m/%d')
    return {
        "日本の株価": {
            "title": "日経平均、今後の相場展望と注目ポイント",
            "url": "https://www.nikkei.com",
            "date": f"{now_str} 09:00",
            "summary": "現在の市場環境における日経平均の推移と、投資家が注目すべき経済指標について解説します。",
        },
        "注目の銘柄": {
            "title": "最新の注目銘柄レポート：成長が期待されるセクター",
            "url": "https://kabutan.jp",
            "date": f"{now_str} 10:00",
            "summary": "独自の分析に基づき、今週特に注目したい成長期待銘柄と市場の動向をピックアップ。",
        },
        "初心者・NISA": {
            "title": "新NISAで始める資産形成：最初の一歩ガイド",
            "url": "https://media.rakuten-sec.net",
            "date": f"{now_str} 08:30",
            "summary": "新NISA制度を最大限に活用するための基本的な考え方と、初心者におすすめの運用方法を紹介。",
        },
        "海外の株価": {
            "title": "米国市場・海外指標の動向と日本市場への影響",
            "url": "https://www.bloomberg.co.jp",
            "date": f"{now_str} 07:00",
            "summary": "昨晩の米株式市場の結果と、それが本日の日本市場にどのような影響を与える可能性があるか分析します。",
        },
    }

# カテゴリ設定（バナー画像・絵文字・色）
CATEGORY_CONFIG = {
    "日本の株価": {
        "icon": "🇯🇵",
        "color": "#FF6B6B",
        "bg": "linear-gradient(135deg, #FFE8E8, #FFF0F0)",
        "banner_path": os.path.join(IMAGE_DIR, "kabuka_J.jpg")
    },
    "注目の銘柄": {
        "icon": "🔥",
        "color": "#FF9F43",
        "bg": "linear-gradient(135deg, #FFF0E0, #FFF8E8)",
        "banner_path": os.path.join(IMAGE_DIR, "meigara.jpg")
    },
    "初心者・NISA": {
        "icon": "🌱",
        "color": "#00B894",
        "bg": "linear-gradient(135deg, #E8FFF0, #F0FFF8)",
        "banner_path": os.path.join(IMAGE_DIR, "NISA.jpg")
    },
    "海外の株価": {
        "icon": "🌍",
        "color": "#4ECDC4",
        "bg": "linear-gradient(135deg, #E8FFFF, #F0FFFF)",
        "banner_path": os.path.join(IMAGE_DIR, "kaigai.jpg")
    },
}


def strip_html(text: str) -> str:
    """HTMLタグを除去する"""
    if not text:
        return ""
    # タグを除去
    clean = re.compile('<.*?>')
    text = re.sub(clean, '', text)
    # 実体参照などをデコード（簡易）
    text = text.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
    return text.strip()


def get_image_base64(path: str) -> str:
    try:
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode()
    except:
        return ""


@st.cache_data(ttl=21600)  # 6時間キャッシュ (21600秒)
def fetch_latest_news_by_category(period_key: str) -> dict:
    """
    各カテゴリのRSSから最新1件を取得して返す。
    取得失敗した場合はMOCK_NEWSを返す。
    """
    result = {}
    fetch_time = datetime.now().strftime("%m/%d %H:%M")

    for category, rss_urls in RSS_SOURCES.items():
        fetched = None
        for url in rss_urls:
            try:
                feed = feedparser.parse(url)
                if feed.entries:
                    entry = feed.entries[0]
                    title = strip_html(entry.get("title", ""))
                    summary = strip_html(entry.get("summary", ""))
                    # 日付形式の統一 (YYYY/MM/DD HH:MM)
                    pub_date = entry.get("published_parsed")
                    if pub_date:
                        date_str = f"{pub_date.tm_year}/{pub_date.tm_mon:02d}/{pub_date.tm_mday:02d} {pub_date.tm_hour:02d}:{pub_date.tm_min:02d}"
                    else:
                        # フォールバック (publishedがない場合などは00:00固定)
                        raw_pub = entry.get("published", "")[:10]
                        date_str = (raw_pub.replace("-", "/") + " 00:00") if raw_pub else ""

                    fetched = {
                        "title":   title,
                        "url":     entry.get("link", "#"),
                        "date":    date_str,
                        "summary": summary[:120] + "..." if len(summary) > 120 else summary,
                    }
                    break
            except:
                continue

        result[category] = fetched if fetched else get_mock_news().get(category, {})

    return {"news": result, "updated_at": fetch_time}


@st.cache_data(ttl=21600)  # 6時間キャッシュ
def fetch_all_news(period_key: str) -> dict:
    """
    ニュース一覧ページ用：各カテゴリから最大10件取得
    """
    result = {}
    fetch_time = datetime.now().strftime("%m/%d %H:%M")

    for category, rss_urls in RSS_SOURCES.items():
        articles = []
        for url in rss_urls:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries[:10]:
                    title = strip_html(entry.get("title", ""))
                    summary = strip_html(entry.get("summary", ""))
                    # 日付形式の統一 (YYYY/MM/DD HH:MM)
                    pub_date = entry.get("published_parsed")
                    if pub_date:
                        date_str = f"{pub_date.tm_year}/{pub_date.tm_mon:02d}/{pub_date.tm_mday:02d} {pub_date.tm_hour:02d}:{pub_date.tm_min:02d}"
                    else:
                        raw_pub = entry.get("published", "")[:10]
                        date_str = (raw_pub.replace("-", "/") + " 00:00") if raw_pub else ""

                    articles.append({
                        "title":    title,
                        "url":      entry.get("link", "#"),
                        "date":     date_str,
                        "summary":  summary[:100] + "..." if len(summary) > 100 else summary,
                        "category": category,
                    })
                if articles:
                    break
            except:
                continue

        # フォールバック
        if not articles:
            mock = get_mock_news().get(category)
            if mock:
                articles = [{**mock, "category": category}]

        result[category] = articles

    return {"news": result, "updated_at": fetch_time}


# -----------------------------------------------
# ホーム用：固定4枠ニュース表示
# -----------------------------------------------
def render_news_section():
    """ホームに固定4カテゴリの最新ニュースを表示（旧名維持）"""

    period_key = get_news_fetch_period()
    news_res   = fetch_latest_news_by_category(period_key)
    news_data  = news_res["news"]
    updated_at = news_res["updated_at"]

    st.markdown(f"""
<style>
.force-white-link, .force-white-link span {{
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
}}
</style>
<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
        <div class="section-title">📰 今日のお金のニュース</div>
        <div style="font-size: 0.75rem; color: #888; margin-top: -4px;">取得時刻: {updated_at}</div>
    </div>
    <div style="margin-bottom: 2px;">
        <a href="?page=news" target="_self" class="force-white-link" style="
            text-decoration: none;
            background: #FF6B6B;
            padding: 8px 24px;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 800;
            box-shadow: 0 4px 12px rgba(255,107,107,0.25);
            transition: all 0.2s;
            display: inline-block;
        " onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            <span>ニュース一覧へ →</span>
        </a>
    </div>
</div>
""", unsafe_allow_html=True)

    col_btn, _ = st.columns([1, 4])
    with col_btn:
        if st.button("🔄 ニュースを更新", key="home_news_refresh", use_container_width=True):
            st.cache_data.clear()
            st.rerun()

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
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}
.hnews-card:hover { 
  transform: translateY(-6px); 
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: #FF6B6B;
}

.hnews-thumb {
  width: 100%; height: 140px;
  display: block;
  background: #fff;
  overflow: hidden;
}
.hnews-thumb img { 
  width: 100%; height: 100%; 
  object-fit: contain; /* 全体表示・トリミングなし */
  display: block;
}

/* スマホは横長テキストカードにしつつホバー維持 */
@media (max-width: 640px) {
  .hnews-thumb { display: none !important; }
  .hnews-card { border-radius: 12px; }
}

.hnews-body { padding: 12px 14px 14px; flex: 1; display: flex; flex-direction: column; }
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
  margin-top: auto;
}
.hnews-ask-btn:hover { background: #FFF0D0; }

/* モーダルスタイル */
.kabu-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.kabu-modal-overlay.open { display: flex; }
.kabu-modal {
  background: white;
  padding: 24px;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  position: relative;
}
.kabu-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #aaa;
}
.kabu-modal-body { display: flex; gap: 16px; align-items: center; }
.kabu-modal-text { font-size: 0.95rem; line-height: 1.6; color: #2D3436; }
</style>

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

        if cfg.get("banner_path") and os.path.exists(cfg["banner_path"]):
            b64 = get_image_base64(cfg["banner_path"])
            thumb_html = f'<img src="data:image/png;base64,{b64}">' if b64 else f'<div class="hnews-thumb" style="background:{cfg["bg"]}">{cfg["icon"]}</div>'
        else:
            thumb_html = f'<div class="hnews-thumb" style="background:{cfg["bg"]}">{cfg["icon"]}</div>'

        explanation = (
            f"「{news.get('title','')}」の解説じゃ！<br><br>"
            f"{news.get('summary','')}<br><br>"
            f"このカテゴリは<b>「{category}」</b>に関するニュースじゃぞ。"
            f"毎日チェックして市場の流れを掴おう！"
        )
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
    """ニュース一覧ページ：タブ連動バナー ＋ コンパクトなカードレイアウト"""

    # タイトル
    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:12px;">📰 ニュース一覧</h2>', unsafe_allow_html=True)

    # 全ページ共通のスタイル定義
    st.markdown("""
<style>
.news-tab-banner {
  margin-bottom: 24px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
}
.news-tab-banner img {
  width: 100%;
  height: auto;
  display: block;
}
.nlist-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}
.nlist-card {
  background: white;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  border: 1px solid #f0f0f0;
}
.nlist-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.nlist-body { flex: 1; min-width: 0; }
.nlist-date { font-size: 0.75rem; color: #999; margin-bottom: 4px; font-weight: 500; }
.nlist-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #2D3436;
  line-height: 1.4;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nlist-summary {
  font-size: 0.88rem;
  color: #636E72;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.nlist-btn {
  background: #FF6B6B;
  color: white !important;
  border-radius: 50px;
  padding: 10px 22px;
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(255,107,107,0.3);
}

@media (max-width: 768px) {
  .nlist-card { flex-direction: column; align-items: flex-start; gap: 12px; }
  .nlist-title { white-space: normal; }
  .nlist-btn { width: 100%; text-align: center; }
  .news-tab-banner { height: 140px; }
}
</style>
""", unsafe_allow_html=True)

    period_key = get_news_fetch_period()
    news_res   = fetch_all_news(period_key)
    all_news   = news_res["news"]
    updated_at = news_res["updated_at"]
    categories = list(all_news.keys())

    st.markdown(f"""
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <div>
        <div style="font-size: 1.2rem; font-weight: 900; color: #2D3436;">📰 ニュース一覧</div>
        <div style="font-size: 0.8rem; color: #888;">最終取得: {updated_at} (6時間ごとに自動更新)</div>
    </div>
</div>
""", unsafe_allow_html=True)

    col_btn, _ = st.columns([1, 4])
    with col_btn:
        if st.button("🔄 最新のニュースに更新", key="page_news_refresh", use_container_width=True, type="primary"):
            st.cache_data.clear()
            st.rerun()

    BANNER_PATHS = {
        "日本の株価":   os.path.join(IMAGE_DIR, "kabuka_J.png"),
        "注目の銘柄":   os.path.join(IMAGE_DIR, "meigara.png"),
        "初心者・NISA": os.path.join(IMAGE_DIR, "NISA.png"),
        "海外の株価":   os.path.join(IMAGE_DIR, "kaigai.png"),
    }

    tabs = st.tabs([f"{CATEGORY_CONFIG[c]['icon']} {c}" for c in categories])

    for tab, category in zip(tabs, categories):
        with tab:
            cfg      = CATEGORY_CONFIG[category]
            articles = all_news.get(category, [])

            # バナー
            banner_path = BANNER_PATHS.get(category)
            if banner_path and os.path.exists(banner_path):
                b64 = get_image_base64(banner_path)
                if b64:
                    st.markdown(f'<div class="news-tab-banner"><img src="data:image/png;base64,{b64}"></div>', unsafe_allow_html=True)

            if not articles:
                st.info("ニュースがありません。")
                if st.button("再取得", key=f"re_empty_{category}"):
                    st.cache_data.clear()
                    st.rerun()
                continue

            # 記事カード生成（HTMLを1つにまとめる）
            cards_html_list = ['<div class="nlist-container">']
            for article in articles:
                title   = strip_html(article.get("title", ""))
                url     = article.get("url", "#")
                date    = article.get("date", "")
                summary = strip_html(article.get("summary", ""))

                cards_html_list.append(f"""
<a href="{url}" target="_blank" class="nlist-card" style="border-left: 6px solid {cfg['color']};">
  <div class="nlist-body">
    <div class="nlist-date">{date}</div>
    <div class="nlist-title">{title}</div>
    <div class="nlist-summary">{summary}</div>
  </div>
  <div class="nlist-btn" style="background:{cfg['color']};">詳しく見る →</div>
</a>
""")
            cards_html_list.append('</div>')
            st.markdown("".join(cards_html_list), unsafe_allow_html=True)

            if st.button(f"🔄 {category}を最新に更新", key=f"refresh_list_btn_{category}"):
                st.cache_data.clear()
                st.rerun()
