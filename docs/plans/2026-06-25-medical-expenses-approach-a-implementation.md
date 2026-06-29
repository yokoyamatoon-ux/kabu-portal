# 医療費デマ解説 Episode 21 構成再構築 (アプローチA) 実装計画

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** ポータルサイトの Episode 21 において、マンガ画像部分（前半のデマそそのかし・カブ先生一喝）とテキスト記事部分（chat_html）の重複を解消し、テキスト部分が一喝の直後から開始するようデータを修正・検証・デプロイする。

**Architecture:** 
1. `manga/urakane/manga_medical_expenses_prompts.md` に、アプローチAに適合した2ページのマンガプロンプト/ネーム構成を書き出す。
2. `data/money_secrets.json` の Episode 21 の `chat_html` を修正し、前半の重複会話を削除してカブ先生の一喝から開始し、ミライのセリフも追加してバランスを取る。
3. 検証テスト `scratch/test_money_secrets_data.py` の動作確認とローカルビルド・デプロイを行う。

**Tech Stack:** Python, JSON, Next.js (React)

---

### Task 1: マンガプロンプトの作成

**Files:**
- Create: `manga/urakane/manga_medical_expenses_prompts.md`

**Step 1: 新規ファイルの作成**

`manga/urakane/manga_medical_expenses_prompts.md` を作成し、合意したアプローチAのマンガ構成案（1ページ目：デマ発生・そそのかし、2ページ目：一喝・本質提示で終了）を記述する。

**Step 2: コミット**

```bash
git add manga/urakane/manga_medical_expenses_prompts.md
git commit -m "feat: add manga prompts for medical expenses Episode 21"
```

---

### Task 2: money_secrets.json のチャットデータ修正

**Files:**
- Modify: `data/money_secrets.json`

**Step 1: JSONデータの chat_html 修正**

`data/money_secrets.json` の Episode 21 の `chat_html` を、カブ先生の一喝から開始するように書き換える。ミライのセリフ `{{MIRAI_ICON}}` も対話に含める。

**Step 2: テストの実行と検証**

Run:
```powershell
python scratch/test_money_secrets_data.py
```
Expected: PASS

**Step 3: コミット**

```bash
git add data/money_secrets.json
git commit -m "feat: restructure Ep 21 chat_html to start after Kabu-sensei's shout to eliminate redundancy"
```

---

### Task 3: 同期・ビルドおよび本番デプロイ

**Files:**
- Modify: `web-next/src/data/money_secrets.json` (同期)

**Step 1: ファイル同期と Next.js ローカルビルド**

Run:
```powershell
Copy-Item data/money_secrets.json web-next/src/data/money_secrets.json
cd web-next
npm run build
```
Expected: Build passes with 0 errors.

**Step 2: 本番デプロイと確認**

Run:
```powershell
python scripts/deploy_kabu.py
```
Expected: Sync completed successfully.

**Step 3: 本番URLのフェッチ確認**

`https://okane-no-manabi.jp/money_secret/21/` を読み込み、後半部分のみがチャットとしてレンダリングされていることを目視確認する。

**Step 4: コミット**

```bash
git commit --allow-empty -m "deploy: deploy restructured Ep 21 to live server"
```
