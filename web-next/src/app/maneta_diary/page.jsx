import { ManetaDiaryPage } from "../../components/ManetaDiary";

export const metadata = {
  title: 'マネ太日記 | カブ先生のお金の学校',
  description: 'マネ太の投資奮闘記を4コマ漫画でお届け。初心者あるあるの失敗や成長を楽しく追体験しよう。',
  alternates: {
    canonical: "/maneta_diary/",
  },
  openGraph: {
    title: 'マネ太日記',
    description: 'マネ太の投資奮闘記を4コマ漫画でお届け。初心者あるあるの失敗や成長を楽しく追体験。',
    type: 'website',
  },
};

export default function Page() {
  return <ManetaDiaryPage />;
}
