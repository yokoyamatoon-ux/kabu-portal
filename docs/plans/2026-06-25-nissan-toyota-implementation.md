# Nissan vs Toyota note.com Draft Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create, validate, and upload a comprehensive, compliant note.com draft article analyzing Nissan's decline and Toyota's rise using a hybrid dialogue/monologue structure.

**Architecture:** 
- The content is a Markdown file written to `scratch/note_nissan_toyota.md`.
- It uses YAML frontmatter, a brief dialogue intro, and a detailed monologue lecture.
- Compliance is checked using `scratch/verify_note_compliance.py`.
- Upload is handled using a custom Python script invoking note-mcp (or local Python equivalent).

**Tech Stack:** Python 3, Markdown, note-mcp.

---

### Task 1: Register Draft in Compliance Script (TDD)

**Files:**
- Modify: `scratch/verify_note_compliance.py:80-97`

**Step 1: Write the failing test case**
Add `"d:\\Antigravity\\Kabu\\scratch\\note_nissan_toyota.md"` to the `articles` list in `verify_note_compliance.py`.

```python
    articles = [
        # ... existing articles ...
        "d:\\Antigravity\\Kabu\\scratch\\note_medical_expenses.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_nissan_toyota.md"
    ]
```

**Step 2: Run test to verify it fails**
Run: `python scratch/verify_note_compliance.py`
Expected: Outputs `[FILE NOT FOUND] d:\Antigravity\Kabu\scratch\note_nissan_toyota.md` in the console report.

**Step 3: Commit**
```bash
git add scratch/verify_note_compliance.py
git commit -m "test: register nissan vs toyota note article in compliance checks"
```

---

### Task 2: Write note.com Draft and Verify Compliance

**Files:**
- Create: `scratch/note_nissan_toyota.md`

**Step 1: Write note content**
Write the full text (at least 2,500 characters) in `scratch/note_nissan_toyota.md`.
- Ensure it has YAML frontmatter with title, tags, and placeholder eyecatch.
- Ensure the intro features Maneta, Mirai, and Kabu-teacher (with "喝！！" and "フォッフォッフォ！").
- Ensure the monologue uses H2 headings, has no double asterisks (`**`), contains Kabu-teacher tone words, and includes CTA and X links.

**Step 2: Run verification script**
Run: `python scratch/verify_note_compliance.py`
Expected: The section `Verifying: note_nissan_toyota.md` prints `[PASS] Perfect! Pass all checks.` with no errors or warnings.

**Step 3: Commit**
```bash
git add scratch/note_nissan_toyota.md
git commit -m "feat: draft nissan vs toyota note article"
```

---

### Task 3: Create Upload Script and Run Upload

**Files:**
- Create: `scratch/upload_nissan_toyota_note.py`

**Step 1: Write upload script**
Write the script to upload the draft using note-mcp (or Python client using note api). Use the pattern from `scratch/upload_medical_expenses_note.py`.

```python
import os
import sys

# Script to upload note_nissan_toyota.md using note-mcp tool or fallback
# Since note-mcp runs as an MCP tool, this script can read the draft file
# and output its contents, or utilize the CLI tool if configured.
# Here we will write a script that outputs commands or uses note-mcp.
# Note: For Antigravity, we can invoke the note-mcp command directly
# or run a script that executes note-mcp wrapper.
# Let's inspect upload_medical_expenses_note.py first during execution.
```

**Step 2: Run upload**
Run: `python scratch/upload_nissan_toyota_note.py` (or direct CLI upload)
Expected: Returns Draft ID and Key.

**Step 3: Commit**
```bash
git add scratch/upload_nissan_toyota_note.py
git commit -m "feat: add upload script for nissan vs toyota note"
```

---

### Task 4: Final Verification and Link Check

**Step 1: Check preview link**
Verify that the generated preview URL works and the formatting matches expectations (no broken headings, correct character names).
Update the walkthrough.md artifact with the details.

**Step 2: Commit walkthrough**
```bash
git add docs/plans/walkthrough.md
git commit -m "docs: finalize nissan vs toyota note article walkthrough"
```
