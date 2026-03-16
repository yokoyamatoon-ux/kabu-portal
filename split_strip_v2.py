import os
from PIL import Image, ImageOps

def extract_from_strip(img, row_idx, num_icons, names):
    w, h = img.size
    rh = h // 3
    strip = img.crop((0, row_idx * rh, w, (row_idx + 1) * rh))
    
    gray = strip.convert("L")
    inv = ImageOps.invert(gray)
    binary = inv.point(lambda p: 255 if p > 70 else 0) 
    
    visited = [[False for _ in range(strip.size[1])] for _ in range(strip.size[0])]
    bins = binary.load()
    boxes = []
    
    for x in range(0, w, 2): # Finer step
        for y in range(0, strip.size[1], 2):
            if bins[x, y] == 255 and not visited[x][y]:
                min_x, min_y, max_x, max_y = x, y, x, y
                stack = [(x, y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    min_x, min_y = min(min_x, cx), min(min_y, cy)
                    max_x, max_y = max(max_x, cx), max(max_y, cy)
                    for dx, dy in [(0, 10), (0, -10), (10, 0), (-10, 0)]:
                        nx, ny = cx + dx, cy + dy
                        if 0 <= nx < w and 0 <= ny < strip.size[1]:
                            if bins[nx, ny] == 255 and not visited[nx][ny]:
                                visited[nx][ny] = True
                                stack.append((nx, ny))
                if (max_x - min_x) > 50 and (max_y - min_y) > 50:
                    boxes.append([min_x, min_y, max_x, max_y])
    
    boxes.sort(key=lambda b: b[0])
    
    # Smarter merge: merge if they overlap significantly in X or are VERY close
    merged = []
    if boxes:
        cur = boxes[0]
        for next_box in boxes[1:]:
            # Horizontal gap
            gap = next_box[0] - cur[2]
            # Vertical overlap
            overlap_y = min(cur[3], next_box[3]) - max(cur[1], next_box[1])
            
            if gap < 80: # Close enough to be part of the same icon (e.g. coins)
                cur[0] = min(cur[0], next_box[0])
                cur[1] = min(cur[1], next_box[1])
                cur[2] = max(cur[2], next_box[2])
                cur[3] = max(cur[3], next_box[3])
            else:
                merged.append(cur)
                cur = next_box
        merged.append(cur)
        
    print(f"Row {row_idx}: Detected {len(merged)} icons (Goal: {num_icons})")
    
    output_dir = r"D:\Antigravity\Kabu\illust\icons"
    os.makedirs(output_dir, exist_ok=True)
    
    for i, box in enumerate(merged):
        if i >= len(names): break
        name = names[i]
        # Add safety margin
        margin = 15
        crop_box = (max(0, box[0]-margin), max(0, box[1]-margin), min(w, box[2]+margin), min(strip.size[1], box[3]+margin))
        icon_img = strip.crop(crop_box)
        
        final = Image.new("RGBA", (200, 200), (255, 255, 255, 0))
        icon_img.thumbnail((185, 185), Image.LANCZOS)
        px, py = (200 - icon_img.width)//2, (200 - icon_img.height)//2
        final.paste(icon_img, (px, py), icon_img if icon_img.mode == 'RGBA' else None)
        final.save(os.path.join(output_dir, f"{name}.png"))
        print(f"Saved: {name}.png")

def main():
    img = Image.open(r"D:\Antigravity\Kabu\illust\icon.png").convert("RGBA")
    row_configs = [
        {"names": ["yen_1000", "dollar_100", "cash_stack", "bank_book", "bank_building", "stock_company"]},
        {"names": ["piggy_bank", "wallet", "chart_up_yen", "chart_up_dollar", "warning", "rocket_up_1", "rocket_up_2", "chart_down"]},
        {"names": ["stock_certificate", "global_market", "trading_laptop", "money_bag_pct", "handshake", "atm", "safe_vault", "gold_bars"]}
    ]
    for r, cfg in enumerate(row_configs):
        extract_from_strip(img, r, len(cfg["names"]), cfg["names"])

if __name__ == "__main__":
    main()
