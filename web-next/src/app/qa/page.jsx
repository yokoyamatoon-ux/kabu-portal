import { QaPage } from "../../components/QaPage";

export const metadata = {
  title: 'よくある質問（Q&A） | カブ先生のお金の学校',
  description: '投資初心者のよくある疑問にカブ先生がわかりやすく回答。NISAの始め方から株価の見方まで、基本的な質問を網羅。',
  alternates: {
    canonical: "/qa/",
  },
  openGraph: {
    title: 'よくある質問（Q&A）',
    description: '投資初心者のよくある疑問にカブ先生がわかりやすく回答。',
    type: 'website',
  },
};

function generateJsonLd() {
  const qaData = {
    "円安ってなに？": "日本円の価値が他の国の通貨（ドルなど）に対して低くなることじゃ。輸入品が値上がりする反面、海外に物を売る輸出企業にとってはチャンスになるぞ！",
    "配当金はどうやってもらうの？": "投資商品を買って「権利確定日」まで持っていると、後日証券口座にお金が振り込まれるぞ。持ってるだけでお小遣いになる嬉しい仕組みじゃな！",
    "いくらから投資できるの？": "最近は100円から買える投資信託や、1株（数百円〜）から買えるミニ投資も充実しておるぞ。無理のない範囲で始めるのが一番じゃ！",
    "NISAって本当にお得なの？": "普通は投資で儲かると20%くらいの税金が取られるんじゃが、NISAならそれがゼロ！国が認めた「投資のご褒美」のようなものじゃな。",
    "おすすめの銘柄は？": "ワシは投資の最終判断は自分ですべきだと考えておる。まずはキミが知っている身近な会社や、応援したい会社を『探す』ページでチェックしてみるとよいぞ！",
  };

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.entries(qaData).map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };
}

export default function Page() {
  const jsonLd = generateJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QaPage />
    </>
  );
}
