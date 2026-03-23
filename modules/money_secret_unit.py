import streamlit as st
import os
from modules.ui_components import get_image_base64, IMAGE_DIR, chara_img, icon_img
import json

# 裏事情エピソード定義の読み込み
@st.cache_data(show_spinner=False)
def load_ura_episodes():
    json_path = os.path.join("data", "money_secrets.json")
    try:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                # パスを絶対パスっぽく解決
                for item in data:
                    item["image_path"] = os.path.join(os.getcwd(), item["image_path"])
                    item["thumbnail"] = os.path.join(os.getcwd(), item["thumbnail"])
                return data
    except Exception as e:
        st.error(f"Error loading money_secrets.json: {e}")
    return []

ura_episodes = load_ura_episodes()

def render_money_secret_page():
    """お金の裏事情ページのエントリポイント"""
    qp_ep = st.query_params.get("ep")
    if qp_ep is not None:
        try:
            st.session_state.selected_ura_ep = int(qp_ep)
        except ValueError:
            pass

    if "selected_ura_ep" not in st.session_state:
        st.session_state.selected_ura_ep = None

    if st.session_state.selected_ura_ep is None:
        render_ura_list()
    else:
        render_ura_viewer(st.session_state.selected_ura_ep)

def render_ura_list():
    """エピソード一覧ページ"""
    st.markdown("""<style>
.manga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
.manga-card { 
    background: white; border-radius: 16px; overflow: hidden; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; border: 1px solid #f0f0f0;
}
.manga-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
</style>""", unsafe_allow_html=True)

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">🕵️ お金の裏事情ファイル</h2>', unsafe_allow_html=True)
    
    # ウラ金さんの説明
    from modules.ui_components import character_explain, CHARA
    character_explain(
        CHARA["urakane"],
        "ヒッヒッ……。表の世界だけ見てちゃ、本当の成功は掴めねぇぜ。<br>"
        "投資に潜む『罠』や『裏のルール』を教えてやるから、しっかり耳をかっぽじって聞きな！",
        bg_color="#FFF9E6"
    )
    
    cols = st.columns(2)
    for i, ep in enumerate(ura_episodes):
        col = cols[i % 2]
        with col:
            b64 = get_image_base64(ep["thumbnail"]) if os.path.exists(ep["thumbnail"]) else ""
            st.markdown(f"""<div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; margin-bottom: 20px;">
{f'<img src="data:image/png;base64,{b64}" style="width:100%; height:200px; object-fit:cover;">' if b64 else '<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; font-size:3rem;">🕵️</div>'}
<div style="padding: 20px;">
<div style="font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px;">第{ep['ep']}話</div>
<div style="font-size: 1.15rem; font-weight: 800; color: #2D3436; margin-bottom: 8px;">{ep['title']}</div>
<div style="font-size: 0.85rem; color: #636E72; margin-bottom: 16px;">{ep['summary']}</div>
</div>
</div>""", unsafe_allow_html=True)
            if st.button(f"第{ep['ep']}話を読む →", key=f"read_ura_{ep['ep']}", use_container_width=True):
                st.session_state.selected_ura_ep = ep['ep']
                st.rerun()

def render_ura_viewer(ep_num):
    """裏事情詳細ビューア"""
    ep = next((e for e in ura_episodes if e["ep"] == ep_num), None)
    if not ep:
        st.session_state.selected_ura_ep = None
        st.rerun()
        return

    # 戻るボタン
    if st.button("← 一覧にもどる", type="secondary"):
        st.session_state.selected_ura_ep = None
        if "ep" in st.query_params:
            del st.query_params["ep"]
        st.rerun()

    # チャット用スタイル
    st.markdown("""<style>
.urakane-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 30px;
    color: #2D3436;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}
.ura-chat-flex {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}
.ura-bubble {
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 85%;
    color: #333;
}
.ura-bubble-evil {
    background: #FFEAA7;
    border-bottom-left-radius: 2px;
    border: 2px solid #D63031;
}
.ura-bubble-user {
    background: #F8F9FA;
    border-bottom-right-radius: 2px;
    border: 1px solid #E9ECEF;
    margin-left: auto;
}
.ura-bubble-teacher {
    background: #E8F8FF;
    border-bottom-left-radius: 2px;
    border: 2px solid #0984E3;
}
.fraud-list {
    margin: 10px 0;
    padding-left: 20px;
}
.fraud-list li {
    margin-bottom: 8px;
    font-size: 0.9rem;
}
</style>""", unsafe_allow_html=True)

    st.markdown(f"""<div style="text-align: center; margin: 20px 0;">
<h2 style="font-family:'M PLUS Rounded 1c',sans-serif;font-weight:800;margin-top:0;">第{ep['ep']}話：{ep['title']}</h2>
</div>""", unsafe_allow_html=True)

    # キャラクターアイコン取得
    urakane_icon = chara_img('urakane', width=50)
    maneta_icon  = chara_img('maneta', width=50)
    mirai_icon   = chara_img('mirai', width=50)
    hakase_icon  = chara_img('hakase', width=50)
    warning_icon = icon_img('warning.png', 24)

    # マンガ画像
    manga_b64 = get_image_base64(ep["image_path"]) if os.path.exists(ep["image_path"]) else ""

    # チャットコンテンツの抽出とプレースホルダー置換
    chat_html = ep.get("chat_html", "")
    chat_html = chat_html.replace("{{HAKASE_ICON}}", hakase_icon)
    chat_html = chat_html.replace("{{MANETA_ICON}}", maneta_icon)
    chat_html = chat_html.replace("{{MIRAI_ICON}}", mirai_icon)
    chat_html = chat_html.replace("{{URAKANE_ICON}}", urakane_icon)
    chat_html = chat_html.replace("{{WARNING_ICON}}", warning_icon)

    full_content_html = f"""<div class="urakane-section">
<div style="text-align:center; margin-bottom:30px;">
{f'<img src="data:image/png;base64,{manga_b64}" style="width:100%; max-width:600px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.1);">' if manga_b64 else '<span style="font-size:3rem">🖼️</span>'}
</div>
{chat_html}
</div>"""
    st.markdown(full_content_html, unsafe_allow_html=True)

    if st.button("一覧へもどる", key="back_ura_bottom", use_container_width=True):
        st.session_state.selected_ura_ep = None
        if "ep" in st.query_params:
            del st.query_params["ep"]
        st.rerun()
