import os
import sys
from post_to_x_kabu import post_to_x
from modules.sns_config import count_twitter_points, ROOT_DIR

def post_monday_mindset():
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding='utf-8')

    # 最適化済み画像（413エラー対策）
    category = "Mindset"
    image_rel_path = os.path.join("illust", "Character_sns.jpg")
    image_path = os.path.join(ROOT_DIR, image_rel_path)
    
    # カブ先生のペルソナ全開のテキスト（月曜日・マインド系）
    tweet_text = """今週も始まりじゃな！週の始まりは誰でも億劫なものじゃが、投資の世界では焦りは禁物。

たとえ100円からでも『一歩踏み出した』自分を、まずは全力で褒めてやるのじゃぞ！
コツコツ積み上げた時間は、必ず君の味方になってくれる。フォッフォッフォ！🌱

#NISA #投資初心者 #カブ先生 #資産形成"""

    # 文字数チェック
    points = count_twitter_points(tweet_text)
    print(f"📊 投稿内容チェック: {points}/280ポイント (約{points/2:.1f}/140文字)")
    
    if points > 280:
        print("❌ エラー: 文字数制限を超過しています。")
        return

    # 投稿実行
    print("\n🚀 カブ先生の月曜マインドポストを送信中...")
    tweet_id = post_to_x(tweet_text, category=category, image_path=image_path)
    
    if tweet_id:
        print(f"\n🎉 投稿完了しましたぞい！")
        print(f"🔗 投稿URL: https://x.com/nanda_antigravity/status/{tweet_id}")
    else:
        print("\n❌ 投稿に失敗したようじゃ... ログを確認しておくれ。")

if __name__ == "__main__":
    post_monday_mindset()
