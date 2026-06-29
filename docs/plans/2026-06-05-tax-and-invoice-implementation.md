# Consumption Tax and Invoice (Manga & Note) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Add Manga Episode 13 (Invoice & side-job dilemma) to the portal database and publish a connected history-focused consumption tax article on note.com.

**Architecture:** Append the new episode data to the canonical `data/manga.json` file. Generate a compliant Markdown draft for note.com in `scratch/`, validate it locally, and upload it via `note-mcp`'s Python fallback. Run the local deployment pipeline to sync assets, build, and deploy.

**Tech Stack:** Python 3.11/3.13, Next.js, note-mcp, FTP differential deploy

---

### Task 1: Add Manga Episode 13 to database

**Files:**
- Modify: `d:\Antigravity\Kabu\data\manga.json`

**Step 1: Write the minimal implementation**
Append the following JSON object to the end of the array in `data/manga.json` (remember to add a comma after the previous episode's closing bracket):

```json
  {
    "ep": 13,
    "title": "副業動画編集とインボイスの罠",
    "summary": "副業で動画編集を始めたマネ太。取引先からインボイス登録を求められ大慌て！インボイス登録のメリット・デメリットや、初心者向けの負担軽減策「2割特例」についてカブ先生が解説するぞ。",
    "tags": [
      "インボイス",
      "消費税",
      "副業"
    ],
    "related_contents": [
      {
        "type": "column",
        "id": "col_026"
      },
      {
        "type": "column",
        "id": "col_024"
      }
    ],
    "manga_pages": [
      "/manga/manabu/20260605/manabu_20260605_01.png",
      "/manga/manabu/20260605/manabu_20260605_02.png"
    ],
    "topic": "invoice",
    "commentary": [
      {
        "speaker": "maneta",
        "text": "動画編集の副業、絶好調っす！これで今月もガッポリ稼げるっすよ！ウヒョヒョ！",
        "emote": "normal"
      },
      {
        "speaker": "maneta",
        "text": "……って、取引先から『インボイスの登録番号を教えてほしい。ない場合は取引の見直しや値下げ交渉をさせていただく』ってメールが来たっす！インボイスって何っすか！？",
        "emote": "surprise"
      },
      {
        "speaker": "kabu",
        "text": "フォッフォッフォ！ついにマネ太くんのところにも来たか。それが『インボイス（適格請求書）』の壁じゃよ。",
        "emote": "normal"
      },
      {
        "speaker": "mirai",
        "text": "インボイスは、売り手が買い手に対して、正確な消費税率や消費税額を伝えるための請求書のことよ。",
        "emote": "normal"
      },
      {
        "speaker": "kabu",
        "text": "企業（クライアント）は、お主に支払った消費税を、自分が国に納める税金から差し引く（仕入税額控除）。じゃが、お主がインボイスを発行できない『免税事業者』だと、企業はその分を差し引けず、自腹で消費税を払う羽目になるのじゃ。だから企業は登録を求めてくるのじゃよ。",
        "emote": "normal"
      },
      {
        "speaker": "maneta",
        "text": "なーんだ！それならボクも今すぐインボイス登録すれば、取引先も喜んでハッピーっすね！",
        "emote": "normal"
      },
      {
        "speaker": "kabu",
        "text": "待て待て！ 登録するのは自由じゃが、登録した瞬間からお主は『課税事業者』となり、副業の売上にかかる消費税を自分で国に納める義務が発生するぞい。",
        "emote": "normal"
      },
      {
        "speaker": "maneta",
        "text": "ええっ！？登録したら、これまで免除されていた消費税を自分のポケットから払わなきゃいけないんすか！？手取りが減っちゃうっす！",
        "emote": "surprise"
      },
      {
        "speaker": "mirai",
        "text": "メリットは『法人顧客とこれまでの条件で取引を続けられること』。デメリットは『消費税の納税義務と、確定申告の事務負担が増えること』ね。",
        "emote": "normal"
      },
      {
        "speaker": "kabu",
        "text": "まあ、売上が少ない個人事業主向けには『2割特例』などの激変緩和措置（納税額を売上消費税の2割に抑える特例）もある。焦って登録する前に、取引先の状況や自分の売上規模を見極めるのじゃぞ！喝！！",
        "emote": "normal"
      }
    ],
    "summary_points": [
      "【インボイス登録のジレンマ】登録しないと法人顧客からの受注減少や値下げを迫られるリスクがあり、登録すると免税事業者であっても消費税の納税義務が発生する。",
      "【仕入税額控除の仕組み】企業が消費税を二重払いしないよう、仕入れ時に支払った消費税分を納税額から差し引くこと。インボイスがないとこの控除が使えない。",
      "【2割特例による救済】免税事業者からインボイス登録した人向けの負担軽減措置。売上にかかる消費税の2割分だけを納税すればよいため、税負担と事務作業を大幅に減らせる。"
    ],
    "faq": [
      {
        "q": "副業の年間売上が1000万円以下でも、インボイス登録は必要ですか？",
        "a": "法律上の強制ではありません。ただし、取引先が「課税事業者（消費税を納めている法人など）」である場合、インボイスがないと取引先の税負担が増えるため、登録を求められるケースが多いです。取引先が一般消費者のみ（個人のみ）の場合は、登録しなくても影響はありません。"
      },
      {
        "q": "インボイス登録をすると、どのような事務負担が増えますか？",
        "a": "年に1回、所得税の確定申告とは別に「消費税の確定申告」を行う必要があります。また、発行する請求書にインボイス登録番号（Tから始まる13桁の番号）や適用税率、消費税額を明記するなどの対応が必要になります。"
      },
      {
        "q": "2割特例はいつまで使えますか？",
        "a": "令和5年（2023年）10月1日の制度開始から令和8年（2026年）9月30日の属する課税期間まで適用可能です（現在も適用対象期間内です）。"
      }
    ],
    "description_long": "副業で動画編集やデザイン、ライティングなどの受託業務を始めた個人が最初に直面する大きな壁が『インボイス制度（適格請求書保存方式）』です。取引先の企業から登録を求められた際、どのように判断すればよいのか。登録した場合としない場合のメリット・デメリット、そして納税額を大幅に抑えることができる『2割特例』などの激変緩和措置について、マネ太と一緒に基本からわかりやすく学びましょう。"
  }
```

**Step 2: Run verification scripts to ensure JSON is valid**
Run: `uv run python scratch/check_episodes.py`
Expected: PASS (No JSON format errors)

**Step 3: Commit**
```bash
git add data/manga.json
git commit -m "feat: add manga episode 13 data"
```

---

### Task 2: Create Note.com Draft Article

**Files:**
- Create: `d:\Antigravity\Kabu\scratch\note_tax_and_invoice.md`

**Step 1: Write the content**
Create `d:\Antigravity\Kabu\scratch\note_tax_and_invoice.md` using the exact content:

```markdown
---
title: "【消費税とインボイスの真実】民主党政権の10%増税決定からインボイス制度開始までの歴史と、副業クリエイターにのしかかる税金の光と影"
eyecatch: "D:\\Antigravity\\Kabu\\web-next\\public\\manga\\manabu\\20260605\\manabu_20260605_01.png"
tags: ["インボイス", "消費税", "副業", "経済歴史", "お金の勉強"]
---

フォッフォッフォ！カブ先生じゃよ。

最近、副業を始める人が増えておるのう。教え子のマネ太くんも動画編集を始めたのじゃが、「先生！取引先からインボイスを登録しろって言われたっす！よく分からんけど、これって実質的な増税じゃないっすか！？」と大騒ぎしておった。

インボイス制度の開始に伴い、「なんでこんなに複雑で負担の重い制度が始まったのか」と疑問を持つのは当然じゃ。
今日は、かつて民主党政権下で決定された「消費税10%への増税」の歴史的経緯と、消費税という税金の根本的な仕組み（預かり金的性質と仕入税額控除）、そして現在のインボイスが我々個人クリエイターに与える影響について、フラットな目線で分かりやすく解説して進ぜよう！

---

## 1. そもそも消費税の仕組みとは？「預かり金」と「仕入税額控除」

インボイスを理解するには、まず消費税の正しい仕組みを知る必要があるのじゃ。

消費税は「間接税」と呼ばれる税金じゃ。税金を最終的に負担するのは消費者じゃが、国へ納税するのは事業者（お店やフリーランス）という仕組みじゃな。

例えば、お主が1,000円のサービスを提供し、100円の消費税を乗せて1,100円をクライアントから受け取ったとする。この100円は、お主の利益ではなく「一時的に預かっている税金」に過ぎんのじゃよ。

事業者は、受け取った消費税から、自分が仕入れ時に支払った消費税を差し引いて国に納める。これを「仕入税額控除（しいれぜいがくこうじょ）」と呼ぶ。
この仕組みがあるからこそ、流通の各段階で消費税が何重にも課税される「多重課税」が防がれておるのじゃ。

---

## 2. 民主党政権下の決断：消費税10%増税の歴史と当時の経済財政状況

では、この消費税率が「10%」にまで引き上げられることになったのはなぜか。その歴史的な決定がなされたのが、2012年の野田佳彦首相率いる民主党政権の時代じゃった。

当時、日本は急速に進む少子高齢化により、年金や医療、介護といった社会保障費が毎年1兆円規模で膨らみ続けておった。これらを賄う財源として、当時の民主・自民・公明の3党が合意したのが「社会保障と税の一体改革」じゃったのじゃ。

当時の情勢や財政状況をフラットに見つめると、主に以下のような背景があったと言われておる。

### 急激な社会保障費の増大と財源確保
高齢化社会を支えるための安定財源が必要じゃった。消費税は、所得税や法人税と比べて「景気の波に左右されにくく、税収が極めて安定している」という特徴がある。そのため、持続可能な社会保障制度を維持するための大黒柱として選ばれたわけじゃ。

### 財政赤字と国債の信用維持
当時、日本の国家債務は膨らみ続けており、国際的な格付け機関から日本国債の格下げが行われるなど、財政の健全性に対する信用の揺らぎが懸念されておった。増税の決定は、「日本は自力で財政再建を進める意思がある」という姿勢を国際市場に示すメッセージでもあったのじゃな。

### デフレ下の日本経済という懸念
一方で、当時は長期にわたる「デフレ」から脱却できていない時期でもあった。デフレ下での増税は個人消費を冷え込ませ、景気を一段と悪化させるという強い反論や懸念もあり、政治的にも極めて激しい議論が戦わされたのじゃ。

結果として、2012年6月に「民主・自民・公明」の3党合意が成立。消費税率を5%から8%、そして10%へと段階的に引き上げる法律が成立したのじゃ。その後、この法律に基づいて、2014年に8%へ、そして2019年に10%へと増税が実施されたのじゃよ。

---

## 3. なぜ「インボイス制度」が必要になったのか？

「消費税10%は分かったけれど、インボイスはなぜ必要なの？」と思うじゃろう。実は、その原因も「10%への増税」にあるのじゃ。

2019年に消費税が10%に上がった際、低所得者への配慮として、食料品や新聞などを対象に「軽減税率8%」が導入された。これにより、日本国内に「8%」と「10%」という2つの税率が混在することになったのじゃよ。

税率が複数あると、帳簿上で「どの取引が8%で、どれが10%なのか」を厳密に証明せねば、正しい納税額の計算ができなくなる。
そこで、「登録番号や適用税率、消費税額を正確に記載した証明書（＝インボイス）」を発行・保存し、仕入税額控除を適用するルール（インボイス制度）が必要になったのじゃな。

---

## 4. 副業クリエイターにのしかかるインボイスの光と影

インボイス制度が始まって最も影響を受けているのが、売上が1,000万円以下で消費税の納税を免除されていた「免税事業者（フリーランスや副業クリエイター）」じゃ。

動画編集の副業などをしている場合、以下のようなジレンマに直面することになる。

### インボイスに登録しない場合（免税事業者のまま）
- **影**: クライアント企業側の税負担が増えるため、「インボイスがないなら取引を控える」と判断されたり、消費税分の「値下げ」を求められたりするリスクがある。
- **光**: 面倒な消費税の申告作業はなく、これまでの手取りペースを維持できる。

### インボイスに登録する場合（課税事業者になる）
- **光**: クライアント企業は仕入税額控除を使えるため、これまで通りの条件で安心して取引を継続できる。新規の営業でも不利にならない。
- **影**: 売上の消費税を自分で納税せねばならず、手取りが目減りする。また、年1回の消費税の申告書作成という経理負担が増える。

### 救済策としての「2割特例」を活用する
インボイス制度開始に伴い、免税事業者から登録した人向けに「2割特例」という緩和措置が用意されておる。これは「売上にかかる消費税の2割分だけを納めればよい」という特例じゃ。
例えば、10万円の消費税を受け取っていた場合、納税額は2万円で済む。事務手続きも大幅に簡略化されるため、もし登録する場合は必ずこの特例を活用するのじゃぞい。

---

## もっと詳しく知りたい方へ

今回のテーマである「インボイスと副業のジレンマ」について、ワシのお金の学校ポータルサイトのマンガ解説コーナーで、マネ太の体験談を交えてさらに分かりやすく解説しておるぞ！

サイトでは、インボイス制度の基礎や2割特例の仕組みを、楽しく学べるマンガ形式でまとめておる。

▶ マンガ第13話「副業動画編集とインボイスの罠」はこちら
https://okane-no-manabi.jp/manga/13/

また、カブ先生のX（旧Twitter）では、日々変化する税金や投資のニュース、個人ができる防御策をわかりやすくつぶやいておるぞ。

▶ X（旧Twitter）はこちら
https://x.com/kabu_teacher

ルールを正しく知ることで、初めて自分のお金を守ることができる。うまい話や難しい法律に怯えず、一歩ずつ賢く学んでいくのじゃ。
フォッフォッフォ、それではまた次回じゃ！喝！！
```

**Step 2: Commit**
```bash
git add scratch/note_tax_and_invoice.md
git commit -m "feat: draft note article on tax and invoice"
```

---

### Task 3: Local Note Article Validation

**Files:**
- Modify: `d:\Antigravity\Kabu\scratch\verify_note_compliance.py`

**Step 1: Write the minimal implementation**
Add the new file `d:\\Antigravity\\Kabu\\scratch\\note_tax_and_invoice.md` to the `articles` list in `verify_note_compliance.py`.
Modify: `verify_note_compliance.py:79-84`
Target content:
```python
    articles = [
        "d:\\Antigravity\\Kabu\\data\\note_article_nisa_withdrawal.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_beauty_trap.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_insurance.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_kabu_news_20260604.md"
    ]
```
Replacement content:
```python
    articles = [
        "d:\\Antigravity\\Kabu\\data\\note_article_nisa_withdrawal.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_beauty_trap.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_insurance.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_kabu_news_20260604.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_tax_and_invoice.md"
    ]
```

**Step 2: Run verification script to check compliance**
Run: `uv run python scratch/verify_note_compliance.py`
Expected: PASS withperfect score for `note_tax_and_invoice.md`.

**Step 3: Commit**
```bash
git add scratch/verify_note_compliance.py
git commit -m "test: add tax and invoice note to compliance checker"
```

---

### Task 4: Upload Note.com Draft

**Files:**
- None (API invocation only)

**Step 1: Execute Python fallback command to upload**
Run:
```powershell
C:\Users\nanda\AppData\Local\Programs\Python\Python311\Scripts\uv.exe run --project C:\Users\nanda\Desktop\note-mcp python -Xutf8 -c "import asyncio; from note_mcp.server import note_create_from_file; res = asyncio.run(note_create_from_file.fn(r'd:\Antigravity\Kabu\scratch\note_tax_and_invoice.md')); print(res)"
```
Expected:
`✅ 下書きを作成しました` along with `記事ID` and `記事キー`. Note: Eyecatch upload might fail or succeed depending on API, which is a known warning.

---

### Task 5: Rebuild and Deploy Site

**Files:**
- None (Execution only)

**Step 1: Run deployment pipeline script**
Run: `uv run python scripts/deploy_kabu.py`
Expected: Succeeds and uploads built Next.js pages (differential upload).

**Step 2: Verify the manga page loads live**
Verify `https://okane-no-manabi.jp/manga/13/` displays the new manga, commentary, and summary points properly.
Also check that `https://okane-no-manabi.jp/manga/manabu/20260605/manabu_20260605_01.png` is accessible.
