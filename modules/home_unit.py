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

def render_compact_hero():
    """コンパクトヒーロー（旧セクション①②を統合）"""
    # カブ先生の画像を取得
    hakase_b64 = get_image_base64(CHARA.get("hakase", ""))
    if hakase_b64:
        img_html = f'<img src="data:image/png;base64,{hakase_b64}" style="width:100%; max-width:220px; display:block; margin:0 auto;">'
    else:
        img_html = '<div style="background:linear-gradient(135deg,#FFE8E8,#E8FFF8);border-radius:16px;height:200px;display:flex;align-items:center;justify-content:center;font-size:4rem;">🥬</div>'

    col_img, col_text = st.columns([1, 1.6])

    with col_img:
        st.markdown(img_html, unsafe_allow_html=True)

    with col_text:
        st.markdown(f"""
<div style="padding: 12px 0;">
  <div style="font-family:'M PLUS Rounded 1c',sans-serif; font-size:1.5rem;
              font-weight:900; line-height:1.4; margin-bottom:14px; color:#2D3436;">
    投資って難しい？<br>
    <span style="color:#E85555;">むずかしくないじゃ！</span>
  </div>
  <div style="font-size:0.95rem; color:#555; margin-bottom:16px; line-height:1.9;">
    ☑ NISAってよく聞くけど、何をすればいいかわからない<br>
    ☑ 投資って自分には無理そう…<br>
    ☑ お金のことをわかりやすく教えてほしい
  </div>
  <div style="font-size:0.85rem; color:#888; margin-bottom:18px;">
    1つでも当てはまったら、このサイトはあなたのためにあるじゃ！
  </div>
</div>
        """, unsafe_allow_html=True)
        if st.button("📖 マンガではじめる →", key="hero_cta_manga", type="primary", use_container_width=True):
            st.session_state.current_page = "manga"
            st.rerun()

    # 下段のインフォグラフィックバーは about ページに移動したため削除
    pass

def render_about_page():
    """このサイトについて・入学する（旧ホームページ後半要素）"""
    st.markdown("""
    <h1 style="font-family:'M PLUS Rounded 1c',sans-serif; font-size:1.8rem; font-weight:900;">
      🎓 カブ先生の学校に入学しよう！
    </h1>
    <p style="color:#888; font-size:0.9rem; margin-bottom:28px;">
      むずかしい言葉ゼロ。あなたのペースで、お金のことを学べる場所じゃ。
    </p>
    """, unsafe_allow_html=True)

    # ホームから移植：セクション①「なぜ『預けるだけ』じゃもったいないの？」（3枚カード）
    st.markdown("""
<div style="background:#F7F3EC; border-radius:12px; padding:16px 24px; margin-top:8px; margin-bottom:8px;">
  <div style="font-size:0.75rem; color:#999; margin-bottom:10px;">
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

    # セクション②「AI株診断をスタート →」ボタン
    st.markdown("<br>", unsafe_allow_html=True)
    if st.button("🔍 AI株診断をスタート →", key="diagnosis_btn_about", use_container_width=True, type="primary"):
        st.session_state.show_diagnosis = True
        st.session_state.diagnosis_step = 0
        st.rerun()
    st.markdown("<br>", unsafe_allow_html=True)

    # セクション③ マンガ誘導（新規）
    st.markdown("""
    <div style="background:white; border-radius:16px; padding:24px;
                box-shadow:0 2px 8px rgba(0,0,0,0.06); text-align:center; margin-top:24px;">
      <div style="font-size:1rem; font-weight:800; margin-bottom:8px;">
        📖 まずはマンガで読んでみよう
      </div>
      <p style="font-size:0.85rem; color:#666; margin-bottom:0;">
        「株ってなに？」「NISAって何をすればいいの？」<br>
        キャラクターたちのマンガでサクッとわかるじゃ！
      </p>
    </div>
    <br>
    """, unsafe_allow_html=True)

    if st.button("📖 マンガで学びはじめる →", key="manga_btn_about", type="primary", use_container_width=True):
        st.session_state.current_page = "manga"
        st.rerun()

    # 戻るボタン
    st.markdown("<br><br>", unsafe_allow_html=True)
    if st.button("← ホームにもどる", key="home_btn_about"):
        st.session_state.current_page = "home"
        st.rerun()



def render_site_intro_nav():
    """セクション③：このサイトで何ができるの？（サイト紹介） - 純HTML版"""
    st.markdown("""
    <div class="section-title">🏫 カブ先生の学校でできること</div>
    <style>
    .intro-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 32px;
    }
    @media (max-width: 640px) {
        .intro-grid { grid-template-columns: 1fr; }
    }
    .intro-card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.07);
        border: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .intro-card-title {
        font-weight: 800;
        font-size: 1.1rem;
        color: #2D3436;
    }
    .intro-card-desc {
        font-size: 0.9rem;
        color: #444;
        line-height: 1.6;
        flex: 1;
    }
    .intro-card-btn {
        display: inline-block;
        background: linear-gradient(135deg, #FF6B6B, #FF8E53);
        color: white !important;
        font-weight: 700;
        font-size: 0.9rem;
        padding: 9px 16px;
        border-radius: 50px;
        text-decoration: none !important;
        text-align: center;
        transition: opacity 0.2s;
    }
    .intro-card-btn:hover { opacity: 0.85; }
    </style>
    <div class="intro-grid">
      <div class="intro-card">
        <div class="intro-card-title">📖 マンガで学ぶ</div>
        <div class="intro-card-desc">むずかしい言葉ゼロ。カブ先生とキャラクターたちのマンガで株・NISA・配当金がサクッとわかる。</div>
        <a href="?page=manga" target="_self" class="intro-card-btn">📖 マンガを読む</a>
      </div>
      <div class="intro-card">
        <div class="intro-card-title">❓ クイズで試す</div>
        <div class="intro-card-desc">読んだら試してみよう。全問正解できたらあなたも立派な「投資初心者卒業生」じゃ！</div>
        <a href="?page=quiz" target="_self" class="intro-card-btn">❓ クイズをやってみる</a>
      </div>
      <div class="intro-card">
        <div class="intro-card-title">🔍 銘柄を探す</div>
        <div class="intro-card-desc">実際にどんな会社があるの？テーマや条件から気になる銘柄を探して仮想投資体験もできる。</div>
        <a href="?page=explore" target="_self" class="intro-card-btn">🔍 銘柄を探す</a>
      </div>
      <div class="intro-card">
        <div class="intro-card-title">🕵️ 裏事情を知る</div>
        <div class="intro-card-desc">投資の「やってはいけない」も学べる。詐欺・インサイダー取引…知らないと損する話も解諬。</div>
        <a href="?page=money_secret" target="_self" class="intro-card-btn">🕵️ 裏事情を見る</a>
      </div>
    </div>
    """, unsafe_allow_html=True)

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
margin-bottom: 10px;
line-height: 1.3;
">
カブ先生の<br><span style="color:#FF6B6B;">だれでもわかるお金の学校</span>へようこそ！🎓
</div>

<!-- サブコピー -->
<div style="
font-size: 1.0rem;
color: #444;
line-height: 1.8;
margin-bottom: 14px;
">
むずかしい言葉は一切なし。<br>
<b>AIとキャラクターがやさしく・たのしく</b>教えてくれるぞ！
</div>

<!-- CTA -->
<div style="font-size: 0.95rem; color: #636E72;">
まずは
<span style="
color: #FF6B6B;
font-weight: 800;
font-size: 1.05rem;
background: #FFF0F0;
border-radius: 6px;
padding: 2px 8px;
">「AI投資診断」</span>
でキミにぴったりの投資先を見つけてみよう！ 👇
</div>

</div>

<!-- バナー画像（右） -->
<div style="flex-shrink: 0; max-width: 420px; width: 100%;">
{banner_html}
</div>

</div>

<!-- スマホ用レスポンシブ調整 -->
<style>
@media (max-width: 640px) {{
/* ウェルカムカードを縦積みに */
div[style*="flex-wrap: wrap"] {{
flex-direction: column !important;
padding: 20px 18px !important;
}}
/* タイトルを少し小さく */
div[style*="font-size: 2rem"] {{
font-size: 1.4rem !important;
}}
/* バナー画像を全幅に */
div[style*="max-width: 420px"] {{
max-width: 100% !important;
}}
}}
</style>
""", unsafe_allow_html=True)
        
        # 3. AI診断ボタン（マーケットヒーロー内でレンダーされるが、スライダー直下に置くならここで呼ぶ）
        render_market_hero()

        st.markdown("<br>", unsafe_allow_html=True)

        # --- コンパクトヒーロー (Ver. 5.6: 独立版) ---
        render_compact_hero()
        
        # 新しいボタン：このサイトについて
        if st.button("🎓 このサイトについて・入学する →", use_container_width=False):
            st.session_state.current_page = "about"
            st.rerun()

    st.markdown('</div>', unsafe_allow_html=True)
