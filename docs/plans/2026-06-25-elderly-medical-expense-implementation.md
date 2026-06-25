# 高齢者医療費負担見直しコンテンツ 実装計画

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** note記事 `scratch/note_medical_expenses.md` と、ポータルサイトの「お金のウラ事情ファイル Episode 21」を作成し、テストおよびビルドが正常に通ることを検証のうえ、本番環境へデプロイ可能な状態にする。

**Architecture:** 
1. `scratch/note_medical_expenses.md` を note 執筆ルールに則って執筆し、`verify_note_compliance.py` の検証をパスさせる。
2. `data/money_secrets.json` に最新のエピソード21を prepended する。
3. ポータル側の検証用スクリプト `scratch/test_money_secrets_data.py` にテストケースを追加して検証をパスさせる。
4. ローカルで Next.js ビルドを通し、最終的に本番サーバーへデプロイする。

**Tech Stack:** Python, JSON, Markdown, Next.js (React)

---

### Task 1: TDD検証テストの登録と失敗確認

**Files:**
- Modify: `scratch/verify_note_compliance.py`
- Modify: `scratch/test_money_secrets_data.py`

**Step 1: noteバリデーションに新規ファイルを登録**

`scratch/verify_note_compliance.py` の `articles` リストに `"d:\\Antigravity\\Kabu\\scratch\\note_medical_expenses.md"` を追記する。

**Step 2: ポータルバリデーションに Episode 21 を登録**

`scratch/test_money_secrets_data.py` を読み込み、最新エピソードが `21` であることをチェックするアサーションを追加、または修正する。

**Step 3: テストを実行して失敗することを確認**

Run:
```powershell
python scratch/verify_note_compliance.py
python scratch/test_money_secrets_data.py
```
Expected: noteテストは `FILE NOT FOUND`、ポータルテストは `AssertionError` などで失敗する。

---

### Task 2: note 記事の作成と検証パス

**Files:**
- Create: `scratch/note_medical_expenses.md`

**Step 1: note記事の執筆**

`scratch/note_medical_expenses.md` を作成。YAMLフロントマター、カブ先生の口調（じゃよ、のう、ぞい、フォッフォッフォ 等が2回以上）、太字マークアップ `**` の禁止、CTAリンク、Xリンクを含めて執筆する。

**Step 2: noteバリデーションを実行してパスすることを確認**

Run: `python scratch/verify_note_compliance.py`
Expected: `note_medical_expenses.md` に対するチェックがすべて `[PASS] Perfect! Pass all checks.` になること。

**Step 3: コミット**

```bash
git add scratch/verify_note_compliance.py scratch/note_medical_expenses.md
git commit -m "feat: add note draft for medical expenses and register in validation"
```

---

### Task 3: お金のウラ事情ファイル Episode 21 の作成と検証

**Files:**
- Modify: `data/money_secrets.json`
- Create: `image/manga/urakane/urakane20260625_01.png` (ダミー)
- Create: `image/manga/urakane/urakane20260625_02.png` (ダミー)

**Step 1: ダミー画像の作成**

ビルドおよびテスト用のダミー画像を作成する。
Run:
```powershell
.\.venv\Scripts\python.exe -c "from PIL import Image; Image.new('RGB', (1280, 670), color='#8E44AD').save('image/manga/urakane/urakane20260625_01.png')"
.\.venv\Scripts\python.exe -c "from PIL import Image; Image.new('RGB', (1280, 670), color='#8E44AD').save('image/manga/urakane/urakane20260625_02.png')"
```

**Step 2: Episode 21 データを money_secrets.json に追加**

`data/money_secrets.json` の先頭に Episode 21 データを追加する。
`chat_html` には、ウラ金さんがマネ太にデマを吹き込んでそそのかし、カブ先生が一喝（「喝！！」）して訂正し、その後にウラ金さんが裏事情のファクトを突きつける対話劇を記述する。

**Step 3: テストを実行してパスすることを確認**

Run: `python scratch/test_money_secrets_data.py`
Expected: SUCCESS

**Step 4: コミット**

```bash
git add scratch/test_money_secrets_data.py data/money_secrets.json image/manga/urakane/urakane20260625_01.png image/manga/urakane/urakane20260625_02.png
git commit -m "feat: add money secrets Episode 21 data and dummy images"
```

---

### Task 4: ローカルNext.jsビルド検証

**Files:**
- Modify: `web-next/src/data/money_secrets.json` (同期)
- Create: `web-next/public/images/money_secret/urakane20260625_01.png` (同期)
- Create: `web-next/public/images/money_secret/urakane20260625_02.png` (同期)

**Step 1: データおよび画像の同期とビルドの実行**

Run:
```powershell
cp data/money_secrets.json web-next/src/data/money_secrets.json
cp image/manga/urakane/urakane20260625_01.png web-next/public/images/money_secret/urakane20260625_01.png
cp image/manga/urakane/urakane20260625_02.png web-next/public/images/money_secret/urakane20260625_02.png
cd web-next
npm run build
```
Expected: エラーなしでビルドが完了し、`/money_secret/21` が prerender されること。

**Step 2: コミット**

```bash
git commit --allow-empty -m "test: verify local Next.js build passes with money secrets Ep 21"
```

---

### Task 5: 本番画像の反映とデプロイ

**Files:**
- Modify: `image/manga/urakane/urakane20260625_01.png` (本番)
- Modify: `image/manga/urakane/urakane20260625_02.png` (本番)

**Step 1: 本番画像の配置**
ユーザーから送られてきた本番画像、あるいは生成した画像で `image/manga/urakane/urakane20260625_01.png` および `02.png` を上書きする。

**Step 2: サイト全体のビルドおよびデプロイの実行**

Run: `python scripts/deploy_kabu.py`
Expected: 正常終了。

**Step 3: デプロイ後の本番確認**

URL `https://okane-no-manabi.jp/money_secret/21/` にアクセスし、表示が正常であることを確認。

**Step 4: コミット**

```bash
git add image/manga/urakane/urakane20260625_01.png image/manga/urakane/urakane20260625_02.png
git commit -m "deploy: update production images and deploy Episode 21 to live server"
```
