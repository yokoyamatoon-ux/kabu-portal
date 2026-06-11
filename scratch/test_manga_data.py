import json
import re

def test_manga():
    with open('data/manga.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    assert len(data) == 14, f"Expected 14 episodes, got {len(data)}"
    
    # Verify Ep 10 integrity
    ep10 = next(x for x in data if x.get('ep') == 10)
    assert any("喝！！" in x['text'] for x in ep10['commentary']), "Could not find '喝！！' in Ep 10 commentary"
    assert "description_long" in ep10
    assert "上場" in ep10['title']
    
    # Verify Ep 14 contents
    ep14 = next(x for x in data if x.get('ep') == 14)
    assert ep14['title'] == "不祥事と株価暴落の真実"
    assert ep14['topic'] == "stock_crash"
    assert ep14['related_contents'] == [{"type": "money_secret", "id": 13}]
    
    desc = ep14['description_long']
    assert "日本マクドナルドHD" in desc
    assert "東芝" in desc
    assert "https://www.nikkei.com" in desc
    
    # Check for translation artifacts
    assert not re.search(r'\bof\b', desc), "Found English 'of' in Japanese text"
    assert not re.search(r'\bis\b', desc), "Found English 'is' in Japanese text"
    
    print("All tests passed successfully!")

if __name__ == '__main__':
    test_manga()
