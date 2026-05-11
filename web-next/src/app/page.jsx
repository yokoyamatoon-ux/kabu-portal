import { HomePageContent } from "../components/HomePageContent";
import { Suspense } from "react";

export const metadata = {
  title: 'カブ先生のお金の学校 | マンガで楽しく学ぶ投資の基本',
  description: '株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。難しい言葉ゼロで初心者でもわかりやすく解説。',
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'カブ先生のお金の学校 | マンガで楽しく学ぶ投資の基本',
    description: '株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。',
    type: 'website',
  },
};

function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "お金の学び",
    "url": "https://okane-no-manabi.jp/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://okane-no-manabi.jp/explore?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export default function HomePage() {
  const jsonLd = generateJsonLd();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageContent />
    </Suspense>
  );
}
