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

def post_ura_ep7():
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
    img1 = r"d:\Antigravity\Kabu\web-next\public\manga\urakane\urakane20260417_01.png"
    img2 = r"d:\Antigravity\Kabu\web-next\public\manga\urakane\urakane20260417_02.png"

    # --- 投稿内容 (140文字制限を厳格にチェック) ---
    
    # ポスト1: フック (画像1)
    # 文字数: 約105文字
    text1 = """大手キャリアの部長が『4億円』もの広告費を着服して逮捕…！？

なぜそんな大金が、誰にも気づかれずに動かせたのか？
大企業の看板に隠れた、恐ろしい『裏のルール』を暴くぜ。

#架空発注 #ウラ金さん #企業不祥事"""

    # ポスト2: 仕組み解説 (画像2)
    # 文字数: 約125文字
    text2 = """手口は巧妙だ。存在しない仕事の請求書をダミー会社へ送らせる『架空発注』。
部長という『権限』と『信頼』が、チェック機能を麻痺させるのさ。

投資家なら、こういう『歪み』を見抜く目を持たねぇとな。
（皆さんは、会社で不自然な経費を見かけたことはあるかい？👀💬）"""

    # ポスト3: 外部リンク
    # 文字数: 約70文字 + URL(23) = 93文字
    text3 = """大企業の『信頼』は、時として人を騙す最高のデコレーションにもなる。

全編の解説は、カブ先生の授業でチェックしてくれ。

▼お金の裏事情ファイル 第7話
https://okane-no-manabi.jp/money_secret/7/"""

    # --- 画像アップロード ---
    media_ids = []
    for img in [img1, img2]:
        print(f"アップロード中: {img}")
        upload_url = "https://upload.twitter.com/1.1/media/upload.json"
        with open(img, 'rb') as f:
            files = {'media': f}
            res = oauth.post(upload_url, files=files)
            if res.status_code == 200:
                media_ids.append(res.json()['media_id_string'])
                print(f"✅ 成功: {media_ids[-1]}")
            else:
                print(f"❌ 失敗: {res.text}")
                return

    # --- 連投処理 ---
    tweet_url = "https://api.twitter.com/2/tweets"
    
    # 1件目
    print("ポスト1送信中...")
    res1 = oauth.post(tweet_url, json={"text": text1, "media": {"media_ids": [media_ids[0]]}})
    if res1.status_code != 201:
        print(f"❌ 1失敗: {res1.text}")
        return
    parent_id = res1.json()['data']['id']
    print(f"✅ 1成功: {parent_id}")
    time.sleep(3)

    # 2件目
    print("ポスト2送信中...")
    res2 = oauth.post(tweet_url, json={
        "text": text2, 
        "media": {"media_ids": [media_ids[1]]},
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    if res2.status_code != 201:
        print(f"❌ 2失敗: {res2.text}")
        return
    reply_id = res2.json()['data']['id']
    print(f"✅ 2成功: {reply_id}")
    time.sleep(3)

    # 3件目
    print("ポスト3送信中...")
    res3 = oauth.post(tweet_url, json={
        "text": text3,
        "reply": {"in_reply_to_tweet_id": reply_id}
    })
    if res3.status_code == 201:
        print("✅ 全スレッド投稿完了！")
    else:
        print(f"❌ 3失敗: {res3.text}")

if __name__ == "__main__":
    post_ura_ep7()
