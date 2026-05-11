import os
from requests_oauthlib import OAuth1Session

def post_to_x():
    # 1. サーバー/OSの環境変数からキーを読み込む
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    image_path = r"D:\Antigravity\Kabu\manga\maneta\04\maneta20260422_01.png"
    tweet_text = """【🆕マネ太の投資日記 第4話】
「迷ったら『地球』を丸ごと買え！？」

新NISA、米国株か日本株か迷ってない？
カブ先生が授けた究極の1本「オルカン」とは…🌍

マンガでサクッと解説👇"""

    # --- 画像アップロード (V1.1 APIを使用) ---
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

    # --- 1件目：親ツイートの投稿 ---
    tweet_url = "https://api.twitter.com/2/tweets"
    parent_payload = {
        "text": tweet_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    parent_response = oauth.post(tweet_url, json=parent_payload)

    if parent_response.status_code == 201:
        parent_id = parent_response.json()['data']['id']
        print(f"✅ 親ツイート投稿成功！ ID: {parent_id}")
        
        # --- 2件目：リプライ（スレッド）投稿 ---
        reply_payload = {
            "text": "▼マンガの続きと解説はプロフィールのリンクから！✨\n👉 プロフィール画面のURLをチェック！",
            "reply": {
                "in_reply_to_tweet_id": parent_id
            }
        }
        reply_response = oauth.post(tweet_url, json=reply_payload)
        
        if reply_response.status_code == 201:
            print("✅ リプライ投稿成功！スレッドが完成しました。")
        else:
            print(f"❌ リプライ投稿失敗: {reply_response.status_code}")
            print(reply_response.text)
    else:
        print(f"❌ 親ツイート投稿失敗: {parent_response.status_code}")
        print(parent_response.text)

if __name__ == "__main__":
    post_to_x()
