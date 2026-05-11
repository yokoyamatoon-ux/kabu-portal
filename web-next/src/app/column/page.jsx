import { ColumnWrapper } from "../../components/ColumnWrapper";

export const metadata = {
  title: '投資コラム一覧 | カブ先生のお金の学校',
  description: 'NISA・S&P500・高配当株・ゴールド・ビットコインなど最新の投資テーマをカブ先生がわかりやすく解説するコラム集。',
  alternates: {
    canonical: "/column/",
  },
  openGraph: {
    title: '投資コラム一覧 | カブ先生のお金の学校',
    description: 'NISA・S&P500・高配当株・ゴールド・ビットコインなど最新の投資テーマを解説するコラム集。',
    type: 'website',
  },
};

export default function Page() {
  return <ColumnWrapper />;
}
