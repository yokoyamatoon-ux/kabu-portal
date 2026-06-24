# ロボアドバイザー比較コラム (col_036) 実装計画

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** `data/columns.json` に最新コラム `col_036`（ロボアドバイザー比較コラム）を対話劇形式で追加し、テストが通ることを確認の上、アイキャッチ画像を配置してデプロイ可能な状態にする。

**Architecture:** 
`data/columns.json` の先頭に、カブ先生、マネ太、ミライの3人の対話劇である `col_036` のJSONデータを追加する。
画像は一時的にダミーを配置するか、生成した画像が届き次第 `image/column/Column20260625.png` に配置する。
Next.js (web-next) でのローカルビルドを確認し、最終的に `deploy_kabu.py` でデプロイする。

**Tech Stack:** Python (テスト・デプロイ用), JSON, Markdown, Next.js (React)

---

### Task 1: TDD検証テストスクリプトの作成

**Files:**
- Create: `scratch/test_columns_data_roboadvisor.py`

**Step 1: テストコードの作成**

`scratch/test_columns_data_roboadvisor.py` を作成し、`col_036` が正しく先頭に追加され、各属性やアイキャッチ画像のパスがルール通りであることを検証するテストを書く。

```python
import json
import os

def test_column_data():
    columns_path = "data/columns.json"
    assert os.path.exists(columns_path), "columns.json does not exist"
    with open(columns_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    col_36 = data[0]
    assert col_36["id"] == "col_036", "Latest column ID must be col_036"
    assert col_36["category"] == "NISA・投資入門", "Category must be NISA・投資入門"
    assert col_36["category_color"] == "#00B894", "Category color must be #00B894"
    assert "ウェルスナビ" in col_36["title"], "Title must contain WealthNavi reference"
    
    # 画像ファイルの実在チェック (ダミーまたは本番)
    img_path = f"image/column/Column20260625.png"
    assert os.path.exists(img_path), f"Eyecatch image {img_path} must exist"
    print("Column data validation passed!")

if __name__ == "__main__":
    test_column_data()
```

**Step 2: テストを実行して失敗することを確認**

Run: `python scratch/test_columns_data_roboadvisor.py`
Expected: FAIL (AssertionError または `FileNotFoundError: Column20260625.png must exist`)

**Step 3: ダミーアイキャッチ画像の作成**

一時的にテストをパスさせ、ビルドチェックを行うため、ダミーの空画像を配置する。
Run: `powershell -Command "New-Item -ItemType File -Path image/column/Column20260625.png -Force"`

**Step 4: コラムデータ col_036 を columns.json に追加**

`data/columns.json` の先頭（2行目、最初のオブジェクトの直前）に、新コラムデータを追加する。本文はカブ先生、マネ太、ミライのキャラクター設定に準拠したセリフ調で執筆する。

**Step 5: テストを再実行してパスすることを確認**

Run: `python scratch/test_columns_data_roboadvisor.py`
Expected: PASS ("Column data validation passed!")

**Step 6: コミット**

```bash
git add scratch/test_columns_data_roboadvisor.py data/columns.json image/column/Column20260625.png
git commit -m "feat: add col_036 roboadvisor column data and verification test"
```

---

### Task 2: ローカルでのNext.jsビルド検証

**Files:**
- Modify: `web-next/src/data/columns.json` (デプロイスクリプト、または手動コピーで同期)

**Step 1: データ同期とビルド実行**

ローカルでNext.jsのビルドがエラーなしで通ることを検証する。
Run:
```powershell
cp data/columns.json web-next/src/data/columns.json
cp image/column/Column20260625.png web-next/public/images/column/Column20260625.png
cd web-next
npm run build
```
Expected: ビルドがエラーなしで完了（`export` されたファイル群が生成される）。

**Step 2: コミット**

ビルド検証の成功を確認し、差分をコミット。
```bash
git commit --allow-empty -m "test: verify local Next.js build passes with col_036"
```

---

### Task 3: アイキャッチ画像の反映とデプロイ

**Files:**
- Modify: `image/column/Column20260625.png` (提供された本番画像で上書き)

**Step 1: 本番アイキャッチ画像の配置**
ユーザーから送られてきた、または生成された本番の `Column20260625.png` で `image/column/Column20260625.png` を上書きする。

**Step 2: サイト全体のビルドおよびデプロイの実行**

デプロイスクリプトを実行し、サーバーにアップロードする。
Run: `python scripts/deploy_kabu.py`
Expected: ビルドとFTP転送が正常終了する。

**Step 3: デプロイ後の本番確認**

URL `https://okane-no-manabi.jp/column/col_036/` にアクセスし、表示が正常であることを確認。

**Step 4: コミット**

```bash
git add image/column/Column20260625.png
git commit -m "deploy: update eyecatch image and deploy col_036 to production"
```
