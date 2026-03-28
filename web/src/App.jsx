import React, { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { HeroSlider } from './components/HeroSlider'
import { MangaCard, CharacterSpeech, SectionHeader } from './components/MangaComponents'
import { CHARA, NAVIGATION } from './lib/constants'
import { ColumnList, ColumnDetail } from './components/ColumnContent'
import { MangaPage } from './components/MangaPage'
import { QuizPage } from './components/QuizPage'
import { QaPage } from './components/QaPage'
import { ManetaDiaryPage } from './components/ManetaDiary'
import { MoneySecretPage } from './components/MoneySecret'
import { Simulator } from './components/Simulator'
import { getMarketData } from './lib/MarketData'

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
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <HeroSlider />

      <MangaCard className="bg-white border-l-8 border-secondary p-8 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="flex-1 space-y-4 relative z-10">
          <h2 className="text-3xl font-black text-text leading-tight">
            カブ先生の<br />
            <span className="text-primary italic">だれでもわかるお金の学校</span>へ<br />
            ようこそ！🎓
          </h2>
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
        <img src="/images/Top01.jpg" alt="banner" className="w-full md:w-1/3 rounded-2xl object-cover shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
      </MangaCard>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {NAVIGATION.map((nav) => (
           <MangaCard 
             key={nav.id} 
             className="group cursor-pointer p-0 overflow-hidden flex flex-col h-full bg-white transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
             onClick={() => navigateTo(nav.id)}
           >
              <div className="h-32 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                 <img src={nav.image} alt={nav.label} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="absolute inset-0 flex items-center justify-center text-4xl group-hover:scale-125 transition-transform z-10 drop-shadow-lg">{nav.icon}</span>
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
          className="group cursor-pointer p-6 bg-[#111] border-[3px] border-[#FFE66D] hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl flex flex-col items-center"
          onClick={() => navigateTo('money_secret')}
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #111, #111 20px, #cca623 20px, #cca623 40px)' }}
        >
          <div className="bg-[#111] text-[#FFDE00] font-black border-[3px] border-[#FFDE00] rounded-full px-6 py-1 -mt-10 mb-4 whitespace-nowrap">⚠️ お金の裏事情ファイル 🆕</div>
          <div className="border-2 border-gray-600 rounded-lg overflow-hidden w-full bg-black mb-4">
            <img src="/images/Ura.jpg" alt="ura" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100" />
          </div>
          <div className="bg-[#2d3436]/90 border border-white/10 text-white p-4 rounded-lg text-sm leading-relaxed w-full">
            <span className="text-[#FFDE00] font-bold block mb-1">世の中には表に出ない「お金のダークサイド」が存在します。</span>
            このファイルでは、初心者が陥りやすい罠や、知っておくべき金融の裏ルールをこっそり教えます。絶対に真似してはいけませんよ！
          </div>
        </MangaCard>

        <MangaCard 
          className="group cursor-pointer p-6 bg-[#fff9f0] border-[3px] border-danger hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl flex flex-col items-center"
          onClick={() => navigateTo('maneta_diary')}
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff9f0, #fff9f0 20px, #ffe8e8 20px, #ffe8e8 40px)' }}
        >
          <div className="bg-danger text-white font-black border-[3px] border-[#ff4757] rounded-full px-6 py-1 -mt-10 mb-4 whitespace-nowrap">📈 マネ太のはじめての投資 🆕</div>
          <div className="border-2 border-[#FFB8B8] rounded-lg overflow-hidden w-full bg-white mb-4">
            <img src="/images/hajimete.jpg" alt="maneta" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100" />
          </div>
          <div className="bg-white/90 border border-[#ffcccc] text-[#333] p-4 rounded-lg text-sm leading-relaxed w-full">
            <span className="text-danger font-bold block mb-1">ボクのお小遣い、どうなっちゃうの！？</span>
            初心者マネ太が実際に投資プランに挑戦していくドキュメンタリー！日々の資産運用や葛藤を赤裸々に綴る投資日記をチェックしてね👦✨
          </div>
        </MangaCard>
      </section>

      <CharacterSpeech 
        chara={CHARA.hakase} 
        text="投資の基本を知るなら、まずはこのコラムから見てみるのがおすすめじゃ！<br>毎日新しい情報を届けておるぞ。"
        color="#FFF9F0"
      />

      <section className="space-y-4">
        <SectionHeader title="今日のマーケット" icon="📊" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(marketData.length > 0 ? marketData : [
             { label: '日経平均 🇯🇵', price: '---', change: '0.00' },
             { label: 'S&P500 🇺🇸', price: '---', change: '0.00' },
             { label: 'ドル円 💴', price: '---', change: '0.00' },
          ]).map((item) => (
            <MangaCard key={item.label} className="text-center p-6 bg-white border-2 border-transparent hover:border-primary/20">
              <div className="text-xs text-muted font-bold mb-1">{item.label}</div>
              <div className="text-3xl font-black text-text mb-2 animate-in fade-in zoom-in duration-300">{item.price}</div>
              <div className={`text-sm font-black ${Number(item.change) >= 0 ? 'text-success' : 'text-danger'} animate-in slide-in-from-top-1 duration-500`}>
                {Number(item.change) >= 0 ? '▲' : '▼'} {Math.abs(item.change)}%
              </div>
              <div className="h-12 flex items-end gap-1 mt-4 px-4">
                 {item.history?.map((h, i) => (
                   <div key={i} className="flex-1 bg-primary/10 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%`, backgroundColor: Number(item.change) >= 0 ? 'rgba(0,184,148,0.2)' : 'rgba(255,118,117,0.2)' }}></div>
                 ))}
              </div>
            </MangaCard>
          ))}
        </div>
      </section>

      {/* Featured Column Section */}
      <section className="space-y-4">
         <div className="flex justify-between items-center px-2">
            <SectionHeader title="注目のコラム" icon="🥬" />
            <button onClick={() => navigateTo('column')} className="text-primary font-black text-sm hover:underline">もっと見る →</button>
         </div>
         <ColumnList onSelect={handleColumnSelect} />
      </section>
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
    <Layout currentPage={page} setPage={navigateTo}>
      {renderContent()}
    </Layout>
  )
}

export default App
