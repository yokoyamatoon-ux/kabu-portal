from PIL import Image
import os

def compress_image(input_path, output_path, max_size_mb=4.5, quality=85):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return False
        
    img = Image.open(input_path)
    
    # SVG/PNG with Alpha should be converted to RGB for JPEG
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
        
    # Standard SNS width
    target_width = 1920
    if img.size[0] > target_width:
        w_percent = (target_width / float(img.size[0]))
        h_size = int((float(img.size[1]) * float(w_percent)))
        img = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
        print(f"Resized to {target_width}px width.")

    # Compress loop
    q = quality
    img.save(output_path, "JPEG", optimize=True, quality=q)
    
    while os.path.getsize(output_path) > max_size_mb * 1024 * 1024 and q > 10:
        q -= 5
        img.save(output_path, "JPEG", optimize=True, quality=q)
        print(f"Retrying with quality={q}...")
        
    final_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Compression complete: {final_size:.2f}MB (Quality: {q})")
    return True

if __name__ == "__main__":
    input_img = r"d:\Antigravity\Kabu\illust\Character.png"
    output_img = r"d:\Antigravity\Kabu\illust\Character_sns.jpg"
    compress_image(input_img, output_img)
