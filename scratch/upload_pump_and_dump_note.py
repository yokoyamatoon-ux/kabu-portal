import asyncio
import sys
import os

# note-mcpライブラリへのパスを追加
sys.path.append(r"C:\Users\nanda\Desktop\note-mcp\src")
try:
    from note_mcp.server import note_create_from_file
except ImportError:
    print("❌ エラー: note_mcp モジュールをインポートできませんでした。")
    sys.exit(1)

async def main():
    print("Uploading note draft for investor psychology and SNS stock scams...")
    note_path = r"D:\Antigravity\Kabu\scratch\note_pump_and_dump_psychology.md"
    
    if not os.path.exists(note_path):
        print(f"❌ 原稿ファイルが見つかりません: {note_path}")
        return

    # note_create_from_file を非同期で呼び出し
    res = await note_create_from_file(
        file_path=note_path,
        upload_images=True
    )
    print("Upload Result:")
    print(res)

if __name__ == '__main__':
    # Windows CP932 コンソールでの文字化け対策
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
            
    asyncio.run(main())
