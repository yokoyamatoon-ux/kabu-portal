import streamlit as st
import os
from modules.ui_components import get_image_base64, IMAGE_DIR, chara_img, character_explain, CHARA

def render_maneta_diary_page():
    st.markdown("""
<style>
.diary-page-container {
    background: #FFF9F0;
    color: #333;
    padding: 30px;
    border-radius: 20px;
    border: 3px solid #ffcc5c;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    margin-bottom: 40px;
}
.diary-title {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: #FF6B6B;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 2px dashed #ffcc5c;
    padding-bottom: 15px;
}
.diary-entry {
    background: white;
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 30px;
    border: 1px solid #f0f0f0;
}
.diary-date {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 8px;
}
.diary-content {
    line-height: 1.8;
}
</style>
""", unsafe_allow_html=True)

    st.markdown('<div class="diary-page-container">', unsafe_allow_html=True)
    st.markdown('<div class="diary-title">📈 マネ太のはじめての投資日記</div>', unsafe_allow_html=True)
    
    # イントロ
    character_explain(
        CHARA["maneta"],
        "みんな、こんにちは！マネ太だよ👦<br>"
        "ボクが自腹で10万円から投資を始めて、100万円を目指すリアルな日記をつけていくよ！<br>"
        "失敗も成功も全部見せるから、一緒に勉強しよう！",
        bg_color="#FFF"
    )

    st.markdown('<br>', unsafe_allow_html=True)

    # 第1回目
    st.markdown("""
    <div class="diary-entry">
        <div class="diary-date">2026年3月23日 (月)</div>
        <h3 style="margin-top:0; font-weight:800; color:#2D3436;">第1回：ついに口座を作ったぞ！</h3>
        <div class="diary-content">
            ついに、証券口座っていうのを作ったよ！<br>
            カブ先生に教えてもらいながら、スマホでポチポチ……。<br>
            マイナンバーカードとか、色んなものが必要でちょっと大変だったけど、これでボクも「投資家」の仲間入りだ✨<br><br>
            まずはカブ先生に言われた通り、<b>「NISA」</b>っていうおトクな制度の設定をしてみたよ。<br>
            来月から毎月1万円ずつ、お小遣いを積み立てていくんだ。<br>
            来月の今頃には、ボクの1万円はどうなってるのかな？ ワクワクするなぁ！
        </div>
    </div>
    """, unsafe_allow_html=True)

    # 第2回目
    st.markdown("""
    <div class="diary-entry">
        <div class="diary-date">2026年3月28日 (土)</div>
        <h3 style="margin-top:0; font-weight:800; color:#2D3436;">第2回：はじめての株購入！</h3>
        <div class="diary-content">
            今日は記念すべき日！ ついに、はじめて「株」を買ってみたよ！<br>
            といっても、1株から買える<b>「単元未満株（SML）」</b>っていう仕組みを使ったから、数千円で済みました。<br><br>
            ボクが選んだのは、いつもお世話になっているゲーム会社の株。<br>
            「自分が応援したい会社に投資する」のが基本ってカブ先生が言ってたからね！<br>
            あと、1万円で<b>「全世界株式」の投資信託</b>も買ってみたよ。これで世界中の会社に少しずつ投資してることになるんだって。すごい！<br><br>
            株価が上がったり下がったりすると、スマホの画面を見るのがちょっとドキドキするけど、これも投資家としての第一歩だね！
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div style="text-align: center; color:#888; font-style: italic; margin-bottom: 30px;">
        —— 次回の更新をお楽しみに！ ——
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("← ホームにもどる", type="primary", use_container_width=True):
        st.session_state.current_page = "home"
        st.rerun()
        
    st.markdown('</div>', unsafe_allow_html=True)
