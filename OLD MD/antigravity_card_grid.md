# Antigravity 修正プロンプト
## ニュース・証券会社セクション：カードグリッドレイアウトに変更

---

## 前提ルール（毎回必須）

HTMLを表示する場合は必ず `st.markdown(html, unsafe_allow_html=True)` を使うこと。
`st.write()` や `st.text()` は絶対に使わないこと。

---

## 修正①：ニュースセクションをカードグリッドに変更

### 修正場所
`modules/news_unit.py` の `render_news()` 関数全体を以下に置き換えてください。
それ以外のファイルは一切変更しないこと。

### 置き換えるコード

```python
def render_news(news_list: list):
    """ニュースをサムネイル付きカードグリッドで表示"""

    st.markdown('<div class="section-title">📰 今日の株ニュース</div>',
                unsafe_allow_html=True)

    # カードグリッドCSS
    st.markdown("""
    <style>
    .news-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    @media (max-width: 900px) {
      .news-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .news-grid { grid-template-columns: 1fr; }
    }
    .news-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.07);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      text-decoration: none;
    }
    .news-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .news-card-thumb {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: linear-gradient(135deg, #FFE8E8, #E8F8FF);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
    }
    .news-card-body {
      padding: 12px 14px 16px;
    }
    .news-card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }
    .news-tag {
      background: #FFE66D;
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 0.72rem;
      font-weight: 700;
      color: #2D3436;
    }
    .news-card-date {
      font-size: 0.75rem;
      color: #aaa;
      margin-bottom: 6px;
    }
    .news-card-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #2D3436;
      line-height: 1.5;
    }
    .news-card-title a {
      color: #2D3436;
      text-decoration: none;
    }
    .news-card-title a:hover {
      color: #FF6B6B;
    }
    </style>
    """, unsafe_allow_html=True)

    # ニュースカードのサムネイル絵文字（カテゴリ別）
    THUMB_EMOJI = {
        "#半導体": "💡", "#AI": "🤖", "#NISA": "💰",
        "#EV": "⚡", "#日本": "🇯🇵", "#米国": "🇺🇸",
        "#金利": "🏦", "#為替": "💴", "#トヨタ": "🚗",
        "#NVIDIA": "🖥️", "#任天堂": "🎮",
    }

    cards_html = '<div class="news-grid">'

    for news in news_list:
        # タグからサムネイル絵文字を決定
        thumb = "📰"
        for tag in news.get("tags", []):
            if tag in THUMB_EMOJI:
                thumb = THUMB_EMOJI[tag]
                break

        # タグHTML
        tags_html = "".join([
            f'<span class="news-tag">{tag}</span>'
            for tag in news.get("tags", [])
        ])

        date_str = news.get("time", "")
        title    = news.get("title", "")
        url      = news.get("url", "#")

        cards_html += f"""
        <div class="news-card">
          <!-- サムネイル -->
          <div class="news-card-thumb"
               style="background: linear-gradient(135deg, #FFF9F0, #F0FFF8);
                      display:flex; align-items:center; justify-content:center;
                      font-size:3rem; height:140px;">
            {thumb}
          </div>
          <!-- 本文 -->
          <div class="news-card-body">
            <div class="news-card-tags">{tags_html}</div>
            <div class="news-card-date">{date_str}</div>
            <div class="news-card-title">
              <a href="{url}" target="_blank" rel="noopener">{title}</a>
            </div>
          </div>
        </div>
        """

    cards_html += "</div>"
    st.markdown(cards_html, unsafe_allow_html=True)
```

---

## 修正②：証券会社セクションをカードグリッドに変更

### 修正場所
証券会社リンク集を表示している `st.markdown()` ブロック全体（`brokers` リストを使っている箇所）を
以下のコードに完全に置き換えてください。
それ以外は一切変更しないこと。

### 置き換えるコード

```python
brokers = [
    {
        "name": "SBI証券",
        "catch": "口座数No.1！",
        "tags": ["🔰 初心者向け", "💰 手数料最安級"],
        "url": "https://www.sbisec.co.jp",
        "color": "#FF6B35",
        "thumb": "🏦",
        "thumb_bg": "linear-gradient(135deg, #FFE8D6, #FFF0E8)",
    },
    {
        "name": "楽天証券",
        "catch": "ポイントで投資！",
        "tags": ["🔰 初心者向け", "🛒 楽天ユーザー向け"],
        "url": "https://www.rakuten-sec.co.jp",
        "color": "#BF0000",
        "thumb": "🎯",
        "thumb_bg": "linear-gradient(135deg, #FFE8E8, #FFF0F0)",
    },
    {
        "name": "松井証券",
        "catch": "50万円まで手数料0円",
        "tags": ["💡 少額投資向け"],
        "url": "https://www.matsui.co.jp",
        "color": "#003087",
        "thumb": "📊",
        "thumb_bg": "linear-gradient(135deg, #E8E8FF, #F0F0FF)",
    },
    {
        "name": "マネックス証券",
        "catch": "米国株に強い！",
        "tags": ["🌎 米国株向け", "📱 アプリ最強"],
        "url": "https://www.monex.co.jp",
        "color": "#00A0E9",
        "thumb": "🌏",
        "thumb_bg": "linear-gradient(135deg, #E8F8FF, #F0FFFF)",
    },
]

st.markdown('<div class="section-title">🏦 おすすめ証券会社</div>',
            unsafe_allow_html=True)

# グリッドCSS（ニュースと共通スタイルを流用）
st.markdown("""
<style>
.broker-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
@media (max-width: 900px) {
  .broker-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .broker-grid { grid-template-columns: 1fr; }
}
.broker-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}
.broker-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.broker-thumb {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
.broker-body {
  padding: 12px 14px 16px;
}
.broker-name {
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 4px;
  color: #2D3436;
}
.broker-catch {
  font-size: 0.82rem;
  color: #636E72;
  margin-bottom: 10px;
}
.broker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}
.broker-tag {
  background: #FFE66D;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 0.72rem;
  font-weight: 700;
}
.broker-btn {
  display: block;
  text-align: center;
  background: #FF6B6B;
  color: white !important;
  border-radius: 50px;
  padding: 8px 0;
  font-weight: 800;
  font-size: 0.85rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.broker-btn:hover { opacity: 0.85; }
</style>
""", unsafe_allow_html=True)

cards_html = '<div class="broker-grid">'

for b in brokers:
    tags_html = "".join([
        f'<span class="broker-tag">{tag}</span>'
        for tag in b["tags"]
    ])
    cards_html += f"""
    <div class="broker-card">
      <div class="broker-thumb" style="background: {b['thumb_bg']};">
        {b['thumb']}
      </div>
      <div class="broker-body">
        <div class="broker-name" style="color:{b['color']};">{b['name']}</div>
        <div class="broker-catch">{b['catch']}</div>
        <div class="broker-tags">{tags_html}</div>
        <a href="{b['url']}" target="_blank" rel="noopener"
           class="broker-btn">口座開設 →</a>
      </div>
    </div>
    """

cards_html += "</div>"
cards_html += """
<p style="font-size:0.72rem; color:#bbb; text-align:center; margin-top:8px;">
  ※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。
</p>
"""

st.markdown(cards_html, unsafe_allow_html=True)
```

---

## 確認手順

1. 保存してStreamlitをリロードする
2. ニュースが**4列のカードグリッド**（PC）で表示されることを確認
3. 証券会社も**4列のカードグリッド**で表示されることを確認
4. ブラウザ幅を縮めると2列→1列に切り替わることを確認
5. HTMLタグが文字として見えていたら `unsafe_allow_html=True` が抜けているので追加すること
