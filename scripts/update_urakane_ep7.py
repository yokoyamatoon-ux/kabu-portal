import json
import os

path = r'd:\Antigravity\Kabu\data\money_secrets.json'

with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_entry = {
    "ep": 7,
    "title": "海外タックス・ヘイブンの幻想 〜億り人を目指した末路〜",
    "summary": "日本は税金が高いから海外へ？ その考え、税務署にはすべてお見通しじゃ！",
    "image_path": "/images/money_secret/urakane20260421_01.png",
    "thumbnail": "/images/money_secret/urakane20260421_01.png",
    "manga_pages": [
        "/images/money_secret/urakane20260421_01.png",
        "/images/money_secret/urakane20260421_02.png"
    ],
    "chat_html": """<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{HAKASE_ICON}}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>待てい！！ それは『自由への入り口』ではなく、『破滅への一方通行』じゃ！
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{{MANETA_ICON}}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>ひえっ！？ カブ先生！ せっかく『タックス・ヘイブン』で税金をゼロにする夢を見てたのに！
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{URAKANE_ICON}}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。相変わらずお固いねぇ、先生。海を越えちまえば、日本の税務署なんてただの紙クズ同然だろう？
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{HAKASE_ICON}}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>いつの時代の話をしておるんじゃ！ 今は『CRS（共通報告基準）』という恐ろしいネットワークがある。世界100以上の国と地域が協力して、外国にある口座情報を自動で交換しておるんじゃ！
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{{MIRAI_ICON}}</div>
<div class="ura-bubble ura-bubble-user">
<b>ヒカリ：</b><br>自動で交換……。つまり、私たちがパナマやケイマン諸島に口座を作っても、すぐに日本にバレちゃうってこと？
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{HAKASE_ICON}}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>その通り。さらに、銀行を通じて100万円を超える海外送金をすれば、その記録はすべて税務署に『国外送金調書』として報告される。隠すことなど不可能じゃ！
</div>
</div>
<div style="border: 2px solid #D63031; background: #FFF5F5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #D63031; font-weight: 800;">
{{WARNING_ICON}} 脱税の代償は「数倍」になって返ってくる
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">🌐 CRSの網</div>
<div style="font-size: 0.85rem;">海外口座の残高や利息、配当の情報は、各国の税務署間で自動的に筒抜けになる仕組み。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">💸 重加算税の地獄</div>
<div style="font-size: 0.85rem;">意図的な隠蔽とされれば、最大40%の重加算税に加え、恐ろしい延滞税が課される。本来の利益が吹き飛ぶぞ。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">🚔 刑事罰の可能性</div>
<div style="font-size: 0.85rem;">悪質な脱税は実刑判決の対象。犯罪者として名前が一生残ることになる。</div>
</div>
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{URAKANE_ICON}}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。バレなきゃ勝ちだと思ったんだがな。最近の当局のAI監視はマジで容赦ねぇ。坊主、悪いことは言わねぇ、正しく払って『綺麗な金』を増やすのが一番の長生きの秘訣だぜ。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{{HAKASE_ICON}}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>その通りじゃ。正しく納税し、法に則ってメリットを享受するのが真の投資家というもの。海外移住するなら、ルールの範囲内で正しく行いなさい！
</div>
</div>"""
}

data.insert(0, new_entry)

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Update successful")
