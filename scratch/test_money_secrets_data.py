import json
import re

def test_money_secrets():
    with open('data/money_secrets.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # エピソード数の検証 (18 -> 19話に増加)
    assert len(data) == 19, f"Expected 19 episodes, got {len(data)}"
    
    # 第19話 (先頭に挿入されると想定) の検証
    ep19 = data[0]
    assert ep19.get('ep') == 19, f"First element should be Ep 19, got Ep {ep19.get('ep')}"
    assert ep19.get('title') == "「前払いAI学校」の甘い誘惑 〜有名起業家AI学校とミュゼプラチナムに共通する『お金をもらってから考える』危ういモデル〜"
    
    chat = ep19.get('chat_html', '')
    assert "ミュゼ" in chat, "Could not find 'ミュゼ' in Ep 19 chat_html"
    assert "前受収益" in chat, "Could not find '前受収益' in Ep 19 chat_html"
    assert "債務超過" in chat, "Could not find '債務超過' in Ep 19 chat_html"
    
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
