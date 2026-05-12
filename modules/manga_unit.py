import streamlit as st
import os
from modules.ui_components import get_image_base64, resolve_image_path

import json

# 設定
DATA_DIR = os.path.join(os.getcwd(), "data")
IMAGE_DIR = os.path.join(os.getcwd(), "image")

def load_manga_data():
    """manga.jsonからデータを読み込む"""
    json_path = os.path.join(DATA_DIR, "manga.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

manga_episodes = load_manga_data()

def render_manga_page():
    """マンガ学習ページのエントリポイント"""
    # learn_topicからの遷移対応
    if "learn_topic" in st.session_state:
        topic = st.session_state.pop("learn_topic")
        ep = next((e["ep"] for e in manga_episodes if e.get("topic") == topic), None)
        if ep:
            st.session_state.selected_manga_ep = ep
            # スクロールを促すなどのメッセージ
            st.toast(f"「{topic}」に関連するマンガを開いたよ！✨")

    if "selected_manga_ep" not in st.session_state:
        st.session_state.selected_manga_ep = None

    if st.session_state.selected_manga_ep is None:
        render_manga_list()
    else:
        render_manga_viewer(st.session_state.selected_manga_ep)

def render_manga_list():
    """マンガ一覧ページ（グリッド表示）"""
    st.markdown("""
<style>
.manga-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 10px 0; }
.manga-card { 
    background: white; border-radius: 16px; overflow: hidden; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer; border: 1px solid #f0f0f0;
}
.manga-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
.manga-thumb { width: 100%; height: 180px; object-fit: cover; background: #f8f9fa; border-bottom: 1px solid #f0f0f0; }
.manga-info { padding: 15px; }
.manga-ep-label { font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px; }
.manga-title { font-size: 1.1rem; font-weight: 800; color: #2D3436; margin-bottom: 6px; line-height: 1.3; }
.manga-summary { font-size: 0.85rem; color: #636E72; line-height: 1.5; }
</style>
""", unsafe_allow_html=True)

    st.markdown('<h2 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;margin-bottom:24px;">📖 マンガで学ぶ</h2>', unsafe_allow_html=True)
    
    # ヒカリの説明
    from modules.ui_components import character_explain, CHARA
    character_explain(
        CHARA["mirai"],
        "投資の基本から最新の制度まで、マンガで楽しく学ぼう！🌸<br>"
        "難しい言葉もキャラクターたちが分かりやすく解説してくれるよ。",
        bg_color="#FFF5F5"
    )
    
    # 2列グリッド（Streamlitのcolumnsを使用）
    cols = st.columns(2)
    for i, ep in enumerate(manga_episodes):
        col = cols[i % 2]
        with col:
            # 画像パスの解決 (画像解決エンジンを使用)
            # thumbnailフィールドがない場合は最初のページをサムネイルにする
            raw_thumb = ep.get("thumbnail") or (ep["manga_pages"][0] if ep.get("manga_pages") else "")
            img_path = resolve_image_path(raw_thumb, category="manga")
            b64 = get_image_base64(img_path)
            
            # カード全体をボタン的に見せるため、背景と情報をコンテナ化
            # Streamlitのネイティブボタンやクリック検知が必要なため、div + buttonの組み合わせ
            st.markdown(f"""
<div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #f0f0f0; margin-bottom: 20px;">
  {f'<img src="data:image/png;base64,{b64}" style="width:100%; height:200px; object-fit:cover;">' if b64 else '<div style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; font-size:3rem;">🥬</div>'}
  <div style="padding: 20px;">
    <div style="font-size: 0.75rem; color: #FF6B6B; font-weight: 800; margin-bottom: 4px;">第{ep['ep']}話</div>
    <div style="font-size: 1.15rem; font-weight: 800; color: #2D3436; margin-bottom: 8px;">{ep['title']}</div>
    <div style="font-size: 0.85rem; color: #636E72; margin-bottom: 16px;">{ep['summary']}</div>
  </div>
</div>
""", unsafe_allow_html=True)
            if st.button(f"第{ep['ep']}話を読む →", key=f"read_{ep['ep']}", use_container_width=True):
                st.session_state.selected_manga_ep = ep['ep']
                st.rerun()

def render_manga_viewer(ep_num):
    """マンガ詳細ビューア"""
    ep = next((e for e in manga_episodes if e["ep"] == ep_num), None)
    if not ep:
        st.session_state.selected_manga_ep = None
        st.rerun()
        return

    # 戻るボタン
    if st.button("← 一覧にもどる", type="secondary"):
        st.session_state.selected_manga_ep = None
        st.rerun()

    st.markdown(f"""
<div style="text-align: center; margin: 40px 0 20px;">
  <div style="font-size: 0.9rem; color: #FF6B6B; font-weight: 800;">第{ep['ep']}話</div>
  <h2 style="font-family:'M PLUS Rounded 1c',sans-serif;font-weight:800;margin-top:4px;line-height:1.4;">{ep['title']}</h2>
</div>
""", unsafe_allow_html=True)

    # マンガ画像（複数ページ対応）
    pages = ep.get("manga_pages")
    if not pages and "image" in ep:
        # 互換性のため、単一画像もリスト化
        pages = [ep["image"]]
    
    if pages:
        for i, page_path in enumerate(pages):
            # 画像パスの解決 (画像解決エンジンを使用)
            full_path = resolve_image_path(page_path, category="manga")
            b64 = get_image_base64(full_path)
            
            if b64:
                    st.markdown(f"""
<div style="max-width: 900px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.15); margin-bottom: 5px;">
  <img src="data:image/png;base64,{b64}" style="width:100%; display:block;">
</div>
""", unsafe_allow_html=True)
            else:
                if i == 0:
                    render_coming_soon(ep['ep'])
    else:
        render_coming_soon(ep['ep'])

    # --- カブ先生の解説セクション ---
    if "commentary" in ep or "summary_points" in ep:
        st.markdown("<br><br>", unsafe_allow_html=True)
        st.markdown(f'<h3 style="font-family:\'M PLUS Rounded 1c\',sans-serif;font-weight:800;text-align:center;color:#2D3436;border-bottom:3px solid #FF6B6B;display:inline-block;padding:0 20px 5px;margin-bottom:30px;">🎓 カブ先生の深掘り解説：第{ep["ep"]}話</h3>', unsafe_allow_html=True)
        
        from modules.ui_components import character_explain, CHARA
        
        # 1. ダイアログ形式の解説
        for item in ep.get("commentary", []):
            role = item.get("speaker", "kabu")
            text = item.get("text", "")
            emote = item.get("emote", "normal")
            
            chara_data = CHARA.get(role, CHARA["kabu"])
            bg = "#FFF9F0" if role == "kabu" else "#F0F7FF"
            character_explain(chara_data, text, bg_color=bg)

        # 2. まとめ・ポイント
        if "summary_points" in ep:
            st.markdown("<br>", unsafe_allow_html=True)
            points_html = "".join([f"<li>{p}</li>" for p in ep["summary_points"]])
            st.markdown(f"""
<div style="background: white; border-radius: 16px; padding: 25px; border-left: 8px solid #FF6B6B; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
  <h4 style="margin-top:0; color:#FF6B6B; font-weight:800;">💡 この話の重要ポイント</h4>
  <ul style="margin-bottom:0; line-height:1.7; color:#2D3436;">
    {points_html}
  </ul>
</div>
""", unsafe_allow_html=True)

        # 3. FAQ
        if "faq" in ep:
            st.markdown("<br><br>", unsafe_allow_html=True)
            st.markdown('<h4 style="font-weight:800; color:#2D3436; margin-bottom:20px;">❓ よくある質問</h4>', unsafe_allow_html=True)
            for item in ep["faq"]:
                with st.expander(f"Q: {item['q']}", expanded=False):
                    st.markdown(item["a"])

def render_coming_soon(ep_num):
    """準備中表示"""
    st.markdown(f"""
<div style="
  background:linear-gradient(135deg,#FFF9F0,#FFE8E8);
  border-radius:12px;padding:100px 40px;text-align:center;
  margin:40px auto; max-width: 800px; border:2px dashed #FFB3B3;">
  <div style="font-size:4rem;">📖✨</div>
  <div style="font-weight:800;margin-top:16px;color:#636E72;font-size:1.2rem;">
    ただいま制作中じゃ！<br>
    <span style="font-size:0.9rem;">第{ep_num}話はもうすぐ公開されるぞ。楽しみに待っておれ！</span>
  </div>
</div>
""", unsafe_allow_html=True)

    # ナビゲーションボタン（前へ・次へ・一覧へ）
    st.markdown("<br><hr style='border:none;border-top:1px dashed #ddd;margin:20px 0;'>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        if ep_num > 1:
            if st.button(f"← 第{ep_num - 1}話を読む", use_container_width=True):
                st.session_state.selected_manga_ep = ep_num - 1
                st.rerun()
                
    with col2:
        if st.button("📖 一覧へ戻る", key="back_bottom", use_container_width=True):
            st.session_state.selected_manga_ep = None
            st.rerun()
            
    with col3:
        if ep_num < len(manga_episodes):
            if st.button(f"第{ep_num + 1}話を読む →", use_container_width=True, type="primary"):
                st.session_state.selected_manga_ep = ep_num + 1
                st.rerun()

