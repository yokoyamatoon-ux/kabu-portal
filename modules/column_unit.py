import streamlit as st
import json
import os
from datetime import datetime
from modules.ui_components import (
    get_image_base64, chara_img, icon_img, CHARA, character_explain
)

DATA_FILE = os.path.join(os.getcwd(), "data", "columns.json")

def load_columns():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        st.error(f"Error loading columns: {e}")
        return []

def render_column_preview():
    """ホーム画面用の最新コラムプレビュー"""
    columns = load_columns()
    if not columns:
        return

    latest = columns[0]
    
    st.markdown(f"""
    <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
            <div class="section-title">🥬 カブ先生の今日のコラム</div>
            <div style="font-size: 0.75rem; color: #888; margin-top: -4px;">更新日: {latest['date']}</div>
        </div>
        <div style="margin-bottom: 2px;">
            <a href="?page=column" target="_self" style="
                text-decoration: none;
                background: #FF6B6B;
                color: white;
                padding: 8px 24px;
                border-radius: 50px;
                font-size: 0.85rem;
                font-weight: 800;
                box-shadow: 0 4px 12px rgba(255,107,107,0.25);
                transition: all 0.2s;
                display: inline-block;
            ">過去のコラムを見る →</a>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # 吹き出し形式で表示
    character_explain(
        CHARA.get(latest['author'], CHARA['hakase']),
        f"<b>【{latest['title']}】</b><br>{latest['content']}",
        bg_color="#FFF9F0"
    )

def render_column_page():
    """コラム一覧ページ"""
    st.markdown('<div class="page-content">', unsafe_allow_html=True)
    
    # ヒカリの説明
    character_explain(
        CHARA["mirai"],
        "カブ先生が毎日、投資やお金についての大切なことをつぶやいてくれるよ！✨<br>"
        "ここをチェックすれば、あなたも investment master になれるかも！？",
        bg_color="#E8F8FF"
    )

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">📰 カブ先生の今日のコラム</h2>', unsafe_allow_html=True)

    columns = load_columns()
    if not columns:
        st.info("まだコラムがありません。")
        st.markdown('</div>', unsafe_allow_html=True)
        return

    for col in columns:
        content_html = col['content'].replace('\n', '<br>')
        with st.expander(f"{col['date']} : {col['title']}", expanded=(col == columns[0])):
            st.markdown(f"""
            <div style="padding: 10px; line-height: 1.8; color: #2D3436;">
                {content_html}
            </div>
            """, unsafe_allow_html=True)
        
        # 著者アイコン
        author_b64 = get_image_base64(CHARA.get(col['author'], CHARA['hakase']))
        st.markdown(f"""
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px; justify-content: flex-end;">
            <span style="font-size: 0.8rem; color: #888;">執筆: カブ先生</span>
            <img src="data:image/png;base64,{author_b64}" style="width: 32px; border-radius: 50%;">
        </div>
        """, unsafe_allow_html=True)

    st.markdown('</div>', unsafe_allow_html=True)
