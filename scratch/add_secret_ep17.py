import json
import os

SECRET_EP17_DATA = {
    "ep": 17,
    "title": "「実質無料」AIスクールの甘い罠とリスキリング補助金詐欺",
    "summary": "SNSで話題の「実質無料」や「キャッシュバック」をうたうAIオンラインスクール。その裏で横行するリスキリング補助金不正申請の闇と、受講生が負うべき全額返還と違約金の重い責任、さらにはAI学習の正しい向き合い方をカブ先生が解説するぞ。",
    "tags": [
        "リスク",
        "注意喚起",
        "詐欺",
        "最新情報"
    ],
    "image_path": "/images/money_secret/urakane20260608_01.png",
    "thumbnail": "/images/money_secret/urakane20260608_01.png",
    "manga_pages": [
        "/images/money_secret/urakane20260608_01.png",
        "/images/money_secret/urakane20260608_02.png"
    ],
    "chat_html": (
        "<div style=\"font-size: 0.8rem; color: #666; margin-bottom: 10px;\">※本ページにはプロモーション（広告）が含まれます。</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>ミライちゃん！これ見てよ！AIスクールが「実質無料」で受講できて、さらにお祝い金がもらえるっす！これでボクもAI使いになって大儲けっす！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>ミライ：</b><br>実質無料どころかお金がもらえるなんて怪しすぎるわ。国の補助金を悪用したグレーなビジネスじゃないの？\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-evil\">\n"
        "<b>ウラ金さん：</b><br>ヒッヒッ……儲かれば正義さぁ。国の「リスキリング補助金」を申請して、受講料を国に肩代わりさせ、その一部をキックバックするのさぁ。受講履歴はウチが偽造してあげるから、名前を貸すだけでいいさぁ。自己責任さぁ。\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>（喝！！）コラコラコラ！悪魔の甘い囁きに乗ってはならん！それは国の補助金をだまし取る立派な「給付金詐欺」であり、お主は詐欺の共謀者になってしまうのじゃ！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n"
        "<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n"
        "{{WARNING_ICON}} リスキリング補助金詐欺のカラクリ\n"
        "</div>\n"
        "<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n"
        "<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n"
        "<b>不正受給の手口：</b> 本来はキャリアアップのために受講する「リスキリング支援事業」の補助金（最大70%）を悪用。受講する意思がない人に「キャッシュバック」や「お祝い金」を提示して勧誘し、受講履歴を偽造して国に申請する手口じゃ。\n"
        "</div>\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>ひえええ！ボクまで詐欺の仲間入りなんて嫌っす！でも、本当にそんな不正があるんすか？\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>ミライ：</b><br>ええ、実際に「エッグフォワード」という会社が、約20億円規模の不適切な補助金申請をしていたとして行政処分や刑事告訴の動きがあるニュースが大きく報じられたわ。\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>そうじゃ。さらに、不正受給が発覚した場合、甘い話に乗った受講生個人に対しても極めて重いペナルティが下されるのじゃ！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n"
        "<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n"
        "{{WARNING_ICON}} 不正受給者に下る「3つの重い責任」\n"
        "</div>\n"
        "<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n"
        "<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n"
        "<b>1. 全額の一括返還命令</b><br>国から支給された補助金（受講料の大部分）について、全額を一括返還するよう命令が下るのじゃ。手元に戻ったキックバックの額とは無関係に、申請された全額の返還を求められるため大損害になるぞ。<br><br>\n"
        "<b>2. 違約金（加算金）2割の上乗せ</b><br>返還すべき金額に対して、ペナルティとして20%（2割相当額）の違約金が上乗せされ、さらに延滞金も年利ベースで加算されていくのじゃ。<br><br>\n"
        "<b>3. 詐欺罪としての刑事訴追</b><br>名義貸しや虚偽の受講申請は立派な「詐欺罪」じゃ。「知らなかった」「業者に言われただけ」では済まされず、前科がつくリスクがあるのじゃよ。\n"
        "</div>\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{URAKANE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-evil\">\n"
        "<b>ウラ金さん：</b><br>ゲゲッ……。国税や労働局の調査能力をナメちゃいけないねぇ。バレたら真っ先に会社を計画倒産させて逃げるだけさぁ、自己責任さぁ！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>ひえええ！ウラ金さん、やっぱりトンズラする気満々じゃないっすか！でもカブ先生、真面目にAIを学びたい場合はどうすればいいんすか？\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>うむ。そもそも、技術変化が凄まじいAI分野において、数ヶ月前の古い固定カリキュラムをスクールで学ぶこと自体が「時間の無駄」なのじゃ！\n"
        "</div>\n"
        "</div>\n\n"

        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MIRAI_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>ミライ：</b><br>それに、AIスクールに限らず、少し前に大流行した「WEBデザイン」や「動画編集」の短期スクールでも、同じような低単価地獄に陥る人が急増しているわ。\n"
        "</div>\n"
        "</div>\n\n"

        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>ええっ！？WEBデザイナーや動画編集って、今でも人気の憧れの副業じゃないんすか！？\n"
        "</div>\n"
        "</div>\n\n"

        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>フォッフォッフォ！「3ヶ月で月収50万」といった甘い言葉で集客するスクールが乱立した結果、基礎操作しかできない初心者が市場に溢れかえっておるのじゃ。クラウドソーシングを主たる仕事獲得経路にするフリーランスのうち、なんと約46%が「年収100万円未満」という調査結果もあるほどじゃぞ。\n"
        "</div>\n"
        "</div>\n\n"

        "<div style=\"background: #FFF5F5; border: 2px solid #D63031; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n"
        "<div style=\"font-weight: 800; color: #D63031; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n"
        "{{WARNING_ICON}} デザイン・動画編集スクール乱立の「消耗戦」\n"
        "</div>\n"
        "<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;\">\n"
        "<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n"
        "<b>1. 低スキル人材の大量供給：</b> スクールが毎月同じようなレベルの「初心者」を大量に生み出し、市場が激しい供給過多になる。<br><br>\n"
        "<b>2. 案件単価の暴落：</b> 実績欲しさに安値で応募し合うため、「バナー1枚500円」「動画編集1本2,000円」といった超低単価で買い叩かれる地獄絵図になるのじゃ。<br><br>\n"
        "<b>3. 疲弊と赤字でリタイア：</b> Adobeソフトの月額費用やPC代が重くのしかかり、何十時間も作業した挙句に時給換算で数十円になり、心身ともに折れて辞めてしまうのが大半のオチじゃ。\n"
        "</div>\n"
        "</div>\n"
        "</div>\n\n"

        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>ひえええ！スクールに入れば安泰じゃなくて、むしろ過酷なダンピング競争に巻き込まれるだけなんすね……。\n"
        "</div>\n"
        "</div>\n\n"

        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>その通り。本当に稼げるプロになりたいのなら、甘い広告の言葉を疑い、体系的な基礎知識と時間をしっかりとかけて、地道に学ぶことこそが実は最大の「近道」なのじゃよ！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div style=\"background: #FFF9F0; border: 2px solid #FFE082; border-radius: 12px; padding: 20px; margin: 20px 0;\">\n"
        "<div style=\"font-weight: 800; color: #E67E22; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;\">\n"
        "{{WARNING_ICON}} AI時代に必要な「正しいリスキリング」\n"
        "</div>\n"
        "<div style=\"background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #E67E22;\">\n"
        "<div style=\"font-size: 0.9rem; line-height: 1.6;\">\n"
        "<b>1. 固定のカリキュラムはすぐ風化する</b><br>ChatGPTやClaude、Grokといった生成AIは週単位でアップデートされる。半年前の教材やプロンプト集はあっという間に陳腐化するため、高い授業料を払う価値は極めて低いのじゃ。<br><br>\n"
        "<b>2. AIの「使い方」はAI自身に聞くのが一番早い</b><br>「Claudeで〇〇を実行するプロンプトを書いて」「Grokでデータを整理する方法を教えて」と、AIに直接聞いて対話しながら実践するのが、最も早くて効率的な学習方法じゃ。<br><br>\n"
        "<b>3. 主体的に「キャッチアップする力（思考力）」が人的資本</b><br>誰かに教えてもらうのではなく、日々新しいツールや機能を自分で触って実験する「主体性」と、AIを使いこなして目の前の課題を解決する「思考力」こそが、AI時代を生き抜く最大のスキルなのじゃぞ。\n"
        "</div>\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\" style=\"flex-direction:row-reverse;\">\n"
        "<div style=\"flex-shrink:0;\">{{MANETA_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-user\">\n"
        "<b>マネ太：</b><br>なるほどっす！スクールに高いお金を払う必要なんて全くなかったっすね。まずは無料プランからでも、ClaudeやGrokを自分の仕事の相棒として使い倒してみるっす！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div class=\"ura-chat-flex\">\n"
        "<div style=\"flex-shrink:0;\">{{HAKASE_ICON}}</div>\n"
        "<div class=\"ura-bubble ura-bubble-teacher\">\n"
        "<b>カブ先生：</b><br>フォッフォッフォ！その通りじゃ。誰かに頼る依存体質から抜け出し、主体的に学ぶ習慣を身につけること。それこそが「知識は最大の防御」という言葉の真意なのじゃぞ。喝！！\n"
        "</div>\n"
        "</div>\n\n"
        
        "<div style=\"background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;\">\n"
        "<div style=\"font-weight: 800; color: #2D3436; margin-bottom: 12px;\">📖 正しい知識で身を守るための「公式情報」</div>\n"
        "<ul style=\"font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;\">\n"
        "<li><b>経済産業省：</b> リスキリングを通じたキャリアアップ支援事業について、正しい補助要件や悪質な事業者への注意喚起を行っておるぞ。</li>\n"
        "<li><b>厚生労働省：</b> 各種教育訓練給付制度や労働局による助成金不正受給の処分状況を随時公表しておる。</li>\n"
        "</ul>\n"
        "<div style=\"display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;\">\n"
        "<a href=\"https://reskilling.meti.go.jp/\" target=\"_blank\" style=\"text-decoration: none;\">\n"
        "<div style=\"background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;\">🔗 経済産業省：リスキリングキャリアアップ支援事業</div>\n"
        "</a>\n"
        "<a href=\"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/index.html\" target=\"_blank\" style=\"text-decoration: none;\">\n"
        "<div style=\"background: #D63031; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;\">🔗 厚生労働省：給付金・助成金不正受給について</div>\n"
        "</a>\n"
        "</div>\n"
        "</div>"
    ),
    "related_contents": [],
    "faq": [
        {
            "q": "リスキリング補助金でお祝い金がもらえるスクールは安全ですか？",
            "a": "極めて危険です。受講実態がないのに修了したことにして国から補助金を受け取り、その一部を還流（キックバック）する詐欺スキームの可能性があります。発覚した場合は受講生側にも重い返還義務やペナルティが科されます。"
        },
        {
            "q": "不正受給が発覚した場合、受講生はどうなりますか？",
            "a": "国から支給された補助金の全額一括返還命令に加え、2割の違約金（加算金）および延滞金が上乗せされます。また、虚偽申請の共謀者として詐欺罪で刑事訴追されるリスクもあります。"
        },
        {
            "q": "AI学習を始めたいのですが、高額スクールは本当に不要ですか？",
            "a": "不要です。AI技術は日進月歩で変化するため、固定のカリキュラムはすぐに陳腐化します。ClaudeやGrokなどの生成AIツールに直接使い方を質問し、実践しながら自分でキャッチアップする習慣をつけることが最も効率的です。"
        }
    ]
}

def update_secrets_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        return False
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # ep 17 がすでにあれば置換、なければ追加
        updated = False
        for i, item in enumerate(data):
            if item.get("ep") == 17:
                data[i] = SECRET_EP17_DATA
                updated = True
                break
                
        if not updated:
            # 降順のため先頭に追加
            data.insert(0, SECRET_EP17_DATA)
            print(f"Successfully inserted ep 17 to the top of {file_path}")
        else:
            print(f"Successfully updated ep 17 in {file_path}")
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    target_paths = [
        "data/money_secrets.json",
        "web-next/src/data/money_secrets.json"
    ]
    
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    all_success = True
    for relative_path in target_paths:
        abs_path = os.path.join(project_root, relative_path)
        success = update_secrets_file(abs_path)
        if not success:
            all_success = False
            
    if all_success:
        print("\n[SUCCESS] MoneySecret EP 17 configured and saved successfully!")
    else:
        print("\n[FAIL] Configuration failed for some files.")

if __name__ == "__main__":
    main()
