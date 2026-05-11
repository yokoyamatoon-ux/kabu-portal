import ftplib

FTP_HOST = "sv2133.xserver.jp"
FTP_USER = "github@okane-no-manabi.jp"
FTP_PASS = "toon2026YM"

def download_file():
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.set_pasv(True)
            
            # Download about/index.html
            with open("downloaded_about_index.html", "wb") as f:
                ftp.retrbinary("RETR about/index.html", f.write)
            print("Download successful.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    download_file()
