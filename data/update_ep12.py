import json
import os

path = r'd:\Antigravity\Kabu\data\money_secrets.json'
new_html_path = r'd:\Antigravity\Kabu\data\ep12_new_chat.html'

with open(path, 'rb') as f:
    raw = f.read()

with open(new_html_path, 'r', encoding='utf-8') as f:
    new_html = f.read()

# Load JSON safely
content = raw.decode('utf-8', errors='replace')
data = json.loads(content)

# Update Episode 12
updated = False
for item in data:
    if item.get('ep') == 12:
        item['title'] = "「高額報酬」の罠 〜怪しい求人とマルチ商法の実態〜"
        item['summary'] = "「月収100万円」や「誰でも簡単」という甘い言葉の裏側に潜む、最新の詐欺・マルチ商法の実態を大解剖！"
        item['tags'] = ["リスク", "注意喚起", "詐欺", "最新情報"]
        item['chat_html'] = new_html
        
        # Add manga_pages (IMPORTANT: Add the 2nd page)
        item['manga_pages'] = [
            "/images/money_secret/urakane20260512_01.png",
            "/images/money_secret/urakane20260512_02.png"
        ]
        
        updated = True
        break

if updated:
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print("Updated Episode 12 with 2nd page and expanded commentary.")
else:
    print("Episode 12 not found in JSON.")
