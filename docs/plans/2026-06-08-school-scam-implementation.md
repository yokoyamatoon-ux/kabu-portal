# AI School Scam & Reskilling Subsidy Fraud (Episode 17) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create and deploy Episode 17 content package: copy manga assets to canonical paths, append Episode 17 data to `data/money_secrets.json`, draft a note article on AI school scams (without `**` bold markers), and rebuild and deploy the site.

**Architecture:** Copy user manga files from the staging folder to `image/manga/urakane/`. Prepend Episode 17 details to the arrays in `data/money_secrets.json`. Draft the note.com article in `scratch/note_school_scam.md` and validate using local verification checks before uploading via note-mcp. Rebuild Next.js and perform diff FTP upload.

**Tech Stack:** Next.js, Python 3.11, note-mcp, FTP Differential deploy

---

### Task 1: Copy Manga Assets
**Files:**
- Create: `d:\Antigravity\Kabu\image\manga\urakane\urakane20260608_01.png`
- Create: `d:\Antigravity\Kabu\image\manga\urakane\urakane20260608_02.png`

**Step 1: Write the minimal implementation**
Copy the drawn manga files from `d:\Antigravity\Kabu\manga\urakane\20260608\` to `d:\Antigravity\Kabu\image\manga\urakane\`.
In PowerShell:
```powershell
Copy-Item "d:\Antigravity\Kabu\manga\urakane\20260608\urakane20260608_01.png" "d:\Antigravity\Kabu\image\manga\urakane\urakane20260608_01.png"
Copy-Item "d:\Antigravity\Kabu\manga\urakane\20260608\urakane20260608_02.png" "d:\Antigravity\Kabu\image\manga\urakane\urakane20260608_02.png"
```

**Step 2: Run verification to check files exist**
Run: `Test-Path "d:\Antigravity\Kabu\image\manga\urakane\urakane20260608_01.png"`
Expected: `True`

**Step 3: Commit**
```bash
git add image/manga/urakane/urakane20260608_01.png image/manga/urakane/urakane20260608_02.png
git commit -m "feat: copy Episode 17 manga assets to canonical folder"
```

---

### Task 2: Append Episode 17 to Database
**Files:**
- Modify: `d:\Antigravity\Kabu\data\money_secrets.json`

**Step 1: Write the minimal implementation**
Insert the Episode 17 JSON object at the very beginning of the array in `data/money_secrets.json`.
JSON content to insert:
```json
    {
        "ep": 17,
        "title": "「実質無料」AIスクールの甘い罠とリスキリング補助金詐欺",
        "summary": "SNSで話題の「実質無料」や「キャッシュバック」をうたうAIオンラインスクール。その裏で横行するリスキリング補助金不正申請の闇と、受講生が負うべき全額返還と違約金の重い責任、さらにはAI学習の正しい向き合い方をカブ先生が解説するぞ。",
        "tags": [
            "リスク",
            "注意喚起",
            "詐欺",
            "最新情報"
        ],
        "image_path": "/images/money_secret/urakane20260608_01.png",
        "thumbnail": "/images/money_secret/urakane20260608_01.png",
        "manga_pages": [
            "/images/money_secret/urakane20260608_01.png",
            "/images/money_secret/urakane20260608_02.png"
        ],
        "chat_html": "<div style=\"font-size: 0.8rem; color: #666; margin-bottom: 10px;\">※本ページにはプロモーション（広告）が含まれます。</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ミライちゃん！これ見てよ！AIスクールが「実質無料」で受講できて、さらにお祝い金がもらえるっす！これでボクもAI使いになって大儲けっす！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>ミライ：</b><br>実質無料どころかお金がもらえるなんて怪しすぎるわ。国の補助金を悪用したグレーなビジネスじゃないの？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-evil\">\n<b>ウラ金さん：</b><br>ヒッヒッ……儲かれば正義さぁ。国の「リスキリング補助金」を申請して、受講料を国に肩代わりさせ、その一部をキックバックするのさぁ。受講履歴はウチが偽造してあげるから、名前を貸すだけでいいさぁ。自己責任さぁ。\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>（喝！！）コラコラコラ！悪魔の甘い囁きに乗ってはならん！それは国の補助金をだまし取る立派な「給付金詐欺」であり、お主は詐欺の共謀者になってしまうのじゃ！\n</div>\n</div>\n\n<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} リスキリング補助金詐欺のカラクリ\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>不正受給の手口：</b> 本来はキャリアアップのために受講する「リスキリング支援事業」の補助金（最大70%）を悪用。受講する意思がない人に「キャッシュバック」や「お祝い金」を提示して勧誘し、受講履歴を偽造して国に申請する手口じゃ。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ひえええ！ボクまで詐欺の仲間入りなんて嫌っす！でも、本当にそんな不正があるんすか？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>ミライ：</b><br>ええ、実際に「エッグフォワード」という会社が、約20億円規模の不適切な補助金申請をしていたとして行政処分や刑事告訴の動きがあるニュースが大きく報じられたわ。\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>そうじゃ。さらに、不正受給が発覚した場合、甘い話に乗った受講生個人に対しても極めて重いペナルティが下されるのじゃ！\n</div>\n</div>\n\n<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} 不正受給者に下る「3つの重い責任」\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>1. 全額の一括返還命令</b><br>国から支給された補助金（受講料の大部分）について、全額を一括返還するよう命令が下るのじゃ。手元に戻ったキックバックの額とは無関係に、申請された全額の返還を求められるため大損害になるぞ。<br><br>\n<b>2. 違約金（加算金）2割の上乗せ</b><br>返還すべき金額に対して、ペナルティとして20%（2割相当額）の違約金が上乗せされ、さらに延滞金も年利ベースで加算されていくのじゃ。<br><br>\n<b>3. 詐慢罪としての刑事訴追</b><br>名義貸しや虚偽の受講申請は立派な「詐慢罪」じゃ。「知らなかった」「業者に言われただけ」では済まされず、前科がつくリスクがあるのじゃよ。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-evil\">\n<b>ウラ金さん：</b><br>ゲゲッ……。国税や労働局の調査能力をナメちゃいけないねぇ。バレたら真っ先に会社を計画倒産させて逃げるだけさぁ、自己責任さぁ！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ひえええ！ウラ金さん、やっぱりトンズラする気満々じゃないっすか！でもカブ先生、真面目にAIを学びたい場合はどうすればいいんすか？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>うむ。そもそも、技術変化が凄まじいAI分野において、数ヶ月前の古い固定カリキュラムをスクールで学ぶこと自体が「時間の無駄」なのじゃ！\n</div>\n</div>\n\n<div style=\"background: #FFF9F0; border: 2px solid #FFE082; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #E67E22; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} AI時代に必要な「正しいリスキリング」\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #E67E22;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>1. 固定のカリキュラムはすぐ風化する</b><br>ChatGPTやClaude、Grokといった生成AIは週単位でアップデートされる。半年前の教材やプロンプト集はあっという間に陳腐化するため、高い授業料を払う価値は極めて低いのじゃ。<br><br>\n<b>2. AIの「使い方」はAI自身に聞くのが一番早い</b><br>「Claudeで〇〇を実行するプロンプトを書いて」「Grokでデータを整理する方法を教えて」と、AIに直接聞いて対話しながら実践するのが、最も早くて効率的な学習方法じゃ。<br><br>\n<b>3. 主体的に「キャッチアップする力（思考力）」が人的資本</b><br>誰かに教えてもらうのではなく、日々新しいツールや機能を自分で触って実験する「主体性」と、AIを使いこなして目の前の課題を解決する「思考力」こそが、AI時代を生き抜く最大のスキルなのじゃぞ。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>なるほどっす！スクールに高いお金を払う必要なんて全くなかったっすね。まずは無料プランからでも、ClaudeやGrokを自分の仕事の相棒として使い倒してみるっす！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>フォッフォッフォ！その通りじゃ。誰かに頼る依存体質から抜け出し、主体的に学ぶ習慣を身につけること。それこそが「知識は最大の防御」という言葉の真意なのじゃぞ。喝！！\n</div>\n</div>\n\n<div style=\"background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;\">\n<div style=\"font-weight: 800; color: #2D3436; margin-bottom: 12px;\">📖 正しい知識で身を守るための「公式情報」</div>\n<ul style=\"font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;\">\n<li><b>経済産業省：</b> リスキリングを通じたキャリアアップ支援事業について、正しい補助要件や悪質な事業者への注意喚起を行っておるぞ。</li>\n<li><b>厚生労働省：</b> 各種教育訓練給付制度や労働局による助成金不正受給の処分状況を随時公表しておる。</li>\n</ul>\n<div style=\"display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;\">\n<a href=\"https://reskilling.meti.go.jp/\" target=\"_blank\" style=\"text-decoration: none;\">\n<div style=\"background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;\">🔗 経済産業省：リスキリングキャリアアップ支援事業</div>\n</a>\n<a href=\"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/index.html\" target=\"_blank\" style=\"text-decoration: none;\">\n<div style=\"background: #D63031; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;\">🔗 厚生労働省：給付金・助成金不正受給について</div>\n</a>\n</div>\n</div>",
        "related_contents": [],
        "faq": [
            {
                "q": "リスキリング補助金でお祝い金がもらえるスクールは安全ですか？",
                "a": "極めて危険です。受講実態がないのに修了したことにして国から補助金を受け取り、その一部を還流（キックバック）する詐慢スキームの可能性があります。発覚した場合は受講生側にも重い返還義務やペナルティが科されます。"
            },
            {
                "q": "不正受給が発覚した場合、受講生はどうなりますか？",
                "a": "国から支給された補助金の全額一括返還命令に加え、2割の違約金（加算金）および延滞金が上乗せされます。また、虚偽申請の共謀者として詐慢罪で刑事訴追されるリスクもあります。"
            },
            {
                "q": "AI学習を始めたいのですが、高額スクールは本当に不要ですか？",
                "a": "不要です。AI技術は日進月歩で変化するため、固定のカリキュラムはすぐに陳腐化します。ClaudeやGrokなどの生成AIツールに直接使い方を質問し、実践しながら自分でキャッチアップする習慣をつけることが最も効率的です。"
            }
        ]
    },
```

**Step 2: Run verification to check JSON validity**
Run: `uv run python scratch/check_episodes.py`
Expected: PASS (and displays Ep 17 as the last/first element)

**Step 3: Commit**
```bash
git add data/money_secrets.json
git commit -m "feat: add Episode 17 money secrets JSON database entry"
```

---

### Task 3: Create Note.com Draft
**Files:**
- Create: `d:\Antigravity\Kabu\scratch\note_school_scam.md`

**Step 1: Write the minimal implementation**
Create `d:\Antigravity\Kabu\scratch\note_school_scam.md` with detailed content:
```markdown
---
title: "【AIスクールの闇】実質無料の甘い言葉に潜む「リスキリング補助金詐欺」の罠と、数十億円規模の不正実例から学ぶ自活の思考法"
eyecatch: "d:\\Antigravity\\Kabu\\image\\manga\\urakane\\urakane20260608_01.png"
tags: ["AIスクール", "リスキリング", "補助金詐欺", "お金の勉強", "自学自習"]
---

フォッフォッフォ！カブ先生じゃよ。

「AIを学んでリスキリングすれば、キャリアアップ間違いなし！しかも国の補助金で実質無料！」
最近、SNSやWEB広告でこのような甘い謳い文句をよく見かけるのう。

教え子のマネ太くんも「先生！受講するだけでお祝い金がもらえるAIスクールを見つけたっす！国がお金を出してくれるから実質タダで学べて、さらに儲かるなんて最高っす！」と目を輝かせておった。

じゃが、ちょっと待つのじゃ！
世の中に「実質無料どころか、受講するだけでお金がもらえる」なんて美味しい話が存在するわけがないじゃろう。その甘い罠の裏側には、国の制度を悪用した極めて悪質な給付金詐欺（助成金不正受給）のカラクリが潜んでおるのじゃ。

今日は、現在進行形でニュースを騒がせているリスキリング補助金不正の実態と、もし加担してしまった場合に受講生個人に下る恐ろしいペナルティ、そして「そもそもAI時代に高いお金を払ってスクールに行く必要があるのか？」という本質論について解説しよう！

---

## 1. 国の「リスキリング補助金」を悪用したキックバックスキームの罠

まず、なぜAIスクールを「実質無料」や「お祝い金付き」で提供できるのか、その裏側のビジネスモデルを説明しよう。

国（経済産業省）は個人のキャリアアップやDX推進を支援するため、「リスキリングを通じたキャリアアップ支援事業」などの制度を設けておる。これは、指定のスクールを受講して転職などの要件を満たすと、受講料の最大70%が国から補助されるという非常にありがたい制度じゃ。

しかし、この国の善意を悪用するグレーなスクール運営者が現れたのじゃな。彼らの手口は以下のようなものじゃ。

1. 「実質無料」「お祝い金10万円プレゼント」といった派手な広告で受講生を集める。
2. 実際には授業を受けさせず、あるいは極めて簡素な内容だけで「受講完了した」という虚偽の修了データを捏造する。
3. 受講生の名前（名義）を使って国に補助金の申請を行い、高額な受講料の70%を国からだまし取る。
4. だまし取った補助金の中から、最初に約束した「お祝い金」を受講生にキャッシュバック（還流）し、残りの大部分を事業者が暴利として懐に収める。

これが、いわゆる「還流（キックバック）ビジネス」のカラクリじゃ。受講生は「タダで勉強できてお小遣いももらえた」と喜ぶが、実態は「国の税金を騙し取る詐欺行為に名前を貸し、共謀者として加担させられている」状態なのじゃよ。

---

## 2. エッグフォワード社など「20億円規模」の不適切申請の実例

これは決して絵空事ではない。2026年に入り、まさにこの制度を悪用した大規模な不正が発覚し、世間を揺るがせておる。

大手キャリア支援ベンチャーである「エッグフォワード株式会社」が、リスキリング支援事業において約20億円規模の不適切な補助金申請を行っていたことが明らかになったのじゃ。同社は受講実態が不十分な申請を多数行っていたとされ、国から事業停止や補助金の返還請求などの厳しい行政処分を受ける動きが進んでおる。

テレビや大手メディアでも大々的に報道され、今後は警察による刑事事件としての捜査も視野に入っていると言われておるぞ。こうした「クリーンに見える大手企業」や「有名なベンチャー」であっても、裏では補助金を狙った不適切な運用が横行しているのが実態なのじゃ。

---

## 3. 「知らなかった」では済まない！受講生個人を襲う3つの地獄

「騙されただけ」「私は授業を受けろと言われた通りにしただけ」
もし不正受給が発覚したとき、受講生側がそう言い訳しても、国や法律は一切容赦してくれんのじゃ。甘い話に乗った代償として、以下の3つの地獄が待っておる。

### 全額の一括返還命令
国から事業者に対して出された補助金は、名義人である受講生に対しても「不当利得」として返還命令が下るリスクがあるのじゃ。お主が受け取ったのは数万円のキャッシュバックでも、国から請求されるのは「数十万円の受講料全額」の一括返還じゃ。

### 違約金2割の上乗せと延滞金
返還すべき金額に対して、一律20%の違約金が上乗せされるペナルティがある。さらに、実際に返還するまでの日数に応じて年利ベースの延滞金（加算金）が加算され続けるため、返済額は雪だるま式に膨れ上がるのじゃよ。

### 詐欺罪としての刑事処分
嘘の受講実績で国から金をだまし取る行為は、明確な「詐欺罪」じゃ。悪質なケースでは、名義を貸した受講生自身も詐欺罪の共犯として逮捕・起訴され、前科がつくという最悪の人生の破滅を迎える可能性がある。

「タダでお金がもらえる」という小遣い稼ぎの気持ちが、人生を棒に振る大借金と前科に化けるのじゃから、恐ろしいことこの上ないのう。

---

## 4. 本質論：そもそもAIスクールに行く必要がない理由

ここまで補助金詐欺の恐ろしさを語ってきたが、ワシが最も伝えたいのは別のことじゃ。
そもそも、真面目にAIを学びたいとしても、今の時代に高額なAIスクールに入る必要自体が「全くない」のじゃよ！

なぜなら、生成AIの進化速度は我々の想像を遥かに超えて速いからじゃ。

現在、ChatGPT、Claude、Grokといった高性能なAIは毎月のように劇的なアップデートを繰り返しておる。昨日まで「最新の高度なテクニック」と言われていたプロンプトや使い方が、今日新しい機能がリリースされた瞬間に「ボタン1つで自動化され、不要になる」ということが日常茶飯事の世界じゃ。

つまり、スクールが何ヶ月もかけて作った固定のカリキュラムや教材は、お主が受講し終える頃にはすでに「時代遅れのゴミ」になっておる可能性が極めて高いのじゃよ。そんなものに何十万円も払い、ましてや国の税金を掠め取るような危険を犯すなど、時間とお金の完全な無駄じゃ！

### 正しいAIの学び方：AIを相棒に自分で実践する

では、どうやってAIを学べばよいのか？答えは極めてシンプルじゃ。
「AIの使い方は、AI自身に直接聞いて実践する」のが一番早くて確実じゃ！

「Claudeでブログ記事の下書きを作るための最適なプロンプトを提案して」
「Grokを使ってExcelのデータをグラフ化する手順を教えて」
このように、自分でAIに質問を投げかけ、返ってきた回答を見ながら実際に手を動かす。上手くいかなければ「ここがエラーになったから修正して」とさらに壁打ちする。

この「自分で試行錯誤し、AIと共創しながら課題を解決するプロセス」そのものが、AI時代における最も本質的で最強のリスキリングなのじゃよ。

誰かが作った古い教科書をなぞるのではなく、日々新しいツールを自分で触り、変化を面白がってキャッチアップする「主体的な思考力」こそが、これからの時代に最大の武器となる人的資本なのじゃぞ！

---

## まとめ

「実質無料」や「キックバック」という甘い言葉の裏には、お主を犯罪の片棒に担ぎ上げようとする鋭い針が必ず隠されておる。

安易な近道や甘い話に惑わされず、まずは自分でChatGPTやClaudeを開き、簡単な質問から対話を始めてみるのじゃ。主体的に学び、正しい知識を身につけることこそが、自分のお金と未来を守る最大の防御になるのじゃぞ！

カブ先生のお金の学校ポータルサイトでは、このようなグレーなビジネスの裏事情をマンガで分かりやすく解説しておる。ぜひ覗いてみてほしいのう。

▶ マンガ第17話「実質無料AIスクールの罠と補助金不正」はこちら
https://okane-no-manabi.jp/money_secret/17/

また、ワシの公式X（旧Twitter）でも、日々のお金に関する防御策や最新の経済知識を発信しておるぞ。

▶ 公式X（旧Twitter）はこちら
https://x.com/kabu_teacher

それでは、また次回じゃ！フォッフォッフォ、喝！！
```

**Step 2: Commit**
```bash
git add scratch/note_school_scam.md
git commit -m "feat: draft Note article on AI school scam without bold markers"
```

---

### Task 4: Local Note Article Validation
**Files:**
- Modify: `d:\Antigravity\Kabu\scratch\verify_note_compliance.py`

**Step 1: Write the minimal implementation**
Append `"d:\\Antigravity\\Kabu\\scratch\\note_school_scam.md"` to the `articles` list in `verify_note_compliance.py`.
Modify: `verify_note_compliance.py:79-85`
Target content:
```python
    articles = [
        "d:\\Antigravity\\Kabu\\data\\note_article_nisa_withdrawal.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_beauty_trap.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_insurance.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_kabu_news_20260604.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_tax_and_invoice.md"
    ]
```
Replacement content:
```python
    articles = [
        "d:\\Antigravity\\Kabu\\data\\note_article_nisa_withdrawal.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_beauty_trap.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_insurance.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_kabu_news_20260604.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_tax_and_invoice.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_school_scam.md"
    ]
```

**Step 2: Run verification script to check compliance**
Run: `uv run python scratch/verify_note_compliance.py`
Expected: PASS with perfect score for `note_school_scam.md` (no errors, no warnings).

**Step 3: Commit**
```bash
git add scratch/verify_note_compliance.py
git commit -m "test: add school scam note to compliance checker list"
```

---

### Task 5: Upload Note.com Draft
**Files:**
- None (API invocation only)

**Step 1: Execute Python fallback command to upload**
Run:
```powershell
C:\Users\nanda\AppData\Local\Programs\Python\Python311\Scripts\uv.exe run --project C:\Users\nanda\Desktop\note-mcp python -Xutf8 -c "import asyncio; from note_mcp.server import note_create_from_file; res = asyncio.run(note_create_from_file.fn(r'd:\Antigravity\Kabu\scratch\note_school_scam.md')); print(res)"
```
Expected:
`✅ 下書きを作成しました` along with `記事ID` and `記事キー`.

---

### Task 6: Rebuild and Deploy Site
**Files:**
- None (Execution only)

**Step 1: Run deployment pipeline script**
Run: `uv run python scripts/deploy_kabu.py`
Expected: Succeeds and uploads built Next.js pages (differential upload).

**Step 2: Verify the money secret page loads live**
Verify `https://okane-no-manabi.jp/money_secret/17/` displays the new manga, commentary, and summary points properly.
Also check that `https://okane-no-manabi.jp/images/money_secret/urakane20260608_01.png` is accessible.
