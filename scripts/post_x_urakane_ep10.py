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

def post_urakane_ep10():
    # 認証情報の取得
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報(KABU_X_*)が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 画像パス（ユーザー提供の完成原稿）
    img_dir = r"D:\Antigravity\Kabu\manga\urakane\20260501"
    img_files = ["urakane20260501_01.png", "urakane20260501_02.png"]
    img_paths = [os.path.join(img_dir, f) for f in img_files]

    # ポスト1: フック (マンガ画像2枚付き)
    text1 = """【お金のウラ事情】第10話公開！
「酒蔵投資」で年利35%！？有名酒蔵も協力！？🍶

ヒッヒッ……伝統文化をダシにカモを釣る、新たな罠の臭いがプンプンするぜ。
有名ブランドの「無断掲載」の恐怖、マンガで暴いてやったぜ！💀

#投資詐欺 #新NISA #ウラ金さん #SakeWorld"""

    # ポスト2: 誘導 (スレッド)
    text2 = """「返金されたからラッキー」じゃ済まねぇ。
一度でもデジタル財布の紐を緩めたら、次は逃げ場はねぇぞ。

怪しい高利回りを見分ける「自己防衛術」
続きはプロフィールのリンク（お金の学び場）からチェックしな！👇

（「30年で17億円」なんて皮算用、信じる奴がいるのかい？ヒッヒッ）"""

    # --- 画像アップロード ---
    media_ids = []
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    
    for img_path in img_paths:
        if not os.path.exists(img_path):
            print(f"❌ 画像が見つかりません: {img_path}")
            continue
            
        print(f"アップロード中: {img_path}")
        with open(img_path, 'rb') as f:
            files = {'media': f}
            res = oauth.post(upload_url, files=files)
            if res.status_code == 200:
                m_id = res.json()['media_id_string']
                media_ids.append(m_id)
                print(f"✅ 画像アップロード成功: {m_id}")
            else:
                print(f"❌ 画像アップロード失敗: {res.text}")
                return

    # --- 投稿処理 (v2 API) ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    # ポスト1
    print("ポスト1送信中...")
    payload1 = {"text": text1}
    if media_ids:
        payload1["media"] = {"media_ids": media_ids}
        
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ ポスト1失敗: {res1.text}")
        return
    parent_id = res1.json()['data']['id']
    print(f"✅ ポスト1成功: {parent_id}")
    time.sleep(3)

    # ポスト2 (スレッド)
    print("ポスト2送信中...")
    res2 = oauth.post(tweet_url, json={
        "text": text2, 
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    if res2.status_code == 201:
        print("✅ スレッド投稿完了！")
        print(f"🔗 投稿URL: https://x.com/user/status/{parent_id}")
    else:
        print(f"❌ ポスト2失敗: {res2.text}")

if __name__ == "__main__":
    post_urakane_ep10()
