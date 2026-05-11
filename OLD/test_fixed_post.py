import sys
import os
from post_to_x_kabu import post_to_x

def test():
    print("X投稿機能の最終テストを開始します...")
    text = "【復旧テスト】カブ先生の自動投稿、無事に復活したぞい！🥬✨\n\n文字コードのエラーで少しお休みしておったが、もう大丈夫じゃ。これからもポップに投資を教えていくから、よろしくのう！\n\n#カブ先生 #投資の勉強 #復活 #自動更新"
    
    # 実際には投稿せず、まずは認証とエンコーディングのチェック
    # (本番環境での確認が必要なため、ここでは直接実行を試みる)
    tweet_id = post_to_x(text, category="SystemTest")
    
    if tweet_id:
        print(f"✅ テスト投稿に成功しました！ ID: {tweet_id}")
    else:
        print("❌ テスト投稿に失敗しました。")

if __name__ == "__main__":
    test()
