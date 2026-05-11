"""
カブ先生 X 一括投稿スクリプト（Bot判定回避版）
- 投稿間隔をランダム化（ジッター）
- 1日あたり5ポスト
- 夜間（1:00〜6:00）は投稿しない
"""
import os
import time
import json
import random
import sys
from datetime import datetime
from requests_oauthlib import OAuth1Session

# Import robust config from modules
from modules.sns_config import get_env_robust

# WindowsでのUnicode出力エラー対策
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# ---------- 設定 ----------
INTERVAL_BASE_MIN = 25   # ベース間隔（分）
JITTER_MIN = 8           # ジッター幅（±分）→ 実質 17〜33分のランダム間隔
SKIP_ALREADY_POSTED = 1  # 既に投稿済みの数（先頭からスキップ）
MAX_RETRIES = 3          # 403エラー時のリトライ回数
RETRY_WAIT_MIN = 5       # リトライ待機（分）

# ---------- 認証 ----------
def get_oauth():
    ck = get_env_robust("KABU_X_CONSUMER_KEY")
    cs = get_env_robust("KABU_X_CONSUMER_SECRET")
    at = get_env_robust("KABU_X_ACCESS_TOKEN")
    ats = get_env_robust("KABU_X_ACCESS_TOKEN_SECRET")
    if not all([ck, cs, at, ats]):
        raise RuntimeError("KABU_X 環境変数が未設定です。システム環境変数を確認してください。")
    return OAuth1Session(ck, client_secret=cs,
                         resource_owner_key=at, resource_owner_secret=ats)

# ---------- 投稿関数 ----------
def post_tweet(oauth, text, label=""):
    now = datetime.now()
    print(f"\n{'='*50}")
    print(f"[{now.strftime('%H:%M:%S')}] 投稿中: {label}")
    print(f"{'='*50}")
    print(text[:120] + ("..." if len(text) > 120 else ""))
    print(f"(全{len(text)}文字)")

    for attempt in range(1, MAX_RETRIES + 1):
        resp = oauth.post(
            "https://api.twitter.com/2/tweets",
            json={"text": text}
        )

        if resp.status_code == 201:
            data = resp.json()
            tweet_id = data["data"]["id"]
            print(f">> 投稿成功! Tweet ID: {tweet_id}")
            return tweet_id
        elif resp.status_code == 403 and attempt < MAX_RETRIES:
            wait = RETRY_WAIT_MIN * 60
            print(f">> 403 Forbidden（試行{attempt}/{MAX_RETRIES}）。{RETRY_WAIT_MIN}分後にリトライ...")
            time.sleep(wait)
        elif resp.status_code == 429 and attempt < MAX_RETRIES:
            wait = RETRY_WAIT_MIN * 2 * 60
            print(f">> 429 Rate Limit（試行{attempt}/{MAX_RETRIES}）。{RETRY_WAIT_MIN*2}分後にリトライ...")
            time.sleep(wait)
        else:
            print(f">> 投稿失敗: {resp.status_code}")
            print(resp.text)
            return None
    return None

# ---------- 投稿内容（1日5本） ----------
TWEETS = [
    # --- 1. 格言つぶやき（リンクなし・軽め） ---
    {
        "label": "1. 格言つぶやき",
        "text": (
            "フォッフォッフォ。\n\n"
            "「暴落した日に買える者は、暴騰した日に浮かれぬ者じゃ。」\n\n"
            "相場が荒れると不安になるのは当然じゃ。"
            "だがの、不安の正体は『知らないこと』じゃ。\n\n"
            "知識という名の盾を持てば、嵐の中でもどっしり構えられるぞ。\n\n"
            "#カブ先生 #投資の勉強 #お金の学校 #株式投資"
        ),
    },
    # --- 2. テーマ型ダイアログ（インフレと貯金） ---
    {
        "label": "2. ダイアログ（インフレと貯金）",
        "text": (
            "【カブ先生の特別講座：貯金だけで大丈夫？】\n\n"
            "マネ太「先生！ボク堅実派っす！全部貯金してるっす！」\n\n"
            "カブ先生「ふむ…マネ太くん、100万円を10年前に貯金しておったとしよう。"
            "額面は100万円のまま。じゃが、卵もパンも値上がりしておろう？」\n\n"
            "マネ太「え…つまりボクのお金、目減りしてるってこと！？」\n\n"
            "カブ先生「その通りじゃ。インフレ率2%なら、10年で実質82万円の価値になる計算じゃぞ。"
            "『守る』だけでは守れん時代なのじゃ。フォッフォッフォ。」\n\n"
            "#カブ先生 #インフレ #貯金 #資産防衛 #お金の学校"
        ),
    },
    # --- 3. コンテンツ宣伝（ウラカネ漫画） ---
    {
        "label": "3. コンテンツ宣伝（ウラカネ漫画）",
        "text": (
            "【ウラ金の裏事情ファイル 連載中!】\n\n"
            "投資の「裏側」を暴くウラ金さんの連載マンガ、好評更新中じゃぞ！\n\n"
            "ウラ金「ヒッヒッ……甘い話には必ず裏がある。"
            "俺がその裏を全部バラしてやるよ。」\n\n"
            "マネ太「この人怖いっす……でも勉強になるっす！」\n\n"
            "高配当の罠、インサイダーの闇……知らなきゃカモにされるだけじゃぞ。\n\n"
            "カブ先生のお金の学校で読めるぞ!\n"
            "https://okane-no-manabi.jp\n\n"
            "#カブ先生 #ウラ金さん #投資マンガ #投資の闇 #お金の学校"
        ),
    },
    # --- 4. カスタム（イラン停戦と株価上昇） ---
    {
        "label": "4. 時事解説（イラン停戦と株価）",
        "text": (
            "【速報を読み解く：イラン停戦合意と株価上昇】\n\n"
            "マネ太「先生！イランの停戦ニュースで株がドーンって上がってるっす！"
            "今すぐ買うっす！」\n\n"
            "カブ先生「待つのじゃマネ太くん。"
            "地政学リスクの後退は確かに好材料じゃ。"
            "原油価格が落ち着き、輸送コスト低下の期待から市場が反応しておる。」\n\n"
            "マネ太「じゃあ買いっすよね！？」\n\n"
            "カブ先生「じゃが、停戦合意は"
            "『合意した』と『実行された』は別物じゃ。"
            "過去にも合意後に破談した例は山ほどある。\n\n"
            "急騰に飛びつくのではなく、"
            "『なぜ上がったか』を理解してから動くのじゃ。"
            "フォッフォッフォ。」\n\n"
            "#カブ先生 #イラン停戦 #株価上昇 #地政学リスク #投資の勉強 #お金の学校"
        ),
    },
    # --- 5. 夜の締め格言（リンクなし） ---
    {
        "label": "5. 夜の締め格言",
        "text": (
            "今日もお疲れさまじゃ。\n\n"
            "投資で一番大事なことは、"
            "「明日も市場に立てる状態でいること」じゃ。\n\n"
            "大きく勝つことより、退場しないこと。\n"
            "生き残った者だけが、複利の恩恵を受けられるのじゃぞ。\n\n"
            "今日学んだことを一つ、ノートに書いてから寝るのじゃ。\n"
            "フォッフォッフォ。おやすみ。\n\n"
            "#カブ先生 #投資の勉強 #お金の学校 #長期投資"
        ),
    },
]

# ---------- ジッター付き待機 ----------
def wait_with_jitter():
    jitter = random.randint(-JITTER_MIN, JITTER_MIN)
    wait_min = max(10, INTERVAL_BASE_MIN + jitter)  # 最低10分
    wait_sec = wait_min * 60
    print(f"\n>> 次の投稿まで {wait_min} 分待機します（ジッター: {jitter:+d}分）")
    start = time.time()
    while time.time() - start < wait_sec:
        remaining = int((wait_sec - (time.time() - start)) / 60) + 1
        print(f"   残り約 {remaining} 分...   ", end="\r")
        time.sleep(60)
    print()

# ---------- メイン ----------
def main():
    # 夜間チェック
    hour = datetime.now().hour
    if 1 <= hour < 6:
        print("夜間（1:00〜6:00）のため投稿を見送ります。")
        return

    oauth = get_oauth()
    results = []
    tweets_to_post = TWEETS[SKIP_ALREADY_POSTED:]

    print(f"投稿予定: {len(tweets_to_post)} 本（{SKIP_ALREADY_POSTED} 本スキップ済み）")
    print(f"間隔: {INTERVAL_BASE_MIN}分 ± {JITTER_MIN}分（ランダム）")

    for i, tweet in enumerate(tweets_to_post):
        tweet_id = post_tweet(oauth, tweet["text"], tweet["label"])
        results.append({
            "label": tweet["label"],
            "tweet_id": tweet_id,
            "time": datetime.now().isoformat(),
            "status": "success" if tweet_id else "failed",
        })

        # 最後の投稿以外はジッター付き待機
        if i < len(tweets_to_post) - 1:
            wait_with_jitter()

    # 結果サマリー
    print(f"\n{'='*50}")
    print("投稿結果サマリー")
    print(f"{'='*50}")
    for r in results:
        mark = "OK" if r["status"] == "success" else "NG"
        print(f"  [{mark}] {r['label']}  (ID: {r['tweet_id']}) @ {r['time'][:19]}")

    # ログ保存
    log_path = os.path.join(os.path.dirname(__file__), "post_log_today.json")
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nログ保存: {log_path}")

if __name__ == "__main__":
    main()
