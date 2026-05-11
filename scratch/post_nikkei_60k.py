import os
import sys
import time
import requests
from requests_oauthlib import OAuth1
from modules.sns_config import get_env_robust, log_post_to_history

# Windows stdout fix
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Credentials
CONSUMER_KEY = get_env_robust("KABU_X_CONSUMER_KEY")
CONSUMER_SECRET = get_env_robust("KABU_X_CONSUMER_SECRET")
ACCESS_TOKEN = get_env_robust("KABU_X_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

if not all([CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET]):
    print("❌ Error: Missing X API credentials in environment variables.")
    sys.exit(1)

auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

def upload_media(file_path):
    url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(file_path, 'rb') as f:
        files = {'media': f}
        res = requests.post(url, auth=auth, files=files)
    if res.status_code != 200:
        print(f"❌ Media upload failed: {res.text}")
        return None
    return res.json()['media_id_string']

def post_tweet(text, media_ids=None, reply_to=None):
    url = "https://api.twitter.com/2/tweets"
    payload = {"text": text}
    if media_ids:
        payload["media"] = {"media_ids": media_ids}
    if reply_to:
        payload["reply"] = {"in_reply_to_tweet_id": reply_to}
        
    res = requests.post(url, auth=auth, json=payload)
    if res.status_code not in [200, 201]:
        print(f"❌ Tweet failed: {res.text}")
        return None
    return res.json()['data']['id']

# --- Main Flow ---
IMAGE_PATH = r"D:\Antigravity\Kabu\image\column\Column20260430.png"
ARTICLE_URL = "https://okane-no-manabi.jp/column/col_017/"

# 1. Upload Image
print("📸 Uploading image...")
media_id = upload_media(IMAGE_PATH)

if media_id:
    # 2. Post Parent Tweet
    parent_text = (
        "ついに日経平均が60,000円を突破したぞい！📈✨\n\n"
        "40年前のバブルを知る人も、新NISAから始めた若者も、歴史的な瞬間に立ち会っておるのう。\n\n"
        "フォッフォッフォ！これが『狂乱のバブル』か『新時代の幕開け』か、わしがズバッと解説するぞい！👇"
    )
    print("🐦 Posting parent tweet...")
    parent_id = post_tweet(parent_text, media_ids=[media_id])
    
    if parent_id:
        print(f"✅ Parent tweet posted: {parent_id}")
        time.sleep(3)
        
        # 3. Post Reply Tweet
        reply_text = (
            "今の日本株はバブル期より遥かに割安。日本企業の稼ぐ力は本物じゃ。\n\n"
            "でも浮かれすぎは禁物。一喜一憂せず淡々と積み立てる者が最後に笑うのじゃぞ！\n\n"
            "詳しい解説はここからチェックするのじゃ！\n"
            f"{ARTICLE_URL}"
        )
        print("💬 Posting reply tweet...")
        reply_id = post_tweet(reply_text, reply_to=parent_id)
        
        if reply_id:
            print(f"✅ Reply tweet posted: {reply_id}")
            log_post_to_history("column", parent_text, media_path=IMAGE_PATH, status="success", tweet_id=parent_id)
        else:
            print("❌ Reply tweet failed.")
    else:
        print("❌ Parent tweet failed.")
else:
    print("❌ Media upload failed. Aborting.")
