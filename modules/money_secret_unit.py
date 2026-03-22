import streamlit as st
import os
from modules.ui_components import get_image_base64, IMAGE_DIR, chara_img, icon_img

# 裏事情エピソード定義
ura_episodes = [
    {
        "ep": 1,
        "title": "インサイダー取引",
        "summary": "秘密の情報で株を買うのは立派な犯罪じゃ！",
        "image_path": os.path.join("manga", "urakane01.jpg"),
        "thumbnail": os.path.join("manga", "urakane01.jpg"),
    },
    {
        "ep": 2,
        "title": "SNSの甘い誘惑：ポンジ・スキーム",
        "summary": "「必ず儲かる」は詐欺の合言葉！？",
        "image_path": os.path.join("manga", "urakane02.jpg"),
        "thumbnail": os.path.join("manga", "urakane02.jpg"),
    },
    {
        "ep": 3,
        "title": "レバレッジと追証：身の丈を超えた投資の末路",
        "summary": "借金をしてまで株を買うことの本当の怖さとは？",
        "image_path": os.path.join("manga", "urakane03.jpg"),
        "thumbnail": os.path.join("manga", "urakane03.jpg"),
    },
]

def render_money_secret_page():
    """お金の裏事情ページのエントリポイント"""
    qp_ep = st.query_params.get("ep")
    if qp_ep is not None:
        try:
            st.session_state.selected_ura_ep = int(qp_ep)
        except ValueError:
            pass

    if "selected_ura_ep" not in st.session_state:
        st.session_state.selected_ura_ep = None

    if st.session_state.selected_ura_ep is None:
        render_ura_list()
    else:
        render_ura_viewer(st.session_state.selected_ura_ep)

def render_ura_list():
    """エピソード一覧ページ"""
    st.markdown("""<style>
.manga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
.manga-card { 
    background: white; border-radius: 16px; overflow: hidden; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; border: 1px solid #f0f0f0;
}
.manga-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
</style>""", unsafe_allow_html=True)

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">🕵️ お金の裏事情ファイル</h2>', unsafe_allow_html=True)
    
    # ウラ金さんの説明
    from modules.ui_components import character_explain, CHARA
    character_explain(
        CHARA["urakane"],
        "ヒッヒッ……。表の世界だけ見てちゃ、本当の成功は掴めねぇぜ。<br>"
        "投資に潜む『罠』や『裏のルール』を教えてやるから、しっかり耳をかっぽじって聞きな！",
        bg_color="#FFF9E6"
    )
    
    cols = st.columns(2)
    for i, ep in enumerate(ura_episodes):
        col = cols[i % 2]
        with col:
            b64 = get_image_base64(ep["thumbnail"]) if os.path.exists(ep["thumbnail"]) else ""
            st.markdown(f"""<div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; margin-bottom: 20px;">
{f'<img src="data:image/png;base64,{b64}" style="width:100%; height:200px; object-fit:cover;">' if b64 else '<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; font-size:3rem;">🕵️</div>'}
<div style="padding: 20px;">
<div style="font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px;">第{ep['ep']}話</div>
<div style="font-size: 1.15rem; font-weight: 800; color: #2D3436; margin-bottom: 8px;">{ep['title']}</div>
<div style="font-size: 0.85rem; color: #636E72; margin-bottom: 16px;">{ep['summary']}</div>
</div>
</div>""", unsafe_allow_html=True)
            if st.button(f"第{ep['ep']}話を読む →", key=f"read_ura_{ep['ep']}", use_container_width=True):
                st.session_state.selected_ura_ep = ep['ep']
                st.rerun()

def render_ura_viewer(ep_num):
    """裏事情詳細ビューア"""
    ep = next((e for e in ura_episodes if e["ep"] == ep_num), None)
    if not ep:
        st.session_state.selected_ura_ep = None
        st.rerun()
        return

    # 戻るボタン
    if st.button("← 一覧にもどる", type="secondary"):
        st.session_state.selected_ura_ep = None
        if "ep" in st.query_params:
            del st.query_params["ep"]
        st.rerun()

    # チャット用スタイル
    st.markdown("""<style>
.urakane-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 30px;
    color: #2D3436;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}
.ura-chat-flex {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}
.ura-bubble {
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 85%;
    color: #333;
}
.ura-bubble-evil {
    background: #FFEAA7;
    border-bottom-left-radius: 2px;
    border: 2px solid #D63031;
}
.ura-bubble-user {
    background: #F8F9FA;
    border-bottom-right-radius: 2px;
    border: 1px solid #E9ECEF;
    margin-left: auto;
}
.ura-bubble-teacher {
    background: #E8F8FF;
    border-bottom-left-radius: 2px;
    border: 2px solid #0984E3;
}
.fraud-list {
    margin: 10px 0;
    padding-left: 20px;
}
.fraud-list li {
    margin-bottom: 8px;
    font-size: 0.9rem;
}
</style>""", unsafe_allow_html=True)

    st.markdown(f"""<div style="text-align: center; margin: 20px 0;">
<h2 style="font-family:'M PLUS Rounded 1c',sans-serif;font-weight:800;margin-top:0;">第{ep['ep']}話：{ep['title']}</h2>
</div>""", unsafe_allow_html=True)

    # キャラクターアイコン取得
    urakane_icon = chara_img('urakane', width=50)
    maneta_icon  = chara_img('maneta', width=50)
    mirai_icon   = chara_img('mirai', width=50)
    hakase_icon  = chara_img('hakase', width=50)

    # マンガ画像
    manga_b64 = get_image_base64(ep["image_path"]) if os.path.exists(ep["image_path"]) else ""

    content_html = f"""<div class="urakane-section">
<div style="text-align:center; margin-bottom:30px;">
{f'<img src="data:image/png;base64,{manga_b64}" style="width:100%; max-width:600px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.1);">' if manga_b64 else '<span style="font-size:3rem">🖼️</span>'}
</div>"""

    if ep_num == 1:
        # 第1話：インサイダー取引
        content_html += f"""
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>さて、マンガの最後でワシが叫んだ通り、これは『インサイダー取引』という立派な犯罪じゃ！
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{maneta_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>ええっ！？「明日上がる」って教えてもらっただけで犯罪になっちゃうの？
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{mirai_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>ヒカリ：</b><br>チャンスだと思ったのに……。先生、インサイダー取引って結局どういうことなの？
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>インサイダー取引とは、会社の内部の人間や関係者しか知らない「特別な秘密」を、一般に発表される前に利用して株を売買することじゃ。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。坊主、お嬢ちゃん。世の中には「知ってる奴だけが勝つ」ってルールがある。だが、株の世界でそれをやると、市場そのものがぶっ壊れちまうのさ。
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{maneta_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>市場が壊れる……？
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ああ。一部のイカサマ野郎だけが必ず勝つギャンブルに、誰が金を出すよ？ 証券取引監視委員会は、キミたちが思っている以上にしつこいぜ。不自然な儲けは、AIやベテランの調査官が秒速で見つけ出し、キミのスマホの履歴まで洗いざらい調べるんだ。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>その通り。未成年であっても、親の同意を得て投資をしている以上、一人の「投資家」として扱われる。法律を犯せば容赦のない罰が待っておるぞ。
</div>
</div>
<div style="border: 2px solid #D63031; background: #FFF5F5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #D63031; font-weight: 800;">
{icon_img('warning.png', 24)} 重い罰則が科せられます
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">⚖️ 重い罰則</div>
<div style="font-size: 0.85rem;">5年以下の懲役、または500万円以下の罰金（あるいはその両方）が科せられる可能性がある。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">💰 利益没収</div>
<div style="font-size: 0.85rem;">ズルして得た利益はすべて没収される。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">📉 社会的信用</div>
<div style="font-size: 0.85rem;">名前が世間に公表される。将来の就職や進学にも大きな傷がつくことになる。</div>
</div>
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>もし、ウラ金さんのように「ここだけの話」を持ちかけてくる者がいたら、まずはこの公的なルールを思い出すんじゃ。
</div>
</div>
<div style="background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;">
<div style="font-weight: 800; color: #2D3436; margin-bottom: 12px;">📖 正しい知識を身につけよう</div>
<ul style="font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;">
<li><b>証券取引監視委員会（SESC）：</b> 市場の番人。インサイダー取引の罰則について詳しく書かれておる。</li>
<li><b>日本取引所グループ（JPX）：</b> マンガやクイズで投資のルールを優しく学べるぞ。</li>
<li><b>対処法：</b> 「絶対に儲かる」という話は絶対に信じないこと。怪しいと思ったら取引をせず、すぐに信頼できる大人や証券会社に相談するのじゃ。</li>
</ul>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
<a href="https://www.fsa.go.jp/" target="_blank" style="text-decoration: none;">
<div style="background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 金融庁で確認する</div>
</a>
<a href="https://www.fsa.go.jp/sesc/" target="_blank" style="text-decoration: none;">
<div style="background: #D63031; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 SESCで正しく学ぶ</div>
</a>
<a href="https://www.jpx.co.jp/" target="_blank" style="text-decoration: none;">
<div style="background: #0984E3; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 JPXでルールを学ぶ</div>
</a>
</div>
</div>"""

    elif ep_num == 2:
        # 第2話：ポンジ・スキーム
        content_html += f"""
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>待つのじゃ！それは100年経っても変わらぬ詐欺の王道、『ポンジ・スキーム』じゃ！
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{maneta_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>ええっ！？「天才」だと思ったのに、詐欺なの！？
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{mirai_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>ヒカリ：</b><br>でも先生、「元本保証」で「月利20%」だよ？ 銀行に預けるよりずっといいじゃない！
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。坊主、お嬢ちゃん。その「配当」がどこから出てるか考えたことはあるかい？ 新しく入ったカモが振り込んだ金を、そのまま前のカモに渡してるだけなのさ。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>その通り。運用なんて最初からしておらん。新しい参加者がいなくなった瞬間に、犯人は金を持ってドロンじゃ。これを考案したチャールズ・ポンジの名をとって、ポンジ・スキームと呼ぶのじゃ。
</div>
</div>

<div style="background: #FFF9F0; border: 2px solid #FFE082; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 800; color: #E67E22; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
{icon_img('warning.png', 24)} 【実録】本当にあった怖い詐欺事件
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{maneta_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>怪しい人じゃなくて、誰もが知ってる大企業の社員が「特別な投資がある」って言ってきたら、信じちゃうかも……。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。坊主、いいところに気づいたな。実際にあったんだぜ、大企業の「看板」を悪用したとんでもない事件がな。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>2023年に逮捕された、ソフトバンクの元社員らによる約12億円もの詐欺事件じゃ。
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border-left: 5px solid #E67E22; margin-top: 10px;">
<ul class="fraud-list">
<li><b>巧妙な手口：</b>なんと、ソフトバンクの本物の会議室に被害者を呼び出したんじゃ。</li>
<li><b>看板の魔力：</b>一流企業の場所で「携帯電話のビジネスで必ず儲かる」と言われ、有名芸人のTKO木本氏らも騙されてしまった。</li>
</ul>
</div>
</div>

<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>どんなに場所や人が立派でも、投資のルールは変わらん。これを肝に銘じておくのじゃ！
</div>
</div>

<div style="border: 2px solid #D63031; background: #FFF5F5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #D63031; font-weight: 800; font-size: 1.1rem;">
{icon_img('warning.png', 24)} 騙されないための「鉄の掟」
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">🚫 必ず儲かるは100%嘘</div>
<div style="font-size: 0.85rem;">投資に絶対はない。この言葉が出た時点で詐欺確定じゃ。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">✉️ 非公式な投資は無視</div>
<div style="font-size: 0.85rem;">会社名義ではなく、個人の口座に振り込ませる話は絶対に受けてはならん。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">✨ SNSの「キラキラ」を疑え</div>
<div style="font-size: 0.85rem;">豪華な生活を見せびらかして勧誘するのは、典型的な集客手口じゃぞ。</div>
</div>
</div>
</div>

<div style="background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;">
<div style="font-weight: 800; color: #2D3436; margin-bottom: 12px;">📖 正しい知識を身につけよう</div>
<ul style="font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;">
<li><b>金融庁：</b> 免許・許可・登録等を受けている業者一覧。怪しい業者はここでチェックじゃ。</li>
<li><b>消費者庁：</b> SNSでの投資トラブル注意喚起。最新の詐欺手口が公開されておる。</li>
<li><b>対処法：</b> 「おかしい」と思ったら、すぐに親や警察、消費者センター（188）に相談するのじゃ！</li>
</ul>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
<a href="https://www.fsa.go.jp/menkyo/menkyojyohou/index.html" target="_blank" style="text-decoration: none;">
<div style="background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 金融庁で業者をチェック</div>
</a>
<a href="https://www.caa.go.jp/policies/policy/consumer_policy/caution/SNS_investment/" target="_blank" style="text-decoration: none;">
<div style="background: #D63031; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 消費者庁の注意喚起</div>
</a>
<a href="tel:188" style="text-decoration: none;">
<div style="background: #0984E3; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">📞 消費者センター(188)</div>
</a>
</div>
</div>"""

    elif ep_num == 3:
        # 第3話：レバレッジと追証
        content_html += f"""
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>マネ太くん、10万円しか持っていないのに30万円分の取引をするということは、残りの20万円は「借金」をしているのと同じなのじゃ！
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{maneta_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>マネ太：</b><br>借金！？でも、株が上がれば儲けも3倍になるんでしょ？一気に逆転できるじゃん！
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>ヒッヒッ……。計算だけは速いな。だがな、逆に下がった時はどうなる？ 10万円の元手なんて、あっという間に溶けてなくなるぜ。
</div>
</div>
<div class="ura-chat-flex" style="flex-direction:row-reverse;">
<div style="flex-shrink:0;">{mirai_icon}</div>
<div class="ura-bubble ura-bubble-user">
<b>ヒカリ：</b><br>溶ける……？ 私たちのお金がなくなっちゃうの？
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>それだけではない。元手がゼロになるどころか、さらに追加で金を払えという「追証（おいしょう）」が発生し、借金だけが残ることもある。これが信用取引の本当の怖さじゃ。
</div>
</div>

<div style="background: #FFF9F0; border: 2px solid #FFE082; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 800; color: #E67E22; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
{icon_img('warning.png', 24)} 信用取引の恐ろしい罠
</div>
<div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #E67E22;">
<div style="font-weight: 800; color: #E67E22; margin-bottom: 4px;">⚖️ レバレッジの正体</div>
<div style="font-size: 0.85rem;">少ない力で大きなものを動かす「テコ」の原理だが、失敗した時はその重みがすべて自分に降ってくる。</div>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 5px solid #D63031;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">💸 追証（追加保証金）</div>
<div style="font-size: 0.85rem;">損が膨らんだ時、証券会社から「もっと金を出さないと強制終了だ」と連絡が来ること。払えなければ人生が詰むぞ。</div>
</div>
</div>
</div>

<div style="background: #F8F9FA; border: 1px solid #E9ECEF; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 800; color: #2D3436; font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
👤 【実録】「追証」で人生の損切りをした話
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{urakane_icon}</div>
<div class="ura-bubble ura-bubble-evil">
<b>ウラ金さん：</b><br>俺の知り合いにもいたぜ。SNSで「レバレッジ全力投球！」なんてイキってた若者が、一夜にして数百万円の借金を背負って消えていったのをな……。
</div>
</div>
<div class="ura-chat-flex">
<div style="flex-shrink:0;">{hakase_icon}</div>
<div class="ura-bubble ura-bubble-teacher">
<b>カブ先生：</b><br>信用取引は、本来はプロがリスクヘッジ（保険）のために使う高度な手法。初心者が「早く儲けたい」という理由だけで手を出すのは、目隠しをして高速道路を走るようなものじゃ。
</div>
</div>
</div>

<div style="border: 2px solid #D63031; background: #FFF5F5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #D63031; font-weight: 800; font-size: 1.1rem;">
{icon_img('warning.png', 24)} 投資の「鉄の防御」
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">💰 余剰資金が大原則</div>
<div style="font-size: 0.85rem;">投資は必ず「なくなっても困らないお金」の範囲内で行うこと。</div>
</div>
<div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #FFDada;">
<div style="font-weight: 800; color: #D63031; margin-bottom: 4px;">🧱 レバレッジ禁止</div>
<div style="font-size: 0.85rem;">初心者のうちは、レバレッジには絶対に手を出さないのが、一番の防御じゃ！</div>
</div>
</div>
</div>

<div style="background: #F8F9FA; border-radius: 12px; padding: 20px; border: 1px solid #E9ECEF; margin-top: 10px;">
<div style="font-weight: 800; color: #2D3436; margin-bottom: 12px;">📖 正確なルールを知ろう</div>
<ul style="font-size: 0.9rem; line-height: 1.7; color: #495057; padding-left: 20px;">
<li><b>日本取引所グループ（JPX）：</b> 信用取引の仕組みとリスク。公式なルールをしっかり確認じゃ。</li>
<li><b>日本証券業協会（JSDA）：</b> 初心者が知っておくべき「信用取引」の注意点。</li>
</ul>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
<a href="https://www.jpx.co.jp/equities/trading/margin/" target="_blank" style="text-decoration: none;">
<div style="background: #2D3436; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 JPXで仕組みを学ぶ</div>
</a>
<a href="https://www.jsda.or.jp/anshin/shiyou/index.html" target="_blank" style="text-decoration: none;">
<div style="background: #D63031; color: white; padding: 8px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem;">🔗 JSDAの注意点を見る</div>
</a>
</div>
</div>"""

    content_html += "</div>"
    st.markdown(content_html, unsafe_allow_html=True)

    if st.button("一覧へもどる", key="back_ura_bottom", use_container_width=True):
        st.session_state.selected_ura_ep = None
        if "ep" in st.query_params:
            del st.query_params["ep"]
        st.rerun()
