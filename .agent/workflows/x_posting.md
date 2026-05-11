---
description: X（Twitter）自動投稿の構築・運用ワークフロー
---

# X（Twitter）自動投稿ワークフロー

このドキュメントは、Pythonを用いたX API v2での自動投稿（画像＋テキスト、スレッド投稿等）を他のプロジェクトでも安全・確実に横展開するための手順書です。

## 1. 認証情報の管理ルール（重要）

セキュリティおよび運用上のトラブルを避けるため、プロジェクトディレクトリ内に `.env` ファイルを配置してキーをベタ書きすることは避けます。

* **運用方法**: すべての認証情報は **Windowsの「システム環境変数」** に登録します。
* **登録するキー**:
  * `X_CONSUMER_KEY` (またはプロジェクトごとのプレフィックス 例: `KABU_X_CONSUMER_KEY`)
  * `X_CONSUMER_SECRET`
  * `X_ACCESS_TOKEN`
  * `X_ACCESS_TOKEN_SECRET`

### 💡 注意点
環境変数を登録・変更した際は、現在開いているVS Codeやターミナル（PowerShellなど）を**必ず再起動**してから実行してください。（再起動しないと古い環境変数を読み込んでしまいます）

---

## 2. 必要なPythonライブラリ

APIの呼び出し（OAuth 1.0a 認証）用に以下のライブラリのみを使用します。

```bash
pip install requests requests_oauthlib
```

---

## 3. 基本的な投稿スクリプトのテンプレート

テキストと画像を1件投稿するための汎用テンプレートです。これをベースにカスタマイズします。

```python
import os
from requests_oauthlib import OAuth1Session

def post_to_x():
    # 1. サーバー/OSの環境変数からキーを読み込む
    consumer_key = os.getenv("X_CONSUMER_KEY")
    consumer_secret = os.getenv("X_CONSUMER_SECRET")
    access_token = os.getenv("X_ACCESS_TOKEN")
    access_token_secret = os.getenv("X_ACCESS_TOKEN_SECRET")

    if not all([consumer_key, consumer_secret, access_token, access_token_secret]):
        print("❌ エラー: 認証情報（環境変数）が見つかりません。")
        return

    oauth = OAuth1Session(
        consumer_key,
        client_secret=consumer_secret,
        resource_owner_key=access_token,
        resource_owner_secret=access_token_secret,
    )

    # 2. 投稿するデータ
    image_path = r"D:\path\to\your\image.png"
    tweet_text = """【自動投稿テスト】
ここに140文字（全角）以内でテキストを書きます。
リンクもここに配置します。
🔗 https://example.com/"""

    # --- 画像アップロード (V1.1 APIを使用) ---
    upload_url = "https://upload.twitter.com/1.1/media/upload.json"
    with open(image_path, 'rb') as f:
        files = {'media': f}
        upload_response = oauth.post(upload_url, files=files)

    if upload_response.status_code != 200:
        print(f"❌ 画像アップロード失敗: {upload_response.status_code}")
        print(upload_response.text)
        return

    media_id = upload_response.json()['media_id_string']
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # --- ツイートの投稿 (V2 APIを使用) ---
    tweet_url = "https://api.twitter.com/2/tweets"
    payload = {
        "text": tweet_text,
        "media": {
            "media_ids": [media_id]
        }
    }

    tweet_response = oauth.post(tweet_url, json=payload)

    if tweet_response.status_code == 201:
        print("✅ 投稿に成功しました！")
    else:
        print(f"❌ 投稿失敗: {tweet_response.status_code}")
        print(tweet_response.text)

if __name__ == "__main__":
    post_to_x()
```

---

## 4. スレッド（ツリー）投稿への応用

親ツイートに対して返信（スレッド）を繋げる場合は、1つ目の投稿成功時に取得できる `id` を利用して2つ目を投稿します。

```python
    # 1件目の投稿（親）
    parent_response = oauth.post(tweet_url, json=parent_payload)
    parent_id = parent_response.json()['data']['id']

    # 2件目の投稿（リプライ）
    reply_payload = {
        "text": "▼続きはこちら！\nhttps://example.com/xxxx",
        "reply": {
            "in_reply_to_tweet_id": parent_id
        }
    }
    reply_response = oauth.post(tweet_url, json=reply_payload)
```

---

## 5. つまずきやすいエラーと対策（トラブルシューティング）

### ❌ `403 Forbidden: You are not permitted to perform this action.`
もっとも頻発するエラーです。以下の原因を確認してください。

1. **文字数制限オーバー**
   Xの文字数制限は「全角140文字（半角280文字）」です。**URLは文字数に関わらず「全角11.5文字（半角23文字）」としてカウント**されるため、実際のテキストは110〜120文字程度に抑える必要があります。
2. **アカウントのパスワード/画像認証ロック**
   同一IPやAPIから連続投稿を行うとBot検知で一時ロックされます。ブラウザでXにログインし、警告（reCAPTCHA等）を解除してください。
3. **Appの権限設定ミス**
   X Developer Portal で、アプリのパーミッションが「Read and Write」になっているか確認してください。（「Read Only」だと投稿できません）
4. **同一内容の連続投稿（Duplicate）**
   全く同じ内容のツイートを短時間で繰り返すとスパム判定されて弾かれます。

### ❌ `401 Unauthorized`
1. トークンの転記ミス（`l` と `I` の間違い、前後の余分なスペースなど）。
2. Appのパーミッションを変更した後に「Regenerate（再生成）」を忘れている。

### ❌ `429 Too Many Requests`
X API Freeプランで定められた「24時間で50投稿まで」の上限に達しています。24時間待機してください。
