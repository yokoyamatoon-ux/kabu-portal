# Design Doc: Nissan's Decline vs. Toyota's Rise (note.com Draft)

This design document outlines the structure, metadata, content strategy, and compliance constraints for the note.com draft analyzing Nissan's decline and Toyota's success.

## User Review Required

- **Article Structure**: Hybrid structure with a dialogue-based intro for the hook, followed by Kabu-teacher's monologue (lecture) for the detailed business analysis.
- **Tone & Perspective**: Focuses on "customer-first approach vs. over-optimization (cost cuts)" as the core lesson for investors and business people.

## Proposed Changes

### Content Package

#### [NEW] [2026-06-25-nissan-toyota-design.md](file:///d:/Antigravity/Kabu/docs/plans/2026-06-25-nissan-toyota-design.md)
This design document.

#### [NEW] [note_nissan_toyota.md](file:///d:/Antigravity/Kabu/scratch/note_nissan_toyota.md)
The actual draft of the note article, to be stored in the scratch directory.

## Article Specifications

### 1. Metadata (YAML Frontmatter)
```yaml
---
title: 「技術の日産」はなぜ赤字転落したのか？トヨタ過去最高益の「マルチパスウェイ戦略」から学ぶ顧客第一の投資術
eyecatch: D:\Antigravity\Kabu\image\column\Column20260625.png
tags: [日産自動車, トヨタ自動車, 企業分析, 投資初心者, 経営戦略, 新NISA]
---
```

### 2. Character Roles in Dialogue Intro
- **Maneta**: Naive student. Shocked by the news of Nissan's massive layoffs and Toyota's record profits. Asks if it is simply a difference in technical skills.
- **Mirai**: Logical student. Points out that even superior technology needs to translate to what customers actually want.
- **Kabu-teacher**: The authority figure. Explains that the difference lies in customer-centric adaptation vs. clinging to past success. Shouts "Katsu!!" (喝！！) and shifts to his monologue lecture.

### 3. Monologue (Lecture) Sections (H2 Headings)
1. **## ゴーン体制の劇薬：コストカットが招いた研究開発（R&D）投資不足の罠**
   - V-shaped recovery under Ghosn's cost cutting.
   - Long-term side effects: starved R&D budgets, stagnant model updates, older vehicle age.
2. **## 拡大路線『パワー88』の崩壊：ブランド毀損と新興勢力の台頭**
   - Over-investment in global capacity, reliance on deep discounts in the US destroying brand value.
   - Early EV success (Leaf) was lost due to lack of subsequent R&D funding, letting BYD/Tesla take lead.
3. **## トヨタの『マルチパスウェイ』：顧客が今求める『現実的な最適解』の提供**
   - Hybrid strategy leadership (Prius) capturing the real demand.
   - "Multi-pathway" (HEV, PHEV, BEV, FCEV) as an adaptable shield against EV market deceleration.
   - Toyota Production System (TPS) and localization (IMV series) ensuring cost and quality.
4. **## 投資家が学ぶべき教訓：成功体験への固執を防ぎ、変化に適応すること**
   - Clinging to cost-cutting / alliance formulas vs. constant adaptation and customer focus.
   - Applying this to individual asset portfolios: avoid sticking to past winning formulas.

### 4. Compliance and Validation Rules (To be checked by verify_note_compliance.py)
- **Word Count**: Must be 2,500+ characters (to provide deep analysis).
- **Bold Markers**: NO double asterisks (`**`). Note.com renders them poorly or breaks styling.
- **Kabu-teacher's Tone**: Must contain at least two instances of: `じゃよ`, `じゃのう`, `フォッフォッフォ`, `じゃぞい`, `のう`, `ぞい`.
- **CTA Link**: Must contain a link to `okane-no-manabi.jp`.
- **X Link**: Must contain a link to `x.com/kabu_teacher`.
- **Headings**: Must use H2 headings (`## `).
- **No Local Images**: No Markdown image links pointing to local paths in the body.

## Verification Plan

### Automated Compliance Tests
1. Register `scratch/note_nissan_toyota.md` in `scratch/verify_note_compliance.py`.
2. Run `python scratch/verify_note_compliance.py` to ensure it passes all rules.
3. Assert success output.
