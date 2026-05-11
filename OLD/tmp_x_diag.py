"""X API 403 診断スクリプト"""
import os
import time
from requests_oauthlib import OAuth1Session

ck = os.getenv("KABU_X_CONSUMER_KEY")
cs = os.getenv("KABU_X_CONSUMER_SECRET")
at = os.getenv("KABU_X_ACCESS_TOKEN")
ats = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

print("=== 環境変数チェック ===")
print(f"CONSUMER_KEY    : {ck[:6]}...{ck[-4:] if ck else 'NG'}")
print(f"CONSUMER_SECRET : {'OK' if cs else 'NG'}")
print(f"ACCESS_TOKEN    : {at[:6]}...{at[-4:] if at else 'NG'}")
print(f"ACCESS_SECRET   : {'OK' if ats else 'NG'}")

oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

print("\n=== 1. 自分のアカウント情報取得（読み取りテスト） ===")
r = oauth.get("https://api.twitter.com/2/users/me")
print(f"Status: {r.status_code}")
print(r.text[:300])

print("\n=== 2. アプリの権限確認（v1.1） ===")
r2 = oauth.get("https://api.twitter.com/1.1/account/verify_credentials.json")
print(f"Status: {r2.status_code}")
import json
try:
    d = r2.json()
    print(f"Name: {d.get('name')}")
    print(f"Protected: {d.get('protected')}")
    print(f"Verified: {d.get('verified')}")
except:
    print(r2.text[:300])

print("\n=== 3. 最短の投稿テスト（1文字）===")
test_text = f"テスト {int(time.time())}"
r3 = oauth.post("https://api.twitter.com/2/tweets", json={"text": test_text})
print(f"Status: {r3.status_code}")
print(r3.text[:400])
print("Response headers (rate limit):")
for k, v in r3.headers.items():
    if "rate" in k.lower() or "x-app" in k.lower() or "x-user" in k.lower():
        print(f"  {k}: {v}")

# 成功した場合は削除
if r3.status_code == 201:
    tid = r3.json()["data"]["id"]
    dr = oauth.delete(f"https://api.twitter.com/2/tweets/{tid}")
    print(f"テストツイート削除: {dr.status_code}")
