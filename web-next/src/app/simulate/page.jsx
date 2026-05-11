import TsumitateSimulator from "@/components/TsumitateSimulator";

export const metadata = {
  title: "積立シミュレーター | カブ先生のお金の学校",
  description:
    "月々の積立額・年利・期間を動かすだけで将来の資産額を複利計算。カブ先生がリアクションで教えてくれるぞ。",
};

export default function SimulatePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <span className="text-emerald-500">📈</span> 積立シミュレーター
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          スライダーを動かして、複利の魔法を体験するのじゃ！<br />
          将来、自分のお金がどれくらい育つか見てみよう。
        </p>
      </div>
      
      <div className="max-w-xl mx-auto">
        <TsumitateSimulator />
      </div>

      {/* 戻るボタン */}
      <div className="max-w-xl mx-auto px-4 mt-8">
        <a 
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          ← 教室に戻る
        </a>
      </div>
    </main>
  );
}
