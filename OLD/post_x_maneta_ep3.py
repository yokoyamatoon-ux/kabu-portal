import os
import time
from requests_oauthlib import OAuth1Session

def post_maneta_ep3():
    # システム環境変数からキーを読み込む
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("ERROR: Authentication info missing.")
        return

    # 第3話 1ページの画像パス
    image_path = r"D:\Antigravity\Kabu\manga\maneta\03\maneta20260415_01.png"
    
    # 親ツイート内容
    parent_text = """【マネ太の投資日記 第3話：マネ太、初めてのパニック】

マネ太：「投資はマラソン！ボクはもう一喜一憂しないプロの投資家になるんだ！」
ミライ：「お、マネ太くん悟りを開いたね✨」

……しかし5分後！！😱
#カブ先生 #投資初心者 #NISA #マネ太の投資日記"""

    # 返信内容（スレッド）
    reply_text = """▼ パニックの続きや、カブ先生たちの呆れ顔はWebサイトでチェックじゃ！
https://okane-no-manabi.jp/?page=maneta_diary

#学び #新NISA #資産形成"""

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 1. 画像のアップロード (V1.1 API)
    print(f"画像アップロード中: {image_path}")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    try:
        with open(image_path, 'rb') as f:
            files = {'media': f}
            upload_response = oauth.post(upload_url, files=files)
    except FileNotFoundError:
        print(f"ERROR: Image file not found: {image_path}")
        return

    if upload_response.status_code != 200:
        print(f"ERROR: Upload failed: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"SUCCESS: Uploaded! Media ID: {media_id}")

    # 2. 親ツイートの投稿 (V2 API)
    tweet_url = "https://api.twitter.com/2/tweets"
    parent_payload = {
        "text": parent_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    parent_response = oauth.post(tweet_url, json=parent_payload)

    if parent_response.status_code != 201:
        print(f"ERROR: Parent tweet failed: {parent_response.status_code}")
        print(parent_response.text)
        return

    parent_data = parent_response.json()
    parent_id = parent_data['data']['id']
    print(f"SUCCESS: Parent tweet successful! Tweet ID: {parent_id}")

    # 3. 少し待機（Bot検知回避用）
    print("3秒待機中...")
    time.sleep(3)

    # 4. 返信（スレッド）の投稿 (V2 API)
    reply_payload = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }

    reply_response = oauth.post(tweet_url, json=reply_payload)

    if reply_response.status_code == 201:
        print("SUCCESS: Thread posted!")
        print(reply_response.json())
    else:
        print(f"ERROR: Reply failed: {reply_response.status_code}")
        print(reply_response.text)

if __name__ == "__main__":
    post_maneta_ep3()
