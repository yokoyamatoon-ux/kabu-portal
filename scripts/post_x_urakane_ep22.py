import os
import time
import sys
from requests_oauthlib import OAuth1Session

# プロジェクト内の共通モジュールをインポート可能にする
sys.path.append(os.path.join(os.path.dirname(__file__), "modules"))
try:
    from sns_config import log_post_to_history, count_twitter_points, get_env_robust
except ImportError:
    # 読み込めない場合の簡易フォールバック
    def log_post_to_history(*args, **kwargs): pass
    def count_twitter_points(text):
        pts = 0
        for char in text:
            if ord(char) > 127: pts += 2
            else: pts += 1
        return pts
    def get_env_robust(key): return os.getenv(key)

# Windows標準出力のエンコード対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def post_urakane_ep22_thread():
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

    image_path = os.path.join("image", "manga", "urakane", "urakane20260630_01.png")
    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像ファイルが見つかりません: {image_path}")
        return

    # --- 原稿と文字数ポイント検証 ---
    parent_text = """フォッフォッフォ！「簡単送金バイト」「口座の貸し借り」の甘い誘いに乗ろうとしている者はおらんかの？

それ、犯罪組織の資金洗浄（マネーロンダリング）の「中継ハブ」にされておるぞい！

なぜクリーンな一般口座が狙われるのか、その巧妙な仕組みを解説したぞい！👇"""

    reply_text = """知らずに送金を手伝うだけでもマネロン共犯とみなされ、お主の全口座が永久凍結・強制解約されるのじゃ。

口座凍結されると、スマホの分割購入もローンも二度とできなくなる致命的なペナルティを受けるぞい！

詳しくはこちら！👇
https://okane-no-manabi.jp/money_secret/22/"""

    p_pts = count_twitter_points(parent_text)
    r_pts = count_twitter_points(reply_text)
    print(f"📊 文字数検証 - 親ポスト: {p_pts}pts, 返信ポスト: {r_pts}pts")
    
    if p_pts > 280 or r_pts > 280:
        print("❌ エラー: いずれかのポストが文字数制限(280pts)を超えています。")
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
    
    # 履歴への記録
    full_text = f"{parent_text}\n\n[Thread Reply]\n{reply_text}"
    log_post_to_history(
        category="urakane_promo",
        text=full_text,
        media_path=image_path,
        status="success",
        tweet_id=parent_id
    )
    print("🎉 スレッド全体の投稿および履歴記録が完了しました！")

if __name__ == "__main__":
    post_urakane_ep22_thread()
