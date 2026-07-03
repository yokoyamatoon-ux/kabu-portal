import os

filepath = r"D:\Antigravity\Kabu\scratch\note_spacex_short_sell.md"

if not os.path.exists(filepath):
    print("ERROR: Draft file not found.")
    exit(1)

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Check double asterisks (**)
assert "**" not in content, "Error: Double asterisks '**' detected in note draft. This is forbidden."

# 2. Check length (must be >= 3000 chars)
char_count = len(content)
print(f"Draft Character Count: {char_count}")
assert char_count >= 3000, f"Error: Draft character count ({char_count}) is less than 3000."

# 3. Check CTA links
assert "https://okane-no-manabi.jp" in content, "Error: CTA link to portal okane-no-manabi.jp is missing."
assert "https://x.com/kabu_teacher" in content, "Error: CTA link to X kabu_teacher is missing."

print("SUCCESS: Local note validation passed!")
