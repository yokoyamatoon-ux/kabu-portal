import json
import os

path = r"d:\Antigravity\Kabu\data\columns.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# col_016 is the first one
body = data[0]["body"]
start_index = body.find("最大のポイントは節税のパワーじゃ")
if start_index != -1:
    context = body[start_index:start_index+200]
    print(f"Context: {context}")
    for i, char in enumerate(context):
        print(f"{char} (U+{ord(char):04X})", end=" ")
        if (i+1) % 5 == 0:
            print()
else:
    print("Not found")
