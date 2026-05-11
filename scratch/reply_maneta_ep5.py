import os
import time
import sys
from requests_oauthlib import OAuth1Session

# Windows標準出力のエンコード対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def get_env_robust(key):
    val = os.getenv(key)
    if val: return val
    if sys.platform == "win32":
        import subprocess
        try:
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "User")'
            res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
            val = res.stdout.strip()
            if val: return val
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "Machine")'
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

    parent_id = "2048939279670513712"
    text2 = """価格が下がった時こそ「たくさん買える」チャンス！？📈
一喜一憂せず、淡々と買い続けるのが長期投資のコツじゃ。

投資の第一歩、マネ太と一緒に踏み出してみんかの？
詳しい解説は、プロフィールのリンクからチェックしてな！👇

（皆さんは毎月いくら積み立ててる？👀）"""

    print("返信ポスト送信中...")
    tweet_url = "https://api.twitter.com/2/tweets"
    res2 = oauth.post(tweet_url, json={
        "text": text2, 
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    if res2.status_code == 201:
        print("✅ 返信投稿完了！")
    else:
        print(f"❌ 返信失敗: {res2.text}")

if __name__ == "__main__":
    post_reply()
