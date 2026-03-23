import streamlit as st
import json
import os
from datetime import datetime
from modules.ui_components import (
    get_image_base64, CHARA, character_explain
)

DATA_FILE = os.path.join(os.getcwd(), "data", "columns.json")

def load_columns():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

def render_column_preview():
    """ホーム画面用のコラムプレビュー（4列グリッド、旧ニュース形式）"""
    columns = load_columns()
    # 表示用のコラム（データがなければ「準備中」を4つ）
    if not columns:
        latest_cols = [
            {"id": "prep1", "date": "Coming Soon", "title": "新しいコラムを準備中じゃ！", "thumbnail": ""},
            {"id": "prep2", "date": "Coming Soon", "title": "投資の裏話もお楽しみに...", "thumbnail": ""},
            {"id": "prep3", "date": "Coming Soon", "title": "カブ先生執筆中...", "thumbnail": ""},
            {"id": "prep4", "date": "Coming Soon", "title": "近日公開予定✨", "thumbnail": ""},
        ]
    else:
        latest_cols = columns[:4]

    st.markdown("""
    <div style="display: flex; align-items: center; gap: 8px; margin: 20px 0 15px;">
        <span style="background: #FFE082; padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">🥬 今日のコラム</span>
        <a href="?page=column" target="_self" style="margin-left: auto; text-decoration: none;">
            <div style="background: #FF6B6B; color: white; padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 0.8rem;">コラム一覧へ →</div>
        </a>
    </div>
    """, unsafe_allow_html=True)

    cols = st.columns(4)
    for i, col in enumerate(latest_cols):
        with cols[i]:
            thumb_path = col.get("thumbnail")
            if thumb_path and os.path.exists(thumb_path):
                b64 = get_image_base64(thumb_path)
            else:
                b64 = get_image_base64(CHARA["hakase"])
            
            st.markdown(f"""
            <div style="
                background: white; border-radius: 16px; overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #f0f0f0;
                transition: transform 0.2s; cursor: pointer; height: 100%;
            ">
                <img src="data:image/png;base64,{b64}" style="width:100%; height:140px; object-fit:cover; opacity:{0.6 if 'prep' in col['id'] else 1.0};">
                <div style="padding: 15px;">
                    <div style="background:#FF6B6B; color:white; padding:2px 8px; border-radius:10px; font-size:0.75rem; display:inline-block; margin-bottom:8px;">🥬 今日のコラム</div>
                    <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">{col['date']}</div>
                    <div style="font-size:0.95rem; font-weight:800; color:{'#888' if 'prep' in col['id'] else '#2D3436'}; margin-bottom:12px; line-height:1.3; min-height:2.6em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        {col['title']}
                    </div>
                    <div style="background:#FFF9F0; border:1px solid #FFE082; color:#E67E22; border-radius:20px; padding:6px 12px; font-size:0.85rem; text-align:center; font-weight:700;">🥬 カブ博士に聞く</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            if st.button("読む →", key=f"preview_read_{col['id']}", use_container_width=True, disabled=('prep' in col['id'])):
                st.session_state.current_page = "column"
                st.session_state.selected_column_id = col['id']
                st.rerun()

def render_column_page():
    """コラムページのエントリポイント（マンガページ方式）"""
    if "selected_column_id" not in st.session_state:
        st.session_state.selected_column_id = None

    if st.session_state.selected_column_id is None:
        render_column_list()
    else:
        render_column_viewer(st.session_state.selected_column_id)

def render_column_list():
    """コラム一覧ページ（マンガページ・グリッド表示）"""
    columns = load_columns()
    
    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">🥬 カブ先生のお金のコラム</h2>', unsafe_allow_html=True)
    
    character_explain(
        CHARA["hakase"],
        "投資の知識は一生の宝物じゃ！<br>毎日少しずつ、ワシと一緒に学んでいこう。難しいことも分かりやすく教えるぞ。",
        bg_color="#FFF9F0"
    )
    
    if not columns:
        st.info("コラムは準備中じゃ。楽しみに待っておれ！")
        return

    cols = st.columns(2)
    for i, col in enumerate(columns):
        with cols[i % 2]:
            thumb_path = col.get("thumbnail")
            if thumb_path and os.path.exists(thumb_path):
                b64 = get_image_base64(thumb_path)
            else:
                b64 = get_image_base64(CHARA["hakase"])
                
            st.markdown(f"""
            <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; margin-bottom: 20px;">
              <img src="data:image/png;base64,{b64}" style="width:100%; height:200px; object-fit:cover;">
              <div style="padding: 20px;">
                <div style="font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px;">{col['date']}</div>
                <div style="font-size: 1.15rem; font-weight: 800; color: #2D3436; margin-bottom: 8px;">{col['title']}</div>
                <div style="font-size: 0.85rem; color: #636E72; margin-bottom: 16px; line-height: 1.5;">
                    {col['content'][:60]}...
                </div>
              </div>
            </div>
            """, unsafe_allow_html=True)
            if st.button(f"詳しく読む →", key=f"list_read_{col['id']}", use_container_width=True):
                st.session_state.selected_column_id = col['id']
                st.rerun()

def render_column_viewer(col_id):
    """コラム詳細ビューア（ウラ金さんページ方式、フキダシなし）"""
    columns = load_columns()
    col = next((c for c in columns if c["id"] == col_id), None)
    
    if not col:
        st.session_state.selected_column_id = None
        st.rerun()
        return

    # 戻るボタン
    if st.button("← 一覧にもどる", type="secondary"):
        st.session_state.selected_column_id = None
        st.rerun()

    st.markdown(f"""
    <div style="text-align: center; margin: 20px 0;">
        <div style="font-size: 0.9rem; color: #FF6B6B; font-weight: 800;">{col['date']}</div>
        <h2 style="font-family:'M PLUS Rounded 1c',sans-serif;font-weight:800;margin-top:4px;">{col['title']}</h2>
    </div>
    """, unsafe_allow_html=True)

    # メイン画像（あれば）
    thumb_path = col.get("thumbnail")
    if thumb_path and os.path.exists(thumb_path):
        b64 = get_image_base64(thumb_path)
        st.markdown(f"""
        <div style="max-width: 800px; margin: 0 auto 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">
            <img src="data:image/png;base64,{b64}" style="width:100%; display:block;">
        </div>
        """, unsafe_allow_html=True)

    # コンテンツ（フキダシなしのテキスト）
    content_html = col['content'].replace('\n', '<br>')
    st.markdown(f"""
    <div style="
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        border: 1px solid #f0f0f0;
        line-height: 2.0;
        color: #2D3436;
        font-size: 1.05rem;
    ">
        {content_html}
        
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px dashed #eee; justify-content: flex-end;">
            <div style="text-align: right;">
                <div style="font-size: 0.8rem; color: #888;">執筆者</div>
                <div style="font-weight: 800; color: #2D3436;">カブ先生</div>
            </div>
            <img src="data:image/png;base64,{get_image_base64(CHARA['hakase'])}" style="width: 50px; border-radius: 50%; border: 2px solid #FFE082;">
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("<br><br>", unsafe_allow_html=True)
    if st.button("📖 一覧へ戻る", key="back_bottom", use_container_width=True):
        st.session_state.selected_column_id = None
        st.rerun()
