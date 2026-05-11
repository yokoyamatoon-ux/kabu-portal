"use client";
import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'
import MONEY_SECRETS from '../data/money_secrets.json'
import { useRouter } from 'next/navigation'

// Create an image mapping to replace placeholders in the raw HTML string
const ICON_MAP = {
  '{{HAKASE_ICON}}': `
    <div class="flex flex-col items-center shrink-0">
      <img src="${CHARA.hakase}" alt="hakase" class="w-12 h-12 md:w-16 md:h-16 object-contain" />
      <div class="text-[10px] font-black text-text opacity-40 mt-1">カブ先生</div>
    </div>`,
  '{{MANETA_ICON}}': `
    <div class="flex flex-col items-center shrink-0">
      <img src="${CHARA.maneta}" alt="maneta" class="w-12 h-12 md:w-16 md:h-16 object-contain" />
      <div class="text-[10px] font-black text-text opacity-40 mt-1">マネ太</div>
    </div>`,
  '{{MIRAI_ICON}}': `
    <div class="flex flex-col items-center shrink-0">
      <img src="${CHARA.mirai}" alt="mirai" class="w-12 h-12 md:w-16 md:h-16 object-contain" />
      <div class="text-[10px] font-black text-text opacity-40 mt-1">ミライ</div>
    </div>`,
  '{{URAKANE_ICON}}': `
    <div class="flex flex-col items-center shrink-0">
      <img src="${CHARA.urakane}" alt="urakane" class="w-12 h-12 md:w-16 md:h-16 object-contain" />
      <div class="text-[10px] font-black text-text opacity-40 mt-1">ウラ金さん</div>
    </div>`,
  '{{WARNING_ICON}}': `⚠️`
}

export const MoneySecretPage = ({ initialEp = null }) => {
  const router = useRouter()
  const [selectedEp, setSelectedEp] = useState(initialEp)

  const activeEp = MONEY_SECRETS.find(e => e.ep === selectedEp)

  const processHtml = (html) => {
    let processed = html
    for (const [key, value] of Object.entries(ICON_MAP)) {
      processed = processed.replaceAll(key, value)
    }
    return processed
  }

  if (activeEp) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-16 max-w-4xl mx-auto">
        <nav aria-label="パンくずリスト" className="mb-6 text-[0.65rem] md:text-xs font-bold text-muted flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">ホーム</a>
          <span className="text-gray-300">/</span>
          <a href="/money_secret/" className="hover:text-primary transition-colors">お金のウラ事情一覧</a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 truncate max-w-[150px] md:max-w-none">第{activeEp.ep}話 {activeEp.title}</span>
        </nav>

        <button onClick={() => { setSelectedEp(null); router.push('/money_secret/') }} className="mb-6 px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
          ← 一覧にもどる
        </button>

        <div className="text-center mb-8">
          <div className="text-primary font-black text-sm mb-1">第{activeEp.ep}話</div>
          <h1 className="text-2xl md:text-3xl font-black text-text leading-tight">{activeEp.title}</h1>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 mx-auto">
           <div className="text-center mb-8 space-y-4">
             {activeEp.manga_pages && activeEp.manga_pages.length > 0 ? (
               activeEp.manga_pages.map((img, idx) => (
                 <img key={idx} src={img} alt={`${activeEp.title} - ${idx + 1}`} className="w-full max-w-3xl mx-auto rounded-xl shadow-md border border-gray-100 object-cover" />
               ))
             ) : (
               <img src={activeEp.image_path} alt={activeEp.title} className="w-full max-w-2xl mx-auto rounded-xl shadow-md border border-gray-100 object-cover" onError={(e) => { e.target.style.display='none'; }} />
             )}
           </div>
           
           <div 
             className="prose prose-sm md:prose-base max-w-none prose-p:my-2 prose-img:m-0"
             dangerouslySetInnerHTML={{ __html: processHtml(activeEp.chat_html) }} 
           />

           {/* FAQセクション (AIO対策) */}
           {activeEp.faq && activeEp.faq.length > 0 && (
             <section className="faq-section mt-16 bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
               <h2 className="text-xl font-black text-text mb-8 border-l-4 border-danger pl-4">
                 裏事情のQ&A
               </h2>
               <div className="space-y-6">
                 {activeEp.faq.map((item, idx) => (
                   <div key={idx} className="faq-item border-b border-gray-200 pb-6 last:border-0">
                     <h3 className="text-lg font-black text-text mb-3 flex gap-2">
                       <span className="text-danger">Q.</span>
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

           <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                 <div className="font-black text-text mb-4">裏事情を知ったら、次は「正しい投資」の第一歩！</div>
                 <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
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
            <button onClick={() => { setSelectedEp(null); router.push('/money_secret/') }} className="w-full md:w-auto px-12 py-4 bg-white border border-gray-200 font-black rounded-xl shadow-sm hover:shadow-md transition-all">
              📖 一覧へ戻る
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 max-w-5xl mx-auto">
      <SectionHeader title="知らなきゃ損するお金の裏ワザ・節約術" level={1} />
      
      <CharacterSpeech 
        chara="/images/urakane_new.png"
        text="ヒッヒッ……。表の世界だけ見てちゃ、本当の成功は掴めねぇぜ。<br/>投資に潜む『罠』や『裏のルール』を教えてやるから、しっかり耳をかっぽじって聞きな！"
        color="#FFF9E6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MONEY_SECRETS.map((ep) => (
          <MangaCard key={ep.ep} href={`/money_secret/${ep.ep}/`} className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full relative" onClick={(e) => { e.preventDefault(); setSelectedEp(ep.ep); router.push(`/money_secret/${ep.ep}/`) }}>
             <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative border-b border-gray-100">
               <img src={ep.image_path} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
               <div className="hidden absolute inset-0 items-center justify-center text-6xl">🕵️</div>
               {ep.ep === 1 && (
                 <div className="absolute top-4 left-4 bg-danger text-white text-[0.65rem] font-black px-3 py-1 rounded-full shadow-lg border border-white z-30 animate-pulse">NEW!</div>
               )}
             </div>
             <div className="p-6 flex-1 flex flex-col">
                <div className="text-danger font-black text-xs mb-1">第{ep.ep}話</div>
                <h3 className="text-xl font-black text-text mb-2 line-clamp-2">{ep.title}</h3>
                <p className="text-muted text-sm mb-6 flex-1 leading-relaxed">{ep.summary}</p>
                
                <button className="w-full py-3 bg-danger/10 text-danger font-black rounded-lg group-hover:bg-danger group-hover:text-white transition-colors text-sm">
                  第{ep.ep}話を読む →
                </button>
             </div>
          </MangaCard>
        ))}
      </div>
    </div>
  )
}
