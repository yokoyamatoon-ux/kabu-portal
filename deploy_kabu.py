import os
import ftplib
import subprocess

# FTP Credentials
FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"
LOCAL_DIST_DIR = os.path.join("web", "dist")

def build_project():
    print("--- Building the project ---")
    try:
        # Run npm run build in the web directory
        subprocess.run(["npm", "run", "build"], cwd="web", check=True, shell=True)
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
