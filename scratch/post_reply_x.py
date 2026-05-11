import os
import sys
from requests_oauthlib import OAuth1Session

def get_env_robust(key):
    val = os.getenv(key)
    if val: return val
    import subprocess
    try:
        cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "User")'
        res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
        val = res.stdout.strip()
        if val: return val
    except: pass
    return None

def post_reply():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    parent_id = "2048977950079676736"
    text = "価格が下がった時こそ「たくさん買える」チャンス！📈\n一喜一憂せず、淡々と買い続けるのが長期資産形成のコツじゃ。\n\n投資の第一歩、マネ太と一緒に踏み出してみんかの？\n詳しい解説と続きはここからチェック！👇\nhttps://okane-no-manabi.jp/maneta_diary/5/"

    tweet_url = "https://api.twitter.com/2/tweets"
    res = oauth.post(tweet_url, json={
        "text": text,
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    print(res.status_code)
    print(res.text)

if __name__ == "__main__":
    post_reply()
