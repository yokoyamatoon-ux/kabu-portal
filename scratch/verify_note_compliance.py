import os
import re
import sys

def verify_article(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    errors = []
    warnings = []
    
    # 1. Check YAML Frontmatter
    if not content.startswith("---"):
        errors.append("Missing YAML frontmatter start (---)")
    else:
        # Extract frontmatter
        end_idx = content.find("---", 3)
        if end_idx == -1:
            errors.append("Missing YAML frontmatter end (---)")
        else:
            frontmatter = content[3:end_idx]
            if "title:" not in frontmatter:
                errors.append("Missing 'title' in frontmatter")
            if "tags:" not in frontmatter:
                errors.append("Missing 'tags' in frontmatter")
            if "eyecatch:" not in frontmatter:
                warnings.append("Missing 'eyecatch' in frontmatter (recommended)")
                
    # Remove frontmatter for body checks
    body = content
    if content.startswith("---"):
        end_idx = content.find("---", 3)
        if end_idx != -1:
            body = content[end_idx+3:]
            
    # 2. Check Kabu-teacher Tone
    tone_words = ["じゃよ", "じゃのう", "フォッフォッフォ", "じゃぞい", "のう", "ぞい"]
    found_tone = [word for word in tone_words if word in body]
    if len(found_tone) < 2:
        warnings.append(f"Kabu-teacher tone might be weak (found words: {found_tone})")
        
    # 3. Check Bold Markers (**) - Local Rule forbids this in note
    bold_markers = re.findall(r"\*\*([^*]+)\*\*", body)
    if bold_markers:
        errors.append(f"Contains double asterisk bold markers (**) which are forbidden in note text. Found {len(bold_markers)} occurrences: {bold_markers[:3]}...")
        
    # 4. Check CTA Links (https://okane-no-manabi.jp)
    has_cta_link = "okane-no-manabi.jp" in body
    if not has_cta_link:
        errors.append("Missing CTA link to the main portal okane-no-manabi.jp")
        
    # 5. Check X Link (https://x.com/kabu_teacher)
    has_x_link = "x.com/kabu_teacher" in body
    if not has_x_link:
        warnings.append("Missing link to Kabu-teacher X account (https://x.com/kabu_teacher)")
        
    # 6. Check for Heading Levels
    has_h2 = "## " in body
    if not has_h2:
        warnings.append("No H2 headings (##) found in the body")
        
    # 7. Check for local image paths in body (may fail to render on note.com)
    local_images = re.findall(r"!\[.*?\]\((?!http)(.*?)\)", body)
    if local_images:
        warnings.append(f"Contains local image file paths in body which note.com cannot render. Uploading manually or using note-mcp image upload is required. Found: {local_images}")
        
    return errors, warnings

def main():
    # Configure stdout to use UTF-8 to prevent Japanese/emoji crash on Windows console
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    articles = [
        "d:\\Antigravity\\Kabu\\data\\note_article_nisa_withdrawal.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_beauty_trap.md",
        "d:\\Antigravity\\Kabu\\data\\note_article_insurance.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_kabu_news_20260604.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_tax_and_invoice.md",
        "d:\\Antigravity\\Kabu\\scratch\\note_school_scam.md"
    ]
    
    print("="*80)
    print("NOTE ARTICLE VERIFICATION REPORT")
    print("="*80)
    
    for article in articles:
        if not os.path.exists(article):
            print(f"\n[FILE NOT FOUND] {article}")
            continue
            
        print(f"\nVerifying: {os.path.basename(article)}")
        print("-" * 40)
        errors, warnings = verify_article(article)
        
        if not errors and not warnings:
            print("[PASS] Perfect! Pass all checks.")
        else:
            if errors:
                for err in errors:
                    print(f"[ERROR] {err}")
            if warnings:
                for warn in warnings:
                    print(f"[WARNING] {warn}")
                    
    print("="*80)

if __name__ == "__main__":
    main()
