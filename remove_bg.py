import os
from PIL import Image

def remove_background(directory, threshold=240):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    for filename in os.listdir(directory):
        if filename.lower().endswith('.png'):
            filepath = os.path.join(directory, filename)
            try:
                img = Image.open(filepath).convert("RGBA")
                datas = img.getdata()

                new_data = []
                for item in datas:
                    # R, G, B are all above threshold? -> make transparent
                    if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
                        new_data.append((255, 255, 255, 0))
                    else:
                        new_data.append(item)

                img.putdata(new_data)
                img.save(filepath, "PNG")
                print(f"Processed: {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    ICON_DIR = r"D:\Antigravity\Kabu\illust\icons"
    IMAGE_DIR = r"D:\Antigravity\Kabu\image"
    
    print("Processing Icons...")
    remove_background(ICON_DIR)
    
    print("\nProcessing Characters...")
    remove_background(IMAGE_DIR)
