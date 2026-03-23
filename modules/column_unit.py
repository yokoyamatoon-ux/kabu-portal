import streamlit as st
import os
import json
from datetime import datetime
from modules.ui_components import get_image_base64, CHARA, IMAGE_DIR, character_explain

# ---------------------------------------------------------
# 記事データの読み込み (data/columns.json から)
# ---------------------------------------------------------
@st.cache_data(show_spinner=False)
def load_columns_data():
    json_path = os.path.join("data", "columns.json")
    try:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception as e:
        st.error(f"Error loading columns.json: {e}")
    return []

COLUMNS = load_columns_data()

# ---------------------------------------------------------
# ホーム画面用：コラムプレビュー（4カラムグリッド）
# ---------------------------------------------------------
def render_column_home_section():
    st.markdown("---")
    st.markdown(f"""
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h2 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800; margin:0;">
            🥬 カブ先生のお金のコラム ({datetime.now().strftime('%Y/%m/%d')} 更新)
        </h2>
    </div>
    """, unsafe_allow_html=True)

    if not COLUMNS:
        st.info("現在、新しいコラムを準備中じゃ！")
        return

    cols = st.columns(4)
    # 最新の4件を表示
    display_columns = COLUMNS[:4]
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
            
            st.markdown(f"""
<div style="background:white; border-radius:12px; overflow:hidden;
            box-shadow:0 4px 15px rgba(0,0,0,0.06); height:100%; border:1px solid #f0f0f0;">
  {img_html}
  <div style="padding:12px;">
    <div style="display:inline-block; background:{article['category_color']}; color:white; 
                font-size:0.65rem; padding:2px 8px; border-radius:10px; margin-bottom:8px; font-weight:800;">
      {article['category']}
    </div>
    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">{article['date']}</div>
    <div style="font-weight:800; font-size:0.9rem; color:#2D3436; 
                line-height:1.4; margin-bottom:6px; min-height:2.8em;">
      {article['title']}
    </div>
    <div style="font-size:0.78rem; color:#636E72; line-height:1.5; min-height:4.5em; overflow:hidden;">
      {article['lead']}
    </div>
  </div>
</div>
""", unsafe_allow_html=True)
            if st.button("続きを読む →", key=f"home_col_{article['id']}", use_container_width=True):
                st.session_state.current_page = "column_detail"
                st.session_state.column_id = article["id"]
                st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)
    if st.button("📰 全てのコラムを見る →", key="btn_all_columns", use_container_width=True):
        st.session_state.current_page = "column"
        st.rerun()

# ---------------------------------------------------------
# 一覧ページ：マンガページ風レイアウト（2カラム）
# ---------------------------------------------------------
def render_column_list_page():
    st.markdown(f"""
    <div style="text-align:center; padding:40px 20px; background:#FFF; border-radius:24px; margin-bottom:30px; border:2px solid #FFE082;">
        <h1 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800; color:#2D3436; font-size:2.2rem; margin-bottom:12px;">
            🥬 カブ先生の「お金のコラム」
        </h1>
        <p style="color:#636E72; font-size:1.1rem; max-width:600px; margin:0 auto;">
            投資の最新ニュースや「今さら聞けない」経済の基本まで、<br>
            カブ先生がわかりやすく解説するぞ！
        </p>
    </div>
    """, unsafe_allow_html=True)

    # 博士の挨拶
    character_explain(
        CHARA["hakase"],
        "投資の知識は一生の宝物じゃ！<br>毎日少しずつ、ワシと一緒に学んでいこう。難しいことも分かりやすく教えるぞ。",
        bg_color="#FFF9F0"
    )

    st.markdown('<div style="margin-top:30px;"></div>', unsafe_allow_html=True)

    if not COLUMNS:
        st.info("現在、新しいコラムを準備中じゃ！")
        return
    
    # 2カラムでカードを表示
    cols = st.columns(2)
    for i, article in enumerate(COLUMNS):
        with cols[i % 2]:
            img_name = article.get('image', f"{article['id']}.jpg")
            img_path = os.path.join(IMAGE_DIR, "column", img_name)
            img_b64 = get_image_base64(img_path)
            
            img_html = (
                f'<div style="width:100%; height:200px; background:url(data:image/jpeg;base64,{img_b64}) center/cover;"></div>'
                if img_b64 else 
                f'<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; color:#ccc;">No Image</div>'
            )
            
            st.markdown(f"""
<div style="background:white; border-radius:12px; overflow:hidden;
            box-shadow:0 4px 15px rgba(0,0,0,0.07); margin-bottom:8px; border: 1px solid #f0f0f0;">
  {img_html}
  <div style="padding:20px;">
    <div style="display:inline-block; background:{article['category_color']}; color:white; 
                font-size:0.75rem; padding:3px 10px; border-radius:12px; margin-bottom:10px; font-weight:800;">
      {article['category']}
    </div>
    <div style="font-size:0.85rem; color:#888; margin-bottom:8px;">{article['date']}</div>
    <h3 style="font-weight:800; margin-bottom:12px; color:#2D3436; line-height:1.4;">{article['title']}</h3>
    <p style="font-size:0.92rem; color:#636E72; line-height:1.6; margin-bottom:0;">{article['lead']}</p>
  </div>
</div>
""", unsafe_allow_html=True)
            if st.button(f"コラムを読む →", key=f"list_col_{article['id']}", use_container_width=True):
                st.session_state.current_page = "column_detail"
                st.session_state.column_id = article["id"]
                st.rerun()
            st.markdown("<br>", unsafe_allow_html=True)

# ---------------------------------------------------------
# 詳細ページ：ウラ金ページ風レイアウト（画像 -> 本文）
# ---------------------------------------------------------
def render_column_detail_page(column_id: str):
    article = next((c for c in COLUMNS if c["id"] == column_id), None)
    if not article:
        st.error("記事が見つかりませんでした。")
        if st.button("一覧に戻る"):
            st.session_state.current_page = "column"
            st.rerun()
        return

    # ① ヘッダー画像
    img_name = article.get('image', f"{article['id']}.jpg")
    img_path = os.path.join(IMAGE_DIR, "column", img_name)
    img_b64 = get_image_base64(img_path)
    if img_b64:
        st.markdown(f"""
        <div style="width:100%; max-height:400px; overflow:hidden; border-radius:24px; margin-bottom:30px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            <img src="data:image/jpeg;base64,{img_b64}" style="width:100%; height:auto; display:block;">
        </div>
        """, unsafe_allow_html=True)
    
    # ② タイトル・メタ情報
    st.markdown(f"""
    <div style="margin-bottom:30px; border-bottom:2px solid #f0f0f0; padding-bottom:20px;">
        <div style="display:inline-block; background:{article['category_color']}; color:white; 
                    font-size:0.8rem; padding:4px 12px; border-radius:12px; margin-bottom:12px; font-weight:800;">
          {article['category']}
        </div>
        <h1 style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800; color:#2D3436; font-size:2.2rem; margin-bottom:16px; line-height:1.3;">
            {article['title']}
        </h1>
        <div style="display:flex; justify-content:space-between; align-items:center; color:#888; font-size:1rem;">
            <span>⏱️ 読了目安: 約{article['reading_time']}分</span>
            <span>📅 公開日: {article['date']}</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # ③ 本文 (Markdown)
    st.markdown(article["body"])

    st.markdown("<br><br>", unsafe_allow_html=True)
    
    # 戻るボタン
    col1, col2 = st.columns(2)
    with col1:
        if st.button("🏠 ホームに戻る", use_container_width=True):
            st.session_state.current_page = "home"
            st.rerun()
    with col2:
        if st.button("📰 一覧に戻る", use_container_width=True):
            st.session_state.current_page = "column"
            st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)
    
    # タグ
    if article.get("tags"):
        tag_html = " ".join([f'<span style="background:#f0f0f0; color:#666; padding:4px 10px; border-radius:15px; font-size:0.8rem; margin-right:8px;">#{t}</span>' for t in article["tags"]])
        st.markdown(f"<div style='margin-bottom:40px;'>{tag_html}</div>", unsafe_allow_html=True)
