---
description: Automated Site Deployment Workflow
---

This workflow defines the procedure for updating the Kabu Portal site. Whenever a change is made to the `web/` directory or related site content, this deployment MUST be executed to reflect changes on the live site.

// turbo
1. Execute the deployment script:
```powershell
python d:\Antigravity\Kabu\deploy_kabu.py
```

2. Confirm the script output says "Site updated successfully."

3. After a successful deployment, update the `walkthrough.md` with the link to the live site.
