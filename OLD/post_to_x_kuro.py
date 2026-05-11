import os
from requests_oauthlib import OAuth1Session
from dotenv import load_dotenv

def post_to_x():
    # システム環境変数からキーを読み込む（黒焦団用は KURO_X_... を想定）
    # ※設定されていない場合は警告を表示
    consumer_key = os.getenv("KURO_X_CONSUMER_KEY")
    consumer_secret = os.getenv("KURO_X_CONSUMER_SECRET")
    access_token = os.getenv("KURO_X_ACCESS_TOKEN")
    access_token_secret = os.getenv("KURO_X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 黒焦団の認証情報（環境変数 KURO_X_...）が見つかりません。")
        return

    tweet_text = "黒焦団、再始動だ！この世界を漆黒の知識で塗りつぶしてやるぜ。フハハハハ！ #黒焦団 #SNS自動化テスト"

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    response = oauth.post(
        "https://api.twitter.com/2/tweets",
        json={"text": tweet_text}
    )

    if response.status_code == 201:
        print("成功: 黒焦団の投稿が完了しました！")
        print(response.json())
    else:
        print(f"失敗: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    post_to_x()
