# Pythonファイル再配置設計書 (Python File Reorganization Design)

**作成日**: 2026-05-22  
**ステータス**: ご承認済み (Approved)

---

## 1. 目的と方針 (Goal & Philosophy)
プロジェクト内のPythonファイルを整理整頓し、ルートディレクトリをすっきりさせるとともに、今後の継続的な運用（Next.js移行後のWeb環境、SNS自動投稿スケジューラ、ローカル管理CMSサーバー）でパス参照や動作に問題が発生しないようにすることを目的とします。

*   **アクティブファイル**: 現在も管理、デプロイ、SNS自動運用、開発等で利用されているファイル。これらは `scripts/` ディレクトリ配下に適切に集約します。
*   **非アクティブファイル**: 直近1ヶ月（30日）以上更新されておらず、現在のNext.jsベースのサイト運用やバッチ運用で使用されていないレガシーなファイル。これらはすべて `D:\Antigravity\Kabu\OLD` に安全に退避します。
*   **開発中スクリプト**: 現在作業中である `scratch/` フォルダのスクリプトは、作業に影響を与えないようアクティブなものはそのまま `scratch/` に残します。

---

## 2. ディレクトリ構造の再配置計画 (Directory Restructuring)

### A. アーカイブ対象 (D:\Antigravity\Kabu\OLD への移動)
以下のファイルをアーカイブフォルダへ移動します。

```markdown
d:\Antigravity\Kabu\ (ルート)
├── app.py
├── backup_prod.py
├── check_dim.py
├── compress_banners.py
├── compress_char.py
├── debug_img.py
├── debug_x_system.py
├── optimize_all_images.py
├── remove_bg.py
├── solve_icons.py
├── split_and_transparent.py
├── split_icons.py
├── split_icons_final.py
├── split_icons_v2.py
├── split_icons_v3.py
├── split_strip.py
└── split_strip_v2.py

d:\Antigravity\Kabu\modules\ (旧Streamlit用コンポーネント)
├── modules/__init__.py
├── modules/diagnosis_unit.py
├── modules/explore_unit.py
├── modules/financial_unit.py
├── modules/home_unit.py
├── modules/legal_unit.py
├── modules/maneta_diary_unit.py
├── modules/market_data.py
├── modules/qa_unit.py
├── modules/quiz_unit.py
├── modules/simulation.py
├── modules/simulator_unit.py
└── modules/stock_data_unit.py

d:\Antigravity\Kabu\scratch\
└── scratch/check_x_keys.py

d:\Antigravity\Kabu\scripts\
└── scripts/update_urakane_ep7.py
```

### B. アクティブ集約先 (scripts/ ディレクトリ)
以下のファイルを `scripts/` ディレクトリに集約・新規配置します。

```markdown
d:\Antigravity\Kabu\scripts\
├── admin_server.py                # (新規移動) 管理サーバー
├── deploy_kabu.py                 # (新規移動) デプロイスクリプト
├── run_kabu_schedule.py           # (新規移動) スケジューラスクリプト
├── kabu_week1_schedule.json       # (新規移動) スケジュールJSON
├── kabu_post_history.json         # (新規移動) 投稿履歴JSON
├── fetch_market_data.py           # (既存保持) 市場データ取得
├── modules/
│   └── sns_config.py              # (新規移動・格納) X共通設定モジュール
└── post_*.py                      # (既存保持) 各種アクティブ投稿スクリプト
```

### C. `scratch/` 内のアクティブスクリプト (既存保持)
現在も編集・使用されている作業スクリプトは `scratch/` に残します。
*   `scratch/count_x_chars.py`
*   `scratch/fetch_tweet.py`
*   `scratch/fetch_tweet_playwright.py`
*   `scratch/find_real_date.py`
*   `scratch/fix_json.py`
*   `scratch/post_manga_7.py`
*   `scratch/post_manga_x.py`
*   `scratch/post_nikkei_60k.py`
*   `scratch/post_note_announcement.py`
*   `scratch/post_reply_x.py`
*   `scratch/reply_maneta_ep5.py`
*   `scratch/reply_to_x.py`
*   `scratch/verify_col_021.py`
*   `scratch/verify_note_style.py`

---

## 3. 参照・パス修正詳細 (Reference & Code Modifications)

1.  **[Kabu_Admin_Start.bat](file:///d:/Antigravity/Kabu/Kabu_Admin_Start.bat)**:
    *   呼び出し先を `python admin_server.py` から `python scripts/admin_server.py` に変更。
2.  **`scripts/admin_server.py`**:
    *   デプロイスクリプト呼び出し箇所（71行目）の更新：
        ```python
        # 変更前
        process = subprocess.run(['python', 'deploy_kabu.py'], capture_output=True, text=True, encoding='utf-8')
        # 変更後
        process = subprocess.run(['python', 'scripts/deploy_kabu.py'], capture_output=True, text=True, encoding='utf-8')
        ```
3.  **`scripts/run_kabu_schedule.py`**:
    *   モジュールインポートのパス解決：`run_kabu_schedule.py` を実行した際、その親ディレクトリである `scripts/` が自動的に `sys.path[0]` (検索パス最優先) に配置されるため、`scripts/modules/sns_config.py` は `from modules.sns_config import ...` でそのまま正常に解決されます。
    *   JSONパス解決：`os.path.dirname(__file__)` が自动的に `scripts/` を指すため、JSONファイルを一緒に移動することで変更は発生しません。

---

## 4. 検証手順 (Verification Procedures)
再配置後に以下の動作確認を行います。

1.  **デプロイテスト**: `python scripts/deploy_kabu.py` を手動実行し、ビルド（`web-next/out` 生成）および差分同期処理がエラーなく動作することを確認します。
2.  **管理CMSサーバーテスト**: `Kabu_Admin_Start.bat` からCMS管理サーバーを起動し、正常に Flask サーバーが起動すること、およびブラウザで管理者画面が表示されることを確認します。また健康診断API（`/api/health`）の疎通を確認します。
