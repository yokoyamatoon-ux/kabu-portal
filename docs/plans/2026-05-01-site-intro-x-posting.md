# Site Introduction X Posting Implementation Plan (Revised)

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Post a site introduction for "Okane no Manabiba" on X (Twitter) using the Kabu-sensei persona and 4 existing images.

**Architecture:** Create a self-contained script `scripts/post_site_intro_20260501.py` based on the latest successful posting scripts (like `post_x_urakane_ep10.py`). This script will handle OAuth1.0a authentication, image upload, and thread posting (parent + reply).

**Tech Stack:** Python, requests-oauthlib, X API v2, Windows Environment Variables (`KABU_X_*`).

---

### Task 1: Image Verification

**Step 1: Check absolute paths of the 4 images**

Run:
```powershell
ls "d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_01.png"
ls "d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_02.png"
ls "d:\Antigravity\Kabu\image\column\Column20260430.png"
ls "d:\Antigravity\Kabu\image\Top01.jpg"
```
Expected: All files exist.

### Task 2: Create Custom Posting Script

**Files:**
- Create: `scripts/post_site_intro_20260501.py`

**Step 1: Implement the script**
Copy the robust environment variable logic and posting logic from `scripts/post_x_urakane_ep10.py`.

```python
import os
import time
import sys
from requests_oauthlib import OAuth1Session

# Windows standard output encoding
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

def post_site_intro():
    # Credentials
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ Error: Credentials (KABU_X_*) not found.")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # Images
    img_paths = [
        r"d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_01.png",
        r"d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_02.png",
        r"d:\Antigravity\Kabu\image\column\Column20260430.png",
        r"d:\Antigravity\Kabu\image\Top01.jpg"
    ]

    # Parent Tweet (Announcement & Updates)
    text1 = """フォッフォッフォ！わしの「お金の学校」をプチ更新したぞい！🥬✨

✅PC版：ワイド画面でもスッキリ🖥️
✅スマホ版：最新相場がパッと見やすく📱
✅最新記事：話題の「酒蔵投資詐欺」警告＆日経平均6万突破の解説を追加じゃ！

もっと楽しく投資を学べるぞい！🎓"""

    # Reply Tweet (URL)
    text2 = """▼新しくなった「お金の学び場」はこちら！
https://okane-no-manabi.jp/

日本一ポップに、マンガと図解で投資のキホンを教えるぞい。
ぜひチェックしてフォローもよろしくのう！👴✨
#NISA #投資初心者 #カブ先生"""

    # --- Upload Media ---
    media_ids = []
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    
    for img_path in img_paths:
        if not os.path.exists(img_path):
            print(f"❌ Image not found: {img_path}")
            continue
            
        print(f"Uploading: {img_path}")
        with open(img_path, 'rb') as f:
            files = {'media': f}
            res = oauth.post(upload_url, files=files)
            if res.status_code == 200:
                m_id = res.json()['media_id_string']
                media_ids.append(m_id)
                print(f"✅ Uploaded: {m_id}")
            else:
                print(f"❌ Upload failed: {res.text}")
                return

    # --- Post (v2 API) ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    # Post 1
    print("Sending Post 1...")
    payload1 = {"text": text1}
    if media_ids:
        payload1["media"] = {"media_ids": media_ids}
        
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ Post 1 failed: {res1.text}")
        return
    parent_id = res1.json()['data']['id']
    print(f"✅ Post 1 success: {parent_id}")
    time.sleep(3)

    # Post 2 (Thread)
    print("Sending Post 2...")
    res2 = oauth.post(tweet_url, json={
        "text": text2, 
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    if res2.status_code == 201:
        print("✅ Thread posting complete!")
        print(f"🔗 URL: https://x.com/user/status/{parent_id}")
        
        # Log to history
        log_to_history(text1, text2, img_paths, parent_id)
    else:
        print(f"❌ Post 2 failed: {res2.text}")

def log_to_history(text1, text2, img_paths, tweet_id):
    import json
    from datetime import datetime
    history_file = r"d:\Antigravity\Kabu\data\sns_post_history.json"
    new_entry = {
        "timestamp": datetime.now().isoformat(),
        "category": "site_intro_renewal",
        "text": text1,
        "media_path": ",".join(img_paths),
        "status": "success",
        "tweet_id": tweet_id
    }
    reply_entry = {
        "timestamp": datetime.now().isoformat(),
        "category": "site_intro_renewal_reply",
        "text": text2,
        "media_path": None,
        "status": "success",
        "tweet_id": "reply_to_" + tweet_id
    }
    
    try:
        with open(history_file, 'r', encoding='utf-8') as f:
            history = json.load(f)
        history.append(new_entry)
        history.append(reply_entry)
        with open(history_file, 'w', encoding='utf-8') as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
        print("✅ Logged to history.")
    except Exception as e:
        print(f"⚠️ Failed to log history: {e}")

if __name__ == "__main__":
    post_site_intro()
```

### Task 3: Execution & Verification

**Step 1: Run the script**

Run: `python scripts/post_site_intro_20260501.py`
Expected: `✅ Thread posting complete!`

**Step 2: Verify history**

Check: `data/sns_post_history.json`
Expected: Latest entries match the posts.

**Step 3: Commit**

```bash
git add docs/plans/2026-05-01-site-intro-x-design.md docs/plans/2026-05-01-site-intro-x-posting.md scripts/post_site_intro_20260501.py
git commit -m "feat: post site introduction renewal thread to X"
```
