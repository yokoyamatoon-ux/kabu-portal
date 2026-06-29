# Design Document: Kabu Portal Admin (Local CMS)

**Date:** 2026-05-13
**Status:** Approved
**Topic:** Local management system for Kabu Portal (okane-no-manabi.jp)

## 1. Goal
Provide a user-friendly, local web interface for non-technical manual updates to the Kabu Portal data. This allows for quick typo fixes, content additions, and image path updates without direct JSON editing.

## 2. Architecture

### Backend (Python/Flask)
- **Role:** File I/O, API provider, and execution of deployment scripts.
- **Endpoints:**
    - `GET /api/content`: Reads all JSON files from `data/` and returns them.
    - `POST /api/content/<type>`: Receives updated content, creates a backup in `data/backup/`, and overwrites the target JSON.
    - `POST /api/deploy`: Executes `python deploy_kabu.py` and streams output via Server-Sent Events (SSE) or simple polling.
- **Security:** Bound to `localhost` (127.0.0.1) only.

### Frontend (HTML/JS/Tailwind CSS)
- **Role:** Modern, aesthetic UI for data management.
- **Tech Stack:**
    - Vanilla HTML/JS (or lightweight React via CDN for state management).
    - Tailwind CSS via CDN for styling.
    - Lucide Icons for iconography.
- **Design Philosophy:** 
    - Dark-mode primary.
    - Glassmorphism effects.
    - Side-panel editing (to keep list context visible).

## 3. Key Features

### Content Management
- Support for: `columns.json`, `manga.json`, `money_secrets.json`, `maneta_diary.json`.
- List view with search/filter.
- Detailed form for editing all fields (ID, title, body, speaker settings, etc.).

### Image Handling
- Simple text input for image paths.
- (Optional/Future) Image preview for selected paths.

### One-Click Deployment
- Integration with existing `deploy_kabu.py`.
- Real-time log console in the UI to monitor progress.

## 4. Safety & Recovery
- **Pre-save Backup:** Every save action copies the existing file to `data/backup/data_YYYYMMDD_HHMMSS.json`.
- **Validation:** JSON schema validation before writing to disk to prevent corrupted data.

## 5. Success Criteria
- User can successfully edit a column title and see it reflected in the local JSON.
- User can trigger a deploy from the dashboard and see the "Success" message.
- No impact on the production site until "Deploy" is clicked.
