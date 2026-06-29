# NISA Curation Note Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** カブ先生のサイト内からNISAに関連する主要4記事（口座選び、オルカンvsS&P500、一括vs積立、途中引き出し）をピックアップし、初心者向けのロードマップ形式で紹介するキュレーション記事（note用）を作成してnote.comに下書きとしてアップロードします。

**Architecture:** 
- `scratch/note_nisa_curation.md` を作成し、カブ先生のキャラクター口調、ヘッダー仕様（YAML frontmatter）、太字禁止（`**`禁止）、CTA・Xリンク設置等のnote規約・スタイルガイドに完全準拠させた日本語ドラフトを作成します。
- `scratch/verify_note_compliance.py` に新規ファイルのパスを追加し、構文及びスタイルチェックを自動検証します。
- `scratch/upload_nisa_curation_note.py` を作成し、`note-mcp` 経由でnote.comに下書きアップロードを行います。

**Tech Stack:** Markdown, Python (MCP wrapper)

---

## User Review Required

> [!IMPORTANT]
> 記事の本文では、note.comのマークダウンインポート仕様を考慮し、アスタリスク2つによる太字マーカー（`**`）を一切使用せず、ヘッダー構造（`##` 等）で強調を表現します。

---

## Open Questions

特にありません。

---

## Proposed Changes

### [NISA Curation Note Component]

#### [NEW] [note_nisa_curation.md](file:///d:/Antigravity/Kabu/scratch/note_nisa_curation.md)
- キュレーション記事の Markdown 下書きを作成します。
- タイトル案：`【新NISAロードマップ】口座選び・オルカンvsS&P500・一括vs積立・途中引き出し…初心者の４大疑問をカブ先生がズバッと解決じゃ！`
- ピックアップする記事：
  - 口座選び：`col_025`（銀行・窓口はNGな理由とネット証券3大有力候補）
  - 銘柄選び：`col_013`（S&P500 vs オール・カントリー）
  - 購入方法：`col_026`（一括投資 vs 積立投資）
  - 引き出しルール：`col_024`（途中で引き出すと損する？非課税枠の復活）

#### [MODIFY] [verify_note_compliance.py](file:///d:/Antigravity/Kabu/scratch/verify_note_compliance.py)
- `articles` リストに `d:\Antigravity\Kabu\scratch\note_nisa_curation.md` を追加します。

#### [NEW] [upload_nisa_curation_note.py](file:///d:/Antigravity/Kabu/scratch/upload_nisa_curation_note.py)
- note.com に `note_nisa_curation.md` をアップロードするための Python ラッパースクリプトを作成します。

---

## Verification Plan

### Automated Tests
1. **Compliance Check**: `python scratch/verify_note_compliance.py` を実行し、`note_nisa_curation.md` にエラーや警告が出ないことを検証します。

### Manual Verification
1. **Upload Draft**: `python scratch/upload_nisa_curation_note.py` を実行して note.com にアップロードし、返却される `Draft ID` と `Key` を確認します。
