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
    - URLは一律23文字（46ポイント）
    - 全角/CJKは2ポイント
    - 半角英数は1ポイント
    """
    # URLを23文字に置き換えて計算
    url_pattern = re.compile(r'https?://[^\s]+')
    urls = url_pattern.findall(text)
    
    # URLを除いたテキスト
    stripped_text = url_pattern.sub('', text)
    
    points = 0
    # URLのポイント加算 (1つにつき46ポイント)
    points += len(urls) * 46
    
    # 残りのテキストのポイント加算
    for char in stripped_text:
        # CJK文字（全角等）の判定
        if any([
            '\u3000' <= char <= '\u303f', # CJK symbols/punctuation
            '\u3040' <= char <= '\u309f', # Hiragana
            '\u30a0' <= char <= '\u30ff', # Katakana
            '\uff00' <= char <= '\uffef', # Full-width forms
            '\u4e00' <= char <= '\u9faf', # Kanji
        ]):
            points += 2
        else:
            points += 1
            
    return points

def post_x_column():
    # 標準出力をUTF-8に設定（Windowsでの絵文字文字化け対策）
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
    image_path = r"D:\Antigravity\Kabu\manga\column\Column20260410.png"
    article_url = "https://okane-no-manabi.jp/?page=column_detail&id=col_012"
    
    tweet_text = f"""【AIは「使う」から「任せる」へ】
マネ太「指示を出すのすら大変っす…」
カブ先生「これからは自律的に動く『エージェント』の時代じゃ！目標さえ伝えれば勝手に動く相棒になるぞ。」
最新トレンドと投資の未来を解説！

🔗 {article_url}

#AIエージェント #投資"""

    # 文字数チェック
    points = count_twitter_points(tweet_text)
    print(f"📊 文字数チェック: {points}/280ポイント (約{points/2:.1f}/140文字)")
    
    if points > 280:
        print(f"❌ エラー: 文字数制限を超過しています。({points}ポイント)")
        return
    else:
        print("✅ 文字数チェッククリア。")

    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像が見つかりません: {image_path}")
        return

    # 認証セッション作成
    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

    # 1. 画像アップロード (V1.1 API)
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

    # 2. ツイート投稿 (V2 API)
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
