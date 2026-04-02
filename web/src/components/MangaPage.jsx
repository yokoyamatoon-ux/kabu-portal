import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'

const MANGA_EPISODES = [
  { ep: 1, title: '株ってなに？', summary: '会社の「オーナーの一部」になることを学ぼう！', image: '/images/Manga01.jpg', topic: 'basic' },
  { ep: 2, title: '配当金ってなに？', summary: '持ってるだけでもらえるお小遣い！', image: '/images/Manga03.jpg', topic: 'dividend' },
  { ep: 3, title: '株価はなぜ動くの？', summary: '需要と供給のしくみをマンガで理解しよう', image: '/images/Manga02.jpg', topic: 'market' },
  { ep: 4, title: 'NISAの始め方', summary: 'たったの3ステップ！投資デビューの最短ルートを教えるぞ✨', image: '/images/Manga04.jpg', topic: 'nisa' },
  { ep: 5, title: '成長株ってなに？', summary: 'グングン増えるチャンス！でもリスクには注意？', image: '/images/Manga05.jpg', topic: 'growth' },
]

export const MangaPage = () => {
  const [selectedEp, setSelectedEp] = useState(null)

  const activeEp = MANGA_EPISODES.find(e => e.ep === selectedEp)

  if (activeEp) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-16">
        <button onClick={() => setSelectedEp(null)} className="mb-6 px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
          ← 一覧にもどる
        </button>

        <div className="text-center mb-8">
          <div className="text-primary font-black text-sm mb-1">第{activeEp.ep}話</div>
          <h2 className="text-3xl font-black text-text leading-tight">{activeEp.title}</h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <img src={activeEp.image} alt={activeEp.title} className="w-full h-auto block" onError={(e) => {
             e.target.style.display = 'none';
             e.target.nextSibling.style.display = 'flex';
          }} />
          <div className="hidden flex-col items-center justify-center py-32 bg-gradient-to-br from-primary-light to-white text-center">
            <div className="text-6xl mb-4">📖✨</div>
            <div className="font-black text-xl text-text mb-2">ただいま制作中じゃ！</div>
            <div className="text-muted text-sm">第{activeEp.ep}話はもうすぐ公開されるぞ。楽しみに待っておれ！</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-dashed border-gray-200 grid grid-cols-3 gap-4">
          <div>
            {activeEp.ep > 1 && (
              <button onClick={() => setSelectedEp(activeEp.ep - 1)} className="w-full p-4 bg-white border border-gray-100 font-bold rounded-xl shadow-sm hover:shadow-md hover:text-primary transition-all text-sm md:text-base">
                ← 第{activeEp.ep - 1}話
              </button>
            )}
          </div>
          <div>
            <button onClick={() => setSelectedEp(null)} className="w-full p-4 bg-white border border-gray-100 font-bold rounded-xl shadow-sm hover:shadow-md hover:text-primary transition-all text-sm md:text-base">
              📖 一覧へ
            </button>
          </div>
          <div>
             {activeEp.ep < MANGA_EPISODES.length && (
              <button onClick={() => setSelectedEp(activeEp.ep + 1)} className="w-full p-4 bg-primary text-white font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg transition-all text-sm md:text-base">
                第{activeEp.ep + 1}話 →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <SectionHeader title="マンガで学ぶ" icon="📖" />
      
      <CharacterSpeech 
        chara={CHARA.mirai}
        text="投資の基本から最新の制度まで、マンガで楽しく学ぼう！🌸<br/>難しい言葉もキャラクターたちが分かりやすく解説してくれるよ。"
        color="#FFF5F5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MANGA_EPISODES.map((ep) => (
          <MangaCard key={ep.ep} className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full" onClick={() => setSelectedEp(ep.ep)}>
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative border-b border-gray-100">
                <img src={ep.image} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="hidden absolute inset-0 items-center justify-center text-6xl">🥬</div>
                {ep.ep === 4 && (
                   <div className="absolute top-4 right-4 bg-danger text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white animate-bounce z-10">NEW!</div>
                )}
              </div>
             <div className="p-6 flex-1 flex flex-col">
                <div className="text-primary font-black text-xs mb-1">第{ep.ep}話</div>
                <h3 className="text-xl font-black text-text mb-2 line-clamp-2">{ep.title}</h3>
                <p className="text-muted text-sm mb-6 flex-1 leading-relaxed">{ep.summary}</p>
                
                <button className="w-full py-3 bg-secondary-light text-secondary-dark font-black rounded-lg group-hover:bg-secondary transition-colors text-sm">
                  第{ep.ep}話を読む →
                </button>
             </div>
          </MangaCard>
        ))}
      </div>
    </div>
  )
}
