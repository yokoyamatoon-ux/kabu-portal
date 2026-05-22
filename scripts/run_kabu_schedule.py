import os
import json
import time
import random
import sys
from datetime import datetime, timedelta
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

SCHEDULE_FILE = os.path.join(os.path.dirname(__file__), "kabu_week1_schedule.json")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "kabu_post_history.json")

def post_to_x_v2(oauth, text, image_path=None, reply_to_id=None):
    """
    X API v2 を使用して投稿（画像対応）
    """
    payload = {"text": text}
    
    # 1. 画像がある場合はアップロード (v1.1)
    if image_path and os.path.exists(image_path):
        upload_url = "https://upload.twitter.com/1.1/media/upload.json"
        with open(image_path, 'rb') as f:
            files = {'media': f}
            upload_response = oauth.post(upload_url, files=files)
        
        if upload_response.status_code == 200:
            media_id = upload_response.json()['media_id_string']
            payload["media"] = {"media_ids": [media_id]}
        else:
            print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
            return None

    # 2. 返信の設定
    if reply_to_id:
        payload["reply"] = {"in_reply_to_tweet_id": reply_to_id}

    # 3. 投稿 (v2)
    tweet_url = "https://api.twitter.com/2/tweets"
    response = oauth.post(tweet_url, json=payload)

    if response.status_code == 201:
        return response.json()['data']['id']
    else:
        print(f"❌ 投稿失敗: {response.status_code}")
        print(response.text)
        return None

def run_schedule():
    print(f"--- カブ先生 X スケジューラ (リカバリー機能付) ---")
    today = datetime.now().strftime("%Y-%m-%d")
    
    # 1. 履歴の確認
    history = {}
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
    
    if today in history:
        print(f"✅ {today} の投稿は既に完了しています。")
        return

    # 2. スケジュールの読み込み
    if not os.path.exists(SCHEDULE_FILE):
        print(f"❌ スケジュールファイルが見つかりません: {SCHEDULE_FILE}")
        return

    with open(SCHEDULE_FILE, "r", encoding="utf-8") as f:
        schedule = json.load(f)

    # 今日の投稿データを探す
    target = next((item for item in schedule if item["date"] == today), None)
    if not target:
        print(f"ℹ️ {today} のスケジュールはありません。")
        return

    print(f"📅 今日のテーマ: {target['topic']}")

    # 3. 投稿時刻の判定
    now = datetime.now()
    target_time = now.replace(hour=19, minute=0, second=0, microsecond=0)
    
    if now < target_time:
        # 19時前なら待機
        jitter = random.randint(-900, 900) # ±15分の揺らぎ
        actual_target_time = target_time + timedelta(seconds=jitter)
        print(f"⏰ ターゲット時刻は 19:00 です（揺らぎ調整後: {actual_target_time.strftime('%H:%M:%S')}）。")
        print("💤 指定時刻まで待機します。PCがスリープした場合でも、復帰時に時刻を再確認します...")
        
        # PCスリープ時の時間ズレを防ぐため、1分ごとに現在時刻をチェックする
        while datetime.now() < actual_target_time:
            time.sleep(60)
            
        print(f"🚀 目標時刻（{actual_target_time.strftime('%H:%M:%S')}）に到達しました。投稿を開始します。")
    else:
        # 19時を過ぎていたら即実行（リカバリー）
        print(f"🚀 ターゲット時刻（19:00）を過ぎているため、即座に投稿を開始します。")

    # 4. 投稿の実行
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    last_id = None
    for i, post_text in enumerate(target["posts"]):
        img = target.get("image") if i == 0 else None # 1枚目のみ画像あり
        last_id = post_to_x_v2(oauth, post_text, img, last_id)
        if not last_id:
            print("❌ 投稿プロセスが中断されました。")
            return
        print(f"✅ ポスト {i+1} 成功")
        if i < len(target["posts"]) - 1:
            time.sleep(3)

    # 5. 履歴に記録
    history[today] = {
        "topic": target["topic"],
        "status": "success",
        "timestamp": datetime.now().isoformat()
    }
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎉 {today} のスレッド投稿が完了しました！")

if __name__ == "__main__":
    run_schedule()
