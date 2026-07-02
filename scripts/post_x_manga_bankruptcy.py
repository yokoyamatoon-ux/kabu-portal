# -*- coding: utf-8 -*-
import os
import time
import sys
import json
import subprocess
import re

# プロジェクト内の共通モジュールをインポート可能にする
sys.path.append(os.path.join(os.path.dirname(__file__), "modules"))
try:
    from sns_config import log_post_to_history, count_twitter_points
except ImportError:
    # 読み込めない場合の簡易フォールバック
    def log_post_to_history(*args, **kwargs): pass
    def count_twitter_points(text):
        pts = 0
        for char in text:
            if ord(char) > 127: pts += 2
            else: pts += 1
        return pts

# Windows標準出力のエンコード対策
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def run_xurl_command(args):
    """xurlコマンドを shell=False で確実に実行し、出力をパースして返す"""
    npx_cmd = "npx.cmd" if sys.platform == "win32" else "npx"
    cmd = [npx_cmd, "@xdevplatform/xurl", "--app", "Kabu_X"] + args
    print(f"Executing Process: {cmd}")
    
    # shell=False により、テキスト引数内のスペースや改行、URL特殊文字が正しく渡る
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    
    if res.returncode != 0:
        print(f"❌ コマンド実行失敗 (code: {res.returncode}):")
        print(res.stderr)
        return None
        
    stdout = res.stdout.strip()
    if not stdout:
        return {}
        
    try:
        return json.loads(stdout)
    except json.JSONDecodeError:
        return {"raw_text": stdout}

def upload_media(image_path):
    """画像をアップロードして media_id を取得する"""
    if not os.path.exists(image_path):
        print(f"❌ エラー: 画像ファイルが見つかりません: {image_path}")
        return None

    npx_cmd = "npx.cmd" if sys.platform == "win32" else "npx"
    cmd = [npx_cmd, "@xdevplatform/xurl", "--app", "Kabu_X", "media", "upload", image_path]
    print(f"Executing Process: {cmd}")
    
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        print(f"❌ コマンド実行失敗: {res.stderr}")
        return None
        
    stdout = res.stdout.strip()
    
    # 1. プレーンテキスト出力行からの直接抽出 (最優先)
    match = re.search(r"Media ID:\s*(\d+)", stdout)
    if match:
        return match.group(1)
        
    # 2. JSON部分の抽出とパースの試行
    try:
        json_match = re.search(r"(\{.*\})", stdout, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group(1))
            media_id = data.get("data", {}).get("id") or data.get("media_id_string")
            if media_id:
                return media_id
    except Exception:
        pass
        
    print(f"❌ エラー: 出力から Media ID を抽出できませんでした。出力:\n{stdout}")
    return None

def post_tweet(text, media_id=None):
    """親ツイートを投稿する"""
    args = ["post", text]
    if media_id:
        args += ["--media-id", str(media_id)]
        
    res = run_xurl_command(args)
    if not res:
        return None
        
    # JSON構造からIDを取得
    if isinstance(res, dict) and "data" in res:
        return res["data"].get("id")
        
    # フォールバック
    if isinstance(res, dict) and "raw_text" in res:
        match = re.search(r'"id"\s*:\s*"(\d+)"', res["raw_text"])
        if match:
            return match.group(1)
            
    return None

def post_reply(parent_id, text):
    """スレッドとして返信し、その返信のツイートIDを返す"""
    args = ["reply", str(parent_id), text]
    res = run_xurl_command(args)
    if not res:
        return None
        
    # JSON構造からIDを取得
    if isinstance(res, dict) and "data" in res:
        return res["data"].get("id")
        
    # フォールバック
    if isinstance(res, dict) and "raw_text" in res:
        match = re.search(r'"id"\s*:\s*"(\d+)"', res["raw_text"])
        if match:
            return match.group(1)
            
    return None

def publish_manga_thread_3step():
    print("\n========== 1. マンガ紹介スレッド投稿 (3段階) ==========")
    manga_img = os.path.join("image", "manga", "manga17_01.png")
    
    # 1. 記事紹介 (親)
    parent_text = """フォッフォッフォ！「売上4億円の人気フィットネスジムが破産！？」と驚いておる者はおらんかの？

「売上があって黒字なら、会社は絶対に安全！」というマネ太の思い込みに喝じゃ！

実は利益があっても黒字倒産する罠があるのじゃ。解説するぞい！👇
#会社倒産 #黒字倒産 #マンガで学ぶ"""

    # 2. 記事のURL (リプ1)
    reply1_text = """会社が潰れる本当の理由はただ一つ、「手元の現金（キャッシュ）が枯渇するから」じゃよ。

売上が入るまでの時間差の間に、仕入れや給料の支払いが重なると手元の現金がなくなって即倒産じゃ！

マンガで学ぶ倒産と現金の仕組みはこちら！👇
https://okane-no-manabi.jp/manga/17/"""

    # 3. 関連記事の紹介 (リプ2)
    reply2_text = """▼金利や家計リスクを深く学びたい者は、こちらの住宅ローンコラムも読むのじゃぞい！

【住宅ローン vs 賃貸】一生で得なのはどちら？金利上昇リスクと生涯コストの真実はこちら👇
https://okane-no-manabi.jp/column/col_038/"""

    # 文字数検証
    p_pts = count_twitter_points(parent_text)
    r1_pts = count_twitter_points(reply1_text)
    r2_pts = count_twitter_points(reply2_text)
    print(f"📊 マンガ紹介 - 親: {p_pts}pts, リプ1: {r1_pts}pts, リプ2: {r2_pts}pts")
    if p_pts > 280 or r1_pts > 280 or r2_pts > 280:
        print("❌ エラー: 文字数制限(280pts)を超えています。")
        return False

    # メディアアップロード
    media_id = upload_media(manga_img)
    if not media_id:
        print("❌ マンガ画像のアップロードに失敗しました。")
        return False
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 親投稿
    tweet_id_p = post_tweet(parent_text, media_id)
    if not tweet_id_p:
        print("❌ 親ポストの送信に失敗しました。")
        return False
    print(f"✅ 親ポスト送信成功! Tweet ID: {tweet_id_p}")
    time.sleep(3)

    # リプ1投稿
    tweet_id_r1 = post_reply(tweet_id_p, reply1_text)
    if not tweet_id_r1:
        print("❌ リプライ1の送信に失敗しました。")
        return False
    print(f"✅ リプライ1送信成功! Reply 1 ID: {tweet_id_r1}")
    time.sleep(3)

    # リプ2投稿
    tweet_id_r2 = post_reply(tweet_id_r1, reply2_text)
    if not tweet_id_r2:
        print("❌ リプライ2の送信に失敗しました。")
        return False
    print(f"✅ リプライ2送信成功! Reply 2 ID: {tweet_id_r2}")

    # 履歴記録
    full_text = f"{parent_text}\n\n[Reply 1]\n{reply1_text}\n\n[Reply 2]\n{reply2_text}"
    log_post_to_history(
        category="manga_promo",
        text=full_text,
        media_path=manga_img,
        status="success",
        tweet_id=tweet_id_p
    )
    return True

def publish_note_thread_3step():
    print("\n========== 2. note紹介スレッド投稿 (3段階) ==========")
    note_img = os.path.join("image", "manga", "manga17_02.png")

    # 1. 記事紹介 (親)
    parent_text = """フォッフォッフォ！会社が潰れるのは「赤字だから」だと思っておらんかの？

実は、利益たっぷりの黒字でも明日突然倒産する「黒字倒産」の罠があるのじゃ！

なぜ人気店が急に破産するのか、今さら聞けない借金と現金の冷酷な仕組みをnoteに書いたぞい！👇
#黒字倒産 #資金ショート #note"""

    # 2. 記事のURL (リプ1)
    reply1_text = """コロナ禍では、多くの企業が補助金や実質無利子・無担保の「ゼロゼロ融資」で延命しておった。

しかし返済が本格化した今、資金繰りが限界を迎えるコロナ後遺症倒産が激増しておる。

今さら聞けない倒産と現金の仕組みはこちら！👇
https://note.com/kabu_teacher/n/nf2148d34de0c"""

    # 3. 関連記事の紹介 (リプ2)
    reply2_text = """▼こちらもおすすめ！
普通の個人口座がマネーロンダリングの中継ハブに狙われる！？
口座売買や送金バイトに潜む冷酷な闇の解説記事はこちら👇
https://note.com/kabu_teacher/n/nfe053ee5b4dd"""

    # 文字数検証
    p_pts = count_twitter_points(parent_text)
    r1_pts = count_twitter_points(reply1_text)
    r2_pts = count_twitter_points(reply2_text)
    print(f"📊 note紹介 - 親: {p_pts}pts, リプ1: {r1_pts}pts, リプ2: {r2_pts}pts")
    if p_pts > 280 or r1_pts > 280 or r2_pts > 280:
        print("❌ エラー: 文字数制限(280pts)を超えています。")
        return False

    # メディアアップロード
    media_id = upload_media(note_img)
    if not media_id:
        print("❌ note画像のアップロードに失敗しました。")
        return False
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 親投稿
    tweet_id_p = post_tweet(parent_text, media_id)
    if not tweet_id_p:
        print("❌ 親ポストの送信に失敗しました。")
        return False
    print(f"✅ 親ポスト送信成功! Tweet ID: {tweet_id_p}")
    time.sleep(3)

    # リプ1投稿
    tweet_id_r1 = post_reply(tweet_id_p, reply1_text)
    if not tweet_id_r1:
        print("❌ リプライ1の送信に失敗しました。")
        return False
    print(f"✅ リプライ1送信成功! Reply 1 ID: {tweet_id_r1}")
    time.sleep(3)

    # リプ2投稿
    tweet_id_r2 = post_reply(tweet_id_r1, reply2_text)
    if not tweet_id_r2:
        print("❌ リプライ2の送信に失敗しました。")
        return False
    print(f"✅ リプライ2送信成功! Reply 2 ID: {tweet_id_r2}")

    # 履歴記録
    full_text = f"{parent_text}\n\n[Reply 1]\n{reply1_text}\n\n[Reply 2]\n{reply2_text}"
    log_post_to_history(
        category="note_promo",
        text=full_text,
        media_path=note_img,
        status="success",
        tweet_id=tweet_id_p
    )
    return True

def main():
    manga_ok = publish_manga_thread_3step()
    time.sleep(5)
    note_ok = publish_note_thread_3step()
    
    if manga_ok and note_ok:
        print("\n🎉 すべての3段階スレッド投稿（マンガ ＆ note）が正常に完了しました！")
    else:
        print("\n⚠️ 一部の投稿に失敗した可能性があります。ログを確認してください。")

if __name__ == "__main__":
    main()
