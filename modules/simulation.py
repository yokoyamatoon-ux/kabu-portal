import streamlit as st
import pandas as pd
from modules.ui_components import chara_img, icon_img, CHARA, get_image_base64, character_explain
from modules import market_data

def render_virtual_purchase(stock_name: str, stock_price: float, ticker: str):
    """銘柄ページ下部に「かったことにする？」セクションを表示"""
    
    st.markdown("### 🛍️ かったことにする？")
    
    # マネ太のひとこと
    character_explain(
        CHARA["maneta"],
        f"<b>{stock_name}</b>、いい感じだね！✨<br>"
        "「かったことにする」ボタンを押すと、<br>"
        "自分のお金を使わずに投資を体験できるよ！やってみよう！",
        bg_color="#F0F8FF"
    )
    
    is_jp = ".T" in ticker
    currency = "円" if is_jp else "USD"
    
    amount = st.number_input(f"いくら分かったことにする？（{currency}）", 
                              min_value=1000 if is_jp else 10, 
                              max_value=1_000_000 if is_jp else 10000, 
                              value=10000 if is_jp else 100, 
                              step=1000 if is_jp else 10,
                              key=f"purchase_amount_{ticker}")
    
    shares = amount / stock_price
    
    if st.button("⭐ かったことにする！", key=f"buy_{ticker}", type="primary"):
        purchase = {
            "name":       stock_name,
            "ticker":     ticker,
            "price":      stock_price,
            "amount":     amount,
            "shares":     shares,
            "bought_at":  pd.Timestamp.now().strftime("%Y/%m/%d"),
        }
        if "portfolio" not in st.session_state:
            st.session_state.portfolio = []
        st.session_state.portfolio.append(purchase)
        st.success(f"✅ {stock_name} を {currency}{amount:,} 分「かったことに」したよ！")
        st.balloons()
        st.rerun()

def render_portfolio():
    """おさいふの様子（仮想ポートフォリオ）を表示"""
    
    st.markdown('<div class="section-title">💰 おさいふの様子</div>', unsafe_allow_html=True)
    
    if not st.session_state.get("portfolio"):
        st.info("まだ買った株はないよ。気になる会社を「かったことに」してみてね！")
        return
    
    # 博士のアドバイスはサイドバーにあるため、ここではリスト表示に専念
    total_cost_jp    = 0
    total_current_jp = 0
    total_cost_us    = 0
    total_current_us = 0
    
    for item in st.session_state.portfolio:
        info = market_data.get_stock_info(item["ticker"])
        if info:
            current_value = item["shares"] * info["price"]
            gain          = current_value - item["amount"]
            gain_pct      = (gain / item["amount"]) * 100
            
            is_jp = ".T" in item["ticker"]
            if is_jp:
                total_cost_jp    += item["amount"]
                total_current_jp += current_value
            else:
                total_cost_us    += item["amount"]
                total_current_us += current_value
            
            color = "#00B894" if gain >= 0 else "#FF7675"
            icon  = "📈" if gain >= 0 else "📉"
            currency_symbol = "¥" if is_jp else "$"
            
            st.markdown(f"""
            <div class="kabu-card" style="border-left: 4px solid {color}; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">{item['name']}</strong>
                <span style="color:{color}; font-weight:bold;">{gain_pct:+.1f}% {icon}</span>
              </div>
              <div style="font-size:0.85rem; color:#636E72; -webkit-text-fill-color: #636E72; margin-top:4px;">
                購入額: {currency_symbol}{item['amount']:,.0f} → 現在: {currency_symbol}{current_value:,.0f}<br>
                損益: {'+' if gain >= 0 else ''}{gain:,.0f}{'円' if is_jp else ''}
              </div>
            </div>
            """, unsafe_allow_html=True)
    
    # 日本株合計
    if total_cost_jp > 0:
        render_summary("日本株合計", total_cost_jp, total_current_jp, "¥")
    
    # 米国株合計
    if total_cost_us > 0:
        render_summary("米国株合計", total_cost_us, total_current_us, "$")

def render_summary(label, cost, current, symbol):
    gain = current - cost
    pct = (gain / cost) * 100 if cost > 0 else 0
    color = "#00B894" if gain >= 0 else "#FF7675"
    st.markdown(f"""
    <div class="kabu-card" style="background: #F8F9FA; text-align:center; border: 1px solid #eee; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
      <div style="font-size:0.8rem; color:#888; -webkit-text-fill-color: #888;">{label}</div>
      <div style="font-size:1.4rem; font-weight:bold; color:{color};">
        {symbol}{current:,.0f} <span style="font-size:0.9rem;">({pct:+.1f}%)</span>
      </div>
    </div>
    """, unsafe_allow_html=True)

def render_watchlist_button(stock_name: str, ticker: str):
    """ウォッチリスト追加ボタン"""
    if "watchlist" not in st.session_state:
        st.session_state.watchlist = []
    
    already = any(w["ticker"] == ticker for w in st.session_state.watchlist)
    
    if already:
        st.button("⭐ ウォッチリスト登録済み", key=f"wl_{ticker}", disabled=True, use_container_width=True)
    else:
        if st.button("☆ ウォッチリストに追加", key=f"wl_{ticker}", use_container_width=True):
            st.session_state.watchlist.append({"name": stock_name, "ticker": ticker})
            st.success(f"⭐ {stock_name} をウォッチリストに追加したよ！")
            st.rerun()

def render_watchlist():
    """ウォッチリスト表示"""
    st.markdown('<div class="section-title">⭐ ウォッチリスト</div>', unsafe_allow_html=True)
    if not st.session_state.get("watchlist"):
        st.info("ウォッチリストはまだ空だよ。")
        return
    
    for item in st.session_state.watchlist:
        info = market_data.get_stock_info(item["ticker"])
        if info:
            color = "var(--success)" if info['change_pct'] >= 0 else "var(--danger)"
            st.markdown(f"""
            <div class="kabu-card" style="color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">{item['name']} ({item['ticker']})</strong>
                  <span style="color:{color}; font-weight:700;">{info['change_pct']:+.2f}%</span>
                </div>
                <div style="font-size: 1.1rem; margin-top:4px; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
                  {'¥' if '.T' in item['ticker'] else '$'}{info['price']:,}
                </div>
            </div>
            """, unsafe_allow_html=True)
