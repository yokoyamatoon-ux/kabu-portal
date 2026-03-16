# Antigravity 修正プロンプト
## ウェルカムカード：バナー画像に差し替え・キャラ削除・レスポンシブ対応

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
import os

BANNER_PATH = r"D:\Antigravity\Kabu\image\banner01.png"

banner_b64 = get_image_base64(BANNER_PATH)
banner_html = (
    f'<img src="data:image/png;base64,{banner_b64}" '
    f'style="width:100%; max-width:420px; border-radius:12px; object-fit:cover;">'
    if banner_b64 else ""
)

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
  flex-wrap: wrap;
">
  <!-- テキストエリア（左） -->
  <div style="flex: 1; min-width: 260px;">

    <!-- メインタイトル -->
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
      むずかしい言葉は一切なし。<br>
      <b>AIとキャラクターがやさしく・たのしく</b>教えてくれるぞ！
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

  <!-- バナー画像（右） -->
  <div style="flex-shrink: 0; max-width: 420px; width: 100%;">
    {banner_html}
  </div>

</div>

<!-- スマホ用レスポンシブ調整 -->
<style>
@media (max-width: 640px) {{
  /* ウェルカムカードを縦積みに */
  div[style*="flex-wrap: wrap"] {{
    flex-direction: column !important;
    padding: 20px 18px !important;
  }}
  /* タイトルを少し小さく */
  div[style*="font-size: 2rem"] {{
    font-size: 1.4rem !important;
  }}
  /* バナー画像を全幅に */
  div[style*="max-width: 420px"] {{
    max-width: 100% !important;
  }}
}}
</style>
""", unsafe_allow_html=True)
```

---

## 変更のポイント

| 項目 | 変更前 | 変更後 |
|------|--------|--------|
| キャラ3人 | 表示あり | **削除** |
| バナー画像 | なし | `banner01.png` を右側に表示 |
| レイアウト | 横並び固定 | `flex-wrap: wrap` でスマホ時は縦積み |
| スマホ対応 | なし | 640px以下で縦積み・タイトル縮小 |

---

## 確認手順

1. 保存してStreamlitをリロードする
2. PCで「株って、楽しいかも！」テキスト（左）＋バナー画像（右）が横並びになっていることを確認
3. ブラウザ幅を640px以下に縮めると、テキスト→バナーの縦積みに切り替わることを確認
4. キャラ3人が消えていることを確認
5. HTMLタグが文字として画面に見えていたら `unsafe_allow_html=True` が抜けているので追加すること
