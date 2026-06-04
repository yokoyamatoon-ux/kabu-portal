import asyncio
import os
import re
import sys
from pathlib import Path
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Import from notebooklm_mcp package
from notebooklm_mcp.client import NotebookLMClient
from notebooklm_mcp.config import load_config

# Patch regular Selenium fallback to support persistent profiles
def patch_start_regular_chrome(self):
    from selenium.webdriver.chrome.options import Options as ChromeOptions
    opts = ChromeOptions()
    
    profile_path = Path(self.config.auth.profile_dir).absolute()
    profile_path.mkdir(exist_ok=True)
    opts.add_argument(f"--user-data-dir={profile_path}")
    
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

async def main():
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except AttributeError:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    config_path = "d:\\Antigravity\\Kabu\\notebooklm-config.json"
    config = load_config(config_path if os.path.exists(config_path) else None)
    
    # Run in headless mode for fast execution
    config.headless = True
    
    client = NotebookLMClient(config)
    print("Starting headless browser...")
    await client.start()
    
    try:
        print("Checking session authentication...")
        auth_success = await client.authenticate()
        if not auth_success:
            print("Error: Session not authenticated. Please run GUI script to login first.")
            return
            
        print("Fetching notebooks...")
        client.driver.get("https://notebooklm.google.com/")
        await asyncio.sleep(8)
        
        # Parse the page source using BeautifulSoup
        from bs4 import BeautifulSoup
        html = client.driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        
        links = soup.find_all("a", href=True)
        notebooks = []
        
        for link in links:
            href = link["href"]
            if "/notebook/" in href:
                match = re.search(r"/notebook/([a-f0-9-]{36})", href)
                if match:
                    notebook_id = match.group(1)
                    
                    # Try to find title element by ID
                    title_id = f"project-{notebook_id}-title"
                    title_elem = soup.find(id=title_id)
                    
                    title = ""
                    if title_elem:
                        title = title_elem.get_text().strip()
                    
                    if not title:
                        found_elems = soup.find_all(id=re.compile(f"project-{notebook_id}-title"))
                        if found_elems:
                            title = found_elems[0].get_text().strip()
                            
                    if not title:
                        parent = link.parent
                        if parent:
                            title = parent.get_text().strip()
                            
                    notebooks.append((notebook_id, title or "Untitled Notebook"))
                    
        # Remove duplicates
        seen = set()
        unique_notebooks = []
        for nid, title in notebooks:
            if nid not in seen:
                seen.add(nid)
                unique_notebooks.append((nid, title))
                
        if unique_notebooks:
            print("\nFound Notebooks:")
            print("="*80)
            for nid, title in unique_notebooks:
                print(f"ID: {nid} | Title: {title}")
            print("="*80)
        else:
            print("\nNo notebooks found on page.")
            print(f"Current URL: {client.driver.current_url}")
            
    finally:
        print("Closing browser...")
        await client.close()

if __name__ == "__main__":
    asyncio.run(main())
