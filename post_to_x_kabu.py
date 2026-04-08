import os
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv

def post_to_x():
    # システム環境変数からキーを読み込む（セキュリティ向上のため .env は不使用）
    consumer_key = os.getenv("KABU_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KABU_X_CONSUMER_SECRET")
    access_token = os.getenv("KABU_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        print("【セキュリティ警告】")
        print("1. プロジェクト内に .env 形式や平文でキーを保存するのは避けてください。")
        print("2. Windowsのシステム環境変数に上記各項目を登録してください。")
        return

    # 投稿内容（第2回：高配当の罠）
    tweet_text = """【新コーナー：ウラ金の裏事情ファイル】

マネ太：「お金の学校に、新しい人が来たっす！このサングラスのジャガイモさん、誰っすか！？🕶️🥔」

ウラ金：「ヒッヒッ……。おい坊主、世の中『表』だけ見てると、いつの間にか身ぐるみ剥がされるぜ。」

カブ先生：「紹介するのじゃ。裏事情に詳しいウラ金さんじゃ。甘い蜜の裏にある毒を、しっかり教えてもらうのじゃぞ！フォッフォッフォ。」

#カブ先生 #ウラ金さん #投資の闇 #学び"""

    # OAuth1セッションの作成
    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 投稿実行
    response = oauth.post(
        "https://api.twitter.com/2/tweets",
        json={"text": tweet_text}
    )

    if response.status_code == 201:
        print("成功: 投稿が完了しました！")
        print(response.json())
    else:
        print(f"失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    post_to_x()
