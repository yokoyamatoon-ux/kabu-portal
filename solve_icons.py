import os
from PIL import Image, ImageOps

def get_bboxes(img, thresh=10):
    # Map of visited pixels
    w, h = img.size
    gray = img.convert("L")
    inv = ImageOps.invert(gray)
    binary = inv.point(lambda p: 255 if p > thresh else 0)
    data = binary.load()
    
    visited = [[False for _ in range(h)] for _ in range(w)]
    bboxes = []
    
    for y in range(h):
        for x in range(w):
            if data[x, y] == 255 and not visited[x][y]:
                # New component
                min_x, min_y, max_x, max_y = x, y, x, y
                stack = [(x, y)]
                visited[x][y] = True
                
                while stack:
                    cx, cy = stack.pop()
                    min_x, min_y = min(min_x, cx), min(min_y, cy)
                    max_x, max_y = max(max_x, cx), max(max_y, cy)
                    
                    # 8-connectivity for better merging of close parts
                    for dx in [-1,0,1]:
                        for dy in [-1,0,1]:
                            nx, ny = cx + dx, cy + dy
                            if 0 <= nx < w and 0 <= ny < h:
                                if data[nx, ny] == 255 and not visited[nx][ny]:
                                    visited[nx][ny] = True
                                    stack.append((nx, ny))
                
                # Filter noise
                if (max_x - min_x) > 50 and (max_y - min_y) > 50:
                    bboxes.append([min_x, min_y, max_x, max_y])
    return bboxes

def merge_nearby(bboxes, gap=60):
    merged = True
    while merged:
        merged = False
        new_list = []
        skip = set()
        for i in range(len(bboxes)):
            if i in skip: continue
            cur = bboxes[i]
            for j in range(i + 1, len(bboxes)):
                if j in skip: continue
                other = bboxes[j]
                
                # Check distance
                dx = max(0, other[0] - cur[2], cur[0] - other[2])
                dy = max(0, other[1] - cur[3], cur[1] - other[3])
                
                if dx < gap and dy < gap:
                    cur[0] = min(cur[0], other[0])
                    cur[1] = min(cur[1], other[1])
                    cur[2] = max(cur[2], other[2])
                    cur[3] = max(cur[3], other[3])
                    skip.add(j)
                    merged = True
            new_list.append(cur)
        bboxes = new_list
    return bboxes

def solve_icons(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path).convert("RGBA")
    raw_boxes = get_bboxes(img)
    print(f"Initial islands: {len(raw_boxes)}")
    
    # Merge parts of the same icon (e.g. coins next to bill)
    final_boxes = merge_nearby(raw_boxes, gap=150)
    print(f"Final merged icons: {len(final_boxes)}")
    
    # Sort by Y then X
    # Group by rows (~3 items high)
    h_per_row = img.size[1] // 3
    final_boxes.sort(key=lambda b: (b[1] // h_per_row, b[0]))
    
    icon_names = [
        "yen_1000", "dollar_100", "cash_stack", "bank_book", "bank_building", "stock_company",
        "piggy_bank", "wallet", "chart_up_yen", "chart_up_dollar", "warning", "rocket_up_1", "rocket_up_2", "chart_down",
        "stock_certificate", "global_market", "trading_laptop", "money_bag_pct", "handshake", "atm", "safe_vault", "gold_bars"
    ]
    
    for i, box in enumerate(final_boxes):
        name = icon_names[i] if i < len(icon_names) else f"icon_extra_{i}"
        
        # Add 20px padding around detection if possible
        box = (max(0, box[0]-20), max(0, box[1]-20), min(img.size[0], box[2]+20), min(img.size[1], box[3]+20))
        crop = img.crop(box)
        
        # Create 200x200 canvas
        canvas = Image.new("RGBA", (200, 200), (255, 255, 255, 0))
        crop.thumbnail((180, 180), Image.LANCZOS)
        
        px = (200 - crop.width) // 2
        py = (200 - crop.height) // 2
        canvas.paste(crop, (px, py), crop if crop.mode == 'RGBA' else None)
        
        canvas.save(os.path.join(output_dir, f"{name}.png"))
        print(f"Saved: {name}.png at {box}")

if __name__ == "__main__":
    solve_icons(r"D:\Antigravity\Kabu\illust\icon.png", r"D:\Antigravity\Kabu\illust\icons")
