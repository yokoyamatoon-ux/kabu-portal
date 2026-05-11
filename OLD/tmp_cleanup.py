import os, json
from requests_oauthlib import OAuth1Session

ck = os.getenv("KABU_X_CONSUMER_KEY")
cs = os.getenv("KABU_X_CONSUMER_SECRET")
at = os.getenv("KABU_X_ACCESS_TOKEN")
ats = os.getenv("KABU_X_ACCESS_TOKEN_SECRET")

oauth = OAuth1Session(ck, client_secret=cs, resource_owner_key=at, resource_owner_secret=ats)

user_id = "2041332178471071744"
r = oauth.get(f"https://api.twitter.com/2/users/{user_id}/tweets", params={"max_results": 5})
data = r.json()
for t in data.get("data", []):
    print(f"  ID: {t['id']}  | {t['text'][:60]}")

# テスト投稿を削除
for t in data.get("data", []):
    if t["text"].startswith("test_"):
        dr = oauth.delete(f"https://api.twitter.com/2/tweets/{t['id']}")
        print(f"  Deleted test tweet {t['id']}: {dr.status_code}")
