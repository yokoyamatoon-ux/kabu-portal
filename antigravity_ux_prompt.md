# Antigravity UX改善プロンプト
## KABU PORTAL — キャラクター統合 ＋ UX全面改善

---

## キャラクター設定（全機能共通）

以下の3キャラクターの画像が `D:\Antigravity\Kabu\illust\` に配置済み。
アイコン画像は `D:\Antigravity\Kabu\illust\icons\` に配置済み。
全ての機能でこのキャラを使って説明・演出を行うこと。

```
D:\Antigravity\Kabu\illust\kabuhakase.png  → カブ博士（カブの野菜モチーフ・緑のスーツ・眼鏡）
                                              役割：解説・教える・難しいことをやさしく説明
D:\Antigravity\Kabu\illust\maneta.png      → マネ太（青髪・パーカー男の子）
                                              役割：初心者代表・「どういうこと？」と聞く側
D:\Antigravity\Kabu\illust\mirai.png       → ヒカリ（茶髪・スカートの女の子）
                                              役割：中級者・「それ知ってる！」「やってみよう！」
```

### パス設定（app.pyの先頭で定義）

```python
import os
import base64

# イラスト・アイコンのベースパス
ILLUST_DIR = r"D:\Antigravity\Kabu\illust"
ICON_DIR   = r"D:\Antigravity\Kabu\illust\icons"

# キャラクター画像パス
CHARA = {
    "hakase": os.path.join(ILLUST_DIR, "kabuhakase.png"),
    "maneta": os.path.join(ILLUST_DIR, "maneta.png"),
    "hikari": os.path.join(ILLUST_DIR, "mirai.png"),
}

def get_image_base64(path: str) -> str:
    """画像ファイルをbase64文字列に変換。ファイルが存在しない場合は空文字を返す"""
    try:
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode()
    except FileNotFoundError:
        return ""

def chara_img(key: str, width: int = 70) -> str:
    """キャラクター画像のHTMLタグを返す。画像がない場合は絵文字で代替"""
    fallback = {"hakase": "🌿", "maneta": "👦", "hikari": "👧"}
    b64 = get_image_base64(CHARA.get(key, ""))
    if b64:
        return f'<img src="data:image/png;base64,{b64}" style="width:{width}px; flex-shrink:0;">'
    return f'<span style="font-size:{width//2}px;">{fallback.get(key, "🐾")}</span>'

def icon_img(filename: str, width: int = 32) -> str:
    """iconsフォルダからアイコン画像を読み込む"""
    path = os.path.join(ICON_DIR, filename)
    b64  = get_image_base64(path)
    if b64:
        return f'<img src="data:image/png;base64,{b64}" style="width:{width}px;">'
    return ""
```

このファイルの関数は全モジュールから以下のようにインポートして使うこと：
```python
from app import chara_img, icon_img, CHARA, get_image_base64
```

---

## 改善①：サイドバーの残高表示をわかりやすく

### 問題
現状：`残高: ¥1,000,000` というテキストだけで意味がわからない

### 修正内容

`app.py` のサイドバーを以下のデザインに変更すること。

```python
with st.sidebar:
    # ロゴ・タイトル
    st.markdown("## 🌿 KABU PORTAL")
    st.markdown("---")
    
    # ナビゲーションボタン（既存）
    # ...（省略）
    
    st.markdown("---")
    
    # 残高ウィジェット（貯金箱イメージ）
    balance = st.session_state.get("balance", 1_000_000)
    portfolio = st.session_state.get("portfolio", [])
    
    # 仮想損益の計算
    total_gain = 0
    for item in portfolio:
        try:
            info = get_stock_info(item["ticker"])
            if info:
                current = item["shares"] * info["price"]
                total_gain += current - item["amount"]
        except:
            pass
    
    gain_color = "#00B894" if total_gain >= 0 else "#FF7675"
    gain_icon  = "📈" if total_gain >= 0 else "📉"
    gain_sign  = "+" if total_gain >= 0 else ""
    
    st.markdown(f"""
    <div style="
      background: linear-gradient(135deg, #FFF9C4, #FFF3E0);
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      border: 2px solid #FFE082;
    ">
      <div style="font-size: 2rem;">🏦</div>
      <div style="font-size: 0.75rem; color: #888; margin-bottom: 4px;">
        あなたの仮想おさいふ
      </div>
      <div style="font-size: 1.4rem; font-weight: 800; color: #2D3436;">
        ¥{balance:,}
      </div>
      <div style="font-size: 0.8rem; color: {gain_color}; font-weight: 700; margin-top: 4px;">
        {gain_icon} 運用損益: {gain_sign}¥{total_gain:,.0f}
      </div>
      <div style="font-size: 0.7rem; color: #aaa; margin-top: 6px;">
        ※仮想のお金です。実際の投資ではありません
      </div>
    </div>
    """, unsafe_allow_html=True)
    
    # カブ博士のひとこと
    hakase_b64 = get_image_base64(CHARA["hakase"])
    if total_gain > 0:
        msg = "いい調子だよ！📈<br>このまま続けよう！"
    elif total_gain < 0:
        msg = "少し下がってるけど<br>長期投資は焦らずに🌱"
    else:
        msg = "まだ株を買ってないね！<br>「探す」から始めてみよう✨"
    
    st.markdown(f"""
    <div style="display:flex; align-items:center; gap:10px; margin-top:12px;">
      <img src="data:image/png;base64,{hakase_b64}" style="width:50px; flex-shrink:0;">
      <div style="
        background: white;
        border-radius: 12px 12px 12px 4px;
        padding: 8px 12px;
        font-size: 0.78rem;
        border: 1px solid #eee;
        line-height: 1.5;
      ">{msg}</div>
    </div>
    """, unsafe_allow_html=True)
```

---

## 改善②：各機能にキャラ付きポップ説明を追加

各ページ・セクションの先頭に、カブ博士の説明カードを設置すること。

### 共通コンポーネント関数

```python
def character_explain(character_path: str, message: str, bg_color: str = "#FFF9F0"):
    """キャラクターの吹き出し説明カード"""
    char_b64 = get_image_base64(character_path)
    st.markdown(f"""
    <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      background: {bg_color};
      border-radius: 20px;
      padding: 16px 20px;
      margin-bottom: 20px;
      border: 2px solid #FFE082;
    ">
      <img src="data:image/png;base64,{char_b64}" 
           style="width: 70px; flex-shrink: 0;">
      <div style="
        background: white;
        border-radius: 12px 12px 12px 4px;
        padding: 12px 16px;
        font-size: 0.9rem;
        line-height: 1.7;
        border: 1px solid #eee;
        flex: 1;
      ">{message}</div>
    </div>
    """, unsafe_allow_html=True)
```

### 各ページの説明テキスト

#### 🏠 ホームページ
```python
character_explain(
    CHARA["hakase"],
    "こんにちは！わたしはカブ博士じゃ🌿<br>"
    "このサイトでは、<b>株のことをゲーム感覚で学べる</b>ぞ！<br>"
    "まずは「AI株診断」でキミに合う株を見つけてみよう✨",
    bg_color="#F0FFF4"
)
```

#### 🔍 探す・シミュレーションページ
```python
character_explain(
    CHARA["maneta"],
    "気になる会社の名前を入れてみよう！<br>"
    "トヨタ、Apple、ソニーなんでもOK🔍<br>"
    "その会社の今の株価やAI評価がすぐわかるよ！",
    bg_color="#F0F8FF"
)
```

#### 銘柄検索結果が表示されたとき
```python
character_explain(
    CHARA["hakase"],
    f"<b>{company_name}</b>の情報じゃ📊<br>"
    "グラフで値動きが確認できるし、<br>"
    "「かったことにする」で<b>仮想で投資体験</b>もできるぞ！",
    bg_color="#FFF9F0"
)
```

#### 📈 ランキングセクション
```python
character_explain(
    CHARA["hikari"],
    "今日上がってる株のランキングだよ📈<br>"
    "上昇率が高い株は注目されてる証拠！<br>"
    "でも<b>ランキング上位だからって必ず上がるわけじゃない</b>から注意してね😊",
    bg_color="#FFF0F8"
)
```

#### 💰 仮想購入・おさいふセクション
```python
character_explain(
    CHARA["maneta"],
    "ここでは<b>仮想のお金で株を買う体験</b>ができるよ！<br>"
    "実際のお金は1円も使わないから安心してね🙌<br>"
    "買った後に値段が上がったり下がったりするのを見てみよう！",
    bg_color="#F0FFF4"
)
```

#### 📖 学ぶ・遊ぶページ
```python
character_explain(
    CHARA["hakase"],
    "株のことをマンガで楽しく学べるページじゃ📚<br>"
    "「株ってなに？」「配当金ってなに？」<br>"
    "<b>むずかしい言葉もぜんぶわかりやすく説明するぞ！</b>",
    bg_color="#F5F0FF"
)
```

#### ❓ クイズページ
```python
character_explain(
    CHARA["hikari"],
    "株クイズに挑戦しよう！🎯<br>"
    "全問正解したら<b>投資上級者</b>への第一歩✨<br>"
    "わからなくてもOK、カブ博士が解説してくれるよ！",
    bg_color="#FFF5F0"
)
```

---

## 改善③：ニュース欄のレイアウト改善

### 問題
- 文字数の割に余白が大きすぎる
- 画像がなくて殺風景

### 修正内容

`modules/news_unit.py` のカードデザインを以下に変更：

```python
def render_news(news_list: list):
    st.markdown('<div class="section-title">📰 今日の株ニュース</div>', 
                unsafe_allow_html=True)
    
    # カブ博士の説明
    character_explain(
        CHARA["hakase"],
        "株のニュースは値動きに直結するぞ！<br>"
        "「30秒解説」ボタンを押すと、<b>むずかしい内容をカンタンに説明</b>してくれるよ📰",
        bg_color="#F0FFF4"
    )
    
    for i, news in enumerate(news_list):
        tag_html = "".join([
            f'<span style="background:#FFE66D; border-radius:20px; padding:2px 10px; '
            f'font-size:0.75rem; font-weight:700; margin-right:4px;">{tag}</span>'
            for tag in news["tags"]
        ])
        
        st.markdown(f"""
        <div class="kabu-card" style="padding: 14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div style="flex:1;">
              <div style="margin-bottom: 8px;">{tag_html}</div>
              <div style="font-weight: 700; font-size: 0.95rem; line-height:1.5; margin-bottom:6px;">
                {news['title']}
              </div>
              <div style="font-size: 0.75rem; color: #aaa;">{news['time']}</div>
            </div>
            <a href="{news['url']}" target="_blank" rel="noopener"
               style="
                 background: #4ECDC4; color: white; border-radius: 20px;
                 padding: 6px 14px; font-size: 0.78rem; font-weight: 700;
                 text-decoration: none; white-space: nowrap; flex-shrink:0;
               ">詳しく見る →</a>
          </div>
        </div>
        """, unsafe_allow_html=True)
        
        # AIで30秒解説ボタン
        if st.button(f"🤖 AIで30秒解説", key=f"news_ai_{i}"):
            with st.spinner("カブ博士が解説中..."):
                # AI解説（既存のAI評価機能を流用）
                st.info(f"📌 **{news['title']}**\n\n"
                        "（ここにAI解説が入ります）")
```

---

## 改善④：AI診断 → NISA解説ページへの遷移

### 修正内容

`modules/diagnosis_unit.py` の診断結果表示部分に、
診断タイプに応じた解説ページへの遷移ボタンを追加する。

```python
# 診断タイプ別の遷移先コンテンツ定義
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

# 診断結果表示後に追加
diagnosis_type = st.session_state.get("diagnosis_result_type", "バランス型")
learn_info = DIAGNOSIS_LEARN_MAP.get(diagnosis_type, DIAGNOSIS_LEARN_MAP["バランス型"])

# ヒカリのメッセージ
hikar_b64 = get_image_base64(CHARA["hikari"])
st.markdown(f"""
<div style="
  display:flex; align-items:center; gap:16px;
  background: #F0FFF8; border-radius:20px; padding:16px 20px;
  border: 2px solid #4ECDC4; margin-top: 16px;
">
  <img src="data:image/png;base64,{hikar_b64}" style="width:60px; flex-shrink:0;">
  <div>
    <div style="font-size:0.9rem; line-height:1.7;">{learn_info['message']}</div>
  </div>
</div>
""", unsafe_allow_html=True)

# 学習ページへ遷移ボタン
if st.button(learn_info["label"], use_container_width=True, type="primary"):
    st.session_state.current_page = "learn"
    st.session_state.learn_topic = learn_info["topic"]  # 学ぶページで該当セクションを開く
    st.rerun()
```

### 学ぶページ側の対応

`modules/manga_unit.py` の先頭で、`learn_topic` が指定されている場合は
該当エピソードを自動的に開いた状態にすること：

```python
# learn_topic が session_state にある場合、該当エピソードにスクロール
topic_to_ep = {
    "nisa":     3,   # エピソード3「NISAってなに？」
    "dividend": 2,   # エピソード2「配当金ってなに？」
    "growth":   4,   # エピソード4「成長株ってなに？」
}

auto_open_ep = topic_to_ep.get(st.session_state.get("learn_topic"), None)

for ep in manga_episodes:
    is_open = (auto_open_ep == ep["ep"])
    with st.expander(f"第{ep['ep']}話：{ep['title']}", expanded=is_open):
        render_manga(ep)

# 遷移後はlearn_topicをクリア
if "learn_topic" in st.session_state:
    del st.session_state["learn_topic"]
```

### manga_episodesにNISA・成長株エピソードを追加

```python
# 既存の3エピソードに追加
{
    "ep": 4, "title": "NISAってなに？",
    "content": [
        {"speaker": "マネ太", "side": "left",
         "text": "ヒカリちゃん、NISAってよく聞くけどなに？"},
        {"speaker": "ヒカリ", "side": "right",
         "text": "NISAはね、株で儲かったお金に税金がかからない特別な口座のことだよ！"},
        {"speaker": "マネ太", "side": "left",
         "text": "税金がかからないの！？それすごい！"},
        {"speaker": "カブ博士", "side": "right",
         "text": "普通は利益の約20%が税金で取られるんじゃが…NISAならそれがゼロ！"},
        {"speaker": "マネ太", "side": "left",
         "text": "100万円儲かったら20万円も税金で消えるの！？"},
        {"speaker": "ヒカリ", "side": "right",
         "text": "そう！だからNISAを使わないともったいないんだよ✨まず証券口座を開いてみよう！"},
    ]
},
{
    "ep": 5, "title": "成長株ってなに？",
    "content": [
        {"speaker": "マネ太", "side": "left",
         "text": "成長株って、普通の株と何がちがうの？"},
        {"speaker": "ヒカリ", "side": "right",
         "text": "グングン大きくなってる会社の株のこと！NVIDIAとかメルカリとか"},
        {"speaker": "マネ太", "side": "left",
         "text": "大きく増えそうでいいじゃん！"},
        {"speaker": "カブ博士", "side": "right",
         "text": "ただしリスクも大きいぞ…急落することもある。NVIDIAも一時-50%になったことがあるんじゃ"},
        {"speaker": "マネ太", "side": "left",
         "text": "え、半分になるの！？こわい…"},
        {"speaker": "ヒカリ", "side": "right",
         "text": "だから成長株は「余裕のあるお金」で、少しずつ買うのが大事だよ📊"},
    ]
},
```

---

## 改善⑤：ホームのトップビューにグラフを追加

### 問題
- ヒーローエリアが絵文字だけで味気ない
- 「株サイト」感が薄い

### 修正内容

ヒーローエリアの下に「今日のマーケットサマリー」グラフを追加する。

```python
import plotly.graph_objects as go
import yfinance as yf

def render_market_hero():
    """ホームのヒーローエリア + ミニグラフ"""
    
    # キャラクター＋キャッチコピー（既存）
    hakase_b64 = get_image_base64(CHARA["hakase"])
    maneta_b64 = get_image_base64(CHARA["maneta"])
    
    st.markdown(f"""
    <div class="page-content" style="
      background: linear-gradient(135deg, #FFE8E8 0%, #E8FFF8 100%);
      border-radius: 24px;
      padding: 28px 24px 20px;
      margin-bottom: 16px;
    ">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
        <img src="data:image/png;base64,{hakase_b64}" 
             class="kaburun" style="width:80px; flex-shrink:0;">
        <div>
          <h1 style="font-size:1.6rem; margin:0 0 6px;">株って、楽しいかも！🌟</h1>
          <p style="color:#636E72; margin:0; font-size:0.9rem;">
            AIがぜんぶ教えてくれるから、むずかしくないよ
          </p>
        </div>
        <img src="data:image/png;base64,{maneta_b64}" 
             style="width:60px; flex-shrink:0; margin-left:auto;">
      </div>
    </div>
    """, unsafe_allow_html=True)
    
    # AI診断ボタン
    if st.button("🔍 AI株診断をスタート →", use_container_width=True, type="primary"):
        st.session_state.show_diagnosis = True
        st.rerun()
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # 今日のマーケットミニグラフ（3列）
    st.markdown('<div class="section-title">📊 今日のマーケット</div>', 
                unsafe_allow_html=True)
    
    indices = {
        "日経225 🇯🇵": "^N225",
        "S&P500 🇺🇸":  "^GSPC",
        "ドル円 💴":    "JPY=X",
    }
    
    cols = st.columns(3)
    for col, (label, ticker) in zip(cols, indices.items()):
        with col:
            try:
                hist = yf.Ticker(ticker).history(period="1mo")["Close"]
                price  = hist.iloc[-1]
                prev   = hist.iloc[-2]
                change = (price - prev) / prev * 100
                color  = "#00B894" if change >= 0 else "#FF7675"
                arrow  = "▲" if change >= 0 else "▼"
                
                # Plotlyミニチャート
                fig = go.Figure()
                fig.add_trace(go.Scatter(
                    y=hist.values,
                    mode="lines",
                    line=dict(color=color, width=2),
                    fill="tozeroy",
                    fillcolor=f"rgba{'(0,184,148,0.15)' if change >= 0 else '(255,118,117,0.15)'}",
                ))
                fig.update_layout(
                    height=80,
                    margin=dict(l=0, r=0, t=0, b=0),
                    showlegend=False,
                    xaxis=dict(visible=False),
                    yaxis=dict(visible=False),
                    plot_bgcolor="rgba(0,0,0,0)",
                    paper_bgcolor="rgba(0,0,0,0)",
                )
                
                st.markdown(f"""
                <div class="kabu-card" style="text-align:center; padding:12px 8px 4px;">
                  <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">{label}</div>
                  <div style="font-size:1.1rem; font-weight:800;">{price:,.1f}</div>
                  <div style="font-size:0.8rem; color:{color}; font-weight:700;">
                    {arrow} {change:+.2f}%
                  </div>
                """, unsafe_allow_html=True)
                st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})
                st.markdown("</div>", unsafe_allow_html=True)
                
            except Exception:
                col.markdown(f"**{label}**\n\nデータ取得中...")
```

---

## 注意事項

- `plotly` が未インストールの場合は `pip install plotly` を実行すること
- イラストのパス：`D:\Antigravity\Kabu\illust\`
- アイコンのパス：`D:\Antigravity\Kabu\illust\icons\`
- `CHARA` 辞書・`get_image_base64()`・`chara_img()`・`icon_img()` は `app.py` の先頭で定義し、全モジュールから `from app import ...` でインポートして使うこと
- 画像ファイルが存在しない場合は `chara_img()` が絵文字で自動代替するのでエラーにならない
- キャラクター画像は背景が白/薄い色なので、カラフルな背景カードの上に置いてもなじむはず
- スマホ（幅375px）でキャラ画像が大きすぎないよう `width: 60px` を基本にすること
