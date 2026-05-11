# Antigravity バグ修正プロンプト
## KABU PORTAL — 緊急バグ修正3件

---

## 修正①：銘柄検索が企業名で動かない

### 問題
- ユーザーが「トヨタ」「Apple」などの企業名を入力しても何も表示されない
- 証券コード（7203など）を知っている前提の設計になっている
- 一般ユーザーは証券コードを知らない

### 修正内容

`modules/market_data.py` に企業名→ティッカー変換の辞書を追加し、
部分一致で検索できるようにすること。

```python
# 企業名 → ティッカー の対応辞書（日本株・米国株）
STOCK_DICT = {
    # 日本株
    "トヨタ": "7203.T", "toyota": "7203.T",
    "ソニー": "6758.T", "sony": "6758.T",
    "任天堂": "7974.T", "nintendo": "7974.T",
    "ソフトバンク": "9434.T", "softbank": "9434.T",
    "NTT": "9432.T", "ntt": "9432.T",
    "KDDI": "9433.T", "kddi": "9433.T",
    "キーエンス": "6861.T", "keyence": "6861.T",
    "東京エレクトロン": "8035.T",
    "ファーストリテイリング": "9983.T", "ユニクロ": "9983.T", "uniqlo": "9983.T",
    "三菱商事": "8058.T",
    "三井住友": "8316.T", "smbc": "8316.T",
    "オリックス": "8591.T",
    "リクルート": "6098.T",
    "日立": "6501.T", "hitachi": "6501.T",
    "パナソニック": "6752.T", "panasonic": "6752.T",
    "デンソー": "6902.T",
    "ホンダ": "7267.T", "honda": "7267.T",
    "シャープ": "6753.T", "sharp": "6753.T",
    # 米国株
    "アップル": "AAPL", "apple": "AAPL",
    "マイクロソフト": "MSFT", "microsoft": "MSFT",
    "エヌビディア": "NVDA", "nvidia": "NVDA",
    "テスラ": "TSLA", "tesla": "TSLA",
    "アマゾン": "AMZN", "amazon": "AMZN",
    "グーグル": "GOOGL", "google": "GOOGL", "alphabet": "GOOGL",
    "メタ": "META", "meta": "META",
    "ネットフリックス": "NFLX", "netflix": "NFLX",
}

def search_stock(query: str):
    """企業名・ティッカー・証券コードどれでも検索できる"""
    query = query.strip()
    if not query:
        return None

    # 1. 辞書から部分一致検索
    query_lower = query.lower()
    for name, ticker in STOCK_DICT.items():
        if query_lower in name.lower() or name.lower() in query_lower:
            return get_stock_info(ticker)

    # 2. 証券コード（数字4桁）で入力された場合
    if query.isdigit() and len(query) == 4:
        return get_stock_info(f"{query}.T")

    # 3. 英字ティッカーで入力された場合（AAPL, TSLAなど）
    if query.upper() == query or query.isalpha():
        return get_stock_info(query.upper())

    return None
```

### UIの変更

検索入力欄のプレースホルダーを変更：

```python
# 変更前
st.text_input("", placeholder="例: 7203（トヨタ）, AAPL（Apple）")

# 変更後
st.text_input("", placeholder="例：トヨタ、ソニー、Apple、NVIDIA")
```

検索結果が見つからない場合のメッセージ：

```python
st.warning("「" + query + "」は見つかりませんでした。別の名前で試してみてね！")
```

---

## 修正②：テーマ別ボタンをクリックしても何も起こらない

### 問題
- テーマカード（AI・テクノロジー、高配当など）をクリックしても反応しない
- ティッカーコードが羅列されているだけで、ユーザーが何をすればいいか分からない

### 修正内容

`modules/market_data.py` にテーマ別銘柄データを定義し、
クリックしたらそのテーマの銘柄一覧を表示するようにする。

```python
THEMES = {
    "🚀 AI・テクノロジー": {
        "desc": "人工知能や半導体など、未来を作る会社たち",
        "stocks": [
            {"name": "エヌビディア", "ticker": "NVDA"},
            {"name": "東京エレクトロン", "ticker": "8035.T"},
            {"name": "キーエンス", "ticker": "6861.T"},
            {"name": "マイクロソフト", "ticker": "MSFT"},
        ]
    },
    "💰 高配当": {
        "desc": "持っているだけでお小遣いがもらえる会社",
        "stocks": [
            {"name": "NTT", "ticker": "9432.T"},
            {"name": "KDDI", "ticker": "9433.T"},
            {"name": "オリックス", "ticker": "8591.T"},
            {"name": "三井住友FG", "ticker": "8316.T"},
        ]
    },
    "🍔 身近な優待": {
        "desc": "株主になるとお得な特典がもらえる会社",
        "stocks": [
            {"name": "マクドナルド（日本）", "ticker": "2702.T"},
            {"name": "すかいらーく", "ticker": "3197.T"},
            {"name": "イオン", "ticker": "8267.T"},
            {"name": "オリックス", "ticker": "8591.T"},
        ]
    },
    "🌎 グローバル": {
        "desc": "世界中で使われている有名な会社",
        "stocks": [
            {"name": "アップル", "ticker": "AAPL"},
            {"name": "テスラ", "ticker": "TSLA"},
            {"name": "アマゾン", "ticker": "AMZN"},
            {"name": "トヨタ", "ticker": "7203.T"},
        ]
    },
}
```

UIのボタン処理：

```python
# st.session_state でどのテーマが選択されたかを管理
if "selected_theme" not in st.session_state:
    st.session_state.selected_theme = None

cols = st.columns(2)
for i, (theme_name, theme_data) in enumerate(THEMES.items()):
    with cols[i % 2]:
        if st.button(theme_name, use_container_width=True, key=f"theme_{i}"):
            st.session_state.selected_theme = theme_name

# 選択されたテーマの銘柄を表示
if st.session_state.selected_theme:
    theme = THEMES[st.session_state.selected_theme]
    st.markdown(f"### {st.session_state.selected_theme}")
    st.caption(theme["desc"])
    
    for stock in theme["stocks"]:
        info = get_stock_info(stock["ticker"])
        if info:
            col1, col2, col3 = st.columns([3, 2, 2])
            with col1:
                st.write(f"**{stock['name']}**")
            with col2:
                price_str = f"¥{info['price']:,.0f}" if ".T" in stock["ticker"] else f"${info['price']:,.2f}"
                st.write(price_str)
            with col3:
                pct = info["change_pct"]
                color = "🟢" if pct >= 0 else "🔴"
                st.write(f"{color} {pct:+.2f}%")
```

---

## 修正③：仮想購入シミュレーション機能が消えた

### 問題
- 以前のバージョンにあった「かったことにする？」機能が見当たらない
- ウォッチリストと仮想購入の両方が必要

### 修正内容

`modules/simulation.py` に以下の2機能を実装し、「探す」ページの下部に配置する。

#### 仮想購入機能

```python
def render_virtual_purchase(stock_name: str, stock_price: float, ticker: str):
    """銘柄ページ下部に「かったことにする？」セクションを表示"""
    
    st.markdown("### 🛍️ かったことにする？")
    st.caption("この株をいま値段で買ったことにして、あとで「いくら増えたか」見てみよう！")
    
    amount = st.number_input("いくら分かったことにする？（円）", 
                              min_value=1000, max_value=1_000_000, 
                              value=10000, step=1000,
                              key=f"purchase_amount_{ticker}")
    
    shares = amount / stock_price
    
    if st.button("⭐ かったことにする！", key=f"buy_{ticker}"):
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
        st.success(f"✅ {stock_name} を ¥{amount:,} 分「かったことに」したよ！")
        st.balloons()


def render_portfolio():
    """おさいふの様子（仮想ポートフォリオ）を表示"""
    
    st.markdown("### 💰 おさいふの様子")
    
    if not st.session_state.get("portfolio"):
        st.info("まだ買った株はないよ。気になる会社を「かったことに」してみてね！")
        return
    
    total_cost    = 0
    total_current = 0
    
    for item in st.session_state.portfolio:
        info = get_stock_info(item["ticker"])
        if info:
            current_value = item["shares"] * info["price"]
            gain          = current_value - item["amount"]
            gain_pct      = (gain / item["amount"]) * 100
            
            total_cost    += item["amount"]
            total_current += current_value
            
            color = "#00B894" if gain >= 0 else "#FF7675"
            icon  = "📈" if gain >= 0 else "📉"
            
            st.markdown(f"""
            <div class="kabu-card" style="border-left: 4px solid {color};">
              <strong>{item['name']}</strong>　{icon}<br>
              購入額: ¥{item['amount']:,.0f} → 現在: ¥{current_value:,.0f}<br>
              <span style="color:{color}; font-weight:bold;">
                {'+' if gain >= 0 else ''}{gain:,.0f}円（{gain_pct:+.1f}%）
              </span>
            </div>
            """, unsafe_allow_html=True)
    
    # 合計
    total_gain = total_current - total_cost
    total_pct  = (total_gain / total_cost) * 100 if total_cost > 0 else 0
    total_color = "#00B894" if total_gain >= 0 else "#FF7675"
    
    st.markdown(f"""
    <div class="kabu-card" style="background: #F8F9FA; text-align:center;">
      <strong>合計</strong><br>
      ¥{total_cost:,.0f} → ¥{total_current:,.0f}<br>
      <span style="color:{total_color}; font-size:1.2rem; font-weight:bold;">
        {'+' if total_gain >= 0 else ''}{total_gain:,.0f}円（{total_pct:+.1f}%）
      </span>
    </div>
    """, unsafe_allow_html=True)
```

#### ウォッチリスト機能

```python
def render_watchlist_button(stock_name: str, ticker: str):
    """ウォッチリスト追加ボタン"""
    if "watchlist" not in st.session_state:
        st.session_state.watchlist = []
    
    already = any(w["ticker"] == ticker for w in st.session_state.watchlist)
    
    if already:
        if st.button("⭐ ウォッチリスト登録済み", key=f"wl_{ticker}", disabled=True):
            pass
    else:
        if st.button("☆ ウォッチリストに追加", key=f"wl_{ticker}"):
            st.session_state.watchlist.append({"name": stock_name, "ticker": ticker})
            st.success(f"⭐ {stock_name} をウォッチリストに追加したよ！")
```

---

## 配置場所

「探す・シミュレーション」ページの構成を以下にすること：

```
1. 銘柄検索（企業名で検索）
   └ 検索結果 → 株価・グラフ・AI評価
               └ [ウォッチリストに追加] [かったことにする？]

2. テーマから探す
   └ クリック → そのテーマの銘柄一覧表示

3. おさいふの様子（仮想ポートフォリオ）

4. 自分のウォッチリスト
```

---

## 注意事項

- 既存の `st.session_state` のキーを確認し、衝突しないようにすること
- yfinanceのAPI呼び出しは `@st.cache_data(ttl=300)` でキャッシュし、表示を速くすること
- 銘柄が見つからない場合は必ずエラーではなくやさしいメッセージを表示すること
- 日本株（.T）と米国株で通貨表示（¥ / $）を切り替えること
