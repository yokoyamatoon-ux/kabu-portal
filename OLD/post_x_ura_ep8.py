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

def post_ura_ep8():
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
    img1 = r"d:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260423_01.png"
    img2 = r"d:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260423_02.png"

    # ポスト1: フック (画像1)
    text1 = """大手外資系生保で『31億円』もの金銭詐取事件が発覚……！？

社員100人以上が関与し、30年以上も続いていたという。
なぜ「エリート」たちが、禁断の果実に手を染めてしまったのか？
その闇を暴くぜ。

#保険詐欺 #ウラ金さん #企業不祥事"""

    # ポスト2: 仕組み解説 (画像2)
    text2 = """手口は「特別な投資話」。
実在する会議室に呼び出し、会社の名義ではなく「個人名義」の口座に振り込ませる。
完全歩合制のプレッシャーが、エリートを詐欺師に変貌させたのさ。

（皆さんは、営業マンから「ここだけの話」を持ちかけられたことはあるかい？👀💬）"""

    # ポスト3: 外部リンク
    text3 = """「エリート」の肩書きは、時として人を騙す最高の凶器になる。

身を守るための鉄壁チェックリスト、全編解説はカブ先生の授業でチェックしてくれ。

▼お金の裏事情ファイル 第8話
https://okane-no-manabi.jp/money_secret/8/"""

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
    post_ura_ep8()
