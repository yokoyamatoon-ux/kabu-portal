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

def post_col_036_thread():
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

    image_path = os.path.join("image", "column", "Column20260625.png")
    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像ファイルが見つかりません: {image_path}")
        return

    # --- 1. 画像アップロード (V1.1 API) ---
    print("画像をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        files = {'media': f}
        upload_response = oauth.post(upload_url, files=files)

    if upload_response.status_code != 200:
        print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # --- 2. 親ツイート投稿 (V2 API) ---
    # 文字数制限（全角140文字=280pt以内）
    parent_text = """フォッフォッフォ！「忙しくてチャートを見る時間がない…」という初心者必見じゃ！

AIが全自動で資産運用してくれる「ロボアド」の3大アプリ（ウェルスナビ、THEO、ROBOPRO）の特徴と手数料1%の妥当性を比較解説したぞい！

自分の時間と感情を天秤にかけるのじゃ！👇"""

    print("親ポストを送信中...")
    tweet_url = "https://api.twitter.com/2/tweets"
    payload1 = {
        "text": parent_text,
        "media": {
            "media_ids": [media_id]
        }
    }
    
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ 親ポスト送信失敗: {res1.text}")
        return
        
    parent_id = res1.json()['data']['id']
    print(f"✅ 親ポスト送信成功! Tweet ID: {parent_id}")
    time.sleep(3)

    # --- 3. 返信（スレッド）ツイート投稿 (V2 API) ---
    reply_text = """手軽さとNISA重視なら「ウェルスナビ」
パーソナライズの「THEO」
AI予測で攻める「ROBOPRO」がおすすめじゃぞい！

手数料1.1%は、リバランスや暴落時の不安に惑わされないための「手間賃」じゃのう。
詳しくはこちら！👇
https://okane-no-manabi.jp/column/col_036/"""

    print("返信ポストを送信中...")
    payload2 = {
        "text": reply_text,
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }

    res2 = oauth.post(tweet_url, json=payload2)
    if res2.status_code != 201:
        print(f"❌ 返信ポスト送信失敗: {res2.text}")
        return

    print("✅ 返信ポスト送信成功!")
    print("🎉 スレッド全体の投稿が完了しました！")

if __name__ == "__main__":
    post_col_036_thread()
