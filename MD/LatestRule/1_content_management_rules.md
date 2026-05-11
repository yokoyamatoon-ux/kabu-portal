# コンテンツ管理・データ構造ルール
**最終更新日：** 2026年4月30日

---

## 1. コンテンツ種類とファイル構成

| コンテンツ名 | JSONファイル | 画像ソースディレクトリ | 本番画像パス (JSON内) |
|---|---|---|---|
| マンガで学ぶ | `data/manga.json` | `image/manga/manabu/` | `/manga/manabu/` |
| お金のウラ事情 | `data/money_secrets.json` | `image/manga/urakane/` | `/images/money_secret/` |
| 投資コラム | `data/columns.json` | `image/column/` | `/images/column/` |
| マネ太日記 | `data/maneta_diary.json` | `image/manga/maneta/` | `/images/maneta/` |

---

## 2. 登場キャラクターとスタイル

### 共通ルール
- **カブ先生 (hakase):** 老賢者。親しみやすく、かつ厳しい。「〜じゃ」「〜のう」
- **マネ太 (maneta):** 初心者。元気。「〜っす」
- **ミライ (mirai):** しっかり者の女子。

### セクション別制限
- **マンガ・マネ太日記:** カブ先生、マネ太、ミライのみ。**ウラ金さんは禁止。**
- **お金のウラ事情:** ウラ金さん、ヒカリが登場可能。

### JSON内のスピーカー設定 (`manga.json`)
| speaker値 | キャラクター | 背景色 | 位置 |
|---|---|---|---|
| `"kabu"` | カブ先生 | `#FFF5F5` (ピンク) | 左 |
| `"maneta"` | マネ太 | `#F0F7FF` (青) | 右 |
| `"mirai"` | ミライ | `#FFF0F5` (ローズ) | 右 |

---

## 3. 画像の同期（重要）

`deploy_kabu.py` を実行すると以下の同期が自動で行われる：
1. `data/*.json` → `web-next/src/data/` (JSONの同期)
2. `image/manga/manabu/` → `web-next/public/manga/manabu/` (マンガ画像の同期)
3. `image/manga/urakane/` → `web-next/public/images/money_secret/` (ウラ金画像の同期)
4. `image/column/` → `web-next/public/images/column/` (コラム画像の同期)

**注意：** `web-next/` 内のファイルを直接書き換えても、同期時に上書きされる。必ずルートの `data/` や `image/` を編集すること。
