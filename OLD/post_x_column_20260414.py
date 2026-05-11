import os
import sys
from post_to_x_kabu import post_to_x
from modules.sns_config import ROOT_DIR

def post_column_20260414():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    # 投稿設定
    category = "Knowledge"
    # 絶対パスからプロジェクトルート基準の相対パスに変更
    image_rel_path = os.path.join("web", "public", "images", "column", "Column20260413.png")
    image_path = os.path.join(ROOT_DIR, image_rel_path)
    article_url = "https://okane-no-manabi.jp/?page=column_detail&id=col_013"

    # カブ先生ペルソナ強化版
    # 1ツイート目（画像付き）
    tweet1_text = """【S&P500 vs オルカン】
「NISAを始めるなら、結局どっちがええんじゃ！？」🤔

初心者全員がぶつかるこの『永遠のテーマ』に、カブ先生が決着をつけるぞい！🎓

実は、一番やってはいけない失敗は「どっちを選ぶか」ではないのじゃ……。

#NISA #投資初心者 #お金の勉強 #カブ先生"""

    # 2ツイート目（コラム詳細・リプライ）
    tweet2_text = f"""▼ 続きはこちらのコラムで解説中じゃ！
{article_url}

・S&P500とオルカンの「中身」の違い
・どっちが君に向いているのか？💡
・カブ先生が教える「一番のワナ」とは？

さぁ、勇気を出してクリックするのじゃ！投資家の第一歩を応援しておるぞい。フォッフォッフォ！🌱"""

    # 投稿実行
    print("\n🚀 火曜日の図解コラムポストを送信中...")
    
    # 1件目（親ツイート）
    parent_id = post_to_x(tweet1_text, category=category, image_path=image_path)
    
    if parent_id:
        print(f"✅ 1ツイート目成功: {parent_id}")
        
        # 2件目（スレッド返信）
        from requests_oauthlib import OAuth1Session
        from modules.sns_config import get_env_robust
        
        ck  = get_env_robust("KABU_X_CONSUMER_KEY")
        cs  = get_env_robust("KABU_X_CONSUMER_SECRET")
        at  = get_env_robust("KABU_X_ACCESS_TOKEN")
        ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")
        
        oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)
        payload2 = {
            "text": tweet2_text,
            "reply": {"in_reply_to_tweet_id": parent_id}
        }
        res2 = oauth.post("https://api.twitter.com/2/tweets", json=payload2)
        
        if res2.status_code == 201:
            print(f"🎉 スレッド投稿完了しましたぞい！")
        else:
            print(f"❌ 2ツイート目失敗: {res2.status_code}")
    else:
        print("\n❌ 1ツイート目の投稿に失敗したようじゃ。")

if __name__ == "__main__":
    post_column_20260414()
