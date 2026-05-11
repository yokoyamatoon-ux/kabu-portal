import { MangaPage } from "../../components/MangaPage";

export const metadata = {
  title: 'マンガで学ぶ投資の基本 全5話 | カブ先生のお金の学校',
  description: '株・配当金・株価の仕組み・NISA・オルカンをマンガで楽しく解説。第1話〜第5話まで無料で読めるぞ！',
  alternates: {
    canonical: "/manga/",
  },
  openGraph: {
    title: 'マンガで学ぶ投資の基本 全5話',
    description: '株・配当金・株価の仕組み・NISA・オルカンをマンガで楽しく解説。',
    type: 'website',
  },
};

export default function Page() {
  return <MangaPage />;
}
