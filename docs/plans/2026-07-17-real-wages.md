# Real Wages Column 048 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create, validate, build, and deploy the new Real Wages column (Column 48) to the live site okane-no-manabi.jp.

**Architecture:** 
1. Generate the eyecatch illustration using the image generation tool.
2. Prepend the new column data to the root `data/columns.json` file.
3. Run a custom Python validation script for TDD checks (schema, persona, forbidden bold markers, trailing slashes in related links).
4. Run the deployment script which automatically rebuilds the dynamic sitemap and static Next.js pages and uploads the files to the XServer FTP host.

**Tech Stack:** Next.js (SSG), JSON, Python, FTP, Image Generation

---

### Task 1: Generate and place the Eyecatch Image

**Files:**
- Create: `image/column/Column20260717.png`

**Step 1: Generate the image**

Run image generation with prompt:
`Image 1 (Kabu-sensei) and Image 2 (Maneta) are studying economics together. Maneta holds a paycheck looking confused, while Kabu-sensei holds a pointer showing a board with salary charts going up but consumer price indexes going up faster. Anime style, high quality, colorful financial portal eyecatch.`

Save the generated image to `image/column/Column20260717.png`.

---

### Task 2: Create validation test script and verify failure

**Files:**
- Create: `scratch/test_column_048_data.py`
- Modify: `data/columns.json` (verification target)

**Step 1: Write the validation test**

Write `scratch/test_column_048_data.py`:
```python
# -*- coding: utf-8 -*-
import json
import os
import sys

def test_column_048():
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    json_path = 'data/columns.json'
    assert os.path.exists(json_path), f"{json_path} does not exist"
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    col = next((x for x in data if x.get('id') == 'col_048'), None)
    assert col is not None, "col_048 not found in columns.json"
    
    assert col['date'] == '2026.07.17'
    assert col['category'] == '最新ニュース解説'
    assert col['category_color'] == '#E67E22'
    assert col['image'] == '/images/column/Column20260717.png'
    assert col['reading_time'] == 6
    
    body = col['body']
    assert '**' not in body, "Double asterisks ** should not be used in column body"
    
    assert 'マネ太：「' in body
    assert 'ミライ：「' in body
    assert 'カブ先生：「' in body
    
    # Check key terms
    assert '実質賃金' in body
    assert '消費者物価指数' in body
    assert '平均値の罠' in body
    assert '労働時間' in body
    assert '生産性' in body
    
    # Verify related links
    related_ids = [x['id'] for x in col['related_contents']]
    assert 'col_047' in related_ids
    assert 'col_046' in related_ids
    assert 'col_045' in related_ids
    
    # Verify related links format (trailing slash)
    for link in col['related_links']:
        assert link['url'].endswith('/'), f"URL {link['url']} must have trailing slash"
        
    print("Column 48 test passed successfully!")

if __name__ == '__main__':
    test_column_048()
```

**Step 2: Run test to verify it fails**

Run: `.\.venv\Scripts\python.exe scratch/test_column_048_data.py`
Expected: FAIL with "col_048 not found in columns.json"

---

### Task 3: Add col_048 JSON data to columns.json

**Files:**
- Modify: `data/columns.json`

**Step 1: Write minimal implementation**

Prepend the JSON data of `col_048` at the top of the array in `data/columns.json`:
```json
  {
    "id": "col_048",
    "date": "2026.07.17",
    "category": "最新ニュース解説",
    "category_color": "#E67E22",
    "title": "【実質賃金の真実】統計の誤解と実感のズレをカブ先生が解説！",
    "lead": "2026年に入りプラス転換した「実質賃金」ですが、「生活が楽にならない」との声も。統計の「平均値の罠」や「労働時間の減少」など、データに基づき実質賃金にまつわる誤解をカブ先生がわかりやすく解きほぐすぞ！",
    "image": "/images/column/Column20260717.png",
    "reading_time": 6,
    "definition": "実質賃金とは、労働者が受け取った名目賃金（額面給与）から物価変動の影響を除いたもので、実際に購入できる物品やサービスの量（購買力）を示す指標です。（出典：厚生労働省）",
    "body": "## 実質賃金がプラスになったというニュース\n\nマネ太：「カブ先生！ニュースで『実質賃金が数ヶ月連続でプラスになった』って言ってたっす！これってボクたちの給料が実質的に上がって、生活が豊かになったってことっすか？」\n\nミライ：「確かに2026年に入ってから、1月が前年比プラス1.4パーセント、4月がプラス2.0パーセント近くなど、プラス基調が続いていますね。でも、ネットでは『生活はちっとも楽になっていない』『統計が嘘なんじゃないか』という不満や疑問もたくさん見かけます。」\n\nカブ先生：「フォッフォッフォ！大騒ぎじゃのう、マネ太くん。結論から言うと、統計の数値と個人の生活実感には大きなズレ（ギャップ）が生じるのが普通なんじゃよ。実質賃金の基本をおさらいしつつ、なぜそういう誤解が生まれるのかデータをもとに解きほぐしていこうかのう。」\n\nカブ先生：「まず基本じゃが、実質賃金とは、額面の給与である『名目賃金』から物価変動の影響（消費者物価指数＝CPI）を除いた、実際の購買力を表す指標のことじゃな。式にすると『実質賃金＝名目賃金÷物価指数』となる。名目賃金が前年比3パーセント増えても、物価が4パーセント上がっておれば、実質賃金はマイナス1パーセントとなり、生活実感としては苦しくなるのじゃ。」\n\n---\n\n## 誤解その1：実質賃金低下＝みんなの生活が悪化？\n\nマネ太：「でも先生、2025年まで4年連続で実質賃金はマイナスだったって聞いたっす。やっぱりみんな貧しくなってたんじゃないっすか？」\n\nカブ先生：「そこが第一の誤解、いわゆる『平均値の罠』じゃ。景気が回復して雇用が拡大すると、これまで働いていなかった主婦や高齢者、非正規のパートタイム労働者が新しく働き始める。これらの短時間労働者は平均より給与が低いため、新しく雇用が増えれば増えるほど、統計上の『労働者一人当たりの平均賃金』は押し下げられてしまうのじゃな。」\n\nミライ：「これを『構成変化』の効果と呼びます。第一生命経済研究所の永濱利廣氏の分析によると、2012年度から2021年度にかけて、日本の『一人当たり実質賃金』はマイナス4.9パーセントでしたが、パートタイム増加の影響を除いた『時間当たりの実質賃金』で計算し直すと、実はプラス2.0パーセント上昇し、過去最高を更新していたのです。」\n\nカブ先生：「その通りじゃ。だから『一人当たり平均』が下がっているからといって、すでにフルタイムで働いている個人の給与が下がっているとは限らん。個人の実感としては、定期昇給などで実質賃金が上がっている人も少なくないのじゃよ。」\n\n---\n\n## 誤解その2：原因は日本の生産性が低いから？\n\nマネ太：「日本の生産性が低いから給料が上がらないってよく言われるっすけど、それは関係ないっすか？」\n\nカブ先生：「それもよくある誤解じゃな。生産性も重要じゃが、日本の実質賃金を大きく押し下げてきた最大の主因は『労働時間の減少』じゃよ。働き方改革やパートタイム労働者の比率上昇によって、労働者一人当たりの労働時間は年々減少しておる。時間当たりの生産性が上がっていても、働く時間が短くなれば一人当たりの総支給額は増えにくいのじゃ。」\n\nミライ：「これもデータで証明されています。生産性の伸び自体は米国より緩やかですがユーロ圏よりは寄与しており、労働時間の短縮（過重労働抑制）が実質賃金総額の押し下げ要因になっているわけですね。」\n\nカブ先生：「うむ。さらに、2022年から2025年頃の激しい円安や食料・エネルギー高が物価を急上昇させたことで実質賃金が強く圧迫されたが、2026年に入って物価上昇が鈍化し、ようやくプラスに転じたのが現在の状況じゃ。国が統計を操作しているといった極端なデマに惑わされることなく、名目賃金を上げるためのスキルアップや、物価高に対抗する資産運用（NISAなど）で自衛することが何より大切じゃぞい！」\n",
    "conclusion": "実質賃金のプラス転換は良い兆候じゃが、パート増加による「平均値の罠」や「労働時間の短縮」など、統計の仕組みを正しく見極める必要がある。デマに惑わされず、生産性向上と自衛の運用に注力するのじゃぞい！",
    "faq": [
      {
        "q": "実質賃金がプラスになっても生活が楽にならないのはなぜですか？",
        "a": "統計上の実質賃金は「社会全体の平均値」だからじゃな。景気回復でパートやシニアなど比較的低賃金の短時間労働者が増えると平均が下がる「構成効果」があり、また個人の昇給タイミングともズレがあるため実感しにくいんじゃよ。"
      },
      {
        "q": "日本の実質賃金が長期的に伸び悩んでいる主因は何ですか？",
        "a": "最大の要因は「労働時間の減少」じゃ。働き方改革などで残業や労働時間が減ったため、一人当たりの総額が伸び悩んでいる。一方で「時間当たりの実質賃金」で見ると、実は過去最高水準を更新しておるなど、見方によって実態は異なるのじゃよ。"
      },
      {
        "q": "実質賃金を上げるためにはどのようなことが必要ですか？",
        "a": "個人や企業の生産性を高めること、そして名目賃金の持続的な上昇が不可欠じゃ。過度な労働時間短縮だけではなく、付加価値の高い仕事（生成AIの活用など）への投資や、安定したエネルギー供給による物価安定も重要じゃぞい。"
      }
    ],
    "tags": [
      "実質賃金",
      "毎月勤労統計",
      "消費者物価指数",
      "生活実感",
      "生産性"
    ],
    "related_contents": [
      {
        "id": "col_047",
        "type": "column"
      },
      {
        "id": "col_046",
        "type": "column"
      },
      {
        "id": "col_045",
        "type": "column"
      }
    ],
    "related_links": [
      {
        "text": "コラム【暗号資産が金融商品に？】金商法改正の「アメとムチ」を解説！はこちら",
        "url": "/column/col_047/"
      },
      {
        "text": "コラム【国債NISA化？】税優遇の真実と国債のキホンをカブ先生が解説！はこちら",
        "url": "/column/col_046/"
      },
      {
        "text": "コラム【為替介入の罠】160円防衛戦の限界をカブ先生が徹底解説！はこちら",
        "url": "/column/col_045/"
      }
    ]
  },
```

**Step 2: Run validation test to verify it passes**

Run: `.\.venv\Scripts\python.exe scratch/test_column_048_data.py`
Expected: PASS with "Column 48 test passed successfully!"

---

### Task 4: Rebuild, verify Sitemap, and Deploy

**Files:**
- Modify: `web-next/public/sitemap.xml` (automatically regenerated)
- Modify: `web-next/out/` (automatically built)

**Step 1: Run deployment pipeline**

Run: `.\.venv\Scripts\python.exe scripts/deploy_kabu.py`
Expected:
1. `generate_sitemap.py` runs and prints success.
2. `npm run build` runs and exits with code 0.
3. FTP uploads the modified files.

**Step 2: Verify dynamic sitemap output**

Run: `Get-Content web-next/public/sitemap.xml | Select-String "col_048"`
Expected: Confirm `<loc>https://okane-no-manabi.jp/column/col_048/</loc>` is present with trailing slash.

**Step 3: Commit and Push**

Run:
```bash
git add data/columns.json image/column/Column20260717.png
git commit -m "feat: add col_048 and rebuild site"
git push origin main
```
Expected: Commit and push success.
