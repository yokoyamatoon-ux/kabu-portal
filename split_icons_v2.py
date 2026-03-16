import os
from PIL import Image, ImageChops

def trim_and_center(img, target_size=(200, 200), padding=10):
    # Detect background (assuming top-left pixel is background)
    bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
    diff = ImageChops.difference(img, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    
    if not bbox:
        return None
    
    # Crop to content
    content = img.crop(bbox)
    
    # Resize to fit target_size with padding
    max_w = target_size[0] - 2 * padding
    max_h = target_size[1] - 2 * padding
    
    content.thumbnail((max_w, max_h), Image.LANCZOS)
    
    # Create new square canvas (transparent if possible)
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        canvas = Image.new('RGBA', target_size, (255, 255, 255, 0))
    else:
        canvas = Image.new('RGB', target_size, (255, 255, 255)) # Or original BG
        
    # Center content
    x = (target_size[0] - content.width) // 2
    y = (target_size[1] - content.height) // 2
    canvas.paste(content, (x, y))
    
    return canvas

def split_icons_pro(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    img = Image.open(input_path)
    width, height = img.size
    
    # Grid parameters
    cols = 8
    rows = 3
    
    cell_w = width // cols
    cell_h = height // rows
    
    icon_names = [
        # Row 1 (6 icons)
        "yen_1000", "dollar_100", "cash_stack", "bank_book", "bank_building", "stock_company", None, None,
        # Row 2 (8 icons)
        "piggy_bank", "wallet", "chart_up_yen", "chart_up_dollar", "warning", "rocket_up_1", "rocket_up_2", "chart_down",
        # Row 3 (8 icons)
        "stock_certificate", "global_market", "trading_laptop", "money_bag_pct", "handshake", "atm", "safe_vault", "gold_bars"
    ]
    
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            if idx >= len(icon_names) or icon_names[idx] is None:
                continue
                
            left = c * cell_w
            top = r * cell_h
            right = left + cell_w
            bottom = top + cell_h
            
            # Extract cell
            cell = img.crop((left, top, right, bottom))
            
            # Process cell
            processed = trim_and_center(cell)
            
            if processed:
                icon_filename = f"{icon_names[idx]}.png"
                processed.save(os.path.join(output_dir, icon_filename))
                print(f"Processed and Saved: {icon_filename}")
            else:
                print(f"Skipping empty cell: {icon_names[idx] if icon_names[idx] else idx}")

if __name__ == "__main__":
    split_icons_pro(r"D:\Antigravity\Kabu\illust\icon.png", r"D:\Antigravity\Kabu\illust\icons")
