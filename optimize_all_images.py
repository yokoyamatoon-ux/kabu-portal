from PIL import Image
import os
import re

def optimize_images(directory, target_width=1000, quality=70):
    to_convert = [
        "kabuka_J.png", "meigara.png", "kaigai.png", "NISA.png",
        "manga.png", "Quiz.png", "sagasu.png", "Ura.png",
        "hajimete.png", "banner01.png", "Top.png", "Top02.png", "Top03.png"
    ]
    
    for filename in os.listdir(directory):
        if not filename.endswith(".png"):
            continue
            
        path = os.path.join(directory, filename)
        size_kb = os.path.getsize(path) / 1024
        
        # If it's a known heavy image or larger than 1MB, convert to JPG
        if filename in to_convert or size_kb > 1000:
            try:
                img = Image.open(path)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize if wider than target
                if img.size[0] > target_width:
                    w_percent = (target_width / float(img.size[0]))
                    h_size = int((float(img.size[1]) * float(w_percent)))
                    img = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
                
                new_filename = filename.replace(".png", ".jpg")
                new_path = os.path.join(directory, new_filename)
                
                img.save(new_path, "JPEG", optimize=True, quality=quality)
                new_size_kb = os.path.getsize(new_path) / 1024
                
                print(f"Converted {filename}: {size_kb:.1f}KB -> {new_size_kb:.1f}KB")
                if new_size_kb < size_kb:
                    os.remove(path)
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images("image")
    optimize_images("manga")
