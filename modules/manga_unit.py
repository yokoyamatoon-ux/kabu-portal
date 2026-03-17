import streamlit as st
import os
from modules.ui_components import get_image_base64

# マンガエピソード定義
MANGA_DIR = os.path.join(os.getcwd(), "manga")
manga_episodes = [
    {
        "ep": 1,
        "title": "株ってなに？",
        "summary": "会社の「オーナーの一部」になることを学ぼう！",
        "image_path": os.path.join(MANGA_DIR, "Manga01.jpg"),
        "thumbnail": os.path.join(MANGA_DIR, "Manga01.jpg"),
    },
    {
        "ep": 2,
        "title": "株価はなぜ動くの？",
        "summary": "需要と供給のしくみをマンガで理解しよう",
        "image_path": os.path.join(MANGA_DIR, "Manga02.jpg"),
        "thumbnail": os.path.join(MANGA_DIR, "Manga02.jpg"),
    },
    {
        "ep": 3,
        "title": "配当金ってなに？",
        "summary": "持ってるだけでもらえるお小遣い！",
        "image_path": os.path.join(MANGA_DIR, "Manga03.jpg"),
        "thumbnail": os.path.join(MANGA_DIR, "Manga03.jpg"),
    },
]

def render_manga_page():
    """マンガ学習ページのエントリポイント"""
    if "selected_manga_ep" not in st.session_state:
        st.session_state.selected_manga_ep = None

    if st.session_state.selected_manga_ep is None:
        render_manga_list()
    else:
        render_manga_viewer(st.session_state.selected_manga_ep)

def render_manga_list():
    """マンガ一覧ページ（グリッド表示）"""
    st.markdown("""
<style>
.manga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
.manga-card { 
    background: white; border-radius: 16px; overflow: hidden; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; border: 1px solid #f0f0f0;
}
.manga-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
.manga-thumb { width: 100%; height: 180px; object-fit: cover; background: #f8f9fa; border-bottom: 1px solid #f0f0f0; }
.manga-info { padding: 15px; }
.manga-ep-label { font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px; }
.manga-title { font-size: 1.1rem; font-weight: 800; color: #2D3436; margin-bottom: 6px; line-height: 1.3; }
.manga-summary { font-size: 0.85rem; color: #636E72; line-height: 1.5; }
</style>
""", unsafe_allow_html=True)

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">📖 マンガで学ぶ</h2>', unsafe_allow_html=True)
    
    # 2列グリッド（Streamlitのcolumnsを使用）
    cols = st.columns(2)
    for i, ep in enumerate(manga_episodes):
        col = cols[i % 2]
        with col:
            b64 = get_image_base64(ep["thumbnail"]) if os.path.exists(ep["thumbnail"]) else ""
            
            # カード全体をボタン的に見せるため、背景と情報をコンテナ化
            # Streamlitのネイティブボタンやクリック検知が必要なため、div + buttonの組み合わせ
            st.markdown(f"""
<div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; margin-bottom: 20px;">
  {f'<img src="data:image/png;base64,{b64}" style="width:100%; height:200px; object-fit:cover;">' if b64 else '<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; font-size:3rem;">🥬</div>'}
  <div style="padding: 20px;">
    <div style="font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px;">第{ep['ep']}話</div>
    <div style="font-size: 1.15rem; font-weight: 800; color: #2D3436; margin-bottom: 8px;">{ep['title']}</div>
    <div style="font-size: 0.85rem; color: #636E72; margin-bottom: 16px;">{ep['summary']}</div>
  </div>
</div>
""", unsafe_allow_html=True)
            if st.button(f"第{ep['ep']}話を読む →", key=f"read_{ep['ep']}", use_container_width=True):
                st.session_state.selected_manga_ep = ep['ep']
                st.rerun()

def render_manga_viewer(ep_num):
    """マンガ詳細ビューア"""
    ep = next((e for e in manga_episodes if e["ep"] == ep_num), None)
    if not ep:
        st.session_state.selected_manga_ep = None
        st.rerun()
        return

    # 戻るボタン
    if st.button("← 一覧にもどる", type="secondary"):
        st.session_state.selected_manga_ep = None
        st.rerun()

    st.markdown(f"""
<div style="text-align: center; margin: 20px 0;">
  <div style="font-size: 0.9rem; color: #FF6B6B; font-weight: 800;">第{ep['ep']}話</div>
  <h2 style="font-family:'M PLUS Rounded 1c',sans-serif;font-weight:800;margin-top:0;">{ep['title']}</h2>
</div>
""", unsafe_allow_html=True)

    # マンガ画像
    if os.path.exists(ep["image_path"]):
        b64 = get_image_base64(ep["image_path"])
        if b64:
            st.markdown(f"""
<div style="max-width: 900px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border-radius: 12px; overflow: hidden;">
  <img src="data:image/png;base64,{b64}" style="width:100%; display:block;">
</div>
""", unsafe_allow_html=True)
        else:
            st.error("画像の読み込みに失敗しました。")
    else:
        # 準備中の表示
        st.markdown(f"""
<div style="
  background:linear-gradient(135deg,#FFF9F0,#FFE8E8);
  border-radius:12px;padding:100px 40px;text-align:center;
  margin:40px auto; max-width: 800px; border:2px dashed #FFB3B3;">
  <div style="font-size:4rem;">📖✨</div>
  <div style="font-weight:800;margin-top:16px;color:#636E72;font-size:1.2rem;">
    ただいま制作中じゃ！<br>
    <span style="font-size:0.9rem;">第{ep['ep']}話はもうすぐ公開されるぞ。楽しみに待っておれ！</span>
  </div>
</div>
""", unsafe_allow_html=True)

    # 下部にも戻るボタン
    st.markdown("<br>", unsafe_allow_html=True)
    if st.button("マンガ一覧へ戻る", key="back_bottom", use_container_width=True):
        st.session_state.selected_manga_ep = None
        st.rerun()
