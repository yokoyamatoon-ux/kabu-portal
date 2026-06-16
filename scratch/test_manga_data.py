import json
import re

def test_manga():
    with open('data/manga.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    assert len(data) == 15, f"Expected 15 episodes, got {len(data)}"
    
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
    
    desc_ep14 = ep14['description_long']
    assert "日本マクドナルドHD" in desc_ep14
    assert "東芝" in desc_ep14
    assert "https://www.nikkei.com" in desc_ep14
    
    # Verify Ep 15 contents
    ep15 = next(x for x in data if x.get('ep') == 15)
    assert "金" in ep15['title']
    assert ep15['topic'] == "gold_investment"
    assert ep15['manga_pages'] == [
        "/manga/manabu/20260617/manabu_20260617_01.png",
        "/manga/manabu/20260617/manabu_20260617_02.png"
    ]
    
    desc_ep15 = ep15['description_long']
    assert "5,600" in desc_ep15 or "5600" in desc_ep15
    assert "4,000" in desc_ep15 or "4000" in desc_ep15
    assert "利息" in desc_ep15
    
    # Check for translation artifacts in ep14 and ep15
    for desc in [desc_ep14, desc_ep15]:
        assert not re.search(r'\bof\b', desc), "Found English 'of' in Japanese text"
        assert not re.search(r'\bis\b', desc), "Found English 'is' in Japanese text"
    
    print("All tests passed successfully!")

if __name__ == '__main__':
    test_manga()
