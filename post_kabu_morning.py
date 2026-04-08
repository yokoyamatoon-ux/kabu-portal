import os
import random
from requests_oauthlib import OAuth1Session

def morning_greeting():
    # システム環境変数からキーを読み込む（セキュリティ向上のため .env は不使用）
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        print("【セキュリティ警告】環境変数にキーを登録し、プロジェクト内をクリーンに保ってください。")
        return

    # 挨拶パターンのリスト
    greetings = [
        "おはようじゃ。今日も相場は生き物じゃぞ。一喜一憂せず、どっしりと構えるのじゃ。フォッフォッフォ。",
        "ふむ、朝の空気が清々しいのう。投資も心に余裕がある時にやるのが一番じゃぞ。",
        "おはよう！マネ太くんはもう起きておるかな？朝の準備が、一日の収穫を決めるのじゃ。今日もコツコツ行こうかの。",
        "フォッフォッフォ、おはよう。相場の波に乗るのもいいが、時には岸辺で波を眺めるのも修行じゃぞ。",
        "朝じゃ！健康な体と冷静な頭脳。これが投資家にとって最大の資産じゃということを忘れるでないぞ。"
    ]

    tweet_text = random.choice(greetings)

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    response = oauth.post(
        "https://api.twitter.com/2/tweets",
        json={"text": tweet_text}
    )

    if response.status_code == 201:
        print(f"成功: 朝の挨拶を投稿しました [{tweet_text[:15]}...]")
    else:
        print(f"失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    morning_greeting()
