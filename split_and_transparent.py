import os
from PIL import Image, ImageDraw

def process_icons():
    source_path = r"d:\Antigravity\Kabu\illust\freepik__text-to-image__89105.png"
    output_dir = r"d:\Antigravity\Kabu\image"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    img = Image.open(source_path).convert("RGBA")
    width, height = img.size
    
    # Coordinates (cx, cy, radius) based on 2752x1536 image
    icons = [
        {"name": "kabuhakase_new.png", "cx": 688,  "cy": 484,  "r": 420},
        {"name": "maneta_new.png",     "cx": 2064, "cy": 484,  "r": 420},
        {"name": "mirai_new.png",      "cx": 688,  "cy": 1052, "r": 420},
        {"name": "urakane_new.png",    "cx": 2064, "cy": 1052, "r": 420},
    ]
    
    for icon in icons:
        name = icon["name"]
        cx = icon["cx"]
        cy = icon["cy"]
        r = icon["r"]
        
        # Crop area (left, top, right, bottom)
        left = cx - r
        top = cy - r
        right = cx + r
        bottom = cy + r
        
        # Crop the square containing the circle
        square = img.crop((left, top, right, bottom))
        
        # Create a circular mask
        mask = Image.new("L", (r*2, r*2), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, r*2, r*2), fill=255)
        
        # Apply mask for transparency
        output = Image.new("RGBA", (r*2, r*2), (0, 0, 0, 0))
        output.paste(square, (0, 0), mask)
        
        # Save output
        output_path = os.path.join(output_dir, name)
        output.save(output_path, "PNG")
        print(f"Saved: {output_path}")

if __name__ == "__main__":
    process_icons()
