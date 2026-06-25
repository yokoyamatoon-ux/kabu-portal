# Walkthrough: Nissan vs Toyota note.com Draft

This document summarizes the changes and verification results for the note.com draft article comparing Nissan's decline and Toyota's rise.

## Changes Made

### Content Draft
- Created [note_nissan_toyota.md](file:///d:/Antigravity/Kabu/scratch/note_nissan_toyota.md) with a comprehensive analysis of Nissan's decline (Ghosn-era cost cuts, R&D suppression, Power 88 expansion issues, brand dilution) and Toyota's success (hybrid focus, TPS, multi-pathway strategy).
- Maintained a hybrid structure: a dialogue-based intro (Maneta, Mirai, Kabu-teacher) for engagement, transitioning into a detailed lecture monologue.
- Complied with all note.com formatting rules (no double asterisks `**`, H2 headings, 2,500+ character length, Kabu-teacher tone words, CTA/X links).

### Automated Testing & Registration
- Modified [verify_note_compliance.py](file:///d:/Antigravity/Kabu/scratch/verify_note_compliance.py) to register the new draft as a target for automated compliance checking.
- Created [upload_nissan_toyota_note.py](file:///d:/Antigravity/Kabu/scratch/upload_nissan_toyota_note.py) to handle uploading the markdown draft to note.com using the `note-mcp` environment.

---

## Verification Results

### 1. Automated Compliance Check
Successfully ran the compliance validator:
```bash
python scratch/verify_note_compliance.py
```
Output snippet:
```
Verifying: note_nissan_toyota.md
----------------------------------------
[PASS] Perfect! Pass all checks.
```

### 2. Draft Upload Status
Ran the upload script using the note-mcp virtual environment:
```bash
C:\Users\nanda\Desktop\note-mcp\.venv\Scripts\python.exe scratch\upload_nissan_toyota_note.py
```
**Results:**
- **Status**: SUCCESS
- **Draft ID**: `166954235`
- **Key**: `n79e2881ec538`
- **Preview Link**: [https://note.com/kabu_teacher/n/n79e2881ec538](https://note.com/kabu_teacher/n/n79e2881ec538)

*(Note: The eyecatch image upload failed as Column20260625.png does not exist yet. This is expected as the eyecatch will be set/created during the publication phase.)*
