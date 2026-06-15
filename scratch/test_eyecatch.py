import asyncio
import sys
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")
from note_mcp.api.client import NoteAPIClient
from note_mcp.server import _session_manager
from pathlib import Path

async def test():
    session = _session_manager.load()
    path = Path(r'D:\Antigravity\Kabu\image\column\Column20260615_eyecatch.png')
    file_content = path.read_bytes()
    files = {'file': (path.name, file_content, 'image/png')}
    data = {'note_id': '165312736'}
    async with NoteAPIClient(session) as client:
        try:
            response = await client.post('/v1/image_upload/note_eyecatch', files=files, data=data)
            print("Response:", response)
        except Exception as e:
            print("Error:", e)

asyncio.run(test())
