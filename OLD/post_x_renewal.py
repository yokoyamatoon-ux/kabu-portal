from post_to_x_kabu import post_to_x

def main():
    text = """【お知らせ】プチリニューアルしました🥬✨

カブ先生のお金の学校が少し新しくなりました！
✅PC版：画面中央に配置されワイド画面でも快適に🖥️
✅スマホ版：上のマーケット情報がコンパクトに📱

ぜひ新しいサイトをチェックしてくださいね！
🔗 https://okane-no-manabi.jp/
"""
    print("Posting to X...")
    tweet_id = post_to_x(text, category="Announcement")
    if tweet_id:
        print(f"Successfully posted https://x.com/user/status/{tweet_id}")
    else:
        print("Failed to post.")

if __name__ == "__main__":
    main()
