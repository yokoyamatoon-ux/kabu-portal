import os
import sys
import time
import json
from requests_oauthlib import OAuth1Session

# プロジェクトのルートディレクトリをパスに追加
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(ROOT_DIR)

from modules.sns_config import get_env_robust, log_post_to_history

# WindowsでのUnicode出力エラー対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# API認証情報の取得
CK = get_env_robust("KABU_X_CONSUMER_KEY")
CS = get_env_robust("KABU_X_CONSUMER_SECRET")
AT = get_env_robust("KABU_X_ACCESS_TOKEN")
ATS = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

if not all([CK, CS, AT, ATS]):
    print("❌ APIキーが環境変数に見つかりません。")
    print(f"CK: {'OK' if CK else 'Missing'}")
    print(f"CS: {'OK' if CS else 'Missing'}")
    print(f"AT: {'OK' if AT else 'Missing'}")
    print(f"ATS: {'OK' if ATS else 'Missing'}")
    sys.exit(1)

oauth = OAuth1Session(CK, CS, AT, ATS)

def upload_media(file_path):
    url = "https://upload.twitter.com/1.1/media/upload.json"
    print(f"📤 画像をアップロード中: {file_path}")
    try:
        with open(file_path, 'rb') as f:
            files = {"media": f}
            res = oauth.post(url, files=files)
        if res.status_code != 200:
            print(f"❌ 画像アップロード失敗 ({res.status_code}): {res.text}")
            return None
        return res.json()["media_id_string"]
    except Exception as e:
        print(f"⚠️ アップロード中に例外発生: {e}")
        return None

def post_tweet(text, media_ids=None, reply_to=None):
    url = "https://api.twitter.com/2/tweets"
    payload = {"text": text}
    if media_ids:
        payload["media"] = {"media_ids": media_ids}
    if reply_to:
        payload["reply"] = {"in_reply_to_tweet_id": reply_to}
    
    try:
        res = oauth.post(url, json=payload)
        if res.status_code not in [200, 201]:
            print(f"❌ ツイート失敗 ({res.status_code}): {res.text}")
            return None
        return res.json()["data"]["id"]
    except Exception as e:
        print(f"⚠️ 投稿中に例外発生: {e}")
        return None

# --- メイン処理 ---
IMAGE_PATH = r"D:\Antigravity\Kabu\manga\manabu\20260507\20260507_manabu_01.png"

parent_text = """米国株、1株から買えるって知っとるかの？🇺🇸

NVIDIAやAppleといった世界最強企業のオーナーに、実は数千円からなれるんじゃ！

マネ太くんと一緒に、米国株デビューの基本をマンガで学ぶぞい。フォッフォッフォ！

#米国株 #投資初心者 #新NISA"""

reply_text = """続きはこちらからチェックじゃ！👇

【マンガ第7話：米国株デビュー！1株から世界投資】
https://okane-no-manabi.jp/manga/7/

#お金の学び場"""

print("🚀 Xへの投稿を開始します...")

media_id = upload_media(IMAGE_PATH)
if media_id:
    print(f"✅ メディアアップロード成功: {media_id}")
    
    parent_id = post_tweet(parent_text, media_ids=[media_id])
    if parent_id:
        print(f"✅ 親ツイート投稿成功: {parent_id}")
        
        print("⏳ 待機中 (3秒)...")
        time.sleep(3)
        
        reply_id = post_tweet(reply_text, reply_to=parent_id)
        if reply_id:
            print(f"✅ リプライ投稿成功: {reply_id}")
            log_post_to_history("manga", parent_text, IMAGE_PATH, "success", parent_id)
            print("\n✨ すべての投稿が完了しました！")
        else:
            print("❌ リプライの投稿に失敗しました。")
    else:
        print("❌ 親ツイートの投稿に失敗しました。")
else:
    print("❌ 画像のアップロードに失敗したため中断します。")
