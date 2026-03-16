# Antigravity 修正プロンプト
## ウェルカムカード：キャラ3人表示・タイトル大きく

---

## 前提ルール（毎回必須）

HTMLを表示する場合は必ず `st.markdown(html, unsafe_allow_html=True)` を使うこと。
`st.write()` や `st.text()` は絶対に使わないこと。

---

## 修正場所

`render_market_hero()` 関数の中にある、
**「株って、楽しいかも」という文字列を含む `st.markdown()` ブロック全体**を
以下のコードに完全に置き換えてください。
それ以外のコードは一切変更しないこと。

---

## 置き換えるコード

```python
hakase_b64 = get_image_base64(CHARA["hakase"])
maneta_b64 = get_image_base64(CHARA["maneta"])
hikari_b64 = get_image_base64(CHARA["hikari"])

st.markdown(f"""
<div style="
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  border-left: 5px solid #FFE66D;
  display: flex;
  align-items: center;
  gap: 28px;
">
  <!-- キャラクター3人（同じサイズで横並び） -->
  <div style="display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;">
    <img src="data:image/png;base64,{hakase_b64}" style="width: 90px; height: 90px; object-fit: contain;">
    <img src="data:image/png;base64,{maneta_b64}" style="width: 90px; height: 90px; object-fit: contain;">
    <img src="data:image/png;base64,{hikari_b64}" style="width: 90px; height: 90px; object-fit: contain;">
  </div>

  <!-- テキストエリア -->
  <div style="flex: 1;">

    <!-- メインタイトル（大きく・目立つ） -->
    <div style="
      font-family: 'M PLUS Rounded 1c', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: #2D3436;
      margin-bottom: 10px;
      line-height: 1.3;
    ">
      株って、<span style="color:#FF6B6B;">楽しいかも</span>！🌟
    </div>

    <!-- サブコピー -->
    <div style="
      font-size: 1.0rem;
      color: #444;
      line-height: 1.8;
      margin-bottom: 14px;
    ">
      むずかしい言葉は一切なし。<b>AIとキャラクターがやさしく・たのしく</b>教えてくれるぞ！
    </div>

    <!-- CTA -->
    <div style="font-size: 0.95rem; color: #636E72;">
      まずは
      <span style="
        color: #FF6B6B;
        font-weight: 800;
        font-size: 1.05rem;
        background: #FFF0F0;
        border-radius: 6px;
        padding: 2px 8px;
      ">「AI株診断」</span>
      でキミにぴったりの株を見つけてみよう！ 👇
    </div>

  </div>
</div>
""", unsafe_allow_html=True)
```

---

## 確認手順

1. 保存してStreamlitをリロードする
2. キャラ3人が同じサイズ（90×90px）で横並びになっていることを確認
3. 「株って、楽しいかも！」が大きく（2rem）表示されていることを確認
4. HTMLタグが文字として画面に見えていたら `unsafe_allow_html=True` が抜けているので追加すること
