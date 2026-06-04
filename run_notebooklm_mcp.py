import sys
import os
import asyncio

# Redirect stdout to stderr to prevent any stream corruption during initialization
original_stdout = sys.stdout
sys.stdout = sys.stderr

try:
    from notebooklm_mcp.server import NotebookLMFastMCP
    from notebooklm_mcp.config import load_config

    config_path = "d:\\Antigravity\\Kabu\\notebooklm-config.json"
    
    # Load configuration
    config = load_config(config_path if os.path.exists(config_path) else None)
    
    # Force stdio mode
    config.stdio_mode = True
    
    server = NotebookLMFastMCP(config)
finally:
    # Restore stdout right before starting the server stdio transport
    sys.stdout = original_stdout

async def run():
    await server.start(transport="stdio")

if __name__ == "__main__":
    asyncio.run(run())
