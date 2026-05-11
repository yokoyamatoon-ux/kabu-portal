# SEO・AIO 完全対応指示書（統合版）
**対象サイト：** okane-no-manabi.jp  
**作成日：** 2026年4月24日  
**優先度：** Phase 1 → 2 → 3 の順で必ず進めること

> ⚠️ **重要：** Phase 1（技術修正）が完了するまで、Phase 2・3の対策はGoogleへの反映がゼロになる。  
> 開発者への依頼と並行してコンテンツ作業（Phase 2）は進めてOK。  
> ただし**構造化データ（Phase 3）はインデックスが通ってから**着手すること。

---

## 現状サマリー

| 指標 | 現状 |
|------|------|
| Googleインデックス登録数 | **0件**（全30ページ未登録） |
| SEO総合スコア | **32 / 100** |
| AIO対応スコア | **22 / 100** |
| YMYL対応スコア | **48 / 100** |

### 致命的な問題（3件）

1. 旧URL（`?page=` 形式）と新URL（`/column/col_013/`）が重複存在し、Googleが正規URLを特定できない
2. 全ページで `<title>` / `<meta description>` / OGPタグがHTMLに未設定
3. `sitemap.xml` / `robots.txt` が未存在

---

# PHASE 1｜開発者への依頼（即日〜1週間）

> 別ファイル `dev_redirect_fix_request.md` および `dev_qa_response.md` と合わせて開発者に渡すこと。

---

## 【開発1】旧URL → 新URL への 301リダイレクト設定

**優先度：🔴 最高**

### 背景
`https://okane-no-manabi.jp/?page=home` にアクセスすると、404ではなく **200 OK** で同一コンテンツが返る状態。301リダイレクトが未設定のため、Googleから「60件の重複コンテンツ」として判断されており、全ページがインデックスされない原因になっている。

### リダイレクト対応表

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

※ `www.okane-no-manabi.jp` の旧URL版も同様にリダイレクト設定すること。

### 実装例（Apache .htaccess）

```apache
RewriteEngine On

# www → non-www
RewriteCond %{HTTP_HOST} ^www\.okane-no-manabi\.jp$ [NC]
RewriteRule ^(.*)$ https://okane-no-manabi.jp/$1 [R=301,L]

# ?page=home → /
RewriteCond %{QUERY_STRING} ^page=home$
RewriteRule ^$ /? [R=301,L]

# ?page=about → /about/
RewriteCond %{QUERY_STRING} ^page=about$
RewriteRule ^$ /about/? [R=301,L]

# ?page=column_detail&id=col_XXX → /column/col_XXX/
RewriteCond %{QUERY_STRING} ^page=column_detail&id=(col_[0-9]+)$
RewriteRule ^$ /column/%1/? [R=301,L]

# その他ページ（manga, column, quiz, explore, qa等）
RewriteCond %{QUERY_STRING} ^page=([a-z_]+)$
RewriteRule ^$ /%1/? [R=301,L]

# 検索パラメータURLを無効化
Disallow: /*?page=explore&q=
```

---

## 【開発2】www あり・なしの統一

**優先度：🔴 最高（開発1と同時）**

`www.okane-no-manabi.jp` → `okane-no-manabi.jp` に301リダイレクトで統一する。

```apache
# www → non-www（開発1の.htaccessに含める）
RewriteCond %{HTTP_HOST} ^www\.okane-no-manabi\.jp$ [NC]
RewriteRule ^(.*)$ https://okane-no-manabi.jp/$1 [R=301,L]
```

**サーチコンソール側の対応（依頼者が実施）：**
- プロパティを `https://okane-no-manabi.jp/`（wwwなし）に統一して使用する
- `https://www.okane-no-manabi.jp/` のプロパティが登録されている場合は削除

---

## 【開発3】全ページに title・meta description・OGPタグを静的設定

**優先度：🔴 最高**

### 背景
取得した全ページ（`/about/`・`/privacy/`・`/disclaimer/`）のHTMLソースに `<title>` / `<meta name="description">` / OGPタグが一切存在しない。SPAのJavaScriptで動的挿入されているが、Googleクローラーへの到達率が著しく低い。

### 各ページの設定値

| ページURL | title（60字以内） | meta description（120字以内） |
|---------|-----------------|---------------------------|
| `/` | カブ先生のお金の学校 \| マンガで楽しく学ぶ投資の基本 | 株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。難しい言葉ゼロで初心者でもわかりやすく解説。 |
| `/about/` | カブ先生の学校に入学しよう！お金の学校とは \| カブ先生 | 老後2000万円問題・物価上昇・低金利時代に必要なお金の知識をマンガで学べる場所。まずはここから始めよう。 |
| `/manga/` | マンガで学ぶ投資の基本 全5話 \| カブ先生のお金の学校 | 株・配当金・株価の仕組み・NISA・オルカンをマンガで楽しく解説。第1話〜第5話まで無料で読めるぞ！ |
| `/column/` | 投資コラム一覧 \| カブ先生のお金の学校 | NISA・S&P500・高配当株・ゴールド・ビットコインなど最新の投資テーマをカブ先生がわかりやすく解説するコラム集。 |
| `/column/col_013/` | S&P500 vs オルカン 初心者におすすめはどっち？【2026年版】 | NISAで投資を始めるならS&P500とオルカンどちらを選ぶべき？特徴・違い・カブ先生の結論をわかりやすく解説。 |
| `/column/col_009/` | 新NISAの始め方 3ステップでやさしく解説【2026年版】 | NISAって何から始めればいい？口座開設〜商品選びまで、初心者向けに最短ルートをカブ先生が解説するぞ。 |
| `/column/col_010/` | 高配当株の罠！利回り10%超に飛びついてはいけない理由 | 高配当株は魅力的だが落とし穴も多い。失敗しないための3つのポイントをカブ先生がわかりやすく解説。 |
| `/column/col_007/` | 暴落が来たらまず何をする？初心者のための3ステップ | 株価暴落でパニックにならないために。資産を守る具体的な行動をカブ先生が解説。積立NISA継続の判断基準も。 |
| `/column/col_003/` | NISAって結局何をすればいい？2026年版まとめ | 新NISA開始から2年。結局どの商品が最強？カブ先生がズバッと教えるぞ。 |
| `/column/col_004/` | 長期金利2%超。住宅ローン・株・預金への影響を解説 | 26年ぶりの金利水準が私たちの生活にどう影響するのか。住宅ローン・投資・預金それぞれの対策をわかりやすく解説。 |
| `/column/col_002/` | 日銀が金利を上げたのになぜ円安になったの？理由を解説 | 普通は金利アップ＝円高のはず。なぜ逆の動きをしたのか？為替と金利の関係をカブ先生がわかりやすく解説。 |
| `/column/col_011/` | 金（ゴールド）が史上最高値。なぜ今、金が買われるの？ | ゴールドがなぜ今注目されているのか。金の特性・買い方・リスクをカブ先生が初心者向けにわかりやすく解説。 |
| `/column/col_012/` | AIエージェントが変える仕事と投資の未来【2026年最新】 | 自律型AIが普及した世界で、私たちの働き方・投資先はどう変わるのか？カブ先生が先読みするぞ。 |
| `/column/col_014/` | ビットコイン最高値更新。仮想通貨は資産として定着したのか | ビットコインが再び最高値更新。以前のバブルとの違いをカブ先生がデジタル・ゴールドとして解説。 |
| `/privacy/` | プライバシーポリシー \| カブ先生のお金の学校 | カブ先生のお金の学校のプライバシーポリシー。個人情報の取り扱い・Cookie・アクセス解析ツールについて説明します。 |
| `/disclaimer/` | 免責事項 \| カブ先生のお金の学校 | 本サイトの情報は教育目的です。投資判断はご自身の責任で行ってください。免責事項・著作権についての説明。 |

### 実装フォーマット（各ページの `<head>` 内）

```html
<title>S&P500 vs オルカン 初心者におすすめはどっち？【2026年版】| カブ先生のお金の学校</title>
<meta name="description" content="NISAで投資を始めるならS&P500とオルカンどちらを選ぶべき？特徴・違い・カブ先生の結論をわかりやすく解説。">

<!-- OGP（SNSシェア用） -->
<meta property="og:title" content="S&P500 vs オルカン 初心者におすすめはどっち？">
<meta property="og:description" content="NISAで投資を始めるならS&P500とオルカンどちらを選ぶべき？カブ先生が結論を出すぞ。">
<meta property="og:image" content="https://okane-no-manabi.jp/images/ogp/col_013.png">
<meta property="og:url" content="https://okane-no-manabi.jp/column/col_013/">
<meta property="og:type" content="article">
<meta property="og:site_name" content="カブ先生のお金の学校">

<!-- canonical（wwwなし・パス形式のURLを正規として指定） -->
<link rel="canonical" href="https://okane-no-manabi.jp/column/col_013/">
```

---

## 【開発4】sitemap.xml の作成・設置

**優先度：🔴 高（開発1〜3と同時）**

`https://okane-no-manabi.jp/sitemap.xml` でアクセスできる場所に設置する。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://okane-no-manabi.jp/</loc><lastmod>2026-04-24</lastmod><priority>1.0</priority></url>
  <url><loc>https://okane-no-manabi.jp/about/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/1/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/2/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/3/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/4/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/manga/5/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/</loc><lastmod>2026-04-24</lastmod><priority>0.8</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_001/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_002/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_003/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_004/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_005/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_006/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_007/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_008/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_009/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_010/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_011/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_012/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_013/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/column/col_014/</loc><lastmod>2026-04-24</lastmod><priority>0.9</priority></url>
  <url><loc>https://okane-no-manabi.jp/quiz/</loc><lastmod>2026-04-24</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/explore/</loc><lastmod>2026-04-24</lastmod><priority>0.6</priority></url>
  <url><loc>https://okane-no-manabi.jp/qa/</loc><lastmod>2026-04-24</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/money_secret/</loc><lastmod>2026-04-24</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/maneta_diary/</loc><lastmod>2026-04-24</lastmod><priority>0.7</priority></url>
  <url><loc>https://okane-no-manabi.jp/privacy/</loc><lastmod>2026-04-24</lastmod><priority>0.3</priority></url>
  <url><loc>https://okane-no-manabi.jp/disclaimer/</loc><lastmod>2026-04-24</lastmod><priority>0.3</priority></url>
  <url><loc>https://okane-no-manabi.jp/contact/</loc><lastmod>2026-04-24</lastmod><priority>0.3</priority></url>
</urlset>
```

---

## 【開発5】robots.txt の作成・設置

```
User-agent: *
Allow: /

# 旧URL・検索パラメータのクロールを禁止
Disallow: /*?page=
Disallow: /*?q=

Sitemap: https://okane-no-manabi.jp/sitemap.xml
```

---

## ▼ Phase 1 完了後に依頼者がすること（30分）

| 手順 | 作業内容 |
|------|---------|
| 1 | リダイレクト動作確認：`/?page=home` → `/` に転送されるかブラウザで確認 |
| 2 | サーチコンソール → 「サイトマップ」→ `sitemap.xml` を送信 |
| 3 | URL検査で主要ページ5件のインデックス登録をリクエスト（`/`・`/column/col_013/`・`/column/col_009/`・`/column/`・`/manga/`） |
| 4 | 1〜2週間後にインデックス登録状況を再確認 |

---

# PHASE 2｜コンテンツ・E-E-A-T強化（1〜2週間）

> 開発者への依頼と並行して進めてOK。Antigravity（Google）を使って対応する。

---

## 【作業2-1】アフィリエイト広告表示の追加（今日中）

**対象：** アフィリエイトリンク（楽天証券・松井証券）が存在する全ページ  
**確認済みページ：** `/about/`・コラム各記事・マンガ各話

各ページの **本文最上部（タイトル直下）** に以下を追加する。

```
※本ページには広告・アフィリエイトリンクが含まれます。
```

---

## 【作業2-2】監修者・運営者情報の追加

**対象：** `/about/` ページ

### 追加する内容

```
【運営者情報】
運営：KABU PORTAL Project
監修：[以下のパターンから選択して記載]
```

**パターンA（実名・資格あり）：**
```
監修：山田太郎（CFP認定ファイナンシャルプランナー・投資歴15年）
本サイトのコンテンツはXXXが内容を確認・監修しています。
```

**パターンB（ペンネーム）：**
```
監修：カブ先生（元証券会社勤務・個人投資歴20年。2026年よりお金の学校を運営）
```

**パターンC（資格なし・最低限）：**
```
本サイトの情報は、投資経験のある個人が教育目的で作成しています。
投資判断は必ずご自身の責任で行ってください。
```

**各コラム末尾にも追加：**
```
この記事は [監修者名・肩書き] が監修しています。
```

---

## 【作業2-3】全コラム記事にFAQセクションを追加

**対象：** `/column/col_001/` 〜 `/column/col_014/`  
**設置場所：** 各記事の「カブ先生より一言」ブロックの直前  
**形式：** 1記事あたり3問

### テンプレート

```markdown
## よくある質問

**Q. [この記事テーマに関連する疑問1]**  
A. [50〜100字で明確に答える。断言型で書く]

**Q. [この記事テーマに関連する疑問2]**  
A. [50〜100字で明確に答える]

**Q. [この記事テーマに関連する疑問3]**  
A. [50〜100字で明確に答える]
```

### 各記事のFAQ案

| 記事 | Q1 | Q2 | Q3 |
|-----|----|----|-----|
| col_013 S&P500 vs オルカン | S&P500とオルカンの手数料は違いますか？ | 両方買う必要はありますか？ | 途中で乗り換えられますか？ |
| col_009 NISAの始め方 | NISA口座は複数の証券会社に作れますか？ | 途中で引き出すとどうなりますか？ | 未成年でもNISAは使えますか？ |
| col_010 高配当株 | 配当利回り何%以上が高配当ですか？ | 高配当株は減配するリスクがありますか？ | NISAで高配当株は買えますか？ |
| col_007 暴落対策 | 暴落したとき売るべきですか？ | 積立NISAは暴落時も続けるべきですか？ | 暴落はどのくらいの頻度で起きますか？ |
| col_003 NISAまとめ | 新NISAの年間投資上限はいくらですか？ | NISAとiDeCoはどちらを優先すべきですか？ | NISAで損した場合どうなりますか？ |
| col_004 長期金利 | 長期金利が上がると住宅ローンはどうなりますか？ | 長期金利が上がると株はどうなりますか？ | 長期金利はどこで確認できますか？ |
| col_002 日銀・円安 | 円安になると投資家にとって有利ですか？ | 円安対策に有効な投資はありますか？ | 日銀の政策はどこで発表されますか？ |
| col_011 ゴールド | 個人が金（ゴールド）を買うにはどうすればいいですか？ | 金とビットコインはどちらが安全資産ですか？ | 金はNISAで購入できますか？ |
| col_014 ビットコイン | ビットコインはどこで買えますか？ | 仮想通貨はNISAの対象ですか？ | ビットコインの税金はどうなりますか？ |

---

## 【作業2-4】全コラム記事の冒頭に「定義段落」を追加（AIO対策）

**なぜ必要か：**  
AI Overview・ChatGPT・Perplexityに引用されるには「AIが1文で切り出せる定義・断言文」が必要。記事冒頭に以下の形式で追加する。

### フォーマット

```
[キーワード]とは、[50字以内の明確な定義]です。（出典：[金融庁/日銀等]）
```

### 各記事の定義段落案

| 記事 | 追加する定義段落 |
|-----|--------------|
| col_013 S&P500 vs オルカン | S&P500とは、米国を代表する500社の株価指数で、世界で最も広く使われるインデックス投資の基準です。 |
| col_009 NISAの始め方 | NISAとは、年間最大360万円まで運用益・配当金が非課税になる国の投資優遇制度です。（出典：金融庁） |
| col_010 高配当株 | 高配当株とは、配当利回りが3〜4%以上の株式のことで、インカムゲインを重視する投資家に人気があります。 |
| col_007 暴落対策 | 株価暴落とは、相場が短期間に20%以上下落する現象で、長期投資では避けて通れないリスクの一つです。 |
| col_003 NISAまとめ | 新NISAは2024年から始まった制度で、非課税保有限度額が最大1,800万円に拡大された恒久的な投資優遇制度です。 |

---

## 【作業2-5】全コラムに参考出典を追記

**対象：** 数値・統計・制度情報を含む全コラム記事  
**設置場所：** 各記事末尾

### 各記事に追記すべき出典

| 記事 | 追記する出典 |
|-----|-----------|
| col_009 NISAの始め方 | 金融庁「NISA特設ウェブサイト」https://www.fsa.go.jp/policy/nisa2/ |
| col_013 S&P500 vs オルカン | 三菱UFJアセットマネジメント「eMAXIS Slim全世界株式」目論見書 |
| col_010 高配当株 | 東京証券取引所「上場会社統計資料」 |
| col_004 長期金利 | 日本銀行「長期金利の推移」https://www.boj.or.jp/ |
| col_002 日銀・円安 | 日本銀行公式発表・財務省為替統計 |
| col_011 ゴールド | 世界ゴールド協会（World Gold Council）公式データ |

### 追記フォーマット

```
【参考・出典】
・[機関名]「[資料名]」（URL） ※最終確認：2026年○月
```

---

## 【作業2-6】記事間の内部リンクを追加

**設置場所：** 各記事の本文末尾（FAQセクションの前）

### リンク対応表

| 記事 | 追加するリンク先 | リンクテキスト |
|-----|--------------|--------------|
| col_013 S&P500 vs オルカン | → col_009 | NISAでの購入手順はこちらで解説しているぞ |
| col_013 S&P500 vs オルカン | → col_003 | NISAの全体像はこちらも読むのじゃ |
| col_009 NISAの始め方 | → col_013 | 口座を作ったら何を買うかはこちらへ |
| col_009 NISAの始め方 | → col_003 | NISAの全体像はこちらで解説しているぞ |
| col_010 高配当株 | → マンガ第2話 | 配当金の仕組みはマンガでも学べるぞ |
| col_007 暴落対策 | → col_009 | まだNISAを始めていない人はこちらから |
| col_003 NISAまとめ | → col_013 | どの商品を買うか迷ったらこちらを読むのじゃ |
| col_004 長期金利 | → col_002 | 日銀と為替の関係はこちらで解説しているぞ |
| col_002 日銀・円安 | → col_004 | 長期金利との関係はこちらも合わせて読もう |
| マンガ第4話 NISAの始め方 | → col_009 | コラムでも手順を詳しく解説しているぞ |
| マンガ第5話 オルカン | → col_013 | S&P500との比較コラムも読んでみるのじゃ |

### 追加フォーマット

```
📚 あわせて読みたい
→ [リンクテキスト]（リンク先URL）
```

---

## 【作業2-7】マンガ各話にテキスト解説を追加

**詳細：** 別ファイル `manga_text_instructions.md` を参照  
**文量：** 各話 1,500〜2,000字  
**構成：** 導入の対話 → 核心の解説 → まとめ → FAQセクション

---

# PHASE 3｜技術・AIO対策（2〜3ヶ月）

> Phase 1のインデックス登録完了を確認してから着手すること。

---

## 【開発6】構造化データ（schema.org）の実装

### ① Articleスキーマ（全コラム記事）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "S&P500 vs オール・カントリー（オルカン）：初心者におすすめはどっち？",
  "datePublished": "2026-04-13",
  "dateModified": "2026-04-24",
  "author": {
    "@type": "Person",
    "name": "カブ先生",
    "description": "投資歴30年のベテラン投資家・ファイナンシャルプランナー"
  },
  "publisher": {
    "@type": "Organization",
    "name": "カブ先生のお金の学校",
    "url": "https://okane-no-manabi.jp"
  },
  "description": "NISAで投資を始めるならS&P500とオルカンどちらがいい？カブ先生が初心者向けにわかりやすく解説。"
}
</script>
```

### ② FAQPageスキーマ（作業2-3のFAQ追加後）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "S&P500とオルカンの手数料は違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ほぼ同程度です。どちらもeMAXIS Slimシリーズであれば年0.1〜0.2%程度の信託報酬で運用できます。"
      }
    },
    {
      "@type": "Question",
      "name": "S&P500とオルカンを両方買う必要はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "必要ありません。オルカンには米国株が約6割含まれているため、どちらか1本で十分な分散効果が得られます。"
      }
    }
  ]
}
</script>
```

### ③ Personスキーマ（作業2-2の監修者情報追加後）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "カブ先生",
  "jobTitle": "投資教育コンテンツ監修",
  "description": "投資歴30年。初心者向け金融リテラシー教育に従事。",
  "worksFor": {
    "@type": "Organization",
    "name": "カブ先生のお金の学校",
    "url": "https://okane-no-manabi.jp"
  }
}
</script>
```

---

## 【開発7】SPA → SSR/SSG への移行（根本解決）

**背景：**  
SPAのままではGoogleクローラーがJavaScript実行後のコンテンツを読み取れないリスクが残る。Next.js（SSG）等への移行でこの問題を根本解決できる。

**対応内容：**  
開発者と相談の上、以下のいずれかを検討する。

| 方法 | 難易度 | 効果 |
|------|--------|------|
| Next.js（SSG）へ移行 | 高 | 根本解決・最大効果 |
| prerender.io 等のSEOミドルウェア導入 | 中 | クローラーへの静的HTML提供 |
| 現状のままでcanonical・metaタグを静的に設定 | 低 | 部分的改善（開発3で対応済み） |

---

# 全作業 完了チェックリスト

## Phase 1（開発者依頼・即日〜1週間）

| # | 作業 | 完了 |
|---|------|------|
| 開発1 | 旧URL → 新URLへの301リダイレクト設定（全30URL） | □ |
| 開発2 | www有無の統一（301リダイレクト） | □ |
| 開発3 | 全ページにtitle・meta description・OGP・canonicalを設定 | □ |
| 開発4 | sitemap.xml の作成・設置 | □ |
| 開発5 | robots.txt の作成・設置 | □ |
| ー | サーチコンソールでサイトマップ送信 | □ |
| ー | 主要5ページのインデックス登録リクエスト | □ |

## Phase 2（コンテンツ作業・1〜2週間）

| # | 作業 | 完了 |
|---|------|------|
| 2-1 | アフィリエイト表示を全該当ページ冒頭に追加 | □ |
| 2-2 | /about/ に監修者・運営者情報を追加 | □ |
| 2-2b | 各コラム末尾に「監修：〇〇」を追加 | □ |
| 2-3 | 全コラムにFAQセクションを追加（3問ずつ） | □ |
| 2-4 | 全コラム冒頭に定義段落を追加 | □ |
| 2-5 | 全コラムに参考出典を追記 | □ |
| 2-6 | 記事間の内部リンクを追加（対応表通り） | □ |
| 2-7 | マンガ各話にテキスト解説を追加（別指示書参照） | □ |

## Phase 3（技術・AIO対策・2〜3ヶ月）

| # | 作業 | 完了 |
|---|------|------|
| 開発6a | Articleスキーマを全コラムに実装 | □ |
| 開発6b | FAQPageスキーマを全記事に実装 | □ |
| 開発6c | Personスキーマを /about/ に実装 | □ |
| 開発7 | SPA → SSR/SSG への移行（要開発者相談） | □ |

---

## 参照ファイル一覧

| ファイル名 | 内容 |
|-----------|------|
| `dev_redirect_fix_request.md` | 開発者向け301リダイレクト依頼書（詳細版） |
| `dev_qa_response.md` | 開発者からの質問への回答・調査結果 |
| `manga_text_instructions.md` | マンガページ解説文作成指示書（第1〜5話） |
| `seo_instructions.md` | SEO対応作業指示書（旧バージョン・参考） |
| `affiliate_manual.md` | アフィリエイトリンク設置マニュアル |
