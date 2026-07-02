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
    """xurlコマンドを実行し、出力をパースして返す"""
    cmd = ["npx", "@xdevplatform/xurl", "--app", "Kabu_X"] + args
    print(f"Executing: {' '.join(cmd)}")
    
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", shell=True)
    
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

    cmd = ["npx", "@xdevplatform/xurl", "--app", "Kabu_X", "media", "upload", image_path]
    print(f"Executing: {' '.join(cmd)}")
    
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", shell=True)
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
        # JSON部分だけを正規表現で切り抜く
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
    """スレッドとして返信する"""
    args = ["reply", str(parent_id), text]
    res = run_xurl_command(args)
    return res is not None

def publish_manga_thread():
    print("\n========== 1. マンガ紹介スレッド投稿 ==========")
    manga_img = os.path.join("image", "manga", "manga17_01.png")
    
    parent_text = """フォッフォッフォ！「売上4億円の人気フィットネスジムが破産！？」と驚いておる者はおらんかの？

「売上があって黒字なら、会社は絶対に安全！」というマネ太の思い込みに喝じゃ！

実は利益があっても黒字倒産する罠があるのじゃ。解説するぞい！👇
#会社倒産 #黒字倒産 #マンガで学ぶ"""

    reply_text = """会社が潰れる本当の理由はただ一つ、「手元の現金（キャッシュ）が枯渇するから」じゃよ。

売上が入るまでの時間差の間に、仕入れや給料の支払いが重なると黒字でも資金ショートで即倒産じゃ！

マンガで学ぶ倒産と現金の仕組みはこちら！👇
https://okane-no-manabi.jp/manga/17/"""

    # 文字数検証
    p_pts = count_twitter_points(parent_text)
    r_pts = count_twitter_points(reply_text)
    print(f"📊 マンガ紹介 - 親ポスト: {p_pts}pts, 返信ポスト: {r_pts}pts")
    if p_pts > 280 or r_pts > 280:
        print("❌ エラー: 文字数制限(280pts)を超えています。")
        return False

    # メディアアップロード
    media_id = upload_media(manga_img)
    if not media_id:
        print("❌ マンガ紹介画像のアップロードに失敗しました。")
        return False
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 親投稿
    tweet_id = post_tweet(parent_text, media_id)
    if not tweet_id:
        print("❌ 親ポストの送信に失敗しました。")
        return False
    print(f"✅ 親ポスト送信成功! Tweet ID: {tweet_id}")
    time.sleep(3)

    # 返信投稿
    if not post_reply(tweet_id, reply_text):
        print("❌ 返信ポストの送信に失敗しました。")
        return False
    print("✅ 返信ポスト送信成功!")

    # 履歴記録
    log_post_to_history(
        category="manga_promo",
        text=f"{parent_text}\n\n[Thread Reply]\n{reply_text}",
        media_path=manga_img,
        status="success",
        tweet_id=tweet_id
    )
    return True

def publish_note_thread():
    print("\n========== 2. note紹介スレッド投稿 ==========")
    note_img = os.path.join("image", "manga", "manga17_02.png")

    parent_text = """フォッフォッフォ！会社が潰れるのは「赤字だから」だと思っておらんかの？

実は、利益たっぷりの黒字でも明日突然倒産する「黒字倒産」の罠があるのじゃ！

なぜ人気店が急に破産するのか、今さら聞けない借金と現金の冷酷な仕組みをnoteに書いたぞい！👇
#黒字倒産 #資金ショート #note"""

    reply_text = """コロナ禍では、多くの企業が補助金や実質無利子・無担保の「ゼロゼロ融資」で延命しておった。

しかし返済が本格化した今、資金繰りが限界を迎えるコロナ後遺症倒産が激増しておる。

今さら聞けない倒産と現金の仕組みはこちら！👇
https://note.com/kabu_teacher/n/nf2148d34de0c"""

    # 文字数検証
    p_pts = count_twitter_points(parent_text)
    r_pts = count_twitter_points(reply_text)
    print(f"📊 note紹介 - 親ポスト: {p_pts}pts, 返信ポスト: {r_pts}pts")
    if p_pts > 280 or r_pts > 280:
        print("❌ エラー: 文字数制限(280pts)を超えています。")
        return False

    # メディアアップロード
    media_id = upload_media(note_img)
    if not media_id:
        print("❌ note紹介画像のアップロードに失敗しました。")
        return False
    print(f"✅ 画像アップロード成功! Media ID: {media_id}")

    # 親投稿
    tweet_id = post_tweet(parent_text, media_id)
    if not tweet_id:
        print("❌ 親ポストの送信に失敗しました。")
        return False
    print(f"✅ 親ポスト送信成功! Tweet ID: {tweet_id}")
    time.sleep(3)

    # 返信投稿
    if not post_reply(tweet_id, reply_text):
        print("❌ 返信ポストの送信に失敗しました。")
        return False
    print("✅ 返信ポスト送信成功!")

    # 履歴記録
    log_post_to_history(
        category="note_promo",
        text=f"{parent_text}\n\n[Thread Reply]\n{reply_text}",
        media_path=note_img,
        status="success",
        tweet_id=tweet_id
    )
    return True

def main():
    manga_ok = publish_manga_thread()
    time.sleep(5)
    note_ok = publish_note_thread()
    
    if manga_ok and note_ok:
        print("\n🎉 すべてのスレッド投稿（マンガ ＆ note）が正常に完了しました！")
    else:
        print("\n⚠️ 一部の投稿に失敗した可能性があります。ログを確認してください。")

if __name__ == "__main__":
    main()
