import ftplib

# FTP Credentials
FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"
BACKUP_DIR = "backup_vite_old"

def backup():
    print("--- Connecting to FTP for Backup ---")
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            print("Login successful.")

            # Create backup directory if it doesn't exist
            try:
                ftp.mkd(BACKUP_DIR)
                print(f"Created backup directory: {BACKUP_DIR}")
            except ftplib.error_perm:
                print(f"Backup directory {BACKUP_DIR} already exists.")

            # List files to move
            files_to_move = ftp.nlst()
            print(f"Files to move: {files_to_move}")

            for item in files_to_move:
                if item in [".", "..", BACKUP_DIR]:
                    continue
                
                print(f"  Moving {item} to {BACKUP_DIR}/{item}")
                try:
                    ftp.rename(item, f"{BACKUP_DIR}/{item}")
                except Exception as e:
                    print(f"  Error moving {item}: {e}")

            print("--- Backup Complete! ---")
            
    except Exception as e:
        print(f"FTP Error: {e}")

if __name__ == "__main__":
    backup()
