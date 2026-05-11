import os
from requests_oauthlib import OAuth1Session

def post_column():
    # システム環境変数からキーを読み込む
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    image_path = r"D:\Antigravity\Kabu\column\Column_20260324C.png"
    
    if not os.path.exists(image_path):
         print(f"❌ エラー: 画像が見つかりません: {image_path}")
         return

    tweet_text = """【暴落時の心の守り方】
マネ太「株が暴落してパニックっす！全部売りたいっす！」
カブ先生「待つんじゃ！嵐の中で船から飛び降りるのが一番の負けパターンじゃぞ。」
焦らず資産を守るための3ステップじゃ！
🔗 https://okane-no-manabi.jp/?col=col_007
#カブ先生 #NISA #投資"""

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
        print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 2. ツイートの投稿 (V2 API)
    tweet_url = "https://api.twitter.com/2/tweets"
    payload = {
        "text": tweet_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    tweet_response = oauth.post(tweet_url, json=payload)

    if tweet_response.status_code == 201:
        print("✅ コラムの投稿に成功しました！")
        print(tweet_response.json())
    else:
        print(f"❌ 投稿失敗: {tweet_response.status_code}")
        print(tweet_response.text)

if __name__ == "__main__":
    post_column()
