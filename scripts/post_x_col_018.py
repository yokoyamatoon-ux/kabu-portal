import os
import sys
import time
import json
import subprocess
from requests_oauthlib import OAuth1Session

# Windows console encoding fix
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def get_env_robust(key):
    val = os.getenv(key)
    if val: return val
    cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "User")'
    res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
    return res.stdout.strip() or None

def check_length(text, include_url=False):
    # Twitter counts full-width as 2, half-width as 1. URL is 23 points.
    points = sum(2 if ord(c) > 127 else 1 for c in text)
    if include_url:
        points += 23
    return points <= 280

def main():
    CK = get_env_robust("KABU_X_CONSUMER_KEY")
    CS = get_env_robust("KABU_X_CONSUMER_SECRET")
    AT = get_env_robust("KABU_X_ACCESS_TOKEN")
    AS = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([CK, CS, AT, AS]):
        print("エラー: 認証情報（環境変数）が見つかりません。")
        return

    oauth = OAuth1Session(CK, CS, AT, AS)

    # Tweet Content
    parent_text = "フォッフォッフォ！今日は「決算」のキホンじゃ。\n「ソフトバンクGが1兆円の赤字！」なんてニュースを見てパニックになっておらんか？\n\n初心者は分厚い資料を読まなくていい。\nまずは「売上」「営業利益」「純利益」の3つだけを見るのじゃ！\n（リプ欄に続く👇）\n#投資初心者 #新NISA"
    
    reply_text = "そして一番大事なのは「過去の成績」よりも「来年の予想（ガイダンス）」なんじゃよ💡\n赤字でも株価が上がる裏側をコラムで世界一わかりやすく解説したぞい！\n\n👇「お金の学び場」今日のコラムでチェックじゃ！\nhttps://okane-no-manabi.jp/column/col_018/"

    image_path = os.path.join("D:\\", "Antigravity", "Kabu", "web-next", "public", "images", "column", "Column20260511.png")

    # Check limits
    if not check_length(parent_text):
        print("エラー: 親ツイートの文字数が制限を超えています。")
        return
    if not check_length(reply_text, include_url=True):
        print("エラー: リプライツイートの文字数が制限を超えています。")
        return

    print("文字数チェックOK。投稿を開始します。")

    # 1. Upload Image
    print("画像をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        res = oauth.post(upload_url, files={'media': f})
    
    if res.status_code != 200:
        print(f"画像アップロード失敗: {res.text}")
        return
        
    media_id = res.json()['media_id_string']
    print(f"画像アップロード成功 (media_id: {media_id})")

    # 2. Post Parent Tweet
    tweet_url = "https://api.twitter.com/2/tweets"
    print("親ツイートを投稿中...")
    res1 = oauth.post(tweet_url, json={
        "text": parent_text,
        "media": {"media_ids": [media_id]}
    })
    
    if res1.status_code != 201:
        print(f"親ツイート投稿失敗: {res1.text}")
        return
        
    parent_id = res1.json()['data']['id']
    print(f"親ツイート投稿成功 (id: {parent_id})")

    # 3. Post Reply
    print("リプライを投稿中 (3秒待機)...")
    time.sleep(3)
    res2 = oauth.post(tweet_url, json={
        "text": reply_text,
        "reply": {"in_reply_to_tweet_id": parent_id}
    })
    
    if res2.status_code != 201:
        print(f"リプライ投稿失敗: {res2.text}")
        return
        
    print("リプライ投稿成功！")
    print("全プロセス完了。")

if __name__ == "__main__":
    main()
