import streamlit as st
import time
from modules.ui_components import chara_img, icon_img, CHARA

# 定義済みのQ&Aリスト
QA_DATABASE = {
    "円安ってなに？": "日本円の価値が他の国の通貨（ドルなど）に対して低くなることじゃ。輸入品が値上がりする反面、海外に物を売る輸出企業にとってはチャンスになるぞ！",
    "配当金はどうやってもらうの？": "投資商品を買って「権利確定日」まで持っていると、後日証券口座にお金が振り込まれるぞ。持ってるだけでお小遣いになる嬉しい仕組みじゃな！",
    "いくらから投資できるの？": "最近は100円から買える投資信託や、1株（数百円〜）から買えるミニ投資も充実しておるぞ。無理のない範囲で始めるのが一番じゃ！",
    "NISAって本当にお得なの？": "普通は投資で儲かると20%くらいの税金が取られるんじゃが、NISAならそれがゼロ！国が認めた「投資のご褒美」のようなものじゃな。",
    "おすすめの銘柄は？": "ワシは投資の最終判断は自分ですべきだと考えておる。まずはキミが知っている身近な会社や、応援したい会社を『探す』ページでチェックしてみるとよいぞ！",
}

def render_qa_page():
    st.markdown("""
<style>
.chat-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #FFF9F0;
    border-radius: 24px;
    min-height: 400px;
}
.bubble {
    padding: 12px 18px;
    border-radius: 18px;
    margin-bottom: 12px;
    max-width: 80% ;
    font-size: 0.95rem;
    line-height: 1.6;
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.bubble-teacher {
    background: white;
    color: #2D3436;
    border-bottom-left-radius: 4px;
    margin-right: auto;
    border: 2px solid #FFE082;
}
.bubble-user {
    background: #FF6B6B;
    color: white;
    border-bottom-right-radius: 4px;
    margin-left: auto;
}
.chat-flex {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}
</style>
""", unsafe_allow_html=True)

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:8px;">🎓 カブ先生の質問箱</h2>', unsafe_allow_html=True)
    st.markdown('<p style="color:#636E72; font-size:0.9rem; margin-bottom:24px;">投資のわからないこと、なんでもカブ先生に聞いてみよう！</p>', unsafe_allow_html=True)

    # セッション状態の初期化
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = [
            {"role": "teacher", "text": "こんにちは！カブ先生じゃ。投資のことで何かわからないことはあるかな？下のボタンを選ぶか、自由に質問してみておくれ。"}
        ]

    # チャット履歴の表示
    st.markdown('<div class="chat-container">', unsafe_allow_html=True)
    for msg in st.session_state.chat_history:
        if msg["role"] == "teacher":
            st.markdown(f"""
<div class="chat-flex">
    <div style="flex-shrink:0;">{chara_img('hakase', width=50)}</div>
    <div class="bubble bubble-teacher">{msg['text']}</div>
</div>
""", unsafe_allow_html=True)
        else:
            st.markdown(f"""
<div class="chat-flex" style="flex-direction:row-reverse;">
    <div class="bubble bubble-user">{msg['text']}</div>
</div>
""", unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # FAQボタン（よくある質問）
    st.markdown('<div style="font-weight:800; font-size:0.85rem; color:#888; margin-bottom:10px;">👇 よくある質問</div>', unsafe_allow_html=True)
    
    cols = st.columns(len(QA_DATABASE))
    for i, (q, a) in enumerate(QA_DATABASE.items()):
        with cols[i % len(cols)]:
            if st.button(q, key=f"faq_{i}", use_container_width=True):
                # ユーザーの質問を追加
                st.session_state.chat_history.append({"role": "user", "text": q})
                # 先生の回答を追加
                st.session_state.chat_history.append({"role": "teacher", "text": a})
                st.rerun()

    st.markdown("---")

    # 自由入力フォーム
    with st.container():
        user_input = st.text_input("カブ先生に自由に質問する（β版）:", placeholder="投資信託って何？", key="chat_input_box")
        if st.button("質問を送信 🚀", use_container_width=True):
            if user_input:
                st.session_state.chat_history.append({"role": "user", "text": user_input})
                
                # 簡易的なキーワードマッチングでの返答（Gemini連携なしの場合）
                response = "むむ、それは鋭い質問じゃな。今はまだ勉強中なのじゃが、もっと詳しくなったら答えてみせるぞ！まずは基本の『よくある質問』をチェックしてみておくれ。"
                for keyword, answer in QA_DATABASE.items():
                    if any(k in user_input for k in [keyword[:2], keyword[2:4]]): # 簡易マッチ
                         response = answer
                         break
                
                st.session_state.chat_history.append({"role": "teacher", "text": response})
                st.rerun()

    # チャットクリアボタン
    if st.button("チャットをリセット 🧹", type="secondary", use_container_width=True):
        del st.session_state.chat_history
        st.rerun()
