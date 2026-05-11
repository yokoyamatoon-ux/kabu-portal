import { LegalPage } from "../../components/LegalPage";

export const metadata = {
  title: 'プライバシーポリシー | カブ先生のお金の学校',
  description: 'カブ先生のお金の学校のプライバシーポリシー。個人情報の取り扱い・Cookie・アクセス解析ツールについて説明します。',
  alternates: {
    canonical: "/privacy/",
  },
};

export default function Page() {
  return <LegalPage type="privacy" />;
}
