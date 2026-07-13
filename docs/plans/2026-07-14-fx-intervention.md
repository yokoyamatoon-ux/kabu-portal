# FX Intervention Column 045 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create, validate, build, and deploy the new FX Intervention column (Column 45) to the live site okane-no-manabi.jp.

**Architecture:** Use PIL/Pillow to convert the user's JPEG eyecatch to PNG. Prepend the new column data to the root `data/columns.json` file. Use a custom Python validation script for TDD checks (schema, persona, forbidden bold markers). Run the deployment script which automatically rebuilds the dynamic sitemap and static Next.js pages and uploads the files to the XServer FTP host.

**Tech Stack:** Next.js (SSG), JSON, Python, PIL/Pillow, FTP

---

### Task 1: Convert and Place Column Eyecatch Image

**Files:**
- Create: `scratch/convert_column_045_image.py`
- Create: `image/column/Column20260714.png`
- Create: `web-next/public/images/column/Column20260714.png`

**Step 1: Write conversion script**

Write `scratch/convert_column_045_image.py`:
```python
import os
from PIL import Image

src_path = r"D:\Antigravity\Kabu\manga\column\Column20260714.jpeg"
dst_paths = [
    r"D:\Antigravity\Kabu\image\column\Column20260714.png",
    r"D:\Antigravity\Kabu\web-next\public\images\column\Column20260714.png"
]

print("Converting JPEG to PNG...")
if os.path.exists(src_path):
    with Image.open(src_path) as img:
        for dst in dst_paths:
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            img.save(dst, "PNG")
            print(f"Saved: {dst}")
else:
    print(f"Error: Source image not found at {src_path}")
```

**Step 2: Run conversion script**

Run: `python scratch/convert_column_045_image.py`
Expected: Outputs "Saved: ..." and creates the target PNG files.

---

### Task 2: Create validation test script and verify failure

**Files:**
- Create: `scratch/test_column_045_data.py`
- Modify: `data/columns.json` (verification target)

**Step 1: Write the validation test**

Write `scratch/test_column_045_data.py`:
```python
# -*- coding: utf-8 -*-
import json
import os
import sys

def test_column_045():
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
        
    col = next((x for x in data if x.get('id') == 'col_045'), None)
    assert col is not None, "col_045 not found in columns.json"
    
    assert col['date'] == '2026.07.14'
    assert col['category'] == '最新ニュース解説'
    assert col['category_color'] == '#E67E22'
    assert col['image'] == '/images/column/Column20260714.png'
    assert col['reading_time'] == 6
    
    body = col['body']
    assert '**' not in body, "Double asterisks ** should not be used in column body"
    
    assert 'マネ太：「' in body
    assert 'ミライ：「' in body
    assert 'カブ先生：「' in body
    
    # Check key terms
    assert '為替介入' in body
    assert '160' in body
    assert '防衛戦' in body
    assert '金利差' in body
    assert 'スタビライザー' in body
    assert '外為特会' in body or '特別会計' in body
    
    # Verify related links
    related_ids = [x['id'] for x in col['related_contents']]
    assert 'col_044' in related_ids
    assert 'col_032' in related_ids
    assert 'col_019' in related_ids
    
    # Verify related links format (trailing slash)
    for link in col['related_links']:
        assert link['url'].endswith('/'), f"URL {link['url']} must have trailing slash"
        
    print("Column 45 test passed successfully!")

if __name__ == '__main__':
    test_column_045()
```

**Step 2: Run test to verify it fails**

Run: `python scratch/test_column_045_data.py`
Expected: FAIL with "col_045 not found in columns.json"

---

### Task 3: Add col_045 JSON data to columns.json

**Files:**
- Modify: `data/columns.json`

**Step 1: Write minimal implementation**

Prepend the JSON data of `col_045` at the top of the array in `data/columns.json`:
```json
  {
    "id": "col_045",
    "date": "2026.07.14",
    "category": "最新ニュース解説",
    "category_color": "#E67E22",
    "title": "【為替介入の罠】160円防衛戦の限界をカブ先生が徹底解説！",
    "lead": "ドル円相場が一時1ドル160円を突破し、市場では165円到達の懸念さえ囁かされています。政府・日銀は月間11.7兆円規模という過去最大級の為替介入を行いましたが、その効果は一時的なものにとどまっています。今回は、円安を阻止するための「防衛戦」としての為替介入の仕組みと、日米金利差という根本的要因が変わらない中での介入の限界について、カブ先生がスリリングに解説するぞ！",
    "image": "/images/column/Column20260714.png",
    "reading_time": 6,
    "definition": "為替介入（外国為替平衡操作）とは、政府や中央銀行などの通貨当局が外国為替市場で通貨を売買し、為替相場の急激な変動を抑えて安定化を図る政策です。（出典：財務省）",
    "body": "## ドル円160円突破と日銀11兆円の防衛戦\n\nマネ太：「カブ先生！大変っす！ドル円相場が一時1ドル160円を突破しちゃったっすよ！政府と日銀が月間で11兆円以上も実弾介入（為替介入）して必死に防衛戦をやったのに、なんでまたすぐに円安に戻ってきちゃうんすか！？」\n\nミライ：「ニュースでは過去最大級の為替介入と報じられていましたが、これほどの資金を投じても相場を長期的に押し戻せないのはなぜなのでしょうか？」\n\nカブ先生：「フォッフォッフォ。落ち着くのじゃ、二人とも。まず理解しなければならんのは、為替介入の本質は相場トレンドを力づくで反転させることではないのじゃ。急激な変動（ボラティリティ）を一時的に抑え込み、市場を落ち着かせるスタビライザー（安全装置）の役割が本質なのだよ。」\n\nカブ先生：「投機的な動きによる急な相場下落に急ブレーキをかけることで、輸入物価の急騰が急に家計を直撃するのを和らげる。言わば防波堤の役割を果たしておるのじゃな。」\n\n---\n\n## 介入資金の仕組みと「防衛の限界」\n\nミライ：「その為替介入の資金は、一体どこから出ているのですか？」\n\nカブ先生：「良い質問じゃ。資金の原資は、政府の特別会計である外国為替資金特別会計（外為特会）じゃよ。円安阻止の介入（円買い介入）のときは、国が保有するドル資産（米国債など）を市場で売却してドルを処分し、代わりに円を買い戻すことで実行されるのじゃ。」\n\nマネ太：「ドルの貯金があるなら、円安が止まるまで無限にドルを売って円を買い支えればいいじゃないっすか！」\n\nカブ先生：「そうはいかんのじゃよ、マネ太くん。ドルを買う介入（円売り介入）の時は政府短期証券などを発行して円を無限に作って売れるが、円を買う介入の時は手元にある外貨準備（ドル資産）を取り崩さねばならん。つまり、弾薬となるドル貯金には物理的な上限があるのじゃ。無限には続けられない、これがドル売り・円買い介入の絶対的な資金の限界じゃな。」\n\n---\n\n## 金利差という巨大な本流と個人の自衛\n\nミライ：「結局、日米の金利差という根本原因が変わらないと、どれだけ介入しても元のトレンドに戻ってしまうということですね。」\n\nカブ先生：「まさに見通しの通りじゃ！水が低いところから高いところへ流れるように、金利の低い日本円を売って金利の高い米ドルで持っておいた方が得という大局のファンダメンタルズ（基礎的条件）は変わらん。介入で一時的に円高に戻しても、日米の金利差という本流が変わらなければ、再び円売り圧力に押し流されてしまうのじゃ。」\n\nカブ先生：「投機筋はそうした限界を見透かして、165円といった次の水準を狙って仕掛けてくるのじゃ。我々個人としては、口先介入や実弾介入による一時的な為替の乱高下に惑わされず、大元の金利政策がどう変化していくかを注視し、ドル預金や外貨建資産による資産分散などで自己防衛に努めるべきじゃぞい！」",
    "conclusion": "為替介入は急激なショックを和らげるスタビライザーとしては機能しますが、日米金利差という根本的要因が変わらない限り、大局の円安トレンドを抑え続けるのは困難じゃ。我々も資産防衛の意識を持つ必要があるぞい！",
    "faq": [
      {
        "q": "為替介入で円安トレンドを完全に止めることはできないのですか？",
        "a": "介入は一時的に投機的な動きを抑えるためのスタビライザーであり、円安の主因である「日米金利差」という経済の根本（ファンダメンタルズ）が解消されない限り、トレンドそのものを反転させることは困難じゃ。"
      },
      {
        "q": "円安阻止のための「ドル売り・円買い介入」に資金的な限界はありますか？",
        "a": "ドルを売るためには政府（外為特会）が保有する外貨準備（ドル預金や米国債など）を取り崩す必要があり、これには物理的な上限がある。そのため、ドルを売る円買い介入は「無限には続けられない」という限界があるのじゃ。"
      },
      {
        "q": "「口先介入」と「レートチェック」の違いは何ですか？",
        "a": "口先介入は「過度な変動には断固たる措置をとる」と言葉で市場を警戒させるもの。レートチェックは、実際に日銀が銀行などの市場参加者に取引レートを問い合わせることで、実弾介入が近いことを市場に匂わせるシグナルじゃ。"
      }
    ],
    "tags": [
      "為替介入",
      "円安",
      "160円防衛戦",
      "外国為替平衡操作",
      "日米金利差"
    ],
    "related_contents": [
      {
        "id": "col_044",
        "type": "column"
      },
      {
        "id": "col_032",
        "type": "column"
      },
      {
        "id": "col_019",
        "type": "column"
      }
    ],
    "related_links": [
      {
        "text": "コラム【全東信破産の闇】負債1259億円で突然死！粉飾決算と中小店舗連鎖倒産の恐怖はこちら",
        "url": "/column/col_044/"
      },
      {
        "text": "コラム【金利と物価】「良いインフレ」と「悪いインフレ」の違いとは？日本の金利上昇が家計に与える影響はこちら",
        "url": "/column/col_032/"
      },
      {
        "text": "コラム【金利引き上げ】マイナス金利解除で住宅ローンや預金金利はどう動く？影響解説はこちら",
        "url": "/column/col_019/"
      }
    ]
  },
```

**Step 2: Run validation test to verify it passes**

Run: `python scratch/test_column_045_data.py`
Expected: PASS with "Column 45 test passed successfully!"

---

### Task 4: Rebuild, verify Sitemap, and Deploy

**Files:**
- Modify: `web-next/public/sitemap.xml` (automatically regenerated)
- Modify: `web-next/out/` (automatically built)

**Step 1: Run deployment pipeline**

Run: `python scripts/deploy_kabu.py`
Expected:
1. `generate_sitemap.py` runs and prints success.
2. `npm run build` runs and exits with code 0.
3. FTP uploads the modified files.

**Step 2: Verify dynamic sitemap output**

Run: `Get-Content web-next/public/sitemap.xml`
Expected: Confirm `<loc>https://okane-no-manabi.jp/column/col_045/</loc>` is present with trailing slash and lastmod is set to `2026-07-14`.

**Step 3: Commit and Push**

Run:
```bash
git add data/columns.json scripts/deploy_kabu.py
git commit -m "feat: add col_045 and integrate dynamic sitemap generation"
```
Expected: Commit success.
