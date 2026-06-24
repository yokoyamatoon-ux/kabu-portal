# -*- coding: utf-8 -*-
import json
import re

def test_money_secrets():
    with open('data/money_secrets.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # エピソード数の検証 (19 -> 20話に増加)
    assert len(data) == 20, f"Expected 20 episodes, got {len(data)}"
    
    # 第20話 (先頭に挿入されると想定) の検証
    ep20 = data[0]
    assert ep20.get('ep') == 20, f"First element should be Ep 20, got Ep {ep20.get('ep')}"
    
    # Title validation
    assert "\u526f\u696d" in ep20.get('title'), "Title missing side hustle keyword"
    assert "\u78ba\u5b9a\u7533\u544a" in ep20.get('title'), "Title missing tax return keyword"
    
    chat = ep20.get('chat_html', '')
    assert "\u78ba\u5b9a\u7533\u544a" in chat, "Could not find '確定申告' in Ep 20 chat_html"
    assert "\u30af\u30e9\u30a6\u30c9\u30bd\u30fc\u30b7\u30f3\u30b0" in chat, "Could not find 'クラウドソーシング' in Ep 20 chat_html"
    
    # Separately check for "時給" and "300円" to accommodate "時給換算したら300円"
    assert "\u6642\u7d66" in chat, "Could not find '時給' in Ep 20 chat_html"
    assert "300\u5186" in chat, "Could not find '300円' in Ep 20 chat_html"
    
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
