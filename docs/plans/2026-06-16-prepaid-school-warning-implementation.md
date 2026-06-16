# Prepaid School Warning Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Add Money Secret Episode 19 (Prepaid AI School warning) to the portal database, deploy the updated site with new assets, and update the manga generation rule document.

**Architecture:** Append the new JSON entry to `data/money_secrets.json`, copy the user-supplied manga assets from `manga/urakane/20260616/` to the public public asset directories, write and execute a python test validator, and rebuild/deploy the Next.js static site.

**Tech Stack:** Next.js, Python, Git.

---

### Task 1: Update Manga Generation Rules

**Files:**
- Modify: `MD/LatestRule/5_manga_generation_rules.md`

**Step 1: Check existing rule**

Run `view_file` to confirm current lines:
`d:\Antigravity\Kabu\MD\LatestRule\5_manga_generation_rules.md`

**Step 2: Append rule**

Add the dialog positioning rule:
```markdown
- **複数話者の配置**: 2人が同じコマで会話する場合、先に話している方を右におき、それぞれ位置を指定する。
  - 例：
    - 右側にマネ太：「セリフ」（※先に喋る）
    - 左側にミライ：「セリフ」（※後に喋る）
```

**Step 3: Verify update**

Verify that the file is correctly updated via `view_file`.

**Step 4: Commit**

```bash
git add MD/LatestRule/5_manga_generation_rules.md
git commit -m "docs: add dialogue positioning rule to manga generation rules"
```

---

### Task 2: Copy and Place Manga Image Assets

**Files:**
- Source: `manga/urakane/20260616/urakane20260616-01.png`
- Source: `manga/urakane/20260616/urakane20260616-02.png`
- Create: `image/manga/urakane/urakane20260616_01.png`
- Create: `image/manga/urakane/urakane20260616_02.png`
- Create: `web-next/public/images/money_secret/urakane20260616_01.png`
- Create: `web-next/public/images/money_secret/urakane20260616_02.png`

**Step 1: Verify source files exist**

Run: `powershell -Command "Test-Path D:\Antigravity\Kabu\manga\urakane\20260616\urakane20260616-01.png"`
Expected: `True`

**Step 2: Copy files to canonical directories**

Run:
```powershell
Copy-Item D:\Antigravity\Kabu\manga\urakane\20260616\urakane20260616-01.png D:\Antigravity\Kabu\image\manga\urakane\urakane20260616_01.png
Copy-Item D:\Antigravity\Kabu\manga\urakane\20260616\urakane20260616-02.png D:\Antigravity\Kabu\image\manga\urakane\urakane20260616_02.png
Copy-Item D:\Antigravity\Kabu\manga\urakane\20260616\urakane20260616-01.png D:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260616_01.png
Copy-Item D:\Antigravity\Kabu\manga\urakane\20260616\urakane20260616-02.png D:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260616_02.png
```

**Step 3: Verify copies**

Run: `powershell -Command "Test-Path D:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260616_01.png"`
Expected: `True`

**Step 4: Commit**

```bash
git add image/manga/urakane/urakane20260616_*.png web-next/public/images/money_secret/urakane20260616_*.png
git commit -m "feat: add manga image assets for Episode 19"
```

---

### Task 3: Insert Episode 19 Data to money_secrets.json

**Files:**
- Modify: `data/money_secrets.json`
- Create/Run: `scratch/test_money_secrets_data.py`

**Step 1: Design JSON structure**

Prepare JSON entry for Episode 19 (prepend to array):
```json
    {
        "ep": 19,
        "title": "「前払いAI学校」の甘い誘惑 〜有名起業家AI学校とミュゼプラチナムに共通する『お金をもらってから考える』危ういモデル〜",
        "summary": "AI時代に乗り遅れまいと、有名起業家プロデュースのスクールへ1年分一括前払い（数十万円）で入会したマネ太。しかし突然「債務超過」の決算公告が出てネットは大炎上！社長は「前払いの前受収益があるから大丈夫」と説明しますが、そのモデルは過去に大混乱を招いた脱毛サロン「ミュゼ」と同じ危うい構造でした。カブ先生が前払いビジネスのリスクと自己防衛策を暴くぞ。",
        "tags": [
            "リスク",
            "注意喚起",
            "最新情報"
        ],
        "image_path": "/images/money_secret/urakane20260616_01.png",
        "thumbnail": "/images/money_secret/urakane20260616_01.png",
        "manga_pages": [
            "/images/money_secret/urakane20260616_01.png",
            "/images/money_secret/urakane20260616_02.png"
        ],
        "chat_html": "<div style=\"font-size: 0.8rem; color: #666; margin-bottom: 10px;\">※本ページには広告・アフィリエイトリンクが含まれます。</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ミライちゃん！ボク、最先端のAI時代に乗り遅れないために、有名起業家が共同創業した話題のAIスクールに1年分一括前払いで申し込んだっす！これでボクもAI使いになって業務効率化＆副業で爆益っす！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>ミライ：</b><br>1年分を一括で前払い！？AIスクールって受講料が数十万円もするでしょ。本当に大丈夫なの？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太（パニック）：</b><br>それが大変なんす！今朝スマホを見たら、そのスクールが債務超過の決算公告を出して大炎上してたっす！当期純損失が約1億円で純資産がマイナス1.3億円らしいっす！社長は「前払いの前受収益が2.3億円あるから資金不足じゃない」って説明してるけど、ボクの前払いしたお金とスクールは無事なんすか！？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>ミライ：</b><br>純資産がマイナスって、つまり会社が潰れたら払ったお金は戻ってこない「債務超過」状態じゃない。ネットでも「あの脱毛サロンの破産プロセスと同じ空気を感じる」って言われてるわよ。\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-evil\">\n<b>ウラ金さん：</b><br>ヒッヒッ……。有名人が関わってるから安心だと思ったかい？先に一括で大金を払わせるビジネスは、経営者にとって最高の資金調達さ。今すぐ上位のプラチナプランも一括前払いして、先行者利益を独り占めするさぁ！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>おお！さすがウラ金さん、ピンチはチャンスっすね！ボク、もっとお金を突っ込むっす！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>（喝！！）愚か者どもめ！悪魔の囁きに乗ってはならん！サービスを受ける前に大金を支払う「前払いモデル」の危うさを、何ひとつ理解しておらんな！\n</div>\n</div>\n\n<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} 「前受収益＝負債」のカラクリと自転車操業の闇\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>会計上の罠：</b> 前払いで受け取った受講料は、売上ではなく「前受収益」という「負債」じゃ。サービスを提供する義務を意味するからじゃな。先に手元に現金が入るため資金繰りは楽になるが、これは一種の「借金」と同じ。経営者が「後からサービスを整備すればいい」と甘え、派手な広告費やオフィス代に使い果たすと、たちまちサービス提供が不可能になる自転車操業の闇に陥るのじゃ。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ええっ！？前払いのお金って、会社の貯金じゃないんすか！？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>ミライ：</b><br>そうよ。将来サービスを届けるための預り金に過ぎないの。もしその現金を別の事業や経費に使い果たして債務超過になれば、運営が行き詰まった時に破産するしかなくなるわ。\n</div>\n</div>\n\n<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} 負債260億円超！脱毛サロン「ミュゼ」破産の末路\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>前払い大量集金の末路：</b> かつて美容業界を席巻した脱毛サロン「ミュゼプラチナム（運営会社MPHなど）」は、まさにこの「前払い大量集金モデル」で急成長した。しかし、解約による返金対応や、過剰な広告費で経営が悪化。最後は資金ショートし、負債総額はグループで約260億円に上って破産したのじゃ。多くの顧客が「お金を払い込んだのに施術を受けられず、返金もされない」という泣き寝入りの大混乱に陥った歴史があるのじゃよ。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-evil\">\n<b>ウラ金さん：</b><br>ゲゲッ！前払い金が消えて破産なんて聞いてないさぁ！危ないからずらかるさぁ……。\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ウラ金さん、逃げるの早すぎっす！カブ先生、ボクはどうすれば良かったんすか！？\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>うむ。特に変化が早く、人件費やサポート代がかかる「AI」や「プログラミング」のスクールにおいて、数十万もの前払い一括はリスクが高すぎる。高額な契約をする前に、以下の4つの自衛ポイントを必ず確認するのじゃ！\n</div>\n</div>\n\n<div style=\"background: #FFF9F0; border: 2px solid #FFE082; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n<div style=\"font-weight: 800; color: #E67E22; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n{{WARNING_ICON}} 前払いサービスを契約する前の「4つの自衛策」\n</div>\n<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #E67E22;\">\n<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n<b>1. 返金・解約ポリシーの明確さ</b><br>中途解約時に「日割りで確実に返金されるか」を規約で確認すること。返金不可や解約手数料が高額な場合は避けるべし。<br><br>\n<b>2. 運営会社の財務健全性（決算公告の確認）</b><br>すでに債務超過（純資産がマイナス）に陥っている企業は、いつサービス停止や倒産になってもおかしくない崖っぷち状態じゃ。<br><br>\n<b>3. サービスの提供コストと継続性</b><br>AIツール代や個別サポートの人件費など、ランニングコストが高いビジネスは破綻しやすい。「数ヶ月分」ならまだしも「1年分」の前払いは絶対避けるのじゃ。<br><br>\n<b>4. 少額（月額プランなど）で始められるか</b><br>いきなり一括大金を払わせることに固執し、月額プランがないスクールは、目先の資金繰り（キャッシュ）を優先している可能性が高いぞい。\n</div>\n</div>\n</div>\n\n<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-user\">\n<b>マネ太：</b><br>ひええ、一括前払いは、相手に自分の首を絞めるロープを渡しているのと同じっすね……。ボク、今回の件が片付いたら、次からは絶対に月額プランで様子を見るようにするっす！\n</div>\n</div>\n\n<div class=\"ura-chat-flex\">\n<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n<div class=\"ura-bubble ura-bubble-teacher\">\n<b>カブ先生：</b><br>フォッフォッフォ！その教訓を忘れてはならんぞ。「お金をもらってから考える」ビジネスは、最後はお客がババを引く構造になりがちじゃ。知識は最大の防御じゃぞ！喝！！\n</div>\n</div>\n\n<div style=\"background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;\">\n<div style=\"font-weight: 800; color: #2D3436; margin-bottom: 12px;\">📖 正しい知識で身を守るための「公式情報」</div>\n<ul style=\"font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;\">\n<li><b>官報・決算公告：</b> 企業の経営状況（貸借対照表）が年1回公表される場じゃ。債務超過かどうかは誰でも確認できるぞい。</li>\n<li><b>国民生活センター（美容医療・スクール契約トラブル）：</b> 前払い契約に関する相談やトラブル事例、解約時のルールについて多くの注意喚起が行われておる。</li>\n</ul>\n<div style=\"display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;\">\n<a href=\"https://www.kokusen.go.jp/\" target=\"_blank\" style=\"text-decoration: none;\">\n<div style=\"background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;\">🔗 国民生活センター：各種契約トラブル相談</div>\n</a>\n</div>\n</div>",
        "related_contents": [],
        "faq": [
            {
                "q": "前払い形式のスクールで債務超過になっている場合、どのようなリスクがありますか？",
                "a": "前払いで先に受け取った受講料（前受収益）は会計上「負債」であり、将来的にサービスを提供する義務を表します。債務超過の場合、もし新規受講生が減って資金繰りが行き詰まると、突然サービスが停止し、前払いしたお金が戻ってこない（泣き寝入りになる）リスクが極めて高いです。"
            },
            {
                "q": "前払いモデルと脱毛サロン「ミュゼプラチナム」の破産にはどのような共通点がありますか？",
                "a": "どちらも「サービス提供前に顧客から大金を集める」ビジネスモデルです。このモデルは先に手元に現金が入るため一見潤沢に見えますが、過剰な広告宣伝やコスト増加によって自転車操業に陥りやすく、最終的に資金ショートして突然倒産する（ミュゼは負債260億円超で破産）という同じ危うい構造を持っています。"
            },
            {
                "q": "高額な前払いサービスを利用する前に確認すべき自衛策は何ですか？",
                "a": "万一の際の返金・解約ポリシーが明確か、運営会社の財務健全性はどうか（決算公告の確認）、そしてそもそも「月額プラン」など少額から試せる選択肢がないかを確認することです。いきなり大金を人質に取られない契約を選ぶことが重要です。"
            }
        ]
    }
```

**Step 2: Prepend JSON entry to data/money_secrets.json**

Use `replace_file_content` or `multi_replace_file_content` on `data/money_secrets.json`.

**Step 3: Run the test validator**

Run Python test scripts:
`python scratch/test_money_secrets_data.py`
Expected: `True` or output confirmation.

**Step 4: Commit**

```bash
git add data/money_secrets.json
git commit -m "feat: add money secret Episode 19 entry"
```

---

### Task 4: Rebuild Static Pages and Verify

**Files:**
- Output: `web-next/out/`

**Step 1: Run local production build**

Run: `npm run build` from `web-next/` directory.
Expected: Build passes with no TypeScript or route generation errors.

**Step 2: Verify build logs**

Verify output code.

**Step 3: Commit build_log if changed**

```bash
git add web-next/build_log.txt (if applicable)
```

---

### Task 5: Deploy to Live Server and Verify Online

**Files:**
- Run: `scripts/deploy_kabu.py`

**Step 1: Execute deployment**

Run: `python scripts/deploy_kabu.py`
Expected: `--- Upload Complete! --- Site updated successfully.`

**Step 2: Read live URL content**

Use `read_url_content` for `https://okane-no-manabi.jp/money_secret/19/` and check for the correct title and dialogue strings.
Expected: Content loads with 200 OK.
