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

def post_manga_ep21_thread():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報が見つかりません。環境変数を確認してください。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    image_path1 = os.path.join("image", "manga", "urakane", "urakane20260626_01.png")
    image_path2 = os.path.join("image", "manga", "urakane", "urakane20260626_02.png")

    if not os.path.exists(image_path1) or not os.path.exists(image_path2):
        print(f"❌ エラー: 画像ファイルが見つかりません。 {image_path1} または {image_path2}")
        return

    # --- 1. 画像1のアップロード ---
    print("画像1をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path1, 'rb') as f:
        files = {'media': f}
        res_upload1 = oauth.post(upload_url, files=files)

    if res_upload1.status_code != 200:
        print(f"❌ 画像1アップロード失敗: {res_upload1.status_code}")
        print(res_upload1.text)
        return

    media_id1 = res_upload1.json()['media_id_string']
    print(f"✅ 画像1アップロード成功! ID: {media_id1}")

    # --- 2. 画像2のアップロード ---
    print("画像2をアップロード中...")
    with open(image_path2, 'rb') as f:
        files = {'media': f}
        res_upload2 = oauth.post(upload_url, files=files)

    if res_upload2.status_code != 200:
        print(f"❌ 画像2アップロード失敗: {res_upload2.status_code}")
        print(res_upload2.text)
        return

    media_id2 = res_upload2.json()['media_id_string']
    print(f"✅ 画像2アップロード成功! ID: {media_id2}")

    # --- 3. 親ツイート投稿 (V2 API) ---
    parent_text = """日本の医療費パンクは老人や外国人のせい！？ネットの対立煽りにそそのかされておるマネ太に、カブ先生の「喝」が炸裂じゃ！
特定の誰かを叩いても財布にお金は増えん。感情を捨てて、本当の「医療費構造と負担増の現実」を見るのじゃぞい！続きは画像2枚目、解説はリプ欄へ！👇"""

    print("親ポストを送信中...")
    tweet_url = "https://api.twitter.com/2/tweets"
    payload1 = {
        "text": parent_text,
        "media": {
            "media_ids": [media_id1]
        }
    }
    
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ 親ポスト送信失敗: {res1.text}")
        return
        
    parent_id = res1.json()['data']['id']
    print(f"✅ 親ポスト送信成功! Tweet ID: {parent_id}")
    time.sleep(3)

    # --- 4. 返信（スレッド）ツイート投稿 (V2 API) ---
    reply_text = """国保の外国人医療費はわずか1.39%など、冷酷なデータをウラ金さんが不敵に暴く！
デマで誰かを叩いている裏で、2026年8月から「高額療養費の上限」が静かに引き上げられる実質的な負担増が迫っておるのじゃ。感情を捨てて、資産防衛 of 盾（投資）を愚直に作るのじゃぞ！👇
https://okane-no-manabi.jp/money_secret/21/"""

    print("返信ポストを送信中...")
    payload2 = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        },
        "media": {
            "media_ids": [media_id2]
        }
    }
    
    res2 = oauth.post(tweet_url, json=payload2)
    if res2.status_code != 201:
        print(f"❌ 返信ポスト送信失敗: {res2.text}")
        return

    print("✅ 返信ポスト送信成功!")
    print(f"\n🎉 スレッド投稿が完了しました！")
    print(f"URL: https://x.com/TooNScriptStore/status/{parent_id}")

if __name__ == "__main__":
    post_manga_ep21_thread()
