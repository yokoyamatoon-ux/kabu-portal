from flask import Flask, render_template, jsonify, request
import os
import json
import datetime
import shutil
import subprocess
import webbrowser
from threading import Timer

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
app = Flask(__name__, template_folder=os.path.join(project_root, 'templates'))

# 設定
DATA_DIR = 'data'
BACKUP_DIR = os.path.join(DATA_DIR, 'backup')
CONTENT_FILES = {
    'column': 'columns.json',
    'manga': 'manga.json',
    'money_secret': 'money_secrets.json',
    'diary': 'maneta_diary.json'
}

@app.route('/')
def index():
    return render_template('admin.html')

@app.route('/api/content', methods=['GET'])
def get_content():
    data = {}
    try:
        for key, filename in CONTENT_FILES.items():
            path = os.path.join(DATA_DIR, filename)
            if os.path.exists(path):
                with open(path, 'r', encoding='utf-8') as f:
                    data[key] = json.load(f)
            else:
                data[key] = []
        return jsonify(data)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/content/<content_type>', methods=['POST'])
def save_content(content_type):
    if content_type not in CONTENT_FILES:
        return jsonify({"status": "error", "message": "Invalid content type"}), 400
    
    try:
        new_data = request.json
        filename = CONTENT_FILES[content_type]
        file_path = os.path.join(DATA_DIR, filename)
        
        # バックアップ作成
        if not os.path.exists(BACKUP_DIR):
            os.makedirs(BACKUP_DIR)
        
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = os.path.join(BACKUP_DIR, f"{filename}.{timestamp}.bak")
        shutil.copy(file_path, backup_path)
        
        # 上書き保存
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, ensure_ascii=False, indent=4)
            
        return jsonify({"status": "success", "backup": backup_path})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/deploy', methods=['POST'])
def deploy():
    try:
        # デプロイスクリプトを実行
        process = subprocess.run(['python', 'scripts/deploy_kabu.py'], capture_output=True, text=True, encoding='utf-8')
        
        if process.returncode == 0:
            return jsonify({"status": "success", "output": process.stdout})
        else:
            return jsonify({"status": "error", "message": "Deployment failed", "output": process.stdout, "error": process.stderr}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/health')


def health():
    return jsonify({"status": "ok", "message": "Kabu Admin Server is running"})

def open_browser():
    webbrowser.open_new('http://127.0.0.1:5000/')

if __name__ == '__main__':
    # サーバー起動1秒後にブラウザを開く
    Timer(1, open_browser).start()
    # 外部からアクセスできないよう127.0.0.1で起動
    app.run(host='127.0.0.1', port=5000, debug=False)
