# Manga 14 Article Extension and Content Policy Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** マンガ14話（Episode 14）の下部解説記事を実例付きの延長記事へ更新し、今後の記事作成ガイドラインを明文化する。

**Architecture:** 既存の `manga.json` のスキーマに沿って `description_long` 内に解説記事を記述し、新規コンテンツポリシー文書 `docs/plans/manga_content_policy.md` を作成する。Pythonスクリプトによる自動検証をTDD形式で実行する。

**Tech Stack:** JSON, HTML, Python, Next.js (npm), Git

---

### Task 1: Create Manga Content Policy Guideline

**Files:**
- Create: `docs/plans/manga_content_policy.md`

**Step 1: Write the guideline file**

Create the guideline file `docs/plans/manga_content_policy.md` with rules for case studies, sources, and translation artifact checks.

**Step 2: Verify the file is created**

Verify that the file is present in the filesystem.

**Step 3: Commit**

```bash
git add docs/plans/manga_content_policy.md
git commit -m "docs: add manga content policy guideline"
```

---

### Task 2: Create TDD Test Script for Manga Data Validation

**Files:**
- Create: `scratch/test_manga_data.py`

**Step 1: Write the test script**

Create `scratch/test_manga_data.py` which validates `data/manga.json` structure, checks Episode 10 integrity, and asserts Episode 14 contents (ensuring no `of`/`is` translation artifacts, and verifying McDonald's/Toshiba references).

```python
import json
import re

def test_manga():
    with open('data/manga.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    assert len(data) == 14, f"Expected 14 episodes, got {len(data)}"
    
    # Verify Ep 10 integrity
    ep10 = next(x for x in data if x.get('ep') == 10)
    assert "喝！！" in ep10['commentary'][5]['text']
    assert "description_long" in ep10
    assert "上場" in ep10['title']
    
    # Verify Ep 14 contents
    ep14 = next(x for x in data if x.get('ep') == 14)
    assert ep14['title'] == "不祥事と株価暴落の真実"
    assert ep14['topic'] == "stock_crash"
    
    desc = ep14['description_long']
    assert "日本マクドナルドHD" in desc
    assert "東芝" in desc
    assert "https://www.nikkei.com" in desc
    
    # Check for translation artifacts
    assert not re.search(r'\bof\b', desc), "Found English 'of' in Japanese text"
    assert not re.search(r'\bis\b', desc), "Found English 'is' in Japanese text"
    
    print("All tests passed successfully!")

if __name__ == '__main__':
    test_manga()
```

**Step 2: Run the test to verify it fails**

Run: `python scratch/test_manga_data.py`
Expected: FAIL (File fails to load or assertion error on length/Episode 14 absence)

**Step 3: Commit**

```bash
git add scratch/test_manga_data.py
git commit -m "test: add manga data validation script"
```

---

### Task 3: Implement Episode 14 Content and Repair Manga Data

**Files:**
- Modify: `data/manga.json`

**Step 1: Append Episode 14 to `data/manga.json`**

Append the correct Episode 14 object to the end of the JSON array in `data/manga.json`.

```json
    {
        "ep": 14,
        "title": "不祥事と株価暴落の真実",
        "summary": "持ってる株が不祥事で暴落！？その時どうするべきかをカブ先生が伝授するぞ！",
        "tags": [
            "株価暴落",
            "不祥事",
            "初心者",
            "損切り"
        ],
        "related_contents": [],
        "manga_pages": [
            "/manga/manabu/20260611/manabu_20260611_01.png",
            "/manga/manabu/20260611/manabu_20260611_02.png"
        ],
        "topic": "stock_crash",
        "commentary": [
            {
                "speaker": "maneta",
                "text": "ぎゃあー！カブ先生！ボクの持ってる株が不祥事のニュースで大暴落したっす！資産が半分になっちゃったっすよ！",
                "emote": "surprise"
            },
            {
                "speaker": "mirai",
                "text": "マネ太くん、落ち着いて。あのデータ改ざんのニュースね。でも、慌てて売る前に確認することがあるわ。",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "フォッフォッフォ！まずは冷静になるのじゃ、マネ太くん。株価が下がっても、売却せねば損失は確定せん。これは『含み損』という評価上の数字じゃ。一番やってはいけないのは、パニックになって売る『狼狽売り』じゃよ。",
                "emote": "normal"
            },
            {
                "speaker": "maneta",
                "text": "じゃあ、売らずにずっと待っていれば、いつか元に戻るっすか！？",
                "emote": "surprise"
            },
            {
                "speaker": "kabu",
                "text": "喝！！何でも待てば良いわけではない！判断基準は『その不祥事が、企業の稼ぐ力を根本的に壊すものか』じゃ。",
                "emote": "normal"
            },
            {
                "speaker": "mirai",
                "text": "一時的な問題（店舗の不始末など）ならビジネス自体は無事だから回復しやすいけれど、組織的な粉飾決算や製品の根幹に関わる不正だと、信用ゼロで最悪『上場廃止』もあり得るわね。",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "その通り！ビジネスモデルや信用が崩壊したなら、痛くても『損切り』をせねばさらに傷が広がるぞい。原因を冷静見極めるのじゃ。",
                "emote": "normal"
            },
            {
                "speaker": "maneta",
                "text": "焦って売る前に、原因が『一時的』か『致命的』か、企業の強みが残っているかを冷静に見極めるっす！",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "その通り！ピンチの時こそ、冷静な頭で投資と向き合うのじゃぞ。フォッフォッフォ！",
                "emote": "normal"
            }
        ],
        "summary_points": [
            "【含み損と確定損の違い】株価が下がっただけでは「含み損」。慌てて売る「狼狽売り」は避けよう。",
            "【一時的な不祥事】店舗の問題など、ビジネスの本質が壊れていなければ株価は戻りやすい。",
            "【致命的な不正】粉飾決算や組織的データ偽装は信用が失われ、最悪は上場廃止で紙切れになることも。",
            "【冷静な判断が鉄則】原因が「一時的」か「致命的」か、企業の強みが残っているかを見極めて判断しよう。"
        ],
        "faq": [
            {
                "q": "不祥事のニュースが出たとき、すぐに売った方がいいですか？",
                "a": "ニュース直後は市場が過剰に反応して株価が下がりすぎることがあります。焦って成行注文を出すのではなく、まずは企業の公式発表や事業への具体的な金銭的影響を確認し、一時的な問題か致命的な不正かを見極めてから判断しましょう。"
            },
            {
                "q": "「損切り」をする目安やルールはどう決めればいいですか？",
                "a": "「購入時の理由が崩れたとき」が最大の目安です。例えば「好業績が続く」と思って買った企業が「粉飾決算」を行っていた場合、前提が崩れたため即損切りを検討します。また、「株価が購入額から20%下がったら売る」といった数値ルールをあらかじめ決めておくのも有効です。"
            },
            {
                "q": "暴落して塩漬け（放置）になってしまった株はどうすればいいですか？",
                "a": "その企業に「将来的に復活する見込み（強み）」があるかどうかで判断します。もし成長ストーリーが描けないのであれば、放置せずに売却して他の有望な株に資金を移す方が、将来的に資産を増やす近道になることが多いです。"
            }
        ],
        "description_long": "<p>保有している企業の不祥事ニュースによる株価の急落は、投資家にとって最もショックな出来事の一つです。しかし、慌てて売る「狼狽（ろうばい）売り」は、最悪のタイミングで損失を確定させてしまう原因になります。まずは冷静に、その不祥事が企業の将来にどれほど深刻な影響を与えるかを見極める必要があります。</p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">【良い例（一時的な不祥事・V字回復）】日本マクドナルドHD（2702）：期限切れ肉問題</h3><p>2014年、仕入れ先工場による「期限切れ鶏肉」の使用問題が発覚し、ブランドイメージは著しく悪化しました。客足は遠のき、2015年12月期には過去最大となる約347億円の純損失を記録。株価も大きく下落しました。</p><p><strong>■ なぜ株価は復活したのか？</strong><br>一時的な信頼失墜は起きたものの、同社が持つ「全国の好立地な店舗網」や「強固なフランチャイズビジネス」といったビジネスモデルの根本的な強み（稼ぐ力）は崩壊していませんでした。その後、店舗の衛生管理の徹底、情報開示、メニュー刷新などを進め、顧客からの信頼を完全に取り戻したことで業績はV字回復し、数年後には株価も過去最高値を更新しました。</p><p><strong>■ Source（参考情報）：</strong><br>・<a href=\"https://www.nikkei.com/article/DGXMZO96365920Y6A110C1000000/\" target=\"_blank\" class=\"text-primary hover:underline\">日本経済新聞：マクドナルド、過去最大の赤字からどう脱却したか</a></p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">【悪い例（致命的な不正・損切り推奨）】東芝（旧：6502）：組織的な粉飾決算と上場廃止</h3><p>2015年、経営陣主導による「総額2000億円を超える不適切会計（粉飾決算）」が発覚しました。その後、米国原子力事業での巨額損失なども発覚し、深刻な債務超過に陥りました。</p><p><strong>■ なぜ致命的だったのか？</strong><br>粉飾決算は、市場との信頼関係の根底である「決算書」を偽造する行為であり、信頼は完全にゼロになりました。さらに、生き残るためにフラッシュメモリなどの主力事業（現キオクシア）を切り売りせざるを得なくなり、企業の「稼ぐ力（ビジネスモデル）」そのものが失われました。経営の迷走の末、2023年12月に上場廃止となり、投資家が市場で取引する手段は失われました。</p><p><strong>■ Source（参考情報）：</strong><br>・<a href=\"https://www.nikkei.com/article/DGXZQOUC1832F0Y3A211C2000000/\" target=\"_blank\" class=\"text-primary hover:underline\">日本経済新聞：東芝、上場廃止　74年の歴史に幕</a></p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">まとめ：投資家としての判断軸</h3><p>保有株の暴落に直面した際は、マンガでの学びをふまえ、次の2つの問いを自分に投げかけてみましょう。</p><ul class=\"list-disc pl-6 space-y-2\"><li><strong>「その問題で、将来にわたって顧客や取引先がゼロになるか？」</strong>（ビジネスモデルの崩壊か）</li><li><strong>「発表された決算書そのものに嘘があったか？」</strong>（投資前提である信頼の崩壊か）</li></ul><p>マクドナルドのように本質的な強みが健在であれば静観（ホールド）が報われる可能性が高いですが、東芝のように信頼と事業の核が崩壊した場合は、どんなに痛くても即座に損切り（売却）を行い、致命傷を避けるのが投資 of 鉄則じゃぞい。</p>"
    }
```

**Step 2: Run the test to verify it passes**

Run: `python scratch/test_manga_data.py`
Expected: PASS

**Step 3: Commit**

```bash
git add data/manga.json
git commit -m "feat: add Episode 14 data with real-world examples and source links"
```

---

### Task 4: Rebuild and Deploy the Site

**Files:**
- Modify: `data/manga.json` (indirectly affects the web build)

**Step 1: Run local site build**

Run: `npm run build` inside `web-next/` directory to generate Next.js static output.

**Step 2: Run deployment script**

Run: `python deploy_kabu.py` to synchronize and deploy.

**Step 3: Commit and push**

Verify build success and push the commits to remote main.
