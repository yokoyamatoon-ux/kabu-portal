# Antigravity 修正プロンプト
## 「学ぶ・遊ぶ」ページをタブ分割 ＋ マンガ画像表示に変更

---

## 前提ルール（毎回必須）

HTMLを表示する場合は必ず `st.markdown(html, unsafe_allow_html=True)` を使うこと。
`st.write()` や `st.text()` は絶対に使わないこと。

---

## 修正内容

`app.py` の「学ぶ・遊ぶ」ページ描画部分を以下のように変更する。
それ以外のページ（ホーム・ニュース・探す）は一切変更しないこと。

---

## 変更するコード

### 「学ぶ・遊ぶ」ページの描画関数を以下に完全置き換え

```python
def render_learn_page():
    """学ぶ・遊ぶページ：タブで「学ぶ」と「遊ぶ」を切り替え"""

    st.markdown(
        '<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;">📖 学ぶ・遊ぶ</h2>',
        unsafe_allow_html=True
    )

    tab_learn, tab_play = st.tabs(["📚 学ぶ", "🎮 遊ぶ"])

    # =====================
    # 📚 学ぶタブ
    # =====================
    with tab_learn:

        st.markdown("""
        <div style="background:white;border-radius:16px;padding:16px 20px;
                    margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <div style="font-size:1rem;font-weight:800;margin-bottom:4px;">
            🥬 カブ博士とマンガで学ぼう！
          </div>
          <div style="font-size:0.85rem;color:#636E72;">
            むずかしい言葉なし。キャラクターと一緒にサクッと理解できるよ！
          </div>
        </div>
        """, unsafe_allow_html=True)

        # マンガエピソード定義
        # manga_image_path に画像ファイルパスを入れるだけで表示される
        manga_episodes = [
            {
                "ep": 1,
                "title": "株ってなに？",
                "summary": "会社の「オーナーの一部」になることを学ぼう！",
                "image_path": r"D:\Antigravity\Kabu\manga\ep01.png",
                # ↑ nanobananaで作った画像をここに入れる
                # 複数ページの場合はリストで指定:
                # "image_paths": [r"...\ep01_p1.png", r"...\ep01_p2.png"],
            },
            {
                "ep": 2,
                "title": "株価はなぜ動くの？",
                "summary": "需要と供給のしくみをマンガで理解しよう",
                "image_path": r"D:\Antigravity\Kabu\manga\ep02.png",
            },
            {
                "ep": 3,
                "title": "配当金ってなに？",
                "summary": "持ってるだけでもらえるお小遣い！",
                "image_path": r"D:\Antigravity\Kabu\manga\ep03.png",
            },
        ]

        for ep in manga_episodes:
            ep_num   = ep["ep"]
            title    = ep["title"]
            summary  = ep["summary"]
            img_path = ep.get("image_path")
            img_paths = ep.get("image_paths", [img_path] if img_path else [])

            with st.expander(f"第{ep_num}話　{title}　／　{summary}", expanded=(ep_num == 1)):

                if img_paths:
                    for p in img_paths:
                        b64 = get_image_base64(p)
                        if b64:
                            st.markdown(f"""
                            <div style="border-radius:12px;overflow:hidden;
                                        margin-bottom:12px;
                                        box-shadow:0 4px 12px rgba(0,0,0,0.10);">
                              <img src="data:image/png;base64,{b64}"
                                   style="width:100%;display:block;">
                            </div>
                            """, unsafe_allow_html=True)
                        else:
                            # 画像がまだない場合のプレースホルダー
                            st.markdown(f"""
                            <div style="
                              background:linear-gradient(135deg,#FFF9F0,#FFE8E8);
                              border-radius:12px;padding:40px;text-align:center;
                              margin-bottom:12px;border:2px dashed #FFB3B3;">
                              <div style="font-size:3rem;">🥬📖</div>
                              <div style="font-weight:700;margin-top:8px;color:#636E72;">
                                第{ep_num}話のマンガを準備中じゃ！<br>
                                <span style="font-size:0.8rem;">{p}</span>
                              </div>
                            </div>
                            """, unsafe_allow_html=True)
                else:
                    st.info("マンガ画像を準備中です。もうしばらくお待ちください！")

    # =====================
    # 🎮 遊ぶタブ
    # =====================
    with tab_play:

        st.markdown("""
        <div style="background:white;border-radius:16px;padding:16px 20px;
                    margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <div style="font-size:1rem;font-weight:800;margin-bottom:4px;">
            🎮 遊びながら株を覚えよう！
          </div>
          <div style="font-size:0.85rem;color:#636E72;">
            クイズや投資シミュレーションで楽しく学べるよ
          </div>
        </div>
        """, unsafe_allow_html=True)

        # 遊ぶメニュー
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("""
            <div style="background:white;border-radius:16px;padding:20px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.06);text-align:center;
                        margin-bottom:12px;">
              <div style="font-size:2.5rem;margin-bottom:8px;">❓</div>
              <div style="font-weight:800;font-size:0.95rem;margin-bottom:4px;">投資クイズ</div>
              <div style="font-size:0.8rem;color:#636E72;">知識をチェック！</div>
            </div>
            """, unsafe_allow_html=True)
            if st.button("クイズをはじめる →", key="btn_quiz", use_container_width=True):
                st.session_state["play_mode"] = "quiz"
                st.rerun()

        with col2:
            st.markdown("""
            <div style="background:white;border-radius:16px;padding:20px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.06);text-align:center;
                        margin-bottom:12px;">
              <div style="font-size:2.5rem;margin-bottom:8px;">💰</div>
              <div style="font-weight:800;font-size:0.95rem;margin-bottom:4px;">仮想投資ゲーム</div>
              <div style="font-size:0.8rem;color:#636E72;">100万円で投資体験！</div>
            </div>
            """, unsafe_allow_html=True)
            if st.button("シミュレーションへ →", key="btn_sim", use_container_width=True):
                st.session_state.current_page = "explore"
                st.rerun()

        # クイズ・シミュレーションの既存コンテンツをここで呼び出す
        play_mode = st.session_state.get("play_mode", "")
        if play_mode == "quiz":
            st.markdown("---")
            # 既存のクイズ関数をここで呼び出す
            # render_quiz() などがあれば: render_quiz()
            st.info("クイズ機能を既存コードから呼び出してください（render_quiz()など）")
```

---

## マンガ画像フォルダの準備

nanobananaで作った画像を以下に保存してください：

```
D:\Antigravity\Kabu\manga\
├── ep01.png   ← 第1話「株ってなに？」
├── ep02.png   ← 第2話「株価はなぜ動くの？」
└── ep03.png   ← 第3話「配当金ってなに？」
```

複数ページある場合は：
```python
"image_paths": [
    r"D:\Antigravity\Kabu\manga\ep01_p1.png",
    r"D:\Antigravity\Kabu\manga\ep01_p2.png",
    r"D:\Antigravity\Kabu\manga\ep01_p3.png",
],
```

---

## 確認手順

1. 保存してStreamlitをリロードする
2. 「学ぶ・遊ぶ」ページに「📚 学ぶ」「🎮 遊ぶ」タブが表示されることを確認
3. 「📚 学ぶ」タブで第1話が開いた状態で表示されることを確認
4. 画像がない場合はプレースホルダーが表示されることを確認（エラーにならないこと）
5. 「🎮 遊ぶ」タブでクイズ・シミュレーションのボタンが表示されることを確認
6. ホーム・ニュース・探すページに変化がないことを確認
