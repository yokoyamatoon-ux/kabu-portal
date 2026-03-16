import streamlit as st
import os
from modules.ui_components import get_image_base64, IMAGE_DIR

def render_maneta_diary_page():
    st.markdown("""
<style>
.diary-page-container {
    background: #FFF9F0;
    color: #333;
    padding: 30px;
    border-radius: 20px;
    border: 3px solid #ffcc5c;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    margin-bottom: 40px;
}
.diary-title {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: #FF6B6B;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 2px dashed #ffcc5c;
    padding-bottom: 15px;
}
</style>
""", unsafe_allow_html=True)

    st.markdown('<div class="diary-page-container">', unsafe_allow_html=True)
    st.markdown('<div class="diary-title">📈 マネ太のはじめての投資日記</div>', unsafe_allow_html=True)
    
    banner_b64 = get_image_base64(os.path.join(IMAGE_DIR, "hajimete.png"))
    if banner_b64:
        st.markdown(f"""
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="data:image/png;base64,{banner_b64}" style="width:100%; max-width:700px; border-radius:12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        </div>
        """, unsafe_allow_html=True)

    st.markdown("""
    <div style="text-align: center; font-size: 1.2rem; margin-bottom: 30px; line-height:1.8;">
        こんにちは！マネ太です👦<br>
        ここでは、ボクが実際に投資に挑戦していくドキュメンタリーをお届けする予定だよ！<br>
        お小遣いが増えるのか、減ってしまうのか…ドキドキの記録を待っててね！<br>
        <span style="color:#FF6B6B; font-weight:800;">※現在は準備中だよ！次回更新をお楽しみに！</span>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("← ホームにもどる", type="primary", use_container_width=True):
        st.session_state.current_page = "home"
        st.rerun()
        
    st.markdown('</div>', unsafe_allow_html=True)
