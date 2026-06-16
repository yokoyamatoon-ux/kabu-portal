# 金（ゴールド）投資エピソード（Ep 15）追加 実装計画書

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 「マンガで学ぶ」シリーズの新エピソード15（金投資の価値と最新相場）をデータファイル `data/manga.json` に追加し、テストコードで検証の上、Next.jsサイトをビルドして本番サーバーにデプロイする。

**Architecture:** 既存の `data/manga.json` のスキーマに適合するエピソードデータを追加する。また、TDD（テスト駆動開発）アプローチを採用し、`scratch/test_manga_data.py` を先に更新してテストの失敗を確認してからデータを追加する。

**Tech Stack:** Python 3 (検証スクリプト用), Next.js, Node.js (サイトビルド用)

---

### Task 1: テストコードの更新と失敗の確認 (TDD)

**Files:**
- Modify: [test_manga_data.py](file:///d:/Antigravity/Kabu/scratch/test_manga_data.py:1-35)

**Step 1: テストコードを更新し、期待されるエピソード数を15にし、エピソード15の検証（タイトル、トピック、画像パス、説明文内の最新相場数値等のアサーション）を追加する**

```python
# scratch/test_manga_data.py の一部変更

# Line 8:
assert len(data) == 15, f"Expected 15 episodes, got {len(data)}"

# 末尾 (test_manga の中) に以下を追加:
    # Verify Ep 15 contents
    ep15 = next(x for x in data if x.get('ep') == 15)
    assert "金" in ep15['title']
    assert ep15['topic'] == "gold_investment"
    assert ep15['manga_pages'] == [
        "/manga/manabu/20260617/manabu_20260617_01.png",
        "/manga/manabu/20260617/manabu_20260617_02.png"
    ]
    
    desc = ep15['description_long']
    assert "5,600" in desc or "5600" in desc
    assert "4,000" in desc or "4000" in desc
    assert "利息" in desc
```

**Step 2: テストを実行して、件数が14であることやEp 15が見つからないことで失敗することを確認する**

Run: `python scratch/test_manga_data.py`
Expected: FAIL (AssertionError: Expected 15 episodes, got 14)

**Step 3: コミットする**

```bash
git add scratch/test_manga_data.py
git commit -m "test: update test_manga_data.py for Episode 15"
```

---

### Task 2: data/manga.json へのエピソード15（金投資）の追加

**Files:**
- Modify: [manga.json](file:///d:/Antigravity/Kabu/data/manga.json)

**Step 1: manga.json の末尾（最後の要素の後）に、エピソード15のJSONオブジェクトを追記する。マンガのコマ割りプロンプトはコメント（JSONに直接は入れられないので、manga.json ではなく、manga/manabu/20260617/manga_gold_investment_prompts.md に別途書き下す）**

```json
    {
        "ep": 15,
        "title": "金（ゴールド）投資の真実",
        "summary": "金相場の史上最高値と急落！「安全資産」の魅力と弱点をカブ先生が解説するぞ。",
        "tags": [
            "金投資",
            "安全資産",
            "最新相場",
            "初心者"
        ],
        "related_contents": [
            {
                "type": "column",
                "id": "col_029"
            }
        ],
        "manga_pages": [
            "/manga/manabu/20260617/manabu_20260617_01.png",
            "/manga/manabu/20260617/manabu_20260617_02.png"
        ],
        "topic": "gold_investment",
        "commentary": [
            {
                "speaker": "maneta",
                "text": "うおお！金（ゴールド）の価格が爆上がりっす！今すぐ全財産を金にぶち込めば、ボクも億万長者になれるっすね！",
                "emote": "surprise"
            },
            {
                "speaker": "mirai",
                "text": "マネ太くん、またニュースの表面だけ見て騒いでる……。確かに2026年1月には一時1オンス5,600ドル台の史上最高値を記録したけど、2月には4,000ドル近辺まで急落したのよ。知らないの？",
                "emote": "normal"
            },
            {
                "speaker": "maneta",
                "text": "ええっ！？4,000ドルまで急落！？一体なんでそんなに激しく動くっすか……！？",
                "emote": "surprise"
            },
            {
                "speaker": "kabu",
                "text": "フォッフォッフォ！マネ太くんがまた相場に翻弄されておるな。金はただキラキラしているだけの金属ではないぞ。金投資の真実を教えてやるぞい！",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "金は世界中で価値が認められている『実物資産』であり、国債や紙幣と違って会社や国が破綻しても価値がゼロにならん『安全資産（有事の金）』じゃ。しかし、大きな弱点がある。それは『利息や配当を生まない』ことじゃ！",
                "emote": "normal"
            },
            {
                "speaker": "mirai",
                "text": "そう！だからアメリカの金利が上がったりドルが高くなったりすると、利息のつくドルにお金が流れて金は売られやすくなるの。今回の急落も、インフレが長引いて利下げ期待が後退したのが原因ね。",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "その通りじゃ！インフレや地政学的リスクには強いが、主役にするには偏りすぎる。金はポートフォリオの『5〜10%』を目安に持つ、最強の保険（脇役）として付き合うのが鉄則じゃ！",
                "emote": "normal"
            },
            {
                "speaker": "maneta",
                "text": "なるほど！資産を守る『最強の保険』として少し持っておくのが賢いっすね！",
                "emote": "normal"
            },
            {
                "speaker": "kabu",
                "text": "その通り！欲に目をくらませて全額突っ込むなど、ただのギャンブルじゃ！喝！！",
                "emote": "normal"
            }
        ],
        "summary_points": [
            "【無価値にならない実物資産】金はそれ自体に価値がある「実物資産」であり、国や企業が破綻しても価値がゼロにならない強みがある。",
            "【金利を生まない弱点】金は保有していても利息や配当を生まないため、金利上昇局面やドル高局面では売られやすい傾向がある。",
            "【2026年の乱高下】2026年1月には地政学リスク等で一時5,600ドル台の最高値を付けたが、米金利高止まり等の懸念から2月には4,000ドル近辺まで急落した。",
            "【最強の保険（脇役）】主役として全額を投資するのではなく、ポートフォリオの5〜10%程度を分散投資して資産を守る「保険」とするのが基本。"
        ],
        "faq": [
            {
                "q": "金投資にはどのような方法がありますか？初心者におすすめなのは？",
                "a": "主に「金地金（現物）の購入」「純金積立」「ゴールドETF」などがあります。初心者には、少額から自動で積み立てられて保管の手間もない「純金積立」や、証券口座で株のようにリアルタイムで低コスト取引できる「ゴールドETF」がおすすめじゃぞ。"
            },
            {
                "q": "なぜ金利が上がると金価格が下がるのですか？",
                "a": "金は持っているだけでは利息や配当を生まないからじゃ。そのため、アメリカなどの国が金利を上げると、「金を持っているよりも、利息が多くもらえるドル（米国債など）を持っていた方が得だ」と判断され、金が売られてドルが買われる（ドル高・金安）ためじゃな。"
            },
            {
                "q": "金はいつ買えばいいですか？",
                "a": "「相場が上がっているから」と慌てて高値掴みをするのは禁物じゃ。金は一度に大金を買うのではなく、毎月一定額をコツコツ買い付ける（ドル・コスト平均法）ことで、高いときには少なく、安いときには多く買って平均購入単価を下げるのが最も手堅いぞい。"
            }
        ],
        "description_long": "<p>近年、歴史的な高騰を見せている「金（ゴールド）」は、投資家の間で『安全資産』の代表格として大きな注目を集めています。しかし、その輝かしい値上がりに目を奪われ、資産の大部分を金に投じてしまうのは非常に危険です。金投資には明確な強みと弱み、そして特有の相場メカニズムが存在します。</p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">1. なぜ金は「無価値にならない」のか？</h3><p>紙幣（通貨）は、それを発行する国家の信用によって成り立っています。国家が破綻すれば、その紙幣はただの紙切れになります。また、株式や債券も発行企業が倒産すれば価値を失います。しかし、金は地球上に存在する総量（これまで採掘された分と埋蔵量を合わせてもプール約4杯分程度）が決まっている希少な『実物資産』です。そのため、どのような時代でも、また世界中どこに行っても、それ自体の価値がゼロになることはありません。これが『有事の金』と呼ばれる理由です。</p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">2. 2026年最新相場の急高騰と急落の背景</h3><p>2026年の金相場は、歴史的な乱高下を記録しています。1月には世界的な地政学的リスクの高まりやインフレへのヘッジ需要、さらには各国中央銀行の「米ドル離れ」に伴う買い越しによって、一時1オンス＝5,600ドル台の史上最高値を記録しました。</p><p>しかし、2月に入ると4,000ドル近辺まで急落しました。この背景には、アメリカの根強いインフレ（粘着インフレ）によって米連邦準備制度理事会（FRB）の早期利下げ期待が後退し、米長期金利が高止まりしてドル高が進行したことがあります。金は「利息や配当を生まない」という最大の弱点があるため、金利が高くなると、利息が付くドル債券などにお金が流れて金価格は下落しやすくなるのです。</p><h3 class=\"text-lg font-black text-text mt-6 mb-2\">3. ポートフォリオにおける「最強の保険（脇役）」</h3><p>金は長期的に見ればインフレから資産を守る強力な盾になりますが、配当や利息といった「キャッシュフロー」を生み出さないため、資産を能動的に増やす力はありません。そのため、金は運用ポートフォリオの主役にするのではなく、全資産の **5%〜10%** 程度を「万が一の暴落やインフレに備える保険」として保有するのが最も賢いアプローチです。</p><p><strong>■ Source（参考情報）：</strong><br>・<a href=\"https://www.gold.org/\" target=\"_blank\" class=\"text-primary hover:underline\">World Gold Council (世界黄金協会) 公式マーケットデータ</a></p>"
    }
```

**Step 2: テストを実行して、すべてパスすることを確認する**

Run: `python scratch/test_manga_data.py`
Expected: All tests passed successfully!

**Step 3: 画像生成用プロンプトをドキュメントとして保存する**

- Create: `manga/manabu/20260617/manga_gold_investment_prompts.md`
- 内容：デザイン設計書に記載した日本語プロンプト。

**Step 4: コミットする**

```bash
git add data/manga.json manga/manabu/20260617/manga_gold_investment_prompts.md
git commit -m "feat: add Episode 15 (Gold investment) data and manga prompts"
```

---

### Task 3: サイトのビルドと検証

**Files:**
- Output generated site artifacts (Next.js statically exported files)

**Step 1: Next.jsサイトのビルドを行う**

Run: `cd web-next; npm run build`
Expected: Build success with no static page export errors.

**Step 2: コミットする**

```bash
git add web-next/
git commit -m "build: compile web-next static files with Episode 15 data"
```

---

### Task 4: デプロイと本番URL確認

**Files:**
- N/A

**Step 1: デプロイ用スクリプトを実行して本番へ反映する**

Run: `python scripts/deploy_kabu.py`
Expected: Successful upload of all changed static resources and data files via FTP.

**Step 2: 本番環境のページにアクセスして、表示と内容の正しさを手動確認する**

Run: Pythonスクリプト `scratch/inspect_live_content.py` や `read_url_content` を用いて、`https://okane-no-manabi.jp/manga/15/` が200 OKを返し、内容が含まれていることを検証する。
