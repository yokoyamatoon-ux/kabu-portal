import os
from PIL import Image, ImageOps

def extract_from_strip(img, row_idx, num_icons, names):
    w, h = img.size
    rh = h // 3
    strip = img.crop((0, row_idx * rh, w, (row_idx + 1) * rh))
    
    # Threshold to remove background texture
    gray = strip.convert("L")
    inv = ImageOps.invert(gray)
    # Background texture is likely near 250. Inverted is near 5.
    # Icon outlines are near 0. Inverted is near 255.
    binary = inv.point(lambda p: 255 if p > 80 else 0) # Higher threshold
    
    # Find components in the strip
    visited = [[False for _ in range(strip.size[1])] for _ in range(strip.size[0])]
    bins = binary.load()
    boxes = []
    
    for x in range(w):
        for y in range(strip.size[1]):
            if bins[x, y] == 255 and not visited[x][y]:
                min_x, min_y, max_x, max_y = x, y, x, y
                stack = [(x, y)]
                visited[x][y] = True
                while stack:
                    cx, cy = stack.pop()
                    min_x, min_y = min(min_x, cx), min(min_y, cy)
                    max_x, max_y = max(max_x, cx), max(max_y, cy)
                    for dx, dy in [(0, 15), (0, -15), (15, 0), (-15, 0)]:
                        nx, ny = cx + dx, cy + dy
                        if 0 <= nx < w and 0 <= ny < strip.size[1]:
                            if bins[nx, ny] == 255 and not visited[nx][ny]:
                                visited[nx][ny] = True
                                stack.append((nx, ny))
                if (max_x - min_x) > 100 and (max_y - min_y) > 100:
                    boxes.append([min_x, min_y, max_x, max_y])
    
    # Sort by X
    boxes.sort(key=lambda b: b[0])
    
    # Merge parts if they belong to the same icon (overlapping in X-ish)
    merged = []
    if boxes:
        cur = boxes[0]
        for next_box in boxes[1:]:
            dist = next_box[0] - cur[2]
            if dist < 100: # Close horizontally
                cur[0] = min(cur[0], next_box[0])
                cur[1] = min(cur[1], next_box[1])
                cur[2] = max(cur[2], next_box[2])
                cur[3] = max(cur[3], next_box[3])
            else:
                merged.append(cur)
                cur = next_box
        merged.append(cur)
        
    print(f"Row {row_idx}: Found {len(merged)} icons (Expected {num_icons})")
    
    # Process and save
    os.makedirs(r"D:\Antigravity\Kabu\illust\icons", exist_ok=True)
    for i, box in enumerate(merged[:num_icons]):
        name = names[i]
        icon_img = strip.crop((box[0]-10, box[1]-10, box[2]+10, box[3]+10))
        
        final = Image.new("RGBA", (200, 200), (255, 255, 255, 0))
        icon_img.thumbnail((180, 180), Image.LANCZOS)
        px, py = (200 - icon_img.width)//2, (200 - icon_img.height)//2
        final.paste(icon_img, (px, py), icon_img if icon_img.mode == 'RGBA' else None)
        final.save(os.path.join(r"D:\Antigravity\Kabu\illust\icons", f"{name}.png"))
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
