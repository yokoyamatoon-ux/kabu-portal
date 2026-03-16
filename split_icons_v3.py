import os
from PIL import Image, ImageOps

def split_and_square(input_path, output_dir, target_size=(200, 200), padding=5):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    cols, rows = 8, 3
    cw, ch = w // cols, h // rows
    
    icon_names = [
        "yen_1000", "dollar_100", "cash_stack", "bank_book", "bank_building", "stock_company", None, None,
        "piggy_bank", "wallet", "chart_up_yen", "chart_up_dollar", "warning", "rocket_up_1", "rocket_up_2", "chart_down",
        "stock_certificate", "global_market", "trading_laptop", "money_bag_pct", "handshake", "atm", "safe_vault", "gold_bars"
    ]
    
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            if idx >= len(icon_names) or not icon_names[idx]:
                continue
                
            # Crop cell
            cell = img.crop((c*cw, r*ch, (c+1)*cw, (r+1)*ch))
            
            # Find content bbox using grayscale threshold
            gray = cell.convert("L")
            # Invert so content is white, background is black
            # Original background is likely near-white (255)
            inverted = ImageOps.invert(gray)
            # Threshold to remove noise
            # Only pixels darker than 250 in the original will be > 5 in inverted
            thresh = inverted.point(lambda p: 255 if p > 5 else 0)
            bbox = thresh.getbbox()
            
            if bbox:
                content = cell.crop(bbox)
                
                # Create final 200x200 canvas
                final = Image.new("RGBA", target_size, (255, 255, 255, 0))
                
                # Resize content to fit
                max_w = target_size[0] - 2 * padding
                max_h = target_size[1] - 2 * padding
                content.thumbnail((max_w, max_h), Image.LANCZOS)
                
                # Center
                px = (target_size[0] - content.width) // 2
                py = (target_size[1] - content.height) // 2
                final.paste(content, (px, py), content if content.mode == 'RGBA' else None)
                
                out_path = os.path.join(output_dir, f"{icon_names[idx]}.png")
                final.save(out_path)
                print(f"Saved: {icon_names[idx]}.png")
            else:
                print(f"Empty: {icon_names[idx]}")

if __name__ == "__main__":
    split_and_square(r"D:\Antigravity\Kabu\illust\icon.png", r"D:\Antigravity\Kabu\illust\icons")
