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
        from modules.ui_components import CHARA, get_image_base64
        hakase_b64 = get_image_base64(CHARA["hakase"])
        
        st.html(f"""
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
          <img src="data:image/png;base64,{hakase_b64}" style="width:50px; flex-shrink:0;">
          <div style="
            background: white;
            border-radius: 16px;
            padding: 18px 20px;
            flex: 1;
            border-left: 6px solid #FF6B6B;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          ">
            <div style="font-size:0.85rem; color:#FF6B6B; -webkit-text-fill-color:#FF6B6B; font-weight:800; margin-bottom:6px;">Q{step+1}. {step+1}/{len(questions)}</div>
            <div style="font-size:1.2rem; font-weight:800; color:#2D3436; -webkit-text-fill-color:#2D3436; line-height:1.4;">{q['q']}</div>
          </div>
        </div>
        """)
        
        # 選択肢ボタン
        st.markdown("""
        <style>
        div.stButton > button {
            border: 2px solid #eee !important;
            color: #2D3436 !important;
            font-weight: 800 !important;
            font-size: 1.05rem !important;
            padding: 12px 10px !important;
            background: white !important;
            transition: all 0.2s !important;
        }
        div.stButton > button:hover {
            border-color: #FF6B6B !important;
            color: #FF6B6B !important;
            background: #FFF0F0 !important;
        }
        </style>
        """, unsafe_allow_html=True)
        
        for option in q['a']:
            if st.button(option, key=f"diag_{step}_{option}", use_container_width=True):
                st.session_state.diagnosis_answers.append(option)
                st.session_state.diagnosis_step += 1
                st.rerun()
    else:
        # スタイル定義
        st.markdown("""
        <style>
        .diagnosis-result-wrapper {
            margin-top: 10px;
            text-align: left;
        }
        .diagnosis-title-main {
            font-size: 1.8rem !important;
            font-weight: 800 !important;
            color: #2D3436 !important;
            -webkit-text-fill-color: #2D3436 !important;
            margin-bottom: 12px !important;
            font-family: 'M PLUS Rounded 1c', sans-serif !important;
        }
        .diagnosis-card-white {
            background-color: #FFFFFF !important;
            border: 4px solid #03A9F4 !important;
            border-radius: 20px !important;
            padding: 24px 20px !important;
            margin-bottom: 24px !important;
            box-shadow: 0 6px 16px rgba(0,0,0,0.12) !important;
            display: block !important;
            width: 100% !important;
        }
        .diagnosis-card-text {
            color: #2D3436 !important;
            -webkit-text-fill-color: #2D3436 !important;
            font-weight: 800 !important;
            font-size: 1.15rem !important;
            line-height: 1.7 !important;
        }
        .mirai-card-white {
            background-color: #FFFFFF !important;
            border: 4px solid #4ECDC4 !important;
            border-radius: 24px !important;
            padding: 20px !important;
            margin: 20px 0 30px 0 !important;
            display: flex !important;
            align-items: center !important;
            gap: 16px !important;
            box-shadow: 0 6px 16px rgba(0,0,0,0.1) !important;
            width: 100% !important;
        }
        .mirai-card-text {
            color: #2D3436 !important;
            -webkit-text-fill-color: #2D3436 !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
            flex: 1;
        }
        .ver-sticker {
            text-align: right;
            font-size: 0.75rem !important;
            color: #AAAAAA !important;
            -webkit-text-fill-color: #AAAAAA !important;
            margin-top: 8px;
        }
        </style>
        """, unsafe_allow_html=True)

        # 簡易的なロジック
        exp = st.session_state.diagnosis_answers[0]
        if exp == "まったくないよ":
            result_type = "安定・配当型"
            result_msg = "あなたにおすすめなのは「分散投資」！まずは配当金やNISAから学んでみよう🐾"
        elif exp == "少しだけある":
            result_type = "バランス型"
            result_msg = "次は「個別株」に挑戦！身近な好きな会社の株を探してみよう🔍"
        else:
            result_type = "成長・積極型"
            result_msg = "あなたはもう投資のプロ！？「米国株」や「成長株」で更なる高みを目指そう🚀"

        # 診断結果の表示
        st.html(f"""
        <script>
            // iPhoneなどのスクロール位置調整
            window.parent.window.scrollTo(0, 0);
        </script>
        <div class="diagnosis-result-wrapper">
            <div class="diagnosis-title-main">📊 診断結果！ 🌟</div>
            <div style="font-size: 44px; margin: 10px 0 20px 0;">💰</div>
            
            <div class="diagnosis-card-white">
                <div class="diagnosis-card-text">{result_msg}</div>
                <div class="ver-sticker">[最終版 Ver.4.4]</div>
            </div>
        </div>
        """)
        
        st.session_state.diagnosis_result_type = result_type
        
        # 診断タイプ別の遷移先コンテンツ定義
        from modules.ui_components import CHARA, get_image_base64
        DIAGNOSIS_LEARN_MAP = {
            "安定・配当型": {
                "label": "📚 配当投資について学ぶ",
                "topic": "dividend",
                "message": "配当投資にむいてるね！まずは「配当金」ってなに？から学んでみよう✨",
                "ready": True
            },
            "バランス型": {
                "label": "📚 NISAについて学ぶ (準備中)",
                "topic": "nisa",
                "message": "バランス型にはNISAがぴったり！非課税で投資できるお得な制度だよ📗",
                "ready": False
            },
            "成長・積極型": {
                "label": "📚 成長株投資について学ぶ",
                "topic": "growth",
                "message": "積極型だね！成長株のリスクとリターンを学んでから始めよう🚀",
                "ready": True
            },
        }
        
        learn_info = DIAGNOSIS_LEARN_MAP.get(result_type, DIAGNOSIS_LEARN_MAP["バランス型"])
        
        # ミライのメッセージ
        mirai_b64 = get_image_base64(CHARA["mirai"])
        st.html(f"""
        <div class="mirai-card-white">
          <img src="data:image/png;base64,{mirai_b64}" style="width:50px !important; flex-shrink:0 !important; border-radius:50%;">
          <div class="mirai-card-text">{learn_info['message']}</div>
        </div>
        """)
        
        # 学習ページへ遷移ボタン
        if st.button(learn_info["label"], key="diagnosis_learn_btn", use_container_width=True, type="primary"):
            if learn_info.get("ready"):
                st.session_state.current_page = "learn"
                st.session_state.learn_topic = learn_info["topic"]
                st.rerun()
            else:
                st.toast("このコンテンツは現在準備中です！お楽しみに✨", icon="🚧")

        if st.button("もう一度診断する", key="diagnosis_retry_btn", use_container_width=True):
            st.session_state.diagnosis_step = 0
            st.session_state.diagnosis_answers = []
            st.rerun()
            

def render_diagnosis_page():
    st.markdown('<div class="section-title">🔍 AI投資診断</div>', unsafe_allow_html=True)
    run_diagnosis_unit()
