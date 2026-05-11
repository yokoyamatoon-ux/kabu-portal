# 緊急対応依頼書：URL重複・インデックス未登録問題の修正
**対象サイト：** okane-no-manabi.jp  
**依頼日：** 2026年4月22日  
**優先度：** 🔴 最高（現状、全30ページがGoogleにインデックスされていない）

---

## ▼ 現状の問題サマリー

Googleサーチコンソールで以下の重大な問題を確認した。

| 問題 | 影響ページ数 | 深刻度 |
|------|-----------|--------|
| 代替ページ（canonicalタグあり・インデックス失敗） | 30ページ | 🔴 緊急 |
| www あり・なし の重複（インデックス失敗） | 1ページ | 🔴 緊急 |
| Googleが旧SPA形式URLをクロール中 | 30ページ以上 | 🔴 緊急 |

**結論：現在、サイトのページが1ページもGoogleに正しくインデックスされていない。**  
SEOの他の施策（コンテンツ追加・構造化データ等）はこの問題を解決してから実施しないと効果が出ない。

---

## ▼ 問題の原因

### 原因1：旧URL（SPA形式）と新URL（パス形式）が両方生きている

Googleが現在クロールしている旧URL（`?page=` 形式）と、現在のサイトで使われている新URL（`/column/col_013/` 形式）が**両方アクセス可能な状態**になっている。

Googleは同じコンテンツが2つのURLに存在すると「重複コンテンツ」と判断し、どちらをインデックスすべきか判断できなくなる。

**Googleがクロールしている旧URL（確認済み）：**
```
https://okane-no-manabi.jp/?page=manga
https://okane-no-manabi.jp/?page=privacy
https://okane-no-manabi.jp/?page=explore&q={search_term_string}
https://okane-no-manabi.jp/?page=column_detail&id=col_012
https://okane-no-manabi.jp/?page=column_detail&id=col_009
https://okane-no-manabi.jp/?page=column_detail&id=col_011
https://okane-no-manabi.jp/?page=contact
https://okane-no-manabi.jp/?page=disclaimer
https://okane-no-manabi.jp/?page=explore
https://okane-no-manabi.jp/?page=maneta_diary
https://okane-no-manabi.jp/?page=column
https://okane-no-manabi.jp/?page=quiz
https://okane-no-manabi.jp/?page=qa
https://okane-no-manabi.jp/?page=money_secret
https://okane-no-manabi.jp/?page=home
https://okane-no-manabi.jp/?page=about
https://www.okane-no-manabi.jp/?page=manga  （wwwあり版も存在）
https://www.okane-no-manabi.jp/?page=column
（他、合計30URL以上）
```

**現在の正しいURL（新形式）：**
```
https://okane-no-manabi.jp/column/col_012/
https://okane-no-manabi.jp/column/col_009/
https://okane-no-manabi.jp/manga/
https://okane-no-manabi.jp/about/
など
```

---

### 原因2：www あり・なし の両方が存在する

以下の2つのURLが両方アクセス可能になっており、Googleが重複と判定している。

```
https://okane-no-manabi.jp/      ← 正規にしたいURL
https://www.okane-no-manabi.jp/  ← インデックス「失敗」になっているURL
```

---

### 原因3：`?page=explore&q={search_term_string}` という検索パラメータURLが存在

```
https://okane-no-manabi.jp/?page=explore&q={search_term_string}
```

`{search_term_string}` はテンプレート変数が展開されずにそのままURLになっており、Googleにクロールされている。これは不正なURLとして処理される。

---

## ▼ 依頼する修正内容（3件）

---

### 【修正1】旧URL（`?page=` 形式）から新URL（パス形式）への 301リダイレクト設定

**優先度：** 🔴 最高  
**期限：** 即日対応をお願いしたい

旧SPA形式のURL全件を、対応する新URLへ301リダイレクトする。

**リダイレクト対応表：**

| 旧URL（リダイレクト元） | 新URL（リダイレクト先） |
|----------------------|----------------------|
| `/?page=home` | `/` |
| `/?page=about` | `/about/` |
| `/?page=manga` | `/manga/` |
| `/?page=column` | `/column/` |
| `/?page=quiz` | `/quiz/` |
| `/?page=explore` | `/explore/` |
| `/?page=qa` | `/qa/` |
| `/?page=money_secret` | `/money_secret/` |
| `/?page=maneta_diary` | `/maneta_diary/` |
| `/?page=privacy` | `/privacy/` |
| `/?page=disclaimer` | `/disclaimer/` |
| `/?page=contact` | `/contact/` |
| `/?page=column_detail&id=col_001` | `/column/col_001/` |
| `/?page=column_detail&id=col_002` | `/column/col_002/` |
| `/?page=column_detail&id=col_003` | `/column/col_003/` |
| `/?page=column_detail&id=col_004` | `/column/col_004/` |
| `/?page=column_detail&id=col_005` | `/column/col_005/` |
| `/?page=column_detail&id=col_006` | `/column/col_006/` |
| `/?page=column_detail&id=col_007` | `/column/col_007/` |
| `/?page=column_detail&id=col_008` | `/column/col_008/` |
| `/?page=column_detail&id=col_009` | `/column/col_009/` |
| `/?page=column_detail&id=col_010` | `/column/col_010/` |
| `/?page=column_detail&id=col_011` | `/column/col_011/` |
| `/?page=column_detail&id=col_012` | `/column/col_012/` |
| `/?page=column_detail&id=col_013` | `/column/col_013/` |
| `/?page=column_detail&id=col_014` | `/column/col_014/` |

**wwwあり版も同様に対応すること：**  
上記の旧URL全件について、`www.okane-no-manabi.jp` 版も同じリダイレクト先へ向ける。

**実装方法（サーバー環境に合わせて選択）：**

Apache（.htaccess）の場合：
```apache
RewriteEngine On

# www → non-www（修正2と合わせて先に処理）
RewriteCond %{HTTP_HOST} ^www\.okane-no-manabi\.jp$ [NC]
RewriteRule ^(.*)$ https://okane-no-manabi.jp/$1 [R=301,L]

# ?page=home → /
RewriteCond %{QUERY_STRING} ^page=home$
RewriteRule ^$ /? [R=301,L]

# ?page=about → /about/
RewriteCond %{QUERY_STRING} ^page=about$
RewriteRule ^$ /about/? [R=301,L]

# ?page=manga → /manga/
RewriteCond %{QUERY_STRING} ^page=manga$
RewriteRule ^$ /manga/? [R=301,L]

# ?page=column → /column/
RewriteCond %{QUERY_STRING} ^page=column$
RewriteRule ^$ /column/? [R=301,L]

# ?page=column_detail&id=col_XXX → /column/col_XXX/
RewriteCond %{QUERY_STRING} ^page=column_detail&id=(col_[0-9]+)$
RewriteRule ^$ /column/%1/? [R=301,L]

# その他のページ
RewriteCond %{QUERY_STRING} ^page=quiz$
RewriteRule ^$ /quiz/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=explore.*$
RewriteRule ^$ /explore/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=qa$
RewriteRule ^$ /qa/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=money_secret$
RewriteRule ^$ /money_secret/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=maneta_diary$
RewriteRule ^$ /maneta_diary/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=privacy$
RewriteRule ^$ /privacy/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=disclaimer$
RewriteRule ^$ /disclaimer/? [R=301,L]

RewriteCond %{QUERY_STRING} ^page=contact$
RewriteRule ^$ /contact/? [R=301,L]
```

Nginx の場合：
```nginx
# www → non-www
server {
    server_name www.okane-no-manabi.jp;
    return 301 https://okane-no-manabi.jp$request_uri;
}

# ?page= リダイレクト（アプリ側またはnginx map で処理）
# 例：
if ($arg_page = "home") {
    return 301 https://okane-no-manabi.jp/;
}
if ($arg_page = "about") {
    return 301 https://okane-no-manabi.jp/about/;
}
if ($arg_page = "manga") {
    return 301 https://okane-no-manabi.jp/manga/;
}
# ※ column_detail は id パラメータを取得してリダイレクト先を動的に生成すること
```

> ⚠️ **注意：** リダイレクト設定後、旧URLにアクセスして正しく転送されるか必ず確認すること。

---

### 【修正2】www あり・なしの統一

**優先度：** 🔴 最高  
**期限：** 修正1と同時に対応

`www.okane-no-manabi.jp` へのアクセスを全件 `okane-no-manabi.jp` へ301リダイレクトする。

```
https://www.okane-no-manabi.jp/  →  https://okane-no-manabi.jp/
https://www.okane-no-manabi.jp/任意のパス  →  https://okane-no-manabi.jp/同じパス
```

修正1のApache設定内の `www → non-www` ルールで対応可能。

**合わせてサーチコンソールでの対応（人手での作業）：**
1. Googleサーチコンソールにログイン
2. プロパティを `https://okane-no-manabi.jp/`（wwwなし）に統一して使用する
3. `https://www.okane-no-manabi.jp/` のプロパティが登録されている場合は削除

---

### 【修正3】`{search_term_string}` URLの無効化

**優先度：** 🟡 中（修正1・2の完了後に対応）

以下のURLがGoogleにクロールされており、テンプレート変数が未展開のまま露出している。

```
https://okane-no-manabi.jp/?page=explore&q={search_term_string}
```

**対応内容：**  
探す・体験ページ（`/explore/`）の検索機能において、クエリパラメータ `q=` を含むURLがサイト外にリンクされないよう修正する。また、このURLパターンに対してGoogleサーチコンソールの「URLパラメータ」設定でクロールを除外するか、robots.txt で以下を追加する。

```
# robots.txt に追加
Disallow: /*?page=explore&q=
```

---

## ▼ 修正後に行う確認作業（依頼者側で実施）

修正完了の連絡を受けたら、以下を順番に確認する。

### ステップ1：リダイレクトの動作確認

ブラウザで以下のURLにアクセスし、正しいURLに転送されるか確認する。

```
確認URL1: https://okane-no-manabi.jp/?page=home
→ 期待する転送先: https://okane-no-manabi.jp/

確認URL2: https://okane-no-manabi.jp/?page=column_detail&id=col_013
→ 期待する転送先: https://okane-no-manabi.jp/column/col_013/

確認URL3: https://www.okane-no-manabi.jp/
→ 期待する転送先: https://okane-no-manabi.jp/
```

### ステップ2：サーチコンソールでURL検査

1. Googleサーチコンソール → 「URL検査」
2. `https://okane-no-manabi.jp/column/col_013/` を入力
3. 「インターネット上のURLをテスト」をクリック
4. ステータスが「URLはGoogleに登録されています」または「登録可能」になっていることを確認

### ステップ3：インデックス登録をリクエスト

URL検査で問題がなければ、主要ページのインデックス登録をリクエストする。

**リクエストするURL（優先順）：**
```
1. https://okane-no-manabi.jp/
2. https://okane-no-manabi.jp/column/col_013/（最多アクセス記事）
3. https://okane-no-manabi.jp/column/col_009/
4. https://okane-no-manabi.jp/column/
5. https://okane-no-manabi.jp/manga/
```

手順：URL検査 → 「インデックス登録をリクエスト」ボタンをクリック

### ステップ4：サイトマップの送信

サイトマップが存在する場合、サーチコンソールから再送信する。

```
送信するサイトマップURL（存在確認後）:
https://okane-no-manabi.jp/sitemap.xml
```

---

## ▼ 修正後の期待タイムライン

| 時期 | 期待される変化 |
|------|-------------|
| 修正直後〜1週間 | Googleが新URLを再クロール開始 |
| 1〜2週間後 | 主要ページがインデックスに登録され始める |
| 2〜4週間後 | 全30ページ以上のインデックス登録が完了 |
| 1〜2ヶ月後 | 検索順位が安定し、検索流入が発生し始める |

> ⚠️ **重要：** この修正が完了するまで、コンテンツ追加・構造化データ実装などの他SEO施策は効果が出ない。修正1・2を最優先で対応すること。

---

## ▼ 質問・確認事項

修正前に以下を開発者に確認してほしい。

1. サーバー環境は何か（Apache / Nginx / Vercel / Netlify / その他）
2. `?page=` 形式のURL（旧SPA）は現在も動作するか、それとも404になるか
3. サイトマップ（sitemap.xml）は存在するか・最新の新URLが含まれているか
4. canonicalタグは各ページに設定済みか・wwwなし版の新URLを指しているか
