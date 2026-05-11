# Antigravity 修正プロンプト
## ニュース一覧ページ：レイアウト修正 ＋ タブ連動バナー追加

---

## 前提ルール（毎回必須）

HTMLを表示する場合は必ず `st.markdown(html, unsafe_allow_html=True)` を使うこと。
`st.write()` や `st.text()` は絶対に使わないこと。

---

## 修正場所

`modules/news_unit.py` の `render_news_list_page()` 関数全体を
以下のコードに完全に置き換えてください。
それ以外の関数は一切変更しないこと。

---

## 置き換えるコード

```python
def render_news_list_page():
    """ニュース一覧ページ：タブ連動バナー ＋ コンパクトなカードレイアウト"""

    st.markdown(
        '<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:4px;">📰 ニュース一覧</h2>',
        unsafe_allow_html=True
    )

    all_news   = fetch_all_news()
    categories = list(all_news.keys())

    # カテゴリ別バナー画像パス（CATEGORY_CONFIGと同じパスを使用）
    BANNER_PATHS = {
        "日本の株価":   r"D:\Antigravity\Kabu\image\kabuka_J.png",
        "注目の銘柄":   r"D:\Antigravity\Kabu\image\meigara.png",
        "初心者・NISA": r"D:\Antigravity\Kabu\image\NISA.png",
        "海外の株価":   r"D:\Antigravity\Kabu\image\kaigai.png",
    }

    # Streamlit タブ
    tabs = st.tabs([
        f"{CATEGORY_CONFIG[c]['icon']} {c}" for c in categories
    ])

    for tab, category in zip(tabs, categories):
        with tab:
            cfg      = CATEGORY_CONFIG[category]
            articles = all_news.get(category, [])

            # ── バナー画像（タブ切り替えで連動） ──
            banner_path = BANNER_PATHS.get(category)
            if banner_path:
                b64 = get_image_base64(banner_path)
                if b64:
                    st.markdown(f"""
                    <div style="margin-bottom:20px; border-radius:16px; overflow:hidden;
                                box-shadow:0 4px 16px rgba(0,0,0,0.10);">
                      <img src="data:image/png;base64,{b64}"
                           style="width:100%; max-height:220px; object-fit:cover; display:block;">
                    </div>
                    """, unsafe_allow_html=True)

            # ── 記事がない場合 ──
            if not articles:
                st.info("現在ニュースを取得できませんでした。しばらくしてから再読み込みしてください。")
                if st.button(f"🔄 再取得", key=f"refresh_{category}"):
                    st.cache_data.clear()
                    st.rerun()
                continue

            # ── 記事リスト（コンパクトカード） ──
            st.markdown("""
            <style>
            .news-list-card {
              background: white;
              border-radius: 12px;
              padding: 14px 18px;
              margin-bottom: 10px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06);
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 16px;
            }
            .news-list-card:hover {
              box-shadow: 0 4px 16px rgba(0,0,0,0.10);
              transform: translateY(-1px);
              transition: all 0.2s;
            }
            .news-list-body { flex: 1; min-width: 0; }
            .news-list-date { font-size:0.72rem; color:#aaa; margin-bottom:3px; }
            .news-list-title {
              font-size: 0.95rem;
              font-weight: 700;
              color: #2D3436;
              line-height: 1.5;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .news-list-title a { color:#2D3436; text-decoration:none; }
            .news-list-title a:hover { color:#FF6B6B; }
            .news-list-summary {
              font-size: 0.82rem;
              color: #636E72;
              line-height: 1.5;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .news-list-btn {
              background: var(--accent-color);
              color: white;
              border-radius: 20px;
              padding: 6px 16px;
              font-size: 0.78rem;
              font-weight: 700;
              text-decoration: none;
              white-space: nowrap;
              flex-shrink: 0;
            }
            .news-list-btn:hover { opacity: 0.85; }

            /* スマホは縦積み */
            @media (max-width: 640px) {
              .news-list-card { flex-direction: column; align-items: flex-start; }
              .news-list-title { white-space: normal; }
            }
            </style>
            """, unsafe_allow_html=True)

            cards_html = ""
            for article in articles:
                title   = article.get("title", "")
                url     = article.get("url", "#")
                date    = article.get("date", "")
                summary = article.get("summary", "")

                cards_html += f"""
                <div class="news-list-card"
                     style="border-left: 4px solid {cfg['color']};">
                  <div class="news-list-body">
                    <div class="news-list-date">{date}</div>
                    <div class="news-list-title">
                      <a href="{url}" target="_blank" rel="noopener">{title}</a>
                    </div>
                    <div class="news-list-summary">{summary}</div>
                  </div>
                  <a href="{url}" target="_blank" rel="noopener"
                     class="news-list-btn"
                     style="background:{cfg['color']};">詳しく見る →</a>
                </div>
                """

            st.markdown(cards_html, unsafe_allow_html=True)

            # 再取得ボタン
            if st.button(f"🔄 {category}を再取得", key=f"refresh_{category}"):
                st.cache_data.clear()
                st.rerun()
```

---

## 変更のポイント

| 項目 | 変更前 | 変更後 |
|------|--------|--------|
| バナー | なし | タブ切り替えで対応バナーが表示される |
| 記事の余白 | 大きすぎて白スペースだらけ | コンパクトカード（padding 14px）に統一 |
| タイトル | 折り返しで縦に伸びる | 1行に収めて `...` で省略 |
| サマリー | 無制限に表示 | 2行で切り捨て |
| スマホ | 崩れる | 縦積みに自動切替 |

---

## 確認手順

1. 保存してStreamlitをリロードする
2. ニュースページを開き、タブの直下にバナー画像が表示されることを確認
3. タブを切り替えるとバナーが対応する画像に切り替わることを確認
4. 記事カードがコンパクトに縦に並んでいることを確認（白い余白が出ないこと）
5. HTMLタグが文字として見えていたら `unsafe_allow_html=True` が抜けているので追加すること
