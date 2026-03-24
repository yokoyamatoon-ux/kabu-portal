import streamlit as st
import os
import json
from datetime import datetime
from modules.ui_components import (
    get_image_base64, chara_img, icon_img, CHARA, IMAGE_DIR, character_explain
)

__all__ = ["render_column_list_page", "render_column_detail_page", "render_column_home_section"]

# 共通スタイル
COMMON_CSS = """
<style>
.column-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    text-decoration: none !important;
}
.column-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.12) !important;
}
</style>
"""

# ---------------------------------------------------------
# 記事データの読み込み (data/columns.json から)
# ---------------------------------------------------------
@st.cache_data(show_spinner=False)
def load_columns_data_auto():
    json_path = os.path.join("data", "columns.json")
    # ファイルの更新日時を引数に含めることで、ファイル更新時に自動的にキャッシュを無効化する
    mtime = os.path.getmtime(json_path) if os.path.exists(json_path) else 0
    return _load_columns_internal(json_path, mtime)

@st.cache_data(show_spinner=False)
def _load_columns_internal(json_path: str, mtime: float):
    try:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception as e:
        st.error(f"Error loading columns.json: {e}")
    return []

# ---------------------------------------------------------
# ホーム画面用：コラムプレビュー（4カラムグリッド）
# ---------------------------------------------------------
def render_column_home_section():
    articles = load_columns_data_auto()
    st.markdown(COMMON_CSS, unsafe_allow_html=True)
    st.markdown("---")
    st.markdown("""
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
    <h2 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800; margin:0;">
        🥬 カブ先生のお金のコラム
    </h2>
</div>
""", unsafe_allow_html=True)

    if not articles:
        st.info("現在、新しいコラムを準備中じゃ！")
        return

    cols = st.columns(4)
    display_columns = articles[:4]
    for col, article in zip(cols, display_columns):
        with col:
            img_name = article.get('image', f"{article['id']}.jpg")
            img_path = os.path.join(IMAGE_DIR, "column", img_name)
            img_b64 = get_image_base64(img_path)

            img_html = (
                f'<div style="width:100%; height:120px; background:url(data:image/jpeg;base64,{img_b64}) center/cover; border-bottom:1px solid #f0f0f0;"></div>'
                if img_b64 else
                f'<div style="width:100%; height:120px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; color:#ccc; border-bottom:1px solid #f0f0f0;">No Image</div>'
            )

            st.markdown(f"""<a href="?page=column_detail&id={article['id']}" target="_self" style="text-decoration:none;">
<div class="column-card" style="background:white; border-radius:12px; overflow:hidden;
    box-shadow:0 4px 15px rgba(0,0,0,0.06); height:100%; border:1px solid #f0f0f0;">
  {img_html}
  <div style="padding:12px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div style="background:{article['category_color']}; color:white;
          font-size:0.65rem; padding:2px 8px; border-radius:10px; font-weight:800;">
        {article['category']}
      </div>
      <div style="font-size:0.65rem; color:#888;">{article['date']}</div>
    </div>
    <div style="font-weight:800; font-size:0.9rem; color:#2D3436;
        line-height:1.4; margin-bottom:6px;">{article['title']}</div>
    <div style="font-size:0.78rem; color:#636E72; line-height:1.5; overflow:hidden;
        display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">
      {article['lead']}
    </div>
  </div>
</div>
</a>""", unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("""<a href="?page=column" target="_self" style="text-decoration:none;">
<button style="width:100%; padding:12px; border-radius:12px; border:none; background:#FF6B6B;
    color:white; cursor:pointer; font-weight:800; font-size:1rem;">
    📰 全てのコラムを見る →
</button>
</a>""", unsafe_allow_html=True)


# ---------------------------------------------------------
# 一覧ページ：2カラムグリッド
# ---------------------------------------------------------
def render_column_list_page():
    articles = load_columns_data_auto()
    st.markdown(COMMON_CSS, unsafe_allow_html=True)
    st.markdown("""
<div style="text-align:center; padding:40px 20px; background:#FFF;
    border-radius:24px; margin-bottom:30px; border:2px solid #FFE082;">
  <h1 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800;
      color:#2D3436; font-size:2.2rem; margin-bottom:12px;">
    🥬 カブ先生の「お金のコラム」
  </h1>
  <p style="color:#636E72; font-size:1.1rem; max-width:600px; margin:0 auto;">
    投資の最新ニュースや「今さら聞けない」経済の基本まで、<br>
    カブ先生がわかりやすく解説するぞ！
  </p>
</div>
""", unsafe_allow_html=True)

    character_explain(
        CHARA["hakase"],
        "投資の知識は一生の宝物じゃ！<br>毎日少しずつ、ワシと一緒に学んでいこう。難しいことも分かりやすく教えるぞ。",
        bg_color="#FFF9F0"
    )

    st.markdown('<div style="margin-top:30px;"></div>', unsafe_allow_html=True)

    if not articles:
        st.info("現在、新しいコラムを準備中じゃ！")
        return

    cols = st.columns(2)
    for i, article in enumerate(articles):
        with cols[i % 2]:
            img_name = article.get('image', f"{article['id']}.jpg")
            img_path = os.path.join(IMAGE_DIR, "column", img_name)
            img_b64 = get_image_base64(img_path)

            img_html = (
                f'<div style="width:100%; height:200px; background:url(data:image/jpeg;base64,{img_b64}) center/cover;"></div>'
                if img_b64 else
                f'<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; color:#ccc;">No Image</div>'
            )

            st.markdown(f"""<a href="?page=column_detail&id={article['id']}" target="_self" style="text-decoration:none;">
<div class="column-card" style="background:white; border-radius:12px; overflow:hidden;
    box-shadow:0 4px 15px rgba(0,0,0,0.07); margin-bottom:8px; border:1px solid #f0f0f0;">
  {img_html}
  <div style="padding:20px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <div style="background:{article['category_color']}; color:white;
          font-size:0.75rem; padding:3px 10px; border-radius:12px; font-weight:800;">
        {article['category']}
      </div>
      <div style="font-size:0.75rem; color:#888;">{article['date']}</div>
    </div>
    <div style="font-weight:800; font-size:1.1rem; color:#2D3436; line-height:1.4; margin-bottom:8px;">
      {article['title']}
    </div>
    <div style="font-size:0.92rem; color:#636E72; line-height:1.6;">{article['lead']}</div>
  </div>
</div>
</a>""", unsafe_allow_html=True)
            st.markdown("<br>", unsafe_allow_html=True)


# ---------------------------------------------------------
# 詳細ページ
# ---------------------------------------------------------
def render_column_detail_page(column_id: str):
    articles = load_columns_data_auto()
    article = next((c for c in articles if c["id"] == column_id), None)
    if not article:
        st.error("記事が見つかりませんでした。")
        st.markdown('<a href="?page=column" target="_self">← 一覧に戻る</a>', unsafe_allow_html=True)
        return

    st.markdown(COMMON_CSS, unsafe_allow_html=True)

    # 戻るリンク
    st.markdown('<a href="?page=column" target="_self" style="color:#636E72; text-decoration:none; font-size:0.9rem;">← 記事一覧にもどる</a><br><br>', unsafe_allow_html=True)

    # 詳細ページスタイル
    st.markdown("""<style>
.col-detail-body { line-height:1.9; font-size:1.05rem; color:#2D3436; }
.col-detail-body h3 {
    color:#2D3436; font-weight:800; margin-top:40px; margin-bottom:16px;
    border-left:6px solid #FF6B6B; padding-left:14px;
    font-family:'M PLUS Rounded 1c', sans-serif;
}
.col-detail-body p { margin-bottom:18px; }
.col-detail-body ul, .col-detail-body ol { margin-bottom:18px; padding-left:24px; }
.col-kabu-bubble {
    display:flex; gap:12px; margin:24px 0;
}
.col-kabu-text {
    background:#E8F8FF; border:2px solid #0984E3;
    border-radius:4px 18px 18px 18px;
    padding:14px 18px; font-size:0.95rem; line-height:1.7; max-width:85%;
}
</style>""", unsafe_allow_html=True)

    # タイトル
    st.markdown(f"""
<div style="text-align:center; margin-bottom:30px;">
  <div style="display:inline-block; background:{article['category_color']}; color:white;
      font-size:0.85rem; padding:4px 16px; border-radius:20px; margin-bottom:15px; font-weight:800;">
    {article['category']}
  </div>
  <h1 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800; color:#2D3436;
      font-size:2rem; margin-bottom:12px; line-height:1.35;">
    {article['title']}
  </h1>
  <div style="color:#888; font-size:0.9rem; display:flex; justify-content:center; gap:20px;">
    <span>📅 更新日: {article['date']}</span>
    <span>⏱️ 読了目安: 約{article['reading_time']}分</span>
  </div>
</div>
""", unsafe_allow_html=True)

    # ヘッダー画像
    img_name = article.get('image', f"{article['id']}.jpg")
    img_path = os.path.join(IMAGE_DIR, "column", img_name)
    img_b64 = get_image_base64(img_path)
    if img_b64:
        st.markdown(f"""<div style="border-radius:20px; overflow:hidden; margin-bottom:36px;
    box-shadow:0 12px 36px rgba(0,0,0,0.10);">
  <img src="data:image/jpeg;base64,{img_b64}" style="width:100%; height:auto; display:block;">
</div>""", unsafe_allow_html=True)

    # カブ先生のひとこと
    hakase_icon = chara_img('hakase', width=50)
    st.markdown(f"""<div class="col-kabu-bubble">
  <div style="flex-shrink:0;">{hakase_icon}</div>
  <div class="col-kabu-text">
    <b>カブ先生：</b><br>
    今日は「{article['title']}」について, じっくり解説していくぞ！<br>
    読み終わる頃には, 一歩「賢い投資家」に近づいているはずじゃ。
  </div>
</div>""", unsafe_allow_html=True)

    # 本文 — markdownとして別途レンダリング（rawにならない）
    st.markdown('<div class="col-detail-body">', unsafe_allow_html=True)
    st.markdown(article["body"])
    st.markdown('</div>', unsafe_allow_html=True)

    # まとめボックス
    st.markdown(f"""<div style="background:#F8F9FA; border-radius:12px; padding:24px;
    margin-top:40px; border-left:8px solid {article['category_color']};">
  <div style="font-weight:800; color:#2D3436; margin-bottom:10px;">💡 今回の重要ポイント！</div>
  <div style="font-size:0.95rem; line-height:1.7; color:#636E72;">
    投資の知識は一生の宝物じゃ。毎日少しずつでも良いから、わしと一緒に学んでいこう。<br>
    わからないことがあれば、いつでも質問箱へおいで！
  </div>
</div>""", unsafe_allow_html=True)

    # 前後ナビゲーション
    try:
        current_idx = next(i for i, c in enumerate(articles) if c["id"] == column_id)
        prev_article = articles[current_idx - 1] if current_idx > 0 else None
        next_article = articles[current_idx + 1] if current_idx < len(articles) - 1 else None

        if prev_article or next_article:
            col_prev, col_next = st.columns(2)
            with col_prev:
                if prev_article:
                    st.markdown(f"""<a href="?page=column_detail&id={prev_article['id']}" target="_self" style="text-decoration:none;">
<div class="column-card" style="background:white; padding:14px; border-radius:12px; border:1px solid #eee;">
  <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">← 前のコラム</div>
  <div style="font-weight:800; color:#2D3436; font-size:0.9rem;">{prev_article['title']}</div>
</div></a>""", unsafe_allow_html=True)
            with col_next:
                if next_article:
                    st.markdown(f"""<a href="?page=column_detail&id={next_article['id']}" target="_self" style="text-decoration:none;">
<div class="column-card" style="background:white; padding:14px; border-radius:12px; border:1px solid #eee; text-align:right;">
  <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">次のコラム →</div>
  <div style="font-weight:800; color:#2D3436; font-size:0.9rem;">{next_article['title']}</div>
</div></a>""", unsafe_allow_html=True)
    except Exception:
        pass

    st.markdown("<br>", unsafe_allow_html=True)

    # 下部ボタン
    c1, c2 = st.columns(2)
    with c1:
        st.markdown('<a href="?page=home" target="_self" style="text-decoration:none;"><button style="width:100%; padding:12px; border-radius:12px; border:1px solid #ddd; background:white; color:#2D3436; cursor:pointer; font-weight:800;">🏠 ホームに戻る</button></a>', unsafe_allow_html=True)
    with c2:
        st.markdown('<a href="?page=column" target="_self" style="text-decoration:none;"><button style="width:100%; padding:12px; border-radius:12px; border:1px solid #ddd; background:white; color:#2D3436; cursor:pointer; font-weight:800;">📰 一覧に戻る</button></a>', unsafe_allow_html=True)

    # タグ
    if article.get("tags"):
        tag_html = " ".join([f'<span style="background:#f0f0f0; color:#666; padding:6px 14px; border-radius:20px; font-size:0.85rem; margin-right:6px;">#{t}</span>' for t in article["tags"]])
        st.markdown(f'<div style="margin-top:24px; margin-bottom:60px;">{tag_html}</div>', unsafe_allow_html=True)
