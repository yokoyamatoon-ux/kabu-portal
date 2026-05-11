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

def post_manga_order_types():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 画像パス
    img_paths = [
        r"d:\Antigravity\Kabu\web-next\public\manga\manabu\20260509_manabu_01.png",
        r"d:\Antigravity\Kabu\web-next\public\manga\manabu\20260509_manabu_02.png"
    ]

    # ポスト1: フック (マンガ画像付き)
    text1 = """「よしー！株を買うぞ！」と意気込むマネ太の前に立ちはだかる専門用語の壁……🧱
『成行（なりゆき）』と『指値（さしね）』、どっちを選べばいいんすか！？

初心者こそ知っておきたい、失敗しないための「注文の基本」をカブ先生が解説するぞい！✨

#投資初心者 #株 #マンガで学ぶ"""

    # ポスト2: 誘導 (スレッド)
    text2 = """スピード優先の「成行」と、じっくり狙う「指値」。
それぞれのメリット・デメリットを理解して、感情に流されない取引を身につけよう。

詳しい解説とマンガの続きは、プロフィールのリンクからチェックしてな！👇

（指値が刺さった時の快感、たまらんっすよね...🤤）"""

    # --- 画像アップロード ---
    media_ids = []
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    
    for img_path in img_paths:
        print(f"アップロード中: {img_path}")
        if not os.path.exists(img_path):
            print(f"❌ エラー: ファイルが存在しません: {img_path}")
            continue
            
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

    # --- 投稿処理 ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    # 1件目
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

    # 2件目 (スレッド)
    print("ポスト2送信中...")
    res2 = oauth.post(tweet_url, json={
        "text": text2, 
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    if res2.status_code == 201:
        print("✅ スレッド投稿完了！")
    else:
        print(f"❌ ポスト2失敗: {res2.text}")

if __name__ == "__main__":
    post_manga_order_types()
