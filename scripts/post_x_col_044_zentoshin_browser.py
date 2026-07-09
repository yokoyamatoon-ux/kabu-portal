# -*- coding: utf-8 -*-
import os
import sys
import time

# Windows CP932 コンソール文字化け・エンコードエラー対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Work Smart フォルダのスクリプトをインポートできるようにパスを追加
sys.path.append(r"D:\Antigravity\Work Smart")
try:
    from post_to_x_browser_v3 import post_to_x
except ImportError:
    print("❌ エラー: post_to_x_browser_v3 をインポートできませんでした。")
    sys.exit(1)

# プロジェクト内の共通モジュールをインポート可能にする
sys.path.append(os.path.join(os.path.dirname(__file__), "modules"))
try:
    from sns_config import log_post_to_history, count_twitter_points
except ImportError:
    def log_post_to_history(*args, **kwargs): pass
    def count_twitter_points(text):
        pts = 0
        for char in text:
            if ord(char) > 127: pts += 2
            else: pts += 1
        return pts

def main():
    print("Starting browser-based X post for Column 44 (ZENTOSHIN Bankruptcy)...")

    # スレッド原稿定義
    parent_text = (
        "フォッフォッフォ！負債1259億円で破産した決済代行大手「全東信」のニュースじゃ！\n\n"
        "表向きは加盟店20万店の大企業じゃが、実は20年前から粉飾決算を繰り返していた疑惑が浮上しておる。\n\n"
        "地銀を巻き込んだ巨大な闇と、飲食店の連鎖倒産の危機を徹底解説するぞい！👇"
    )
    image_path = r"D:\Antigravity\Kabu\image\column\Column20260710.png"

    reply_text = (
        "キャッシュレス決済の売上金が突然ストップすれば、お店は黒字でも資金ショートして倒産してしまう。\n\n"
        "便利さのウラにある「リスク分散」と、自衛のセーフティネットのファクトを暴くぞい！\n\n"
        "続きはコラムをチェックじゃぞい！👇\n"
        "https://okane-no-manabi.jp/column/col_044/"
    )

    # 文字数検証 (スクリプトのcount_twitter_points簡易判定)
    p_pts = count_twitter_points(parent_text)
    r_pts = count_twitter_points(reply_text)
    print(f"📊 文字数検証 - 親ポスト: {p_pts}pts, 返信ポスト: {r_pts}pts")

    if p_pts > 280 or r_pts > 280:
        print("❌ エラー: ポストが文字数制限（280pts）を超えています。投稿を中止します。")
        sys.exit(1)

    thread = [
        {
            "text": parent_text,
            "image_path": image_path
        },
        {
            "text": reply_text
        }
    ]

    print("\n========== 投稿実行 (ブラウザ自動操作) ==========")
    res = post_to_x(thread=thread, headless=False, char_id="kabu")

    if res.get("success"):
        print("✅ コラム44宣伝スレッド投稿成功！")
        # 履歴記録
        full_text = f"[col_044]\n{parent_text}\n\n[Reply]\n{reply_text}"
        log_post_to_history(
            category="column_promo",
            text=full_text,
            media_path=image_path,
            status="success"
        )
        print("🎉 投稿履歴への登録が完了しました。")
    else:
        print(f"❌ 投稿失敗: {res.get('error')}")
        sys.exit(1)

if __name__ == "__main__":
    main()
