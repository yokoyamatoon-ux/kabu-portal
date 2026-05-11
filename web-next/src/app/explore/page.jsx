import TsumitateSimulator from "@/components/TsumitateSimulator";

export const metadata = {
  title: '積立シミュレーター | カブ先生のお金の学校',
  description: '毎月の積立額・年利・期間を動かすだけで将来の資産額を複利計算。カブ先生がリアクションで教えてくれるぞ。',
  alternates: {
    canonical: "/explore/",
  },
  openGraph: {
    title: '積立シミュレーター',
    description: '毎月の積立額・年利・期間を動かすだけで将来の資産額を複利計算。',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main className="pb-10">
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
