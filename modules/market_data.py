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

# ---------------------------------------------------------
# 主要指数のデータ管理 (一括・高速・フォールバック対応)
# ---------------------------------------------------------

# 万が一取得に失敗した時や、起動直後のための仮データ
FALLBACK_MARKET_DATA = {
    "日経225 🇯🇵": {"price": 38500.0, "change_pct": 0.5, "ticker": "^N225"},
    "S&P500 🇺🇸":  {"price": 5100.0, "change_pct": 0.3, "ticker": "^GSPC"},
    "ドル円 💴":    {"price": 150.2, "change_pct": -0.1, "ticker": "JPY=X"},
}

@st.cache_data(ttl=1200)
def get_unified_market_data(period="1mo"):
    """主要3指数の現在値と履歴を一括で取得する。失敗時は空を返すが、UI層でフォールバックさせる。"""
    indices = {
        "日経225 🇯🇵": "^N225",
        "S&P500 🇺🇸":  "^GSPC",
        "ドル円 💴":    "JPY=X",
    }
    result = {}
    try:
        tickers_list = list(indices.values())
        # 一括ダウンロードが最もネットワーク的に効率的
        data = yf.download(tickers_list, period=period, interval="1d", group_by='ticker', progress=False)
        
        for name, ticker in indices.items():
            if ticker in data.columns.levels[0]:
                hist = data[ticker]["Close"].dropna()
                if not hist.empty:
                    price = hist.iloc[-1]
                    prev  = hist.iloc[-2] if len(hist) > 1 else price
                    result[name] = {
                        "price": price,
                        "change_pct": (price - prev) / prev * 100 if prev else 0,
                        "history": hist,
                        "ticker": ticker
                    }
    except Exception as e:
        print(f"Unified fetch error: {e}")
    
    return result

def get_indices():
    """主要指数の現在価格を取得（サイドバー用）。unified関数の結果から抽出。"""
    data = get_unified_market_data(period="1mo")
    
    final_indices = {}
    for name, fb in FALLBACK_MARKET_DATA.items():
        # 表示名を market_history 型に合わせるためキー調整
        short_name = name.split(" ")[0] # "日経225"
        if name in data:
            final_indices[short_name] = data[name]
        else:
            final_indices[short_name] = fb # 失敗時はフォールバック値を返す
            
    return final_indices

def get_market_history(period="1mo"):
    """主要指数の履歴データを取得（ホーム画面用）。unified関数の結果をそのまま返すかフォールバック。"""
    data = get_unified_market_data(period=period)
    
    # 完全に空の場合はフォールバック情報を混ぜて返す（チャートは出ないが数字は出る）
    if not data:
        return FALLBACK_MARKET_DATA
    return data

@st.cache_data(ttl=1200)
def get_multiple_stocks_info(tickers: list):
    """複数銘柄の情報を一括で取得してキャッシュ（性能向上用）"""
    if not tickers: return {}
    
    result = {}
    try:
        # 価格と履歴を一括ダウンロード
        data = yf.download(tickers, period="1y", interval="1d", group_by='ticker', progress=False)
        
        for ticker in tickers:
            try:
                if ticker in data.columns.levels[0]:
                    hist = data[ticker]["Close"].dropna()
                    if not hist.empty:
                        price = hist.iloc[-1]
                        prev  = hist.iloc[-2] if len(hist) > 1 else price
                        
                        # 個別名などは get_stock_info の個別キャッシュに任せるか、
                        # ここでは最低限の情報だけ返す
                        result[ticker] = {
                            "ticker":     ticker,
                            "price":      round(price, 2),
                            "change_pct": round((price - prev) / prev * 100, 2) if prev else 0,
                            "history":    hist,
                        }
            except:
                pass
    except:
        pass
    return result

@st.cache_data(ttl=1200)
def get_stock_info(ticker: str):
    """個別銘柄の情報を取得（詳細ページ・検索用）"""
    try:
        t = yf.Ticker(ticker)
        # 履歴と基本情報を並行して取得（内部的にキャッシュされる）
        hist = t.history(period="1y")["Close"]
        
        # t.info は非常に重いため、必要な最低限の情報（fast_info）を優先
        f_info = t.fast_info
        price = f_info.last_price
        prev  = f_info.previous_close or price
        
        # 名前だけは t.info から取得せざるを得ない場合があるが、まずは安全に取得
        name = ticker
        try:
            name = t.info.get("longName") or t.info.get("shortName") or ticker
        except:
            pass
            
        return {
            "name":       name,
            "ticker":     ticker,
            "price":      round(price, 2),
            "change_pct": round((price - prev) / prev * 100, 2) if prev else 0,
            "history":    hist,
        }
    except Exception as e:
        print(f"Error fetching stock info for {ticker}: {e}")
        return None

@st.cache_data(ttl=1200)
def search_stock(query: str):
    """
    企業名（日本語・英語）・ティッカー・証券コードどれでも検索できる。
    """
    query = query.strip()
    if not query:
        return None

    # 1. 日本語辞書で部分一致（最速）
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

    # 4. yfinance Search API
    try:
        search_results = yf.Search(query, max_results=5)
        quotes = search_results.quotes
        if quotes:
            best_ticker = quotes[0].get("symbol")
            if best_ticker:
                result = get_stock_info(best_ticker)
                if result:
                    result["search_candidates"] = [
                        {"name": q.get("longname") or q.get("shortname", ""), "ticker": q.get("symbol", "")}
                        for q in quotes[:3]
                    ]
                    return result
    except Exception:
        pass

    return None
