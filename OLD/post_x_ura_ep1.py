import os
import time
import sys
from requests_oauthlib import OAuth1Session

# Windows標準出力のエンコード対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def get_env_robust(key):
    # まず通常の環境変数を試す
    val = os.getenv(key)
    if val:
        return val
    
    # Windowsの場合、システム/ユーザー環境変数を直接取得しにいく
    if sys.platform == "win32":
        import subprocess
        try:
            # User環境変数を優先
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "User")'
            res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
            val = res.stdout.strip()
            if val:
                return val
            
            # Machine環境変数を試す
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "Machine")'
            res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
            val = res.stdout.strip()
            if val:
                return val
        except Exception:
            pass
    return None

def post_ura_ep1():
    # システム環境変数からキーを読み込む
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    # 正しい画像パス
    image_path = r"D:\Antigravity\Kabu\manga\urakane\urakane01.jpg"
    
    # 1. 親ツイート内容
    parent_text = """【実録：ウラ金の裏事情ファイル 第1話】

ウラ金：「ヒッヒッ……。明日上がる株を教えてやるよ。今のうちに買っとけ。」
マネ太：「えっ、本当っすか！？ラッキー！」

しかし、それは「インサイダー取引」という立派な犯罪の入り口だった……🕶️

#カブ先生 #ウラ金さん #インサイダー取引 #投資の闇"""

    # 2. 返信内容（スレッド）
    reply_text = """▼ 秘密の情報がなぜ「犯罪」になるのか？
続きはWebサイトでチェックじゃ！
https://okane-no-manabi.jp/?ep=1

#学び #投資初心者 #金融リテラシー"""

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # --- 画像アップロード (V1.1 API) ---
    print(f"画像アップロード中: {image_path}")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    try:
        with open(image_path, 'rb') as f:
            files = {'media': f}
            upload_response = oauth.post(upload_url, files=files)
    except FileNotFoundError:
        print(f"❌ エラー: 画像ファイルが見つかりません: {image_path}")
        return

    if upload_response.status_code != 200:
        print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # --- 親ツイートの投稿 (V2 API) ---
    tweet_url = "https://api.twitter.com/2/tweets"
    parent_payload = {
        "text": parent_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    print("親ツイート投稿中...")
    parent_response = oauth.post(tweet_url, json=parent_payload)

    if parent_response.status_code != 201:
        print(f"❌ 親ツイート失敗: {parent_response.status_code}")
        print(parent_response.text)
        return

    parent_id = parent_response.json()['data']['id']
    print(f"✅ 親ツイート成功! Tweet ID: {parent_id}")

    # --- 少し待機（Bot判定回避用） ---
    print("3秒待機中...")
    time.sleep(3)

    # --- 返信（スレッド）の投稿 (V2 API) ---
    reply_payload = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }

    print("返信ツイート投稿中...")
    reply_response = oauth.post(tweet_url, json=reply_payload)

    if reply_response.status_code == 201:
        print("✅ スレッド（返信）の投稿に成功しました！")
        print(f"Reply Tweet ID: {reply_response.json()['data']['id']}")
    else:
        print(f"❌ 返信失敗: {reply_response.status_code}")
        print(reply_response.text)

if __name__ == "__main__":
    post_ura_ep1()
