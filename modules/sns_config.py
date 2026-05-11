import os
import sys
import json
import subprocess
from datetime import datetime

# WindowsでのUnicode出力エラー対策 (cp932対策)
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# プロジェクトのルートディレクトリを取得（modulesフォルダの親）
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(ROOT_DIR, "data")
HISTORY_FILE = os.path.join(DATA_DIR, "sns_post_history.json")

def get_env_robust(key):
    """
    Windowsの環境変数を確実に取得する
    """
    val = os.getenv(key)
    if val:
        return val
    try:
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'User')"],
            capture_output=True, text=True, check=True
        )
        val = result.stdout.strip()
        if val:
            return val
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'Machine')"],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except Exception:
        return None

def count_twitter_points(text):
    """
    Twitterの文字数カウント（全角2, 半角1）
    """
    points = 0
    for char in text:
        # 簡易的な全角判定
        if ord(char) > 127:
            points += 2
        else:
            points += 1
    return points

def log_post_to_history(category, text, media_path=None, status="success", tweet_id=None):
    """
    投稿履歴を記録する
    """
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        
    new_entry = {
        "timestamp": datetime.now().isoformat(),
        "category": category,
        "text": text,
        "media_path": media_path,
        "status": status,
        "tweet_id": tweet_id
    }
    
    try:
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
        else:
            history = []
            
        history.append(new_entry)
        
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
            
        print(f"📗 履歴に記録しました (カテゴリ: {category})")
    except Exception as e:
        print(f"⚠️ 履歴の記録に失敗しました: {e}")

# カブ先生の共通定義
PERSONA = {
    "name": "カブ先生",
    "voice_traits": ["フォッフォッフォ", "～ぞい", "～じゃ"],
    "catchphrase": "難しい投資を日本一ポップに教える先生"
}
