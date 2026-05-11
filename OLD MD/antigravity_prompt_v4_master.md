# KABU PORTAL v4 — Antigravity 実装用マスタープロンプト
## Claude × ChatGPT × Gemini 統合版（Streamlit完全対応）

---

## 1. プロジェクト概要

株初心者をターゲットにした「Duolingo風の楽しく学べる株ポータル」を構築する。

- **技術スタック**: Python / Streamlit / yfinance
- **スタイリング**: `st.markdown()` + カスタムCSS（※StreamlitはTailwind CSS非対応のため使用しない）
- **デザイン**: ポップ・パステルカラー・スマホ最適化
- **構成**: 3ページ（ホーム / 探す・シミュレーション / 学ぶ・遊ぶ）

---

## 2. ディレクトリ構造

```
project/
├── app.py                 # メインエントリー（ページルーティング管理）
├── style.css              # カスタムCSS（アニメーション含む）
├── assets/
│   └── kaburun.svg        # マスコット「かぶるん」のSVGデータ
├── modules/
│   ├── market_data.py     # yfinanceを使ったデータ取得
│   ├── news_unit.py       # ニュース表示
│   ├── manga_unit.py      # マンガ風解説UI
│   ├── diagnosis_unit.py  # AI株診断
│   └── simulation.py      # 仮想投資・ウォッチリスト
```

---

## 3. 状態管理（st.session_state）

`app.py` の冒頭で必ず以下を初期化すること：

```python
defaults = {
    "current_page": "home",
    "portfolio":    [],
    "watchlist":    [],
    "balance":      1_000_000,
    "diagnosis_step":    0,
    "diagnosis_answers": [],
    "diagnosis_result":  None,
}
for key, val in defaults.items():
    if key not in st.session_state:
        st.session_state[key] = val
```

---

## 4. ナビゲーション構造

### ⚠️ 重要：Streamlitの制約について

- **Tailwind CSS は使用不可**（StreamlitはHTMLを直接レンダリングしないため）
- **ボトムナビゲーションは実装不可**（Streamlitの構造上、固定フッターは不安定）
- **代替案（以下を採用する）**：
  - サイドバーにページナビゲーションボタンを配置
  - ページ上部にも横並びボタンを`st.columns()`で表示

### サイドバー実装

```python
with st.sidebar:
    st.markdown("## 🐾 KABU PORTAL")
    st.markdown("---")
    
    pages = [
        ("🏠", "ホーム",              "home"),
        ("🔍", "探す・シミュレーション", "explore"),
        ("📖", "学ぶ・遊ぶ",           "learn"),
    ]
    
    for icon, label, key in pages:
        is_active = st.session_state.current_page == key
        btn_style = "primary" if is_active else "secondary"
        if st.button(f"{icon} {label}", key=f"nav_{key}", use_container_width=True, type=btn_style):
            st.session_state.current_page = key
            st.rerun()
```

### ページ上部のナビボタン（スマホ向け補助）

```python
col1, col2, col3 = st.columns(3)
with col1:
    if st.button("🏠 ホーム", use_container_width=True):
        st.session_state.current_page = "home"; st.rerun()
with col2:
    if st.button("🔍 探す", use_container_width=True):
        st.session_state.current_page = "explore"; st.rerun()
with col3:
    if st.button("📖 学ぶ", use_container_width=True):
        st.session_state.current_page = "learn"; st.rerun()
```

---

## 5. スタイリング（style.css）

### CSSの読み込み方法（Streamlit標準の方法）

```python
# app.py の先頭で実行
def load_css():
    with open("style.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

load_css()
```

### style.css の内容

```css
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

:root {
  --primary:   #FF6B6B;
  --secondary: #FFE66D;
  --accent:    #4ECDC4;
  --bg-main:   #FFF9F0;
  --text-main: #2D3436;
  --success:   #00B894;
  --danger:    #FF7675;
}

body, .stApp {
  font-family: 'Zen Maru Gothic', sans-serif !important;
  background-color: var(--bg-main) !important;
}

h1, h2, h3 {
  font-family: 'M PLUS Rounded 1c', sans-serif !important;
  font-weight: 700 !important;
}

/* カード */
.kabu-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin-bottom: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kabu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.13);
}

/* セクションタイトル */
.section-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--secondary);
  border-radius: 50px;
  padding: 6px 18px;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 16px;
}

/* かぶるんふわふわ */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
.kaburun { animation: float 3s ease-in-out infinite; }

/* コインくるくる（正解・利益時） */
@keyframes coin-spin {
  0%   { transform: rotateY(0deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.3); }
  100% { transform: rotateY(360deg) scale(1); }
}
.coin-celebrate { animation: coin-spin 0.6s ease-in-out; display: inline-block; }

/* ページフェードイン */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.page-content { animation: fadeIn 0.3s ease-out; }

/* マンガ吹き出し */
.bubble-left {
  background: #FFF0F0;
  border: 2px solid var(--accent);
  border-radius: 18px 18px 18px 4px;
  padding: 12px 16px;
  margin: 8px 40px 8px 0;
}
.bubble-right {
  background: #fff;
  border: 2px solid var(--primary);
  border-radius: 18px 18px 4px 18px;
  padding: 12px 16px;
  margin: 8px 0 8px 40px;
}
.speaker-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--secondary);
  border-radius: 20px;
  padding: 2px 10px;
  margin-bottom: 4px;
  display: inline-block;
}

/* 証券会社バッジ */
.broker-tag {
  background: var(--secondary);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  margin: 2px;
}

/* スマホ対応 */
@media (max-width: 480px) {
  .kabu-card { padding: 14px; border-radius: 14px; }
  h1 { font-size: 1.4rem !important; }
  h2 { font-size: 1.1rem !important; }
}
```

---

## 6. データ取得（modules/market_data.py）

```python
import yfinance as yf

def get_indices():
    tickers = {"日経225": "^N225", "S&P500": "^GSPC", "ドル円": "JPY=X"}
    result = {}
    for name, ticker in tickers.items():
        try:
            data = yf.Ticker(ticker).fast_info
            result[name] = {
                "price": round(data.last_price, 2),
                "change_pct": round((data.last_price - data.previous_close) / data.previous_close * 100, 2)
            }
        except:
            result[name] = {"price": "---", "change_pct": 0}
    return result

def get_stock_info(ticker: str):
    try:
        t = yf.Ticker(ticker)
        info = t.fast_info
        hist = t.history(period="1y")
        return {
            "name":       t.info.get("longName", ticker),
            "price":      round(info.last_price, 2),
            "change_pct": round((info.last_price - info.previous_close) / info.previous_close * 100, 2),
            "history":    hist["Close"],
        }
    except:
        return None
```

---

## 7. ホームページ

ホームの優先順位：
1. ヒーローエリア（かぶるん＋「AI診断」ボタン）← 最重要・最大表示
2. 今日のニュース（3件）
3. 市場概況（日経・S&P500・ドル円）
4. 証券会社リンク集

### ヒーローエリアのHTML

```python
st.markdown("""
<div class="page-content kabu-card" style="
  background: linear-gradient(135deg, #FFE8E8 0%, #E8FFF8 100%);
  text-align: center; padding: 32px;">
  <div class="kaburun" style="font-size: 80px;">🐾</div>
  <h1 style="font-size:1.8rem; margin:12px 0 8px;">株って、楽しいかも！🌟</h1>
  <p style="color:#636E72; margin-bottom:20px;">
    AIがぜんぶ教えてくれるから、むずかしくないよ
  </p>
</div>
""", unsafe_allow_html=True)

if st.button("🔍 AI株診断をスタート →", use_container_width=True, type="primary"):
    st.session_state.current_page = "home"
    st.session_state.diagnosis_step = 0
    st.rerun()
```

---

## 8. 証券会社リンク集

```python
brokers = [
    {"name": "SBI証券",     "catch": "口座数No.1！",        "tags": ["🔰 初心者向け", "💰 手数料最安級"], "url": "https://www.sbisec.co.jp",      "color": "#FF6B35"},
    {"name": "楽天証券",    "catch": "ポイントで投資！",     "tags": ["🔰 初心者向け", "🛒 楽天ユーザー向け"], "url": "https://www.rakuten-sec.co.jp", "color": "#BF0000"},
    {"name": "松井証券",    "catch": "50万円まで手数料0円", "tags": ["💡 少額投資向け"],                   "url": "https://www.matsui.co.jp",      "color": "#003087"},
    {"name": "マネックス証券","catch": "米国株に強い！",     "tags": ["🌎 米国株向け", "📱 アプリ最強"],     "url": "https://www.monex.co.jp",       "color": "#00A0E9"},
]
```

免責表示：`※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。`

---

## 9. マンガページ（modules/manga_unit.py）

登場キャラ：かぶるん先生 × はじめちゃん

エピソード一覧（アコーディオン形式で開閉）：

```python
manga_episodes = [
    {
        "ep": 1, "title": "株ってなに？",
        "content": [
            {"speaker": "はじめちゃん", "side": "left",  "text": "ねえかぶるん、株ってなに？難しそうで怖い…"},
            {"speaker": "かぶるん先生", "side": "right", "text": "怖くないよ！株はね、会社の「小さなかけら」を買うことなんだ🎵"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "かけら？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "トヨタを1万個に分けたとしたら、1個買うのが「株を買う」ってこと！"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "じゃあ私もトヨタのオーナーになれるの！？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "そういうこと！会社が成長すると、あなたの株の価値も上がるんだよ🌟"},
        ]
    },
    {
        "ep": 2, "title": "株価はなぜ動くの？",
        "content": [
            {"speaker": "はじめちゃん", "side": "left",  "text": "株の値段って、なんで毎日変わるの？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "「欲しい人」と「売りたい人」の数で決まるんだ"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "どういうこと？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "NVIDIAが新製品発表→みんなが「買いたい！」→値段が上がる！"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "逆に悪いニュースだと下がるんだね"},
            {"speaker": "かぶるん先生", "side": "right", "text": "正解！だからニュースを見ることが大事なんだよ📰"},
        ]
    },
    {
        "ep": 3, "title": "配当金ってなに？",
        "content": [
            {"speaker": "はじめちゃん", "side": "left",  "text": "株を買ったら、あとは待つだけ？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "待ってるだけでも「配当金」がもらえることがあるよ🎁"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "え！お金がもらえるの？"},
            {"speaker": "かぶるん先生", "side": "right", "text": "会社が儲かったとき、株主におすそ分けしてくれるんだ。年に1〜2回ね"},
            {"speaker": "はじめちゃん", "side": "left",  "text": "会社からのプレゼントだ！"},
            {"speaker": "かぶるん先生", "side": "right", "text": "NTTやKDDIみたいな安定した会社は配当が多くて人気なんだよ💰"},
        ]
    },
]
```

吹き出しの描画：

```python
def render_manga(episode):
    for line in episode["content"]:
        side = line["side"]
        css_class = "bubble-right" if side == "right" else "bubble-left"
        st.markdown(f"""
        <div>
          <span class="speaker-badge">{line['speaker']}</span>
          <div class="{css_class}">{line['text']}</div>
        </div>
        """, unsafe_allow_html=True)
```

---

## 10. 実装順序

Antigravityへの指示順序（この順で実行させること）：

1. `style.css` の作成とCSSアニメーション実装
2. `app.py` の骨格（session_state初期化・3ページルーティング・CSS読み込み）
3. `modules/market_data.py`（yfinanceデータ取得）
4. ホームページの実装（ヒーロー→ニュース→市場概況→証券会社）
5. `modules/manga_unit.py` と学ぶページ
6. `modules/diagnosis_unit.py` とAI株診断
7. 探すページ（ランキング・テーマ株・銘柄検索・シミュレーション）

---

## 注意事項

- **Tailwind CSSは一切使用しない**（Streamlit非対応）
- **ボトムナビゲーションは実装しない**（Streamlitで不安定になるため）
- 既存機能（ウォッチリスト・仮想購入・AI評価・クイズ）を壊さないこと
- 証券会社リンクは `target="_blank" rel="noopener"` で開くこと
- スマホ（幅375px〜）でも崩れないCSSを書くこと
- フッターに免責事項を必ず追加すること
