# Agent Site Update & Deployment Rules

This document defines the rules for the AI Agent when working on the Kabu Portal project. These rules are mandatory to maintain consistency and site uptime.

## Rule 1: Automated Deployment
- **Definition**: Every time the Agent modifies any file within the `web/` directory or updates content files (e.g., `columns.js`, `news.js`), the deployment script MUST be run automatically as the final step of the task.
- **Command**: `python d:\Antigravity\Kabu\deploy_kabu.py`
- **Verification**: The Agent must verify that the script output ends with "Site updated successfully."

## Rule 2: Build Verification
- **Definition**: Before running the deployment script, the Agent must ensure that `npm run build` succeeds locally in the `web/` directory.

## Rule 3: Workflow Trigger
- **Definition**: After every successful deployment, the Agent must update the `walkthrough.md` to inform the user that the changes are live on the actual site.

## Rule 4: UI Display Limits (Home vs List)
- **Definition**: The "Featured Columns" (注目のコラム) or similar section on the **Home page** MUST firmly be limited to the latest 4 items (`limit={4}`). In contrast, dedicated list pages (e.g. `?page=column`) MUST show all available items.

## Rule 5: Cache Awareness
- **Definition**: Frontend changes (React/Vite) are heavily aggressive with caching. If the live site or localhost does not seem to reflect code modifications immediately after deployment, the Agent must instruct the user to use Super Reload (`Ctrl+F5`) or Incognito mode to bypass old JS bundles.
