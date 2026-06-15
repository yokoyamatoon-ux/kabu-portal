import sys
from PIL import Image

def process():
    jpeg_path = r'D:\Antigravity\Kabu\manga\column\Column20260615.jpeg'
    png_path = r'D:\Antigravity\Kabu\image\column\Column20260615.png'
    public_png_path = r'D:\Antigravity\Kabu\web-next\public\images\column\Column20260615.png'
    eyecatch_path = r'D:\Antigravity\Kabu\image\column\Column20260615_eyecatch.png'
    
    # Open JPEG
    img = Image.open(jpeg_path)
    print(f"Original JPEG size: {img.size}")
    
    # Save as PNG
    img.save(png_path, 'PNG')
    img.save(public_png_path, 'PNG')
    print("Successfully converted and saved PNG versions.")
    
    # Create resized eyecatch (1280:670)
    target_w, target_h = 1280, 670
    original_w, original_h = img.size
    aspect_original = original_w / original_h
    aspect_target = target_w / target_h
    
    if aspect_original > aspect_target:
        new_w = target_w
        new_h = int(target_w / aspect_original)
    else:
        new_h = target_h
        new_w = int(target_h * aspect_original)
        
    resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create white background
    background = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    offset_x = (target_w - new_w) // 2
    offset_y = (target_h - new_h) // 2
    background.paste(resized_img, (offset_x, offset_y))
    
    background.save(eyecatch_path, 'PNG')
    print(f"Successfully created 1280:670 eyecatch at: {eyecatch_path}")

if __name__ == '__main__':
    process()
