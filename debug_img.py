from PIL import Image
try:
    img = Image.open(r"D:\Antigravity\Kabu\illust\icon.png")
    print(f"SIZE:{img.size[0]},{img.size[1]}")
except Exception as e:
    print(f"ERROR:{e}")
