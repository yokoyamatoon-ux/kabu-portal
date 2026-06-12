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
