# カブ先生のお金の学校 更新マニュアル (LatestRule)

このフォルダには、**「カブ先生のお金の学校 (okane-no-manabi.jp)」** をミス無く更新し、検索エンジンやAI検索からの流入を最大化するための最新ルールがまとめられています。

## 📂 構成ファイル

1.  **[0_master_update_checklist.md](./0_master_update_checklist.md)**
    *   更新作業のたびに確認する「実行用チェックリスト」です。
2.  **[1_content_management_rules.md](./1_content_management_rules.md)**
    *   データの保存先、JSONの書き方、キャラクター設定、画像の同期ルールです。
3.  **[2_seo_aio_content_rules.md](./2_seo_aio_content_rules.md)**
    *   SEO・AIO（AI検索対策）のためのライティング・構成ルールです。
4.  **[3_deployment_pipeline.md](./3_deployment_pipeline.md)**
    *   デプロイコマンドや技術的なパイプラインの仕組みです。
5.  **[4_x_posting_rules.md](./4_x_posting_rules.md)**
    *   X (Twitter) での運用・投稿ルールです。

## 🚀 更新の基本フロー

1.  `data/` 内のJSONを編集し、`image/` 内に画像を配置する。
2.  **[0_master_update_checklist.md](./0_master_update_checklist.md)** で内容に漏れがないかセルフチェックする。
3.  `python deploy_kabu.py` でデプロイを実行する。
4.  本番サイトで表示を確認し、SNSで告知する。

---
**※ ルールが変更になった場合は、このフォルダ内のファイルを随時更新してください。**
