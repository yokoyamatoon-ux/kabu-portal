import os
import json
import yfinance as yf
from datetime import datetime
import pytz

def fetch_data(ticker_symbol, label_name):
    try:
        # Fetch 1 month of historical data to ensure we have 20 trading days
        ticker = yf.Ticker(ticker_symbol)
        df = ticker.history(period="1mo")
        
        if df.empty:
            print(f"Warning: No data found for {ticker_symbol}")
            return None
            
        # Get the last 20 closing prices
        closes = df['Close'].tail(20).tolist()
        
        # Current price and previous close
        current_price = closes[-1]
        prev_price = closes[-2] if len(closes) > 1 else current_price
        
        # Calculate percentage change
        change_pct = ((current_price - prev_price) / prev_price) * 100
        
        return {
            "label": label_name,
            "price": f"{current_price:.2f}",
            "change": f"{change_pct:.2f}",
            "history": [round(c, 2) for c in closes]
        }
    except Exception as e:
        print(f"Error fetching {ticker_symbol}: {e}")
        return None

def main():
    print("Fetching latest market data...")
    
    # Define targets
    targets = [
        ("^N225", "日経平均 🇯🇵"),
        ("^GSPC", "S&P500 🇺🇸"),
        ("JPY=X", "ドル円 💴")
    ]
    
    results = []
    
    for symbol, label in targets:
        data = fetch_data(symbol, label)
        if data:
            results.append(data)
            print(f"Successfully fetched {symbol}: {data['price']}")
        else:
            # Fallback mock data if fetch fails
            print(f"Using fallback for {symbol}")
            results.append({
                "label": label,
                "price": "0.00",
                "change": "0.00",
                "history": [0] * 20
            })
            
    # Add timestamp (JST)
    jst = pytz.timezone('Asia/Tokyo')
    now = datetime.now(jst).strftime('%Y/%m/%d %H:%M')
    results.append({"timestamp": now})
    
    # Ensure data directory exists
    os.makedirs("data", exist_ok=True)
    
    # Save to data/market.json
    output_path = os.path.join("data", "market.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"Saved market data to {output_path}")

if __name__ == "__main__":
    main()
