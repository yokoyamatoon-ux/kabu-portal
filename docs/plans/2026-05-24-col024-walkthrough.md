# 新規コラム [col_024] 本番環境デプロイ完了報告（ウォークスルー）

* **本番公開日**: 2026-05-25 (月)
* **本番URL**: [https://okane-no-manabi.jp/column/col_024/](https://okane-no-manabi.jp/column/col_024/)
* **ステータス**: 完了（FTP差分アップロード成功・本番稼働確認済み）

---

## 🛠 実施内容

* **デプロイパイプラインの実行**: `python scripts/deploy_kabu.py` を実行。
* **データシンク**: `data/` から `web-next/src/data/` への自動同期。
* **ビルド検証**: `web-next` で `npm run build` をエラーなく完了。
* **FTP差分アップロード**: 変更があった計 **14件のファイル** のみを本番サーバーへ自動アップロード。
  * `col_024/index.html` (新規)
  * `Column202605125.png` (新規画像)
  * `index.html` / `sitemap.xml` / `column/index.html` (更新)
  * Next.js静的chunkファイル各種

---

## 🔬 本番検証結果

* 本番サーバー上のページ [https://okane-no-manabi.jp/column/col_024/](https://okane-no-manabi.jp/column/col_024/) が無事に正常稼働し、新NISAの途中引き出しのコラムが公開されたことを確認しました。
* note用の下書き原稿は [data/note_article_nisa_withdrawal.md](file:///d:/Antigravity/Kabu/data/note_article_nisa_withdrawal.md) に完璧な状態で保存コミットされています。
