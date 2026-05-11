import { LegalPage } from "../../components/LegalPage";

export const metadata = {
  title: '免責事項 | カブ先生のお金の学校',
  description: '本サイトの情報は教育目的です。投資判断はご自身の責任で行ってください。免責事項・著作権についての説明。',
  alternates: {
    canonical: "/disclaimer/",
  },
};

export default function Page() {
  return <LegalPage type="disclaimer" />;
}
