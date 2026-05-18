# 'Ordinary Wealthy' Column (col_021) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create a new Column article `col_021` about ordinary salarymen building 100 million yen in assets (「いつの間にか富裕層」) based on the Nikkei article and a tweet by SOU_BTC, set up a note.com promotion draft, and write X thread drafts to `x_dashboard/draft.json`.

**Architecture:** Add new JSON data to columns.json, create a markdown file for note.com promotion, push to note via note-mcp, extract the key/URL, update x_dashboard/draft.json with the promotional thread, and deploy.

**Tech Stack:** Next.js, Python, MCP (note-mcp), JSON

---

### Task 1: Add new column entry `col_021` to columns.json

**Files:**
- Modify: `D:\Antigravity\Kabu\data\columns.json:1-30`

**Step 1: Write the failing verification test**
We will write a python snippet `D:\Antigravity\Kabu\scratch\verify_col_021.py` that asserts that `columns.json` has `col_021` at the beginning and satisfies:
- ID is `col_021`
- No bold markers (`**`) inside the body.
- Body has over 1,500 characters and dialogue format.
- Contains required definition sentence.

**Step 2: Run test to verify it fails**
Run: `python D:\Antigravity\Kabu\scratch\verify_col_021.py`
Expected: FAIL with "File does not contain col_021"

**Step 3: Write minimal implementation**
Insert `col_021` into the top of the array in `D:\Antigravity\Kabu\data\columns.json`.

**Step 4: Run test to verify it passes**
Run: `python D:\Antigravity\Kabu\scratch\verify_col_021.py`
Expected: PASS

**Step 5: Commit**
```bash
git add D:\Antigravity\Kabu\data\columns.json
git commit -m "feat: add col_021 about 'いつの間にか富裕層'"
```

---

### Task 2: Create note.com promotion draft

**Files:**
- Create: `D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md`

**Step 1: Write the draft note**
Create the note markdown file with the correct frontmatter:
- `title`: `"「いつの間にか富裕層」が急増中！？普通の会社員が資産1億円に達する秘密"`
- `eyecatch`: `"D:\Antigravity\Kabu\web-next\public\images\column\Column20260518.png"`
- `tags`: `["資産形成", "投資初心者", "家計管理", "新NISA"]`
Body must use Maneta and Kabu dialogue and guide readers to `https://okane-no-manabi.jp/column/col_021/`.

**Step 2: Authenticate and Upload Draft**
Run `mcp_note-mcp_note_check_auth` to confirm session.
Upload using `mcp_note-mcp_note_create_from_file` with file `D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md`.
Retrieve the note URL (e.g. `https://note.com/kabu_teacher/n/<key>`).

**Step 3: Commit**
```bash
git add D:\Antigravity\Kabu\scratch\note_ordinary_wealthy.md
git commit -m "feat: add note promotional draft for col_021"
```

---

### Task 3: Update X thread draft in draft.json

**Files:**
- Modify: `D:\Antigravity\Work Smart\x_dashboard\draft.json`

**Step 1: Write the updated draft**
Populate `kabu` posts in `draft.json` with a 4-tweet thread:
- Tweet 1: Quote tweet to SOU_BTC's tweet.
- Tweet 2: Focus on 家計管理 (Household management).
- Tweet 3: Focus on 長期投資の継続 (Long-term consistency).
- Tweet 4: Link to the note draft URL created in Task 2.

**Step 2: Verify JSON format**
Verify `draft.json` syntax.

**Step 3: Commit**
```bash
git add "D:\Antigravity\Work Smart\x_dashboard\draft.json"
git commit -m "feat: update kabu X draft with col_021 promo thread"
```

---

### Task 4: Run local build and deploy check

**Files:**
- Run: `D:\Antigravity\Kabu\deploy_kabu.py`

**Step 1: Run deployment script**
Execute `python deploy_kabu.py` to copy columns.json and build assets.
Verify there are no compile or data copy errors.

**Step 2: Commit & Finalize**
```bash
git commit -m "feat: build and deploy kabu portal with col_021"
```
