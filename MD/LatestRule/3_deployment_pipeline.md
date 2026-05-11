# デプロイパイプライン・技術ルール
**最終更新日：** 2026年4月30日

---

## 1. デプロイコマンド
プロジェクトルート (`d:\Antigravity\Kabu\`) で以下を実行する。

```bash
python deploy_kabu.py
```

### パイプラインの内容
1. **Asset Sync:** `data/` および `image/` から `web-next/` へのファイル同期
2. **Next.js Build:** `web-next/` 内で `npm run build` を実行
3. **FTP Upload:** 生成された `web-next/out/` を `sv2133.xserver.jp` へアップロード

---

## 2. データの「正」 (Canonical Source)
- **JSONデータ:** `data/` フォルダが正。`web-next/src/data/` は同期先。
- **画像:** `image/` フォルダが正。`web-next/public/images/` は同期先。

## 3. SEO技術要件 (実装済み)
- **sitemap.xml:** `web-next/public/sitemap.xml` を更新したら必ずデプロイ。
- **robots.txt:** `web-next/public/robots.txt` で旧URL (`?page=`) のクロールを禁止。
- **Canonicalタグ:** 全ページに `https://okane-no-manabi.jp/` から始まる絶対パスを設定。

## 4. トラブルシューティング
- **変更が反映されない:** 
  - ブラウザキャッシュを疑う (Ctrl + F5)。
  - `data/` ではなく `web-next/src/data/` を編集していないか確認。
- **ビルドエラー:**
  - JSONのカンマ忘れや括弧の閉じ忘れを確認。
  - 新しく追加した画像ファイル名に全角文字やスペースが含まれていないか確認。
- **画像が表示されない:**
  - `deploy_kabu.py` の `sync_assets()` 内に新しいディレクトリの同期設定が必要か確認。
