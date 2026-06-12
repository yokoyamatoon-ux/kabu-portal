# 第18話「マルチ商法の罠」追加実装計画書

> For Antigravity: REQUIRED WORKFLOW: Use .agent/workflows/execute-plan.md to execute this plan in single-flow mode.

Goal: お金のウラ事情ファイル（ウラ金さん）に第18話「マルチ商法」を追加し、Next.jsで静的ページをビルド・デプロイして検証します。

Architecture: TDD方式を採用します。まずデータ検証用のPythonスクリプトを新規作成し、追加前なのでテストが失敗することを確認します。その後、data/money_secrets.jsonに第18話のデータを追加してテストを通します。最後にローカルでNext.jsビルドおよび手動デプロイスクリプトを実行し、本番での配信を確認します。

Tech Stack: Python, Next.js, FTP (scripts/deploy_kabu.py)

---

### Task 1: 新規テストスクリプトの作成（TDD準備）

Files:
- Create: scratch/test_money_secrets_data.py

Step 1: テストスクリプトを作成する
以下のコードで scratch/test_money_secrets_data.py を作成します。第18話のタイトルや特定の単語が含まれているか、また翻訳跡（English of/is）が混入していないかをチェックします。

```python
import json
import re

def test_money_secrets():
    with open('data/money_secrets.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # エピソード数の検証 (17 -> 18話に増加)
    assert len(data) == 18, f"Expected 18 episodes, got {len(data)}"
    
    # 第18話 (先頭に挿入されると想定) の検証
    ep18 = data[0]
    assert ep18.get('ep') == 18, f"First element should be Ep 18, got Ep {ep18.get('ep')}"
    assert ep18.get('title') == "「権利収入」の甘い誘惑 〜マルチ商法と人間関係切り売りの代償〜"
    
    chat = ep18.get('chat_html', '')
    assert "マルチ商法" in chat, "Could not find 'マルチ商法' in Ep 18 chat_html"
    assert "特定商取引法" in chat, "Could not find '特定商取引法' in Ep 18 chat_html"
    assert "188" in chat, "Could not find '188' in Ep 18 chat_html"
    
    # プレースホルダーアイコンの確認
    assert "{{MANETA_ICON}}" in chat
    assert "{{MIRAI_ICON}}" in chat
    assert "{{URAKANE_ICON}}" in chat
    assert "{{HAKASE_ICON}}" in chat
    
    # 翻訳跡の排除
    assert not re.search(r'\bof\b', chat), "Found English 'of' in Japanese text"
    assert not re.search(r'\bis\b', chat), "Found English 'is' in Japanese text"
    
    print("All money secrets validation tests passed successfully!")

if __name__ == '__main__':
    test_money_secrets()
```

Step 2: テストを実行して失敗することを確認する
Run: `python scratch/test_money_secrets_data.py`
Expected: FAIL with "Expected 18 episodes, got 17" (または assertion 失敗)

Step 3: コミットする
Run:
```bash
git add scratch/test_money_secrets_data.py
git commit -m "test: add validation test for money secrets ep 18"
```

---

### Task 2: 第18話データの追加とテスト実行

Files:
- Modify: data/money_secrets.json

Step 1: data/money_secrets.json の先頭に第18話のデータを追加する
data/money_secrets.json の先頭の配列要素（第17話の前）に、設計書に定義された第18話のオブジェクトを挿入します。

Step 2: テストを実行して成功することを確認する
Run: `python scratch/test_money_secrets_data.py`
Expected: PASS with "All money secrets validation tests passed successfully!"

Step 3: コミットする
Run:
```bash
git add data/money_secrets.json
git commit -m "feat: add money secrets ep 18 multi-level marketing"
```

---

### Task 3: ビルド・デプロイと動作確認

Files:
- Modify: docs/plans/task.md

Step 1: キャッシュをクリアする
前回のキャッシュが残っている可能性があるため、一旦デプロイキャッシュを消去します。
Run: `Remove-Item -Path .deploy_cache.json -ErrorAction SilentlyContinue`

Step 2: デプロイスクリプトを実行して本番へ反映させる
Run: `python scripts/deploy_kabu.py`
Expected: ビルドおよびFTPアップロードが正常終了すること。

Step 3: 本番URLの検証
以下のURLにアクセスし、404エラーにならず正常に取得できるか検証します。
- https://okane-no-manabi.jp/money_secret/
- https://okane-no-manabi.jp/money_secret/18/

Step 4: 進捗管理ファイル（docs/plans/task.md）を更新してコミットする
task.mdに今回のブレインストーミング完了および実装タスク完了を記録し、コミット・プッシュします。
