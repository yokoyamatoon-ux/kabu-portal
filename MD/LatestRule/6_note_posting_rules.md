# note.com 記事投稿・運用ルール
**最終更新日：** 2026年5月11日
**アカウント：** https://note.com/kabu_teacher

---

## 1. 目的
note.comは「お金の学び場」本サイトへの**集客ファネル（導線）**として使用する。
本サイトのコラムやマンガ記事を「チラ見せ＋続きはこちら」の形で紹介し、本サイトへ誘導する。

## 2. 記事構成のルール

### 構成テンプレート
1. **フック（掴み）：** ニュースの数字やセンセーショナルな話題でマネ太が驚く → カブ先生が一言
2. **問題提起：** 初心者が陥りがちな誤解を明示
3. **チラ見せ：** 本サイトで解説する内容の概要だけを提示（答えは出し切らない）
4. **CTA（誘導）：** 「続きはこちら！」＋本サイトの記事URL

### 本文トーン・書き方（重要）
- note本文全体は、**カブ先生が読者へ語りかける口調**で統一する。
- 基本文体は「〜じゃ」「〜じゃぞ」「〜なんじゃ」「〜のう」「フォッフォッフォ」を自然に使う。
- 会話劇を前面に出しすぎず、本文は「ニュース解説・手口の整理・注意喚起」をカブ先生の語りで進める。
- マネ太のセリフは冒頭のフックや読者目線の疑問として少量使ってよいが、記事全体の主語はカブ先生にする。
- 見出しはnoteに貼り付けやすいよう、Markdownの `##` 見出しと区切り線 `---` を使う。
- 本文内で太字装飾 `**テキスト**` は使わない。プレーンテキスト中心で読みやすくする。
- 箇条書きは、note上で崩れにくいよう `1. 2. 3.` の番号リスト、または短い行の列挙を使う。
- 末尾には必ず「もっと詳しく知りたい方へ」セクションを置き、本サイト記事・X・必要に応じてサイトトップへ誘導する。

### note記事の基本フォーマット
```markdown
---

## [ニュースやテーマを一文で示す見出し]

[ニュースの要点]が報じられたのじゃ。

▶ 参考ニュースはこちら
[URL]

[このニュースで読者が見るべきポイントをカブ先生口調で説明]

---

## [手口・背景を説明する見出し]

[カブ先生口調で、初心者が誤解しやすい点を解説]

フォッフォッフォ。
[短い注意喚起]

---

## [危険サインや確認ポイントの見出し]

1. [確認ポイント]

[説明]

2. [確認ポイント]

[説明]

---

## もっと詳しく知りたい方へ

今回のテーマについて、カブ先生のお金の学校でもう少し詳しく解説しておるぞ。

サイトでは、[本サイト記事の内容要約]を、マンガ形式でまとめておる。

▶ マンガ記事はこちら
[本サイトURL]

また、Xでは投資初心者が気をつけたいニュースや、お金のトラブルを避けるためのポイントを、カブ先生の視点でわかりやすく発信しておる。

▶ Xはこちら
https://x.com/kabu_teacher

投資は、正しく学べば心強い味方になる。
じゃが、うまい話に飛びつくと、大切なお金を一瞬で失ってしまうこともあるんじゃ。

これからも、難しいお金のニュースをできるだけやさしく、でも大事なところはごまかさずに解説していくぞい。
```

### キャラクター使用ルール
- **使用可能：** カブ先生、マネ太、ミライ
- **使用禁止：** ウラ金さん（本サイトの「お金のウラ事情ファイル」専用キャラ）
- 口調は本サイトと完全に統一すること（「～っす」「フォッフォッフォ！」「～じゃ」等）

## 3. 投稿方法（note-mcp）

### 前提条件
- note-mcp がインストール済み（`C:\Users\nanda\Desktop\note-mcp`）
- MCP設定ファイル（`mcp_config.json`）に `note-mcp` サーバーが登録済み
- note.comへのログイン済みセッションが保存されていること

### 方法A：MCPツールを直接使う（推奨）
Antigravityの会話内で、以下のMCPツールを呼び出して操作する。

| ツール | 用途 |
|---|---|
| `mcp_note-mcp_note_check_auth` | 認証状態の確認 |
| `mcp_note-mcp_note_login` | ブラウザ経由でnote.comにログイン |
| `mcp_note-mcp_note_create_draft` | タイトル・本文・タグを指定して下書き作成 |
| `mcp_note-mcp_note_create_from_file` | Markdownファイルから下書きを一括作成（アイキャッチ・タグ含む） |
| `mcp_note-mcp_note_upload_eyecatch` | アイキャッチ画像のアップロード |
| `mcp_note-mcp_note_list_articles` | 記事一覧を取得 |
| `mcp_note-mcp_note_publish_article` | 下書きを公開 |

### 方法B：CLIから直接Pythonで実行する（MCPが使えない場合のフォールバック）
```powershell
cd C:\Users\nanda\Desktop\note-mcp

# 下書き作成（Markdownファイルから）
uv run python -c "
import asyncio
from note_mcp.api.articles import create_draft
from note_mcp.auth.session import SessionManager
from note_mcp.models import ArticleInput
from note_mcp.utils.file_parser import parse_markdown_file
from pathlib import Path

sm = SessionManager()
s = sm.load()
parsed = parse_markdown_file(Path(r'<Markdownファイルのフルパス>'))
ai = ArticleInput(title=parsed.title, body=parsed.body, tags=parsed.tags)
result = asyncio.run(create_draft(s, ai))
print(f'ID: {result.id}, Key: {result.key}')
"
```

## 4. Markdownファイルの書式

記事のMarkdownファイルは以下のYAMLフロントマター付きで作成する。
保存先: `D:\Antigravity\Kabu\scratch\` に `note_<テーマ名>.md` として保存。

```markdown
---
title: 記事のタイトル
eyecatch: D:\Antigravity\Kabu\web-next\public\images\column\ColumnYYYYMMDD.png
tags: [タグ1, タグ2, タグ3]
---

本文をここに記述...
```

## 5. アイキャッチ画像
- 本サイトのコラム用に作成したアイキャッチ画像をそのまま流用する。
- パス例: `D:\Antigravity\Kabu\web-next\public\images\column\Column20260511.png`
- MCPツール `note_upload_eyecatch` またはnoteの編集画面から手動設定する。

## 6. 注意事項
- **セッション切れ：** 長期間使っていないと `note_check_auth` が「未認証」を返す。その場合は `note_login` で再ログインする。
- **アイキャッチAPIエラー：** `note_upload_eyecatch` でエラーが出る場合がある。その場合はnoteの編集画面（`https://note.com/kabu_teacher/n/<キー>/edit`）から手動でアップロードする。
- **投稿後の公開：** 下書き作成後、内容を確認してから `note_publish_article` で公開するか、noteの管理画面から公開ボタンを押す。
