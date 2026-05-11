import os
import winreg
from requests_oauthlib import OAuth1Session

# --- Configuration ---
IMAGE_DIR = r"D:\Antigravity\Kabu\image\manga"
IMAGES = ["Manga01.jpg", "Manga02.jpg", "Manga03.jpg", "manga04.jpg"]

# Shortened to fit 140 chars limit for Japanese
MAIN_TEXT = """会社の「オーナーの一部」になるってどういうこと？📖✨

投資の基本をマンガで楽しく学べるようになりました！キャラたちの掛け合いで分かりやすく解説する「深掘り講座」も新設。

初心者のマネ太と一緒に、カブ先生からお金の極意を教わろう！🌱

#新NISA #投資初心者 #お金の勉強"""

REPLY_TEXT = """ちなみにマンガの続きやコラムは、プロフィールのURLにまとめてあるぞ！🔗

毎日更新中じゃ！ほっほっほ👴🌸"""

def get_reg_env(name):
    try:
        key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Environment')
        value, _ = winreg.QueryValueEx(key, name)
        winreg.CloseKey(key)
        return value
    except WindowsError:
        return None

def post_manga_promo():
    # Fetch from registry (specific to Kabu project)
    consumer_key = get_reg_env("KABU_X_CONSUMER_KEY")
    consumer_secret = get_reg_env("KABU_X_CONSUMER_SECRET")
    access_token = get_reg_env("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_reg_env("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("Error: Missing KABU_X credentials in Registry Environment.")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 1. Upload Images
    media_ids = []
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    
    for img_name in IMAGES:
        img_path = os.path.join(IMAGE_DIR, img_name)
        if not os.path.exists(img_path):
            print(f"Skipping {img_name}: Path not found.")
            continue
            
        print(f"Uploading {img_name}...")
        try:
            with open(img_path, 'rb') as f:
                files = {'media': f}
                res = oauth.post(upload_url, files=files)
                if res.status_code == 200:
                    m_id = res.json()['media_id_string']
                    media_ids.append(m_id)
                    print(f"Success: {m_id}")
                else:
                    print(f"Failed to upload {img_name}: {res.status_code}")
                    print(res.text)
        except Exception as e:
            print(f"Error reading file {img_name}: {e}")

    if not media_ids:
        print("No images were uploaded. Aborting.")
        return

    # 2. Main Tweet
    tweet_url = "https://api.twitter.com/2/tweets"
    main_payload = {
        "text": MAIN_TEXT,
        "media": {
            "media_ids": media_ids[:4] # Max 4
        }
    }
    
    print("Posting main tweet...")
    res_main = oauth.post(tweet_url, json=main_payload)
    if res_main.status_code != 201:
        print(f"Main tweet failed: {res_main.status_code}")
        print(res_main.text)
        return
    
    parent_id = res_main.json()['data']['id']
    print(f"Main tweet posted! ID: {parent_id}")

    # 3. Reply Tweet (Thread)
    reply_payload = {
        "text": REPLY_TEXT,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }
    
    print("Posting reply thread...")
    res_reply = oauth.post(tweet_url, json=reply_payload)
    if res_reply.status_code == 201:
        print("Thread posted successfully!")
    else:
        print(f"Reply tweet failed: {res_reply.status_code}")
        print(res_reply.text)

if __name__ == "__main__":
    post_manga_promo()
