import os
import time
import sys
from requests_oauthlib import OAuth1Session

# Windows encoding support
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

def post_sidehustle_darkness_thread():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ Error: credentials not found in env variables.")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    img_path1 = os.path.join("image", "manga", "urakane", "urakane20260624_01.png")
    img_path2 = os.path.join("image", "manga", "urakane", "urakane20260624_02.png")

    if not os.path.exists(img_path1) or not os.path.exists(img_path2):
        print("❌ Error: Manga PNG files do not exist.")
        return

    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    media_ids = []

    # Upload Image 1
    print("Uploading manga page 1...")
    with open(img_path1, 'rb') as f:
        upload_response1 = oauth.post(upload_url, files={'media': f})
    if upload_response1.status_code == 200:
        media_id1 = upload_response1.json()['media_id_string']
        media_ids.append(media_id1)
        print(f"✅ Page 1 uploaded. ID: {media_id1}")
    else:
        print(f"❌ Page 1 upload failed: {upload_response1.text}")
        return

    # Upload Image 2
    print("Uploading manga page 2...")
    with open(img_path2, 'rb') as f:
        upload_response2 = oauth.post(upload_url, files={'media': f})
    if upload_response2.status_code == 200:
        media_id2 = upload_response2.json()['media_id_string']
        media_ids.append(media_id2)
        print(f"✅ Page 2 uploaded. ID: {media_id2}")
    else:
        print(f"❌ Page 2 upload failed: {upload_response2.text}")
        return

    # Parent Tweet
    parent_text = """フォッフォッフォ！最近「スマホ1台で月50万簡単」や「案件優先紹介」といった甘い誘惑で、高額スクールやコミュニティに契約させる副業トラブルが多発しておるのう。
しかし実態は時給300円以下の奴隷労働！さらに確定申告漏れの税金地獄が待っておるぞ！喝！！👇"""

    print("Sending parent tweet...")
    tweet_url = "https://api.twitter.com/2/tweets"
    payload1 = {
        "text": parent_text,
        "media": {
            "media_ids": media_ids
        }
    }
    
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ Parent tweet failed: {res1.text}")
        return
        
    parent_id = res1.json()['data']['id']
    print(f"✅ Parent tweet sent! ID: {parent_id}")
    time.sleep(3)

    # Reply Tweet
    reply_text = """仕事がもらえるはずが、実際はリテイク地獄と分割ローンだけが残る二重搾取の罠……。
さらに副業収入を「無申告」で放置すると、重加算税の地獄を見るぞい！
副業のダンピングの現実と、20万円ルールの罠についてマンガの続きで詳しく解説しておるのじゃ！👇
https://okane-no-manabi.jp/money_secret/20/"""

    print("Sending reply tweet...")
    payload2 = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }
    
    res2 = oauth.post(tweet_url, json=payload2)
    if res2.status_code != 201:
        print(f"❌ Reply tweet failed: {res2.text}")
        return

    print("✅ Thread reply tweet sent successfully!")
    print(f"\n🎉 X post thread completed! URL: https://x.com/TooNScriptStore/status/{parent_id}")

if __name__ == "__main__":
    post_sidehustle_darkness_thread()
