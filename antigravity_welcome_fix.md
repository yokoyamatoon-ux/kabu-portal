# Antigravity 修正プロンプト
## ウェルカムカードの改善（キャラ・文字サイズ・余白）

---

## 修正箇所

`render_market_hero()` 内のウェルカムカードを以下に**完全に置き換え**ること。

```python
hakase_b64 = get_image_base64(CHARA["hakase"])

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
  <!-- カブ博士（左側・大きめ固定） -->
  <img src="data:image/png;base64,{hakase_b64}"
       style="width: 110px; flex-shrink: 0;">

  <!-- テキストエリア -->
  <div style="flex: 1;">

    <!-- タイトル行（大） -->
    <div style="
      font-family: 'M PLUS Rounded 1c', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: #2D3436;
      margin-bottom: 10px;
      line-height: 1.4;
    ">
      株って、<span style="color:#FF6B6B;">楽しいかも</span>！🌟
    </div>

    <!-- サブコピー（中） -->
    <div style="
      font-size: 1.05rem;
      color: #444;
      line-height: 1.8;
      margin-bottom: 14px;
    ">
      このサイトはむずかしい言葉を一切使わない
      <b>「株を楽しく学ぶ」</b>ためのポータルサイトじゃ。<br>
      AIとキャラクターが<b>やさしく・たのしく</b>教えてくれるぞ！
    </div>

    <!-- CTA行（小・強調） -->
    <div style="
      font-size: 0.95rem;
      color: #636E72;
    ">
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

## 変更のポイント

| 項目 | 変更前 | 変更後 |
|------|--------|--------|
| キャラ | 博士・マネ太・ヒカリ3人（サイズバラバラ） | カブ博士のみ（110px固定） |
| タイトル | なし（説明文のみ） | 「株って、楽しいかも！」を大きく表示 |
| 本文 | 0.95rem（小さい） | 1.05rem（読みやすいサイズ） |
| CTA | 埋もれていた | 赤ハイライトで目立たせる |
| レイアウト | 縦積み | 横並び（博士＋テキスト）で余白を有効活用 |
