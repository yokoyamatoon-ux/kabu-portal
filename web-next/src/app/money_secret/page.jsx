import { MoneySecretPage } from "../../components/MoneySecret";

export const metadata = {
  title: 'お金のウラ事情ファイル | カブ先生のお金の学校',
  description: '投資詐欺・巨額横領・ポンジスキーム…お金にまつわる衝撃の実話をマンガで学ぶ。ウラ金さんが暗躍する闇のファイル。',
  alternates: {
    canonical: "/money_secret/",
  },
  openGraph: {
    title: 'お金のウラ事情ファイル',
    description: 'お金にまつわる衝撃の実話をマンガで学ぶ。ウラ金さんが暗躍する闇のファイル。',
    type: 'website',
  },
};

export default function Page() {
  return <MoneySecretPage />;
}
