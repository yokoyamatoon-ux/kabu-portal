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
    print("Starting browser-based X post for Column 42 (Japanese DOGE)...")

    # スレッド原稿定義
    parent_text = (
        "フォッフォッフォ！行政のムダを省く「日本版DOGE」の点検結果が出たぞい！\n\n"
        "なんと、120件あった見直し候補の中で廃止になったのは「たったの1件」じゃ！\n\n"
        "片山財務相も激怒した、この『官僚組織の壁と自主点検の限界』についてカブ先生が分かりやすく解説するぞい！👇"
    )
    image_path = r"D:\Antigravity\Kabu\image\column\Column20260708.png"

    reply_text = (
        "行政の見直しを「身内の自己点検（セルフ採点）」に任せている限り、既得権益の削減は1ミリも進まん。\n\n"
        "改革に必要な「外部の目」と「政治主導の強制力」のファクトを暴くぞい！\n\n"
        "続きはコラムをチェックじゃ！👇\n"
        "https://okane-no-manabi.jp/column/col_042/"
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
        print("✅ コラム42宣伝スレッド投稿成功！")
        # 履歴記録
        full_text = f"[col_042]\n{parent_text}\n\n[Reply]\n{reply_text}"
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
