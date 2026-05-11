import os
import sys
import json
import time

# プロジェクトルートをsys.pathに追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust, log_post_to_history

# WindowsでのUnicode出力エラー対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def reply_to_tweet():
    # 認証情報の取得
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ 認証情報が不足しています。環境変数を確認してください。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret
    )

    # 返信先
    target_tweet_id = "2047702677623378054"
    reply_text = "フォッフォッフォ！さくのさん(@Sakuranonay)、温かい言葉をありがとうじゃ。その志こそが、未来を切り拓く一番の武器になるぞい。円安も円高も、仕組みを知れば怖くない。一緒に少しずつ、賢い投資家を目指していこうかのう！👴✨"

    # 投稿
    url = "https://api.twitter.com/2/tweets"
    payload = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": target_tweet_id
        }
    }

    print(f"🚀 返信を投稿中... (Target ID: {target_tweet_id})")
    response = oauth.post(url, json=payload)

    if response.status_code == 201:
        tweet_data = response.json()
        new_tweet_id = tweet_data['data']['id']
        print(f"✅ 返信成功！ Tweet ID: {new_tweet_id}")
        log_post_to_history("reply", reply_text, status="success", tweet_id=new_tweet_id)
    else:
        print(f"❌ 投稿失敗: {response.status_code}")
        print(response.text)
        log_post_to_history("reply", reply_text, status=f"failed ({response.status_code})")

if __name__ == "__main__":
    reply_to_tweet()
