import ftplib

FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"

def list_ftp():
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            print("Current directory:", ftp.pwd())
            print("Contents:")
            ftp.retrlines('LIST')
            
            # Check for common Xserver directories
            try:
                ftp.cwd("public_html")
                print("\nMoved to public_html. Contents:")
                ftp.retrlines('LIST')
            except:
                print("\nNo public_html directory found in current root.")
                
            try:
                ftp.cwd("/okane-no-manabi.jp/public_html")
                print("\nMoved to /okane-no-manabi.jp/public_html. Contents:")
                ftp.retrlines('LIST')
            except:
                print("\nNo /okane-no-manabi.jp/public_html directory found.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_ftp()
