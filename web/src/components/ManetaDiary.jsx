import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'
import MANETA_DIARY from '../data/maneta_diary.json'

export const ManetaDiaryPage = ({ navigateTo }) => {
  const [selectedEp, setSelectedEp] = useState(null)

  const activeEp = MANETA_DIARY.find(e => e.ep === selectedEp)

  if (activeEp) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-16 max-w-4xl mx-auto">
        <button onClick={() => setSelectedEp(null)} className="mb-6 px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
          ← 一覧にもどる
        </button>

        <div className="text-center mb-8">
          <div className="text-secondary font-black text-sm mb-1">第{activeEp.ep}回 • {activeEp.date}</div>
          <h2 className="text-2xl md:text-3xl font-black text-text leading-tight">{activeEp.title}</h2>
        </div>

        <div className="space-y-12">
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#ffcc5c]/30 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 font-black text-secondary/20 text-6xl select-none group-hover:scale-110 transition-transform">#{activeEp.ep}</div>
             <h3 className="text-2xl font-black text-text mb-6 relative z-10 border-l-8 border-primary pl-4">第{activeEp.ep}回：{activeEp.title}</h3>
             
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
               <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#ffcc5c]/20">
                 {activeEp.chat_data.map((chat, idx) => (
                   <CharacterSpeech 
                     key={idx}
                     chara={CHARA[chat.chara]}
                     text={chat.text}
                     color={chat.color}
                   />
                 ))}
               </div>
             )}
          </div>
        </div>

        <div className="mt-8 text-center">
            <button onClick={() => setSelectedEp(null)} className="w-full md:w-auto px-12 py-4 bg-white border border-gray-200 font-black rounded-xl shadow-sm hover:shadow-md transition-all">
              📖 一覧へ戻る
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 max-w-5xl mx-auto">
      <SectionHeader title="マネ太のはじめての投資日記" icon="📈" />
      
      <div className="mb-8 overflow-hidden rounded-2xl shadow-xl border-2 border-gray-100 bg-white">
        <img src="/images/maneta/maneta00.jpg" alt="マネ太の投資日記 コンセプト" className="w-full h-auto object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MANETA_DIARY.map((ep) => (
          <MangaCard key={ep.ep} className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full relative" onClick={() => setSelectedEp(ep.ep)}>
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
