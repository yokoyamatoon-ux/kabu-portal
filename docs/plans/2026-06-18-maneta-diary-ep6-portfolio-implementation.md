# マネ太の投資日記 第6話「ポートフォリオ」 実装計画書

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** マネ太の投資日記第6話「『ポートフォリオ』って何？」を `data/maneta_diary.json` に追加し、テストスクリプトで整合性を検証した上で、ローカルビルドとデプロイを実行する。

**Architecture:** 
1. 新規バリデーション用スクリプト `scratch/test_maneta_diary_data.py` を作成し、JSON構造、データ型、登場キャラクター名などをチェックするテストを行う。
2. `data/maneta_diary.json` に第6話のデータを追記し、テストをパスさせる。
3. `npm run build` およびデプロイを実行し、Next.jsで正常にコンパイル・静的エクスポートができることを確認する。

**Tech Stack:** Python 3.11, Next.js (React), Git

---

### Task 1: マネ太日記のバリデーションテストスクリプトの作成 (TDD)

**Files:**
- Create: `scratch/test_maneta_diary_data.py`

**Step 1: バリデーションスクリプトを作成する**

```python
import json
import os
import sys

def test_maneta_diary_data():
    file_path = "data/maneta_diary.json"
    assert os.path.exists(file_path), f"{file_path} does not exist."
    
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    assert isinstance(data, list), "Data must be a list."
    assert len(data) >= 6, "Expected at least 6 episodes (including Episode 6)."
    
    valid_charas = {"hakase", "maneta", "mirai"}
    
    for item in data:
        ep = item.get("ep")
        assert isinstance(ep, int), f"Episode ep must be int, got {type(ep)} in ep {ep}"
        assert "date" in item, f"Missing 'date' in ep {ep}"
        assert "title" in item, f"Missing 'title' in ep {ep}"
        assert "summary" in item, f"Missing 'summary' in ep {ep}"
        assert "image" in item, f"Missing 'image' in ep {ep}"
        assert isinstance(item.get("manga_pages"), list), f"manga_pages must be list in ep {ep}"
        assert isinstance(item.get("chat_data"), list), f"chat_data must be list in ep {ep}"
        assert isinstance(item.get("related_contents"), list), f"related_contents must be list in ep {ep}"
        
        # chat_data validation
        for idx, chat in enumerate(item["chat_data"]):
            chara = chat.get("chara")
            assert chara in valid_charas, f"Invalid chara '{chara}' at chat {idx} in ep {ep}. Must be one of {valid_charas}"
            assert "text" in chat, f"Missing 'text' at chat {idx} in ep {ep}"
            assert "color" in chat, f"Missing 'color' at chat {idx} in ep {ep}"
            
        # related_contents validation
        for idx, rel in enumerate(item["related_contents"]):
            rel_type = rel.get("type")
            assert rel_type in {"column", "manga"}, f"Invalid related content type '{rel_type}' in ep {ep}"
            if rel_type == "column":
                assert "id" in rel, f"Missing 'id' for related column in ep {ep}"
            elif rel_type == "manga":
                assert "id" in rel, f"Missing 'id' for related manga in ep {ep}"
                
    print("All validation checks passed successfully!")

if __name__ == "__main__":
    try:
        test_maneta_diary_data()
        sys.exit(0)
    except AssertionError as e:
        print(f"Validation FAILED: {e}")
        sys.exit(1)
```

**Step 2: バリデーションスクリプトを実行し、データ数が5件しかない（Episode 6が存在しない）ためにエラーになることを確認する**

Run: `python scratch/test_maneta_diary_data.py`
Expected: FAIL with `Validation FAILED: Expected at least 6 episodes (including Episode 6).`

**Step 3: コミットする**

```bash
git add scratch/test_maneta_diary_data.py
git commit -m "test: add maneta diary validation script"
```

---

### Task 2: data/maneta_diary.json に第6話を追記

**Files:**
- Modify: `data/maneta_diary.json`

**Step 1: data/maneta_diary.json の末尾に第6話のデータを追記する**

```json
  ,
  {
    "ep": 6,
    "date": "2026年5月8日 (金)",
    "title": "「ポートフォリオ」って何？",
    "summary": "カブ先生が教える「卵を一つのカゴに盛るな」の教訓。自分だけの最強の組み合わせ「ポートフォリオ」と、大枠の資産配分「アセットアロケーション」の違いをやさしく解説！",
    "image": "/images/maneta/06/maneta_portfolio_01.png",
    "manga_pages": [
      "/images/maneta/06/maneta_portfolio_01.png",
      "/images/maneta/06/maneta_portfolio_02.png"
    ],
    "chat_data": [
      {
        "chara": "hakase",
        "text": "さて、具体的な資産の分け方じゃな。投資を始めるときは、どの銘柄を買うかばかりに目がいきがちじゃが、実はその前に一番重要な**「設計図」**を決める必要がある。それが「アセットアロケーション（資産配分）」じゃよ。",
        "color": "#FFFFFF"
      },
      {
        "chara": "maneta",
        "text": "アセットアロケーション……！？また英語の難しそうな呪文が出てきたっす！ポートフォリオだけでも頭がこんがらがってるのに、それと何が違うんすか？カブ先生、教えてください！",
        "color": "#E3F2FD"
      },
      {
        "chara": "hakase",
        "text": "フォッフォッフォ！そんなに慌てるでない。似ているようで役割が全然違うんじゃよ。違いを分かりやすく表にまとめたから、まずはこれを見るのじゃ。<br><br><table style='width:100%; border-collapse: collapse; border: 1px solid #ffcc5c; background: white; font-size: 0.75rem; text-align: center;'><tr style='background: #FFF9F0;'><th style='border: 1px solid #ffcc5c; padding: 4px; width: 30%;'>用語</th><th style='border: 1px solid #ffcc5c; padding: 4px;'>意味</th><th style='border: 1px solid #ffcc5c; padding: 4px; width: 35%;'>具体例</th></tr><tr><td style='border: 1px solid #ffcc5c; padding: 4px; font-weight: bold;'>アセットアロケーション</td><td style='border: 1px solid #ffcc5c; padding: 4px; text-align: left;'>大枠の資産分類（株・債券・現金など）の配分比率</td><td style='border: 1px solid #ffcc5c; padding: 4px; text-align: left;'>株 50%：現金 50% など</td></tr><tr><td style='border: 1px solid #ffcc5c; padding: 4px; font-weight: bold;'>ポートフォリオ</td><td style='border: 1px solid #ffcc5c; padding: 4px; text-align: left;'>その資産枠の中に入る、具体的な銘柄・商品の組み合わせ</td><td style='border: 1px solid #ffcc5c; padding: 4px; text-align: left;'>株式枠の中に「オルカン」や「トヨタ株」</td></tr></table>",
        "color": "#FFFFFF"
      },
      {
        "chara": "mirai",
        "text": "なるほど！全体のお金を「現金（安全資産）」や「株式（成長資産）」という大きなお皿にどう分けるかが『アセットアロケーション（大枠の設計図）』で、そのお皿の中に入れる具体的な料理（オルカンや日本株など）を選ぶのが『ポートフォリオ（銘柄の組み合わせ）』なんですね！",
        "color": "#FCE4EC"
      },
      {
        "chara": "hakase",
        "text": "ミライちゃん、実に見事な例えじゃ！実は、投資の運用成績（リターンとリスク）の約9割は、この「アセットアロケーション」で決まると言われておる。個別の銘柄選びよりも、全体のお金をどう配分するかのバランスの方が遥かに重要なのじゃ。",
        "color": "#FFFFFF"
      },
      {
        "chara": "maneta",
        "text": "えええっ！中身を選ぶことより、大枠のバランスの方がそんなに大事なんすか！？それなら、ボクたち初心者はどうやってそのバランスを決めればいいっすか？",
        "color": "#E3F2FD"
      },
      {
        "chara": "hakase",
        "text": "初心者のうちは、無理に細かく分けようとせず、最もシンプルで強力な**「半分ずつアプローチ」**がおすすめじゃ。例えば、自分の全資産の「半分は安全な現金」として銀行に置いておき、「残り半分でオルカン（全世界株式）」をコツコツ積み立てる。これだけで、非常に優れたアセットアロケーションになるぞい。",
        "color": "#FFFFFF"
      },
      {
        "chara": "mirai",
        "text": "それなら、もし市場が暴落して株式の価値が一時的に半分になっても、資産全体で見れば25%しか減らないことになりますね。手元に十分な現金があるから、不安になって途中で売ってしまうのを防げますし、ドルコスト平均法で安くなった株を買い増す余裕も生まれますね。",
        "color": "#FCE4EC"
      },
      {
        "chara": "hakase",
        "text": "その通りじゃ！相場が良いときは株式の成長に乗ることができ、相場が急落したときは現線のクッションが心とお金を守ってくれる。これこそが、長く投資を続けるための鉄則じゃな。",
        "color": "#FFFFFF"
      },
      {
        "chara": "maneta",
        "text": "なるほどっす！それならボクのガラスのハートでも安心して続けられそうっす！さっそく今日からボクの全財産のバランスを見直してみるっすよ！",
        "color": "#E3F2FD"
      },
      {
        "chara": "hakase",
        "text": "うむ、その心掛けは素晴らしいぞ。ただし、投資を長く続けていると、株価の上昇や下落によって、最初は「50:50」だったバランスが「株70:現金30」のようにいつの間にか偏ってしまうことがある。その偏った比率を元の設計図通りに戻すメンテナンス作業を「リバランス」と呼ぶのじゃが、そのやり方についてはまた次回詳しく説明しようかの！",
        "color": "#FFFFFF"
      }
    ],
    "related_contents": [
      {"type": "column", "id": "col_013"},
      {"type": "column", "id": "col_011"},
      {"type": "manga", "id": 5}
    ]
  }
```

**Step 2: バリデーションスクリプトを実行し、正常にパスすることを確認する**

Run: `python scratch/test_maneta_diary_data.py`
Expected: `All validation checks passed successfully!`

**Step 3: コミットする**

```bash
git add data/maneta_diary.json
git commit -m "content: add maneta diary ep 6 portfolio content"
```

---

### Task 3: ビルド検証とローカル動作確認

**Files:**
- Modify: None (Build output check)

**Step 1: Next.jsプロジェクトのビルドを実行する**

Run: `npm run build` (Cwd: `web-next`)
Expected: Build successfully compiles the project.

**Step 2: サイトをビルドおよびデプロイする**

Run: `python scripts/deploy_kabu.py`
Expected: Deploy succeeds with zero errors, asset copying completes.

**Step 3: コミットする**

```bash
# 通常コミットすべきファイルは発生しないはずだが、.deploy_cache.json の更新があればコミットする
git add .deploy_cache.json (if modified)
git commit -m "build: verify compilation and update deploy cache" (if necessary)
```

---

### Task 4: タスク進捗表の更新

**Files:**
- Modify: `docs/plans/task.md`

**Step 1: task.md に今回のタスク（マネ太日記第6話）を追記し、進捗表を更新する**

**Step 2: コミットする**

```bash
git add docs/plans/task.md
git commit -m "docs: finalize tasks for maneta diary ep 6 portfolio in tracker"
```
