import os
from requests_oauthlib import OAuth1Session
from modules.sns_config import get_env_robust, log_post_to_history

def main():
    ck  = get_env_robust("KABU_X_CONSUMER_KEY")
    cs  = get_env_robust("KABU_X_CONSUMER_SECRET")
    at  = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")

    oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

    # 1. 失敗した（口調を忘れた）ツイートを削除
    previous_tweet_id = "2043936725488284062"
    del_res = oauth.delete(f"https://api.twitter.com/2/tweets/{previous_tweet_id}")
    if del_res.status_code == 200:
        print("✅ 古いツイートの削除に成功しました。")
    else:
        print(f"⚠️ 削除失敗（すでに削除済みなど）: HTTP {del_res.status_code}")

    # 2. カブ先生口調での親ツイート
    parent_text = """フォッフォッフォ！
わしの「お金の学校」を少しだけリニューアルしたぞい！🥬✨

✅PC版：画面の中心に寄せて、ワイド画面でもスッキリと見やすくしたんじゃ🖥️
✅スマホ版：上のマーケット情報がコンパクトになって、スッと読みやすくなったぞい📱

みんな、もっと投資の勉強が捗るのう！🎓"""

    parent_res = oauth.post("https://api.twitter.com/2/tweets", json={"text": parent_text})
    if parent_res.status_code == 201:
        parent_id = parent_res.json()['data']['id']
        print(f"✅ 親ツイート投稿成功! ID: {parent_id}")
        log_post_to_history("Announcement", parent_text, None, status="success", tweet_id=parent_id)

        # 3. URLをぶら下げるリプライツイート
        reply_text = """▼ぜひ新しくなったサイトに遊びに来ておくれ！
https://okane-no-manabi.jp/"""
        
        reply_res = oauth.post("https://api.twitter.com/2/tweets", json={
            "text": reply_text,
            "reply": {"in_reply_to_tweet_id": parent_id}
        })

        if reply_res.status_code == 201:
            reply_id = reply_res.json()['data']['id']
            print(f"✅ リプライ（URL）投稿成功! ID: {reply_id}")
            log_post_to_history("Announcement_Link", reply_text, None, status="success", tweet_id=reply_id)
        else:
            print(f"❌ リプライ失敗: HTTP {reply_res.status_code}")
    else:
        print(f"❌ 親ツイート失敗: HTTP {parent_res.status_code}")

if __name__ == "__main__":
    main()
