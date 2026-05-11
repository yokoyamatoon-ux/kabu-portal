import os
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv

def simple_test():
    # .envからキーを読み込む
    dotenv_path = r"d:\Antigravity\xmcp_kabu\.env"
    load_dotenv(dotenv_path)

    consumer_key = os.getenv("X_OAUTH_CONSUMER_KEY")
    consumer_secret = os.getenv("X_OAUTH_CONSUMER_SECRET")
    access_token = os.getenv("X_OAUTH_ACCESS_TOKEN")
    access_token_secret = os.getenv("X_OAUTH_ACCESS_TOKEN_SECRET")

    print(f"Testing with Key: {consumer_key[:5]}...")

    # フィルタに引っかかりにくい、ごくシンプルな英数字混じりのテスト
    tweet_text = "Test post from Kabu Sensei. System check OK. 1744"

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
        print("🎉 成功しました！ツイートが投稿されました。")
        print(response.json())
    else:
        print(f"❌ 失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    simple_test()
