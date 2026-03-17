import streamlit as st

def run_diagnosis_unit():
    # 状態管理（st.session_state）の初期化
    if "diagnosis_step" not in st.session_state:
        st.session_state.diagnosis_step = 0
    if "diagnosis_answers" not in st.session_state:
        st.session_state.diagnosis_answers = []

    step = st.session_state.diagnosis_step
    
    questions = [
        {"q": "投資の経験はあるかな？", "a": ["まったくないよ", "少しだけある", "バリバリ投資中！"]},
        {"q": "どんな目的で投資したい？", "a": ["将来のため", "お小遣いを増やしたい", "趣味として楽しみたい"]},
        {"q": "どれくらいの金額から始めたい？", "a": ["1,000円くらい", "1万円くらい", "10万円以上！"]},
    ]
    
    # 質問中
    if step < len(questions):
        q = questions[step]
        
        # カブ先生のメッセージ
        from app import CHARA, get_image_base64
        hakase_b64 = get_image_base64(CHARA["hakase"])
        
        st.markdown(f"""
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <img src="data:image/png;base64,{hakase_b64}" style="width:60px;">
          <div class="kabu-card" style="margin-bottom:0; flex:1; border-left: 5px solid var(--primary);">
            <div style="font-size:0.8rem; color:var(--primary); font-weight:800; margin-bottom:4px;">Q{step+1}. {step+1}/{len(questions)}</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--text-main); line-height:1.4;">{q['q']}</div>
          </div>
        </div>
        """, unsafe_allow_html=True)
        
        # 選択肢ボタン
        for option in q['a']:
            if st.button(option, key=f"diag_{step}_{option}", use_container_width=True):
                st.session_state.diagnosis_answers.append(option)
                st.session_state.diagnosis_step += 1
                st.rerun()
    else:
        st.markdown("### 診断結果！🌟")
        st.markdown("""
        <div class="coin-celebrate" style="font-size: 40px;">💰</div>
        """, unsafe_allow_html=True)
        
        # 簡易的なロジック
        exp = st.session_state.diagnosis_answers[0]
        if exp == "まったくないよ":
            result_type = "安定・配当型"
            st.success("あなたにおすすめなのは「分散投資」！まずは配当金やNISAから学んでみよう🐾")
        elif exp == "少しだけある":
            result_type = "バランス型"
            st.success("次は「個別株」に挑戦！身近な好きな会社の株を探してみよう🔍")
        else:
            result_type = "成長・積極型"
            st.success("あなたはもう投資のプロ！？「米国株」や「成長株」で更なる高みを目指そう🚀")
        
        st.session_state.diagnosis_result_type = result_type
        
        # 診断タイプ別の遷移先コンテンツ定義
        from app import CHARA, get_image_base64
        DIAGNOSIS_LEARN_MAP = {
            "安定・配当型": {
                "label": "📚 配当投資について学ぶ",
                "topic": "dividend",
                "message": "配当投資にむいてるね！まずは「配当金」ってなに？から学んでみよう✨"
            },
            "バランス型": {
                "label": "📚 NISAについて学ぶ",
                "topic": "nisa",
                "message": "バランス型にはNISAがぴったり！非課税で投資できるお得な制度だよ📗"
            },
            "成長・積極型": {
                "label": "📚 成長株投資について学ぶ",
                "topic": "growth",
                "message": "積極型だね！成長株のリスクとリターンを学んでから始めよう🚀"
            },
        }
        
        learn_info = DIAGNOSIS_LEARN_MAP.get(result_type, DIAGNOSIS_LEARN_MAP["バランス型"])
        
        # ミライのメッセージ
        mirai_b64 = get_image_base64(CHARA["mirai"])
        st.markdown(f"""
        <div style="
          display:flex; align-items:center; gap:16px;
          background: #F0FFF8; border-radius:20px; padding:16px 20px;
          border: 2px solid #4ECDC4; margin-top: 16px;
        ">
          <img src="data:image/png;base64,{mirai_b64}" style="width:60px; flex-shrink:0;">
          <div>
            <div style="font-size:0.9rem; line-height:1.7;">{learn_info['message']}</div>
          </div>
        </div>
        """, unsafe_allow_html=True)
        
        # 学習ページへ遷移ボタン
        if st.button(learn_info["label"], use_container_width=True, type="primary"):
            st.session_state.current_page = "learn"
            st.session_state.learn_topic = learn_info["topic"]
            st.rerun()

        if st.button("もう一度診断する", use_container_width=True):
            st.session_state.diagnosis_step = 0
            st.session_state.diagnosis_answers = []
            st.rerun()
            

def render_diagnosis_page():
    st.markdown('<div class="section-title">🔍 AI投資診断</div>', unsafe_allow_html=True)
    run_diagnosis_unit()
