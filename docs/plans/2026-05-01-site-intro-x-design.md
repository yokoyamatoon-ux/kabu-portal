# Design Doc: X Posting - Site Renewal & Latest Content Introduction

## 1. Goal
Introduce the refreshed "Okane no Manabiba" portal to X (Twitter) followers, highlighting recent UI improvements and high-value latest content (Nikkei 60k, Sake brewery investment scam) to drive traffic and engagement.

## 2. Persona & Tone
- **Character**: Kabu-sensei (Friendly old teacher)
- **Voice**: "フォッフォッフォ！", "～ぞい", "～じゃ", "～のう"
- **Account**: @TooNScriptStore

## 3. Posting Strategy
- **Format**: Thread (Parent Tweet + Reply Tweet)
- **URL Rule**: No URL in parent tweet (to avoid shadowban/lower reach), include URL in the reply tweet.
- **Images**: 4 high-quality existing images from the site.

## 4. Content Design

### Parent Tweet (Announcement & Updates)
> フォッフォッフォ！わしの「お金の学校」をプチ更新したぞい！🥬✨
> 
> ✅PC版：ワイド画面でもスッキリ🖥️
> ✅スマホ版：最新相場がパッと見やすく📱
> ✅最新記事：話題の「酒蔵投資詐欺」警告＆日経平均6万突破の解説を追加じゃ！
> 
> もっと楽しく投資を学べるぞい！🎓

### Reply Tweet (Call to Action)
> ▼新しくなった「お金の学び場」はこちら！
> https://okane-no-manabi.jp/
> 
> 日本一ポップに、マンガと図解で投資のキホンを教えるぞい。
> ぜひチェックしてフォローもよろしくのう！👴✨
> #NISA #投資初心者 #カブ先生

## 5. Visual Design (Images)
1. `d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_01.png` (Sake Scam Title)
2. `d:\Antigravity\Kabu\manga\urakane\20260501\urakane20260501_02.png` (Sake Scam Content)
3. `d:\Antigravity\Kabu\image\column\Column20260430.png` (Nikkei 60k Column)
4. `d:\Antigravity\Kabu\image\Top01.jpg` (Site Banner)

## 6. Implementation Plan Preview
- Use `post_to_x_kabu.py` script.
- Verify point count (Twitter character count).
- Record history in `data/sns_post_history.json`.
