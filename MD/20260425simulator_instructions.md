# カブ先生の積立シミュレーター 実装指示書

> コンポーネント名：`TsumitateSimulator.jsx`  
> 配置場所：`/explore/` 内、または新規ページ `/simulate/`  
> 性質：クライアントコンポーネント（`"use client"` 必須）

---

## 画像ファイル一覧

以下のファイルを作成し、`public/images/simulator/` に配置する。

| ファイル名 | 内容 | 使用箇所 |
|---|---|---|
| `kabu_normal.png` | カブ先生・通常顔（真顔・待機中） | 初期表示・低リターン時 |
| `kabu_happy.png` | カブ先生・笑顔（微笑み） | 運用益が元本の50%超 |
| `kabu_excited.png` | カブ先生・大喜び（両手上げ） | 運用益が元本の150%超 |
| `kabu_wow.png` | カブ先生・驚き（目が飛び出る） | 運用益が元本の300%超（億超え） |

画像サイズ：**96×96px**（2x: 192×192px）、PNG透過背景

---

## コンポーネント実装

`src/components/TsumitateSimulator.jsx` を新規作成する。

```jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PRESETS = [
  { label: "🌱 まずは月5千円",      monthly: 5000,  rate: 3,   years: 20 },
  { label: "📈 月1万円チャレンジ",  monthly: 10000, rate: 5,   years: 20 },
  { label: "🏆 NISA満額フル活用",   monthly: 33333, rate: 5,   years: 30 },
];

const COMMENTS = {
  low: [
    "スライダーを動かして、複利の魔法を体験するのじゃ！",
    "まずは小さな一歩じゃ。続けることが最大の武器じゃぞ！",
    "千里の道も一歩から。コツコツが一番強いのじゃ！",
  ],
  mid: [
    "なかなかやるのじゃ！複利が味方についてきたぞ！",
    "フォッフォッフォ！このペースなら将来が楽しみじゃ！",
    "複利とは、雪だるまのようなものじゃ。転がるほど大きくなるぞ！",
  ],
  high: [
    "素晴らしい！複利の魔法が全開じゃ！",
    "この調子で続ければ、マネ太くんも立派な投資家じゃ！",
    "フォッフォッフォ！元本より利益のほうが大きくなってきたぞ！",
  ],
  wow: [
    "これは…！複利が暴走しておる！！",
    "フォッフォッフォッフォ！もはやカブ先生も驚きじゃ！！",
    "時間と複利の組み合わせは、この世で最強の魔法じゃ……！",
  ],
};

function calcResult(monthly, rate, years) {
  const r = rate / 100 / 12;
  const n = years * 12;
  const total     = monthly * ((Math.pow(1 + r, n) - 1) / r);
  const principal = monthly * n;
  return {
    total:     Math.round(total),
    principal: Math.round(principal),
    interest:  Math.round(total - principal),
  };
}

function fmtMan(yen) {
  const m = Math.round(yen / 10000);
  if (m >= 10000) {
    return (Math.round(m / 1000) / 10).toLocaleString("ja-JP") + "億円";
  }
  return m.toLocaleString("ja-JP") + "万円";
}

function getLevel(interest, principal) {
  const ratio = interest / principal;
  if (ratio > 3)   return "wow";
  if (ratio > 1.5) return "high";
  if (ratio > 0.5) return "mid";
  return "low";
}

const FACE_IMAGE = {
  low:  "/images/simulator/kabu_normal.png",
  mid:  "/images/simulator/kabu_happy.png",
  high: "/images/simulator/kabu_excited.png",
  wow:  "/images/simulator/kabu_wow.png",
};

export default function TsumitateSimulator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate,    setRate]    = useState(5);
  const [years,   setYears]   = useState(20);
  const [comment, setComment] = useState(COMMENTS.low[0]);
  const [level,   setLevel]   = useState("low");
  const timerRef = useRef(null);

  const { total, principal, interest } = calcResult(monthly, rate, years);
  const pPct = Math.round(principal / total * 100);
  const iPct = 100 - pPct;

  useEffect(() => {
    const lv = getLevel(interest, principal);
    setLevel(lv);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const pool = COMMENTS[lv];
      setComment(pool[Math.floor(Math.random() * pool.length)]);
    }, 300);
  }, [monthly, rate, years]);

  return (
    <section className="py-6 px-4 max-w-xl mx-auto">

      {/* カブ先生エリア */}
      <div className="flex items-end gap-3 mb-5">
        <div className={`transition-transform duration-300 ${
          level === "wow"  ? "rotate-6 scale-125" :
          level === "high" ? "-rotate-6 scale-110" :
          level === "mid"  ? "-rotate-3 scale-105" : ""
        }`}>
          <Image
            src={FACE_IMAGE[level]}
            alt="カブ先生"
            width={72}
            height={72}
          />
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl rounded-bl-none px-4 py-3 text-sm text-gray-700 leading-relaxed min-h-[52px]">
          {comment}
        </div>
      </div>

      {/* プリセットボタン */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => { setMonthly(p.monthly); setRate(p.rate); setYears(p.years); }}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* スライダー */}
      <SliderRow
        label="毎月の積立額"
        value={monthly} min={1000} max={50000} step={1000}
        display={monthly.toLocaleString("ja-JP") + "円"}
        onChange={setMonthly}
      />
      <SliderRow
        label="想定年利"
        value={rate} min={1} max={10} step={0.5}
        display={rate.toFixed(1) + "%"}
        onChange={setRate}
      />
      <SliderRow
        label="積立期間"
        value={years} min={1} max={40} step={1}
        display={years + "年"}
        onChange={setYears}
      />

      {/* 結果カード */}
      <div className="grid grid-cols-3 gap-2 my-5">
        <ResultCard label="あなたが出すお金" value={fmtMan(principal)} />
        <ResultCard label="複利の魔法✨"     value={fmtMan(interest)} accent />
        <ResultCard label="🏦 仮想おさいふ"  value={fmtMan(total)}    accent large />
      </div>

      {/* 積み上げバー */}
      <div className="mb-1">
        <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
          <span>🔵 あなたのお金</span>
          <span>🟢 複利がくれたお金</span>
        </div>
        <div className="h-7 rounded-full overflow-hidden flex bg-gray-100">
          <div
            className="bg-blue-300 flex items-center justify-center transition-all duration-500"
            style={{ width: pPct + "%" }}
          >
            {pPct > 15 && (
              <span className="text-[10px] text-white font-medium">{pPct}%</span>
            )}
          </div>
          <div
            className="bg-teal-400 flex items-center justify-center transition-all duration-500"
            style={{ width: iPct + "%" }}
          >
            {iPct > 10 && (
              <span className="text-[10px] text-white font-medium">{iPct}%</span>
            )}
          </div>
        </div>
      </div>

      {/* 複利メッセージ */}
      {iPct >= 10 && (
        <p className="text-center text-sm text-teal-600 font-medium mt-3">
          複利が {fmtMan(interest)} タダでくれるぞ！
        </p>
      )}

      {/* 免責 */}
      <p className="text-[11px] text-gray-400 leading-relaxed border-t border-gray-100 pt-3 mt-4">
        ※ 本シミュレーターは複利計算による概算です。実際の運用成果を保証するものではありません。
        税金・手数料は考慮していません。投資判断はご自身の責任で行ってください。
      </p>
    </section>
  );
}

function SliderRow({ label, value, min, max, step, display, onChange }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm text-gray-500 w-28 shrink-0">{label}</span>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="text-sm font-medium text-gray-800 w-20 text-right tabular-nums">
        {display}
      </span>
    </div>
  );
}

function ResultCard({ label, value, accent, large }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-3 text-center">
      <p className="text-[11px] text-gray-400 mb-1">{label}</p>
      <p className={[
        "font-medium tabular-nums",
        large  ? "text-xl" : "text-lg",
        accent ? "text-teal-600" : "text-gray-800",
      ].join(" ")}>
        {value}
      </p>
    </div>
  );
}
```

---

## ページへの組み込み

### `/explore/` に追加する場合

```jsx
import TsumitateSimulator from "@/components/TsumitateSimulator";

// 既存ページの適切な位置に追加
<section className="mb-12">
  <h2 className="text-xl font-black px-4 mb-1">📈 積立シミュレーター</h2>
  <p className="text-sm text-gray-500 px-4 mb-4">
    スライダーを動かして、複利の魔法を体験しよう。
  </p>
  <TsumitateSimulator />
</section>
```

### 専用ページ `/simulate/` を作る場合

`src/app/simulate/page.jsx` を新規作成する。

```jsx
import TsumitateSimulator from "@/components/TsumitateSimulator";

export const metadata = {
  title: "積立シミュレーター | カブ先生のお金の学校",
  description:
    "月々の積立額・年利・期間を動かすだけで将来の資産額を複利計算。カブ先生がリアクションで教えてくれるぞ。",
};

export default function SimulatePage() {
  return (
    <main>
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-black">積立シミュレーター</h1>
        <p className="text-sm text-gray-500 mt-1">
          スライダーを動かして、複利の魔法を体験するのじゃ！
        </p>
      </div>
      <TsumitateSimulator />
    </main>
  );
}
```

---

## カブ先生の反応ロジック

| レベル | 条件（運用益 ÷ 元本） | 画像ファイル | セリフの傾向 |
|---|---|---|---|
| `low` | 〜50% | `kabu_normal.png` | 励まし・背中を押す |
| `mid` | 50〜150% | `kabu_happy.png` | ほめる・複利の説明 |
| `high` | 150〜300% | `kabu_excited.png` | 大喜び・驚き |
| `wow` | 300%超 | `kabu_wow.png` | 大絶叫・名言風 |

セリフはレベルが切り替わってから **300ms後** に更新（スライダー連打でちらつかないようにデバウンス）。

---

## ビルドと確認

```bash
npm run build
```

| 確認項目 | 期待値 |
|---|---|
| スライダーを動かすと数値・バーが即時更新される | ✅ |
| 運用益が増えるとカブ先生の画像とセリフが切り替わる | ✅ |
| プリセットボタンで3スライダーが連動して動く | ✅ |
| 億円設定（高年利・長期）で「○億円」表示になる | ✅ |
| スマートフォン幅（375px）で崩れない | ✅ |
| 画像が表示されない場合でも数値・セリフは動作する | ✅ |
