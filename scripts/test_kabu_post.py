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

def test_post():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（KABU_X_...）が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # ポスト1: テスト投稿
    text1 = """フォッフォッフォ！自動運用システムのテスト稼働中じゃ。
無事に声が届いておるかの？⚙️🤖

（※これはシステム連携のテストじゃから、気にせずスルーしてくれい！）
#テスト投稿"""

    # --- 投稿処理 ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    print("ポスト送信中...")
    payload1 = {"text": text1}
        
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code == 201:
        parent_id = res1.json()['data']['id']
        print(f"✅ テスト投稿成功: {parent_id}")
        print(f"URL: https://x.com/TooNScriptStore/status/{parent_id}")
    else:
        print(f"❌ 投稿失敗: {res1.status_code}")
        print(res1.text)

if __name__ == "__main__":
    test_post()
