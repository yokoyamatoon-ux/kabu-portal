# 投資ポートフォリオ解説 note.com下書き作成 実装計画書

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 「投資のポートフォリオってなに？」をテーマにしたnote.com向け下書きドラフトを作成し、検証スクリプトで整合性を確認した上で、API (`note-mcp`) を使って下書きとしてアップロードする。

**Architecture:** 
1. `verify_note_compliance.py` に新規ファイルのパスを追加。
2. noteのルール（カブ先生の口調、`**`太字の禁止、ポータル＆XへのCTAリンク）を厳守した下書き記事 `scratch/note_portfolio.md` を作成。
3. 検証スクリプトを実行して品質チェックを通過させる。
4. アップロード用スクリプトを作成・実行し、note.comに下書きとして登録する。

**Tech Stack:** Python 3.11, note-mcp wrapper, Git

---

### Task 1: 検証スクリプトの準備 (TDD)

**Files:**
- Modify: [verify_note_compliance.py](file:///d:/Antigravity/Kabu/scratch/verify_note_compliance.py:80-90)

**Step 1: verify_note_compliance.py の記事リストに新規作成予定のファイルを追記する**

```python
    articles = [
        # 既存の記事...
        "d:\\Antigravity\\Kabu\\scratch\\note_elon_musk.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_shareholders_meeting.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_portfolio.md"
    ]
```

**Step 2: 検証スクリプトを実行し、ファイルが存在しない（FILE NOT FOUND）エラーが出ることを確認する**

Run: `python scratch/verify_note_compliance.py`
Expected: Output contains `[FILE NOT FOUND] ...scratch\note_portfolio.md`

**Step 3: コミットする**

```bash
git add scratch/verify_note_compliance.py
git commit -m "test: register note_portfolio.md in compliance check"
```

---

### Task 2: note.com 下書きの執筆

**Files:**
- Create: `scratch/note_portfolio.md`

**Step 1: 下書きファイルを新規作成する。以下の構成・ルールを盛り込む：**

*   **タイトル**: 【投資の基本】ポートフォリオってなに？カブ先生が教える「卵を一つのカゴに盛るな」の真実と最強のアセットアロケーション
*   **YAMLフロントマテリア**: tags: `["ポートフォリオ", "資産形成", "分散投資", "お金の学び場", "初心者向け"]`
*   **本文構成**:
    - **導入**: マネ太が「ポートフォリオ」という言葉をカッコいいからと適当に使っているのを、カブ先生が見つけて優しく解説する導入。
    - **ポートフォリオとは何か**: イタリア語の「紙挟み（書類入れ）」が語源。金融では「自分が持っている資産の組み合わせ（中身）」を指す。
    - **なぜポートフォリオが大切なのか**: 有名な格言「卵を一つのカゴに盛るな（Don't put all your eggs in one basket）」。一つのカゴが落ちれば全部割れるが、別々のカゴに分けておけば、どれかが落ちても被害を最小限に防げる。
    - **アセットアロケーション（資産配分）との違い**:
      - アセットアロケーション：大枠の資産クラスの比率（株：債券：現金：コモディティ ＝ 50:30:10:10 など）。
      - ポートフォリオ：その具体的な中身（株クラスの中にトヨタやApple、債券の中に米国債など、どこの銘柄を持っているか）。
    - **カブ先生推奨の初心者ポートフォリオ例**:
      - 安全第一の「伝統的4資産アロケーション」（国内株・外国株・国内債券・外国債券を均等に分散）。
      - コア・サテライト戦略：インデックス投資（コア：80-90%）を守りとし、個別株や「金（ゴールド）投資（サテライト：5-10%）」を保険・スパイスとして持つ賢いアプローチ。
    - **注意点**: 定期的な「リバランス（再配分）」の大切さ。相場変動で偏ってしまった比率を元に戻すメンテナンス作業が必須じゃぞい。
*   **制約**: `**` の二重アスタリスクによる太字記法を一切使用しない（Markdownの `##` や `###` の見出しによる協調と、箇条書きによる整理で読みやすく構成）。
*   **CTA**: 末尾に portal（https://okane-no-manabi.jp ）および X（https://x.com/kabu_teacher ）へのリンクを適切に設置する。

**Step 2: 検証スクリプトを実行し、チェックをすべてパスすることを確認する**

Run: `python scratch/verify_note_compliance.py`
Expected: `Verifying: note_portfolio.md -> [PASS] Perfect! Pass all checks.`

**Step 3: コミットする**

```bash
git add scratch/note_portfolio.md
git commit -m "content: write comprehensive note draft about portfolio definition and strategy"
```

---

### Task 3: 下書きを note.com へアップロード

**Files:**
- Create: `scratch/upload_portfolio_note.py`

**Step 1: 下書きアップロード用の Python スクリプトを作成する**

```python
import asyncio
import sys
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")
from note_mcp.server import note_create_from_file

async def main():
    print("Uploading note draft...")
    res = await note_create_from_file(
        file_path=r"D:\Antigravity\Kabu\scratch\note_portfolio.md",
        upload_images=True
    )
    print("Upload Result:")
    print(res)

if __name__ == '__main__':
    asyncio.run(main())
```

**Step 2: 仮想環境の Python を用いてアップロードスクリプトを実行し、Draft ID と Key を取得する**

Run: `d:\Antigravity\Kabu\.venv\Scripts\python.exe scratch/upload_portfolio_note.py`
Expected: Output showing Draft ID and Key.

**Step 3: スクリプトをコミットする**

```bash
git add scratch/upload_portfolio_note.py
git commit -m "tool: add portfolio note upload script"
```

---

### Task 4: タスク進捗表の更新

**Files:**
- Modify: [task.md](file:///d:/Antigravity/Kabu/docs/plans/task.md)

**Step 1: task.md の進捗表に今回のポートフォリオnote記事作成・デプロイタスクを追記し、すべて完了にする。**

**Step 2: コミットする**

```bash
git add docs/plans/task.md
git commit -m "docs: complete portfolio note draft tasks in tracker"
```
