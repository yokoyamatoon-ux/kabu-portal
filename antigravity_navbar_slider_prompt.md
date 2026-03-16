# Antigravity 実装プロンプト
## ナビゲーション刷新 ＋ ヒーローバナー自動切替 ＋ ウェルカムエリア改善

---

## 改善①：ナビゲーションバーを「サイトらしい」デザインに刷新

### 問題
現状の3ボタン（ホーム・探す・学ぶ）は「ただのボタン」で、
サイトのナビゲーションバーに見えない。

### 目標イメージ
- 横幅いっぱいに伸びる白いナビバー
- アクティブなタブに**コーラルレッドの下線**
- ホバー時に下線がスッと出るアニメーション
- サイト名ロゴを左端に配置

### 実装方法（Streamlit の制約に対応した方法）

Streamlitのボタンは見た目のカスタマイズが限られるため、
`st.markdown()` でHTMLナビを描画し、クリックはクエリパラメータで管理する。

```python
# app.py に追加するナビゲーション関数

import streamlit as st
from streamlit import query_params

def render_navbar():
    """サイトらしいナビゲーションバーを描画"""
    
    current = st.session_state.get("current_page", "home")
    
    pages = [
        ("home",    "🏠 ホーム"),
        ("explore", "🔍 探す・シミュレーション"),
        ("learn",   "📖 学ぶ・遊ぶ"),
    ]
    
    nav_items = ""
    for key, label in pages:
        is_active = current == key
        active_style = (
            "border-bottom: 3px solid #FF6B6B; color: #FF6B6B; font-weight: 800;"
            if is_active else
            "border-bottom: 3px solid transparent; color: #2D3436;"
        )
        nav_items += f"""
        <a href="?page={key}" style="
          {active_style}
          text-decoration: none;
          padding: 14px 20px;
          font-size: 0.95rem;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        " onmouseover="this.style.color='#FF6B6B'; this.style.borderBottomColor='#FF6B6B';"
          onmouseout="this.style.color='{'#FF6B6B' if is_active else '#2D3436'}';
                      this.style.borderBottomColor='{'#FF6B6B' if is_active else 'transparent'}';">
          {label}
        </a>
        """
    
    st.markdown(f"""
    <div style="
      background: white;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      border-radius: 16px;
      padding: 0 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 4px;
      position: sticky;
      top: 0;
      z-index: 100;
    ">
      <!-- ロゴ -->
      <div style="
        font-family: 'M PLUS Rounded 1c', sans-serif;
        font-weight: 800;
        font-size: 1.1rem;
        color: #FF6B6B;
        padding: 14px 20px 14px 8px;
        border-right: 1px solid #eee;
        margin-right: 8px;
        white-space: nowrap;
      ">🌿 KABU PORTAL</div>
      
      <!-- ナビリンク -->
      {nav_items}
    </div>
    """, unsafe_allow_html=True)
    
    # URLのクエリパラメータでページを切り替える
    page_from_url = st.query_params.get("page", None)
    if page_from_url and page_from_url in ["home", "explore", "learn"]:
        if st.session_state.get("current_page") != page_from_url:
            st.session_state.current_page = page_from_url
            st.rerun()
```

### サイドバーの変更

サイドバーのナビゲーションボタン3つは**残す**（スマホではサイドバーが主要ナビになるため）。
ただしデザインをナビバーと統一する：

```python
with st.sidebar:
    st.markdown("""
    <div style="font-family:'M PLUS Rounded 1c',sans-serif; font-weight:800;
                font-size:1.2rem; color:#FF6B6B; padding:8px 0 16px;">
      🌿 KABU PORTAL
    </div>
    """, unsafe_allow_html=True)
    
    pages = [
        ("home",    "🏠 ホーム"),
        ("explore", "🔍 探す"),
        ("learn",   "📖 学ぶ"),
    ]
    for key, label in pages:
        is_active = st.session_state.get("current_page") == key
        btn_type = "primary" if is_active else "secondary"
        if st.button(label, key=f"sb_{key}", use_container_width=True, type=btn_type):
            st.session_state.current_page = key
            st.rerun()
```

---

## 改善②：ヒーローバナーを自動スライダーに変更

### 問題
現在の静止バナーは3枚の画像が並んでいるだけ。
「自動切替スライダー」にしたい。

### 実装方法

Streamlitは純粋なJSアニメーションが使えないため、
`st.markdown()` + `<style>` + CSS animationで実現する。

```python
def render_hero_slider():
    """CSS animationによる自動切替ヒーローバナー"""
    
    # バナー画像（assetsフォルダのものを使用）
    # 画像がない場合はグラデーション背景で代替
    banners = [
        {
            "bg": "linear-gradient(135deg, #FFE8E8 0%, #FFF0E8 100%)",
            "image_path": r"D:\Antigravity\Kabu\illust\banner1.png",  # あれば使用
            "title": "株って、楽しいかも！",
            "subtitle": "AIがぜんぶ教えてくれるから、むずかしくないよ✨",
            "btn_text": "AI株診断をスタート →",
            "btn_page": "home",
            "accent": "#FF6B6B",
        },
        {
            "bg": "linear-gradient(135deg, #E8F8FF 0%, #E8FFF0 100%)",
            "image_path": r"D:\Antigravity\Kabu\illust\banner2.png",
            "title": "気になる会社を探してみよう",
            "subtitle": "トヨタ・Apple・NVIDIAなど有名企業の株価をすぐ確認📊",
            "btn_text": "銘柄を探す →",
            "btn_page": "explore",
            "accent": "#4ECDC4",
        },
        {
            "bg": "linear-gradient(135deg, #F8F0FF 0%, #FFF8E8 100%)",
            "image_path": r"D:\Antigravity\Kabu\illust\banner3.png",
            "title": "マンガで株を学ぼう",
            "subtitle": "カブ博士・マネ太・ヒカリと一緒に、楽しく投資の基礎を学べる📚",
            "btn_text": "学びをスタート →",
            "btn_page": "learn",
            "accent": "#A29BFE",
        },
    ]
    
    # CSS animationでスライド切替（3枚・各4秒・合計12秒ループ）
    slides_html = ""
    dots_html   = ""
    
    for i, banner in enumerate(banners):
        delay      = i * 4           # 各スライドの表示開始タイミング
        anim_name  = f"slide{i}"
        
        # スライドHTML
        slides_html += f"""
        <div style="
          position: absolute; inset: 0;
          background: {banner['bg']};
          border-radius: 20px;
          display: flex;
          align-items: center;
          padding: 32px 40px;
          gap: 24px;
          animation: {anim_name} 12s infinite;
          opacity: 0;
        ">
          <div style="flex: 1;">
            <h2 style="
              font-family: 'M PLUS Rounded 1c', sans-serif;
              font-size: 1.8rem;
              font-weight: 800;
              color: #2D3436;
              margin: 0 0 10px;
            ">{banner['title']}</h2>
            <p style="color: #636E72; margin: 0 0 20px; font-size: 0.95rem; line-height: 1.7;">
              {banner['subtitle']}
            </p>
            <a href="?page={banner['btn_page']}" style="
              display: inline-block;
              background: {banner['accent']};
              color: white;
              border-radius: 50px;
              padding: 12px 28px;
              font-weight: 800;
              text-decoration: none;
              font-size: 0.95rem;
              font-family: 'M PLUS Rounded 1c', sans-serif;
              box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            ">{banner['btn_text']}</a>
          </div>
        </div>
        """
        
        # ドットHTML
        dot_color = banner['accent']
        dots_html += f"""
        <span style="
          width: 10px; height: 10px;
          border-radius: 50%;
          background: {dot_color};
          display: inline-block;
          margin: 0 4px;
          animation: dot{i} 12s infinite;
          opacity: 0.3;
        "></span>
        """
    
    # CSS keyframes（3枚スライド: 表示4秒 → フェードアウト1秒 → 非表示7秒）
    css = """
    @keyframes slide0 {
      0%       { opacity: 1; }
      25%      { opacity: 1; }
      33.33%   { opacity: 0; }
      91.67%   { opacity: 0; }
      100%     { opacity: 1; }
    }
    @keyframes slide1 {
      0%       { opacity: 0; }
      25%      { opacity: 0; }
      33.33%   { opacity: 1; }
      58.33%   { opacity: 1; }
      66.67%   { opacity: 0; }
      100%     { opacity: 0; }
    }
    @keyframes slide2 {
      0%       { opacity: 0; }
      58.33%   { opacity: 0; }
      66.67%   { opacity: 1; }
      91.67%   { opacity: 1; }
      100%     { opacity: 0; }
    }
    @keyframes dot0 {
      0%, 25%   { opacity: 1; }
      33.33%    { opacity: 0.3; }
      100%      { opacity: 0.3; }
    }
    @keyframes dot1 {
      0%        { opacity: 0.3; }
      25%       { opacity: 0.3; }
      33.33%    { opacity: 1; }
      58.33%    { opacity: 1; }
      66.67%    { opacity: 0.3; }
      100%      { opacity: 0.3; }
    }
    @keyframes dot2 {
      0%        { opacity: 0.3; }
      58.33%    { opacity: 0.3; }
      66.67%    { opacity: 1; }
      91.67%    { opacity: 1; }
      100%      { opacity: 0.3; }
    }
    """
    
    st.markdown(f"""
    <style>{css}</style>
    
    <!-- スライダーコンテナ -->
    <div style="position: relative; height: 220px; margin-bottom: 12px; border-radius: 20px; overflow: hidden;">
      {slides_html}
    </div>
    
    <!-- ドットインジケーター -->
    <div style="text-align: center; margin-bottom: 20px;">
      {dots_html}
    </div>
    """, unsafe_allow_html=True)
```

---

## 改善③：カブ博士のウェルカムメッセージをブラッシュアップ

### 問題
現在の挨拶文が説明的すぎて、初見ユーザーへのインパクトが弱い。

### 修正内容

`render_market_hero()` の「カブ博士の説明カード」を以下に変更：

```python
# キャラ画像を読み込む
hakase_b64 = get_image_base64(CHARA["hakase"])
maneta_b64 = get_image_base64(CHARA["maneta"])
hikari_b64 = get_image_base64(CHARA["hikari"])

# ウェルカムカード
st.markdown(f"""
<div style="
  background: white;
  border-radius: 20px;
  padding: 20px 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  border-left: 5px solid #FFE66D;
">
  <div style="display: flex; align-items: flex-end; gap: 16px; margin-bottom: 14px;">
    <img src="data:image/png;base64,{hakase_b64}" style="width: 64px; flex-shrink: 0;">
    <img src="data:image/png;base64,{maneta_b64}" style="width: 52px; flex-shrink: 0; margin-bottom: 4px;">
    <img src="data:image/png;base64,{hikari_b64}" style="width: 52px; flex-shrink: 0; margin-bottom: 4px;">
  </div>
  
  <div style="
    background: #FFFBF0;
    border-radius: 4px 16px 16px 16px;
    padding: 14px 18px;
    border: 1px solid #FFE082;
    font-size: 0.95rem;
    line-height: 1.8;
  ">
    <strong>カブ博士じゃ！🌿</strong><br>
    このサイトは <b>「株を楽しく学ぶ」</b> ためのポータルサイトじゃ。<br>
    むずかしい言葉は一切なし。AIとキャラクターが<b>やさしく・たのしく</b>教えてくれるぞ。<br><br>
    まずは <b style="color:#FF6B6B;">「AI株診断」</b> でキミにぴったりの株を見つけてみよう！👇
  </div>
</div>
""", unsafe_allow_html=True)
```

---

## 注意事項

- バナーのキーフレームアニメーションは `style.css` に追記するか、`st.markdown()` 内の `<style>` タグで注入すること
- スライダーの高さ `220px` はスマホでは `160px` になるよう `@media (max-width: 480px)` で調整すること
- ナビバーの `position: sticky` はStreamlitの構造上、完全には機能しない場合がある。その場合は `position: relative` に変更すること
- バナー画像（banner1.png等）がない場合はグラデーション背景のみで問題ない
- クエリパラメータ（`?page=home`）によるページ切替は既存の `st.session_state.current_page` と競合しないよう注意すること
