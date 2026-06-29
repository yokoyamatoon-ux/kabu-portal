import json
import re

def test_manga():
    with open('data/manga.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    assert len(data) == 16, f"Expected 16 episodes, got {len(data)}"
    
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
    
    # Verify Ep 16 contents
    ep16 = next(x for x in data if x.get('ep') == 16)
    assert ep16['title'] == "ETFってなに？"
    assert ep16['topic'] == "etf_basics"
    assert ep16['manga_pages'] == [
        "/manga/manabu/20260622/manabu_20260622_01.png",
        "/manga/manabu/20260622/manabu_20260622_02.png"
    ]
    
    desc_ep16 = ep16['description_long']
    assert "Exchange Traded Funds" in desc_ep16
    assert "証券取引所" in desc_ep16
    assert "https://www.jpx.co.jp" in desc_ep16

    # Verify deep-dive commentary words
    comments = [x['text'] for x in ep16['commentary']]
    assert any("デイトレ" in x for x in comments), "Could not find 'デイトレ' in Ep 16 commentary"
    assert any("複利" in x for x in comments), "Could not find '複利' in Ep 16 commentary"
    assert any("スプレッド" in x for x in comments) or any("乖離" in x for x in comments), "Could not find 'スプレッド/乖離' in Ep 16 commentary"
    assert any("つみたて投資枠" in x for x in comments), "Could not find 'つみたて投資枠' in Ep 16 commentary"
    assert any("成長投資枠" in x for x in comments), "Could not find '成長投資枠' in Ep 16 commentary"

    
    # Check for translation artifacts in ep14, ep15, and ep16
    for desc in [desc_ep14, desc_ep15, desc_ep16]:
        assert not re.search(r'\bof\b', desc), "Found English 'of' in Japanese text"
        assert not re.search(r'\bis\b', desc), "Found English 'is' in Japanese text"
    
    print("All tests passed successfully!")

if __name__ == '__main__':
    test_manga()
