import streamlit as st
import plotly.graph_objects as go
import yfinance as yf
from modules.ui_components import (
    chara_img, icon_img, CHARA, get_image_base64, TOP_BANNERS, 
    character_explain, render_hero_slider, IMAGE_DIR
)
from datetime import datetime
import os
from modules import news_unit


def render_market_hero():
    """ホームのヒーローエリア + ミニグラフ"""
    
    # (以前のヘッダーはスライダーに置き換えるため、ここでは何も表示しないかシンプルにする)
    pass
    

    # 今日のマーケットミニグラフ（3列）
    st.markdown(f'<div class="section-title">📊 今日のマーケット <span style="font-size: 0.8rem; font-weight: 400; color: #636E72;">({datetime.now().strftime("%Y/%m/%d %H:%M")} 現在)</span></div>', 
                unsafe_allow_html=True)
    
    indices = {
        "日経225 🇯🇵": "^N225",
        "S&P500 🇺🇸":  "^GSPC",
        "ドル円 💴":    "JPY=X",
    }
    
    cols = st.columns(3)
    for col, (label, ticker) in zip(cols, indices.items()):
        with col:
            try:
                # 1ヶ月のデータ取得
                hist_data = yf.Ticker(ticker).history(period="1mo")
                if not hist_data.empty:
                    hist = hist_data["Close"]
                    price  = hist.iloc[-1]
                    prev   = hist.iloc[-2]
                    change = (price - prev) / prev * 100
                    color  = "#00B894" if change >= 0 else "#FF7675"
                    arrow  = "▲" if change >= 0 else "▼"
                    
                    # Plotlyチャート（改善版：目盛りと最新値の強調）
                    fig = go.Figure()
                    fig.add_trace(go.Scatter(
                        y=hist.values,
                        mode="lines+markers",
                        marker=dict(size=4, color=color, opacity=0), # 線を主役に
                        line=dict(color=color, width=3),
                        fill="tozeroy",
                        fillcolor=f"rgba{'(0,184,148,0.1)' if change >= 0 else '(255,118,117,0.1)'}",
                        hoverinfo="y+text",
                    ))
                    # 最新の値にマーカーを置く
                    fig.add_trace(go.Scatter(
                        x=[len(hist)-1],
                        y=[hist.iloc[-1]],
                        mode="markers",
                        marker=dict(size=8, color=color),
                        hoverinfo="skip"
                    ))
                    fig.update_layout(
                        height=100,
                        margin=dict(l=5, r=5, t=5, b=5),
                        showlegend=False,
                        xaxis=dict(visible=False),
                        yaxis=dict(
                            showgrid=True, 
                            gridcolor="#f0f0f0", 
                            gridwidth=1,
                            tickfont=dict(size=8, color="#ccc"),
                            side="right" # 左側をスッキリ
                        ),
                        plot_bgcolor="rgba(0,0,0,0)",
                        paper_bgcolor="rgba(0,0,0,0)",
                    )
                    
                    st.markdown(f"""
<div class="kabu-card" style="text-align:center; padding:12px 8px 4px;">
<div style="font-size:0.75rem; color:#888; margin-bottom:4px;">{label}</div>
<div style="font-size:1.4rem; font-weight:800; color:{color};">{price:,.0f}</div>
<div style="font-size:0.85rem; color:{color}; font-weight:700; margin-bottom:4px;">
{arrow} {change:+.2f}%
</div>
""", unsafe_allow_html=True)
                    st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False}, key=f"chart_{ticker}")
                    st.markdown("</div>", unsafe_allow_html=True)
                else:
                    st.error("No data")
            except Exception as e:
                col.markdown(f"**{label}**\n\nデータ取得中...")

def render_home_page():
    st.markdown('<div class="page-content">', unsafe_allow_html=True)
    
    # 1. ヒーローエリア / AI診断
    is_diagnosis_param = st.query_params.get("diagnosis") == "1"
    if is_diagnosis_param and "show_diagnosis" not in st.session_state:
        st.session_state.show_diagnosis = True
        if "diagnosis_step" not in st.session_state:
            st.session_state.diagnosis_step = 0
        if "diagnosis_answers" not in st.session_state:
            st.session_state.diagnosis_answers = []
    
    is_active_diagnosis = (
        st.session_state.get("show_diagnosis") or
        st.session_state.get("diagnosis_step", 0) > 0
    )
    
    if is_active_diagnosis:
        from modules import diagnosis_unit
        diagnosis_unit.run_diagnosis_unit()
        if st.button("← ホームに戻る", use_container_width=False):
            st.session_state.diagnosis_step = 0
            st.session_state.diagnosis_answers = []
            if "show_diagnosis" in st.session_state: del st.session_state.show_diagnosis
            st.rerun()
        st.markdown('</div>', unsafe_allow_html=True)  # close page-content
        return
    else:
        # 1. 自動切り替えヒーローバナー
        render_hero_slider()

        # 2. ウェルカムバナーの改善（バナー画像版）
        BANNER_PATH = os.path.join(IMAGE_DIR, "banner01.jpg")
        banner_b64 = get_image_base64(BANNER_PATH)
        banner_html = (
            f'<img src="data:image/png;base64,{banner_b64}" '
            f'style="width:100%; max-width:420px; border-radius:12px; object-fit:cover;">'
            if banner_b64 else ""
        )

        st.markdown(f"""
<div style="
background: white;
border-radius: 20px;
padding: 28px 32px;
margin-bottom: 20px;
box-shadow: 0 4px 15px rgba(0,0,0,0.06);
border-left: 5px solid #FFE66D;
display: flex;
align-items: center;
gap: 28px;
flex-wrap: wrap;
">

<!-- テキストエリア（左） -->
<div style="flex: 1; min-width: 260px;">

  <!-- メインタイトル -->
  <div style="
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #2D3436;
    margin-bottom: 12px;
    line-height: 1.3;
  ">
    カブ先生の<br><span style="color:#FF6B6B;">だれでもわかるお金の学校</span>へようこそ！🎓
  </div>

  <!-- サイト概要（3行） -->
  <div style="font-size:0.92rem; color:#444; line-height:1.9; margin-bottom:16px;">
    むずかしい言葉ゼロ。株・NISA・投資のキホンを<b>マンガ</b>でたのしく学べるぞ！<br>
    <b>カブ先生・マネ太・ミライ</b>たちキャラクターが案内してくれるから安心じゃ。<br>
    <b>投資シミュレーション</b>や<b>AI株診断</b>など、体験しながら学べるコンテンツも充実！
  </div>

  <!-- 特徴タグ -->
  <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:4px;">
    <span style="background:#FFF0F0; color:#FF6B6B; border-radius:20px;
                 padding:4px 12px; font-size:0.8rem; font-weight:700;">📖 マンガで学ぶ</span>
    <span style="background:#FFF8E0; color:#E8A000; border-radius:20px;
                 padding:4px 12px; font-size:0.8rem; font-weight:700;">❓ 投資クイズ</span>
    <span style="background:#E8FFF8; color:#009688; border-radius:20px;
                 padding:4px 12px; font-size:0.8rem; font-weight:700;">💹 シミュレーション</span>
    <span style="background:#F0F0FF; color:#6C63FF; border-radius:20px;
                 padding:4px 12px; font-size:0.8rem; font-weight:700;">🤖 AI株診断</span>
  </div>

</div>

<!-- バナー画像（右） -->
<div style="flex-shrink: 0; max-width: 420px; width: 100%;">
{banner_html}
</div>

</div>

<style>
@media (max-width: 640px) {{
  div[style*="flex-wrap: wrap"] {{
    flex-direction: column !important;
    padding: 20px 18px !important;
  }}
  div[style*="max-width: 420px"] {{
    max-width: 100% !important;
  }}
}}
</style>
""", unsafe_allow_html=True)
        
        # 入学バナー（クリックでaboutページへ）
        NYUGAKU_PATH = r"D:\Antigravity\Kabu\image\入学.jpg"
        nyugaku_b64 = get_image_base64(NYUGAKU_PATH)
        if nyugaku_b64:
            st.markdown(f"""
<a href="?page=about" target="_self" style="display:block; cursor:pointer; text-decoration:none;">
  <img src="data:image/jpeg;base64,{nyugaku_b64}"
       style="width:100%; border-radius:16px; margin-bottom:16px;
              box-shadow:0 4px 16px rgba(0,0,0,0.10);
              transition:opacity 0.2s;"
       onmouseover="this.style.opacity='0.85'"
       onmouseout="this.style.opacity='1'"
       alt="カブ先生の学校に入学する">
</a>
""", unsafe_allow_html=True)
        else:
            # 画像がない場合のフォールバック
            if st.button("🎓 このサイトについて・はじめての方はこちら →", key="btn_about", use_container_width=True):
                st.session_state.current_page = "about"
                st.rerun()

        # 3. AI診断ボタン（マーケットヒーロー内でレンダーされるが、スライダー直下に置くならここで呼ぶ）
        render_market_hero()



    st.markdown("<br>", unsafe_allow_html=True)

    # 2. 今日のニュース (3件)
    news_unit.render_news_section()

    # =====================
    # 🌟 メインコンテンツ・ナビゲーション
    # =====================
    # 画像アセットの読み込み
    img_manga     = get_image_base64(os.path.join(IMAGE_DIR, "manga.jpg"))
    img_quiz      = get_image_base64(os.path.join(IMAGE_DIR, "Quiz.jpg"))
    img_explore   = get_image_base64(os.path.join(IMAGE_DIR, "sagasu.jpg"))
    img_qa        = get_image_base64(os.path.join(IMAGE_DIR, "shitsumon.jpg"))

    # カードデザイン全体の定義 (HTMLグリッド版)
    st.markdown("""
<style>
.main-nav-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}
@media (max-width: 900px) {
    .main-nav-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
    .main-nav-grid { grid-template-columns: 1fr; }
}

.mnav-card-link {
    text-decoration: none !important;
    color: inherit !important;
    display: block !important;
}

.mnav-card-base {
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 20px;
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: stretch;   /* stretちで横幅いっぱいに */
    overflow: hidden;
    padding: 0 !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.mnav-card-link:hover .mnav-card-base {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.1);
    border-color: #FF6B6B;
}

.mnav-img-frame {
    width: 100%;
    height: 160px;          /* 高さを大きくして全体を表示 */
    background: #fff;
    display: block;
    overflow: hidden;
    flex-shrink: 0;
}
.mnav-img-frame img {
    width: 100%;
    height: 100%;
    object-fit: contain;    /* 全体表示（トリミングしない） */
    display: block;
}

.mnav-label { 
    font-weight: 800; 
    font-size: 1.15rem; 
    color: #2D3436; 
    margin-top: 14px;
    margin-bottom: 4px;
    padding: 0 15px;
    text-align: center;
}
.mnav-sub { 
    font-size: 0.8rem; 
    color: #636E72; 
    font-weight: 400; 
    text-align: center;
    padding: 0 15px 15px;
    line-height: 1.4;
}

.section-title { margin-top: 30px !important; margin-bottom: 15px !important; }

/* スマホ対応：画像を非表示、縦並びに */
@media (max-width: 640px) {
    .main-nav-grid {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
    }
    .mnav-card-base {
        height: auto !important;
        flex-direction: row !important;
        align-items: center !important;
        padding: 16px 20px !important;
        gap: 16px;
        border-radius: 16px !important;
    }
    .mnav-img-frame {
        display: none !important;   /* 画像を非表示 */
    }
    .mnav-label {
        margin-top: 0 !important;
        margin-bottom: 2px !important;
        font-size: 1.1rem !important;
        text-align: left !important;
        padding: 0 !important;
    }
    .mnav-sub {
        text-align: left !important;
        padding: 0 !important;
        font-size: 0.82rem !important;
    }
    .mnav-text-block {
        display: flex;
        flex-direction: column;
    }
}
</style>
""", unsafe_allow_html=True)

    main_cards = [
        {"id": "manga",   "b64": img_manga,   "title": "マンガで学ぶ", "desc": "楽しく基本をマスター！"},
        {"id": "quiz",    "b64": img_quiz,    "title": "投資クイズ",   "desc": "クイズでレベルUP！"},
        {"id": "explore", "b64": img_explore, "title": "探す・体験",   "desc": "銘柄検索とシミュレーター"},
        {"id": "qa",      "b64": img_qa,      "title": "質問箱",       "desc": "ギモンを先生に聞こう"},
    ]

    st.markdown('<div class="section-title">✨ おすすめトピック</div>', unsafe_allow_html=True)

    # グリッドの組み立て
    nav_html = '<div class="main-nav-grid">'
    for card in main_cards:
        nav_html += f"""
<a href="?page={card['id']}" target="_self" class="mnav-card-link">
    <div class="mnav-card-base">
        <div class="mnav-img-frame">
            {f'<img src="data:image/png;base64,{card["b64"]}">' if card["b64"] else f'<span style="font-size:3rem;">📦</span>'}
        </div>
        <div class="mnav-text-block">
            <div class="mnav-label">{card["title"]}</div>
            <div class="mnav-sub">{card["desc"]}</div>
        </div>
    </div>
</a>
"""
    nav_html += '</div>'
    
    st.markdown(nav_html, unsafe_allow_html=True)

    # st.button() や <br> による過剰な余白を一切入れない
    
    # -------------------------------------------------------------
    # 追加：2カラムプロットフォーム (ウラ金さん & マネ太の投資日記)
    # -------------------------------------------------------------
    ura_banner_b64 = get_image_base64(os.path.join(IMAGE_DIR, "Ura.jpg"))
    maneta_banner_b64 = get_image_base64(os.path.join(IMAGE_DIR, "hajimete.jpg"))
    
    st.markdown(f"""
<style>
.promo-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
}}
@media (max-width: 800px) {{
    .promo-grid {{ grid-template-columns: 1fr; }}
}}
.promo-card-wrapper {{
    display: block;
    text-decoration: none !important;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
}}
.promo-card-wrapper:hover {{
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}}
.promo-card {{
    background: #111;
    padding: 20px;
    border-radius: 16px;
    border: 3px solid #FFE66D;
    height: 100%;
    display: flex;
    flex-direction: column;
}}
.promo-card.dark {{
    background-image: repeating-linear-gradient(
      -45deg, #111, #111 20px, #cca623 20px, #cca623 40px
    );
}}
.promo-card.bright {{
    border-color: #FF6B6B;
    background-image: repeating-linear-gradient(
      45deg, #fff9f0, #fff9f0 20px, #ffe8e8 20px, #ffe8e8 40px
    );
}}
.promo-title {{
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: #FFDE00;
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 15px;
    margin-top: -10px;
    display: table;
    margin-left: auto;
    margin-right: auto;
    background: #111;
    padding: 6px 20px;
    border-radius: 50px;
    border: 3px solid #FFDE00;
    white-space: nowrap;
}}
.promo-title.bright {{
    color: white;
    background: #FF6B6B;
    border-color: #ff4757;
}}
.promo-img-box {{
    border: 2px solid #555;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}}
.promo-img-box img {{
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
}}
.promo-text {{
    background: rgba(45, 52, 54, 0.9);
    color: white;
    padding: 12px 16px;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-top: 15px;
    border-radius: 8px;
    flex: 1;
    border: 1px solid rgba(255,255,255,0.1);
}}
.promo-text.bright {{
    background: rgba(255,255,255,0.9);
    color: #333;
    border: 1px solid #ffcccc;
}}
.section-badge {{
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 800;
    color: #2D3436;
    margin: 32px 0 16px;
    padding-bottom: 8px;
    border-bottom: 3px solid #FFE66D;
}}
.broker-container {{
    margin-bottom: 24px;
}}
.broker-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 16px;
}}
@media (max-width: 900px) {{
    .broker-grid {{ grid-template-columns: repeat(2, 1fr); }}
}}
@media (max-width: 480px) {{
    .broker-grid {{ grid-template-columns: 1fr; }}
}}
.broker-card {{
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.07);
    transition: transform 0.2s, box-shadow 0.2s;
}}
.broker-card:hover {{
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}}
.broker-top {{
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}}
.sbi-top {{ background: linear-gradient(135deg, #FFEEEE, #FFD6D6); }}
.rak_top {{ background: linear-gradient(135deg, #FFF0F5, #FFD6E7); }}
.mat_top {{ background: linear-gradient(135deg, #EEF5FF, #D6E8FF); }}
.mon_top {{ background: linear-gradient(135deg, #E8F8FF, #D0EEFF); }}
.broker-body {{
    padding: 12px 14px 16px;
}}
.broker-name {{
    font-weight: 800;
    font-size: 1rem;
    margin-bottom: 4px;
}}
.broker-sub {{
    font-size: 0.82rem;
    color: #636E72;
    margin-bottom: 10px;
}}
.pill-container {{
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;
}}
.pill {{
    background: #FFE66D;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 0.72rem;
    font-weight: 700;
}}
.broker-btn {{
    display: block;
    text-align: center;
    background: #FF6B6B;
    color: white !important;
    border-radius: 50px;
    padding: 8px 0;
    font-weight: 800;
    font-size: 0.85rem;
    text-decoration: none !important;
    transition: opacity 0.2s;
}}
.broker-btn:hover {{ opacity: 0.85; }}
</style>

<div class="promo-grid">
<!-- ⚠️ お金の裏事情ファイル -->
<a href="?page=money_secret&ep=1" target="_self" class="promo-card-wrapper">
<div class="promo-card dark">
<div class="promo-title">⚠️ お金の裏事情ファイル 🆕</div>
<div class="promo-img-box" style="border-color: #3b82f6;">
<img src="data:image/png;base64,{ura_banner_b64}">
</div>
<div class="promo-text">
<span style="color: #FFDE00; font-weight: bold;">世の中には表に出ない「お金のダークサイド」が存在します。</span><br>
このファイルでは、初心者が陥りやすい罠や、知っておくべき金融の裏ルールをこっそり教えます。絶対に真似してはいけませんよ！
</div>
</div>
</a>
<!-- 📈 マネ太のはじめての投資 -->
<a href="?page=maneta_diary" target="_self" class="promo-card-wrapper">
<div class="promo-card bright">
<div class="promo-title bright">📈 マネ太のはじめての投資 🆕</div>
<div class="promo-img-box" style="border-color: #FFB8B8;">
<img src="data:image/png;base64,{maneta_banner_b64}">
</div>
<div class="promo-text bright">
<span style="color: #FF6B6B; font-weight: bold;">ボクのお小遣い、どうなっちゃうの！？</span><br>
初心者マネ太が実際に投資プランに挑戦していくドキュメンタリー！日々の資産運用や葛藤を赤裸々に綴る投資日記をチェックしてね👦✨
</div>
</div>
</a>
</div>
<div class="broker-container">
<div class="section-badge">🏦 おすすめ証券会社</div>
<div class="broker-grid">

<!-- SBI -->
<div class="broker-card">
<div class="broker-top sbi-top">🏛️</div>
<div class="broker-body">
<div class="broker-name" style="color: #FF6B6B;">SBI証券</div>
<div class="broker-sub">口座数No.1！</div>
<div class="pill-container">
<span class="pill">🔰 初心者向け</span>
<span class="pill">💰 手数料最安級</span>
</div>
<a href="https://www.sbisec.co.jp" target="_blank" rel="noopener" class="broker-btn">口座開設 ➔</a>
</div>
</div>

<!-- Rakuten -->
<div class="broker-card">
<div class="broker-top rak_top">🎯</div>
<div class="broker-body">
<div class="broker-name" style="color: #FF6B6B;">楽天証券</div>
<div class="broker-sub">ポイントで投資！</div>
<div class="pill-container">
<span class="pill">🔰 初心者向け</span>
<span class="pill">🛍️ 楽天ユーザー向け</span>
</div>
<a href="https://www.rakuten-sec.co.jp" target="_blank" rel="noopener" class="broker-btn">口座開設 ➔</a>
</div>
</div>

<!-- Matsui -->
<div class="broker-card">
<div class="broker-top mat_top">📊</div>
<div class="broker-body">
<div class="broker-name" style="color: #0984e3;">松井証券</div>
<div class="broker-sub">50万円まで手数料0円</div>
<div class="pill-container">
<span class="pill">⚡ 少額投資向け</span>
</div>
<a href="https://www.matsui.co.jp" target="_blank" rel="noopener" class="broker-btn">口座開設 ➔</a>
</div>
</div>

<!-- Monex -->
<div class="broker-card">
<div class="broker-top mon_top">🌎</div>
<div class="broker-body">
<div class="broker-name" style="color: #0984e3;">マネックス証券</div>
<div class="broker-sub">米国株に強い！</div>
<div class="pill-container">
<span class="pill">🌎 米国株向け</span>
<span class="pill">📱 アプリ最強</span>
</div>
<a href="https://www.monex.co.jp" target="_blank" rel="noopener" class="broker-btn">口座開設 ➔</a>
</div>
</div>

</div>
<p style="font-size:0.75rem; color:#bbb; text-align:center;">※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。</p>
</div>
""", unsafe_allow_html=True)
    
    st.markdown('</div>', unsafe_allow_html=True)


def render_about_page():
    """入学ページ：初訪問者向けサイト紹介"""
    st.markdown("""
    <h1 style="font-family:'M PLUS Rounded 1c',sans-serif;
               font-size:1.8rem; font-weight:900; margin-bottom:4px;">
      🎓 カブ先生の学校に入学しよう！
    </h1>
    <p style="color:#888; font-size:0.9rem; margin-bottom:28px;">
      むずかしい言葉ゼロ。あなたのペースで、お金のことを学べる場所じゃ。
    </p>
    """, unsafe_allow_html=True)

    # セクション①：銀行比較インフォグラフィック
    st.markdown("""
<div style="background:#F7F3EC; border-radius:12px; padding:16px 24px; margin-bottom:20px;">
  <div style="font-size:0.85rem; font-weight:800; color:#555; margin-bottom:10px;">
    💡 なぜ「預けるだけ」じゃもったいないの？
  </div>
  <div style="display:flex; gap:12px; align-items:stretch; flex-wrap:wrap;">
    <div style="flex:1; min-width:100px; background:white; border-radius:8px;
                padding:12px; text-align:center; border:2px solid #E0E0E0;">
      <div style="font-size:1.4rem;">💴</div>
      <div style="font-size:0.75rem; color:#888; margin:4px 0;">銀行に預けると</div>
      <div style="font-size:1.3rem; font-weight:900; color:#333;">+100円</div>
      <div style="font-size:0.7rem; color:#aaa;">100万円 / 1年</div>
    </div>
    <div style="display:flex; align-items:center; font-size:1.2rem; color:#ccc; padding:0 4px;">→</div>
    <div style="flex:1; min-width:100px; background:white; border-radius:8px;
                padding:12px; text-align:center; border:2px solid #FFD700;">
      <div style="font-size:1.4rem;">📈</div>
      <div style="font-size:0.75rem; color:#888; margin:4px 0;">でも物価は</div>
      <div style="font-size:1.3rem; font-weight:900; color:#E8A000;">+10〜20%</div>
      <div style="font-size:0.7rem; color:#aaa;">ここ数年の値上がり幅</div>
    </div>
    <div style="display:flex; align-items:center; font-size:1.2rem; color:#ccc; padding:0 4px;">→</div>
    <div style="flex:1; min-width:100px; background:white; border-radius:8px;
                padding:12px; text-align:center; border:2px solid #4ECDC4;">
      <div style="font-size:1.4rem;">🌱</div>
      <div style="font-size:0.75rem; color:#888; margin:4px 0;">投資で運用すると</div>
      <div style="font-size:1.3rem; font-weight:900; color:#009688;">+80〜165万円</div>
      <div style="font-size:0.7rem; color:#aaa;">100万円 年3〜5% / 20年 (参考値)</div>
    </div>
  </div>
  <div style="font-size:0.68rem; color:#bbb; margin-top:8px; text-align:right;">
    ※投資にはリスクがあります。上記はあくまで参考値です。
  </div>
</div>
    """, unsafe_allow_html=True)

    # セクション②：AI診断ボタン
    if st.button("🔍 AI株診断をスタート →", key="about_diagnosis_btn", use_container_width=True, type="primary"):
        st.session_state.show_diagnosis = True
        st.session_state.diagnosis_step = 0
        st.session_state.current_page = "home"
        st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    # セクション③：マンガ誘導
    st.markdown("""
<div style="background:white; border-radius:16px; padding:24px;
            box-shadow:0 2px 8px rgba(0,0,0,0.06); text-align:center; margin-bottom:20px;">
  <div style="font-size:1rem; font-weight:800; margin-bottom:8px;">
    📖 まずはマンガで読んでみよう
  </div>
  <p style="font-size:0.85rem; color:#666; margin-bottom:0;">
    「株ってなに？」「NISAって何をすればいいの？」<br>
    キャラクターたちのマンガでサクッとわかるじゃ！
  </p>
</div>
    """, unsafe_allow_html=True)

    if st.button("📖 マンガで学びはじめる →", key="about_manga_btn", use_container_width=True, type="primary"):
        st.session_state.current_page = "manga"
        st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    # 戻るボタン
    if st.button("← ホームにもどる", key="about_back_btn"):
        st.session_state.current_page = "home"
        st.rerun()
