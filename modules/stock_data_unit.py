import streamlit as st
import yfinance as yf
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime, timedelta

@st.cache_data(ttl=3600)
def get_stock_data(ticker, period="1y"):
    """指定したティッカーの過去データを取得する（1時間キャッシュ）"""
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period=period)
        return hist, stock.info
    except Exception as e:
        return None, {}

@st.cache_data(ttl=7200)
def get_dividend_info(tickers):
    """複数銘柄の配当情報を取得する（2時間キャッシュ）"""
    results = []
    for ticker, name in tickers:
        try:
            info = yf.Ticker(ticker).info
            # dividendYieldはすでに%表記（例: 3.44 = 3.44%）
            yield_val = info.get('dividendYield', 0) or 0
            # フォールバック: trailingAnnualDividendYieldは小数（例: 0.034 = 3.4%）
            if yield_val == 0:
                trailing = info.get('trailingAnnualDividendYield', 0) or 0
                yield_val = trailing * 100
            price = info.get('currentPrice') or info.get('regularMarketPrice', 0) or 0
            sector = info.get('sector', '')
            results.append({
                'ticker': ticker,
                'name': name,
                'yield': yield_val,
                'price': price,
                'sector': sector
            })
        except:
            pass
    return sorted(results, key=lambda x: x['yield'], reverse=True)

def plot_stock_chart(hist_data, title, line_color="#0066CC"):
    """Plotlyで株価チャートを描画する"""
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=hist_data.index,
        y=hist_data['Close'],
        mode='lines',
        line=dict(color=line_color, width=2),
        fill='tozeroy',
        fillcolor=f"rgba{tuple(int(line_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (0.1,)}"
    ))
    
    fig.update_layout(
        title=dict(text=title, font=dict(color='#1e293b', size=14)),
        plot_bgcolor='#f8fafc',
        paper_bgcolor='rgba(0,0,0,0)',
        hovermode="x unified",
        xaxis=dict(showgrid=True, gridcolor='#e2e8f0', color='#64748b'),
        yaxis=dict(showgrid=True, gridcolor='#e2e8f0', tickformat=",.0f", color='#64748b'),
        margin=dict(l=0, r=0, t=36, b=0),
        height=300
    )
    return fig

def run_stock_data_unit():
    if 'watchlist' not in st.session_state:
        st.session_state.watchlist = []

    st.header("🌐 せかいの市場（しじょう）")
    st.markdown("今の世界の株価と、注目の「めいがら」をチェックしてみよう！")
    
    # 1. 市場概況 (Market Overview)
    col_ind1, col_ind2, col_ind3 = st.columns(3)
    
    with st.spinner("市場データを取得中..."):
        indices = {
            "^GSPC": "S&P 500 (米国)",
            "^IXIC": "Nasdaq (米国ハイテク)",
            "^N225": "日経225 (日本)"
        }
        
        for i, (ticker, name) in enumerate(indices.items()):
            hist, _ = get_stock_data(ticker, period="1mo")
            if hist is not None and not hist.empty:
                curr = hist['Close'].iloc[-1]
                prev = hist['Close'].iloc[-2]
                pct = ((curr - prev) / prev) * 100
                cols = [col_ind1, col_ind2, col_ind3]
                cols[i].metric(name, f"{curr:,.0f}", f"{pct:+.2f}%")
    
    st.divider()

    # ② テーマ株カード
    st.subheader("🗂️ テーマ別で選ぶ")
    st.markdown("気になるテーマから銘柄を見てみよう！")

    theme_stocks = {
        "🤖 AI・人工知能": {
            "color": "#6366f1",
            "stocks": [
                ("6758.T", "ソニー"), ("8035.T", "東京エレクトロン"),
                ("NVDA", "NVIDIA"), ("MSFT", "Microsoft"),
            ]
        },
        "💡 半導体": {
            "color": "#f59e0b",
            "stocks": [
                ("8035.T", "東京エレクトロン"), ("6857.T", "アドバンテスト"),
                ("NVDA", "NVIDIA"), ("AVGO", "Broadcom"),
            ]
        },
        "🛡️ 防衛・安全保障": {
            "color": "#ef4444",
            "stocks": [
                ("7011.T", "三菱重工業"), ("7014.T", "名村造船所"),
                ("LMT", "Lockheed Martin"), ("RTX", "Raytheon"),
            ]
        },
        "⚡ EV・エネルギー": {
            "color": "#10b981",
            "stocks": [
                ("7203.T", "トヨタ"), ("7267.T", "ホンダ"),
                ("TSLA", "Tesla"), ("NEE", "NextEra Energy"),
            ]
        },
    }

    theme_cols = st.columns(len(theme_stocks))
    for col, (theme_name, theme_data) in zip(theme_cols, theme_stocks.items()):
        color = theme_data["color"]
        with col:
            st.markdown(f"""
            <div style="border:2px solid {color}20; border-radius:12px; padding:16px;
                        background:white; box-shadow:0 2px 8px rgba(0,0,0,0.05); height:100%;">
                <div style="font-size:1.05rem; font-weight:700; color:{color}; margin-bottom:10px;">
                    {theme_name}
                </div>
            """, unsafe_allow_html=True)
            for ticker, name in theme_data["stocks"]:
                st.markdown(f"""
                <div style="font-size:0.85rem; padding:4px 8px; margin-bottom:4px;
                            background:{color}10; border-radius:6px; color:#374151;">
                    📌 {name} <span style="color:#9ca3af; font-size:0.75rem;">({ticker})</span>
                </div>
                """, unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

    st.divider()

    # 2. 本日のピックアップ (Today's Pickups)
    st.subheader("🔥 今日の注目めいがら")
    st.markdown("世界のニュースや日本の景気から、これからが楽しみな会社を選んだよ。")
    
    tab_domestic, tab_international, tab_ranking, tab_ai = st.tabs([
        "🇯🇵 日本の注目めいがら", "🌎 海外の注目めいがら", "🏆 各種ランキング", "🤖 AIおすすめ銘柄"
    ])
    
    with tab_domestic:
        domestic_recs = {
            "8035.T": {
                "name": "東京エレクトロン", 
                "area": "半導体の機械",
                "reason": "AI（人工知能）に欠かせない「半導体」を作るための機械を作っている世界的な会社だよ。AIがもっと賢くなるために必要な存在なんだ。"
            },
            "6367.T": {
                "name": "ダイキン工業", 
                "area": "エアコンの会社",
                "reason": "世界中で一番エアコンを売っている会社だよ。暑い国が増えたり、空気をきれいにしたい場所が増えているから、これからも期待大だね。"
            },
            "9432.T": {
                "name": "日本電信電話 (NTT)", 
                "area": "通信・インターネットの基盤",
                "reason": "日本のインターネットや電話の元締め。将来、光を使ったものすごく速い通信（IOWN）を作ろうとしているすごい会社なんだ。"
            }
        }
        
        d_rec_names = [v['name'] for v in domestic_recs.values()]
        d_tabs = st.tabs(d_rec_names)
        for i, (ticker, info) in enumerate(domestic_recs.items()):
            with d_tabs[i]:
                col_d1, col_d2 = st.columns([2, 3])
                with col_d1:
                    st.markdown(f"**【{info['area']}】**")
                    st.info(info['reason'])
                    # Shareholder Benefit Button for Japanese stocks
                    if ".T" in ticker:
                        code = ticker.split(".")[0]
                        st.link_button("🎁 この会社の「株主優待」を調べる", f"https://finance.yahoo.co.jp/quote/{code}/incentive")
                with col_d2:
                    hist, _ = get_stock_data(ticker, period="1y")
                    if hist is not None and not hist.empty:
                        st.plotly_chart(plot_stock_chart(hist, f"{info['name']} の動き", line_color="#10b981"), use_container_width=True)

    with tab_international:
        international_recs = {
            "NVDA": {
                "name": "エヌビディア", 
                "area": "AIの脳（半導体）",
                "reason": "AIの進化に絶対に欠かせない「半導体」を作っている世界で一番有名な会社。今のAIブームの主役だよ。"
            },
            "TSLA": {
                "name": "テスラ", 
                "area": "電気自動車とAIロボット",
                "reason": "電気で動く車や、賢いAIを搭載したロボットを作っているよ。未来の乗り物や生活を大きく変えるかもしれないね。"
            },
            "MSFT": {
                "name": "マイクロソフト", 
                "area": "ソフトウェアとAI",
                "reason": "WindowsやExcelで有名だけど、今はAI（ChatGPTなど）を世界中に広めているリーダー的な会社なんだ。"
            }
        }
        
        i_rec_names = [v['name'] for v in international_recs.values()]
        i_tabs = st.tabs(i_rec_names)
        for i, (ticker, info) in enumerate(international_recs.items()):
            with i_tabs[i]:
                col_i1, col_i2 = st.columns([2, 3])
                with col_i1:
                    st.markdown(f"**【{info['area']}】**")
                    st.info(info['reason'])
                with col_i2:
                    hist, _ = get_stock_data(ticker, period="1y")
                    if hist is not None and not hist.empty:
                        st.plotly_chart(plot_stock_chart(hist, f"{info['name']} の動き", line_color="#6366f1"), use_container_width=True)

    with tab_ranking:
        st.markdown("#### 🏆 各種ランキング（日本・米国）")
        st.markdown("みんなが注目している株をランキング形式で紹介するよ！")

        rank_type = st.segmented_control("見たいランキングをえらんでね", ["📈 値上がり株 (1ヶ月)", "💰 高配当株", "🏷️ 割安株 (低PER)"], default="💰 高配当株")

        # ランキング用の対象銘柄プール（計算を軽くするため代表的なものを抜粋）
        pool_tickers = [
            ("7203.T", "トヨタ自動車"), ("6758.T", "ソニーグループ"), ("8035.T", "東京エレクトロン"), 
            ("9984.T", "ソフトバンクG"), ("9432.T", "NTT"), ("8306.T", "三菱UFJ銀行"),
            ("8058.T", "三菱商事"), ("8591.T", "オリックス"), ("4063.T", "信越化学工業"),
            ("7267.T", "ホンダ"), ("7270.T", "SUBARU"), ("9433.T", "KDDI"), 
            ("8316.T", "三井住友FG"), ("5020.T", "ENEOS"), ("2802.T", "味の素"),
            ("AAPL", "Apple"), ("NVDA", "NVIDIA"), ("MSFT", "Microsoft"), 
            ("TSLA", "Tesla"), ("GOOGL", "Alphabet (Google)"), ("AMZN", "Amazon")
        ]

        @st.cache_data(ttl=3600*3)
        def get_ranking_info(tickers):
            res = []
            for t, n in tickers:
                try:
                    info = yf.Ticker(t).info
                    hist = yf.Ticker(t).history(period="1mo")
                    price_change = 0
                    if not hist.empty and len(hist) > 1:
                        price_change = ((hist['Close'].iloc[-1] - hist['Close'].iloc[0]) / hist['Close'].iloc[0]) * 100
                    
                    yield_val = info.get('dividendYield', 0) or 0
                    if yield_val == 0:
                        yield_val = (info.get('trailingAnnualDividendYield', 0) or 0) * 100
                    
                    res.append({
                        "ticker": t, "name": n,
                        "change": price_change,
                        "yield": yield_val,
                        "pe": info.get("trailingPE", 999),
                        "price": info.get('currentPrice') or info.get('regularMarketPrice', 0) or 0
                    })
                except:
                    pass
            return res

        with st.spinner("データを集めています..."):
            rank_data = get_ranking_info(pool_tickers)

        if rank_data:
            if rank_type == "📈 値上がり株 (1ヶ月)":
                sorted_data = sorted(rank_data, key=lambda x: x['change'], reverse=True)[:8]
                metric_key = 'change'
                metric_format = "+.1f"
                metric_unit = "% UP!"
                metric_color = "#ef4444"
            elif rank_type == "💰 高配当株":
                sorted_data = sorted(rank_data, key=lambda x: x['yield'], reverse=True)[:8]
                metric_key = 'yield'
                metric_format = ".2f"
                metric_unit = "%"
                metric_color = "#10b981"
            else: # 割安株
                # PERが0より大きく、かつ低い順（異常値を除く）
                valid_pe = [d for d in rank_data if 0 < d['pe'] < 100]
                sorted_data = sorted(valid_pe, key=lambda x: x['pe'])[:8]
                metric_key = 'pe'
                metric_format = ".1f"
                metric_unit = " 倍"
                metric_color = "#f59e0b"

            for rank, stock in enumerate(sorted_data, 1):
                val = stock[metric_key]
                # Filter out zeroes/errors
                if rank_type == "💰 高配当株" and val <= 0: continue
                if rank_type == "🏷️ 割安株 (低PER)" and val >= 999: continue

                medal = ["🥇", "🥈", "🥉"][rank - 1] if rank <= 3 else f"**{rank}位**"
                price_str = f"¥{stock['price']:,.0f}" if ".T" in stock['ticker'] else f"${stock['price']:,.2f}"
                
                # Visual bar
                if rank_type == "💰 高配当株":
                    bar_width = min(int(val / 6 * 100), 100)
                elif rank_type == "📈 値上がり株 (1ヶ月)":
                    bar_width = min(int(max(val, 0) / 20 * 100), 100)
                else:
                    bar_width = 100 - min(int(val / 30 * 100), 100) # Lower PER is better (fuller bar)

                st.markdown(f"""
                <div class="rank-card">
                    <div class="rank-card-medal">{medal}</div>
                    <div class="rank-card-info">
                        <div class="rank-card-title">{stock['name']}</div>
                        <div class="rank-card-subtitle">{stock['ticker']} ／ {price_str}</div>
                        <div class="rank-card-bar-container">
                            <div class="rank-card-bar" style="width:{bar_width}%; background:{metric_color};"></div>
                        </div>
                    </div>
                    <div class="rank-card-value" style="color:{metric_color};">
                        {val:{metric_format}}{metric_unit}
                    </div>
                </div>
                """, unsafe_allow_html=True)
            
            if rank_type == "🏷️ 割安株 (低PER)":
                st.caption("※PER（株価収益率）は、15倍以下だと一般的に「割安（お買い得）」と言われているよ。")
        else:
            st.info("データが取得できなかったよ。")

    with tab_ai:
        st.markdown("#### 🤖 AIおすすめ銘柄（今週のピックアップ）")
        st.markdown("AIが独自の基準（成長性・割安度・配当）でおすすめする優良銘柄だよ！")

        ai_recs = {
            "7203.T": {"name": "トヨタ自動車", "growth": 4, "value": 5, "dividend": 4, "reason": "日本を代表する大企業。世界中で車が売れていて、株主への還元（配当など）も積極的なんだ。"},
            "8058.T": {"name": "三菱商事", "growth": 4, "value": 4, "dividend": 5, "reason": "いろんな国とビジネスをしている商社。利益をしっかり出していて、配当金も魅力的だよ。"},
            "8035.T": {"name": "東京エレクトロン", "growth": 5, "value": 3, "dividend": 3, "reason": "半導体を作るのに必須の機械を作っているよ。AIブームの恩恵をたっぷり受ける成長企業！"},
            "4063.T": {"name": "信越化学工業", "growth": 4, "value": 4, "dividend": 3, "reason": "スマートフォンやパソコンの中にある部品の材料で、世界トップのシェアを持っているよ。"},
            "9433.T": {"name": "KDDI", "growth": 3, "value": 4, "dividend": 4, "reason": "「au」でおなじみの通信会社。景気に左右されにくくて、安定した配当が狙える銘柄だよ。"}
        }

        ai_tabs = st.tabs([v['name'] for v in ai_recs.values()])
        for i, (ticker, info) in enumerate(ai_recs.items()):
            with ai_tabs[i]:
                col_a1, col_a2 = st.columns([2, 3])
                with col_a1:
                    st.info(info['reason'])
                    st.markdown("##### 📈 AIの評価スコア")
                    st.markdown(f"**🌱 成長への期待**: {'⭐' * info['growth']}")
                    st.markdown(f"**🏷️ お買い得度**: {'⭐' * info['value']}")
                    st.markdown(f"**🎁 配当の魅力**: {'⭐' * info['dividend']}")
                with col_a2:
                    hist, _ = get_stock_data(ticker, period="1y")
                    if hist is not None and not hist.empty:
                        st.plotly_chart(plot_stock_chart(hist, f"{info['name']} の動き", line_color="#8b5cf6"), use_container_width=True)

    st.divider()


    # 3. 自由分析 (Stock Search)
    st.subheader("🔍 あなたの「気になる！」を調べてみよう！")
    st.markdown("会社の名まえを打つか、ジャンルから選んでみてね。")
    
    # 業種別・人気めいがらリスト (株価や時価総額に基づいたセレクション)
    sector_data = {
        "💻 IT・テクノロジー": {
            "トヨタ自動車": "7203.T", "ソニーグループ": "6758.T", "キーエンス": "6861.T", 
            "東京エレクトロン": "8035.T", "アドバンテスト": "6857.T", "信越化学工業": "4063.T", 
            "日本電信電話 (NTT)": "9432.T", "KDDI": "9433.T", "ソフトバンクグループ": "9984.T", "三菱電機": "6503.T"
        },
        "🏦 お金・銀行": {
            "三菱UFJフィナンシャルG": "8306.T", "三井住友フィナンシャルG": "8316.T", "みずほフィナンシャルG": "8411.T", 
            "野村ホールディングス": "8604.T", "日本取引所グループ": "8697.T", "オリックス": "8591.T", 
            "第一生命ホールディングス": "8750.T", "東京海上ホールディングス": "8766.T", "大和証券グループ本社": "8601.T", "ゆうちょ銀行": "7182.T"
        },
        "🍛 食べ物・お買い物": {
            "セブン＆アイHLDGS": "3382.T", "イオン": "8267.T", "ファーストリテイリング (ユニクロ)": "9983.T", 
            "ニトリホールディングス": "9843.T", "アサヒグループHLDGS": "2502.T", "キリンホールディングス": "2503.T", 
            "味の素": "2802.T", "日清食品ホールディングス": "2897.T", "日本ハム": "2282.T", "ローソン": "2651.T"
        },
        "🚗 車・乗り物": {
            "トヨタ自動車": "7203.T", "本田技研工業 (ホンダ)": "7267.T", "日産自動車": "7201.T", 
            "デンソー": "6902.T", "ヤマハ発動機": "7272.T", "ANAホールディングス": "9202.T", 
            "日本航空 (JAL)": "9201.T", "JR東日本": "9020.T", "JR東海": "9022.T", "商船三井": "9104.T"
        },
        "🇺🇸 アメリカの超有名企業": {
            "アップル (Apple)": "AAPL", "マイクロソフト": "MSFT", "アマゾン": "AMZN", 
            "テスラ (Tesla)": "TSLA", "エヌビディア (NVIDIA)": "NVDA", "アルファベット (Google)": "GOOGL", 
            "メタ (Facebook)": "META", "コストコ": "COST", "コカ・コーラ": "KO", "マクドナルド": "MCD"
        }
    }

    # 名前から検索用のフラットな辞書を作成
    all_names_mapping = {}
    for sector in sector_data.values():
        all_names_mapping.update(sector)

    search_col1, search_col2 = st.columns([1, 2])
    
    with search_col1:
        search_type = st.segmented_control(
            "どうやってさがす？", 
            ["なまえで検索", "ジャンルから選ぶ", "コードで入力"],
            default="なまえで検索"
        )
        
        search_ticker = None
        
        if search_type == "なまえで検索":
            query = st.text_input("会社の名まえをいれてね（例：トヨタ、Apple、任天堂）", "トヨタ")
            
            # 1. ローカルリストから検索 (部分一致)
            local_candidates = [name for name in all_names_mapping.keys() if query in name]
            
            if local_candidates:
                selected_name = st.selectbox("見つかったよ！", local_candidates)
                search_ticker = all_names_mapping[selected_name]
            elif len(query) >= 2:
                # 2. yfinanceを使った全世界検索 (フォールバック)
                with st.spinner("もっと大きなリストからさがし中..."):
                    try:
                        # 日本語クエリだと失敗しやすいので、既知のものは変換する
                        common_translations = {
                            "任天堂": "Nintendo",
                            "ソニー": "Sony",
                            "三菱": "Mitsubishi",
                            "ソフトバンク": "Softbank",
                            "楽天": "Rakuten",
                            "トヨタ": "Toyota",
                            "ホンダ": "Honda",
                            "日産": "Nissan",
                            "パナソニック": "Panasonic",
                            "東芝": "Toshiba",
                            "キャノン": "Canon"
                        }
                        search_query = common_translations.get(query, query)
                        
                        s = yf.Search(search_query, max_results=8)
                        quotes = s.quotes
                        
                        # クエリそのままでは見つからず、かつ日本語だった場合は、簡易的に英字のみにして再試行（あるいは何も見つからない場合）
                        if not quotes and query != search_query:
                            s = yf.Search(search_query, max_results=8)
                            quotes = s.quotes

                        if quotes:
                            options = {f"{q.get('shortname', q.get('symbol', ''))} ({q.get('symbol', '')}) - {q.get('exchDisp', '')}": q.get('symbol') 
                                      for q in quotes if 'symbol' in q}
                            if options:
                                selected_label = st.selectbox("こんなのが見つかったよ（選んでね）:", list(options.keys()))
                                search_ticker = options[selected_label]
                            else:
                                st.warning("ざんねん、見つからなかったよ。英語名で打ってみると出るかも！")
                        else:
                            st.warning("ざんねん、見つからなかったよ。英語名で打ってみると出るかも！")
                    except Exception as e:
                        st.error(f"検索中にエラーがおきちゃった: {str(e)}")
            else:
                st.caption("2文字以上いれると、もっとさかせられるよ！")
                
        elif search_type == "ジャンルから選ぶ":
            category = st.selectbox("好きなジャンルをえらんでね", list(sector_data.keys()))
            selected_name = st.selectbox("気になる会社をえらんでね", list(sector_data[category].keys()))
            search_ticker = sector_data[category][selected_name]
            
        else:
            search_ticker = st.text_input("銘柄コードを入力 (例: 7203.T, NVDA)", "7203.T").upper()
            st.caption("※日本株は `.T` をわすれずに！")

        time_range = st.selectbox("いつからのデータを見る？", ["1mo", "6mo", "1y", "5y", "10y", "max"], index=2, 
                                format_func=lambda x: {"1mo": "最近1ヶ月", "6mo": "最近半年", "1y": "最近1年", "5y": "最近5年", "10y": "最近10年", "max": "ぜんぶ"}[x])
    
    if search_ticker:
        with st.spinner(f"{search_ticker} を調べ中..."):
            hist, info = get_stock_data(search_ticker, period=time_range)
            
            if hist is not None and not hist.empty:
                with search_col2:
                    curr_p = hist['Close'].iloc[-1]
                    name_jp = info.get('shortName', search_ticker)
                    label = f"{name_jp} のいまの値段"
                    val = f"${curr_p:,.2f}" if ".T" not in search_ticker else f"¥{curr_p:,.0f}"
                    
                    st.metric(label, val)

                    # ウォッチリスト追加・削除トグル
                    in_watch = search_ticker in [w['ticker'] for w in st.session_state.watchlist]
                    if st.button("⭐ ウォッチリストから外す" if in_watch else "⭐ ウォッチリストに追加", key=f"btn_watch_{search_ticker}"):
                        if in_watch:
                            st.session_state.watchlist = [w for w in st.session_state.watchlist if w['ticker'] != search_ticker]
                        else:
                            st.session_state.watchlist.append({'ticker': search_ticker, 'name': name_jp})
                        st.rerun()
                    
                    m_col1, m_col2 = st.columns(2)
                    with m_col1:
                        if ".T" in search_ticker:
                            code = search_ticker.split(".")[0]
                            st.link_button("🎁 「株主優待」をチェック", f"https://finance.yahoo.co.jp/quote/{code}/incentive", use_container_width=True)
                    with m_col2:
                        evaluate = st.button("🤖 AIでこの会社を評価！", use_container_width=True)

                    if evaluate:
                        # 1. 最近のうごき (Recent Trend)
                        last_5_days = hist['Close'].tail(5)
                        trend_pct = ((last_5_days.iloc[-1] - last_5_days.iloc[0]) / last_5_days.iloc[0]) * 100
                        trend_str = "じわじわ上がってる" if trend_pct > 2 else "少しお疲れ気味（下がり気味）" if trend_pct < -2 else "ヨコヨコ（あまり変わらない）"
                        
                        # 2. 買いどき判定 (Buy Timing)
                        recommend = info.get('recommendationKey', 'none')
                        pe = info.get('trailingPE', 20)
                        
                        stars = 3
                        if recommend in ['buy', 'strong_buy']: stars += 1
                        if pe and pe < 15: stars += 1
                        if stars > 5: stars = 5
                        
                        # 3. リスク・注意点 (Risks)
                        risk_comments = {
                            "high": "ねだんの動きが激しいから、急に下がってもびっくりしないでね。",
                            "med": "ライバル会社との競争がはげしいよ。ニュースをしっかり見よう。",
                            "low": "安定しているけど、大きく増えるには時間がかかるかもしれないよ。"
                        }
                        risk_level = "high" if info.get('beta', 1) > 1.3 else "low" if info.get('beta', 1) < 0.8 else "med"

                        # 4. 概要とアドバイスの準備
                        summary = info.get('longBusinessSummary', "詳細情報は準備中だよ。")
                        found_desc = summary[:120] + "..." if len(summary) > 120 else summary
                        
                        buying_time = "様子見（おすすめ度：★）"
                        if stars >= 5: buying_time = "今がチャンス！（おすすめ度：★★★★★）"
                        elif stars >= 4: buying_time = "前向きに検討！（おすすめ度：★★★★）"
                        elif stars >= 3: buying_time = "悪くないね（おすすめ度：★★★）"
                        elif stars >= 2: buying_time = "あせらず待とう（おすすめ度：★★）"

                        st.balloons()
                        st.balloons()
                        # カスタムデザインのAI診断カード (従来のst.successはダークモードで黒くなるため)
                        st.html(f"""
                        <div style="background: white; border: 4px solid var(--success); border-radius: 20px; 
                                    padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                                    color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
                            <h3 style="margin-top:0; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important;">
                                🤖 AIのしんだん結果：{'⭐' * stars}
                            </h3>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                                <div style="flex: 1; min-width: 250px;">
                                    <div style="font-weight: 800; color: var(--primary); margin-bottom: 8px;">📈 最近のうごき</div>
                                    <div style="color: #444; -webkit-text-fill-color: #444; line-height: 1.6;">{trend_str}（5日間で {trend_pct:+.1f}%）</div>
                                    <div style="font-weight: 800; color: var(--primary); margin-top: 15px; margin-bottom: 8px;">🏢 どんな会社？</div>
                                    <div style="color: #444; -webkit-text-fill-color: #444; line-height: 1.6;">{found_desc}</div>
                                </div>
                                <div style="flex: 1; min-width: 250px;">
                                    <div style="font-weight: 800; color: var(--accent); margin-bottom: 8px;">⚖️ 買いどき判定</div>
                                    <div style="background: #E8F8FF; padding: 12px; border-radius: 12px; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important; font-weight: 700; border: 1px solid #B0E0E6;">
                                        {buying_time}
                                    </div>
                                    <div style="font-weight: 800; color: #ff9f43; margin-top: 15px; margin-bottom: 8px;">⚠️ きをつけること</div>
                                    <div style="background: #FFF8E8; padding: 12px; border-radius: 12px; color: #2D3436 !important; -webkit-text-fill-color: #2D3436 !important; border: 1px solid #FFE082;">
                                        {risk_comments[risk_level]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        """)

                        st.markdown("---")
                        advice = {
                            5: "文句なしのスーパー企業！長く応援する価値がありそう。",
                            4: "すごく元気な会社だよ。これからの成長に期待だね！",
                            3: "ふつうに安定している会社だね。まずは少しだけ持ってみる？",
                            2: "いまは少し元気がなさそう。もっと安くなるのを待ってもいいかも。",
                            1: "ちょっと今は大変そう。別の会社を探してみるのも勇気だよ。"
                        }
                        st.write(f"**💡 AIのヒトコトアドバイス:** {advice.get(stars, 'まずはこの会社が何をしているか、お家の人と一緒に調べてみよう！')}")

                    st.plotly_chart(plot_stock_chart(hist, f"{name_jp} の成績表 ({time_range})", line_color="#6366f1"), use_container_width=True)
                
                # --- シミュレーション機能 (New!) ---
                st.markdown("---")
                sim_col1, sim_col2 = st.columns([1, 1])
                
                with sim_col1:
                    st.markdown("### 💰 かったことにする？")
                    st.write("この株をいまの値段で買ったことにして、あとで「いくら増えたか」見てみよう！")
                    
                    if 'simulations' not in st.session_state:
                        st.session_state.simulations = []
                    
                    # すでに持っているかチェック
                    existing_sim = next((s for s in st.session_state.simulations if s['ticker'] == search_ticker), None)
                    
                    if existing_sim:
                        st.warning(f"もう「{name_jp}」は持っているよ！")
                        if st.button("このシミュレーションをやめる", key=f"del_{search_ticker}"):
                            st.session_state.simulations = [s for s in st.session_state.simulations if s['ticker'] != search_ticker]
                            st.rerun()
                    elif len(st.session_state.simulations) >= 3:
                        st.error("おさいふがいっぱいだよ！どれかをやめてから新しいのを入れよう。")
                    else:
                        buy_amount = st.number_input("いくら分かったことにする？", min_value=1000, max_value=1000000, value=10000, step=1000, key=f"amt_{search_ticker}")
                        if st.button("✨ かったことにする！", key=f"buy_{search_ticker}"):
                            st.session_state.simulations.append({
                                'ticker': search_ticker,
                                'name': name_jp,
                                'buy_price': curr_p,
                                'amount': buy_amount,
                                'date': datetime.now().strftime("%Y/%m/%d")
                            })
                            st.success(f"{name_jp} を {buy_amount:,} 円分買ったよ！おさいふをチェックしてみてね。")
                            st.rerun()

                # --- シミュレーションダッシュボード ---
                with sim_col2:
                    st.markdown("### 👛 おさいふの様子")
                    if not st.session_state.get('simulations'):
                        st.info("まだ買った株はないよ。気になる会社を「かったことに」してみてね！")
                    else:
                        for sim in st.session_state.simulations:
                            with st.expander(f"💼 {sim['name']} ({sim['date']})"):
                                # 今の値段を取得
                                s_hist, _ = get_stock_data(sim['ticker'], period="1d")
                                if s_hist is not None and not s_hist.empty:
                                    now_p = s_hist['Close'].iloc[-1]
                                    diff_pct = ((now_p - sim['buy_price']) / sim['buy_price']) * 100
                                    profit = (sim['amount'] * (now_p / sim['buy_price'])) - sim['amount']
                                    
                                    st.write(f"買ったとき: {sim['buy_price']:,.0f} 円")
                                    st.write(f"いまの値段: {now_p:,.0f} 円")
                                    
                                    color = "green" if profit >= 0 else "red"
                                    mark = "📈" if profit >= 0 else "📉"
                                    st.markdown(f"**結果: :{color}[{profit:+,.0f} 円 ({diff_pct:+.2f}%)] {mark}**")
                                    
                                    if st.button("ゴミ箱にいれる", key=f"rm_{sim['ticker']}"):
                                        st.session_state.simulations = [s for s in st.session_state.simulations if s['ticker'] != sim['ticker'] ]
                                        st.rerun()
                # --------------------------------

                with st.expander("📝 この会社について詳しく見る"):
                    st.write(info.get('longBusinessSummary', "くわしい情報はまだ準備中だよ。"))
            else:
                st.warning(f"'{search_ticker}' のデータは見つからなかったよ。コードが正しいか確認してね！")

    # 4. ウォッチリスト (Watchlist)
    st.divider()
    st.subheader("⭐ 自分のウォッチリスト")
    if not st.session_state.watchlist:
        st.info("気になるめいがらを見つけたら「⭐ ウォッチリストに追加」を押してみてね！")
    else:
        w_cols = st.columns(3)
        for i, w_item in enumerate(st.session_state.watchlist):
            with w_cols[i % 3]:
                st.markdown(f"**{w_item['name']}** ({w_item['ticker']})")
                hist, _ = get_stock_data(w_item['ticker'], period="1d")
                if hist is not None and not hist.empty:
                    cur_p = hist['Close'].iloc[-1]
                    price_str = f"¥{cur_p:,.0f}" if ".T" in w_item['ticker'] else f"${cur_p:,.2f}"
                    st.write(f"いまの値段: **{price_str}**")
                
                if st.button("外す", key=f"rm_wl_{w_item['ticker']}"):
                    st.session_state.watchlist = [w for w in st.session_state.watchlist if w['ticker'] != w_item['ticker']]
                    st.rerun()
