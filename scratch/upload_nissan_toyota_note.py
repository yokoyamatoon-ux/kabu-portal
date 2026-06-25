import asyncio
import sys
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")
from note_mcp.server import note_create_from_file

async def main():
    print("Uploading note draft for Nissan vs Toyota...")
    res = await note_create_from_file.fn(
        file_path=r"D:\Antigravity\Kabu\scratch\note_nissan_toyota.md",
        upload_images=True
    )
    print("Upload Result:")
    print(res)

if __name__ == '__main__':
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    asyncio.run(main())
