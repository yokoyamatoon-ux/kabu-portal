# 確認事項への回答
**日付：** 2026年4月22日

---

## Q1. サーバー環境は何でしょうか？

**→ 現時点では外部から判別できません。以下をご確認ください。**

ホスティングサービスのダッシュボードまたは契約情報を確認してください。

| 確認方法 | 手順 |
|---------|------|
| Vercel | vercel.com にログイン → プロジェクト名が表示されていれば Vercel |
| Netlify | app.netlify.com にログイン → サイト一覧に表示されていれば Netlify |
| レンタルサーバー | 契約メール・コントロールパネルで確認（エックスサーバー・さくら等） |
| Firebase Hosting | console.firebase.google.com で確認 |

> ⚠️ **重要：** サーバー環境によってリダイレクト設定の方法が完全に異なります。確認後にお知らせください。

---

## Q2. `?page=` 形式の旧URLは現在もアクセス可能ですか？

**→ ✅ アクセス可能（404ではない）。ただし挙動が問題。**

`https://okane-no-manabi.jp/?page=home` にアクセスしたところ、**404エラーにはならず、トップページのHTMLが返ってきました。**

ただし以下の問題があります。

```
アクセスしたURL:   https://okane-no-manabi.jp/?page=home
実際に返ったURL:   https://okane-no-manabi.jp/   ← ?page= が消えている
HTTPステータス:    200（リダイレクトではなく、そのまま表示）
```

**つまり現状は：**
- `?page=home` にアクセスすると `/` のコンテンツが **200 OK で返る**
- 301リダイレクトにはなっていない（URLバーが変わらないまま同じコンテンツを表示）
- Googleはこれを「2つのURLが同じコンテンツを持つ重複ページ」と判断する

**→ 修正1（301リダイレクト設定）は必須です。**

---

## Q3. サイトマップ（sitemap.xml）は存在しますか？

**→ ❌ 存在しない（または非公開）。**

`https://okane-no-manabi.jp/sitemap.xml` にアクセスしたところ、取得できませんでした。
`https://okane-no-manabi.jp/robots.txt` も同様に取得できませんでした。

**影響：**
サイトマップがないと、Googleが新形式のURL（`/column/col_013/` など）を自力で発見するまでに時間がかかります。

**→ 修正と同時にサイトマップの作成・送信が必要です（後述）。**

---

## Q4. canonicalタグは各ページに設定済みですか？

**→ ⚠️ 設定されているが、効いていない可能性があります。**

サーチコンソールの画面に「代替ページ（**適切なcanonicalタグあり**）」と表示されています。
これはcanonicalタグ自体は存在するが、Googleがそれを無視してインデックス登録に「失敗」している状態です。

**Googleがcanonicalを無視する主な原因：**

| 原因 | 可能性 |
|-----|--------|
| canonicalが `www` あり・なし で混在している | 🔴 高 |
| 旧URL（`?page=`）ページのcanonicalが旧URLを指している | 🔴 高 |
| SPAのため、canonicalがJavaScript実行後にしか挿入されない | 🟡 中 |

**→ 修正1・2のリダイレクト設定後に、canonicalタグが新URL（wwwなし）を正しく指しているか再確認が必要です。**

---

## ▼ 追加で必要な作業（修正1・2と同時に依頼）

上記の調査で新たに判明した作業を追加します。

---

### 【追加修正A】sitemap.xml の作成と送信

**優先度：** 🔴 高（修正1・2と同時）

新形式のURL全件を含むサイトマップを作成し、サーバーのルートに設置してください。

**sitemap.xml の内容（テンプレート）：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- トップページ -->
  <url>
    <loc>https://okane-no-manabi.jp/</loc>
    <lastmod>2026-04-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 固定ページ -->
  <url><loc>https://okane-no-manabi.jp/about/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/quiz/</loc><lastmod>2026-04-22</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/explore/</loc><lastmod>2026-04-22</lastmod><priority>0.6</priority></url>
  <url><loc>https://okane-no-manabi.jp/qa/</loc><lastmod>2026-04-22</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/money_secret/</loc><lastmod>2026-04-22</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/maneta_diary/</loc><lastmod>2026-04-22</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/privacy/</loc><lastmod>2026-04-22</lastmod><priority>0.3</priority></url>
  <url><loc>https://okane-no-manabi.jp/disclaimer/</loc><lastmod>2026-04-22</lastmod><priority>0.3</priority></url>
  <url><loc>https://okane-no-manabi.jp/contact/</loc><lastmod>2026-04-22</lastmod><priority>0.3</priority></url>

  <!-- マンガ各話 -->
  <url><loc>https://okane-no-manabi.jp/manga/1/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/2/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/3/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/4/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/5/</loc><lastmod>2026-04-22</lastmod><priority>0.8</priority></url>

  <!-- コラム記事 -->
  <url><loc>https://okane-no-manabi.jp/column/col_001/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_002/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_003/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_004/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_005/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_006/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_007/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_008/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_009/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_010/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_011/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_012/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_013/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_014/</loc><lastmod>2026-04-22</lastmod><priority>0.9</priority></url>

</urlset>
```

**設置場所：** `https://okane-no-manabi.jp/sitemap.xml` でアクセスできる場所

---

### 【追加修正B】robots.txt の作成・確認

**優先度：** 🟡 中

`https://okane-no-manabi.jp/robots.txt` が現在存在しないか取得できない状態です。
以下の内容で作成・設置してください。

```
User-agent: *
Allow: /

# 検索パラメータURLのクロールを禁止
Disallow: /*?page=
Disallow: /*?q=

Sitemap: https://okane-no-manabi.jp/sitemap.xml
```

---

## ▼ 修正完了後の依頼者側の作業

1. サーチコンソール → 「サイトマップ」 → `https://okane-no-manabi.jp/sitemap.xml` を送信
2. 主要ページ5件のインデックス登録リクエスト（元の依頼書「ステップ3」参照）
3. 1〜2週間後にサーチコンソールの「インデックス登録状況」を再確認

---

## ▼ 修正作業の全体まとめ（優先順）

| 優先度 | 修正内容 | 担当 |
|--------|---------|------|
| 🔴 最高 | 修正1：`?page=` → 新URL への301リダイレクト | 開発者 |
| 🔴 最高 | 修正2：www あり → なし への301リダイレクト | 開発者 |
| 🔴 高 | 追加A：sitemap.xml の作成・設置 | 開発者 |
| 🟡 中 | 追加B：robots.txt の作成・設置 | 開発者 |
| 🟡 中 | 修正3：`{search_term_string}` URLの無効化 | 開発者 |
| ✅ 修正後 | サイトマップ送信・インデックス登録リクエスト | 依頼者 |
