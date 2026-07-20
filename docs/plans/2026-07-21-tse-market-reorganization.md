# TSE Market Reorganization Column 049 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create, validate, build, and deploy the new TSE Market Reorganization column (Column 49) to the live site okane-no-manabi.jp.

**Architecture:**
1. Generate the eyecatch illustration using the image generation tool.
2. Prepend the new column data to the root `data/columns.json` file.
3. Run a custom Python validation script for TDD checks (schema, persona, forbidden bold markers, trailing slashes in related links).
4. Run the deployment script which automatically rebuilds the dynamic sitemap and static Next.js pages and uploads the files to the XServer FTP host.

**Tech Stack:** Next.js (SSG), JSON, Python, FTP, Image Generation

---

### Task 1: Generate and place the Eyecatch Image

**Files:**
- Create: `image/column/Column20260721.png`

**Step 1: Generate the image**

Run image generation with prompt:
`Image 1 (Kabu-sensei) and Image 2 (Maneta) are studying stock market boards. Maneta holds a smartphone pointing to a board with 3 sections labeled Prime, Standard, and Growth. Kabu-sensei smiles and nods holding a pointer. Anime style, high quality, colorful financial portal eyecatch.`

Save the generated image to `image/column/Column20260721.png`.

---

### Task 2: Create validation test script and verify failure

**Files:**
- Create: `scratch/test_column_049_data.py`
- Modify: `data/columns.json` (verification target)

**Step 1: Write the validation test**

Write `scratch/test_column_049_data.py`:
```python
# -*- coding: utf-8 -*-
import json
import os
import sys

def test_column_049():
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
        
    col = next((x for x in data if x.get('id') == 'col_049'), None)
    assert col is not None, "col_049 not found in columns.json"
    
    assert col['date'] == '2026.07.21'
    assert col['category'] == '株式投資の基本'
    assert col['category_color'] == '#2ECC71'
    assert col['image'] == '/images/column/Column20260721.png'
    assert col['reading_time'] == 6
    
    body = col['body']
    assert '**' not in body, "Double asterisks ** should not be used in column body"
    
    assert 'マネ太：「' in body
    assert 'ミライ：「' in body
    assert 'カブ先生：「' in body
    
    # Check key terms
    assert '東証一部' in body
    assert 'プライム' in body
    assert 'スタンダード' in body
    assert 'グロース' in body
    assert 'ガバナンス' in body
    
    # Verify related links
    related_ids = [x['id'] for x in col['related_contents']]
    assert 'col_048' in related_ids
    assert 'col_047' in related_ids
    assert 'col_046' in related_ids
    
    # Verify related links format (trailing slash)
    for link in col['related_links']:
        assert link['url'].endswith('/'), f"URL {link['url']} must have trailing slash"
        
    print("Column 49 test passed successfully!")

if __name__ == '__main__':
    test_column_049()
```

**Step 2: Run test to verify it fails**

Run: `.\.venv\Scripts\python.exe scratch/test_column_049_data.py`
Expected: FAIL with "col_049 not found in columns.json"

---

### Task 3: Add col_049 JSON data to columns.json

**Files:**
- Modify: `data/columns.json`

**Step 1: Write minimal implementation**

Prepend the JSON data of `col_049` at the top of the array in `data/columns.json`:
```json
  {
    "id": "col_049",
    "date": "2026.07.21",
    "category": "株式投資の基本",
    "category_color": "#2ECC71",
    "title": "【東証再編】一部・二部からプライム・グロースへの変更と投資のコツ",
    "lead": "2022年の東証再編により、旧一部・二部・マザーズなどの区分は「プライム」「スタンダード」「グロース」へ移行しました。それぞれの違いや特徴、投資家目線での選び方のコツをカブ先生がわかりやすく徹底解説するぞい！",
    "image": "/images/column/Column20260721.png",
    "reading_time": 6,
    "definition": "東証の市場再編とは、東京証券取引所が2022年4月4日に従来の4つの市場区分（一部・二部・マザーズ・JASDAQ）を、持続的な企業価値向上を促す目的で「プライム」「スタンダード」「グロース」の3つの新市場区分に統合・再編した改革です。（出典：日本取引所グループ）",
    "body": "## 旧市場区分と2022年再編のニュース\n\nマネ太：「カブ先生！就職活動やニュースで『東証一部上場企業』って言葉をよく聞くっすけど、実は『東証一部』という名前の市場はもう無いって本当っすか？」\n\nミライ：「はい、それは本当ですよ。東京証券取引所は2022年4月4日に約30年ぶりとなる市場区分の再編を行いました。それまでの東証一部、二部、マザーズ、JASDAQという4つの区分を廃止して、現在は3つの新しい区分に移行しているのですよ。」\n\nカブ先生：「フォッフォッフォ！マネ太くんが知らんのも無理はない。企業PRなどでは、かつてのステータスを示すために今でも『旧東証一部上場』と名乗ることが多いからのう。じゃが、投資家としては現在の3つの市場である『プライム』『スタンダード』『グロース』の違いを正しく理解しておくことが極めて重要じゃぞい。」\n\n---\n\n## 新しい3つの市場区分とコンセプトの違い\n\nミライ：「再編後の3つの市場は、それぞれどのような位置づけになっているのでしょうか？」\n\nカブ先生：「極めてシンプルじゃ。それぞれのコンセプトを見ていこうかのう。」\n\nカブ先生：「まず『プライム市場』は、グローバルな投資家（海外の機関投資家など）をメインターゲットにした、日本を代表する大企業向けの市場じゃ。上場維持基準が最も厳しく、時価総額や高いガバナンス（企業統治）の体制が求められる。旧東証一部の企業の多くがここに属しておるな。」\n\nカブ先生：「次に『スタンダード市場』は、主に国内の投資家向けで、安定した事業基盤と十分な信頼性を持つ中堅企業向けの市場じゃ。ガバナンスも標準水準を求められ、日本経済の土台を支える優良企業が多く集まっておる。」\n\nカブ先生：「そして『グロース市場』は、高い成長可能性（ポテンシャル）を持つ新興・ベンチャー企業向けの市場じゃな。事業実績の規模はまだ小さくリスクは高いが、将来大きく化ける可能性を秘めた企業が揃っておる。旧マザーズなどがこれに相当するぞい。」\n\n---\n\n## 投資家目線での選び方のコツ\n\nマネ太：「なるほどっす！ボクたち個人投資家は、どの市場の株を狙えばいいんすか？」\n\nカブ先生：「お主の投資スタイル（性格や資金）によるぞい。安定した配当金や長期保有で着実に資産を増やしたいなら、日本を代表する大企業の揃う『プライム』が向いておる。また、他人がまだ気づいていない割安な優良中堅株を探し出したいなら、『スタンダード』をくまなく探すのが面白いじゃろうな。」\n\nカブ先生：「逆に、大きなリスクを取ってでも株価が2倍、3倍になるようなテンバガー（10倍株）候補を狙いたいなら、『グロース』の新興ハイテク株などが選択肢になる。じゃが、グロースは利益基準がないため赤字企業も多く、値動きが非常に激しい。初心者が全力で突っ込むと大火傷するから要注意じゃぞ。」\n\nミライ：「再編前と違って、現在は『上場維持基準』が非常に厳しくなったため、基準を下回った企業は市場から退場させられるリスクも高まっています。企業側も株価や株主還元をこれまで以上に意識せざるを得ない構造になっているのですね。」\n\nカブ先生：「その通りじゃ！だからこそ、単に有名な市場だからと安心せず、個別企業の業績やコーポレートガバナンスをしっかりチェックすることが大切なのだ。自分に合った市場を選び、賢く分散投資をするのじゃぞい！」",
    "conclusion": "東証の市場は「プライム（グローバル大企業）」「スタンダード（中堅安定）」「グロース（新興成長）」の3つに再編されたのじゃ。それぞれの特性を理解し、自分の投資方針に合った市場から個別銘柄を厳選するのじゃぞい！",
    "faq": [
      {
        "q": "東証一部や二部はいつ廃止されたのですか？",
        "a": "2022年4月4日に東証の大改革が行われ、旧一部・二部・マザーズ・JASDAQの4市場から、現在の「プライム」「スタンダード」「グロース」の3市場へ再編されたのじゃよ。"
      },
      {
        "q": "プライム、スタンダード、グロースの主な違いは何ですか？",
        "a": "プライムはグローバルな大企業向けで厳しい基準があり、スタンダードは国内の中堅安定企業向け、グロースは高い成長性を持つ新興・ベンチャー企業向けとなっておる。それぞれ株主数や時価総額の基準が異なるのじゃ。"
      },
      {
        "q": "投資家はどの市場の株を買えばいいのですか？",
        "a": "安定した配当や長期保有を目指すならプライム、隠れた優良株を探すならスタンダード、値動きは荒いが大化けを狙うならグロースが向いておる。自分のリスク許容度に合わせて選ぶのが基本じゃぞい。"
      }
    ],
    "tags": [
      "東証一部",
      "プライム市場",
      "スタンダード市場",
      "グロース市場",
      "市場再編"
    ],
    "related_contents": [
      {
        "id": "col_048",
        "type": "column"
      },
      {
        "id": "col_047",
        "type": "column"
      },
      {
        "id": "col_046",
        "type": "column"
      }
    ],
    "related_links": [
      {
        "text": "コラム【実質賃金の真実】統計の誤解と実感のズレをカブ先生が解説！はこちら",
        "url": "/column/col_048/"
      },
      {
        "text": "コラム【暗号資産が金融商品に？】金商法改正の「アメとムチ」を解説！はこちら",
        "url": "/column/col_047/"
      },
      {
        "text": "コラム【国債NISA化？】税優遇の真実と国債のキホンをカブ先生が解説！はこちら",
        "url": "/column/col_046/"
      }
    ]
  },
```

**Step 2: Run validation test to verify it passes**

Run: `.\.venv\Scripts\python.exe scratch/test_column_049_data.py`
Expected: PASS with "Column 49 test passed successfully!"

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

Run: `Get-Content web-next/public/sitemap.xml | Select-String "col_049"`
Expected: Confirm `<loc>https://okane-no-manabi.jp/column/col_049/</loc>` is present with trailing slash.

**Step 3: Commit and Push**

Run:
```bash
git add data/columns.json image/column/Column20260721.png
git commit -m "feat: add col_049 and rebuild site"
git push origin main
```
Expected: Commit and push success.
