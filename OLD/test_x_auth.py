import os
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv

def test_auth():
    dotenv_path = r"d:\Antigravity\xmcp_kabu\.env"
    load_dotenv(dotenv_path)

    consumer_key = os.getenv("X_OAUTH_CONSUMER_KEY")
    consumer_secret = os.getenv("X_OAUTH_CONSUMER_SECRET")
    access_token = os.getenv("X_OAUTH_ACCESS_TOKEN")
    access_token_secret = os.getenv("X_OAUTH_ACCESS_TOKEN_SECRET")

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # GET /2/users/me（読み取り権限のみでOK）
    response = oauth.get("https://api.twitter.com/2/users/me")

    if response.status_code == 200:
        print("GET成功! 認証は通っています。")
        print(response.json())
    else:
        print(f"GET失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_auth()
