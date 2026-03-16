import streamlit as st
import os
import base64
from datetime import datetime

from modules.ui_components import (
    get_image_base64, chara_img, icon_img, CHARA, TOP_BANNERS, render_navbar
)

# 2. ページ設定
st.set_page_config(
    page_title="カブ先生のだれでもわかるお金の学校 | 投資教育ポータル",
    page_icon=CHARA["hakase"] if "hakase" in CHARA else "🎓",
    layout="wide",
)

# SEO & Meta Tags
st.markdown("""
<head>
  <meta name="description" content="カブ先生が教える、初心者・女性・子供向けのだれでもわかる投資教育ポータル。マンガやクイズで楽しくお金について学ぼう。">
  <meta property="og:title" content="カブ先生のだれでもわかるお金の学校">
  <meta property="og:description" content="初心者向け投資教育ポータル。マンガやクイズでお金について楽しく学べます。">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</head>
""", unsafe_allow_html=True)

# 3. 状態管理（st.session_state）の初期化
def init_session_state():
    defaults = {
        "current_page": "home",
        "portfolio":    [],
        "watchlist":    [],
        "balance":      1_000_000,
        "diagnosis_step":    0,
        "diagnosis_answers": [],
        "diagnosis_result":  None,
    }
    for key, val in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = val

init_session_state()

# URLパラメータとセッション状態の同期 (ナビゲーションの安定化)
if "page" in st.query_params:
    qp = st.query_params.get("page")
    if qp != st.session_state.current_page:
        st.session_state.current_page = qp

# 4. スタイリング（style.css）の読み込み
def load_css():
    if os.path.exists("style.css"):
        with open("style.css", encoding="utf-8") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

load_css()

# 5. ナビゲーション構造
def render_navigation():
    from modules.market_data import get_stock_info
    
    # サイドバー実装
    with st.sidebar:
        st.markdown(f"""
<div style="font-family:'M PLUS Rounded 1c', sans-serif; font-weight:800;
            font-size:1.2rem; color:#FF6B6B; padding:8px 0 16px;">
  🎓 カブ先生のお金の学校
</div>
""", unsafe_allow_html=True)
        
        pages = [
            ("home",    "🏠 ホーム"),
            ("manga",   "📖 マンガで学ぶ"),
            ("quiz",    "❓ 投資クイズ"),
            ("explore", "🔍 探す・体験"),
            ("qa",      "🎓 質問箱"),
            ("news",    "📰 ニュース"),
            ("money_secret", "⚠️ お金の裏事情ファイル 🆕"),
            ("maneta_diary", "📈 マネ太のはじめての投資 🆕"),
        ]
        
        for key, label in pages:
            is_active = st.session_state.current_page == key
            btn_style = "primary" if is_active else "secondary"
            if st.button(label, key=f"sb_{key}", use_container_width=True, type=btn_style):
                st.session_state.current_page = key
                st.query_params.page = key
                st.rerun()
        
        st.markdown("---")
        
        # 残高ウィジェット（貯金箱イメージ）
        balance = st.session_state.get("balance", 1_000_000)
        portfolio = st.session_state.get("portfolio", [])
        
        # 仮想損益の計算
        total_gain = 0
        for item in portfolio:
            try:
                info = get_stock_info(item["ticker"])
                if info:
                    current = item["shares"] * info["price"]
                    total_gain += current - item["amount"]
            except:
                pass
        
        gain_color = "#00B894" if total_gain >= 0 else "#FF7675"
        gain_icon  = "📈" if total_gain >= 0 else "📉"
        gain_sign  = "+" if total_gain >= 0 else ""
        
        st.markdown(f"""
<div style="
  background: linear-gradient(135deg, #FFF9C4, #FFF3E0);
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  border: 2px solid #FFE082;
">
  <div style="font-size: 2rem;">{icon_img("piggy_bank.png", 60) if icon_img("piggy_bank.png") else "🏦"}</div>
  <div style="font-size: 0.75rem; color: #888; margin-bottom: 4px;">
    あなたの仮想おさいふ
  </div>
  <div style="font-size: 1.4rem; font-weight: 800; color: #2D3436;">
    ¥{balance:,}
  </div>
  <div style="font-size: 0.8rem; color: {gain_color}; font-weight: 700; margin-top: 4px;">
    {gain_icon} 運用損益: {gain_sign}¥{total_gain:,.0f}
  </div>
  <div style="font-size: 0.7rem; color: #aaa; margin-top: 6px;">
    ※仮想のお金です。実際の投資ではありません
  </div>
</div>
""", unsafe_allow_html=True)
        
        # カブ博士のひとこと
        hakase_b64 = get_image_base64(CHARA["hakase"])
        if total_gain > 0:
            msg = "いい調子だよ！📈<br>このまま続けよう！"
        elif total_gain < 0:
            msg = "少し下がってるけど<br>長期投資は焦らずに🌱"
        else:
            msg = "まだ株を買ってないね！<br>「探す」から始めてみよう✨"
        
        st.markdown(f"""
<div style="display:flex; align-items:center; gap:10px; margin-top:12px; margin-bottom:20px;">
  <img src="data:image/png;base64,{hakase_b64}" style="width:50px; flex-shrink:0;">
  <div style="
    background: white;
    border-radius: 12px 12px 12px 4px;
    padding: 8px 12px;
    font-size: 0.78rem;
    border: 1px solid #eee;
    line-height: 1.5;
  ">{msg}</div>
</div>
""", unsafe_allow_html=True)

        # 7. 市場概況 (日経平均, S&P, ドル円)
        from modules.market_data import get_indices
        indices = get_indices()
        
        st.markdown(f"""
<div style="
  background: #F8F9FA;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #E9ECEF;
">
  <div style="font-size: 0.72rem; color: #6c757d; font-weight: 700; margin-bottom: 8px; text-align: center;">
    📊 今日のマーケット概況<br>
    <span style="font-size: 0.65rem; font-weight: 400;">({datetime.now().strftime('%Y/%m/%d %H:%M')} 現在)</span>
  </div>
""", unsafe_allow_html=True)
        
        idx_html = ""
        for name, data in indices.items():
            price = data["price"]
            change = data["change_pct"]
            color = "#00B894" if change >= 0 else "#FF7675"
            arrow = "▲" if change >= 0 else "▼"
            
            # ドル円の場合は桁数を調整
            if isinstance(price, (int, float)):
                price_str = f"{price:,.0f}" if name != "ドル円" else f"{price:.2f}"
            else:
                price_str = str(price)
            
            idx_html += f"""
<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
  <span style="font-size: 0.95rem; font-weight: 800; color: #495057; margin-top: 2px;">{name}</span>
  <div style="text-align: right;">
    <div style="font-size: 1.5rem; font-weight: 900; color: #2D3436; line-height: 1.1;">{price_str}</div>
    <div style="font-size: 0.9rem; color: {color}; font-weight: 800; margin-top: 2px;">{arrow} {abs(change):.2f}%</div>
  </div>
</div>
"""
        st.markdown(idx_html + "</div>", unsafe_allow_html=True)


# 6. 各ページの実装呼び出し
def run_app():
    render_navbar()
    render_navigation()
    
    page = st.session_state.current_page
    
    if page == "home":
        from modules import home_unit
        home_unit.render_home_page()
    elif page == "news":
        from modules.news_unit import render_news_list_page
        render_news_list_page()
    elif page == "explore":
        from modules import explore_unit
        explore_unit.render_explore_page()
    elif page == "manga":
        from modules.manga_unit import render_manga_page
        render_manga_page()
    elif page == "quiz":
        from modules.quiz_unit import run_quiz_unit
        run_quiz_unit()
    elif page == "qa":
        from modules.qa_unit import render_qa_page
        render_qa_page()
    elif page == "money_secret":
        from modules.money_secret_unit import render_money_secret_page
        render_money_secret_page()
    elif page == "maneta_diary":
        from modules.maneta_diary_unit import render_maneta_diary_page
        render_maneta_diary_page()
    elif page == "legal":
        from modules.legal_unit import render_legal_page
        sub = st.query_params.get("sub", "privacy")
        render_legal_page(sub)
    
    # フッター免責事項
    st.markdown("---")
    st.markdown(f"""
    <div style="font-size: 0.8rem; color: #636E72; text-align: center; padding: 8px 0 16px;">
        ※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。<br>
        &copy; {datetime.now().year} KABU PORTAL Project<br>
        <div style="margin-top: 8px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="?page=legal&sub=privacy"    target="_self" style="color:#FF6B6B; text-decoration:none;">プライバシーポリシー</a>
        <a href="?page=legal&sub=disclaimer" target="_self" style="color:#FF6B6B; text-decoration:none;">免責事項</a>
        <a href="?page=legal&sub=tokushoho" target="_self" style="color:#FF6B6B; text-decoration:none;">特定商取引法表記</a>
        <a href="?page=legal&sub=contact"   target="_self" style="color:#FF6B6B; text-decoration:none;">お問い合わせ</a>
        </div>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    run_app()
