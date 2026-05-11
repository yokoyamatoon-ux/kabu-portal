import './globals.css';
import { ClientWrapper } from '../components/ClientWrapper';

export const metadata = {
  metadataBase: new URL('https://okane-no-manabi.jp'),
  title: {
    default: 'カブ先生のお金の学校 | マンガで楽しく学ぶ投資の基本',
    template: '%s',
  },
  description: '株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。難しい言葉ゼロで初心者でもわかりやすく解説。',
  openGraph: {
    title: 'カブ先生のお金の学校 | マンガで楽しく学ぶ投資の基本',
    description: '株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。',
    siteName: 'カブ先生のお金の学校',
    images: [{ url: 'https://okane-no-manabi.jp/favicon.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'カブ先生のお金の学校 | マンガで楽しく学ぶ投資の基本',
    description: '株・NISA・投資のキホンをマンガでたのしく学べる「カブ先生のお金の学校」。',
    images: ['https://okane-no-manabi.jp/favicon.png'],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning={true}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
