# -*- coding: utf-8 -*-
import os
import sys
import time

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
    print("Starting browser-based X post for Column 40 (GPIF)...")

    # スレッド原稿定義
    parent_text = (
        "フォッフォッフォ！GPIFが年金運用で「41.4兆円の大黒字」を出したニュースは見たかの？\n\n"
        "ネットでは「大儲けしたなら年金を増やせ！」「どうせ政治家が使い込んでる！」と大荒れじゃが、これは完全に誤解じゃぞい！\n\n"
        "ネットにはびこる3大誤解をファクトで一刀両断するぞ！👇"
    )
    image_path = r"D:\Antigravity\Kabu\image\column\Column20260706.png"

    reply_text = (
        "資金は信託銀行に分別管理され、年金給付以外には1円も使えん。政治家の流用は100%不可能じゃ。\n\n"
        "また黒字の正体は「含み益」であり、今売れば暴落する幻の数字でもあるのじゃ。\n\n"
        "年金運用の本当の仕組みと、インフレ防衛の真実はこちら！👇\n"
        "https://okane-no-manabi.jp/column/col_040/"
    )

    # 文字数検証
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
    # headless=False で実行し、ユーザーが進行を確認できるようにする
    res = post_to_x(thread=thread, headless=False, char_id="kabu")

    if res.get("success"):
        print("✅ コラム40宣伝スレッド投稿成功！")
        # 履歴記録
        full_text = f"[col_040]\n{parent_text}\n\n[Reply]\n{reply_text}"
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
