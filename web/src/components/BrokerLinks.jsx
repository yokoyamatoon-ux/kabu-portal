import React from 'react';
import { MangaCard } from './MangaComponents';

const BROKERS = [
  {
    id: 'sbi',
    name: 'SBI証券',
    desc: '口座数No.1！総合力で選ぶならココ',
    icon: '🏛️',
    gradient: 'from-[#FFEEEE] to-[#FFD6D6]',
    textColor: '#E85555',
    pills: ['🔰 初心者向け', '💰 手数料最安級'],
    url: 'https://www.sbisec.co.jp'
  },
  {
    id: 'rakuten',
    name: '楽天証券',
    desc: 'ポイントで投資！楽天ユーザー必見',
    icon: '🎯',
    gradient: 'from-[#FFF0F5] to-[#FFD6E7]',
    textColor: '#E85555',
    pills: ['🔰 初心者向け', '🛍️ 楽天ユーザー向け'],
    url: 'https://www.rakuten-sec.co.jp'
  },
  {
    id: 'matsui',
    name: '松井証券',
    desc: '50万円まで手数料0円！少額ならココ',
    icon: '📊',
    gradient: 'from-[#EEF5FF] to-[#D6E8FF]',
    textColor: '#0984e3',
    pills: ['⚡ 少額投資向け', '📞 充実のサポート'],
    url: 'https://ad2.trafficgate.net/t/r/216/6012/317294_396520',
    bannerSrc: 'https://srv2.trafficgate.net/t/b/216/6012/317294_396520',
    isAffiliate: true
  },
  {
    id: 'aizawa',
    name: 'アイザワ証券',
    desc: 'アジア株に強い！地域密着の充実サポート',
    icon: '🌏',
    gradient: 'from-[#F3E5F5] to-[#E1BEE7]',
    textColor: '#8e44ad',
    pills: ['🌏 アジア株向け', '🤝 充実サポート'],
    url: 'https://www.aizawa.co.jp'
  }
];

export const BrokerLinks = () => {
  return (
    <section className="space-y-6 pt-12 pb-16">
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-black text-text">おすすめ証券会社</h2>
          <p className="text-muted text-xs font-bold opacity-75">まずは自分に合った口座を見つけるのじゃ！</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BROKERS.map((broker) => (
          <MangaCard 
            key={broker.id}
            className="group flex flex-col h-full bg-white border-2 border-transparent hover:border-primary/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
          >
            <div className={`h-12 bg-gray-50 flex items-center justify-center`}>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-black mb-1" style={{ color: broker.textColor }}>
                {broker.name}
              </h3>
              <p className="text-[0.7rem] text-muted font-medium mb-4 leading-relaxed line-clamp-2">
                {broker.desc}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {broker.pills.map((pill) => (
                  <span key={pill} className="bg-gray-100 text-gray-600 text-[0.6rem] font-black px-2.5 py-1 rounded-full border border-gray-200">
                    {pill}
                  </span>
                ))}
              </div>
              
              <a 
                href={broker.url} 
                target="_blank" 
                rel={broker.isAffiliate ? "nofollow noopener noreferrer" : "noopener noreferrer"}
                className="mt-auto block text-center py-3 px-4 bg-primary text-white font-black text-xs rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:brightness-110 active:scale-95 transition-all"
              >
                口座開設 ➔
              </a>
            </div>
          </MangaCard>
        ))}
      </div>
      
      <p className="text-center text-[0.65rem] text-muted font-bold mt-8 opacity-40 px-4">
        ※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。
      </p>
    </section>
  );
};
