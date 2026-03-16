# Antigravity 実装プロンプト
## フェーズ5：大幅リニューアル（Claude案 + Gemini案 統合版）

---

## ゴール・方向性

**「株が怖い」→「株って楽しそう！」に変えるアプリ**

- ターゲット：子ども・女性・株初心者
- トーン：ワイワイ・ポップ・やさしい・ゲーム感覚
- 参考：Duolingo（シンプルな導線＋キャラ＋達成感）

---

## 【構造変更】9タブ → 3ページ構成に変更

### app.py のナビゲーション構造を以下に変更してください

サイドバーに大きく3つのページボタンを配置する。
タブは廃止し、ページ単位で画面を切り替える。

```python
# st.session_state['current_page'] で現在のページを管理
# 初期値は 'home'

pages = {
    "home":     {"label": "🏠 ホーム",             "desc": "ニュース・AI診断・市場"},
    "explore":  {"label": "🔍 探す・シミュレーション", "desc": "ランキング・銘柄検索・投資"},
    "learn":    {"label": "📖 学ぶ・遊ぶ",           "desc": "マンガ・クイズ・エデュケーション"},
}
```

### 各ページのコンテンツ構成

#### 🏠 ホーム
1. ヒーローエリア（かぶるん＋キャッチコピー＋AI診断ボタン）
2. 今日の株ニュース（3件）
3. 市場概況（S&P500・NASDAQ・日経）
4. 証券会社リンク集

#### 🔍 探す・シミュレーション
1. ランキング（上昇・配当・割安）
2. テーマ株
3. 銘柄検索・AI評価
4. 投資シミュレーション（仮想購入・ウォッチリスト）

#### 📖 学ぶ・遊ぶ
1. マンガで学ぶ（かぶるんとはじめちゃんのマンガ）
2. 投資クイズ
3. エデュケーション

---

## 【デザイン】style.css を全面書き換え

### カラーパレット

```css
:root {
  --primary:   #FF6B6B;
  --secondary: #FFE66D;
  --accent:    #4ECDC4;
  --bg-main:   #FFF9F0;
  --bg-card:   #FFFFFF;
  --text-main: #2D3436;
  --text-soft: #636E72;
  --success:   #00B894;
  --danger:    #FF7675;
}
```

### フォント

```css
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

body        { font-family: 'Zen Maru Gothic', sans-serif; background: var(--bg-main); }
h1, h2, h3 { font-family: 'M PLUS Rounded 1c', sans-serif; font-weight: 700; }
```

### カード・ボタン

```css
.card {
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  background: var(--bg-card);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.14);
}

.btn-primary {
  background: var(--primary);
  border-radius: 50px;
  font-weight: 700;
  padding: 12px 28px;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s;
}
.btn-primary:hover { transform: scale(1.05); }
```

### セクションタイトル

```css
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
```

---

## 【アニメーション】マイクロインタラクションを追加

### かぶるんのふわふわアニメーション

```css
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.kaburun {
  animation: float 3s ease-in-out infinite;
}
```

### コインくるくるアニメーション（正解・利益時）

```css
@keyframes coin-spin {
  0%   { transform: rotateY(0deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.2); }
  100% { transform: rotateY(360deg) scale(1); }
}

.coin-celebrate {
  animation: coin-spin 0.6s ease-in-out;
  display: inline-block;
}
```

使用タイミング：
- クイズ正解時 → `.coin-celebrate` クラスをコインアイコンに付与
- 仮想投資でプラスになった時 → 同上
- AI診断完了時 → かぶるんを喜び表情に切り替え

### ページ遷移フェードイン

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-content {
  animation: fadeIn 0.3s ease-out;
}
```

---

## 【ホーム画面】ヒーローエリアの実装

### 都市写真バナーを廃止し、以下のヒーローエリアに置き換える

```
背景：クリームグラデーション（左上 #FFE8E8 → 右下 #E8FFF8）

左半分：
  かぶるん SVGキャラクター（大きめ・ふわふわアニメ付き）

右半分：
  「株って、楽しいかも！🌟」     ← 大きい見出し
  「AIがぜんぶ教えてくれるから、むずかしくないよ」 ← サブコピー
  [🔍 AI株診断をスタート →]ボタン  ← 一番大きく・目立つ色
```

ホームのコンテンツ優先順位：
1. ヒーローエリア（かぶるん＋AI診断ボタン） ← 最重要
2. 今日のニュース3件
3. 市場概況
4. 証券会社リンク

---

## 【SVGキャラクター】かぶるん を作成

`assets/kaburun.svg` を新規作成してください。

仕様：
- 丸くてかわいい動物（タヌキかクマ系）
- 頭に株チャートの帽子
- 表情3種類：通常（笑顔）・喜び（ウインク＋ガッツポーズ）・考え中（？マーク）
- Pythonから表情を切り替えられるよう、各表情をSVGの `<g id="face_normal">` `<g id="face_happy">` `<g id="face_thinking">` で管理

---

## 【新機能】株式ニュースセクション

`modules/news_unit.py` を新規作成。

```python
mock_news = [
    {"title": "トヨタ、次世代EV電池の量産を2027年に開始へ",
     "tags": ["#トヨタ", "#EV"], "time": "1時間前", "url": "https://www.nikkei.com"},
    {"title": "NVIDIA、AI半導体の新製品を発表。株価が急騰",
     "tags": ["#NVIDIA", "#半導体", "#AI"], "time": "3時間前", "url": "https://www.bloomberg.co.jp"},
    {"title": "日銀、金利政策を据え置き。市場は安堵の反応",
     "tags": ["#日銀", "#金利"], "time": "5時間前", "url": "https://www.nikkei.com"},
]
```

各カードに「AIで30秒解説」ボタンを設置。クリックで初心者向け解説を表示。

---

## 【新機能】証券会社リンク集（バッジ付き）

ホームページ下部に配置。

```python
brokers = [
    {
        "name": "SBI証券",
        "catch": "口座数No.1！",
        "tags": ["🔰 初心者向け", "💰 手数料最安級"],
        "url": "https://www.sbisec.co.jp",
        "color": "#FF6B35"
    },
    {
        "name": "楽天証券",
        "catch": "ポイントで投資できる！",
        "tags": ["🔰 初心者向け", "🛒 楽天ユーザー向け"],
        "url": "https://www.rakuten-sec.co.jp",
        "color": "#BF0000"
    },
    {
        "name": "松井証券",
        "catch": "50万円まで手数料0円！",
        "tags": ["💡 少額投資向け"],
        "url": "https://www.matsui.co.jp",
        "color": "#003087"
    },
    {
        "name": "マネックス証券",
        "catch": "米国株に強い！",
        "tags": ["🌎 米国株向け", "📱 アプリ最強"],
        "url": "https://www.monex.co.jp",
        "color": "#00A0E9"
    },
]
```

バッジデザイン：
```css
.broker-tag {
  background: var(--secondary);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  margin: 2px;
}
```

免責注記：「※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。」

---

## 【新機能】マンガで学ぶページ

`modules/manga_unit.py` を新規作成。

登場キャラ：かぶるん先生 × はじめちゃん（初心者女の子）

```python
manga_episodes = [
    {
        "ep": 1, "title": "株ってなに？",
        "content": [
            {"speaker": "はじめちゃん", "text": "ねえかぶるん、株ってなに？難しそうで怖い…"},
            {"speaker": "かぶるん先生", "text": "怖くないよ！株はね、会社の「小さなかけら」を買うことなんだ🎵"},
            {"speaker": "はじめちゃん", "text": "かけら？"},
            {"speaker": "かぶるん先生", "text": "トヨタを1万個に分けたとしたら、1個買うのが「株を買う」ってこと！"},
            {"speaker": "はじめちゃん", "text": "じゃあ私もトヨタのオーナーになれるの！？"},
            {"speaker": "かぶるん先生", "text": "そういうこと！会社が成長すると、あなたの株の価値も上がるんだよ🌟"},
        ]
    },
    {
        "ep": 2, "title": "株価はなぜ動くの？",
        "content": [
            {"speaker": "はじめちゃん", "text": "株の値段って、なんで毎日変わるの？"},
            {"speaker": "かぶるん先生", "text": "「欲しい人」と「売りたい人」の数で決まるんだ"},
            {"speaker": "はじめちゃん", "text": "どういうこと？"},
            {"speaker": "かぶるん先生", "text": "NVIDIAがすごい新製品を発表したとする。みんなが「買いたい！」ってなると…値段が上がる！"},
            {"speaker": "はじめちゃん", "text": "逆に悪いニュースだと下がるんだね"},
            {"speaker": "かぶるん先生", "text": "正解！だからニュースを見ることが大事なんだよ📰"},
        ]
    },
    {
        "ep": 3, "title": "配当金ってなに？",
        "content": [
            {"speaker": "はじめちゃん", "text": "株を買ったら、あとは待つだけ？"},
            {"speaker": "かぶるん先生", "text": "待ってるだけでも「配当金」がもらえることがあるよ🎁"},
            {"speaker": "はじめちゃん", "text": "え！お金がもらえるの？"},
            {"speaker": "かぶるん先生", "text": "会社が儲かったとき、株主におすそ分けしてくれるんだ。年に1〜2回ね"},
            {"speaker": "はじめちゃん", "text": "会社からのプレゼントだ！"},
            {"speaker": "かぶるん先生", "text": "NTTやKDDIみたいな安定した会社は配当が多くて人気なんだよ💰"},
        ]
    },
]
```

吹き出しCSS：
```css
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
```

エピソードはアコーディオン形式で開閉できるようにすること。

---

## 注意事項

- 既存機能（ウォッチリスト・仮想購入・AI評価・クイズ）を壊さないこと
- 証券会社リンクは `target="_blank" rel="noopener"` で開くこと
- フッターに「投資は自己責任です」の免責事項を追加
- スマホ（幅375px〜）でも崩れないレスポンシブ対応
- `st.session_state['current_page']` でページ管理し、ページ切り替え時に `fadeIn` アニメーションを適用
