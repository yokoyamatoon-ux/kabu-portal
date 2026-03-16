import streamlit as st
import numpy as np
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, timedelta
from modules.stock_data_unit import get_stock_data 

def run_simulator_unit():
    # 仮想ポートフォリオの初期化
    if 'portfolio_value' not in st.session_state:
        st.session_state.portfolio_value = 1000000

    # ----------------------------
    # 仮想投資ランキング
    # ----------------------------
    st.header("🏆 今週の仮想投資ランキング")
    st.markdown("100万円からスタート！みんなの運用成績をチェックしよう。")

    mock_ranking = [
        {"rank": 1, "name": "投資家A", "gain": "+18.3%", "value": "118.3万円", "is_me": False},
        {"rank": 2, "name": "投資家B", "gain": "+12.7%", "value": "112.7万円", "is_me": False},
        {"rank": 3, "name": "あなた",  "gain": "+5.2%",  "value": f"{st.session_state.portfolio_value / 10000:.1f}万円", "is_me": True},
        {"rank": 4, "name": "投資家C", "gain": "+3.1%",  "value": "103.1万円", "is_me": False},
        {"rank": 5, "name": "投資家D", "gain": "-1.4%",  "value": "98.6万円", "is_me": False},
    ]

    for item in mock_ranking:
        bg_color = "rgba(99, 102, 241, 0.1)" if item['is_me'] else "white"
        border_color = "var(--accent)" if item['is_me'] else "transparent"
        gain_color = "var(--success)" if "+" in item['gain'] else "var(--danger)"
        
        st.markdown(f"""
        <div style="background:{bg_color}; border: 2px solid {border_color}; border-radius:10px; padding:12px 18px; margin-bottom:8px;
                    box-shadow:0 2px 4px rgba(0,0,0,0.05); display:flex; align-items:center; gap:16px;">
            <div style="font-size:1.4rem; font-weight:900; min-width:30px; text-align:center; color: var(--text-secondary);">{item['rank']}</div>
            <div style="flex:1;">
                <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">{item['name']}</div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:1.3rem; font-weight:800; color:{gain_color};">{item['gain']}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary);">資産: {item['value']}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)

    st.divider()

    # ----------------------------
    # 積立シミュレーション
    # ----------------------------
    st.header("📈 貯金（ちょきん）と投資（とうし）のシミュレーション")
    st.markdown("毎月すこしずつお金をためると、将来どれくらい増えるか見てみよう！時間をかけるのがコツだよ。")

    col_config, col_chart = st.columns([1, 2])

    with col_config:
        st.subheader("💰 お財布（さいふ）の計画")
        
        # 入力フォーム
        monthly_investment = st.number_input(
            "毎月いくら貯める？（万円）", 
            min_value=0.1, max_value=30.0, value=3.0, step=0.5,
            help="無理のない、続けられる金額を入れよう。"
        )
        
        years = st.slider(
            "何年間つづける？（年）", 
            min_value=1, max_value=40, value=20, step=1
        )
        
        expected_return = st.slider(
            "増えるペースの予想（年利 %）", 
            min_value=1.0, max_value=15.0, value=5.0, step=0.5,
            help="世界全体の株を買うと 5〜7% くらい、アメリカの強い株だと 7〜9% くらいが目安だと言われているよ。"
        )

        st.info(f"💡 コツコツ続けると...\n毎月 {monthly_investment:,.1f}万円 × 12ヶ月 × {years}年\n= **貯めた合計（はじめのお金） {monthly_investment * 12 * years:,.1f} 万円**")

    with col_chart:
        st.subheader("📊 将来のお金の目標（もくひょう）")
        
        # 複利計算ロジック
        months = years * 12
        monthly_rate = expected_return / 100 / 12
        bank_rate = 0.002 / 100 / 12 # 銀行預金の利回り（年0.002%と仮定）
        
        principal_history = []  # 元本
        investment_history = [] # 投資（複利）
        bank_history = []       # 銀行預金
        
        current_invest = 0.0
        current_bank = 0.0
        current_principal = 0.0
        
        for m in range(months + 1):
            if m > 0:
                current_principal += monthly_investment
                # 投資のリターン（月次で複利計算）
                current_invest = (current_invest + monthly_investment) * (1 + monthly_rate)
                # 銀行預金のリターン
                current_bank = (current_bank + monthly_investment) * (1 + bank_rate)
                
            principal_history.append(current_principal)
            investment_history.append(current_invest)
            bank_history.append(current_bank)
            
        # グラフ作成
        fig = go.Figure()

        # 銀行預金
        fig.add_trace(go.Scatter(
            x=list(range(months + 1)),
            y=bank_history,
            mode='lines',
            line=dict(color='gray', width=2),
            name='銀行の定期預金'
        ))

        # 投資（予想）
        fig.add_trace(go.Scatter(
            x=list(range(months + 1)),
            y=investment_history,
            mode='lines',
            line=dict(color='#0066CC', width=3),
            name=f'投資信託（年利 {expected_return}%予想）',
            fill='tonexty', # 下の線まで塗りつぶす
            fillcolor='rgba(0, 102, 204, 0.1)'
        ))
        
        # 元本（自分が払ったお金）
        fig.add_trace(go.Scatter(
            x=list(range(months + 1)),
            y=principal_history,
            mode='lines',
            line=dict(color='black', width=2, dash='dash'),
            name='元本（自分が払ったお金）'
        ))

        # x軸のラベルを年単位にする
        x_tick_vals = list(range(0, months + 1, 12 * 5)) # 5年ごと
        if months not in x_tick_vals:
            x_tick_vals.append(months)
            
        x_tick_texts = [f"{m//12}年" for m in x_tick_vals]

        fig.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            hovermode="x unified",
            xaxis=dict(
                showgrid=True, gridcolor='#EFEFEF', title='経過年数',
                tickmode='array', tickvals=x_tick_vals, ticktext=x_tick_texts
            ),
            yaxis=dict(showgrid=True, gridcolor='#EFEFEF', title='資産額 (万円)', tickformat=",.0f"),
            margin=dict(l=0, r=0, t=20, b=0),
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        
        st.plotly_chart(fig, use_container_width=True)

        profit = current_invest - current_principal
        
        # 結果のハイライト表示
        st.success(f"""
        ### 🎯 {years}年後の予想結果
        あなたが積み立てたお金（元本）は **{current_principal:,.1f}万円** ですが、
        投資信託で運用した場合は、およそ **{current_invest:,.1f}万円** になる可能性があります！
        
        増えたお金（運用益）: **+{profit:,.1f}万円**
        """)
        
    st.divider()
    st.caption("※このシミュレーションは一定の利回りで計算したものであり、将来の利益を保証するものではありません。実際の株式市場は価格が上下するため、途中でお金が減る（元本割れする）時期がある可能性があります。長期的に続けることがリスクを減らすコツです。")

    st.divider()
    
    # ----------------------------
    # 比較シミュレーション
    # ----------------------------
    st.header("⚖️ 過去くらべ！「もし〇〇を買っていたら？」")
    st.markdown("むかしに戻って、**10万円分**の株を買っていたら今どうなっていたか比べてみよう。")

    preset_tickers = {
        "トヨタ自動車": "7203.T",
        "任天堂": "7974.T",
        "ソニー": "6758.T",
        "オリックス": "8591.T",
        "Apple (アメリカ)": "AAPL",
        "NVIDIA (アメリカ)": "NVDA",
        "Tesla (アメリカ)": "TSLA",
        "S&P500 (アメリカ全体)": "^GSPC",
        "日経平均 (日本全体)": "^N225"
    }

    comp_col1, comp_col2, comp_col3 = st.columns([2, 2, 1])
    
    with comp_col1:
        stock_a_name = st.selectbox("🔴 くらべる会社A", list(preset_tickers.keys()), index=0)
        stock_a = preset_tickers[stock_a_name]

    with comp_col2:
        stock_b_name = st.selectbox("🔵 くらべる会社B", list(preset_tickers.keys()), index=5)
        stock_b = preset_tickers[stock_b_name]

    with comp_col3:
        comp_period = st.selectbox("いつ買ったことにする？", ["1年前", "3年前", "5年前"], index=2)
        period_map = {"1年前": "1y", "3年前": "3y", "5年前": "5y"}

    if st.button("✨ いざ、タイムスリップ！"):
        if stock_a == stock_b:
            st.warning("ちがう会社を選んでね！")
        else:
            with st.spinner("昔のデータを調べています..."):
                p_code = period_map[comp_period]
                
                # Fetch data
                hist_a, _ = get_stock_data(stock_a, period=p_code)
                hist_b, _ = get_stock_data(stock_b, period=p_code)
                
                if hist_a is not None and not hist_a.empty and hist_b is not None and not hist_b.empty:
                    # align dates
                    df = pd.DataFrame({'Date': hist_a.index, 'A': hist_a['Close']}).set_index('Date')
                    df = df.join(pd.DataFrame({'Date': hist_b.index, 'B': hist_b['Close']}).set_index('Date'), how='inner')
                    
                    if not df.empty:
                        # 10万円投資したときの価値に変換
                        initial_a = df['A'].iloc[0]
                        initial_b = df['B'].iloc[0]
                        
                        df['A_val'] = (df['A'] / initial_a) * 100000
                        df['B_val'] = (df['B'] / initial_b) * 100000
                        
                        # 銀行預金 (年利0.002%)
                        days = (df.index - df.index[0]).days
                        df['Bank'] = 100000 * (1 + 0.002) ** (days / 365.25)

                        final_a = df['A_val'].iloc[-1]
                        final_b = df['B_val'].iloc[-1]
                        final_bank = df['Bank'].iloc[-1]
                        
                        res_col1, res_col2 = st.columns(2)
                        with res_col1:
                            st.success(f"""
                            ### 🔴 {stock_a_name}
                            10万円が... **{final_a:,.0f} 円** になりました！
                            ({comp_period}で {final_a/100000:.1f}倍)
                            """)
                        with res_col2:
                            st.info(f"""
                            ### 🔵 {stock_b_name}
                            10万円が... **{final_b:,.0f} 円** になりました！
                            ({comp_period}で {final_b/100000:.1f}倍)
                            """)
                        
                        st.write(f"※ちなみに銀行に預けたままだと、**{final_bank:,.0f} 円**でした。")
                        
                        # Plotly Graph
                        fig_comp = go.Figure()
                        
                        fig_comp.add_trace(go.Scatter(x=df.index, y=df['A_val'], mode='lines', name=stock_a_name, line=dict(color='#ef4444', width=2)))
                        fig_comp.add_trace(go.Scatter(x=df.index, y=df['B_val'], mode='lines', name=stock_b_name, line=dict(color='#3b82f6', width=2)))
                        fig_comp.add_trace(go.Scatter(x=df.index, y=df['Bank'], mode='lines', name='銀行預金', line=dict(color='gray', width=2, dash='dash')))

                        fig_comp.update_layout(
                            title="10万円の増えかたグラフ",
                            plot_bgcolor='white', paper_bgcolor='white', hovermode="x unified",
                            xaxis=dict(showgrid=True, gridcolor='#EFEFEF'),
                            yaxis=dict(showgrid=True, gridcolor='#EFEFEF', title='お金の価値 (円)', tickformat=",.0f"),
                            margin=dict(l=0, r=0, t=40, b=0),
                            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
                        )
                        st.plotly_chart(fig_comp, use_container_width=True)

                else:
                    st.error("データの取得に失敗しました。時間をおいて試してね。")
