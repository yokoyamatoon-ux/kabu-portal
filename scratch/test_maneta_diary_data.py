import json
import os
import sys

def test_maneta_diary_data():
    file_path = "data/maneta_diary.json"
    assert os.path.exists(file_path), f"{file_path} does not exist."
    
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    assert isinstance(data, list), "Data must be a list."
    assert len(data) >= 6, "Expected at least 6 episodes (including Episode 6)."
    
    valid_charas = {"hakase", "maneta", "mirai"}
    
    for item in data:
        ep = item.get("ep")
        assert isinstance(ep, int), f"Episode ep must be int, got {type(ep)} in ep {ep}"
        assert "date" in item, f"Missing 'date' in ep {ep}"
        assert "title" in item, f"Missing 'title' in ep {ep}"
        assert "summary" in item, f"Missing 'summary' in ep {ep}"
        assert "image" in item, f"Missing 'image' in ep {ep}"
        assert isinstance(item.get("manga_pages"), list), f"manga_pages must be list in ep {ep}"
        assert isinstance(item.get("chat_data"), list), f"chat_data must be list in ep {ep}"
        assert isinstance(item.get("related_contents"), list), f"related_contents must be list in ep {ep}"
        
        # chat_data validation
        for idx, chat in enumerate(item["chat_data"]):
            chara = chat.get("chara")
            assert chara in valid_charas, f"Invalid chara '{chara}' at chat {idx} in ep {ep}. Must be one of {valid_charas}"
            assert "text" in chat, f"Missing 'text' at chat {idx} in ep {ep}"
            assert "color" in chat, f"Missing 'color' at chat {idx} in ep {ep}"
            
        # related_contents validation
        for idx, rel in enumerate(item["related_contents"]):
            rel_type = rel.get("type")
            assert rel_type in {"column", "manga"}, f"Invalid related content type '{rel_type}' in ep {ep}"
            if rel_type == "column":
                assert "id" in rel, f"Missing 'id' for related column in ep {ep}"
            elif rel_type == "manga":
                assert "id" in rel, f"Missing 'id' for related manga in ep {ep}"
                
    print("All validation checks passed successfully!")

if __name__ == "__main__":
    try:
        test_maneta_diary_data()
        sys.exit(0)
    except AssertionError as e:
        print(f"Validation FAILED: {e}")
        sys.exit(1)
