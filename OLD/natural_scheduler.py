import time
import random
import subprocess
import sys
from datetime import datetime, timedelta

def run_with_jitter(command, target_hour, target_minute, jitter_minutes=15):
    """
    指定した時刻に不規則な遅延（ジッター）を加えてコマンドを実行する
    """
    now = datetime.now()
    target_time = now.replace(hour=target_hour, minute=target_minute, second=0, microsecond=0)
    
    # ターゲット時刻がすでに過ぎている場合は翌日に設定
    if target_time < now:
        target_time += timedelta(days=1)
    
    # -jitter_minutes から +jitter_minutes の範囲でランダムな秒数を加算
    jitter_seconds = random.randint(-jitter_minutes * 60, jitter_minutes * 60)
    scheduled_time = target_time + timedelta(seconds=jitter_seconds)
    
    # もし計算後の時間が現在時刻より前になってしまった場合は、現在時刻から1分後に設定
    if scheduled_time < datetime.now():
        scheduled_time = datetime.now() + timedelta(minutes=1)

    wait_seconds = (scheduled_time - datetime.now()).total_seconds()
    
    print(f"--- 自然なスケジューラ起動 ---")
    print(f"ターゲット時刻: {target_time.strftime('%H:%M')}")
    print(f"ランダム遅延　: {jitter_seconds // 60}分 {jitter_seconds % 60}秒")
    print(f"実行予定時刻　: {scheduled_time.strftime('%H:%M:%S')}")
    print(f"待機時間　　　: {int(wait_seconds // 60)}分後")
    print(f"--------------------------")

    if wait_seconds > 0:
        time.sleep(wait_seconds)
    
    print(f"[{datetime.now().strftime('%H:%M:%S')}] コマンドを実行します: {' '.join(command)}")
    try:
        result = subprocess.run(command, check=True, text=True, capture_output=True)
        print("実行成功:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"実行失敗: {e}")
        print(e.stderr)

if __name__ == "__main__":
    # 使用例: python natural_scheduler.py 19 30 python post_to_x_kabu.py
    if len(sys.argv) < 4:
        print("使用法: python natural_scheduler.py <時> <分> <実行コマンド...>")
        sys.exit(1)
        
    h = int(sys.argv[1])
    m = int(sys.argv[2])
    cmd = sys.argv[3:]
    
    run_with_jitter(cmd, h, m)
