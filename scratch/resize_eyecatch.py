import sys
from PIL import Image

def process():
    input_path = r'D:\Antigravity\Kabu\image\column\Column20260615.png'
    output_path = r'D:\Antigravity\Kabu\image\column\Column20260615_eyecatch.png'
    
    img = Image.open(input_path)
    print(f"Original size: {img.size}")
    
    # Target size
    target_w, target_h = 1280, 670
    
    # Calculate aspect ratio
    original_w, original_h = img.size
    aspect_original = original_w / original_h
    aspect_target = target_w / target_h
    
    if aspect_original > aspect_target:
        # Original is wider than target
        new_w = target_w
        new_h = int(target_w / aspect_original)
    else:
        # Original is taller than target
        new_h = target_h
        new_w = int(target_h * aspect_original)
        
    # Resize keeping aspect ratio
    resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create white background
    background = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    
    # Paste resized image in center
    offset_x = (target_w - new_w) // 2
    offset_y = (target_h - new_h) // 2
    background.paste(resized_img, (offset_x, offset_y))
    
    background.save(output_path, 'PNG')
    print(f"Resized image saved to: {output_path} (size: {background.size})")

if __name__ == "__main__":
    process()
