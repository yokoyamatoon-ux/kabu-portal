import { QuizPage } from "../../components/QuizPage";

export const metadata = {
  title: '投資クイズで腕試し！ | カブ先生のお金の学校',
  description: '投資やお金の知識をクイズ形式で楽しくテスト。初心者から上級者まで、何問正解できるか挑戦してみよう！',
  alternates: {
    canonical: "/quiz/",
  },
  openGraph: {
    title: '投資クイズで腕試し！',
    description: '投資やお金の知識をクイズ形式で楽しくテスト。何問正解できるか挑戦してみよう！',
    type: 'website',
  },
};

export default function Page() {
  return <QuizPage />;
}
