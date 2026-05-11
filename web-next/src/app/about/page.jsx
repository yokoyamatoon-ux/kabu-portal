import { AboutPage } from "../../components/AboutPage";

export const metadata = {
  title: 'カブ先生の学校に入学しよう！お金の学校とは | カブ先生のお金の学校',
  description: '老後2000万円問題・物価上昇・低金利時代に必要なお金の知識をマンガで学べる場所。まずはここから始めよう。',
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: 'カブ先生の学校に入学しよう！お金の学校とは',
    description: '老後2000万円問題・物価上昇・低金利時代に必要なお金の知識をマンガで学べる場所。',
    type: 'website',
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "カブ先生",
  "jobTitle": "投資教育コンテンツ監修",
  "description": "投資歴30年。元証券会社勤務。初心者向け金融リテラシー教育に従事。",
  "worksFor": {
    "@type": "Organization",
    "name": "カブ先生のお金の学校",
    "url": "https://okane-no-manabi.jp"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutPage />
    </>
  );
}
