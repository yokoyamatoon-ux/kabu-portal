import streamlit as st
import os
import base64

# 画像パス関連
BASE_DIR = os.getcwd()
IMAGE_DIR = os.path.join(BASE_DIR, "image")
ICON_DIR  = os.path.join(BASE_DIR, "illust", "icons")
CHARA = {
    "hakase": os.path.join(IMAGE_DIR, "kabuhakase_new.png"),
    "maneta": os.path.join(IMAGE_DIR, "maneta_new.png"),
    "mirai":  os.path.join(IMAGE_DIR, "mirai_new.png"),
    "urakane": os.path.join(IMAGE_DIR, "urakane_new.png"),
}
TOP_BANNERS = [
    os.path.join(IMAGE_DIR, "Top01.jpg"),
    os.path.join(IMAGE_DIR, "Top02.jpg"),
    os.path.join(IMAGE_DIR, "Top03.jpg"),
]

@st.cache_data(show_spinner=False)
def get_image_base64(path: str) -> str:
    """画像ファイルをbase64文字列に変換。ファイルの更新日時をチェックしてキャッシュを更新。"""
    if not path or not os.path.exists(path): return ""
    
    # ファイルの更新日時を取得してハッシュの代わりに使うことで、ファイル変更時にキャッシュを無効化する
    mtime = os.path.getmtime(path)
    return _get_image_base64_cached(path, mtime)

@st.cache_data(show_spinner=False)
def _get_image_base64_cached(path: str, mtime: float) -> str:
    try:
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode()
    except:
        return ""

def chara_img(key: str, width: int = 70) -> str:
    """キャラクター画像のHTMLタグを返す。画像がない場合は絵文字で代替"""
    fallback = {"hakase": "🌿", "maneta": "👦", "mirai": "👧", "urakane": "🥔"}
    b64 = get_image_base64(CHARA.get(key, ""))
    if b64:
        return f'<img src="data:image/png;base64,{b64}" style="width:{width}px; flex-shrink:0;">'
    return f'<span style="font-size:{width//2}px;">{fallback.get(key, "🐾")}</span>'

def icon_img(filename: str, width: int = 32) -> str:
    """iconsフォルダからアイコン画像を読み込む"""
    path = os.path.join(ICON_DIR, filename)
    b64  = get_image_base64(path)
    if b64:
        return f'<img src="data:image/png;base64,{b64}" style="width:{width}px;">'
    return ""

def character_explain(character_path: str, message: str, bg_color: str = "#FFF9F0"):
    """キャラクターの吹き出し説明カード"""
    char_b64 = get_image_base64(character_path)
    st.markdown(f"""
<div style="
  display: flex;
  align-items: center;
  gap: 16px;
  background: {bg_color};
  border-radius: 20px;
  padding: 16px 20px;
  margin-bottom: 20px;
  border: 2px solid #FFE082;
">
  <img src="data:image/png;base64,{char_b64}" 
       style="width: 70px; flex-shrink: 0;">
  <div style="
    background: white;
    border-radius: 12px 12px 12px 4px;
    padding: 12px 16px;
    font-size: 0.9rem;
    line-height: 1.7;
    border: 1px solid #eee;
    flex: 1;
  ">{message}</div>
</div>
""", unsafe_allow_html=True)

def render_navbar():
    """サイトらしいナビゲーションバーを描画"""
    
    current = st.session_state.get("current_page", "home")
    
    pages = [
        ("home",    "🏠 ホーム"),
        ("manga",   "📖 マンガ"),
        ("quiz",    "❓ クイズ"),
        ("explore", "🔍 探す"),
        ("qa",      "🎓 質問箱"),
        ("news",    "📰 ニュース"),
        ("money_secret", "⚠️ 裏事情"),
        ("maneta_diary", "📔 投資日記"),
    ]
    
    nav_items = ""
    for key, label in pages:
        is_active = current == key
        active_style = (
            "border-bottom: 3px solid #FF6B6B; color: #FF6B6B; font-weight: 800;"
            if is_active else
            "border-bottom: 3px solid transparent; color: #2D3436;"
        )
        # hover効果のためのCSSはコンテナ側に記述
        nav_items += f"""
<a href="?page={key}" target="_self" class="nav-link" style="{active_style}">
  {label}
</a>
"""
    
    st.markdown(f"""
<style>
.kabu-navbar {{
  background: white !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-radius: 16px;
  padding: 0 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 60px !important;
  z-index: 999999 !important;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 50px !important;
}}
@media (max-width: 768px) {{
  .kabu-navbar {{
    position: fixed;
    top: 60px !important;
    bottom: auto;
    left: 0;
    right: 0;
    margin-bottom: 0;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    padding: 8px 8px;
    z-index: 999999 !important;
    min-height: 50px !important;
  }}
}}
.kabu-navbar::-webkit-scrollbar {{
  display: none;
}}
.nav-logo {{
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  color: #FF6B6B;
  padding: 14px 12px;
  border-right: 1px solid #eee;
  margin-right: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}}
.nav-link {{
  text-decoration: none;
  padding: 14px 15px;
  font-size: 0.9rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}}
@media (max-width: 480px) {{
  .nav-logo {{ font-size: 0.9rem; padding: 12px 8px; }}
  .nav-link {{ padding: 12px 10px; font-size: 0.85rem; }}
}}
.nav-link:hover {{
  color: #FF6B6B !important;
  border-bottom-color: #FF6B6B !important;
}}
</style>
<div class="kabu-navbar">
  <div class="nav-logo" style="display: flex; align-items: center; gap: 4px;">
    {chara_img("hakase", 24)} お金の学校
  </div>
  {nav_items}
</div>
""", unsafe_allow_html=True)
    
    # URLのクエリパラメータでページを切り替える
    qp = st.query_params
    page_from_url = qp.get("page", None)
    valid_pages = [p[0] for p in pages]
    if page_from_url and page_from_url in valid_pages:
        if st.session_state.get("current_page") != page_from_url:
            st.session_state.current_page = page_from_url
            st.rerun()

def render_hero_slider():
    """CSS animationによる自動切替ヒーローバナ（画像背景版）"""
    
    # 画像の読み込み
    banner_imgs = [get_image_base64(path) for path in TOP_BANNERS]
    
    # 各スライドの設定
    banners = [
        {
            "img": banner_imgs[0] if len(banner_imgs)>0 else "",
            "title": "投資って、楽しいかも！",
            "subtitle": "AIがぜんぶ教えてくれるから、むずかしくないよ✨",
            "btn_text": "AI投資診断をスタート →",
            "btn_page": "home",
            "accent": "#FF6B6B",
        },
        {
            "img": banner_imgs[1] if len(banner_imgs)>1 else "",
            "title": "気になる会社を探してみよう",
            "subtitle": "トヨタ・Apple・NVIDIAなど有名企業の株価をすぐ確認📊",
            "btn_text": "銘柄を探す →",
            "btn_page": "explore",
            "accent": "#4ECDC4",
        },
        {
            "img": banner_imgs[2] if len(banner_imgs)>2 else "",
            "title": "カブ先生に質問しよう",
            "subtitle": "投資のギモン、なんでも聞いてね！AIカブ先生がやさしく答えるよ🎓",
            "btn_text": "質問箱へ行く →",
            "btn_page": "qa",
            "accent": "#A29BFE",
        },
    ]
    
    slides_html = ""
    dots_html   = ""
    
    for i, banner in enumerate(banners):
        anim_name = f"slide{i}"
        bg_style = f"background-image: url(data:image/png;base64,{banner['img']});" if banner['img'] else "background: #eee;"
        
        slides_html += f"""
<div class="hero-slide" style="{bg_style} animation-name: {anim_name};">
<div class="hero-overlay"></div>
<div style="position: relative; z-index: 2; flex: 1;">
<h2 class="hero-title">{banner['title']}</h2>
<p class="hero-subtitle">{banner['subtitle']}</p>
<a href="?page={banner['btn_page']}" target="_self" class="hero-btn" style="background: {banner['accent']};">
{banner['btn_text']}
</a>
</div>
</div>
"""
        dots_html += f'<span class="hero-dot" style="background: {banner["accent"]}; animation-name: dot{i};"></span>'
    
    st.markdown(f"""
<style>
.hero-container {{
  position: relative;
  height: 320px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 24px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}}
@media (min-width: 1200px) {{
  .hero-container {{
    margin-left: -50px;
    margin-right: -50px;
    height: 380px;
  }}
}}
.hero-slide {{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 32px 40px;
  gap: 24px;
  background-size: cover;
  background-position: center;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  opacity: 0;
}}
.hero-overlay {{
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 60%, transparent 100%);
  z-index: 1;
}}
.hero-title {{
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #2D3436;
  margin: 0 0 10px;
  text-shadow: 0 1px 2px rgba(255,255,255,0.8);
}}
.hero-subtitle {{
  color: #2D3436;
  margin: 0 0 20px;
  font-size: 0.95rem;
  line-height: 1.7;
  font-weight: 500;
}}
.hero-btn {{
  display: inline-block;
  color: white !important;
  border-radius: 50px;
  padding: 12px 28px;
  font-weight: 800;
  text-decoration: none;
  font-size: 0.95rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: transform 0.2s;
}}
.hero-btn:hover {{
  transform: translateY(-2px);
}}
.hero-dot {{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  opacity: 0.3;
}}

@keyframes slide0 {{ 0%, 25% {{ opacity: 1; }} 33.33%, 100% {{ opacity: 0; }} }}
@keyframes slide1 {{ 0%, 25% {{ opacity: 0; }} 33.33%, 58.33% {{ opacity: 1; }} 66.67%, 100% {{ opacity: 0; }} }}
@keyframes slide2 {{ 0%, 58.33% {{ opacity: 0; }} 66.67%, 91.67% {{ opacity: 1; }} 100% {{ opacity: 0; }} }}
@keyframes dot0 {{ 0%, 25% {{ opacity: 1; }} 33.33%, 100% {{ opacity: 0.3; }} }}
@keyframes dot1 {{ 0%, 25% {{ opacity: 0.3; }} 33.33%, 58.33% {{ opacity: 1; }} 66.67%, 100% {{ opacity: 0.3; }} }}
@keyframes dot2 {{ 0%, 58.33% {{ opacity: 0.3; }} 66.67%, 91.67% {{ opacity: 1; }} 100% {{ opacity: 0.3; }} }}

@media (max-width: 480px) {{
  .hero-container {{ height: 200px; }}
  .hero-title {{ font-size: 1.3rem; }}
  .hero-slide {{ padding: 16px 20px; }}
  .hero-overlay {{
    background: rgba(255,255,255,0.7);
  }}
}}
</style>

<div class="hero-container">
  {slides_html}
</div>

<div style="text-align: center; margin-bottom: 20px;">
  {dots_html}
</div>
""", unsafe_allow_html=True)
