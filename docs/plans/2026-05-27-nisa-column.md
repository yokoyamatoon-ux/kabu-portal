# New NISA Column (col_025) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create and deploy a new column `col_025` about New NISA account comparison (SBI vs. Rakuten) with a premium AI-generated eye-catch image.

**Architecture:** Add a new entry to the canonical data source `data/columns.json`. Use `generate_image` to create a beautiful, modern comparative asset in `image/column/Column20260527.png`. Then sync assets, build, and deploy the project using `scripts/deploy_kabu.py`.

**Tech Stack:** JSON, Next.js 16, Python deploy script, Gemini 3.5 Flash (Medium).

---

### Task 1: Generate Premium Eye-Catch Image

**Files:**
- Create: `image/column/Column20260527.png`

**Step 1: Generate premium image**
Call the image generation tool to produce a beautiful comparative illustration representing SBI (blue, V-Points) vs Rakuten (red, Rakuten Points) in a premium, 3D modern style.

**Step 2: Save to target location**
Verify that the generated image is saved at `d:\Antigravity\Kabu\image\column\Column20260527.png`.

---

### Task 2: Append Entry to columns.json

**Files:**
- Modify: `data/columns.json`

**Step 1: Update columns.json**
Add the new `col_025` entry to the top of `data/columns.json` (just before `col_024`). Keep all metadata fields consistent with the existing schema.

**Step 2: Validate JSON syntax**
Validate the updated JSON using `python -m json.tool data/columns.json` or equivalent.
Expected output: Success (no syntax error).

---

### Task 3: Local Sync, Build, and Deploy

**Files:**
- Modify: `docs/plans/task.md` (Update task list table)

**Step 1: Run sync and local build validation**
Validate that the Next.js static generation succeeds by executing `npm run build` inside `web-next/`.

**Step 2: Execute deploy script**
Run `python scripts/deploy_kabu.py` to synchronize resources, execute Next.js build, and deploy the updated site.

**Step 3: Verification**
Verify that `Column20260527.png` successfully synced to `web-next/public/images/column/Column20260527.png` and that the new page `/column/col_025/` is generated correctly.
