# Pythonファイル整理と再配置 実装計画書 (Python File Reorganization Implementation Plan)

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** ルートディレクトリと `modules/` フォルダのPythonファイルを整理し、直近1ヶ月で使用していないファイルを退避（アーカイブ）しつつ、現在の運用システム（管理CMSサーバー、デプロイ、SNS自動化）を完璧に稼働し続けるようにします。

**Architecture:** アクティブなファイルは `scripts/` および `scripts/modules/` に集約し、パス解決やインポートに影響が出ないように調整します。1ヶ月以上使用されていないレガシーなファイルはすべて `D:\Antigravity\Kabu\OLD` へ移動します。

**Tech Stack:** Python 3, PowerShell, Batch

---

## ユーザーレビュー要求事項 (User Review Required)

> [!IMPORTANT]
> - `Kabu_Admin_Start.bat` は `scripts/admin_server.py` を呼び出すように書き換えられます。
> - レガシーなStreamlit関連モジュール（`app.py` および `modules/` 内の大半）は、すべて非アクティブと判定し `D:\Antigravity\Kabu\OLD` にアーカイブされます。現在のNext.jsベースのサイト運用やデプロイには一切影響ありません。

---

## 提案する変更内容 (Proposed Changes)

### 1. 共通ユーティリティ & ディレクトリ作成
#### [NEW] [scripts/modules](file:///d:/Antigravity/Kabu/scripts/modules)
*   アクティブな共有モジュールを格納するためのディレクトリを作成します。

#### [NEW] [D:\Antigravity\Kabu\OLD](file:///D:/Antigravity/Kabu/OLD)
*   非アクティブファイルを退避させるアーカイブフォルダ（存在しない場合は作成）。

---

### 2. 管理スクリプト・設定の更新

#### [MODIFY] [Kabu_Admin_Start.bat](file:///d:/Antigravity/Kabu/Kabu_Admin_Start.bat)
*   起動スクリプトの呼び出し先パスを更新。
```diff
-python admin_server.py
+python scripts/admin_server.py
```

#### [MODIFY] [admin_server.py](file:///d:/Antigravity/Kabu/admin_server.py)
*   デプロイスクリプト実行時のパス呼び出しを更新。
```diff
-        process = subprocess.run(['python', 'deploy_kabu.py'], capture_output=True, text=True, encoding='utf-8')
+        process = subprocess.run(['python', 'scripts/deploy_kabu.py'], capture_output=True, text=True, encoding='utf-8')
```

---

### 3. ファイル移動 & アーカイブの実行

#### [MOVE] [admin_server.py](file:///d:/Antigravity/Kabu/admin_server.py) → [scripts/admin_server.py](file:///d:/Antigravity/Kabu/scripts/admin_server.py)
#### [MOVE] [deploy_kabu.py](file:///d:/Antigravity/Kabu/deploy_kabu.py) → [scripts/deploy_kabu.py](file:///d:/Antigravity/Kabu/scripts/deploy_kabu.py)
#### [MOVE] [run_kabu_schedule.py](file:///d:/Antigravity/Kabu/run_kabu_schedule.py) → [scripts/run_kabu_schedule.py](file:///d:/Antigravity/Kabu/scripts/run_kabu_schedule.py)
#### [MOVE] [kabu_week1_schedule.json](file:///d:/Antigravity/Kabu/kabu_week1_schedule.json) → [scripts/kabu_week1_schedule.json](file:///d:/Antigravity/Kabu/scripts/kabu_week1_schedule.json)
#### [MOVE] [kabu_post_history.json](file:///d:/Antigravity/Kabu/kabu_post_history.json) → [scripts/kabu_post_history.json](file:///d:/Antigravity/Kabu/scripts/kabu_post_history.json)
#### [MOVE] [modules/sns_config.py](file:///d:/Antigravity/Kabu/modules/sns_config.py) → [scripts/modules/sns_config.py](file:///d:/Antigravity/Kabu/scripts/modules/sns_config.py)

#### [MOVE] 非アクティブファイル → [D:\Antigravity\Kabu\OLD](file:///D:/Antigravity/Kabu/OLD)
以下の非アクティブファイルをすべてアーカイブへ移動：
*   ルート: `app.py`, `backup_prod.py`, `check_dim.py`, `compress_banners.py`, `compress_char.py`, `debug_img.py`, `debug_x_system.py`, `optimize_all_images.py`, `remove_bg.py`, `solve_icons.py`, `split_and_transparent.py`, `split_icons.py`, `split_icons_final.py`, `split_icons_v2.py`, `split_icons_v3.py`, `split_strip.py`, `split_strip_v2.py`
*   `modules/` 内の全レガシーファイル（`sns_config.py` 以外すべて）
*   `scratch/check_x_keys.py`
*   `scripts/update_urakane_ep7.py`

---

## 4. 詳細な実装ステップ (Bite-Sized Tasks)

### Task 1: 新規フォルダ作成
*   **Step 1**: `d:\Antigravity\Kabu\scripts\modules` フォルダを作成。
*   **Step 2**: アーカイブ先 `D:\Antigravity\Kabu\OLD` フォルダを作成（存在しない場合）。

### Task 2: 参照・呼び出しパスのコード変更
*   **Step 1**: [admin_server.py](file:///d:/Antigravity/Kabu/admin_server.py) の 71行目を修正して、`scripts/deploy_kabu.py` を呼び出すように変更。
*   **Step 2**: [Kabu_Admin_Start.bat](file:///d:/Antigravity/Kabu/Kabu_Admin_Start.bat) を修正して、`scripts/admin_server.py` を呼び出すように変更。

### Task 3: アクティブファイルの移動
*   **Step 1**: ルートの `admin_server.py`, `deploy_kabu.py`, `run_kabu_schedule.py`, `kabu_week1_schedule.json`, `kabu_post_history.json` を `scripts/` ディレクトリに移動。
*   **Step 2**: `modules/sns_config.py` を `scripts/modules/sns_config.py` に移動。

### Task 4: 非アクティブファイルのアーカイブ (OLD への移動)
*   **Step 1**: ルートにある指定の非アクティブファイルを `D:\Antigravity\Kabu\OLD` に移動。
*   **Step 2**: `modules/` に残ったレガシーなファイル群（`sns_config.py` 以外）を `D:\Antigravity\Kabu\OLD` に移動。
*   **Step 3**: `scratch/check_x_keys.py` と `scripts/update_urakane_ep7.py` を `D:\Antigravity\Kabu\OLD` に移動。

### Task 5: 不要・一時作業ファイルのクリーンアップ
*   **Step 1**: この整理用に一時作成した [scratch/find_py_files.py](file:///d:/Antigravity/Kabu/scratch/find_py_files.py) を削除。
*   **Step 2**: 空になった `modules/` フォルダを削除。

---

## 5. 動作確認・検証計画 (Verification Plan)

### 自動/コマンド実行テスト
1.  **デプロイ動作検証**:
    *   コマンド: `python scripts/deploy_kabu.py` を実行。
    *   期待される結果: `web-next/` のビルドが成功し、FTPアップロード接続処理（または差分スキャン完了）がエラーなく終了すること。
2.  **CMS管理サーバー起動検証**:
    *   コマンド: `python scripts/admin_server.py` を手動実行。
    *   期待される結果: サーバーがエラーなく起動し、`http://127.0.0.1:5000/api/health` から `{"status":"ok", "message":"Kabu Admin Server is running"}` という JSON レスポンスが取得できること。

### 手動確認
1.  整理後、ルートディレクトリに不要なPythonファイルが残っていないことを目視で確認。
2.  `D:\Antigravity\Kabu\OLD` に指定の全非アクティブファイルが格納されていることを確認。
