from PIL import Image
import os

def compress_to_jpg(path, target_width=1280, quality=70):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    
    img = Image.open(path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    original_size = os.path.getsize(path) / 1024
    
    # Resize while maintaining aspect ratio
    w_percent = (target_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
    
    new_path = path.replace(".png", ".jpg")
    img.save(new_path, "JPEG", optimize=True, quality=quality)
    
    new_size = os.path.getsize(new_path) / 1024
    print(f"Compressed {os.path.basename(path)} to JPG: {original_size:.1f}KB -> {new_size:.1f}KB")
    
    # Remove old PNG if conversion was successful
    if os.path.exists(new_path) and new_size < original_size:
        os.remove(path)
        print(f"Removed original {os.path.basename(path)}")

if __name__ == "__main__":
    banner_dir = "image"
    banners = ["Top.png", "Top02.png", "Top03.png"]
    for b in banners:
        compress_to_jpg(os.path.join(banner_dir, b))
