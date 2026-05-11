import os
import sys
import json
from datetime import datetime

# モジュールパスの追加
sys.path.append(os.path.join(os.path.dirname(__file__), "modules"))
from sns_config import get_env_robust, HISTORY_FILE

def check_system():
    print("="*50)
    print(f" X Posting System Diagnostics ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')})")
    print("="*50)

    # 1. Encoding check
    print(f"\n[1] Encoding Check")
    print(f"  - sys.stdout.encoding: {sys.stdout.encoding}")
    try:
        print("  - Unicode Test: ✅ 🚀 ❌ 🕶️  (Should display correctly)")
        encoding_status = "OK"
    except UnicodeEncodeError:
        encoding_status = "FAILED (Fix needed)"
    print(f"  - Status: {encoding_status}")

    # 2. Environment Variables check
    print(f"\n[2] Environment Variables Check")
    keys = [
        "KABU_X_CONSUMER_KEY",
        "KABU_X_CONSUMER_SECRET",
        "KABU_X_ACCESS_TOKEN",
        "KABU_X_ACCESS_TOKEN_SECRET"
    ]
    all_keys_found = True
    for k in keys:
        val = get_env_robust(k)
        found = "Found (Masked)" if val else "NOT FOUND"
        if not val: all_keys_found = False
        print(f"  - {k}: {found}")
    
    print(f"  - Status: {'OK' if all_keys_found else 'FAILED'}")

    # 3. Post History check
    print(f"\n[3] Post History Check")
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
            count = len(history)
            last_post = history[-1]["timestamp"] if count > 0 else "None"
            print(f"  - History file: Found")
            print(f"  - Total entries: {count}")
            print(f"  - Last entry: {last_post}")
            history_status = "OK"
        except Exception as e:
            history_status = f"ERROR ({e})"
    else:
        history_status = "NOT FOUND (Will be created on first post)"
    print(f"  - Status: {history_status}")

    print("\n" + "="*50)
    if encoding_status == "OK" and all_keys_found:
        print("  SYSTEM READY FOR POSTING")
    else:
        print("  SYSTEM HAS ISSUES")
    print("="*50)

if __name__ == "__main__":
    check_system()
