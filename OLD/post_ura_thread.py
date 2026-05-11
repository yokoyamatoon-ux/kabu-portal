import os
import time
import sys
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def post_thread():
    # システム環境変数からキーを読み込む
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    image_path = r"D:\Antigravity\Kabu\manga\urakane\urakane20260408.png"
    
    # 親ツイート内容
    parent_text = """【実録：ウラ金の裏事情ファイル 第5話】

マネ太：「LINEの無料投資グループ、お宝情報すぎっす！」
ウラ金：「ヒッヒッ……。その『お宝』が、お前を嵌めるための『罠』だとも知らずになあ……🕶️」

甘い誘惑の裏側を暴く！
#カブ先生 #ウラ金さん #投資詐欺注意"""

    # 返信内容
    reply_text = """▼ 記事の続きはこちらじゃ！
https://okane-no-manabi.jp/?ep=5
#投資初心者 #学び"""

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 1. 画像のアップロード (V1.1 API)
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        files = {'media': f}
        upload_response = oauth.post(upload_url, files=files)

    if upload_response.status_code != 200:
        print(f"画像アップロード失敗: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"画像アップロード成功! Media ID: {media_id}")

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
        print(f"親ツイート失敗: {parent_response.status_code}")
        print(parent_response.text)
        return

    parent_data = parent_response.json()
    parent_id = parent_data['data']['id']
    print(f"✅ 親ツイート成功! ID: {parent_id}")

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
        print("✅ スレッド（返信）の投稿に成功しました！")
        print(reply_response.json())
    else:
        print(f"❌ 返信失敗: {reply_response.status_code}")
        print(reply_response.text)

if __name__ == "__main__":
    post_thread()
