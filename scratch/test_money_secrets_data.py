# -*- coding: utf-8 -*-
import json
import re

def test_money_secrets():
    with open('data/money_secrets.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # エピソード数の検証 (20 -> 21話に増加)
    assert len(data) == 21, f"Expected 21 episodes, got {len(data)}"
    
    # 第21話 (先頭に挿入されると想定) の検証
    ep21 = data[0]
    assert ep21.get('ep') == 21, f"First element should be Ep 21, got Ep {ep21.get('ep')}"
    
    # Title validation
    assert "\u533b\u7642\u8cbb" in ep21.get('title') or "\u7686\u4fdd\u967a" in ep21.get('title'), "Title missing medical expenses/insurance keyword"
    
    chat = ep21.get('chat_html', '')
    assert "1.39%" in chat, "Could not find '1.39%' in Ep 21 chat_html"
    assert "\u9ad8\u984d\u7642\u990a\u8cbb" in chat, "Could not find '高額療養費' in Ep 21 chat_html"
    
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

