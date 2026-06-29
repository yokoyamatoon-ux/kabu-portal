# Episode 16 (ETF) Commentary Rewrite Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Episode 16 (ETF) の解説ダイアログを、マンガの基本解説の繰り返しから、コスト構造、分配金再投資、スプレッド（乖離）リスク、新NISAでの使い分けを含むより深い実践的な内容に書き換えます。

**Architecture:** 
- キャノニカルなデータソースである `data/manga.json` の Ep 16 の `commentary` データを更新します。
- `test_manga_data.py` テストスクリプトを更新し、新規ダイアログの内容（「複利効果」「スプレッド」「デイトレ」など）が含まれていることをアサートするテストを追加します（TDDアプローチ）。
- `deploy_kabu.py` が自動的に `data/manga.json` を `web-next/src/data/manga.json` へ同期コピーするため、手動で両方を更新、もしくはビルド＆デプロイを実行して反映させます。

**Tech Stack:** Next.js, Node.js, Python (Testing & Deployment)

---

## User Review Required

> [!IMPORTANT]
> この実装計画では、`data/manga.json` および `web-next/src/data/manga.json` の解説データを直接上書きします。既存のシンプルなデリバリー/パック弁当の例えを繰り返す会話から、コスト・複利・スプレッド・NISAでの使い分けを含むディスカッションに変更します。

---

## Open Questions

特にありません。

---

## Proposed Changes

### [Kabu Portal Data Component]

#### [MODIFY] [manga.json (root)](file:///d:/Antigravity/Kabu/data/manga.json)
- `ep: 16` の `commentary` を深掘り対話に書き換えます。

#### [MODIFY] [manga.json (web-next)](file:///d:/Antigravity/Kabu/web-next/src/data/manga.json)
- `ep: 16` の `commentary` を深掘り対話に書き換えます。

#### [MODIFY] [test_manga_data.py](file:///d:/Antigravity/Kabu/scratch/test_manga_data.py)
- `ep 16` の commentary 必須ワード（「デイトレ」「複利」「スプレッド」または「乖離」「つみたて投資枠」「成長投資枠」）のチェックを追加します。

---

## Verification Plan

### Automated Tests
- `python scratch/test_manga_data.py` を実行して、JSONがスキーマに適合し、新キーワードを含んでいることを確認します。

### Manual Verification
1. **Next.js Static Build**: `web-next` ディレクトリで `npm run build` を実行し、ビルドエラーがないことを確認します。
2. **Deploy & Online Check**: `python deploy_kabu.py` を実行してデプロイを行い、`https://okane-no-manabi.jp/manga/16/` にてダイアログが正しく更新されていることを確認します。
