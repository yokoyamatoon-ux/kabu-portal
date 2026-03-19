import streamlit as st
from modules.ui_components import chara_img, icon_img, CHARA, get_image_base64, character_explain
from modules import market_data, simulation

def render_explore_page():
    st.markdown('<div class="page-content">', unsafe_allow_html=True)
    
    # マネ太の説明
    character_explain(
        CHARA["maneta"],
        "気になる会社の名前を入れてみよう！<br>"
        "トヨタ、Apple、ソニーなんでもOK🔍<br>"
        "その会社の今の株価やAI評価がすぐわかるよ！",
        bg_color="#F0F8FF"
    )

    # 1. 銘柄検索
    st.markdown('<div class="section-title">🔎 企業名やコードで検索</div>', unsafe_allow_html=True)
    
    # 検索クエリ保持用
    if "search_query" not in st.session_state:
        st.session_state.search_query = ""
        
    ticker_input = st.text_input("", placeholder="例：トヨタ、ソニー、Apple、NVIDIA...", key="stock_search_ux", value=st.session_state.search_query)
    
    if ticker_input:
        info = market_data.search_stock(ticker_input)
        if info:
            # カブ博士の説明
            character_explain(
                CHARA["hakase"],
                f"<b>{info['name']}</b>の情報じゃ📊<br>"
                "グラフで値動きが確認できるし、<br>"
                "「かったことにする」で<b>仮想で投資体験</b>もできるぞ！",
                bg_color="#FFF9F0"
            )
            
            is_jp = ".T" in info['ticker']
            currency_symbol = "¥" if is_jp else "$"
            
            st.markdown(f"""
            <div class="kabu-card" style="color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">{info['name']} ({info['ticker']})</div>
                <div style="font-size: 2rem; font-weight: 800; margin: 8px 0; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">{currency_symbol}{info['price']:,}</div>
                <div style="color: {'var(--success)' if info['change_pct'] >= 0 else 'var(--danger)'}; font-weight: 700;">
                    {'▲' if info['change_pct'] >= 0 else '▼'} {abs(info['change_pct'])}%
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # 検索候補の表示（もしあれば）
            if info.get("search_candidates"):
                st.caption("もしかして：")
                cols = st.columns(len(info["search_candidates"][1:4]))
                for idx, candidate in enumerate(info["search_candidates"][1:4]):
                    with cols[idx]:
                        if st.button(candidate["name"], key=f"cand_{candidate['ticker']}_{idx}", use_container_width=True):
                            st.session_state.search_query = candidate["ticker"]
                            st.rerun()

            st.line_chart(info['history'])
            
            simulation.render_watchlist_button(info['name'], info['ticker'])
            simulation.render_virtual_purchase(info['name'], info['price'], info['ticker'])
        else:
            st.warning(f"「{ticker_input}」は見つかりませんでした。別の名前で試してみてね！")

    st.markdown("<br>", unsafe_allow_html=True)

    # 2. テーマ別
    st.markdown('<div class="section-title">🎨 テーマから探す</div>', unsafe_allow_html=True)
    
    if "selected_theme" not in st.session_state:
        st.session_state.selected_theme = None
    
    cols = st.columns(2)
    for i, (theme_name, theme_data) in enumerate(market_data.THEMES.items()):
        with cols[i % 2]:
            if st.button(theme_name, use_container_width=True, key=f"theme_btn_{i}"):
                st.session_state.selected_theme = theme_name

    if st.session_state.selected_theme:
        theme = market_data.THEMES[st.session_state.selected_theme]
        st.markdown(f"""
        <div class="kabu-card" style="border-top: 4px solid var(--primary); margin-top: 10px;">
            <h3>{st.session_state.selected_theme}</h3>
            <p style="color: #636E72;">{theme['desc']}</p>
        </div>
        """, unsafe_allow_html=True)
        
        for stock in theme["stocks"]:
            info = market_data.get_stock_info(stock["ticker"])
            if info:
                is_jp = ".T" in stock["ticker"]
                currency_symbol = "¥" if is_jp else "$"
                color = "🟢" if info['change_pct'] >= 0 else "🔴"
                
                with st.expander(f"{color} {stock['name']} ({stock['ticker']}) - {currency_symbol}{info['price']:,}"):
                    st.write(f"前日比: {info['change_pct']:+.2f}%")
                    col1, col2 = st.columns(2)
                    with col1:
                        simulation.render_watchlist_button(stock['name'], stock['ticker'])
                    with col2:
                        # 簡易購入
                        if st.button(f"¥10,000買ったことにする", key=f"quick_buy_{stock['ticker']}"):
                            purchase = {
                                "name":       stock['name'],
                                "ticker":     stock['ticker'],
                                "price":      info['price'],
                                "amount":     10000 if is_jp else 100,
                                "shares":     (10000 if is_jp else 100) / info['price'],
                                "bought_at":  st.session_state.get("current_date", "2026/03/12"),
                            }
                            if "portfolio" not in st.session_state: st.session_state.portfolio = []
                            st.session_state.portfolio.append(purchase)
                            st.success("追加しました！")

    st.markdown("<br>", unsafe_allow_html=True)

    # 3. おさいふの様子
    simulation.render_portfolio()

    st.markdown("<br>", unsafe_allow_html=True)

    # 4. ウォッチリスト
    simulation.render_watchlist()

    st.markdown('</div>', unsafe_allow_html=True)
