# キーワード検索機能 実装指示書

> 対象サイト：https://okane-no-manabi.jp/  
> 配置場所：トップページ「今日のマーケット」セクションの直上  
> キーワード管理：各データJSONの既存 `tags` フィールドを使用

---

## 完成イメージ

```
┌─────────────────────────────────────────┐
│ 気になるテーマを選んでね                  │
│                                          │
│ [NISA] [株・株式] [S&P500] [オルカン]    │
│ [投資初心者] [配当金] [為替・円安] ...   │
│                                          │
│ ──────────────────────────────────────  │
│                                          │
│ 「NISA」に関連するコンテンツ  4件        │
│                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │コラム    │ │コラム    │ │マンガ    │ │
│ │NISAって  │ │新NISAの  │ │第1話     │ │
│ │結局...   │ │始め方... │ │株ってなに│ │
│ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────┘
          ↓
   今日のマーケット（既存）
```

---

## Step 1：データJSONへのタグ追加

### 1-1. コラムデータ（`data/columns.json` または同等のファイル）

各コラムに `tags` フィールドが未設定、または不足している場合は以下を参考に追加する。

```json
[
  { "id": "col_001", "title": "イランで株価が急落した理由", "tags": ["株", "リスク"] },
  { "id": "col_002", "title": "日銀が金利を上げたのに、なぜ円安になったの？", "tags": ["為替", "金利"] },
  { "id": "col_003", "title": "NISAって結局、何をすればいいの？", "tags": ["NISA", "初心者"] },
  { "id": "col_004", "title": "長期金利が2%を超えた。生活にどう影響する？", "tags": ["金利"] },
  { "id": "col_005", "title": "AI半導体バブルはいつ弾ける？", "tags": ["AI", "株"] },
  { "id": "col_007", "title": "暴落が来たらまず何をする？", "tags": ["リスク", "NISA", "初心者"] },
  { "id": "col_009", "title": "新NISAの始め方、3つのステップ", "tags": ["NISA", "初心者"] },
  { "id": "col_010", "title": "高配当株選びで失敗しない3つのポイント", "tags": ["配当金", "株"] },
  { "id": "col_011", "title": "金（ゴールド）が史上最高値を更新", "tags": ["ゴールド"] },
  { "id": "col_012", "title": "AIエージェントが変える仕事と投資の未来", "tags": ["AI"] },
  { "id": "col_013", "title": "S&P500 vs オルカン：初心者におすすめはどっち？", "tags": ["S&P500", "オルカン", "NISA", "初心者"] },
  { "id": "col_014", "title": "ビットコイン半減期後の新展開", "tags": ["仮想通貨", "AI"] }
]
```

### 1-2. マンガデータ（`data/manga.json` または同等のファイル）

```json
[
  { "id": 1, "title": "第1話 株ってなに？", "tags": ["株", "初心者"] },
  { "id": 2, "title": "第2話 ...", "tags": ["..."] }
]
```

### 1-3. クイズ・QAページ

クイズとQAはページ単体として扱う。コンポーネント内の定数として以下を定義（JSONファイルは不要）。

```js
const STATIC_CONTENTS = [
  { type: "quiz", title: "投資クイズに挑戦", url: "/quiz/", tags: ["初心者", "NISA", "株"] },
  { type: "qa",   title: "カブ先生の質問箱", url: "/qa/",   tags: ["初心者", "NISA"] },
];
```

---

## Step 2：キーワード定義ファイルの作成

`data/keywords.json` を新規作成する。

```json
[
  { "label": "NISA",    "tag": "NISA" },
  { "label": "株・株式", "tag": "株" },
  { "label": "S&P500",  "tag": "S&P500" },
  { "label": "オルカン", "tag": "オルカン" },
  { "label": "投資初心者","tag": "初心者" },
  { "label": "配当金",   "tag": "配当金" },
  { "label": "為替・円安","tag": "為替" },
  { "label": "金利",     "tag": "金利" },
  { "label": "仮想通貨", "tag": "仮想通貨" },
  { "label": "AI・テクノロジー","tag": "AI" },
  { "label": "暴落・リスク","tag": "リスク" },
  { "label": "金（ゴールド）","tag": "ゴールド" }
]
```

> 新しいコラムを追加した際、コラムに `tags` を設定するだけで自動的に検索結果に現れる。`keywords.json` の編集は新しいテーマを追加したい時だけでよい。

---

## Step 3：コンポーネントの作成

`src/components/KeywordSearch.jsx` を新規作成する。

```jsx
import columns from "@/data/columns.json";
import manga   from "@/data/manga.json";
import keywords from "@/data/keywords.json";

const STATIC_CONTENTS = [
  { type: "quiz", title: "投資クイズに挑戦",   url: "/quiz/", tags: ["初心者", "NISA", "株"] },
  { type: "qa",   title: "カブ先生の質問箱",   url: "/qa/",   tags: ["初心者", "NISA"] },
];

const ALL_CONTENTS = [
  ...columns.map(c => ({ type: "column", title: c.title, url: `/column/${c.id}/`, tags: c.tags ?? [] })),
  ...manga.map(m   => ({ type: "manga",  title: m.title, url: `/manga/${m.id}/`,  tags: m.tags ?? [] })),
  ...STATIC_CONTENTS,
];

const BADGE = {
  column: { label: "コラム",   className: "bg-blue-50  text-blue-700" },
  manga:  { label: "マンガ",   className: "bg-green-50 text-green-700" },
  quiz:   { label: "クイズ",   className: "bg-amber-50 text-amber-700" },
  qa:     { label: "質問箱",   className: "bg-purple-50 text-purple-700" },
};

export default function KeywordSearch() {
  const [activeTag, setActiveTag] = React.useState(null);

  const results = activeTag
    ? ALL_CONTENTS.filter(c => c.tags.includes(activeTag))
    : [];

  return (
    <section className="mb-8 px-4">
      <p className="text-sm text-gray-500 mb-3">気になるテーマを選んでね</p>

      {/* キーワードタグ一覧 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {keywords.map(kw => (
          <button
            key={kw.tag}
            onClick={() => setActiveTag(activeTag === kw.tag ? null : kw.tag)}
            className={[
              "text-xs px-3 py-1.5 rounded-full border transition-colors",
              activeTag === kw.tag
                ? "bg-purple-100 border-purple-300 text-purple-800"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            ].join(" ")}
          >
            {kw.label}
          </button>
        ))}
      </div>

      {/* 検索結果 */}
      {activeTag && (
        <>
          <p className="text-xs text-gray-400 mb-3">
            「{keywords.find(k => k.tag === activeTag)?.label}」に関連するコンテンツ　{results.length}件
          </p>
          {results.length === 0 ? (
            <p className="text-sm text-gray-400">関連するコンテンツが見つかりませんでした。</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {results.map((c, i) => {
                const badge = BADGE[c.type];
                return (
                  <a
                    key={i}
                    href={c.url}
                    className="block rounded-2xl border border-gray-100 bg-white p-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-[10px] px-2 py-0.5 rounded mb-1.5 inline-block ${badge.className}`}>
                      {badge.label}
                    </span>
                    <p className="text-xs font-medium text-gray-800 leading-snug">{c.title}</p>
                  </a>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
```

> `"use client"` は不要。`useState` を使うためクライアントコンポーネントになるが、コンテンツは静的データのみのため問題なし。ただし前回の対応と同様、**SEO上重要なコンテンツはこのコンポーネントに入れない**（記事本文・FAQ等）。

---

## Step 4：トップページへの組み込み

`src/app/page.jsx`（トップページ）に `KeywordSearch` を追加する。

```jsx
import KeywordSearch from "@/components/KeywordSearch";
import TodayMarket  from "@/components/TodayMarket"; // 既存

export default function HomePage() {
  return (
    <main>
      {/* ...既存のヒーローセクション等... */}

      <KeywordSearch />   {/* ← ここに追加 */}

      <TodayMarket />     {/* 既存：今日のマーケット */}

      {/* ...以下既存... */}
    </main>
  );
}
```

---

## Step 5：ビルドと確認

```bash
npm run build
```

確認ポイント：

1. トップページ（`/`）を開き、キーワードタグが「今日のマーケット」の上に表示されているか
2. 「NISA」タグをタップし、col_003・col_009・col_013・クイズ・質問箱が出るか
3. 同じタグをもう一度タップして、結果が閉じるか
4. スマートフォン幅（375px）でタグが折り返して表示されるか
5. 結果カードのリンクをタップして正しいページに遷移するか

---

## 今後の運用ルール

| 作業 | 対応方法 |
|---|---|
| 新しいコラムを追加 | `columns.json` に `tags` フィールドを設定するだけ |
| 新しいキーワードを追加 | `keywords.json` に1行追加する |
| キーワードを削除・統合 | `keywords.json` から削除し、JSONの `tags` 値を変更する |
