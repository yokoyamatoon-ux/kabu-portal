import os
import time
import sys
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def post_kabu_thread():
    # システム環境変数からキーを読み込む
    consumer_key = get_env_robust("KABU_X_CONSUMER_KEY")
    consumer_secret = get_env_robust("KABU_X_CONSUMER_SECRET")
    access_token = get_env_robust("KABU_X_ACCESS_TOKEN")
    access_token_secret = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    # 使用する画像のパス
    image_path = r"D:\Antigravity\Kabu\image\Kabu_X\Kabu_Ketsui.png"
    
    # 投稿内容（140文字チェック済み）
    posts = [
        {
            "text": "「使ってない口座を5万円で買う」\n\nフォッフォッフォ！マネ太くん、そんな甘い誘いに乗ってはならん！\nその5万円と引き換えに、君は『一生、銀行を使えない体』になるかもしれん。\n\n投資の前に、口座売買の『地獄』を教えようかの。🥬\n#カブ先生 #防犯 #資産運用",
            "image": image_path
        },
        {
            "text": "結論、口座の売買は『喝（かつ）！！』。立派な犯罪じゃ！\n\n売った口座は100%詐欺に使われる。警察は真っ先に名義人を疑い、逮捕の可能性も十分。一度ブラックリストに載れば今後一生、どの銀行でも口座が作れん。給与受取もスマホ契約も困難になる。社会的な死じゃよ。フォッフォッフォ！"
        },
        {
            "text": "詳細はワシの学校（ブログ）にマンガでまとめたぞ。\nプロフのリンクから必ずチェックするのじゃ！\n\n【質問】\n皆さんの周りで『怪しい儲け話』を聞いたことはあるかな？リプライで教えておくれ。ワシがまとめて『喝！』を入れに行くぞ！🥬\nhttps://okane-no-manabi.jp/money_secret/9"
        }
    ]

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    last_tweet_id = None

    for i, post in enumerate(posts):
        print(f"🚀 {i+1}枚目のポストを投稿中...")
        
        payload = {"text": post["text"]}
        
        # 1. 画像がある場合はアップロード
        if "image" in post and os.path.exists(post["image"]):
            print(f"📸 画像をアップロード中: {os.path.basename(post['image'])}")
            upload_url = "https://upload.twitter.com/1.1/media/upload.json"
            with open(post["image"], 'rb') as f:
                files = {'media': f}
                upload_response = oauth.post(upload_url, files=files)
            
            if upload_response.status_code == 200:
                media_id = upload_response.json()['media_id_string']
                payload["media"] = {"media_ids": [media_id]}
                print(f"✅ 画像アップロード成功! Media ID: {media_id}")
            else:
                print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
                return

        # 2. スレッド（返信）の設定
        if last_tweet_id:
            payload["reply"] = {"in_reply_to_tweet_id": last_tweet_id}

        # 3. 投稿
        tweet_url = "https://api.twitter.com/2/tweets"
        response = oauth.post(tweet_url, json=payload)

        if response.status_code == 201:
            last_tweet_id = response.json()['data']['id']
            print(f"✅ ポスト {i+1} 成功! ID: {last_tweet_id}")
        else:
            print(f"❌ ポスト {i+1} 失敗: {response.status_code}")
            print(response.text)
            return

        # 少し待機
        if i < len(posts) - 1:
            print("3秒待機中...")
            time.sleep(3)

    print("\n🎉 スレッド全体の投稿が完了しました！")

if __name__ == "__main__":
    post_kabu_thread()
