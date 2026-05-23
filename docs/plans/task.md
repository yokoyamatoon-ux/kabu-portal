| Task | Status | Notes |
| :--- | :--- | :--- |
| **Preparation** | | |
| 1. Create rewrite script | [x] | Python script `scratch/update_col_013.py` created to securely parse and modify JSON content. |
| **Apply Rewrite** | | |
| 2. Apply to raw data | [x] | Updated successfully in sync using Python update script. |
| 3. Apply to web-next data | [x] | Updated successfully in sync using Python update script. |
| **Verification** | | |
| 4. Next.js Dev Verification | [x] | Verified structure. Dynamic pages generate col_013 perfectly. |
| 5. Build export test | [x] | Ran `npm run build` inside `web-next`. All 61 static pages compiled successfully in 2.0s without errors. |
