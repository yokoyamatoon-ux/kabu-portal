import os
import ftplib
import subprocess
import shutil

# FTP Credentials
FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"
LOCAL_DIST_DIR = os.path.join("web-next", "out")

def sync_assets():
    print("--- Synchronizing assets and data ---")
    
    # 1. Sync Data Files (Root data/ -> web-next/src/data/)
    src_data_dir = "data"
    dst_data_dir = os.path.join("web-next", "src", "data")
    if os.path.exists(src_data_dir):
        os.makedirs(dst_data_dir, exist_ok=True)
        for item in os.listdir(src_data_dir):
            if item.endswith(".json"):
                shutil.copy2(os.path.join(src_data_dir, item), os.path.join(dst_data_dir, item))
        print(f"Synced JSON data from {src_data_dir}")

    # 2. Sync Images
    # Column
    shutil.copytree(os.path.join("image", "column"), os.path.join("web-next", "public", "images", "column"), dirs_exist_ok=True)
    
    # Manga (General)
    # Root manga/ files (legacy) and image/manga/ (new)
    dst_manga = os.path.join("web-next", "public", "images")
    for src in ["manga", os.path.join("image", "manga")]:
        if os.path.exists(src):
            for item in os.listdir(src):
                if item.lower().endswith(('.png', '.jpg', '.jpeg')) and not os.path.isdir(os.path.join(src, item)):
                    shutil.copy2(os.path.join(src, item), os.path.join(dst_manga, item))

    # Money Secret (Urakane)
    src_urakane = os.path.join("image", "manga", "urakane")
    if not os.path.exists(src_urakane):
        src_urakane = os.path.join("manga", "urakane") # Fallback
    shutil.copytree(src_urakane, os.path.join("web-next", "public", "images", "money_secret"), dirs_exist_ok=True)

    # Maneta
    src_maneta = os.path.join("image", "manga", "maneta")
    if not os.path.exists(src_maneta):
        src_maneta = os.path.join("manga", "maneta")
    shutil.copytree(src_maneta, os.path.join("web-next", "public", "images", "maneta"), dirs_exist_ok=True)

    # Manabu (マンガで学ぶ)
    src_manabu = os.path.join("image", "manga", "manabu")
    if not os.path.exists(src_manabu):
        src_manabu = os.path.join("manga", "manabu")
    if os.path.exists(src_manabu):
        dst_manabu = os.path.join("web-next", "public", "manga", "manabu")
        os.makedirs(dst_manabu, exist_ok=True)
        shutil.copytree(src_manabu, dst_manabu, dirs_exist_ok=True)

    # Common images (Top level image/ files)
    src_img_root = "image"
    dst_img_root = os.path.join("web-next", "public", "images")
    for item in os.listdir(src_img_root):
        if item.lower().endswith(('.png', '.jpg', '.jpeg', '.ico')) and not os.path.isdir(os.path.join(src_img_root, item)):
            shutil.copy2(os.path.join(src_img_root, item), os.path.join(dst_img_root, item))

    print("Assets synchronization complete.")


def build_project():
    print("--- Building the project (Next.js) ---")
    try:
        # Run npm run build in the web-next directory
        # Next.js export defined in next.config.mjs makes it 'out'
        subprocess.run(["npm", "run", "build"], cwd="web-next", check=True, shell=True)
        print("Build successful.")
    except subprocess.CalledProcessError as e:
        print(f"Build failed: {e}")
        return False
    return True

def upload_directory(ftp, local_path, remote_path):
    print(f"Uploading {local_path} to {remote_path}")
    
    for item in os.listdir(local_path):
        l_path = os.path.join(local_path, item)
        r_path = remote_path + "/" + item if remote_path != "." else item
        
        if os.path.isfile(l_path):
            print(f"  Uploading file: {item}")
            with open(l_path, "rb") as f:
                ftp.storbinary(f"STOR {r_path}", f)
        elif os.path.isdir(l_path):
            print(f"  Creating directory: {item}")
            try:
                ftp.mkd(r_path)
            except ftplib.error_perm:
                # Directory already exists
                pass
            upload_directory(ftp, l_path, r_path)

def main():
    sync_assets()
    
    print("--- Fetching latest market data ---")
    try:
        subprocess.run(["python", "scripts/fetch_market_data.py"], check=True)
        # Re-sync data just in case to ensure the latest market.json is copied to web-next/src/data/
        # Instead of calling sync_assets again, we can just copy market.json directly
        src_market = os.path.join("data", "market.json")
        dst_market = os.path.join("web-next", "src", "data", "market.json")
        if os.path.exists(src_market):
            shutil.copy2(src_market, dst_market)
            # Also copy to public directory for runtime fetching
            dst_public = os.path.join("web-next", "public", "data", "market.json")
            os.makedirs(os.path.dirname(dst_public), exist_ok=True)
            shutil.copy2(src_market, dst_public)
    except Exception as e:
        print(f"Failed to fetch market data: {e}")
        
    if not build_project():
        return

    print("--- Connecting to FTP ---")
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            print("Login successful.")
            
            print("--- Starting Upload ---")
            upload_directory(ftp, LOCAL_DIST_DIR, ".")
            print("--- Upload Complete! ---")
            print("Site updated successfully.")
            
    except Exception as e:
        print(f"FTP Error: {e}")

if __name__ == "__main__":
    main()
