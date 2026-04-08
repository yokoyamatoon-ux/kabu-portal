import os
from requests_oauthlib import OAuth1Session

def post_with_media():
    # システム環境変数からキーを読み込む（セキュリティ向上のため .env は不使用）
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        print("【セキュリティ警告】プロジェクト内に .env ファイルを置くのは避けてください。")
        return

    image_path = r"D:\Antigravity\Kabu\image\Ura.jpg"
    
    # 投稿内容
    tweet_text = """【新メンバー紹介：ウラ金さん🕶️】

お金の学校に、裏事情に精通した「ウラ金さん」が登場じゃ！

投資の甘い話には必ず「罠」が潜んで居るもの。
そんな世の中の闇を、ウラ金さんがバシバシ暴いてくれるぞ！

これからよろしく頼むのじゃ！フォッフォッフォ。

#カブ先生 #ウラ金さん #学び"""

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

    # 2. ツイートの投稿 (V2 API)
    tweet_url = "https://api.twitter.com/2/tweets"
    payload = {
        "text": tweet_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    response = oauth.post(tweet_url, json=payload)

    if response.status_code == 201:
        print("🎉 成功: ウラ金さんの紹介投稿が完了しました！")
        print(response.json())
    else:
        print(f"❌ 失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    post_with_media()
