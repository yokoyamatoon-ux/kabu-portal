import os

BASE_DIR = r"d:\Antigravity\Kabu"
IMAGE_DIR = os.path.join(BASE_DIR, "image")
img_name = "/images/column/Column_20260324B.png"
img_path = os.path.join(IMAGE_DIR, "column", img_name)

print(f"IMAGE_DIR: {IMAGE_DIR}")
print(f"img_name: {img_name}")
print(f"img_path: {img_path}")
print(f"Exists: {os.path.exists(img_path)}")

# Try stripping the prefix
clean_name = os.path.basename(img_name)
clean_path = os.path.join(IMAGE_DIR, "column", clean_name)
print(f"clean_path: {clean_path}")
print(f"Exists: {os.path.exists(clean_path)}")
