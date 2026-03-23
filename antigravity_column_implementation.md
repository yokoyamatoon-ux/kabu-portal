# Antigravity 実装プロンプト
## カブ先生のコラム機能 新規実装

---

## 全体構成

| ページ | レイアウト | 参考にする既存ページ |
|--------|-----------|-------------------|
| ホーム内コラム一覧（ミニ） | ニュースセクションと同じボックス横並び | `news_unit.render_news_section()` |
| コラム一覧ページ（専用） | マンガページと同じカードグリッド | `manga_unit.render_manga_page()` |
| コラム詳細ページ | 画像上部＋本文下部 | `money_secret_unit` の詳細ページ |

---

## ① `modules/column_unit.py` を新規作成

以下の記事データと3つの関数を実装する。

### 記事データ（COLUMNS リスト）

昨日作成した `antigravity_column_unit.md` に記載のCOLUMNSリストをそのまま使う。
画像パスは `os.path.join(IMAGE_DIR, "column", f"{col_id}.jpg")` の形式にする。

---

### 関数① `render_column_home_section()` — ホーム用ミニ一覧

**ニュースセクションと同じボックス横並びレイアウト**で実装する。
`news_unit.render_news_section()` のHTMLカード構造を参考にすること。

```python
def render_column_home_section():
    """ホーム用：コラム最新4件をニュースと同じボックス形式で表示"""

    st.markdown("""
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
  <div class="section-badge" style="margin:0;">📰 カブ先生のコラム</div>
</div>
""", unsafe_allow_html=True)

    # ニュースセクションと同じ列構成
    cols = st.columns(len(COLUMNS))
    for col, article in zip(cols, COLUMNS):
        with col:
            # 画像（あれば表示、なければカテゴリカラーのプレースホルダー）
            img_path = os.path.join(IMAGE_DIR, "column", f"{article['id']}.jpg")
            img_b64 = get_image_base64(img_path)
            if img_b64:
                img_html = f'<img src="data:image/jpeg;base64,{img_b64}" style="width:100%; height:140px; object-fit:cover; border-radius:8px 8px 0 0;">'
            else:
                img_html = f'<div style="width:100%; height:140px; background:{article["category_color"]}22; border-radius:8px 8px 0 0; display:flex; align-items:center; justify-content:center; font-size:2rem;">📰</div>'

            st.markdown(f"""
<div style="background:white; border-radius:12px; overflow:hidden;
            box-shadow:0 2px 8px rgba(0,0,0,0.07); height:100%;">
  {img_html}
  <div style="padding:12px;">
    <div style="background:{article['category_color']}; color:white; border-radius:20px;
                padding:2px 10px; font-size:0.72rem; font-weight:700;
                display:inline-block; margin-bottom:6px;">
      {article['category']}
    </div>
    <div style="font-size:0.8rem; color:#888; margin-bottom:4px;">{article['date']}</div>
    <div style="font-weight:800; font-size:0.88rem; color:#2D3436;
                line-height:1.4; margin-bottom:6px;">
      {article['title']}
    </div>
    <div style="font-size:0.78rem; color:#636E72; line-height:1.5;">
      {article['lead'][:60]}...
    </div>
  </div>
</div>
""", unsafe_allow_html=True)
            if st.button("続きを読む →", key=f"home_col_{article['id']}", use_container_width=True):
                st.session_state.current_page = "column_detail"
                st.session_state.column_id = article['id']
                st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)
    # コラム一覧ページへのリンク
    if st.button("📰 コラム一覧をみる →", key="col_list_btn", use_container_width=False):
        st.session_state.current_page = "column"
        st.rerun()
```

---

### 関数② `render_column_list_page()` — コラム一覧ページ

**マンガページと完全に同じカードグリッドレイアウト**で実装する。
`manga_unit.render_manga_page()` のカード構造（サムネイル上部・タイトル・サマリー・ボタン）を参考にすること。

```python
def render_column_list_page():
    """コラム一覧ページ：マンガページと同じカードグリッド"""

    st.markdown("""
<h1 style="font-family:'M PLUS Rounded 1c',sans-serif; font-size:1.6rem; font-weight:900; margin-bottom:20px;">
  📰 カブ先生のコラム
</h1>
""", unsafe_allow_html=True)

    # 2カラムグリッド（マンガページと同じ構造）
    for i in range(0, len(COLUMNS), 2):
        col_left, col_right = st.columns(2)
        pairs = [(col_left, COLUMNS[i])]
        if i + 1 < len(COLUMNS):
            pairs.append((col_right, COLUMNS[i + 1]))

        for col, article in pairs:
            with col:
                img_path = os.path.join(IMAGE_DIR, "column", f"{article['id']}.jpg")
                img_b64 = get_image_base64(img_path)
                if img_b64:
                    img_html = f'<img src="data:image/jpeg;base64,{img_b64}" style="width:100%; height:180px; object-fit:cover; border-radius:12px 12px 0 0; display:block;">'
                else:
                    img_html = f'<div style="width:100%; height:180px; background:linear-gradient(135deg,{article["category_color"]}33,{article["category_color"]}11); border-radius:12px 12px 0 0; display:flex; align-items:center; justify-content:center; font-size:3rem;">📰</div>'

                st.markdown(f"""
<div style="background:white; border-radius:12px; overflow:hidden;
            box-shadow:0 2px 10px rgba(0,0,0,0.07); margin-bottom:8px;">
  {img_html}
  <div style="padding:16px;">
    <div style="font-size:0.72rem; color:{article['category_color']};
                font-weight:800; margin-bottom:4px;">
      {article['category']}
    </div>
    <div style="font-weight:900; font-size:1rem; color:#2D3436;
                margin-bottom:6px; line-height:1.4;">
      {article['title']}
    </div>
    <div style="font-size:0.82rem; color:#636E72; line-height:1.5; margin-bottom:4px;">
      {article['lead']}
    </div>
    <div style="font-size:0.72rem; color:#aaa;">
      {article['date']} ・ 約{article['reading_time']}分
    </div>
  </div>
</div>
""", unsafe_allow_html=True)
                if st.button(f"第{i//2*2 + (0 if col == col_left else 1) + 1}話を読む →",
                             key=f"list_col_{article['id']}", use_container_width=True):
                    st.session_state.current_page = "column_detail"
                    st.session_state.column_id = article['id']
                    st.rerun()
```

---

### 関数③ `render_column_detail_page()` — コラム詳細ページ

**ウラ金さんのページと同じ構造**（画像上部＋コンテンツ下部）で実装する。
`money_secret_unit` の詳細ページのレイアウトを参考にすること。

```python
def render_column_detail_page(col_id: str):
    """コラム詳細ページ：画像上部＋本文下部（ウラ金さんページと同じ構造）"""

    article = next((c for c in COLUMNS if c['id'] == col_id), None)
    if not article:
        st.error("記事が見つかりませんでした。")
        return

    # ① ヘッダー画像（ウラ金さんのページと同じ幅・丸み）
    img_path = os.path.join(IMAGE_DIR, "column", f"{article['id']}.jpg")
    img_b64 = get_image_base64(img_path)
    if img_b64:
        st.markdown(f"""
<div style="border-radius:16px; overflow:hidden; margin-bottom:20px;
            box-shadow:0 4px 16px rgba(0,0,0,0.10);">
  <img src="data:image/jpeg;base64,{img_b64}"
       style="width:100%; max-height:360px; object-fit:cover; display:block;">
</div>
""", unsafe_allow_html=True)
    else:
        st.markdown(f"""
<div style="background:linear-gradient(135deg,{article['category_color']}33,{article['category_color']}11);
            border-radius:16px; height:240px; margin-bottom:20px;
            display:flex; align-items:center; justify-content:center; font-size:4rem;">
  📰
</div>
""", unsafe_allow_html=True)

    # ② メタ情報（カテゴリ・日付・読了時間）
    st.markdown(f"""
<div style="margin-bottom:12px;">
  <span style="background:{article['category_color']}; color:white; border-radius:20px;
               padding:4px 14px; font-size:0.78rem; font-weight:700;">
    {article['category']}
  </span>
  <span style="font-size:0.75rem; color:#aaa; margin-left:10px;">
    {article['date']} ・ 約{article['reading_time']}分で読めるぞ
  </span>
</div>
<h1 style="font-family:'M PLUS Rounded 1c',sans-serif; font-size:1.5rem;
           font-weight:900; line-height:1.5; margin-bottom:12px;">
  {article['title']}
</h1>
<div style="font-size:0.92rem; color:#636E72;
            border-left:4px solid {article['category_color']};
            padding-left:14px; margin-bottom:24px; line-height:1.7;">
  {article['lead']}
</div>
""", unsafe_allow_html=True)

    # ③ 本文（Markdown）— ウラ金さんページの吹き出しの代わりにコラム本文
    st.markdown(article['body'])

    # ④ タグ
    tags_html = "".join([
        f'<span style="background:#F0F0F0; border-radius:20px; padding:3px 10px; font-size:0.75rem; margin-right:6px;">#{t}</span>'
        for t in article['tags']
    ])
    st.markdown(f'<div style="margin-top:24px; margin-bottom:24px;">{tags_html}</div>',
                unsafe_allow_html=True)

    # ⑤ ナビゲーション
    col_back, col_list = st.columns([1, 1])
    with col_back:
        if st.button("← ホームにもどる", key="col_detail_home"):
            st.session_state.current_page = "home"
            st.rerun()
    with col_list:
        if st.button("📰 コラム一覧へ", key="col_detail_list", use_container_width=True):
            st.session_state.current_page = "column"
            st.rerun()
```

---

## ② `app.py` のルーティングに追加

既存の `elif` チェーンに以下を追加する：

```python
    elif page == "column":
        from modules.column_unit import render_column_list_page
        render_column_list_page()

    elif page == "column_detail":
        from modules.column_unit import render_column_detail_page
        col_id = st.session_state.get("column_id", "col_001")
        render_column_detail_page(col_id)
```

---

## ③ サイドバーのナビゲーションに追加（app.py）

```python
("column", "📰 カブ先生のコラム"),
```
を既存の `pages` リストの適切な位置（ニュースの下あたり）に追加する。

---

## ④ ホームページへの組み込み（home_unit.py）

`render_home_page()` 内、`news_unit.render_news_section()` の**直後**に追加：

```python
    # カブ先生のコラム（ホーム用ミニ一覧）
    from modules.column_unit import render_column_home_section
    render_column_home_section()
```

---

## 確認ポイント

1. ホームのニュースセクション直下にコラムボックス4枚が横並びで表示される
2. 「コラム一覧をみる →」ボタンでコラム一覧ページに遷移する
3. コラム一覧ページがマンガページと同じ2カラムカードグリッドで表示される
4. 「第○話を読む →」ボタンで詳細ページに遷移する
5. 詳細ページの上部に画像（なければカラープレースホルダー）が表示される
6. 詳細ページの画像の下にタイトル・リード・本文が表示される
7. サイドバーに「📰 カブ先生のコラム」が追加されている
8. 既存のページ（マンガ・クイズ・ニュース等）に変化がない
