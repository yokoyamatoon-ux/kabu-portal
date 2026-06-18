import os
from PIL import Image

def main():
    src1 = r"D:\Antigravity\Kabu\manga\maneta\06\Maneta_06_01.jpg"
    src2 = r"D:\Antigravity\Kabu\manga\maneta\06\Maneta_06_02.jpg"
    dst_dir = r"D:\Antigravity\Kabu\manga\maneta\06"
    dst1 = os.path.join(dst_dir, "maneta20260508_01.png")
    dst2 = os.path.join(dst_dir, "maneta20260508_02.png")
    
    for src, dst in [(src1, dst1), (src2, dst2)]:
        if not os.path.exists(src):
            print(f"[ERROR] Source image not found: {src}")
            continue
        try:
            with Image.open(src) as img:
                img.save(dst, "PNG")
            print(f"[SUCCESS] Successfully converted {src} to PNG and saved at {dst}")
        except Exception as e:
            print(f"[ERROR] Failed to convert {src}: {e}")

if __name__ == "__main__":
    main()
