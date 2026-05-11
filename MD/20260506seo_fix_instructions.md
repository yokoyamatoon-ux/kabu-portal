# SEO改善指示書
## okane-no-manabi.jp — Googleインデックス問題の対処手順

作成日：2026年5月6日  
対象サイト：`https://okane-no-manabi.jp/`

---

## 📊 現状サマリー

| 状態 | 件数 |
|------|------|
| インデックス未登録（未登録） | 65ページ |
| インデックス登録済み | 28ページ |

### インデックス未登録の理由内訳

| 理由 | 件数 | 優先度 |
|------|------|--------|
| 代替ページ（適切なcanonicalタグあり） | 32 | 🔴 最高 |
| 検出 - インデックス未登録 | 28 | 🟡 中 |
| Googleが別の正規ページを選択 | 2 | 🟡 中 |
| 重複（ユーザー指定の正規ページなし） | 1 | 🟠 高 |
| robots.txtによるブロック | 1 | 🟠 高 |
| ページにリダイレクトあり | 1 | 🟠 高 |
| クロール済み - インデックス未登録 | 0 | — |

---

## 🔍 根本原因

同じサイトが**複数のURLで同時にアクセス可能**になっており、Googleが重複ページと判断しています。

### 問題のあるURLパターン（すべて同じページを指している）

```
https://okane-no-manabi.jp/       ← 正規にしたいURL（https・wwwなし）
http://okane-no-manabi.jp/        ← ❌ http（非SSL）
https://www.okane-no-manabi.jp/   ← ❌ wwwあり
http://www.okane-no-manabi.jp/    ← ❌ http＋wwwあり
https://okane-no-manabi.jp/?ep=5  ← ❌ パラメータ付き
https://okane-no-manabi.jp/?page=home ← ❌ クエリパラメータ
```

---

## ✅ 対処手順（優先順位順）

---

### 【手順1】301リダイレクトの設定（最優先）

**目的：** すべてのURLを `https://okane-no-manabi.jp/` に統一する

**`.htaccess` に以下を追記する（Apacheサーバーの場合）：**

```apache
RewriteEngine On

# httpをhttpsにリダイレクト
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# wwwをwwwなしにリダイレクト
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [R=301,L]
```

**Nginxサーバーの場合：**

```nginx
server {
    listen 80;
    server_name okane-no-manabi.jp www.okane-no-manabi.jp;
    return 301 https://okane-no-manabi.jp$request_uri;
}

server {
    listen 443 ssl;
    server_name www.okane-no-manabi.jp;
    return 301 https://okane-no-manabi.jp$request_uri;
}
```

> ⚠️ **注意：** `.htaccess`の編集はサーバー全体に影響します。必ずバックアップを取ってから作業してください。

---

### 【手順2】canonicalタグの全ページへの設置

**目的：** GoogleにどのURLが正規ページかを明示的に伝える

全ページの `<head>` 内に以下を追加する：

```html
<link rel="canonical" href="https://okane-no-manabi.jp/（各ページのパス）" />
```

**ページ別の設定例：**

| ページ | canonicalに設定するURL |
|--------|----------------------|
| トップページ | `https://okane-no-manabi.jp/` |
| コラム一覧 | `https://okane-no-manabi.jp/column/` |
| コラム詳細（col_012） | `https://okane-no-manabi.jp/column/col_012/` |
| プライバシーポリシー | `https://okane-no-manabi.jp/privacy/` |
| お問い合わせ | `https://okane-no-manabi.jp/contact/` |

**重要なポイント：**

- `www` は**含めない**
- `http` ではなく **`https`** を使用する
- クエリパラメータ（`?page=xxx`）は使用せず、リダイレクト先の**クリーンURL（`/column/`など）**をcanonicalに指定する
- `?ep=5` のようなページネーションパラメータは、基本ページ（`/`）をcanonicalに指定する（重複回避のため）

---

### 【手順3】`?ep=5` などのパラメータURLの対処

**問題：** `https://okane-no-manabi.jp/?ep=5` がGoogleにクロールされ、重複として扱われている

**対策A：canonicalで正規URLを指定（推奨）**

`?ep=5` のページのcanonicalを、ページネーションの1ページ目に向ける：

```html
<!-- ?ep=5 のページのhead内 -->
<link rel="canonical" href="https://okane-no-manabi.jp/" />
```

**対策B：Google Search Consoleでパラメータを設定**

Search Console → 旧Search Console → クロール → URLパラメータ から `ep` を「コンテンツに影響なし」に設定する。

---

### 【手順4】robots.txtの確認と修正

**目的：** インデックスさせたいページがブロックされていないか確認する

ブラウザで以下のURLにアクセスして内容を確認する：

```
https://okane-no-manabi.jp/robots.txt
```

**確認ポイント：**

```
# 問題のある設定例（リダイレクトの発見を妨げる）
Disallow: /*?page=

# 正しい設定例（クリーンURLへの移行を促進）
# パラメータ付きURLへのアクセスを許可し、301リダイレクトをGoogleに認識させる
Disallow: /*?q=  ← 検索結果ページなど、インデックス不要なものだけ指定
Allow: /
```

インデックスさせたいページが `Disallow` に含まれている場合は削除する。

---

### 【手順5】リダイレクト設定の確認

**目的：** リダイレクトが正しく動作しているか確認する

以下のコマンドで各URLのリダイレクト状況を確認する：

```bash
curl -I http://okane-no-manabi.jp/
curl -I http://www.okane-no-manabi.jp/
curl -I https://www.okane-no-manabi.jp/
```

**正常な応答の例：**

```
HTTP/1.1 301 Moved Permanently
Location: https://okane-no-manabi.jp/
```

`301` が返っていれば正常。`200` が返る場合はリダイレクト未設定。

---

### 【手順6】Search Consoleでインデックス登録をリクエスト

**目的：** 修正後にGoogleに再クロールを依頼する

1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. 上部の「URLを検査」バーに正規URLを入力（例：`https://okane-no-manabi.jp/`）
3. 「インデックス登録をリクエスト」をクリック
4. 主要ページ（トップ・コラム・各記事）について繰り返す

> ℹ️ Googleの反映には数日〜数週間かかることがあります。

---

### 【手順7】サイトマップの送信・更新

**目的：** Googleに正規URLの一覧を伝え、クロールを促進する

**サイトマップの確認：**

```
https://okane-no-manabi.jp/sitemap.xml
```

**サイトマップに含めるべきURL形式（統一後）：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://okane-no-manabi.jp/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://okane-no-manabi.jp/?page=column</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 以下、各ページを追加 -->
</urlset>
```

**Search ConsoleでのXMLサイトマップ送信：**

1. Search Console → インデックス → サイトマップ
2. サイトマップのURLを入力して送信

---

## 📅 作業スケジュール（目安）

| タイミング | 作業内容 |
|-----------|---------|
| 即日 | 手順1（リダイレクト設定） |
| 即日〜翌日 | 手順2（canonicalタグ設置） |
| 翌日 | 手順3・4・5（パラメータ・robots.txt・リダイレクト確認） |
| 翌日 | 手順6（Search Consoleでリクエスト） |
| 翌日 | 手順7（サイトマップ送信） |
| 1〜2週間後 | Search Consoleで改善状況を確認 |

---

## ✔️ 完了確認チェックリスト

- [ ] `http://okane-no-manabi.jp/` → `https://okane-no-manabi.jp/` に301リダイレクト
- [ ] `https://www.okane-no-manabi.jp/` → `https://okane-no-manabi.jp/` に301リダイレクト
- [ ] 全ページにcanonicalタグを設置（wwwなし・https）
- [ ] `?ep=5` などのパラメータページのcanonicalを設定
- [ ] robots.txtでインデックスしたいページがブロックされていないことを確認
- [ ] サイトマップのURLがすべて `https://okane-no-manabi.jp/`（wwwなし）形式になっている
- [ ] Search Consoleでサイトマップを送信済み
- [ ] 主要ページについてインデックス登録をリクエスト済み

---

## 📞 問い合わせ・補足

ご利用の環境（WordPress、独自実装など）によって設定方法が異なります。  
環境が不明な場合は、以下を確認してください：

- WordPress → **Yoast SEO** または **All in One SEO** プラグインでcanonical・リダイレクトを一括管理可能
- 独自実装（React/Vue SPAなど） → 各ページコンポーネントで `<head>` に動的にcanonicalを挿入する
- サーバー設定不明 → レンタルサーバーの管理画面（cPanel等）で「リダイレクト」設定を確認
