import json
import os
import re

def test_columns():
    json_path = 'data/columns.json'
    assert os.path.exists(json_path), f"{json_path} does not exist"
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Find col_033
    col = next((x for x in data if x.get('id') == 'col_033'), None)
    assert col is not None, "col_033 not found in columns.json"
    
    # Check basic fields
    assert col['date'] == '2026.06.15'
    assert col['category'] == '株式投資・IPO'
    assert col['category_color'] == '#3498DB'
    assert col['image'] == '/images/column/Column20260615.png'
    assert col['reading_time'] == 6
    
    body = col['body']
    # Check character dialog format
    assert 'マネ太：「' in body
    assert 'ミライ：「' in body
    assert 'カブ先生：「' in body
    
    # Check content key phrases
    assert '4,400人' in body
    assert '時給28ドル' in body
    assert 'Microsoft' in body
    assert 'Google' in body
    assert 'NVIDIA' in body
    
    # Verify related content links exist
    related_ids = [x['id'] for x in col['related_contents']]
    assert 'col_030' in related_ids
    assert 'col_031' in related_ids
    assert 'col_024' in related_ids
    
    # Find col_034
    col_034 = next((x for x in data if x.get('id') == 'col_034'), None)
    assert col_034 is not None, "col_034 not found in columns.json"
    
    # Check basic fields for col_034
    assert col_034['date'] == '2026.06.19'
    assert col_034['category'] == '株式投資・企業分析'
    assert col_034['category_color'] == '#3498DB'
    assert col_034['image'] == '/images/column/Column20260619.png'
    assert col_034['reading_time'] == 6
    
    body_034 = col_034['body']
    assert 'マネ太：「' in body_034
    assert 'ミライ：「' in body_034
    assert 'カブ先生：「' in body_034
    assert 'NOWHERE' in body_034
    assert 'シナジー効果' in body_034
    assert '時間を買う' in body_034

    print("Columns test passed successfully!")

if __name__ == '__main__':
    test_columns()
