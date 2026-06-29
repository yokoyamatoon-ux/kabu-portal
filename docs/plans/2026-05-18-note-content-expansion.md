# Note Content Expansion Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Update the note.com draft for `col_021` with a detailed, 3,000-character commentary by Kabu-teacher explaining the "いつの間にか富裕層" (ordinary wealthy) phenomenon, showing concrete investment examples, and citing original sources.

**Architecture:** Write a highly detailed markdown file `D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md` of around 3,000 characters, update the note draft on note.com using `note-mcp`, and verify the update.

**Tech Stack:** Markdown, Python, MCP (note-mcp)

---

### Task 1: Create detailed expanded note draft file

**Files:**
- Modify: `D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md`

**Step 1: Write the expanded markdown content**
Update the markdown file `D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md` to over 2,500-3,000 characters.
Include the 3 detailed simulation examples, source citations, definition, and dialogues without bold marks (`**`).

**Step 2: Write structural verification script**
Write `D:\Antigravity\Kabu\scratch\verify_note_style.py` to check character count (>= 2500), source citations, and no bold marks (`**`).

**Step 3: Run verification script**
Run: `python D:\Antigravity\Kabu\scratch\verify_note_style.py`
Expected: PASS

---

### Task 2: Upload updated draft to note.com

**Files:**
- Run note update API

**Step 1: Check Auth**
Check note session auth status.

**Step 2: Update Article**
Use `mcp_note-mcp_note_update_article` (or read markdown file contents and update via note_update_article) to update draft `160823005` with the new body.
Verify update status.

---

### Task 3: Finalize and Walkthrough

**Files:**
- Update task tracking and write walkthrough.
