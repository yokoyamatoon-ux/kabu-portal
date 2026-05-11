import os
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust, log_post_to_history, count_twitter_points

def post_to_x(text, category="General", image_path=None, media_ids=None):
    """
    X (Twitter) への汎用投稿関数
    """
    # 認証情報の取得
    ck  = get_env_robust("KABU_X_CONSUMER_KEY")
    cs  = get_env_robust("KABU_X_CONSUMER_SECRET")
    at  = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が環境変数に見つかりません。")
        return None

    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)
    
    # 画像がある場合はアップロード（media_idsが提供されていない場合のみ）
    if image_path and not media_ids:
        # 相対パスの場合は絶対パスに変換を試みる（念のため）
        if not os.path.isabs(image_path):
            from modules.sns_config import ROOT_DIR
            image_path = os.path.join(ROOT_DIR, image_path)

        if not os.path.exists(image_path):
            print(f"❌ 画像が見つかりません: {image_path}")
            return None

        print(f"🚀 画像をアップロード中: {os.path.basename(image_path)}")
        upload_url = "https://upload.twitter.com/1.1/media/upload.json"
        with open(image_path, 'rb') as f:
            res_upload = oauth.post(upload_url, files={'media': f})
        
        if res_upload.status_code == 200:
            media_id = res_upload.json()['media_id_string']
            media_ids = [media_id]
            print(f"✅ 画像アップロード成功: {media_id}")
        else:
            print(f"❌ 画像アップロード失敗: {res_upload.status_code}")
            log_post_to_history(category, text, image_path, status="failed_image_upload")
            return None

    # ツイート投稿
    payload = {"text": text}
    if media_ids:
        payload["media"] = {"media_ids": media_ids}
        
    response = oauth.post("https://api.twitter.com/2/tweets", json=payload)

    if response.status_code == 201:
        tweet_id = response.json()['data']['id']
        print(f"✅ 投稿成功! ID: {tweet_id}")
        log_post_to_history(category, text, image_path, status="success", tweet_id=tweet_id)
        return tweet_id
    else:
        print(f"❌ 投稿失敗: {response.status_code}")
        print(response.text)
        log_post_to_history(category, text, image_path, status=f"failed_{response.status_code}")
        return None

if __name__ == "__main__":
    print("このモジュールは他のスクリプトから import して使用します。")
