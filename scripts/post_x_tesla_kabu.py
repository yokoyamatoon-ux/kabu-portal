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

def post_tesla_repost_kabu():
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    tweet_url = "https://api.twitter.com/2/tweets"

    # テスラFSDの元動画ポストURL
    target_tweet_url = "https://x.com/Rustavi/status/2053191147913167358"

    # 1ポスト目 (文字数オーバーによる403エラーを回避するため大幅に短縮)
    text1 = f"""フォッフォッフォ！海外で話題のテスラFSDの映像じゃが…
逆光の夜道でもAIが「光の粒」を数えて真昼のように認識しておる！

これを見ると「テスラ株は買い！」と飛びつきたくなるじゃろ？🚗✨
#テスラ #AI投資

{target_tweet_url}"""

    # 2ポスト目
    text2 = """じゃが、ちょっと待つんじゃ！マネ太のように「すげえっす！全財産突っ込むっす！」となるのが一番危ないんじゃぞい。
確かに技術は本物じゃが、株価にはすでにその高い期待値がたっぷり織り込まれておることも多いんじゃ。"""

    # 3ポスト目
    text3 = """投資で勝つには「技術の凄さ」と「株価の割安さ」は別物だと理解することが必須じゃ。
AIが物理世界を支配し始めているのは事実じゃが、熱狂の渦に巻き込まれず、冷静に財務や業績を見る目を持たねばならんぞ！喝！！"""

    # 4ポスト目 (ブログ誘導)
    text4 = """「話題のAI銘柄だから買えば絶対儲かる」という考えは、いずれ痛い目を見る…。
一時的なブームに踊らされず、長期的に生き残るための「お金のウラ事情」をわしと一緒にしっかり学ぶのじゃ！👇

▼ 投資の甘い罠と防衛力を高める知識はこちらじゃ
https://okane-no-manabi.jp/money-secret/"""

    print("ポスト1送信中... (URL付与型 引用リポスト)")
    payload1 = {
        "text": text1
    }
    res1 = oauth.post(tweet_url, json=payload1)
    if res1.status_code != 201:
        print(f"❌ ポスト1失敗: {res1.text}")
        return
    parent_id = res1.json()['data']['id']
    print(f"✅ ポスト1成功: {parent_id}")
    time.sleep(3)

    print("ポスト2送信中...")
    payload2 = {"text": text2, "reply": {"in_reply_to_tweet_id": parent_id}}
    res2 = oauth.post(tweet_url, json=payload2)
    if res2.status_code != 201:
        print(f"❌ ポスト2失敗: {res2.text}")
        return
    parent_id2 = res2.json()['data']['id']
    print(f"✅ ポスト2成功: {parent_id2}")
    time.sleep(3)

    print("ポスト3送信中...")
    payload3 = {"text": text3, "reply": {"in_reply_to_tweet_id": parent_id2}}
    res3 = oauth.post(tweet_url, json=payload3)
    if res3.status_code != 201:
        print(f"❌ ポスト3失敗: {res3.text}")
        return
    parent_id3 = res3.json()['data']['id']
    print(f"✅ ポスト3成功: {parent_id3}")
    time.sleep(3)

    print("ポスト4送信中...")
    payload4 = {"text": text4, "reply": {"in_reply_to_tweet_id": parent_id3}}
    res4 = oauth.post(tweet_url, json=payload4)
    if res4.status_code != 201:
        print(f"❌ ポスト4失敗: {res4.text}")
        return
    parent_id4 = res4.json()['data']['id']
    print(f"✅ ポスト4成功: {parent_id4}")
    
    print(f"\n🎉 すべての投稿が完了しました！")
    print(f"URL: https://x.com/TooNScriptStore/status/{parent_id}")

if __name__ == "__main__":
    post_tesla_repost_kabu()
