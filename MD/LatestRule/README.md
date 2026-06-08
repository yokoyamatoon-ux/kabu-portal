# カブ先生プロジェクト：最新運用ルール (LatestRule)

このディレクトリには、カブ先生ポータル（お金の学び場）の運用における最新のレギュレーションとチェックリストが格納されています。
AIアシスタントおよび編集者は、コンテンツの追加・更新・デプロイを行う前に必ずこれらのファイルを参照してください。

## 📁 ファイル構成

1. **[0_master_update_checklist.md](./0_master_update_checklist.md)**
   - **【最重要】** 記事更新・作成時のマスターチェックリスト。画像生成、キャラ設定、文字数、SEO、デプロイ確認など、全工程を網羅しています。
2. **[1_content_management_rules.md](./1_content_management_rules.md)**
   - データ構造、JSONの記述方法、キャラクターの背景色・位置設定、画像の同期ルールについて。
3. **[2_seo_aio_content_rules.md](./2_seo_aio_content_rules.md)**
   - AIO対策の定義段落、FAQセクション、メタタグ（タイトル・ディスクリプション）、信頼性強化のルール。
4. **[3_deployment_pipeline.md](./3_deployment_pipeline.md)**
   - `deploy_kabu.py` を用いた同期・ビルド・反映確認の技術的な手順。
5. **[4_x_posting_rules.md](./4_x_posting_rules.md)**
   - X（Twitter）での集客・投稿ルール、リポスト戦略、キャラクター運用について。
6. **[5_manga_generation_rules.md](./5_manga_generation_rules.md)**
   - マンガ画像のプロンプト作成、画像パス指定、キャラクターの整合性維持に関するルール。
7. **[6_note_posting_rules.md](./6_note_posting_rules.md)**
   - note.com への下書き作成、連携、運用ルール。

---

## 🚀 運用の流れ
1. **ルールの再確認:** `0_master_update_checklist.md` を読み込む。
2. **コンテンツ作成/更新:** 各種JSONデータ（`data/`）を編集し、必要に応じて画像を生成・配置する。
3. **バリデーション:** JSONの構文チェックや文字数、キャラ設定の矛盾がないか確認する。
4. **デプロイ:** `python deploy_kabu.py` を実行。
5. **最終確認:** 本番サイトで強制リロードを行い、チェックリストの全項目を満たしているか目視確認する。
