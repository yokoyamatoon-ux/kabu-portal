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

def post_maneta_diary_ep5():
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
    img_dir = r"D:\Antigravity\Kabu\manga\maneta\05"
    img_files = ["maneta20260428_01.png", "maneta20260428_02.png"]
    img_paths = [os.path.join(img_dir, f) for f in img_files]

    # ポスト1: フック (マンガ画像付き)
    text1 = """【新着マンガ】マネ太の投資日記 第5話
「いつ買えばいい？」と悩むマネ太。
タイミングを考えなくていい魔法の方法があるんじゃ！🧙‍♂️

『積み立て投資』と『ドルコスト平均法』。
初心者こそ知るべき「ほったらかし」の極意を解説するぞい！✨

#投資初心者 #資産運用 #マンガで学ぶ"""

    # ポスト2: 誘導 (スレッド)
    text2 = """価格が下がった時こそ「たくさん買える」チャンス！？📈
一喜一憂せず、淡々と買い続けるのが長期資産形成のコツなんじゃ。

投資の第一歩、マネ太と一緒に踏み出してみんかの？
詳しい解説と続きは、プロフィールのリンクからチェックしてな！👇

（皆さんは毎月いくら積み立ててる？コメントで教えてな！👀）"""

    # --- 画像アップロード ---
    media_ids = []
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    
    for img_path in img_paths:
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
    post_maneta_diary_ep5()
