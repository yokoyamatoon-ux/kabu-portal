import os
from PIL import Image, ImageOps

def clean_and_square(img, target_size=(200, 200), padding=10):
    # Convert to grayscale to detect content
    gray = img.convert("L")
    inv = ImageOps.invert(gray)
    # Background is white (255), so inverted is 0. 
    # Content is darker, so inverted is > 0.
    thresh = inv.point(lambda p: 255 if p > 15 else 0)
    bbox = thresh.getbbox()
    
    if not bbox:
        return None
        
    content = img.crop(bbox)
    
    # Create finalRGBA canvas
    final = Image.new("RGBA", target_size, (255, 255, 255, 0))
    
    # Resize content
    max_w, max_h = target_size[0] - 2*padding, target_size[1] - 2*padding
    content.thumbnail((max_w, max_h), Image.LANCZOS)
    
    # Center
    px = (target_size[0] - content.width) // 2
    py = (target_size[1] - content.height) // 2
    final.paste(content, (px, py), content if content.mode == 'RGBA' else None)
    
    return final

def split_icons_final(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    row_count = 3
    rh = h // row_count
    
    # Per-row column counts
    row_configs = [
        {"cols": 6, "names": ["yen_1000", "dollar_100", "cash_stack", "bank_book", "bank_building", "stock_company"]},
        {"cols": 8, "names": ["piggy_bank", "wallet", "chart_up_yen", "chart_up_dollar", "warning", "rocket_up_1", "rocket_up_2", "chart_down"]},
        {"cols": 8, "names": ["stock_certificate", "global_market", "trading_laptop", "money_bag_pct", "handshake", "atm", "safe_vault", "gold_bars"]}
    ]
    
    for r, config in enumerate(row_configs):
        cols = config["cols"]
        names = config["names"]
        cw = w // cols
        
        for c in range(cols):
            left = c * cw
            top = r * rh
            right = (c + 1) * cw
            bottom = (r + 1) * rh
            
            cell = img.crop((left, top, right, bottom))
            processed = clean_and_square(cell)
            
            if processed:
                name = names[c]
                processed.save(os.path.join(output_dir, f"{name}.png"))
                print(f"Success: {name}.png")
            else:
                print(f"Empty cell at Row {r} Col {c}")

if __name__ == "__main__":
    split_icons_final(r"D:\Antigravity\Kabu\illust\icon.png", r"D:\Antigravity\Kabu\illust\icons")
