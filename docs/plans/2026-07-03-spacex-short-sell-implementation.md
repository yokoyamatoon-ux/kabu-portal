# SpaceX株空売り急増コラム (col_039) 追加実装計画書

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** ポータルサイトに最新ニュースを解説する新規コラム `col_039` を追加し、本番サーバーへデプロイして表示を確認する。

**Architecture:** 
1. ユーザーが提供した JPEG アイキャッチ画像を Pillow (Python) で PNG に変換し、規定のディレクトリ（`image/column/` と `web-next/public/images/column/`）へ配置する。
2. 新規コラムのデータ整合性をアサートする TDD テストスクリプトを作成し、テストの失敗を確認する。
3. `data/columns.json` の先頭に設計済みの新規コラムオブジェクトを追記し、テストが通過することを確認する。
4. ローカルで Next.js をビルドし、`deploy_kabu.py` でデプロイを実行後、オンラインで検証する。

**Tech Stack:** Next.js 16 (React), Python 3.x, Pillow, JSON

---

### Task 1: アイキャッチ画像の変換と配置

**Files:**
- Create: `scratch/convert_column_image.py`
- Source: `D:\Antigravity\Kabu\manga\column\Column20260703.jpeg`
- Dest 1: `D:\Antigravity\Kabu\image\column\Column20260703.png`
- Dest 2: `D:\Antigravity\Kabu\web-next\public\images\column\Column20260703.png`

**Step 1: 変換スクリプトの作成**
`scratch/convert_column_image.py` を作成し、Pillowを用いて画像を読み込み、PNG形式で2つのパスに保存する。

```python
import os
from PIL import Image

src = r"D:\Antigravity\Kabu\manga\column\Column20260703.jpeg"
dest1 = r"D:\Antigravity\Kabu\image\column\Column20260703.png"
dest2 = r"D:\Antigravity\Kabu\web-next\public\images\column\Column20260703.png"

# Ensure directories exist
os.makedirs(os.path.dirname(dest1), exist_ok=True)
os.makedirs(os.path.dirname(dest2), exist_ok=True)

if os.path.exists(src):
    with Image.open(src) as img:
        img.save(dest1, "PNG")
        img.save(dest2, "PNG")
    print("SUCCESS: Converted and saved image.")
else:
    print(f"ERROR: Source image not found at {src}")
    exit(1)
```

**Step 2: 変換スクリプトの実行**
Run: `python scratch/convert_column_image.py`
Expected: `SUCCESS: Converted and saved image.` と出力されること。

**Step 3: 配置の確認**
PowerShell でファイルが存在することを確認する。
Run: `Test-Path D:\Antigravity\Kabu\image\column\Column20260703.png`
Expected: `True`

Run: `Test-Path D:\Antigravity\Kabu\web-next\public\images\column\Column20260703.png`
Expected: `True`

**Step 4: コミット**
```bash
git add image/column/Column20260703.png web-next/public/images/column/Column20260703.png
git commit -m "assets: add SpaceX short-sell column eyecatch"
```

---

### Task 2: TDDバリデーションテストの作成

**Files:**
- Create: `scratch/test_column_039_data.py`
- Reference: `data/columns.json`

**Step 1: バリデーションテストの記述**
`data/columns.json` に `col_039` が正常に（重複なく、必要なフィールドを含み、日付が正しく）追加されているかをアサートするスクリプト `scratch/test_column_039_data.py` を作成する。

```python
import json
import os

json_path = r"D:\Antigravity\Kabu\data\columns.json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Find col_039 in data
col = next((item for item in data if item.get("id") == "col_039"), None)

assert col is not None, "Error: col_039 not found in JSON data."
assert col.get("date") == "2026.07.03", "Error: Date must be 2026.07.03"
assert col.get("category") == "最新ニュース解説", "Error: Category must be 最新ニュース解説"
assert col.get("title") == "【イーロンvs空売り筋】スペースX上場1カ月で空売り残高が「異例の1.9億株」！含み損1100億円超の空売り筋とマスク氏の歴史的バトルの裏側", "Error: Title mismatch"
assert "/images/column/Column20260703.png" in col.get("image"), "Error: Image path mismatch"

# Check required fields
for field in ["id", "date", "category", "category_color", "title", "lead", "image", "reading_time", "definition", "body", "conclusion", "faq", "tags", "related_contents", "related_links"]:
    assert field in col, f"Error: Missing field {field}"

# Ensure col_039 is at the very beginning of the array (descending order)
assert data[0].get("id") == "col_039", "Error: col_039 is not the first element in columns.json"

print("SUCCESS: col_039 data validation passed!")
```

**Step 2: テストの実行と失敗の確認**
まだ `columns.json` にデータを追加していないため、このテストを実行すると失敗することを確認する。
Run: `python scratch/test_column_039_data.py`
Expected: 実行エラー `AssertionError: Error: col_039 not found in JSON data.`

---

### Task 3: columns.jsonへのデータ追加

**Files:**
- Modify: `data/columns.json`

**Step 1: データの追加**
`data/columns.json` の先頭（2行目の `[` のすぐ下）に設計された `col_039` のオブジェクトを挿入する。

挿入するJSONオブジェクト：
```json
    {
        "id": "col_039",
        "date": "2026.07.03",
        "category": "最新ニュース解説",
        "category_color": "#E67E22",
        "title": "【イーロンvs空売り筋】スペースX上場1カ月で空売り残高が「異例の1.9億株」！含み損1100億円超の空売り筋とマスク氏の歴史的バトルの裏側",
        "lead": "宇宙ベンチャー「スペースX」が上場してわずか1カ月足らず。株価の「割高感」を狙った空売り筋による売り残高が1億9600万株（浮動株の約31%）へと急増する異常事態が発生しています。しかし、すでに空売り筋の含み損は7.6億ドル（約1100億円）を突破！イーロン・マスク氏と空売り筋の過去の因縁や、株価が急上昇する「ショートカバー（踏み上げ）」の恐怖の仕組みを、カブ先生がわかりやすく解説するぞ！",
        "image": "/images/column/Column20260703.png",
        "reading_time": 5,
        "definition": "空売り（ショート）とは、手元にない株式を借りて先に売り、株価が下がったところで買い戻してその差額を得る取引手法です。一方、株価が予想に反して上昇した際、損失を抑えるために慌てて買い戻す動きをショートカバー（買い戻し）と呼び、これが更なる株価急騰（踏み上げ）を引き起こすリスクがあります。（出典：日本取引所グループ・金融庁ガイドライン）",
        "body": "## たった1カ月で1.9億株の売り！？スペースX上場で起きた異例の空売りバトル\n\nマネ太：「カブ先生！大変っす！6月12日に上場したばかりのスペースX株で、ものすごい空売りバトルが起きてるらしいっすよ！ロイターのニュースによると、空売り残高がわずか1カ月足らずで1億9600万株に急増したそうっす！これって浮動株の約31%にものぼるらしいっす！」\n\nミライ：「上場から1カ月足らずの銘柄としては、本当に異例の規模ですね。でも、それだけ多くの投資家が『スペースXの株価は高すぎる、これから下がるはずだ』と考えて賭けているということでしょうか？」\n\nカブ先生：「フォッフォッフォ！その通りじゃな。時価総額2兆ドル（約300兆円超）という超巨大な規模ゆえに、『割高感』を狙ってショートセラー（空売り筋）が集まってきたのじゃ。しかし、現実は非常に冷酷じゃぞい。6月30日時点で、空売り筋はすでに約7.6億ドル（約1100億円）もの『含み損』を抱えて瀕死の状態になっておるのじゃよ。」\n\nマネ太：「ええっ！？下がると思って売ったのに、すでに1100億円も負けてるんすか！？自業自得っすけど、なんでそんなことになっちゃったんすか？」\n\n---\n\n## 空売りの基本と、恐るべき「ショートカバー（踏み上げ）」の恐怖\n\nミライ：「そもそも『空売り』という仕組み自体、私たち現物投資家には少し馴染みが薄いですよね。株を持っていないのに売るというのは、どういう仕組みなのでしょうか？」\n\nカブ先生：「うむ、良い質問じゃ。空売りとは、証券会社などから『株を借りて』市場で先に売り、将来株価が下がったところで買い戻して株を返却し、その差額を利益にする手法じゃな。例えば、1株100ドルで借りて売り、50ドルに下がった時に買い戻せば、差額の50ドルが丸儲けになる仕組みじゃ。」\n\nマネ太：「なるほどっす！安く買って高く売るのを、逆の順番でやるわけっすね。じゃあ、株価が上がっちゃったらどうなるんすか？」\n\nカブ先生：「そこが空売りの地獄の一丁目じゃ！株価が予想に反して上がると、買い戻すためのコストが膨らみ、損失が発生する。そして株価が上がり続けると、空売り筋は損失が無限に膨らむのを防ぐために、あるいは証券会社からの強制決済を避けるために、慌てて市場から株を買い戻さざるを得なくなる。この損失確定の買い戻しを『ショートカバー（買い戻し）』と呼ぶのじゃ。」\n\nミライ：「あ！ということは、空売り筋が慌てて買い戻す（＝株を買う）ことで、市場にさらに強い買い需要が発生して、株価がもっと跳ね上がってしまうということですか？」\n\nカブ先生：「その通りじゃ、ミライちゃん！これこそが『踏み上げ（ショートスクイーズ）』と呼ばれる現象じゃ！株価が1ドル動くごとに、今回のスペースXの空売り筋全体で約2億ドルの損益が発生する計算になっておる。株価が一段と上昇すれば、空売り筋の強制買い戻しが連鎖して、株価が打ち上げ花火のようにさらに暴騰するリスクがあるのじゃよ。」\n\n---\n\n## 因縁の対決！イーロン・マスク vs 空売り筋の歴史\n\nマネ太：「空売りしてる人たち、めちゃくちゃ焦ってそうっすね……。イーロン・マスクはこの状況をどう思ってるんすかね？」\n\nミライ：「イーロン・マスク氏といえば、過去にテスラ株でも空売り筋と激しく対立していたイメージがあります。」\n\nカブ先生：「フォッフォッフォ！イーロンは空売り筋を『企業価値を壊そうとする寄生虫』として病的なまでに敵視しておるのじゃ。テスラ株の時も、大損した空売り筋をからかうために、テスラ公式サイトで赤いサテン地の『ショートパンツ（Short Shorts）』を1枚69.420ドル（イーロンお気に入りの数字じゃな）で限定販売して煽り散らしたエピソードは伝説になっておるぞい。」\n\nマネ太：「めちゃくちゃ煽るじゃないっすか！でも、そんなイーロンが率いる会社を空売りするなんて、空売り筋も命知らずっすね。」\n\nカブ先生：「そうじゃな。イーロン関連企業は、個人投資家や信者とも言える強気なファン（機関投資家含む）の買い需要が非常に強く、ちょっとした良いニュースで株価が跳ね上がりやすい。しかもイーロン自身が空売りを潰すための自社株買いや対策を熟知しておる。そんな相手に『割高だ』という教科書通りの理由だけで立ち向かうのは、文字通り火薬庫の中でタバコを吸うようなものじゃな。」\n\n---\n\n## 個人投資家への教訓：「伸びる株」をなめた空売りは丸焦げになる\n\nマネ太：「うう、話を聞いてるだけで恐ろしくなってきたっす。ボクも『スペースXは上場直後に下がったから、空売りすれば簡単に儲かるかも』なんて一瞬考えたっすけど、絶対に手を出さないようにするっす！」\n\nカブ先生：「（大喝！！）喝（かつ）ーーーッ！！当たり前じゃ、マネ太くん！お主のような初心者が空売りやレバレッジ取引に手を出すなど、虎の尾を踏むようなものじゃ！投資の基本は『買い』であり、現物買いであれば、もし会社が倒産しても損失は『投資した元本まで』で済む。しかし、空売りは『株価に上限がない』ため、理論上の損失は『無限大』になるのじゃぞ！」\n\nミライ：「プロのヘッジファンドでも一晩で破産する世界ですからね。今回のニュースを見ても、短期的な投機で一攫千金を狙うのではなく、事業が長期的にどう成長するかを見極めることの大切さがよく分かります。」\n\nカブ先生：「その通りじゃ。スペースXには、衛星通信『スターリンク』の驚異的な加入者増や、再利用型ロケットによる圧倒的なコスト優位性、さらには火星探査といった人類の夢が詰まっておる。割高だという目先の数字だけで戦いを挑んだ空売り筋が丸焦げになる様を反面教師にし、我々は世界の成長企業に『現物で長期投資』し、その果実を分けてもらう王道を歩べきじゃな！喝！！」\n\nマネ太：「よく分かったっす！ニュースのバトルを面白がりつつも、自分は地道にオルカンや成長株の現物積立をコツコツ続けていくっす！」",
        "conclusion": "スペースXの上場直後の異常な空売り規模と、すでに1100億円を超える空売り筋の含み損は、急激な「踏み上げ（ショートスクイーズ）」のリスクを示唆しておる。イーロン・マスク氏率いる企業と空売り筋の因縁の歴史を学べば、成長力のある企業を割高感だけで空売りすることがどれほど危険かよくわかるじゃろう。初心者は投機的な取引に手を出さず、現物での長期投資を淡々と継続するのが王道じゃな！",
        "faq": [
            {
                "q": "空売り（ショート）とは何ですか？なぜ損失が無限大になるのですか？",
                "a": "証券会社から借りた株式を先に売り、後から買い戻して返却する取引手法じゃ。現物買いは株価が0円になれば損失は終わる（投資額が上限）が、株価の上昇には上限がないため、予想に反して急騰した場合、買い戻すための損失が文字通り無限に膨らむリスクがあるのじゃよ。"
            },
            {
                "q": "ショートカバー（踏み上げ）はなぜ起きるのですか？",
                "a": "空売りした株の買い戻し（ショートカバー）は、市場にとっては「買い注文」と同じじゃ。株価が上がって空売り筋が慌てて買い戻すほど、その買い注文自体がさらなる株価上昇を呼び、それに耐えかねた他の空売り筋も次々と買い戻さざるを得なくなる連鎖反応（ショートスクイーズ）が起きるからじゃな。"
            },
            {
                "q": "個人投資家は空売りをするべきですか？",
                "a": "初心者は絶対に避けるべきじゃ。空売りはレバレッジを伴うことが多く、一瞬で資産を失うか借金を背負うリスクがある。資産形成の基本は、長期的な成長が期待できる企業の現物株や投資信託を買い持ち（ロング）することじゃぞい。"
            }
        ],
        "tags": [
            "スペースX",
            "イーロン・マスク",
            "空売り",
            "ショートカバー",
            "株式投資"
        ],
        "related_contents": [
            {
                "id": "col_033",
                "type": "column"
            },
            {
                "id": "col_030",
                "type": "column"
            },
            {
                "id": "col_038",
                "type": "column"
            }
        ],
        "related_links": [
            {
                "text": "コラム【富の分配】スペースX社員が「一夜で億万長者」に？持株・ストックオプションで一般社員に数億円が還元された真実と他社成功例はこちら",
                "url": "/column/col_033"
            },
            {
                "text": "コラム【宇宙級IPO】スペースXが遂に上場！？SBI証券と楽天証券の抽選ルール徹底比較はこちら",
                "url": "/column/col_030"
            },
            {
                "text": "コラム【住宅ローン vs 賃貸】2026年7月最新の金利動向と一生で得なのはどちら？金利上昇リスクと生涯コストの真実はこちら",
                "url": "/column/col_038"
            }
        ]
    },
```

**Step 2: テストの実行と通過の確認**
データを追加した後にテストスクリプトを実行して成功（PASS）することを確認する。
Run: `python scratch/test_column_039_data.py`
Expected: `SUCCESS: col_039 data validation passed!`

**Step 3: コミット**
```bash
git add data/columns.json
git commit -m "feat: add SpaceX short-sell column (col_039) content"
```

---

### Task 4: ビルド・デプロイと動作検証

**Files:**
- Modify: (None, deploy script changes or temporary files if any)

**Step 1: Next.js のローカルビルド**
静的エクスポートファイル群を更新するため、`web-next` ディレクトリでビルドを実行する。
Run: `cd web-next; npm run build; cd ..` （注: run_command ツールでは cd ではなく適切な Cwd を指定すること）
Cwd: `D:\Antigravity\Kabu\web-next`
CommandLine: `npm run build`
Expected: エラー無しでビルドが完了すること。

**Step 2: 本番サーバーへの FTP デプロイ**
Cwd: `D:\Antigravity\Kabu`
CommandLine: `python scripts/deploy_kabu.py`
Expected: FTPデプロイが成功し、ファイルの差分アップロードが完了すること。

**Step 3: オンライン表示確認**
オンラインにデプロイされたページが正常に動作し、200 OK を返すか確認。
Run: `curl -I https://okane-no-manabi.jp/column/col_039` （あるいはブラウザ等でアクセス）
Expected: `HTTP/1.1 200 OK`

**Step 4: コミットおよび報告**
完了。
