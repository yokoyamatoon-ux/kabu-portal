# 「副業・在宅ワークの甘い誘惑」実装計画（詳細タスク）

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** お金のウラ事情ファイル 第20話「副業・在宅ワークの甘い誘惑」の追加、マンガ画像の変換と配置、Next.js静的ビルド、デプロイ完了。

**Architecture:** Python PILによる画像変換、`data/money_secrets.json` の更新、TDDテスト確認、 Next.js 静的ビルド & FTPデプロイ。

**Tech Stack:** Python, Pillow, Next.js

---

### Task 1: 画像のPNG変換と配置

**Files:**
- Create: `image/manga/urakane/urakane20260624_01.png`
- Create: `image/manga/urakane/urakane20260624_02.png`

**Step 1: Pythonスクリプトの作成**
`scratch/convert_images.py` を作成し、提供された以下のJPEG/JPGファイルを読み込み、RGB形式でPNGとして指定フォルダに保存するコードを記述。
- `D:\Antigravity\Kabu\manga\urakane\20260624\urakane_20260624_01.jpeg` → `image/manga/urakane/urakane20260624_01.png`
- `D:\Antigravity\Kabu\manga\urakane\20260624\urakane_20260624_02B.jpg` → `image/manga/urakane/urakane20260624_02.png`

**Step 2: スクリプトの実行**
`python scratch/convert_images.py` を実行して画像を生成。

**Step 3: 画像生成の確認**
指定パスにPNGファイルが存在し、破損していないか確認する。

---

### Task 2: データの準備とTDDテストコードの修正

**Files:**
- Modify: `scratch/test_money_secrets_data.py`

**Step 1: テストコードの修正**
`scratch/test_money_secrets_data.py` の検証対象エピソード件数期待値やIDを「20」に変更する。

**Step 2: テストの実行と失敗の確認（TDD）**
`python scratch/test_money_secrets_data.py` を実行し、まだJSONデータを更新していないため「エピソード20が不足している」というエラーでテストが失敗することを確認。

---

### Task 3: `money_secrets.json` の更新

**Files:**
- Modify: `data/money_secrets.json`

**Step 1: JSONデータの挿入**
`data/money_secrets.json` の先頭に、エピソード20のデータオブジェクトを追加する。具体的な `chat_html` を配置する。

**Step 2: テストの再実行と通過の確認**
`python scratch/test_money_secrets_data.py` を実行し、テストがすべて正常に通過することを確認する。

---

### Task 4: ビルド・デプロイと動作確認

**Files:**
- Modify: `docs/plans/task.md`

**Step 1: ローカル Next.js 静的ビルド**
`npm run build` を実行して、ビルドに失敗しないことを確認。

**Step 2: デプロイ実行**
`python scripts/deploy_kabu.py` を実行して、本番サーバーへファイルを同期・アップロード。

**Step 3: 本番動作確認**
ブラウザまたはURL取得ツールで、`https://okane-no-manabi.jp/money_secret/20/` が200 OKで表示され、マンガと解説テキストが正しく表示されているか確認。
