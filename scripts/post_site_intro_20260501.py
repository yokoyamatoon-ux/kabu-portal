import os
import time
import sys
import json
from datetime import datetime
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

def log_to_history(text1, text2, img_paths, tweet_id):
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
        if os.path.exists(history_file):
            with open(history_file, 'r', encoding='utf-8') as f:
                history = json.load(f)
        else:
            history = []
            
        history.append(new_entry)
        history.append(reply_entry)
        
        with open(history_file, 'w', encoding='utf-8') as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
        print("✅ 投稿履歴に記録しました。")
    except Exception as e:
        print(f"⚠️ 履歴の記録に失敗しました: {e}")

def post_site_intro():
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

    # 画像パス
    img_paths = [
        r"d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_01.png",
        r"d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_02.png",
        r"d:\Antigravity\Kabu\image\column\Column20260430.png",
        r"d:\Antigravity\Kabu\image\Top01.jpg"
    ]

    # ポスト1: アナウンス（画像4枚）
    text1 = """フォッフォッフォ！わしの「お金の学校」をプチ更新したぞい！🥬✨

✅PC版：ワイド画面でもスッキリ🖥️
✅スマホ版：最新相場がパッと見やすく📱
✅最新記事：話題の「酒蔵投資詐欺」警告＆日経平均6万突破の解説を追加じゃ！

もっと楽しく投資を学べるぞい！🎓"""

    # ポスト2: リンク（スレッド）
    text2 = """▼新しくなった「お金の学び場」はこちら！
https://okane-no-manabi.jp/

日本一ポップに、マンガと図解で投資のキホンを教えるぞい。
ぜひチェックしてフォローもよろしくのう！👴✨
#NISA #投資初心者 #カブ先生"""

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
    
    # 連続投稿によるエラー防止のため少し待機
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
        
        # 履歴に記録
        log_to_history(text1, text2, img_paths, parent_id)
    else:
        print(f"❌ ポスト2失敗: {res2.text}")

if __name__ == "__main__":
    post_site_intro()
