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
