import os
import sys
import subprocess
import re
from requests_oauthlib import OAuth1Session

# Windowsの環境変数を確実に取得するための関数
def get_env_robust(key):
    val = os.getenv(key)
    if val:
        return val
    try:
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'User')"],
            capture_output=True, text=True, check=True
        )
        val = result.stdout.strip()
        if val:
            return val
        result = subprocess.run(
            ["powershell", "-Command", f"[System.Environment]::GetEnvironmentVariable('{key}', 'Machine')"],
            capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except Exception:
        return None

def count_twitter_points(text):
    url_pattern = re.compile(r'https?://[^\s]+')
    urls = url_pattern.findall(text)
    stripped_text = url_pattern.sub('', text)
    points = len(urls) * 46
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

def post_column_20260402():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    # 認証情報の取得
    ck  = get_env_robust("KABU_X_CONSUMER_KEY")
    cs  = get_env_robust("KABU_X_CONSUMER_SECRET")
    at  = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が環境変数に見つかりません。")
        return

    # 投稿設定
    image_path = r"D:\Antigravity\Kabu\manga\column\Column20260402.jpeg"
    article_url = "https://okane-no-manabi.jp/?page=column_detail&id=col_010"

    # 1ツイート目（画像付き）
    tweet1_text = """【高配当の甘い罠に気をつけろ！】
「利回り10%超！」という魅力的な数字に、ついつい飛びついていませんか？💰

見かけの数字だけで選ぶと、株価暴落や減配で痛い目を見ることも……。
カブ先生が正しい見極め方を教えます！📖

#高配当株 #投資初心者 #お金の勉強"""

    # 2ツイート目（コラム詳細・リプライ）
    tweet2_text = f"""▼ 続きはこちらのコラムへ！
{article_url}

・業績は安定しているか？
・減配の歴史はないか？
・配当性向は高すぎないか？

本当の「健康な高配当株」の選び方を3つのポイントで解説しています✨"""

    # 文字数チェック
    p1 = count_twitter_points(tweet1_text)
    p2 = count_twitter_points(tweet2_text)
    print(f"📊 1ツイート目: {p1}/280ポイント (約{p1/2:.1f}/140文字)")
    print(f"📊 2ツイート目: {p2}/280ポイント (約{p2/2:.1f}/140文字)")

    if p1 > 280 or p2 > 280:
        print("❌ エラー: 文字数制限を超過しています。")
        return

    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像が見つかりません: {image_path}")
        return

    # 認証セッション作成
    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)
    tweet_url = "https://api.twitter.com/2/tweets"

    # 1. 画像アップロード
    print("\n🚀 画像をアップロード中...")
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        res_upload = oauth.post(upload_url, files={'media': f})

    if res_upload.status_code != 200:
        print(f"❌ 画像アップロード失敗: {res_upload.status_code}")
        print(res_upload.text)
        return

    media_id = res_upload.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 2. 1ツイート目投稿
    print("\n📝 1ツイート目を投稿中...")
    payload1 = {
        "text": tweet1_text,
        "media": {"media_ids": [media_id]}
    }
    res1 = oauth.post(tweet_url, json=payload1)

    if res1.status_code != 201:
        print(f"❌ 1ツイート目の投稿失敗: {res1.status_code}")
        print(res1.text)
        return

    parent_id = res1.json()['data']['id']
    print(f"✅ 1ツイート目を投稿しました！ ID: {parent_id}")

    # 3. 2ツイート目投稿（リプライ）
    print("\n📝 2ツイート目をリプライ投稿中...")
    payload2 = {
        "text": tweet2_text,
        "reply": {"in_reply_to_tweet_id": parent_id}
    }
    res2 = oauth.post(tweet_url, json=payload2)

    if res2.status_code != 201:
        print(f"❌ 2ツイート目の投稿失敗: {res2.status_code}")
        print(res2.text)
        return

    print(f"\n🎉 スレッド投稿完了！")
    print(f"🔗 投稿URL: https://x.com/i/status/{parent_id}")

if __name__ == "__main__":
    post_column_20260402()
