# SEO改善指示書 v3（残タスク版）
## okane-no-manabi.jp — 対応済み作業を除いた現状の指示書

作成日：2026年5月6日  
対象サイト：`https://okane-no-manabi.jp/`

---

## ✅ 対応済み（完了）

以下はすでに完了しているため、対応不要です。

| 作業 | 詳細 |
|------|------|
| robots.txtの修正 | `Disallow: /*?page=` を削除、301リダイレクトをGoogleが検出できる状態に |
| sitemap.xmlの更新 | 最新コンテンツ追加・文字化け解消・UTF-8保存 |
| canonicalタグの検証 | 全ページのclean URL形式（`/column/`等）での出力を確認 |
| 指示書の正規URL形式修正 | `?page=column` → `/column/` 形式に統一 |

---

## 🔴 今すぐ対応すべきこと

---

### 【手順1】Google Search Consoleで再クロールをリクエスト（最優先）

**目的：** robots.txt修正・sitemap更新・canonical修正をGoogleに認識させる

**手順：**

1. [Google Search Console](https://search.google.com/search-console/) にログイン
2. **サイトマップの再送信**
   - 左メニュー「インデックス」→「サイトマップ」
   - `https://okane-no-manabi.jp/sitemap.xml` を入力して送信
3. **主要ページのインデックス登録リクエスト**（以下を1件ずつ実施）
   - URL検査バーに各URLを入力 →「インデックス登録をリクエスト」をクリック

**リクエスト対象URL（優先順）：**

```
https://okane-no-manabi.jp/
https://okane-no-manabi.jp/column/
https://okane-no-manabi.jp/column/col_015/
https://okane-no-manabi.jp/column/col_016/
https://okane-no-manabi.jp/column/col_017/
https://okane-no-manabi.jp/manga/
https://okane-no-manabi.jp/money_secret/
https://okane-no-manabi.jp/maneta_diary/
```

> ℹ️ Googleの反映には通常3日〜2週間かかります。焦らず待つこと。

---

### 【手順2】H1タグの設置・修正（全ページ）

**目的：** SEOO診断で「最優先」と判定。H1未設置または不適切なページを修正する

**確認・修正方法：**

ブラウザの開発者ツール（F12）→「要素」タブで各ページのH1を確認する。

```html
<!-- 悪い例 -->
<h1>トップページ</h1>
<h1>home</h1>  <!-- 英語・意味なし -->

<!-- 良い例 -->
<h1>お金の学び｜初心者でもわかるお金・投資の基礎知識</h1>
```

**修正対象ページ（優先順）：**

| ページ | 設置すべきH1の例 |
|--------|----------------|
| トップ（`/`） | お金の学び｜初心者向けお金・投資の完全ガイド |
| コラム一覧（`/column/`） | お金のコラム一覧｜役立つ金融知識をわかりやすく解説 |
| マンガ（`/manga/`） | マンガでわかるお金の話｜楽しく学ぶ金融漫画 |
| ウラ金（`/money_secret/`） | 知らなきゃ損するお金の裏ワザ・節約術 |
| 日記（`/maneta_diary/`） | マネタ日記｜お金にまつわるリアルな体験談 |
| 各コラム記事 | 記事タイトルをそのままH1に（重複しないよう注意） |

**page.jsx での修正箇所：**

`page.jsx` の各ページコンポーネント内で `<h1>` タグを確認・追加する。
現状でH1が出力されているか、または `<title>` タグと混同されていないかチェックすること。

---

### 【手順3】見出し階層（Hn）の修正

**目的：** H1→H2→H3の順番を守り、Googleとスクリーンリーダーが正しく読めるようにする

**NGパターンの例と修正：**

```html
<!-- ❌ 悪い例：H1の次にH3が来ている -->
<h1>お金の学び</h1>
<h3>投資の基本</h3>

<!-- ✅ 良い例：順番通り -->
<h1>お金の学び</h1>
<h2>投資の基本</h2>
  <h3>株式投資とは</h3>
  <h3>投資信託とは</h3>
<h2>節約の考え方</h2>
```

**確認ツール：**
- ブラウザ拡張「HeadingsMap」でページごとの見出し構造を可視化できる

---

### 【手順4】構造化データ（JSON-LD）の設置

**目的：** Googleリッチリザルト・AI検索（ChatGPT・Perplexity）への対応。SEOO AI最適化スコアが現在0点のため。

#### 4-1. コラム記事ページ（`/column/col_xxx/`）

各コラム記事の `<head>` 内に追加：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "（記事タイトル）",
  "author": {
    "@type": "Person",
    "name": "著者名"
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-05-01",
  "publisher": {
    "@type": "Organization",
    "name": "お金の学び",
    "url": "https://okane-no-manabi.jp/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://okane-no-manabi.jp/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://okane-no-manabi.jp/column/col_xxx/"
  }
}
</script>
```

#### 4-2. トップページ（`/`）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "お金の学び",
  "url": "https://okane-no-manabi.jp/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://okane-no-manabi.jp/explore?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

#### 4-3. FAQがあるページ（QAページ等）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "（質問文）",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "（回答文）"
      }
    }
  ]
}
</script>
```

**設置後の検証：**
[Googleリッチリザルトテスト](https://search.google.com/test/rich-results) でURLを入力してエラーがないか確認する。

---

### 【手順5】コンテンツの拡充（E-E-A-T強化）

**目的：** コンテンツスコア49点（業界平均71.7）を改善する

**優先的に拡充すべきコンテンツ：**

各コラム記事（`manga.json`・`money_secrets.json`・`maneta_diary.json` で管理）を以下の観点で見直す。

| 項目 | 現状の課題 | 対策 |
|------|-----------|------|
| 文字数 | 記事が短い可能性 | 主要記事を2,000文字以上に拡充 |
| 著者情報 | 未表示または簡素 | 著者名・プロフィール・資格を記事内に明記 |
| 参考文献 | 不足 | 金融庁・日銀等の公式ソースへのリンクを追加 |
| FAQセクション | 未設置 | 各記事末尾に「よくある質問」を3〜5問追加 |
| 更新日 | 非表示の可能性 | 記事の「最終更新日」を明記する |

**Answer First形式（AI検索対策）への書き換え例：**

```
❌ 従来形式：
「投資とは何でしょうか。投資の歴史は古く...（長い前置き）...つまり投資とは資産を増やすことです」

✅ Answer First形式：
「投資とは、将来の利益を目的に資金を運用することです。
（→ 冒頭30文字で結論を述べてから詳細を説明）」
```

---

### 【手順6】内部リンクの強化

**目的：** 内部リンクスコア73点（業界平均83.4）を改善する

**修正アクション：**

- 各コラム記事の文中から、関連する他のコラム・マンガ・日記ページへのリンクを2〜5本追加する
- トップページに「新着記事」「おすすめ記事」セクションを設けてリンクを集約する
- パンくずリストをコラム詳細ページ（`/column/col_xxx/`）に設置する

**パンくずリストのHTML例：**

```html
<nav aria-label="パンくずリスト">
  <ol>
    <li><a href="/">ホーム</a></li>
    <li><a href="/column/">コラム</a></li>
    <li>（記事タイトル）</li>
  </ol>
</nav>
```

パンくずには合わせて `BreadcrumbList` スキーマも設置する：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://okane-no-manabi.jp/" },
    { "@type": "ListItem", "position": 2, "name": "コラム", "item": "https://okane-no-manabi.jp/column/" },
    { "@type": "ListItem", "position": 3, "name": "（記事タイトル）" }
  ]
}
</script>
```

---

### 【手順7】サイテーション・外部認知の獲得

**目的：** サイテーションスコア現在0点。外部からの認知を作る

**すぐにできる施策：**

- [ ] X（Twitter）・Instagramアカウントを開設し、記事公開のたびに投稿する
- [ ] Googleビジネスプロフィールを登録する
- [ ] note・はてなブログなどに転載・要約記事を投稿してサイトへリンクを張る
- [ ] PR TIMES等でサイトの特徴・新コンテンツをプレスリリースする
- [ ] 金融・お金系のまとめサイト・比較サイトへの掲載申請をする

---

## 📅 残タスクの優先スケジュール

| 期間 | 作業 |
|------|------|
| **今日〜明日** | 手順1：Search ConsoleでサイトマップとURLの再登録リクエスト |
| **今週中** | 手順2：H1タグの設置・修正（全ページ） |
| **今週中** | 手順3：見出し階層の確認・修正 |
| **来週** | 手順4：JSON-LD構造化データの設置（Article・WebSite・FAQ） |
| **来週〜再来週** | 手順5：主要記事のコンテンツ拡充・Answer First形式リライト |
| **来週〜再来週** | 手順6：内部リンク追加・パンくず設置 |
| **継続的に** | 手順7：SNS発信・サイテーション獲得 |
| **2週間後** | Search Consoleでインデックス登録状況を確認 |

---

## ✔️ 残タスク チェックリスト

### 今すぐ（Search Console）
- [ ] sitemap.xml を Search Console から再送信
- [ ] トップページのインデックス登録をリクエスト
- [ ] 主要コンテンツページ（column・manga・money_secret等）のインデックス登録をリクエスト

### HTMLタグ修正
- [ ] 全ページにH1タグを1つ設置（キーワード含む）
- [ ] 見出し階層（H1→H2→H3）が正しく構成されていることを確認
- [ ] パンくずリストをコラム詳細ページに設置

### 構造化データ
- [ ] コラム記事ページに `Article` JSON-LDを設置
- [ ] トップページに `WebSite` JSON-LDを設置
- [ ] FAQページに `FAQPage` JSON-LDを設置
- [ ] コラムページに `BreadcrumbList` JSON-LDを設置
- [ ] Googleリッチリザルトテストでエラーなしを確認

### コンテンツ
- [ ] 主要コラム記事を2,000文字以上に拡充
- [ ] 著者プロフィールを記事内に追加
- [ ] 各記事にFAQセクション（3〜5問）を追加
- [ ] Answer First形式で主要記事をリライト
- [ ] 最終更新日を記事に表示

### 内部リンク
- [ ] 各記事から関連記事への内部リンクを2〜5本追加

### 外部認知
- [ ] SNSアカウント開設・運用開始
- [ ] Googleビジネスプロフィール登録

---

> 📝 **進捗確認の目安**  
> 2週間後にSearch Consoleの「インデックス登録状況」を確認する。  
> インデックス未登録が65→40件以下になっていれば改善が進んでいる目安です。  
> 1ヶ月後にSEOOで再スコアリングし、スコア推移を確認する。
