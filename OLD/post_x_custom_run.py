import os
import sys
import time
from requests_oauthlib import OAuth1Session

sys.path.append(os.path.join(os.path.dirname(__file__), "modules"))
from sns_config import get_env_robust

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def post_custom():
    ck = get_env_robust("KABU_X_CONSUMER_KEY")
    cs = get_env_robust("KABU_X_CONSUMER_SECRET")
    at = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が見つかりません。")
        return

    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

    image_path = r"D:\Antigravity\Kabu\manga\column\Column20260416.png"

    parent_text = """【ビットコインは「資産」か？】

マネ太「史上最高値！これバブル？」
カブ先生「ETF承認でプロも買う『デジタル・ゴールド』になったんじゃ。3〜5%のスパイス保有が賢いぞ。」

半減期後の新常識を解説！

#カブ先生 #ビットコイン #仮想通貨 #NISA"""

    reply_text = """▼ 全編の詳しい解説は、わしのプロフィールにあるリンクから読めるぞい！🎓✨
「お金の学校」で待っておるからな！フォッフォッフォ！"""

    # --- 画像アップロード ---
    print(f"アップロード中: {image_path}")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        res = oauth.post(upload_url, files={'media': f})
        
    if res.status_code != 200:
        print(f"❌ 画像アップロード失敗: {res.text}")
        return
        
    media_id = res.json()['media_id_string']
    print(f"✅ 画像アップロード成功: {media_id}")

    # --- 親ツイート ---
    tweet_url = "https://api.twitter.com/2/tweets"
    print("親ツイート送信中...")
    res1 = oauth.post(tweet_url, json={
        "text": parent_text, 
        "media": {"media_ids": [media_id]}
    })
    
    if res1.status_code != 201:
        print(f"❌ 親ツイート失敗: {res1.text}")
        return
        
    parent_id = res1.json()['data']['id']
    print(f"✅ 親ツイート成功: {parent_id}")
    time.sleep(3)

    # --- リプライツイート ---
    print("リプライ送信中...")
    res2 = oauth.post(tweet_url, json={
        "text": reply_text,
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    
    if res2.status_code == 201:
        print("✅ リプライ（プロフ誘導）投稿完了！")
    else:
        print(f"❌ リプライ失敗: {res2.text}")

if __name__ == "__main__":
    post_custom()
