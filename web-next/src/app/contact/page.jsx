import { LegalPage } from "../../components/LegalPage";

export const metadata = {
  title: 'お問い合わせ | カブ先生のお金の学校',
  description: 'カブ先生のお金の学校へのお問い合わせはこちら。ご意見・ご感想・取材のご依頼など、お気軽にご連絡ください。',
  alternates: {
    canonical: "/contact/",
  },
};

export default function Page() {
  return <LegalPage type="contact" />;
}
