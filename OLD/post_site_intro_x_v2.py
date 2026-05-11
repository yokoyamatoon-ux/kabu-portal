import os
import time
import sys
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust, log_post_to_history

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def post_site_intro_thread():
    # システム環境変数から認証情報を取得
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    # 画像パスの設定
    image_paths = [
        r"D:\Antigravity\Kabu\manga\urakane\urakane01.jpg",
        r"D:\Antigravity\Kabu\manga\urakane\urakane02.jpg",
        r"D:\Antigravity\Kabu\manga\urakane\urakane03.jpg",
        r"D:\Antigravity\Kabu\manga\urakane\urakane04.jpeg"
    ]

    # 投稿文面
    parent_text = """フォッフォッフォ！お金の勉強、進んでおるかな？👵📖
投資をマンガで日本一わかりやすく教える『カブ先生のお金の学校』を紹介するぞい！

まずはこのマンガの1.5分で、世の中の『甘い罠』を知るのじゃ……。
投資初心者のマネ太くんと一緒に学ぶぞい！💪✨

#カブ先生 #投資初心者 #新NISA"""

    reply_text = """もっと続きを読みたい、基礎から学びたいという者は……
ワシの【プロフィール】を見ていくのじゃ！🎓✨

固定ツイートのリンクから、最新記事や秘密のファイルが読めるぞい。
ぜひチェックしてフォローしてほしいのじゃ！フォッフォッフォ。

サイトURL：https://www.work-smart-ai.net/
#学び #お金の学校"""

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 1. 画像のアップロード (V1.1 API)
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    media_ids = []

    for path in image_paths:
        if not os.path.exists(path):
            print(f"⚠️ 警告: 画像ファイルが見つかりません: {path}")
            continue
            
        print(f"Uploading: {os.path.basename(path)}...")
        with open(path, 'rb') as f:
            files = {'media': f}
            upload_response = oauth.post(upload_url, files=files)

        if upload_response.status_code != 200:
            print(f"❌ 画像アップロード失敗 ({path}): {upload_response.status_code}")
            print(upload_response.text)
            return

        media_id = upload_response.json()['media_id_string']
        media_ids.append(media_id)
        print(f"✅ Success! Media ID: {media_id}")

    if not media_ids:
        print("❌ エラー: アップロードされた画像がありません。")
        return

    # 2. 親ツイートの投稿 (V2 API)
    tweet_url = "https://api.twitter.com/2/tweets"
    parent_payload = {
        "text": parent_text,
        "media": {
            "media_ids": media_ids
        }
    }

    print("Posting parent tweet...")
    parent_response = oauth.post(tweet_url, json=parent_payload)

    if parent_response.status_code != 201:
        print(f"❌ 親ツイート失敗: {parent_response.status_code}")
        print(parent_response.text)
        return

    parent_data = parent_response.json()
    parent_id = parent_data['data']['id']
    print(f"✅ 親ツイート成功! ID: {parent_id}")

    # 履歴に記録
    log_post_to_history("site_intro_parent", parent_text, ",".join(image_paths), "success", parent_id)

    # 3. 少し待機
    print("3秒待機中...")
    time.sleep(3)

    # 4. 返信（スレッド）の投稿 (V2 API)
    reply_payload = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }

    print("Posting reply thread...")
    reply_response = oauth.post(tweet_url, json=reply_payload)

    if reply_response.status_code == 201:
        reply_id = reply_response.json()['data']['id']
        print("✅ スレッドの投稿に成功しました！")
        log_post_to_history("site_intro_reply", reply_text, None, "success", reply_id)
    else:
        print(f"❌ 返信失敗: {reply_response.status_code}")
        print(reply_response.text)

if __name__ == "__main__":
    post_site_intro_thread()
