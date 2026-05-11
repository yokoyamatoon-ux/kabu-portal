import os
import sys
import subprocess
import json
import re
from requests_oauthlib import OAuth1Session

# Windowsの環境変数を確実に取得するための関数
def get_env_robust(key):
    val = os.getenv(key)
    if val:
        return val
    try:
        # PowerShell経由でシステム環境変数を取得
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'User')"],
            capture_output=True, text=True, check=True
        )
        val = result.stdout.strip()
        if val:
            return val
        
        # システム全体からも探す
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'Machine')"],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except Exception:
        return None

def count_twitter_points(text):
    """
    Twitterの文字数カウント（280ポイント制限）を計算する。
    """
    url_pattern = re.compile(r'https?://[^\s]+')
    urls = url_pattern.findall(text)
    stripped_text = url_pattern.sub('', text)
    
    points = 0
    points += len(urls) * 46
    
    for char in stripped_text:
        if any([
            '\u3000' <= char <= '\u303f',
            '\u3040' <= char <= '\u309f',
            '\u30a0' <= char <= '\u30ff',
            '\uff00' <= char <= '\uffef',
            '\u4e00' <= char <= '\u9faf',
        ]):
            points += 2
        else:
            points += 1
    return points

def post_x_column():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    # 認証情報の取得
    ck = get_env_robust("KABU_X_CONSUMER_KEY")
    cs = get_env_robust("KABU_X_CONSUMER_SECRET")
    at = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が環境変数に見つかりません。")
        return

    # 投稿設定
    image_path = r"D:\Antigravity\Kabu\manga\column\Column20260416.png"
    article_url = "https://okane-no-manabi.jp/?page=column_detail&id=col_014"
    
    tweet_text = f"""【ビットコインは「資産」か？】
マネ太「史上最高値！これバブル？」
カブ先生「ETF承認でプロも買う『デジタル・ゴールド』になったんじゃ。3〜5%のスパイス保有が賢いぞ。」
半減期後の新常識を解説！

🔗 {article_url}

#ビットコイン #投資 #NISA"""

    # 文字数チェック
    points = count_twitter_points(tweet_text)
    print(f"📊 文字数チェック: {points}/280ポイント")
    
    if points > 280:
        print(f"❌ エラー: 文字数制限を超過しています。")
        return

    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像が見つかりません: {image_path}")
        return

    # 認証セッション作成
    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

    # 1. 画像アップロード
    print("🚀 画像をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        files = {'media': f}
        res_upload = oauth.post(upload_url, files=files)

    if res_upload.status_code != 200:
        print(f"❌ 画像アップロード失敗: {res_upload.status_code}")
        print(res_upload.text)
        return

    media_id = res_upload.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 2. ツイート投稿
    print("📝 ツイートを投稿中...")
    tweet_url = "https://api.twitter.com/2/tweets"
    payload = {
        "text": tweet_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    res_tweet = oauth.post(tweet_url, json=payload)

    if res_tweet.status_code == 201:
        data = res_tweet.json()
        tweet_id = data['data']['id']
        print(f"🎉 投稿に成功しました！")
        print(f"🔗 投稿URL: https://x.com/i/status/{tweet_id}")
    else:
        print(f"❌ 投稿失敗: {res_tweet.status_code}")
        print(res_tweet.text)

if __name__ == "__main__":
    post_x_column()
