import os
import sys
import subprocess
import json
from requests_oauthlib import OAuth1Session

def get_env_robust(key):
    val = os.getenv(key)
    if val:
        return val
    try:
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'User')"],
            capture_output=True, text=True, check=True
        )
        val = result.stdout.strip()
        if val:
            return val
        
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'Machine')"],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except Exception:
        return None

def post_x_thread():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    ck = get_env_robust("KABU_X_CONSUMER_KEY")
    cs = get_env_robust("KABU_X_CONSUMER_SECRET")
    at = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が環境変数に見つかりません。")
        return

    # 1件目のツイート（名言）
    parent_text = """【カブ先生の投資格言】
今日は有名な投資家の言葉を紹介するぞ。

「他人が貪欲になっているときは恐ろしく思い、他人が恐れているときは貪欲になれ」

周りが熱狂している時は冷静に。逆に市場全体がパニックになっている時ほど、一息ついて落ち着くことが大切なんじゃ。
投資はメンタルが何より重要じゃな！"""

    # 2件目のツイート（サイト紹介）
    reply_text = """▼ブレない投資メンタルと基礎知識を身につけるなら、「お金の学び場」へ！
カブ先生やマネ太と一緒に、新NISAや株式投資のルールを楽しく学ぼう。
シミュレーションや初心者向けコラムも随時追加しておるぞ！

🔗 https://okane-no-manabi.jp/

#投資初心者 #新NISA #お金の勉強"""

    import time
    image_path = r"D:\Antigravity\Kabu\manga\column\Column_20260324C.png"

    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像が見つかりません: {image_path}")
        return

    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

    # 1. 画像アップロード
    print("🚀 画像をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        files = {'media': f}
        res_upload = oauth.post(upload_url, files=files)

    if res_upload.status_code != 200:
        print(f"❌ 画像アップロード失敗: {res_upload.status_code}")
        return

    media_id = res_upload.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    tweet_url = "https://api.twitter.com/2/tweets"

    # 親ツイートの投稿
    print("📝 1件目（親ツイート）を投稿中...")
    parent_payload = {
        "text": parent_text,
        "media": {
            "media_ids": [media_id]
        }
    }
    parent_res = oauth.post(tweet_url, json=parent_payload)

    if parent_res.status_code == 201:
        parent_id = parent_res.json()['data']['id']
        print(f"✅ 1件目の投稿成功！ ID: {parent_id}")
    else:
        print(f"❌ 1件目の投稿失敗: {parent_res.status_code}")
        print(parent_res.text)
        return

    print("⏳ 3秒待機中...")
    time.sleep(3)

    # リプライ（子ツイート）の投稿
    print("📝 2件目（サイト紹介）を投稿中...")
    reply_payload = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }
    reply_res = oauth.post(tweet_url, json=reply_payload)

    if reply_res.status_code == 201:
        reply_id = reply_res.json()['data']['id']
        print(f"🎉 2件目（スレッド）の投稿成功！")
        print(f"🔗 スレッドURL: https://x.com/i/status/{parent_id}")
    else:
        print(f"❌ 2件目の投稿失敗: {reply_res.status_code}")
        print(reply_res.text)

if __name__ == "__main__":
    post_x_thread()
