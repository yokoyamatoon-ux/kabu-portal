import os
import ftplib

# FTP Credentials
FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"

def main():
    print("--- Connecting to FTP ---")
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            print("Login successful.")
            
            print("--- Listing files in root ---")
            files = ftp.nlst()
            for f in files:
                print(f"  {f}")
            
    except Exception as e:
        print(f"FTP Error: {e}")

if __name__ == "__main__":
    main()
