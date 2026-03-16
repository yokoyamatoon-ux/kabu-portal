import streamlit as st

def get_quizzes():
    return [
        {
            "question": "投資の世界で「インデックス」ってどんな意味？",
            "options": ["A: 世界中の会社の成績の平均点", "B: 銀行の手数料のこと", "C: 新しい仮想通貨", "D: 株式市場の休みのこと"],
            "answer": "A: 世界中の会社の成績の平均点",
            "explanation": "「S&P500」や「日経平均」などが有名だね。一つの会社だけでなく、たくさんの会社のまとまった動きを表す数字だよ。"
        },
        {
            "question": "会社がもうかった時に、株主（かぶぬし）に配ってくれるお金のことを何という？",
            "options": ["A: おこづかい", "B: ボーナス", "C: 配当金（はいとうきん）", "D: キャッシュバック"],
            "answer": "C: 配当金（はいとうきん）",
            "explanation": "会社が稼いだお金の一部を、株を持っているみんなで分けるんだ。「高配当株」はこれがたくさんもらえる株のことだよ。"
        },
        {
            "question": "投資の神様と呼ばれるウォーレン・バフェットが「世界で一番の力」と呼んだものはどれ？",
            "options": ["A: 気合", "B: 複利（ふくり）", "C: まぐれ", "D: インターネット"],
            "answer": "B: 複利（ふくり）",
            "explanation": "増えたお金をまた投資に回すことで、雪だるま式にどんどんお金が増えていくことを「複利」と言うよ。時間がたつほど力が強くなるんだ。"
        },
        {
            "question": "株を買うときのリスク（ちゅうい点）について、正しいのはどれ？",
            "options": ["A: ぜったいにお金は減らない", "B: 銀行に預けるより安全", "C: 買った時より値段が下がる（元本割れ）ことがある", "D: 買ったらすぐに売らないといけない"],
            "answer": "C: 買った時より値段が下がる（元本割れ）ことがある",
            "explanation": "株の値段は毎日上がったり下がったりするよ。だから、すぐ使う予定のない「よゆうのお金」で長く続けるのが大事なんだ。"
        }
    ]

def run_quiz_unit():
    st.header("🕹️ 投資クイズ — めざせ投資マスター！")
    st.markdown("投資のキホンをクイズで楽しく学ぼう。全問正解できるかな？")
    
    quizzes = get_quizzes()
    
    if 'quiz_idx' not in st.session_state:
        st.session_state.quiz_idx = 0
    if 'quiz_score' not in st.session_state:
        st.session_state.quiz_score = 0
    if 'quiz_answered' not in st.session_state:
        st.session_state.quiz_answered = False
    
    # 全問終わった場合
    if st.session_state.quiz_idx >= len(quizzes):
        st.success(f"🎉 クイズしゅうりょう！\n\nあなたのスコアは **{len(quizzes)}番中 {st.session_state.quiz_score}問 正解** でした！")
        if st.button("もう一度チャレンジ！"):
            st.session_state.quiz_idx = 0
            st.session_state.quiz_score = 0
            st.session_state.quiz_answered = False
            st.rerun()
        return

    # クイズ表示
    q = quizzes[st.session_state.quiz_idx]
    
    st.subheader(f"Q{st.session_state.quiz_idx + 1}. {q['question']}")
    
    # 選択肢
    selected = st.radio("こたえを選んでね:", q['options'], index=None if not st.session_state.quiz_answered else q['options'].index(st.session_state.selected_ans), disabled=st.session_state.quiz_answered)
    
    col1, col2 = st.columns([1, 5])
    
    if not st.session_state.quiz_answered:
        with col1:
            if st.button("こたえあわせ！", use_container_width=True):
                if selected:
                    st.session_state.selected_ans = selected
                    st.session_state.quiz_answered = True
                    if selected == q['answer']:
                        st.session_state.quiz_score += 1
                        st.balloons()
                    st.rerun()
                else:
                    st.warning("どれかひとつ選んでね！")
    else:
        st.markdown("---")
        if st.session_state.selected_ans == q['answer']:
            st.success("⭕ 大正解！")
        else:
            st.error(f"❌ ざんねん！正解は「{q['answer']}」でした。")
            
        st.markdown(f"**🤖 AIの解説:**\n\n{q['explanation']}")
        
        if st.button("つぎの問題へ ➡️", use_container_width=True):
            st.session_state.quiz_idx += 1
            st.session_state.quiz_answered = False
            if 'selected_ans' in st.session_state:
                del st.session_state.selected_ans
            st.rerun()

    # =====================
    # 💰 仮想投資ゲーム セクション
    # =====================
    st.markdown("<br><br>", unsafe_allow_html=True)
    st.markdown("""
<div style="background: linear-gradient(135deg, #E3F2FD, #FFFFFF); border-radius: 20px; padding: 25px; border: 2px solid #BBDEFB; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
    <div style="font-size: 2.5rem;">🎮</div>
    <div>
      <div style="font-size: 1.2rem; font-weight: 800; color: #1565C0;">次は実践！仮想投資ゲーム</div>
      <div style="font-size: 0.9rem; color: #546E7A;">クイズで学んだ知識を使って、100万円をどこまで増やせるかな？</div>
    </div>
  </div>
</div>
""", unsafe_allow_html=True)
    
    if st.button("今すぐシミュレーションを始める 🚀", key="jump_to_sim", use_container_width=True, type="primary"):
        st.session_state.current_page = "explore"
        st.rerun()
