import streamlit as st
import plotly.graph_objects as go
import yfinance as yf
from modules.ui_components import (
    chara_img, icon_img, CHARA, get_image_base64, TOP_BANNERS, 
    character_explain, render_hero_slider, IMAGE_DIR
)
from datetime import datetime
import os
import textwrap
from modules import column_v3 as column_unit


def render_market_hero(show_hero=True):
    """ホームのヒーローエリア + ミニグラフ (UX改善・高速化版)"""
    
    if show_hero:
        # 1. ヒーローエリア（キャラクター＋キャッチコピー）
        hakase_b64 = get_image_base64(CHARA["hakase"])
        maneta_b64 = get_image_base64(CHARA["maneta"])
        
        st.markdown(textwrap.dedent(f"""
<div style="
  background: linear-gradient(135deg, #FFE8E8 0%, #E8FFF8 100%);
  border-radius: 24px;
  padding: 28px 24px 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
">
  <div style="display:flex; align-items:center; gap:16px;">
    <img src="data:image/png;base64,{hakase_b64}" 
         style="width:80px; flex-shrink:0;">
    <div>
      <h1 style="font-size:1.6rem; margin:0 0 6px; color:#2D3436; font-family:'M PLUS Rounded 1c', sans-serif;">カブ先生のお金のコラム</h1>
      <p style="color:#636E72; margin:0; font-size:0.95rem; font-weight:500;">
        投資の「キホンのキ」から裏話まで、毎日更新中じゃ！
      </p>
    </div>
    <img src="data:image/png;base64,{maneta_b64}" 
         style="width:60px; flex-shrink:0; margin-left:auto;">
  </div>
</div>
        """).strip(), unsafe_allow_html=True)

    # 2. 今日のマーケットミニグラフ（3列）- キャッシュ化されたデータを使用
    st.markdown(f'<div class="section-title">📊 今日のマーケット <span style="font-size: 0.8rem; font-weight: 400; color: #636E72;">({datetime.now().strftime("%Y/%m/%d %H:%M")} 現在)</span></div>', 
                unsafe_allow_html=True)
    
    from modules import market_data
    market_history = market_data.get_market_history(period="1mo")
    
    if not market_history:
        st.warning("現在、マーケットデータを取得中じゃ。少し待っておくれ...")
        return

    cols = st.columns(3)
    for col, (label, data) in zip(cols, market_history.items()):
        with col:
            price  = data["price"]
            change = data["change_pct"]
            color  = "#00B894" if change >= 0 else "#FF7675"
            arrow  = "▲" if change >= 0 else "▼"
            
            st.markdown(f"""
<div class="kabu-card" style="text-align:center; padding:12px 8px 4px;">
  <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">{label}</div>
  <div style="font-size:1.2rem; font-weight:800; color:{color};">{price:,.1f}</div>
  <div style="font-size:0.8rem; color:{color}; font-weight:700;">
    {arrow} {change:+.2f}%
  </div>
""", unsafe_allow_html=True)
            
            # 履歴データがある場合（取得成功時）のみチャートを表示
            if "history" in data:
                hist = data["history"]
                fig = go.Figure()
                fig.add_trace(go.Scatter(
                    y=hist.values,
                    mode="lines",
                    line=dict(color=color, width=3),
                    fill="tozeroy",
                    fillcolor=f"rgba{'(0,184,148,0.1)' if change >= 0 else '(255,118,117,0.1)'}",
                    hoverinfo="skip"
                ))
                fig.update_layout(
                    height=80,
                    margin=dict(l=0, r=0, t=0, b=0),
                    showlegend=False,
                    xaxis=dict(visible=False),
                    yaxis=dict(visible=False),
                    plot_bgcolor="rgba(0,0,0,0)",
                    paper_bgcolor="rgba(0,0,0,0)",
                )
                st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False}, key=f"chart_{label}")
            else:
                # 取得中またはフォールバック時の表示
                st.markdown('<div style="height:80px; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:0.7rem;">Chart loading...</div>', unsafe_allow_html=True)

            st.markdown("</div>", unsafe_allow_html=True)

def render_home_page():
    st.markdown('<div class="page-content">', unsafe_allow_html=True)
    
    # 1. ヒーローセクション
    # (AI株診断のボタンはユーザーの要望により削除済み)
    
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
    <b>投資シミュレーション</b>や<b>最新コラム</b>など、体験しながら学べるコンテンツも充実！
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
                 padding:4px 12px; font-size:0.8rem; font-weight:700;">🥬 今日のコラム</span>
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
    NYUGAKU_PATH = os.path.join(IMAGE_DIR, "banner_new_v63.jpg")
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

    # 3. 今日のマーケット（バナーなし）
    render_market_hero(show_hero=False)

    # 4. カブ先生のコラム（ホーム用ミニ一覧）
    from modules.column_v3 import render_column_home_section
    render_column_home_section()

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
        {"id": "qa",      "b64": img_qa,      "title": "質問箱",       "desc": "投資のギモンを先生にぶつけてみよう"},
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
    nyugaku_b64 = get_image_base64(os.path.join(IMAGE_DIR, "banner_new_v63.jpg"))
    if nyugaku_b64:
        st.markdown(f"""
<div style="margin-bottom: 16px;">
  <img src="data:image/jpeg;base64,{nyugaku_b64}"
       style="width:100%; max-width: 800px; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.10); display:block; margin: 0 auto;"
       alt="カブ先生の学校に入学しよう！">
</div>
<p style="color:#888; font-size:0.9rem; margin-bottom:28px; text-align:center;">
  むずかしい言葉ゼロ。あなたのペースで、お金のことを学べる場所じゃ。
</p>
""", unsafe_allow_html=True)
    else:
        st.markdown("""
<h1 style="font-family:'M PLUS Rounded 1c',sans-serif;
font-size:1.8rem; font-weight:900; margin-bottom:4px; text-align:center;">
🎓 カブ先生の学校に入学しよう！
</h1>
<p style="color:#888; font-size:0.9rem; margin-bottom:28px; text-align:center;">
むずかしい言葉ゼロ。あなたのペースで、お金のことを学べる場所じゃ。
</p>
        """, unsafe_allow_html=True)

    # =========================================
    # セクション①：共感チェックリスト
    # =========================================
    st.markdown("""
<div style="background:linear-gradient(135deg,#FFF9F0,#FFF0F0);
border-radius:16px; padding:24px 28px; margin-bottom:20px;
border:1px solid #FFE0D0;">
<div style="font-size:1.05rem; font-weight:900; margin-bottom:16px; color:#2D3436;">
🤔 こんなこと、思ったことない？
</div>
<div style="font-size:0.95rem; color:#444; line-height:2.1;">
<span style="color:#E85555; font-weight:700;">☑</span>　貯金はしてるけど、このままでいいのか不安…<br>
<span style="color:#E85555; font-weight:700;">☑</span>　NISAってよく聞くけど、何をすればいいかわからない<br>
<span style="color:#E85555; font-weight:700;">☑</span>　投資って難しそうで、自分には無理そう<br>
<span style="color:#E85555; font-weight:700;">☑</span>　お金のことを誰かにわかりやすく教えてほしい
</div>
<div style="margin-top:16px; background:white; border-radius:10px;
padding:12px 16px; font-size:0.9rem; color:#636E72; display:flex;
align-items:center; gap:10px; border:1px solid #f0f0f0;">
<span style="font-size:1.5rem;">🥬</span>
<span>1つでも当てはまったら、このサイトはあなたのためにあるじゃ！</span>
</div>
</div>
""", unsafe_allow_html=True)

    # =========================================
    # セクション②：なぜ今、投資が必要なのか
    # =========================================
    st.markdown("""
<div style="background:white; border-radius:16px; padding:24px 28px;
margin-bottom:20px; box-shadow:0 2px 12px rgba(0,0,0,0.06);
border-left:5px solid #FF6B6B;">
<div style="font-size:1.05rem; font-weight:900; margin-bottom:16px; color:#2D3436;">
⚠️ 実は、「貯めるだけ」では間に合わない時代になっています
</div>

<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:16px;">

<div style="background:#FFF5F5; border-radius:12px; padding:16px; text-align:center; border:2px solid #FFD0D0;">
<div style="font-size:1.6rem; margin-bottom:6px;">👴</div>
<div style="font-size:0.8rem; font-weight:800; color:#E85555; margin-bottom:6px;">年金だけでは不足</div>
<div style="font-size:0.78rem; color:#666; line-height:1.6;">
老後2,000万円問題が話題に。公的年金だけでは生活費が足りない可能性が高まっています。
</div>
</div>

<div style="background:#FFFAF0; border-radius:12px; padding:16px; text-align:center; border:2px solid #FFE0A0;">
<div style="font-size:1.6rem; margin-bottom:6px;">📈</div>
<div style="font-size:0.8rem; font-weight:800; color:#E8A000; margin-bottom:6px;">物価は上がり続けている</div>
<div style="font-size:0.78rem; color:#666; line-height:1.6;">
食料品・光熱費・日用品…ここ数年で10〜20%以上値上がり。同じお金で買えるものが減っています。
</div>
</div>

<div style="background:#F0FFF8; border-radius:12px; padding:16px; text-align:center; border:2px solid #A0E8C8;">
<div style="font-size:1.6rem; margin-bottom:6px;">🏦</div>
<div style="font-size:0.8rem; font-weight:800; color:#009688; margin-bottom:6px;">銀行の金利はほぼゼロ</div>
<div style="font-size:0.78rem; color:#666; line-height:1.6;">
100万円を1年預けても増えるのは100円ほど。物価上昇を考えると、実質的にお金が減っています。
</div>
</div>

</div>

<div style="background:#F7F3EC; border-radius:10px; padding:14px 18px;
font-size:0.88rem; color:#555; line-height:1.8;">
💡 だからといって、いきなり難しい株取引をする必要はありません。<br>
<b>まずは「お金の仕組み」を知るだけで、選択肢がぐっと広がります。</b>
それがこのサイトの目的じゃ！
</div>
</div>
""", unsafe_allow_html=True)

    # =========================================
    # セクション③：銀行 vs 投資 比較バー
    # =========================================
    st.markdown("""
<div style="background:#F7F3EC; border-radius:12px; padding:16px 24px; margin-bottom:20px;">
<div style="font-size:0.85rem; font-weight:800; color:#555; margin-bottom:12px;">
📊 100万円を20年運用したら？
</div>
<div style="display:flex; gap:12px; align-items:stretch; flex-wrap:wrap;">
<div style="flex:1; min-width:100px; background:white; border-radius:8px;
padding:14px; text-align:center; border:2px solid #E0E0E0;">
<div style="font-size:1.3rem;">🏦</div>
<div style="font-size:0.75rem; color:#888; margin:4px 0;">銀行に預けると</div>
<div style="font-size:1.3rem; font-weight:900; color:#333;">約100万円</div>
<div style="font-size:0.7rem; color:#aaa;">ほぼ変わらず</div>
</div>
<div style="display:flex; align-items:center; font-size:1.4rem; color:#ccc;">→</div>
<div style="flex:1; min-width:100px; background:white; border-radius:8px;
padding:14px; text-align:center; border:2px solid #FFD700;">
<div style="font-size:1.3rem;">📈</div>
<div style="font-size:0.75rem; color:#888; margin:4px 0;">年3%で運用すると</div>
<div style="font-size:1.3rem; font-weight:900; color:#E8A000;">約180万円</div>
<div style="font-size:0.7rem; color:#aaa;">+80万円</div>
</div>
<div style="display:flex; align-items:center; font-size:1.4rem; color:#ccc;">→</div>
<div style="flex:1; min-width:100px; background:white; border-radius:8px;
padding:14px; text-align:center; border:2px solid #4ECDC4;">
<div style="font-size:1.3rem;">🌱</div>
<div style="font-size:0.75rem; color:#888; margin:4px 0;">年5%で運用すると</div>
<div style="font-size:1.3rem; font-weight:900; color:#009688;">約265万円</div>
<div style="font-size:0.7rem; color:#aaa;">+165万円</div>
</div>
</div>
<div style="font-size:0.68rem; color:#bbb; margin-top:8px; text-align:right;">
※投資にはリスクがあります。上記はあくまで参考値です。元本割れの可能性もあります。
</div>
</div>
""", unsafe_allow_html=True)

    # =========================================
    # セクション④：このサイトでできること
    # =========================================
    st.markdown("""
<div style="font-size:1.05rem; font-weight:900; margin-bottom:14px; color:#2D3436;">
📚 このサイトでできること
</div>
<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #FF6B6B;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">📖 マンガで学ぶ</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
カブ先生・マネ太・ミライが登場するオリジナルマンガで、株・NISA・配当金などの基礎知識をゼロから学べます。むずかしい用語は一切なし！
</div>
</div>

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #FFB300;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">❓ 投資クイズ</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
マンガで学んだ内容をクイズ形式で確認！全問正解を目指して、投資の基礎知識がしっかり身につきます。
</div>
</div>

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #4ECDC4;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">💹 投資シミュレーション</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
仮想の100万円で実際の株を「買って」みよう。リスクゼロで投資の感覚をリアルに体験できます。
</div>
</div>

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #6C63FF;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">🤖 AI株診断</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
いくつかの質問に答えるだけで、あなたに合った投資スタイルをAIが診断！まず何をすればいいかがわかります。
</div>
</div>

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #E85555;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">⚠️ お金の裏事情ファイル</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
詐欺・インサイダー取引など、投資初心者が陥りやすいワナを解説。知っておくだけで大きな損失を防げます。
</div>
</div>

<div style="background:white; border-radius:14px; padding:18px;
box-shadow:0 2px 8px rgba(0,0,0,0.06); border-top:4px solid #FF8E53;">
<div style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">📈 マネ太の投資日記</div>
<div style="font-size:0.85rem; color:#555; line-height:1.7;">
初心者キャラのマネ太が実際に投資に挑戦するドキュメンタリー形式の日記。リアルな葛藤も含めて追体験できます。
</div>
</div>

</div>
""", unsafe_allow_html=True)

    # =========================================
    # セクション⑤：AI診断CTA
    # =========================================
    st.markdown("""
<div style="background:linear-gradient(135deg,#FF6B6B,#FF8E53);
border-radius:16px; padding:24px; text-align:center; margin-bottom:20px;">
<div style="font-size:1.1rem; font-weight:900; color:white; margin-bottom:8px;">
🤖 まず何から始めればいい？
</div>
<div style="font-size:0.88rem; color:rgba(255,255,255,0.9); margin-bottom:0;">
AI診断なら3分で「あなたにぴったりの投資スタイル」がわかるじゃ！
</div>
</div>
""", unsafe_allow_html=True)

    if st.button("🔍 AI株診断をスタート →", key="about_diagnosis_btn",
                 use_container_width=True, type="primary"):
        st.session_state.show_diagnosis = True
        st.session_state.diagnosis_step = 0
        st.session_state.current_page = "home"
        st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    if st.button("📖 マンガで学びはじめる →", key="about_manga_btn",
                 use_container_width=True):
        st.session_state.current_page = "manga"
        st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    if st.button("← ホームにもどる", key="about_back_btn"):
        st.session_state.current_page = "home"
        st.rerun()
