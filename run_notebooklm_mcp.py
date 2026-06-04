import sys
import os
import asyncio
from pathlib import Path

# Redirect stdout to stderr to prevent any stream corruption during initialization
original_stdout = sys.stdout
sys.stdout = sys.stderr

try:
    # Patch regular Selenium fallback to support persistent profiles
    from notebooklm_mcp.client import NotebookLMClient
    
    def patch_start_regular_chrome(self):
        from selenium.webdriver.chrome.options import Options as ChromeOptions
        opts = ChromeOptions()
        
        # Configure persistent profile directory
        profile_path = Path(self.config.auth.profile_dir).absolute()
        profile_path.mkdir(exist_ok=True)
        opts.add_argument(f"--user-data-dir={profile_path}")
        
        # Anti-detection options
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")
        opts.add_argument("--disable-gpu")
        opts.add_argument("--disable-blink-features=AutomationControlled")
        opts.add_experimental_option("excludeSwitches", ["enable-automation"])
        opts.add_experimental_option("useAutomationExtension", False)

        opts.add_argument(
            "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )

        if self.config.headless:
            opts.add_argument("--headless=new")

        from selenium import webdriver
        self.driver = webdriver.Chrome(options=opts)
        self.driver.execute_script(
            "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
        )

    NotebookLMClient._start_regular_chrome = patch_start_regular_chrome
except Exception as e:
    print(f"Failed to apply regular Selenium persistent profile patch: {e}")

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
