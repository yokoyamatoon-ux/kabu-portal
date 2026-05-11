"use client";
import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'
import MANETA_DIARY from '../data/maneta_diary.json'
import { useRouter } from 'next/navigation'

export const ManetaDiaryPage = ({ initialEp = null }) => {
  const router = useRouter()
  const [selectedEp, setSelectedEp] = useState(initialEp)

  const activeEp = MANETA_DIARY.find(e => e.ep === selectedEp)

  if (activeEp) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-16 max-w-4xl mx-auto">
        <nav aria-label="パンくずリスト" className="mb-6 text-[0.65rem] md:text-xs font-bold text-muted flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">ホーム</a>
          <span className="text-gray-300">/</span>
          <a href="/maneta_diary/" className="hover:text-primary transition-colors">マネ太日記一覧</a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 truncate max-w-[150px] md:max-w-none">第{activeEp.ep}回 {activeEp.title}</span>
        </nav>

        <button onClick={() => { setSelectedEp(null); router.push('/maneta_diary/') }} className="mb-6 px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
          ← 一覧にもどる
        </button>

        <div className="text-center mb-8">
          <div className="text-secondary font-black text-sm mb-1">{activeEp.date}</div>
          <h1 className="text-2xl md:text-3xl font-black text-text leading-tight">第{activeEp.ep}回：{activeEp.title}</h1>
        </div>

        <div className="space-y-12">
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#ffcc5c]/30 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 font-black text-secondary/20 text-6xl select-none group-hover:scale-110 transition-transform">#{activeEp.ep}</div>
             <div className="mb-6 relative z-10 border-l-8 border-primary pl-4">
               <span className="text-sm font-black text-primary block mb-1">マネ太の投資日記</span>
               <div className="text-2xl font-black text-text">STORY</div>
             </div>
             
             {/* Manga Pages */}
             {activeEp.manga_pages && activeEp.manga_pages.length > 0 && (
               <div className="space-y-4 mb-8">
                 {activeEp.manga_pages.map((imgUrl, idx) => (
                   <img key={idx} src={imgUrl} alt={`Diary Manga Page ${idx + 1}`} className="w-full rounded-xl shadow-lg border border-gray-200" />
                 ))}
               </div>
             )}

             {/* Post-Manga Dialogue */}
             {activeEp.chat_data && activeEp.chat_data.length > 0 && (
               <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#ffcc5c]/20 mb-8">
                 {activeEp.chat_data.map((chat, idx) => (
                   <CharacterSpeech 
                     key={idx}
                     chara={CHARA[chat.chara]}
                     text={chat.text}
                     color={chat.color}
                     isRight={chat.chara !== 'hakase'}
                   />
                 ))}
               </div>
             )}

             {/* FAQセクション (AIO対策) */}
             {activeEp.faq && activeEp.faq.length > 0 && (
               <section className="faq-section mt-10 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                 <h2 className="text-xl font-black text-text mb-8 border-l-4 border-secondary pl-4">
                   日記のQ&A
                 </h2>
                 <div className="space-y-6">
                   {activeEp.faq.map((item, idx) => (
                     <div key={idx} className="faq-item border-b border-gray-50 pb-6 last:border-0">
                       <h3 className="text-lg font-black text-text mb-3 flex gap-2">
                         <span className="text-secondary">Q.</span>
                         {item.q}
                       </h3>
                       <div className="flex gap-2 text-muted font-bold leading-relaxed">
                         <span className="text-primary">A.</span>
                         <p>{item.a}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
             )}

             <div className="mt-4 text-right text-[0.65rem] text-muted font-bold">
               最終更新日：{activeEp.last_updated || activeEp.date}
             </div>

             <div className="pt-8 border-t border-gray-100 flex flex-col items-center">
                <div className="text-secondary font-black text-sm mb-4">マネ太もここから始めたぞ！キミも挑戦してみよう✨</div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                   <a 
                     href="https://ad2.trafficgate.net/t/r/1222/738/317294_396520" 
                     target="_blank" 
                     rel="nofollow noopener noreferrer"
                     className="block bg-white p-2 rounded-xl border border-gray-200 hover:border-primary transition-all flex items-center justify-center h-16 overflow-hidden"
                   >
                     <img src="https://srv2.trafficgate.net/t/b/1222/738/317294_396520" alt="楽天証券" className="max-w-full max-h-full object-contain" />
                   </a>
                   <a 
                     href="https://ad2.trafficgate.net/t/r/212/6012/317294_396520" 
                     target="_blank" 
                     rel="nofollow noopener noreferrer"
                     className="block bg-white p-2 rounded-xl border border-gray-200 hover:border-primary transition-all flex items-center justify-center h-16 overflow-hidden"
                   >
                     <img src="https://srv2.trafficgate.net/t/b/212/6012/317294_396520" alt="松井証券" className="max-w-full max-h-full object-contain" />
                   </a>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 text-center">
            <button onClick={() => { setSelectedEp(null); router.push('/maneta_diary/') }} className="w-full md:w-auto px-12 py-4 bg-white border border-gray-200 font-black rounded-xl shadow-sm hover:shadow-md transition-all">
              📖 一覧へ戻る
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 max-w-5xl mx-auto">
      <SectionHeader title="マネタ日記｜お金にまつわるリアルな体験談" level={1} />
      
      <div className="mb-8 overflow-hidden rounded-2xl shadow-xl border-2 border-gray-100 bg-white">
        <img src="/images/maneta/maneta00.jpg" alt="マネ太の投資日記 コンセプト" className="w-full h-auto object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MANETA_DIARY.map((ep) => (
          <MangaCard key={ep.ep} href={`/maneta_diary/${ep.ep}/`} className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full relative" onClick={(e) => { e.preventDefault(); setSelectedEp(ep.ep); router.push(`/maneta_diary/${ep.ep}/`) }}>
             <div className="h-48 bg-[#fff9f0] flex items-center justify-center overflow-hidden relative border-b border-gray-100">
               <img src={ep.image} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.target.style.display='none'; }} />
               {ep.ep === 1 && (
                 <div className="absolute top-4 left-4 bg-danger text-white text-[0.65rem] font-black px-3 py-1 rounded-full shadow-lg border border-white z-30 animate-pulse">NEW!</div>
               )}
             </div>
             <div className="p-6 flex-1 flex flex-col">
                <div className="text-secondary font-black text-xs mb-1">第{ep.ep}話 • {ep.date}</div>
                <h3 className="text-xl font-black text-text mb-2 line-clamp-2">{ep.title}</h3>
                <p className="text-muted text-sm mb-6 flex-1 leading-relaxed">{ep.summary}</p>
                
                <button className="w-full py-3 bg-[#fff9f0] text-secondary-dark font-black rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors text-sm border border-[#ffcc5c]/30">
                  第{ep.ep}話を読む →
                </button>
             </div>
          </MangaCard>
        ))}
      </div>
    </div>
  )
}
