# KABU PORTAL Project Rules

This document defines the core operational rules for the AI Agent when working on the Kabu Portal project. These rules are mandatory to maintain site consistency, visual excellence, and reliability.

## 1. Strict Deployment Rule
Any modification to frontend components (`web/src/components/*`), site content (`web/src/lib/*`), or overall project assets MUST be immediately followed by the execution of the deployment workflow.
- **Workflow**: `python d:\Antigravity\Kabu\deploy_kabu.py`
- **Verification**: The execution must confirm "Site updated successfully."

## 2. UI & Design Consistency
- **Home Page Limits**: The "Featured Columns" (注目のコラム) or similar content sections on the Home page must FIRMLY be limited to the latest 4 items (`limit={4}`).
- **Affiliate Banners**: Ensure all affiliate banners use the standardized rectangular assets (e.g., Rakuten & Matsui) and include `rel="nofollow noopener noreferrer"`.
- **premium Aesthetic**: Maintain the manga-style, high-contrast, and vibrant UI theme. Avoid generic browser defaults.

## 3. Build & Maintenance
- **Build Verification**: Before any deployment, ensure that `npm run build` succeeds locally in the `web/` directory.
- **Cache Management**: Frontend changes are aggressive with caching. Instruct the user to use **Super Reload (Ctrl+F5)** or Incognito mode if changes do not appear live.
- **Documentation**: After every deployment, update the `walkthrough.md` to record live changes and provide proof of update.

## 5. Manga Prompt Guidelines
For any task involving manga generation, the prompts MUST start with a standardized "Design Specification & Character Reference" header. This ensures visual consistency across different AI generation sessions.
- **Mandatory Header Content**:
  ```markdown
  【デザイン指定・キャラクター参照】
  スタイル: 日本の少年漫画風、クリーンな線画、鮮やかなフラットカラー。
  画像１　カブ先生（カブ先生）
  画像２　マネ太（マネ太）
  画像３　ミライ（ミライ）
  マンガのコマの流れは必ず右上が１コマ目、順序は右から左と進む構成にすること ※すべてのカットで、これらの参照画像のデザインを厳守すること。
  ```

---
*Last Updated: 2026-04-09*
