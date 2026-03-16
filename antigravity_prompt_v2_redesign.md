# Antigravity 実装プロンプト
## ビジュアルリデザイン＋新機能追加

---

## 方向性・ゴール

**「株が怖い」を「株って楽しそう！」に変えるサイト**

ターゲット：子ども・女性・株初心者
トーン：ワイワイ・ポップ・やさしい・楽しい
参考イメージ：ほけんの窓口、いぬまにスマホ、Duolingo（ゲーム感覚で学べる）

---

## 実装①：サイト全体のビジュアルリデザイン

### style.css を全面的に更新してください

#### カラーパレット

```css
:root {
  --primary:     #FF6B6B;   /* あたたかいコーラルレッド（メインアクション） */
  --secondary:   #FFE66D;   /* 明るいイエロー（アクセント） */
  --accent:      #4ECDC4;   /* ミントグリーン（サブアクション） */
  --bg-main:     #FFF9F0;   /* クリーム白（背景） */
  --bg-card:     #FFFFFF;   /* カード背景 */
  --text-main:   #2D3436;   /* メインテキスト */
  --text-soft:   #636E72;   /* サブテキスト */
  --success:     #00B894;   /* プラス・上昇 */
  --danger:      #FF7675;   /* マイナス・下落 */
}
```

#### フォント

```css
/* Google Fontsから読み込み */
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

body {
  font-family: 'Zen Maru Gothic', sans-serif;  /* 丸みのある親しみやすいフォント */
}

h1, h2, h3 {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 700;
}
```

#### カード・ボタンのデザイン

```css
/* カードに丸みと影 */
.card {
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border: 2px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

/* ボタンはふっくら */
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
.btn-primary:hover {
  transform: scale(1.05);
}
```

#### セクションタイトルのデザイン

各セクションの見出しに絵文字＋丸いバッジスタイルを使う。

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

## 実装②：イラスト・キャラクターの追加

### assets/ フォルダに以下のSVGイラストを作成してください

#### ① マスコットキャラ「かぶるん」

`assets/kaburun.svg` を新規作成。

仕様：
- シンプルな丸い動物キャラ（たぬきかクマ系）
- 頭に株のチャート帽子をかぶっている
- 表情は笑顔・ウインク・驚きの3パターン

使用箇所：
- ページ上部のウェルカムメッセージ横
- AI診断の回答中
- 仮想投資でプラスになったとき（喜ぶ表情）

#### ② セクション装飾イラスト

以下のSVGアイコンを `assets/icons/` に作成：

- `icon_chart.svg`：かわいいグラフのイラスト
- `icon_coin.svg`：コインが飛んでいるイラスト
- `icon_news.svg`：新聞を読むキャラ
- `icon_study.svg`：本を読むキャラ（マンガページ用）

---

## 実装③：新セクション「株式ニュース」

### ファイル：`modules/news_unit.py` を新規作成

#### 表示仕様

- セクション名：「📰 今日の株ニュース」
- カードリスト形式で5件表示
- 各カードに含む情報：
  - ニュースタイトル
  - 関連銘柄タグ（例：「#トヨタ」「#半導体」）
  - 「AIで30秒解説」ボタン → クリックするとAIが初心者向けに解説
  - 公開時間（例：「2時間前」）

#### モックデータ（まずこれで実装）

```python
mock_news = [
    {
        "title": "トヨタ、次世代EV電池の量産を2027年に開始へ",
        "tags": ["#トヨタ", "#EV", "#電池"],
        "time": "1時間前",
        "url": "https://www.nikkei.com"
    },
    {
        "title": "NVIDIA、AI半導体の新製品を発表。株価が急騰",
        "tags": ["#NVIDIA", "#半導体", "#AI"],
        "time": "3時間前",
        "url": "https://www.bloomberg.co.jp"
    },
    {
        "title": "日銀、金利政策を据え置き。市場は安堵の反応",
        "tags": ["#日銀", "#金利", "#市場"],
        "time": "5時間前",
        "url": "https://www.nikkei.com"
    },
    {
        "title": "任天堂の新ゲーム機が予約殺到。株価にも注目",
        "tags": ["#任天堂", "#ゲーム"],
        "time": "本日",
        "url": "https://www.nikkei.com"
    },
    {
        "title": "円安進行、1ドル155円台。輸出企業に追い風",
        "tags": ["#為替", "#円安", "#輸出"],
        "time": "本日",
        "url": "https://www.bloomberg.co.jp"
    },
]
```

---

## 実装④：新セクション「証券会社リンク集」

### 表示場所：ページ下部（フッター上）

#### セクション名：「🏦 口座開設してみよう！」

カード形式で以下を表示：

```python
brokers = [
    {
        "name": "SBI証券",
        "catch": "口座数No.1！初心者に人気",
        "feature": "手数料が安い・商品数が多い",
        "url": "https://www.sbisec.co.jp",
        "color": "#FF6B35"
    },
    {
        "name": "楽天証券",
        "catch": "楽天ポイントで投資できる！",
        "feature": "楽天ユーザーにおすすめ",
        "url": "https://www.rakuten-sec.co.jp",
        "color": "#BF0000"
    },
    {
        "name": "松井証券",
        "catch": "50万円まで手数料0円！",
        "feature": "少額投資を始めたい人に最適",
        "url": "https://www.matsui.co.jp",
        "color": "#003087"
    },
    {
        "name": "マネックス証券",
        "catch": "米国株に強い！",
        "feature": "NVIDIAなど米国株に投資したい人向け",
        "url": "https://www.monex.co.jp",
        "color": "#00A0E9"
    },
]
```

デザイン：
- 各カードに証券会社カラーのアクセントボーダー
- 「詳しく見る →」ボタンで外部リンク（target="_blank"）
- 「※このサイトは特定の証券会社を推薦するものではありません」という注記を小さく表示

---

## 実装⑤：新ページ「株のマンガ」タブ

### タブに「📖 マンガで学ぶ」を追加

#### ファイル：`modules/manga_unit.py` を新規作成

#### 表示仕様

マンガ風の吹き出しUIで株の基礎知識を学べるページ。

```
登場キャラクター：
- かぶるん先生（マスコット）
- はじめちゃん（初心者の女の子）
```

#### コンテンツ（各エピソードをカード形式で表示）

```python
manga_episodes = [
    {
        "ep": 1,
        "title": "株ってなに？",
        "summary": "会社の「オーナーの一部」になることを学ぼう！",
        "content": [
            {"speaker": "はじめちゃん", "text": "ねえかぶるん、株ってなに？難しそうで怖い…"},
            {"speaker": "かぶるん先生", "text": "怖くないよ！株はね、会社の「小さなかけら」を買うことなんだ🎵"},
            {"speaker": "はじめちゃん", "text": "かけら？"},
            {"speaker": "かぶるん先生", "text": "たとえばトヨタっていう大きな会社があるよね。その会社を1万個に分けたとしたら、1個買うのが「株を買う」ってこと！"},
            {"speaker": "はじめちゃん", "text": "じゃあ私もトヨタのオーナーになれるの！？"},
            {"speaker": "かぶるん先生", "text": "そういうこと！会社が成長すると、あなたの株の価値も上がるんだよ🌟"},
        ]
    },
    {
        "ep": 2,
        "title": "株価はなぜ動くの？",
        "summary": "需要と供給のしくみをマンガで理解しよう",
        "content": [
            {"speaker": "はじめちゃん", "text": "株の値段って、なんで毎日変わるの？"},
            {"speaker": "かぶるん先生", "text": "それはね、「欲しい人」と「売りたい人」の数で決まるんだ"},
            {"speaker": "はじめちゃん", "text": "どういうこと？"},
            {"speaker": "かぶるん先生", "text": "たとえばNVIDIAがすごい新製品を発表したとする。みんなが「買いたい！」ってなると…値段が上がる！"},
            {"speaker": "はじめちゃん", "text": "逆に悪いニュースだと下がるんだね"},
            {"speaker": "かぶるん先生", "text": "正解！だからニュースを見ることが大事なんだよ📰"},
        ]
    },
    {
        "ep": 3,
        "title": "配当金ってなに？",
        "summary": "持ってるだけでもらえるお小遣い！",
        "content": [
            {"speaker": "はじめちゃん", "text": "株を買ったら、あとは待つだけ？"},
            {"speaker": "かぶるん先生", "text": "実は待ってるだけでも「配当金」がもらえることがあるよ🎁"},
            {"speaker": "はじめちゃん", "text": "え！お金がもらえるの？"},
            {"speaker": "かぶるん先生", "text": "会社が儲かったとき、オーナー（株主）におすそ分けしてくれるんだ。年に1〜2回ね"},
            {"speaker": "はじめちゃん", "text": "まるで会社からのプレゼントだ！"},
            {"speaker": "かぶるん先生", "text": "そう！だからNTTとかKDDIみたいな安定した会社は配当が多くて人気なんだよ💰"},
        ]
    },
]
```

#### マンガUIのデザイン

```css
/* 吹き出しスタイル */
.speech-bubble-right {  /* キャラクターの吹き出し */
  background: #fff;
  border: 2px solid var(--primary);
  border-radius: 18px 18px 4px 18px;
  padding: 12px 16px;
  margin: 8px 0 8px 40px;
  position: relative;
  font-size: 0.95rem;
}

.speech-bubble-left {  /* はじめちゃんの吹き出し */
  background: #FFF0F0;
  border: 2px solid var(--accent);
  border-radius: 18px 18px 18px 4px;
  padding: 12px 16px;
  margin: 8px 40px 8px 0;
  font-size: 0.95rem;
}

/* キャラ名バッジ */
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

---

## app.py への追加・変更

### タブ構成を以下に更新

```
📊 市場概況 | 🔍 AI株診断 | 📈 ランキング | 🔎 銘柄を探す | 📰 ニュース | 📖 マンガで学ぶ | 🎮 投資シミュレーション | 🏫 エデュケーション | ❓ 投資クイズ
```

### ページ上部（ヒーローエリア）を変更

現在の都市写真バナーを以下に変更：

```
背景：クリーム色 + やわらかいグラデーション（左上ピンク→右下ミント）
左側：「かぶるん」のSVGキャラクター（大きめ）
右側：キャッチコピー
  「株って、楽しいかも！🌟」
  「むずかしい言葉なし。AIがぜんぶ教えてくれる！」
  [今すぐ始める →]ボタン
```

---

## 注意事項

- 既存の全機能を壊さないこと（ウォッチリスト・仮想購入・AI評価）
- 証券会社リンクはすべて `target="_blank" rel="noopener"` で開くこと
- 「投資は自己責任です」という免責事項をフッターに小さく追加すること
- モバイル（スマホ）でも崩れないようにすること
- マンガページはエピソードをアコーディオン形式で開閉できるようにすること
