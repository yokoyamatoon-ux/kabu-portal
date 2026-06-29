# Episode 16 (ETF) Commentary Rewrite Design

## Goal
Episode 16 (ETF) の解説ダイアログ（`commentary`）がマンガの基本的な例え（デリバリー弁当とパック弁当）のなぞりに終始しているため、より実践的で専門的な深掘り内容に変更し、読者が「普通の投資信託」と「ETF」の使い分けや隠れたリスクを正確に理解できるようにします。

## Proposed Changes

### [Kabu Portal Data Component]

#### [MODIFY] [manga.json](file:///d:/Antigravity/Kabu/web-next/src/data/manga.json)
- `ep: 16` の `commentary` 配列を、アプローチAに基づいた会話劇（ウラ金さんのレバレッジデイトレの誘惑、ミライによる分配金自動再投資と複利効果の解説、カブ先生によるスプレッド/乖離リスクと流動性の解説、新NISAの使い分けの結論）に書き換えます。

---

## Dialog Content Design (Preview)

- **マネ太 (normal)**: コスト最安でリアルタイム取引できるETF最強説を唱える。
- **ウラ金 (evil)**: レバレッジETFでのデイトレによる一攫千金をそそる。
- **ミライ (normal)**: 分配金を自動再投資できないことによる複利効果のロスを指摘。
- **カブ先生 (normal)**: 出来高不足による基準価額と市場価格の「乖離（スプレッド）」リスクを指摘。
- **カブ先生 (normal)**: 新NISAのつみたて枠（投信）と成長枠（高配当ETF）の目的別使い分け（資産最大化 vs キャッシュフロー）を解説。

---

## Verification Plan

### Automated Tests
- 既存のテストスクリプト `d:/Antigravity/Kabu/scratch/test_manga_data.py` (あるいは同様のテストスクリプト) を実行し、`manga.json` の構文エラーや型、必須フィールドの検証を行います。
- 新しい対話の長さやフォーマットが規定（emote設定など）を満たしているか確認します。

### Manual Verification
- `npm run build` を実行し、Next.jsの静的ビルドが正常に完了することを確認します。
- `npm run dev` またはビルド後の出力をローカルで検証（必要に応じてブラウザで確認）。
- `deploy_kabu.py` を用いてテスト環境または本番環境へアップロードし、`https://okane-no-manabi.jp/manga/16/` にアクセスして正しく会話バルーンが表示され、文字切れやスタイルの崩れがないか確認します。
