import streamlit as st
import pandas as pd
import yfinance as yf

# 日本語名 → ティッカーの辞書（主要企業のみ・フォールバック用）
# yfinance Searchは英語名の方が精度が高いため、日本語入力の補助として使用
STOCK_DICT = {
    # 日本株（よく検索される企業）
    "トヨタ": "7203.T",
    "ソニー": "6758.T",
    "任天堂": "7974.T",
    "ソフトバンク": "9434.T",
    "NTT": "9432.T",
    "KDDI": "9433.T",
    "キーエンス": "6861.T",
    "東京エレクトロン": "8035.T",
    "ユニクロ": "9983.T",
    "ファーストリテイリング": "9983.T",
    "三菱商事": "8058.T",
    "三井住友": "8316.T",
    "オリックス": "8591.T",
    "リクルート": "6098.T",
    "日立": "6501.T",
    "パナソニック": "6752.T",
    "デンソー": "6902.T",
    "ホンダ": "7267.T",
    "シャープ": "6753.T",
    "富士通": "6702.T",
    "村田製作所": "6981.T",
    "信越化学": "4063.T",
    "ダイキン": "6367.T",
    "ファナック": "6954.T",
    "イオン": "8267.T",
    "セブン": "3382.T",
    "楽天": "4755.T",
    "メルカリ": "4385.T",
    "サイバーエージェント": "4751.T",
    # 米国株（カタカナ対応）
    "アップル": "AAPL",
    "マイクロソフト": "MSFT",
    "エヌビディア": "NVDA",
    "テスラ": "TSLA",
    "アマゾン": "AMZN",
    "グーグル": "GOOGL",
    "アルファベット": "GOOGL",
    "メタ": "META",
    "ネットフリックス": "NFLX",
    "コカコーラ": "KO",
    "ウォルマート": "WMT",
}

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

@st.cache_data(ttl=300)
def get_indices():
    tickers = {"日経225": "^N225", "S&P500": "^GSPC", "ドル円": "JPY=X"}
    result = {}
    for name, ticker in tickers.items():
        # デフォルト値を先にセット
        result[name] = {"price": "---", "change_pct": 0}
        try:
            t = yf.Ticker(ticker)
            info = t.fast_info
            if hasattr(info, "last_price") and info.last_price is not None:
                price = info.last_price
                prev = info.previous_close if hasattr(info, "previous_close") and info.previous_close else price
                result[name] = {
                    "price": round(price, 2),
                    "change_pct": round((price - prev) / prev * 100, 2) if prev else 0
                }
        except Exception:
            pass # デフォルト値が既にセットされているので何もしない
    return result

@st.cache_data(ttl=300)
def get_stock_info(ticker: str):
    try:
        t = yf.Ticker(ticker)
        info = t.fast_info
        hist = t.history(period="1y")
        return {
            "name":       t.info.get("longName") or t.info.get("shortName") or ticker,
            "ticker":     ticker,
            "price":      round(info.last_price, 2),
            "change_pct": round((info.last_price - info.previous_close) / info.previous_close * 100, 2),
            "history":    hist["Close"],
        }
    except:
        return None

@st.cache_data(ttl=300)
def search_stock(query: str):
    """
    企業名（日本語・英語）・ティッカー・証券コードどれでも検索できる。
    
    検索の優先順位：
    1. 日本語辞書で部分一致（高速・精度高）
    2. 証券コード4桁（例：7203）
    3. 英字ティッカー直打ち（例：AAPL）
    4. yfinance Search API（上記で見つからない場合・上場企業ほぼ全件対応）
    """
    query = query.strip()
    if not query:
        return None

    # 1. 日本語辞書で部分一致
    query_lower = query.lower()
    for name, ticker in STOCK_DICT.items():
        if query_lower in name.lower() or name.lower() in query_lower:
            return get_stock_info(ticker)

    # 2. 証券コード（数字4桁）
    if query.isdigit() and len(query) == 4:
        return get_stock_info(f"{query}.T")

    # 3. 英字ティッカー直打ち（AAPL, TSLAなど）
    if query.replace(".", "").isalpha() and len(query) <= 6:
        result = get_stock_info(query.upper())
        if result:
            return result

    # 4. yfinance Search API（辞書にない企業・英語名・あいまい検索）
    try:
        search_results = yf.Search(query, max_results=5)
        quotes = search_results.quotes
        
        if not quotes:
            return None
        
        # 最初のヒット（最も関連性が高い）を使用
        best_ticker = quotes[0].get("symbol")
        if best_ticker:
            result = get_stock_info(best_ticker)
            if result:
                # 候補が複数ある場合は候補リストも返す（UI表示用）
                result["search_candidates"] = [
                    {"name": q.get("longname") or q.get("shortname", ""), "ticker": q.get("symbol", "")}
                    for q in quotes[:3]
                ]
                return result
    except Exception:
        pass

    return None
