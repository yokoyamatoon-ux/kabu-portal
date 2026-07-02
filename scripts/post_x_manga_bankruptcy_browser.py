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
    from sns_config import log_post_to_history
except ImportError:
    def log_post_to_history(*args, **kwargs): pass

def main():
    print("Starting browser-based X post for Episode 17...")

    # 1. マンガ紹介スレッド (3段階)
    thread_manga = [
        {
            "text": "フォッフォッフォ！「売上4億円の人気フィットネスジムが破産！？」と驚いておる者はおらんかの？\n\n「売上があって黒字なら、会社は絶対に安全！」というマネ太の思い込みに喝じゃ！\n\n実は利益があっても黒字倒産する罠があるのじゃ。解説するぞい！👇\n#会社倒産 #黒字倒産 #マンガで学ぶ",
            "image_path": r"D:\Antigravity\Kabu\image\manga\manga17_01.png"
        },
        {
            "text": "会社が潰れる本当の理由はただ一つ、「手元の現金（キャッシュ）が枯渇するから」じゃよ。\n\n売上が入るまでの時間差の間に、仕入れや給料の支払いが重なると手元の現金がなくなって即倒産じゃ！\n\nマンガで学ぶ倒産と現金の仕組みはこちら！👇\nhttps://okane-no-manabi.jp/manga/17/"
        },
        {
            "text": "▼金利や家計リスクを深く学びたい者は、こちらの住宅ローンコラムも読むのじゃぞい！\n\n【住宅ローン vs 賃貸】一生で得なのはどちら？金利上昇リスクと生涯コストの真実はこちら👇\nhttps://okane-no-manabi.jp/column/col_038/"
        }
    ]

    # 2. note紹介スレッド (3段階)
    thread_note = [
        {
            "text": "フォッフォッフォ！会社が潰れるのは「赤字だから」だと思っておらんかの？\n\n実は、利益たっぷりの黒字でも明日突然倒産する「黒字倒産」の罠があるのじゃ！\n\nなぜ人気店が急に破産するのか、今さら聞けない借金と現金の冷酷な仕組みをnoteに書いたぞい！👇\n#黒字倒産 #資金ショート #note",
            "image_path": r"D:\Antigravity\Kabu\image\manga\manga17_02.png"
        },
        {
            "text": "コロナ禍では、多くの企業が補助金や実質無利子・無担保の「ゼロゼロ融資」で延命しておった。\n\nしかし返済が本格化した今、資金繰りが限界を迎えるコロナ後遺症倒産が激増しておる。\n\n今さら聞けない倒産と現金の仕組みはこちら！👇\nhttps://note.com/kabu_teacher/n/nf2148d34de0c"
        },
        {
            "text": "▼こちらもおすすめ！\n普通の個人口座がマネーロンダリングの中継ハブに狙われる！？\n口座売買や送金バイトに潜む冷酷な闇の解説記事はこちら👇\nhttps://note.com/kabu_teacher/n/nfe053ee5b4dd"
        }
    ]

    # --- 1. マンガ紹介スレッドの配信 ---
    print("\n========== 1. マンガ紹介スレッド投稿 (ブラウザ) ==========")
    res_manga = post_to_x(thread=thread_manga, headless=False, char_id="kabu")
    
    if res_manga.get("success"):
        print("✅ マンガ紹介スレッド投稿成功！")
        # 履歴記録
        full_text_m = "\n\n".join([item["text"] for item in thread_manga])
        log_post_to_history(
            category="manga_promo",
            text=full_text_m,
            media_path=thread_manga[0]["image_path"],
            status="success"
        )
    else:
        print(f"❌ マンガ紹介スレッド投稿失敗: {res_manga.get('error')}")

    time.sleep(10)

    # --- 2. note紹介スレッドの配信 ---
    print("\n========== 2. note紹介スレッド投稿 (ブラウザ) ==========")
    res_note = post_to_x(thread=thread_note, headless=False, char_id="kabu")
    
    if res_note.get("success"):
        print("✅ note紹介スレッド投稿成功！")
        # 履歴記録
        full_text_n = "\n\n".join([item["text"] for item in thread_note])
        log_post_to_history(
            category="note_promo",
            text=full_text_n,
            media_path=thread_note[0]["image_path"],
            status="success"
        )
    else:
        print(f"❌ note紹介スレッド投稿失敗: {res_note.get('error')}")

    if res_manga.get("success") and res_note.get("success"):
        print("\n🎉 すべてのブラウザベース投稿が正常に完了しました！")
    else:
        print("\n⚠️ 一部の投稿に失敗しました。ログを確認してください。")

if __name__ == "__main__":
    main()
