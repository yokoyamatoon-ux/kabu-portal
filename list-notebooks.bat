@echo off
set PYTHONIOENCODING=utf-8
set PYTHONUTF8=1
"C:\Users\nanda\AppData\Local\Programs\Python\Python311\Scripts\uv.exe" run --with notebooklm-mcp --with beautifulsoup4 python "d:\Antigravity\Kabu\scripts\list_notebooks.py" %*
