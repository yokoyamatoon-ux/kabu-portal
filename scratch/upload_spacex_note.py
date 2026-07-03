import asyncio
import sys
import os

# Append note-mcp package path
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")

# Configure stdout to use UTF-8 to prevent Japanese/emoji crash on Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from note_mcp.server import note_create_from_file

async def main():
    print("Uploading note draft...")
    # Check if decorated with FastMCP FunctionTool and access .fn
    func = note_create_from_file
    if hasattr(note_create_from_file, 'fn'):
        func = note_create_from_file.fn
    elif hasattr(note_create_from_file, '_fn'):
        func = note_create_from_file._fn
        
    res = await func(
        file_path=r"D:\Antigravity\Kabu\scratch\note_spacex_short_sell.md",
        upload_images=True
    )
    print("Upload Result:")
    print(res)

if __name__ == '__main__':
    asyncio.run(main())
