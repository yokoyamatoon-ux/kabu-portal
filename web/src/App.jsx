import React, { useState, useEffect, useMemo } from 'react'
import { Layout } from './components/Layout'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { HeroSlider } from './components/HeroSlider'
import { MangaCard, CharacterSpeech, SectionHeader } from './components/MangaComponents'
import { CHARA, NAVIGATION } from './lib/constants'
import { ColumnList, ColumnDetail } from './components/ColumnContent'
import { AboutPage } from './components/AboutPage'
import { MangaPage } from './components/MangaPage'
import { QuizPage } from './components/QuizPage'
import { QaPage } from './components/QaPage'
import { ManetaDiaryPage } from './components/ManetaDiary'
import { MoneySecretPage } from './components/MoneySecret'
import { Simulator } from './components/Simulator'
import { getMarketData } from './lib/MarketData'

import { BrokerLinks } from './components/BrokerLinks'

function App() {
  const [page, setPage] = useState('home')
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [marketData, setMarketData] = useState([])

  useEffect(() => {
    const fetchMarket = async () => {
      const data = await getMarketData()
      setMarketData(data)
    }
    fetchMarket()
    const interval = setInterval(fetchMarket, 30000)
    return () => clearInterval(interval)
  }, [])

  // URLSync (Basic)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const p = params.get('page') || 'home'
      setPage(p)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (p) => {
    setPage(p)
    const url = new URL(window.location)
    url.searchParams.set('page', p)
    window.history.pushState({}, '', url)
    window.scrollTo(0, 0)
  }

  const handleColumnSelect = (id) => {
    setSelectedColumn(id)
    setPage('column_detail')
  }

  const renderHome = () => (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <HeroSlider />

      <section className="space-y-4">
        <div className="flex justify-between items-end px-2">
           <SectionHeader title="今日のマーケット" />
           {marketData.length > 0 && marketData[3]?.timestamp && (
             <div className="text-[0.65rem] text-muted font-bold mb-1">📅 取得日時: {marketData[3].timestamp}</div>
           )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(marketData.length > 3 ? marketData.slice(0, 3) : [
             { label: '日経平均 🇯🇵', price: '---', change: '0.00' },
             { label: 'S&P500 🇺🇸', price: '---', change: '0.00' },
             { label: 'ドル円 💴', price: '---', change: '0.00' },
          ]).map((item, idx) => {
            const isUp = Number(item.change) >= 0;
            const lineColor = isUp ? '#00b894' : '#ff7675';
            const gradId = `grad-market-${idx}`;
            
            return (
              <MangaCard key={item.label} className="p-6 bg-white border-2 border-transparent hover:border-primary-light/50 relative overflow-hidden group flex flex-col h-[320px]">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[0.7rem] text-muted font-black tracking-tight">{item.label}</div>
                  <div className={`text-[0.75rem] font-black px-2 py-0.5 rounded-full ${isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {isUp ? '▲' : '▼'} {Math.abs(item.change)}%
                  </div>
                </div>
                
                <div className="text-3xl font-black text-text mb-4 tracking-tighter">{item.price}</div>
                
                <div className="flex-1 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.history?.map((h, i) => ({ 
                      day: i, 
                      val: Number(item.price) * (1 + (h - 50) / 1500) // Slightly smoother
                    })) || []}>
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={lineColor} stopOpacity={0.25}/>
                          <stop offset="100%" stopColor={lineColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f0e8" />
                      <XAxis dataKey="day" hide />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        orientation="right"
                        fontSize={8}
                        tickFormatter={(v) => Math.round(v)}
                        stroke="#b2bec3"
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.95)' }}
                        labelClassName="hidden"
                        formatter={(value) => [`${value.toFixed(2)}`, '価格']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke={lineColor} 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill={`url(#${gradId})`} 
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-[0.6rem] text-muted flex justify-between font-bold opacity-80">
                   <span className="bg-gray-100 px-2 py-0.5 rounded">1ヶ月前</span>
                   <span className="bg-gray-100 px-2 py-0.5 rounded">現在</span>
                </div>
              </MangaCard>
            )
          })}
        </div>
      </section>

      <MangaCard className="bg-white border-l-8 border-secondary p-8 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="flex-1 space-y-4 relative z-10">
          <h1 className="text-3xl font-black text-text leading-tight">
            カブ先生の<br />
            <span className="text-primary italic">だれでもわかるお金の学校</span>へ<br />
            ようこそ！🎓
          </h1>
          <div className="text-muted leading-relaxed text-sm md:text-base">
            むずかしい言葉ゼロ。株・NISA・投資のキホンをマンガでたのしく学べるぞ！<br />
            カブ先生・マネ太・ミライたちキャラクターが案内してくれるから安心じゃ。
          </div>
          <div className="flex gap-2">
             {['📖 マンガで学ぶ', '❓ 投資クイズ', '💹 シミュレーション'].map(tag => (
               <span key={tag} className="bg-secondary-light text-secondary-dark px-3 py-1 rounded-full text-[0.7rem] font-black">{tag}</span>
             ))}
          </div>
        </div>
        <img src="/images/Top01.jpg" alt="banner" className="w-full md:w-1/3 rounded-2xl object-cover shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500 aspect-[4/3] md:aspect-square bg-gray-100" />
      </MangaCard>


      {/* Admission Banner */}
      <a 
        href="?page=about"
        onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
        className="block cursor-pointer group relative rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-4 border-white aspect-[5/2] md:aspect-[4/1] bg-gray-100"
      >
        <img src="/images/banner_nyugaku.jpg" alt="入学案内" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 absolute inset-0" />
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
      </a>



      {/* Featured Column Section */}
      <section className="space-y-4">
         <div className="flex justify-between items-center px-2">
            <SectionHeader title="注目のコラム" />
            <a href="?page=column" onClick={(e) => { e.preventDefault(); navigateTo('column'); }} className="text-primary font-black text-sm hover:underline">もっと見る →</a>
         </div>
         <ColumnList onSelect={handleColumnSelect} limit={4} />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
         {NAVIGATION.map((nav) => (
            <MangaCard 
              key={nav.id} 
              href={`?page=${nav.id}`}
              className="group cursor-pointer p-0 overflow-hidden flex flex-col h-full bg-white transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
              onClick={(e) => { e.preventDefault(); navigateTo(nav.id); }}
            >
               <div className="h-32 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                  <img src={nav.image} alt={nav.label} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {nav.id === 'manga' && (
                    <div className="absolute top-2 right-2 bg-danger text-white text-[0.6rem] font-black px-2 py-1 rounded-lg shadow-lg border border-white animate-pulse">NEW!</div>
                  )}
               </div>
               <div className="p-4 text-center">
                  <div className="font-black text-sm md:text-base text-text group-hover:text-primary transition-colors">{nav.label}</div>
                  <div className="text-[0.65rem] text-muted mt-1 truncate">{nav.desc}</div>
               </div>
            </MangaCard>
         ))}
      </section>

      {/* Promo Grid specific to Streamlit parity */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <MangaCard 
          className="group cursor-pointer p-6 bg-[#111] border-[3px] border-[#FFE66D] hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl flex flex-col items-center relative overflow-hidden"
          href="?page=money_secret"
          onClick={(e) => { e.preventDefault(); navigateTo('money_secret'); }}
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #111, #111 20px, #cca623 20px, #cca623 40px)' }}
        >
          <div className="absolute top-0 right-0 bg-danger text-white text-[0.6rem] font-black px-4 py-1 rotate-45 translate-x-4 translate-y-2 shadow-lg border-b border-white z-20">NEW!</div>
          <div className="bg-[#111] text-[#FFDE00] font-black border-[3px] border-[#FFDE00] rounded-full px-6 py-1 -mt-10 mb-4 whitespace-nowrap relative z-10">⚠️ お金の裏事情ファイル 🆕</div>
          <div className="border-2 border-gray-600 rounded-lg overflow-hidden w-full bg-black mb-4">
            <img src="/images/Ura.jpg" alt="ura" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100" />
          </div>
          <div className="bg-[#2d3436]/90 border border-white/10 text-white p-4 rounded-lg text-sm leading-relaxed w-full text-center">
            <span className="text-[#FFDE00] font-bold block mb-1">世の中には表に出ない「お金のダークサイド」が存在します。</span>
            このファイルでは、初心者が陥りやすい罠や、知っておくべき金融の裏ルールをこっそり教えます。絶対に真似してはいけませんよ！
          </div>
        </MangaCard>

        <MangaCard 
          className="group cursor-pointer p-6 bg-[#fff9f0] border-[3px] border-danger hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl flex flex-col items-center"
          href="?page=maneta_diary"
          onClick={(e) => { e.preventDefault(); navigateTo('maneta_diary'); }}
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff9f0, #fff9f0 20px, #ffe8e8 20px, #ffe8e8 40px)' }}
        >
          <div className="bg-danger text-white font-black border-[3px] border-[#ff4757] rounded-full px-6 py-1 -mt-10 mb-4 whitespace-nowrap">📈 マネ太のはじめての投資 🆕</div>
          <div className="border-2 border-[#FFB8B8] rounded-lg overflow-hidden w-full bg-white mb-4">
            <img src="/images/hajimete.jpg" alt="maneta" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100" />
          </div>
          <div className="bg-white/90 border border-[#ffcccc] text-[#333] p-4 rounded-lg text-sm leading-relaxed w-full text-center">
            <span className="text-danger font-bold block mb-1">ボクのお小遣い、どうなっちゃうの！？</span>
            初心者マネ太が実際に投資プランに挑戦していくドキュメンタリー！日々の資産運用や葛藤を赤裸々に綴る投資日記をチェックしてね👦✨
          </div>
        </MangaCard>
      </section>

      <BrokerLinks />

    </div>
  )

  const renderContent = () => {
    switch (page) {
      case 'home': return renderHome()
      case 'manga': return <MangaPage />
      case 'quiz': return <QuizPage navigateTo={navigateTo} />
      case 'qa': return <QaPage />
      case 'money_secret': return <MoneySecretPage />
      case 'maneta_diary': return <ManetaDiaryPage navigateTo={navigateTo} />
      case 'column': return <ColumnList onSelect={handleColumnSelect} />
      case 'column_detail': return <ColumnDetail columnId={selectedColumn} onBack={() => navigateTo('column')} />
      case 'about': return <AboutPage />
      case 'explore': return <Simulator />
      default:
        return (
          <div className="py-24 text-center animate-in zoom-in duration-500">
            <div className="text-8xl mb-6">🚧</div>
            <h2 className="text-2xl font-black text-muted mb-4">現在、このページは工事中じゃ。</h2>
            <p className="text-muted mb-8 italic">Webアプリ版として新しく生まれ変わるのを楽しみに待っていてほしい！</p>
            <button onClick={() => navigateTo('home')} className="bg-primary text-white font-black px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">ホームに戻る</button>
          </div>
        )
    }
  }

  return (
    <Layout currentPage={page} setPage={navigateTo} marketData={marketData}>
      {renderContent()}
    </Layout>
  )
}

export default App
