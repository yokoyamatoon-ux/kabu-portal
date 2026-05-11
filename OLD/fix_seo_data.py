"""Fix col_013 FAQ and ensure all columns have SEO fields based on instructions"""
import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "columns.json")

def main():
    if not os.path.exists(DATA_PATH):
        print(f"File not found: {DATA_PATH}")
        return

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # col_013 specific fix
    col_013_faq = [
        {
            "q": "S&P500とオルカン、どちらがリターンが高いですか？",
            "a": "過去の実績ではS&P500の方がリターンが高い傾向にあります。ただし将来の結果を保証するものではありません。"
        },
        {
            "q": "オルカンにアメリカ株は含まれていますか？",
            "a": "含まれています。現在のオルカン（全世界株式）の構成比率の約6割はアメリカ株です。"
        },
        {
            "q": "NISAでS&P500やオルカンはどこで買えますか？",
            "a": "楽天証券・松井証券などのネット証券でNISA口座を開設することで購入できます。"
        }
    ]

    for item in data:
        # col_013 fix
        if item["id"] == "col_013":
            item["faq"] = col_013_faq
            print("Updated col_013 FAQ")
        
        # Ensure other fields exist
        if "definition" not in item:
            item["definition"] = f"{item['title']}に関する解説記事です。最新の情報を踏まえてカブ先生がわかりやすく解説します。"
        if "faq" not in item or not item["faq"]:
            item["faq"] = [
                {"q": f"{item['title']}について、初心者が気をつけるべきことは？", "a": "まずは少額から始め、リスクを理解することが大切です。"},
                {"q": "どこで投資できますか？", "a": "楽天証券やSBI証券などのネット証券が手数料も安くおすすめです。"},
                {"q": "将来性はありますか？", "a": "市場の動向によりますが、長期的な視点を持つことが成功の鍵となります。"}
            ]
        if "sources" not in item:
            item["sources"] = []
        if "related_links" not in item:
            item["related_links"] = []

    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    print("Successfully updated columns.json with corrected SEO fields.")

if __name__ == "__main__":
    main()
