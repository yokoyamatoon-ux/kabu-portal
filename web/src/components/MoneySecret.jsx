import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'
import MONEY_SECRETS from '../data/money_secrets.json'

// Create an image mapping to replace placeholders in the raw HTML string
const ICON_MAP = {
  '{{HAKASE_ICON}}': `<img src="${CHARA.hakase}" alt="hakase" style="width:50px; height:50px; object-fit:contain;" />`,
  '{{MANETA_ICON}}': `<img src="${CHARA.maneta}" alt="maneta" style="width:50px; height:50px; object-fit:contain;" />`,
  '{{MIRAI_ICON}}': `<img src="${CHARA.mirai}" alt="mirai" style="width:50px; height:50px; object-fit:contain;" />`,
  '{{URAKANE_ICON}}': `<img src="/images/urakane_new.png" alt="urakane" style="width:50px; height:50px; object-fit:contain;" />`,
  '{{WARNING_ICON}}': `⚠️`
}

export const MoneySecretPage = () => {
  const [selectedEp, setSelectedEp] = useState(null)

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
        <button onClick={() => setSelectedEp(null)} className="mb-6 px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
          ← 一覧にもどる
        </button>

        <div className="text-center mb-8">
          <div className="text-primary font-black text-sm mb-1">第{activeEp.ep}話</div>
          <h2 className="text-2xl md:text-3xl font-black text-text leading-tight">{activeEp.title}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 mx-auto">
           <div className="text-center mb-8">
             <img src={`/images/urakane0${activeEp.ep}.jpg`} alt={activeEp.title} className="w-full max-w-2xl mx-auto rounded-xl shadow-md border border-gray-100 object-cover" onError={(e) => { e.target.style.display='none'; }} />
           </div>
           
           <div 
             className="prose prose-sm md:prose-base max-w-none prose-p:my-2 prose-img:m-0"
             dangerouslySetInnerHTML={{ __html: processHtml(activeEp.chat_html) }} 
           />
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
      <SectionHeader title="お金の裏事情ファイル" icon="🕵️" />
      
      <CharacterSpeech 
        chara="/images/urakane_new.png"
        text="ヒッヒッ……。表の世界だけ見てちゃ、本当の成功は掴めねぇぜ。<br/>投資に潜む『罠』や『裏のルール』を教えてやるから、しっかり耳をかっぽじって聞きな！"
        color="#FFF9E6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MONEY_SECRETS.map((ep) => (
          <MangaCard key={ep.ep} className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full relative" onClick={() => setSelectedEp(ep.ep)}>
             <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative border-b border-gray-100">
               <img src={`/images/urakane0${ep.ep}.jpg`} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
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
