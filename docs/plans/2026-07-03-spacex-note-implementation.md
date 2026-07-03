# SpaceX株空売り急増 note.com 記事実装計画書

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** スペースX株空売り急増をテーマに、ポータルコラムとは別角度のビジョン重視で解説する 3,000文字以上の note.com 用下書き原稿を作成し、バリデーション通過後に note-mcp で下書きとしてアップロードする。

**Architecture:** 
1. note用原稿ファイル `scratch/note_spacex_short_sell.md` を執筆する。
2. 文字数（3,000字以上）および `**` (太字アスタリスク) の混入がないかをローカルで検証する Python テストスクリプトを作成・実行する。
3. `note-mcp` でドラフトとして登録し、結果の Draft ID を記録する。
4. 作成したドラフトファイルを Git コミットし、`origin/main` リモートへ push 同期する。

**Tech Stack:** Python 3.x, Markdown, note-mcp

---

### Task 1: note.com 原稿の作成

**Files:**
- Create: `scratch/note_spacex_short_sell.md`

**Step 1: 原稿の執筆**
`scratch/note_spacex_short_sell.md` を作成し、3,000文字以上のコンテンツを記述する。以下の要素を厳守すること：
- 太字マーク `**` を使用しない（`### 見出し` や文章自身の強調で表現する）。
- カブ先生の語尾（〜じゃ、〜のう、〜ぞい、フォッフォッフォ、喝）を含める。
- 末尾に「お金の学び場」とカブ先生XへのCTAリンクを設置する。

---

### Task 2: ローカルバリデーションテストの作成と実行

**Files:**
- Create: `scratch/test_note_compliance.py`
- Reference: `scratch/note_spacex_short_sell.md`

**Step 1: バリデーションスクリプトの記述**
原稿が仕様を満たしているかをチェックする TDD スクリプトを記述する。

```python
import os

filepath = r"D:\Antigravity\Kabu\scratch\note_spacex_short_sell.md"

if not os.path.exists(filepath):
    print("ERROR: Draft file not found.")
    exit(1)

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Check double asterisks (**)
assert "**" not in content, "Error: Double asterisks '**' detected in note draft. This is forbidden."

# 2. Check length (must be >= 3000 chars)
char_count = len(content)
print(f"📊 Draft Character Count: {char_count}")
assert char_count >= 3000, f"Error: Draft character count ({char_count}) is less than 3000."

# 3. Check CTA links
assert "https://okane-no-manabi.jp" in content, "Error: CTA link to portal okane-no-manabi.jp is missing."
assert "https://x.com/kabu_teacher" in content, "Error: CTA link to X kabu_teacher is missing."

print("SUCCESS: Local note validation passed!")
```

**Step 2: バリデーションテストの実行**
Run: `python scratch/test_note_compliance.py`
Expected: `SUCCESS: Local note validation passed!` と表示されること。

---

### Task 3: note-mcp によるアップロード

**Files:**
- Modify: (None, mcp request)

**Step 1: 下書きのアップロード**
`note-mcp` のツールを利用して、`scratch/note_spacex_short_sell.md` をドラフト登録する。
使用ツール: `mcp:note-mcp/note_create_from_file` (または python ラッパーなど)
Expected: 正常終了し、Draft ID および Key が返却されること。

**Step 2: コミットとプッシュ**
```bash
git add scratch/note_spacex_short_sell.md docs/plans/2026-07-03-spacex-note-design.md docs/plans/2026-07-03-spacex-note-implementation.md docs/plans/task.md
git commit -m "feat: add SpaceX note.com draft and planning docs"
git push origin main
```
