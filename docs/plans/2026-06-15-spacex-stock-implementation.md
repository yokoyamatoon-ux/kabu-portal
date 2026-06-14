# SpaceX Employee Stock Column and Elon Musk Note Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create a new portal column `col_033` about SpaceX employee stock options and wealth distribution, and create a comprehensive note.com draft about Elon Musk's background and future prospects.

**Architecture:** 
1. Prepend `col_033` JSON to `data/columns.json` following the column schema and dialog tones.
2. Generate the eyecatch image `Column20260615.png` using `generate_image` and place it in the correct source and public directories.
3. Write a compliant `scratch/note_elon_musk.md` draft (no `**` bold markers, include main portal/X CTAs, >2500 characters).
4. Run python verification scripts locally to guarantee database integrity and note compliance.
5. Upload the note draft using a python script wrapping `note-mcp`.
6. Run build and deployment scripts to update the live Next.js portal.

**Tech Stack:** Next.js (web-next), Python 3.11, note-mcp, Git.

---

### Task 1: Create Column JSON Data and Validation Test

**Files:**
- Create: `scratch/test_columns_data.py`
- Modify: `data/columns.json`

**Step 1: Write the failing test**
Create `scratch/test_columns_data.py` to check that the new column `col_033` exists, is valid JSON, contains required metadata, contains correct speaker dialog tones (Kabu, Maneta, Mirai), mentions relevant companies, and has correct related links.

```python
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
    
    print("Columns test passed successfully!")

if __name__ == '__main__':
    test_columns()
```

**Step 2: Run test to verify it fails**
Run: `python scratch/test_columns_data.py`
Expected: FAIL with "col_033 not found in columns.json"

**Step 3: Modify columns.json to add col_033**
Add `col_033` to the top of `data/columns.json` with the approved dialog text and structure.

**Step 4: Run test to verify it passes**
Run: `python scratch/test_columns_data.py`
Expected: PASS

**Step 5: Commit**
```bash
git add data/columns.json scratch/test_columns_data.py
git commit -m "feat: add col_033 SpaceX employee stock column data and validation test"
```

---

### Task 2: Generate and Deploy Column Eyecatch Image

**Files:**
- Create: `image/column/Column20260615.png` (using generate_image)
- Copy: `web-next/public/images/column/Column20260615.png`

**Step 1: Propose prompt and generate image**
Use the `generate_image` tool with the approved Japanese prompt to generate `Column20260615.png`.
Target path: `d:\Antigravity\Kabu\image\column\Column20260615.png`

**Step 2: Copy image to web-next public folder**
Run: `copy d:\Antigravity\Kabu\image\column\Column20260615.png d:\Antigravity\Kabu\web-next\public\images\column\Column20260615.png`
Expected: Successfully copied file.

**Step 3: Commit image**
```bash
git add image/column/Column20260615.png web-next/public/images/column/Column20260615.png
git commit -m "feat: generate and deploy col_033 eyecatch image"
```

---

### Task 3: Create note.com Draft Article

**Files:**
- Create: `scratch/note_elon_musk.md`
- Modify: `scratch/verify_note_compliance.py` (add `note_elon_musk.md` to list of validated articles)

**Step 1: Register note draft in compliance verification script**
Modify `scratch/verify_note_compliance.py` to add `"d:\\Antigravity\\Kabu\\scratch\\note_elon_musk.md"` to the `articles` list on line 80.
Run: `python scratch/verify_note_compliance.py`
Expected: Output showing `[FILE NOT FOUND] ...note_elon_musk.md`.

**Step 2: Implement note_elon_musk.md**
Write the comprehensive draft of Elon Musk's biography and future prospects. Ensure:
- It starts with YAML frontmatter containing `title`, `tags` (`["イーロン・マスク", "SpaceX", "Tesla", "起業家", "資産形成", "お金の学び場"]`).
- No `**` bold markers are used in the text.
- Character count is > 2500 characters.
- Tones like "じゃよ", "フォッフォッフォ" are present.
- Contains the main portal link (https://okane-no-manabi.jp) and X link (https://x.com/kabu_teacher).

**Step 3: Run verify script to verify it passes**
Run: `python scratch/verify_note_compliance.py`
Expected: `Verifying: note_elon_musk.md -> [PASS] Perfect! Pass all checks.`

**Step 4: Commit**
```bash
git add scratch/note_elon_musk.md scratch/verify_note_compliance.py
git commit -m "content: create note.com draft for Elon Musk biography and update compliance verification"
```

---

### Task 4: Upload note.com Draft via note-mcp Wrapper

**Files:**
- Create: `scratch/upload_elon_musk_note.py`

**Step 1: Create upload script**
Create `scratch/upload_elon_musk_note.py` that loads note-mcp session and creates the draft from the markdown file.

```python
import asyncio
import sys
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")
from note_mcp.server import note_create_from_file

async def main():
    print("Uploading note draft...")
    res = await note_create_from_file(
        file_path=r"D:\Antigravity\Kabu\scratch\note_elon_musk.md",
        upload_images=True
    )
    print("Upload Result:")
    print(res)

if __name__ == '__main__':
    asyncio.run(main())
```

**Step 2: Run the upload script**
Run: `python scratch/upload_elon_musk_note.py`
Expected: Outputs Draft ID and Key. (Ensure you copy the resulting Draft ID/Key into the commit or task notes).

**Step 3: Commit upload script**
```bash
git add scratch/upload_elon_musk_note.py
git commit -m "tool: add note.com draft upload script"
```

---

### Task 5: Build, Deploy, and Verify Live Site

**Files:**
- Modify: `docs/plans/task.md` (mark all tasks as done)

**Step 1: Build Next.js site locally to ensure no errors**
Run: `npm run build` inside `d:\Antigravity\Kabu\web-next`
Expected: Production build compiles successfully.

**Step 2: Deploy site using deploy_kabu.py**
Run: `python scripts/deploy_kabu.py`
Expected: Differential deployment finishes with no errors.

**Step 3: Verify live URL**
Use read_url_content to verify `https://okane-no-manabi.jp/column/col_033` returns 200 OK and contains the expected content.
Confirm that the page layout, eyecatch image, and FAQs render perfectly.

**Step 4: Update task.md tracker**
Mark all tasks as `[x]` in `docs/plans/task.md`.
Commit final tracker updates.
```bash
git add docs/plans/task.md
git commit -m "docs: finalize SpaceX employee stock task tracker"
```
