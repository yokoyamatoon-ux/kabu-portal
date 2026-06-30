# デザインドキュメント：資金洗浄（マネロン）ウラ事情 Ep 22 & note下書き

## 1. 概要
ユーザーから提供されたマンガ画像（1ページ目・2ページ目）を使用し、新規のウラ事情エピソード「Episode 22」を構築する。
- **ウラ事情データ（Ep 22）：** マネーロンダリングの3ステップ（配置・層化・統合）と、なぜクリーンな一般口座がハブとして狙われるかの構造的解説（アプローチ2）。
- **マンガプロンプトファイル：** `manga/urakane/manga_money_laundering_prompts.md` を新規作成。
- **note.com下書き：** 仕組み解説と口座凍結リスクの警告から本サイトEp 22へ誘導する構成。
- **リリース設定：** 選択肢1に基づき、本サイトは下書き状態（`"draft": true`）でデプロイし、noteは下書きとしてアップロードする。

## 2. 制約・厳守ルール
- 本文内に `**太字装飾**` を一切含めない（ポータル・note共通）。
- カブ先生、マネ太、ミライのセリフや背景の指定について、ルール `5_manga_generation_rules.md` に基づいた位置関係を定義する。
- マンガ解説テキスト（description_long等）は、マンガの要約ではなく、背景の具体的な仕組み・実例を提供する「続き」として構成する。

## 3. マンガ画像の変換と配置
- **元画像:**
  - 1ページ目: `D:\Antigravity\Kabu\manga\urakane\20260630\20260630-01.jpeg`
  - 2ページ目: `D:\Antigravity\Kabu\manga\urakane\20260630\20260630-02.jpg`
- **変換先:**
  - ルート画像ディレクトリ:
    - `D:\Antigravity\Kabu\image\manga\urakane\urakane20260630_01.png`
    - `D:\Antigravity\Kabu\image\manga\urakane\urakane20260630_02.png`
  - ※ `deploy_kabu.py` 実行時に `web-next/public/images/money_secret/` に自動同期されるが、ローカル検証のために先行して手動でもコピーを行う。

## 4. ウラ事情データ (money_secrets.json - Episode 22) の構成
- **ep:** `22`
- **draft:** `true` （検証用の下書き非公開設定）
- **タイトル:** `資金洗浄（マネーロンダリング）のハブにされるな！汚いお金をロンダリングする3つのステップと、一般口座が狙われる理由`
- **画像パス:** `/images/money_secret/urakane20260630_01.png`
- **manga_pages:** `["/images/money_secret/urakane20260630_01.png", "/images/money_secret/urakane20260630_02.png"]`
- **チャットHTML:** 配置・層化・統合の3ステップ、なぜ一般口座がハブとして狙われるか、仮想通貨ミキシングと過去最多101万件の疑わしい取引届出の解説、自衛の3原則を含める。

## 5. note.com下書き構成
- **タイトル:** `なぜ「普通の口座」が狙われる？マネーロンダリングの3つのステップと、犯罪組織が仕掛ける「中継ハブ」の罠`
- **アイキャッチ:** `D:\Antigravity\Kabu\web-next\public\images\money_secret\urakane20260630_01.png` （Episode 22の1ページ目）
- **誘導URL:** `https://okane-no-manabi.jp/money_secret/22/`
