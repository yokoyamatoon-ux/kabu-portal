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

def post_manga_fx():
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
    img_path = r"d:\Antigravity\Kabu\web-next\public\manga\manabu\20260424manabu_fx.png"

    # ポスト1: フック (マンガ画像付き)
    text1 = """将来のためにドルで稼ぎたいマネ太！
でも『円安』の今、海外旅行は高嶺の花……？🌸

為替の仕組みと、少額から始められるけどリスクもデカい『FX』のキホン。
カブ先生がレバレッジの正体を分かりやすく解説するぞ！

#投資初心者 #FX #マンガで学ぶ"""

    # ポスト2: 誘導 (スレッド)
    text2 = """FXの『レバレッジ』は魔法ではなく、一瞬で資産を失うリスクもある諸刃の剣。

まずはニュースと為替の関係を学ぶことから始めよう。
詳しい解説とマンガの続きは、プロフィールのリンクからチェックしてな！👇

（最近の円安、皆さんはどう感じてる？👀）"""

    # --- 画像アップロード ---
    print(f"アップロード中: {img_path}")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    media_id = None
    with open(img_path, 'rb') as f:
        files = {'media': f}
        res = oauth.post(upload_url, files=files)
        if res.status_code == 200:
            media_id = res.json()['media_id_string']
            print(f"✅ 画像アップロード成功: {media_id}")
        else:
            print(f"❌ 画像アップロード失敗: {res.text}")
            return

    # --- 投稿処理 ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    # 1件目
    print("ポスト1送信中...")
    res1 = oauth.post(tweet_url, json={"text": text1, "media": {"media_ids": [media_id]}})
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
    post_manga_fx()
