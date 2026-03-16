import os
from PIL import Image

def split_icons(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    try:
        img = Image.open(input_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    width, height = img.size
    
    # Grid parameters
    cols = 8
    rows = 3
    
    cell_w = width // cols
    cell_h = height // rows
    
    icon_names = [
        # Row 1 (6 icons, columns 0-5)
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
            
            # Crop
            icon = img.crop((left, top, right, bottom))
            
            # Save
            icon_filename = f"{icon_names[idx]}.png"
            icon.save(os.path.join(output_dir, icon_filename))
            print(f"Saved: {icon_filename}")

if __name__ == "__main__":
    split_icons(r"D:\Antigravity\Kabu\illust\icon.png", r"D:\Antigravity\Kabu\illust\icons")
