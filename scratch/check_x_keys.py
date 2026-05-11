import os
import sys

def get_env_robust(key):
    val = os.getenv(key)
    if val: return "FOUND (env)"
    if sys.platform == "win32":
        import subprocess
        try:
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "User")'
            res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
            if res.stdout.strip(): return "FOUND (User)"
            cmd = f'[System.Environment]::GetEnvironmentVariable("{key}", "Machine")'
            res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
            if res.stdout.strip(): return "FOUND (Machine)"
        except: pass
    return "NOT FOUND"

keys = ["KABU_X_CONSUMER_KEY", "KABU_X_CONSUMER_SECRET", "KABU_X_ACCESS_TOKEN", "KABU_X_ACCESS_TOKEN_SECRET"]
for k in keys:
    print(f"{k}: {get_env_robust(k)}")
