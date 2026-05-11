import os
import sys
import subprocess
import re
from requests_oauthlib import OAuth1Session

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

def post_urakane02():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    ck  = get_env_robust("KABU_X_CONSUMER_KEY")
    cs  = get_env_robust("KABU_X_CONSUMER_SECRET")
    at  = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([ck, cs, at, ats]):
        print("❌ エラー: 認証情報が環境変数に見つかりません。")
        return

    image_path = r"D:\Antigravity\Kabu\manga\urakane\urakane02.jpg"

    # 1ツイート目（画像付き）
    tweet1_text = """💸 お金の"裏側"、知ってますか？

表には出ない株・投資の本音を
マンガで正直に描いてみました📖

#投資漫画 #株式投資 #お金の勉強"""

    # 2ツイート目（サイト紹介リプライ）
    tweet2_text = """▼ 続きはサイトで読めます！

「お金のまなび場」では、マンガ・コラム・用語集で
投資をやさしく学べます📚 完全無料！

🔗 https://okane-no-manabi.jp/

ぜひブックマークしてみてください✨"""

    # 文字数チェック
    p1 = count_twitter_points(tweet1_text)
    p2 = count_twitter_points(tweet2_text)
    print(f"📊 1ツイート目: {p1}/280ポイント (約{p1/2:.1f}/140文字)")
    print(f"📊 2ツイート目: {p2}/280ポイント (約{p2/2:.1f}/140文字)")

    for label, pts in [("1ツイート目", p1), ("2ツイート目", p2)]:
        if pts > 280:
            print(f"❌ エラー: {label}が文字数制限を超えています ({pts}ポイント)")
            return

    print("✅ 文字数チェッククリア。")

    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像が見つかりません: {image_path}")
        return

    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)
    tweet_url = "https://api.twitter.com/2/tweets"

    # Step 1: 画像アップロード
    print("\n🚀 画像をアップロード中...")
    with open(image_path, 'rb') as f:
        res_upload = oauth.post("https://upload.twitter.com/1.1/media/upload.json", files={'media': f})

    if res_upload.status_code != 200:
        print(f"❌ 画像アップロード失敗: {res_upload.status_code}")
        print(res_upload.text)
        return

    media_id = res_upload.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # Step 2: 1ツイート目（画像付き）
    print("\n📝 1ツイート目を投稿中...")
    res1 = oauth.post(tweet_url, json={
        "text": tweet1_text,
        "media": {"media_ids": [media_id]}
    })

    if res1.status_code != 201:
        print(f"❌ 1ツイート目の投稿失敗: {res1.status_code}")
        print(res1.text)
        return

    parent_id = res1.json()['data']['id']
    print(f"✅ 1ツイート目を投稿しました！ ID: {parent_id}")

    # Step 3: 2ツイート目（サイト紹介リプライ）
    print("\n📝 2ツイート目（サイト紹介）をリプライ投稿中...")
    res2 = oauth.post(tweet_url, json={
        "text": tweet2_text,
        "reply": {"in_reply_to_tweet_id": parent_id}
    })

    if res2.status_code != 201:
        print(f"❌ 2ツイート目の投稿失敗: {res2.status_code}")
        print(res2.text)
        return

    reply_id = res2.json()['data']['id']
    print(f"✅ 2ツイート目を投稿しました！ ID: {reply_id}")
    print(f"\n🎉 スレッド投稿完了！")
    print(f"🔗 投稿URL: https://x.com/i/status/{parent_id}")

if __name__ == "__main__":
    post_urakane02()
