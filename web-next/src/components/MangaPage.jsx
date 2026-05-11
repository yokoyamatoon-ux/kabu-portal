"use client";
import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'
import MANGA_EPISODES from '../data/manga.json'
import { useRouter } from 'next/navigation'
import { resolveImagePath, handleImageError } from '../lib/image-utils'

export const MangaPage = ({ initialEp = null }) => {
  const router = useRouter()
  const [selectedEp, setSelectedEp] = useState(initialEp)

  const activeEp = MANGA_EPISODES.find(e => e.ep === selectedEp)

  if (activeEp) {
    // 互換性のための画像パス取得 (manga_pagesがあればそれを優先)
    const pages = activeEp.manga_pages || [activeEp.image || activeEp.thumbnail || `Manga${String(activeEp.ep).padStart(2, '0')}.jpg`];

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-16">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="パンくずリスト" className="mb-6 text-[0.65rem] md:text-xs font-bold text-muted flex items-center gap-2 px-4 md:px-0">
            <a href="/" className="hover:text-primary transition-colors">ホーム</a>
            <span className="text-gray-300">/</span>
            <a href="/manga/" className="hover:text-primary transition-colors">マンガ一覧</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400 truncate max-w-[150px] md:max-w-none">第{activeEp.ep}話 {activeEp.title}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
            <button onClick={() => { setSelectedEp(null); router.push('/manga/') }} className="px-4 py-2 bg-white text-text rounded-full shadow-sm border border-gray-100 font-bold hover:shadow-md transition-all text-sm flex items-center gap-2">
              ← 一覧にもどる
            </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-primary font-black text-sm mb-1">第{activeEp.ep}話</div>
          <h1 className="text-3xl font-black text-text leading-tight">{activeEp.title}</h1>
        </div>

        {/* マンガビューア部分 (複数枚対応) */}
        <div className="max-w-4xl mx-auto space-y-4">
          {pages.map((path, idx) => (
            <div key={idx} className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <img 
                src={resolveImagePath(path, "manga")} 
                alt={`${activeEp.title} - Page ${idx + 1}`} 
                className="w-full h-auto block" 
                onError={handleImageError}
              />
            </div>
          ))}
        </div>

        {/* --- マンガの内容解説 (SEO/AIO対策) --- */}
        {activeEp.description_long && (
          <div className="max-w-4xl mx-auto mt-10 bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-lg">
            <h2 className="text-xl font-black text-text mb-4 border-l-4 border-primary pl-4">
              このお話の内容
            </h2>
            <p className="text-muted leading-loose font-bold text-base md:text-lg">
              {activeEp.description_long}
            </p>
          </div>
        )}

        {/* --- カブ先生の深掘り解説 (NEW) --- */}
        {activeEp.commentary && activeEp.commentary.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16 bg-[#F8F9FA] rounded-[2.5rem] p-8 md:p-12 border-2 border-dashed border-gray-200">
            <div className="flex items-center gap-4 mb-10">
               <div className="bg-primary text-white px-6 py-2 rounded-full font-black text-sm shadow-sm">
                 Drill Down!
               </div>
               <h2 className="text-2xl font-black text-text">カブ先生の深掘り講座</h2>
            </div>

            <div className="space-y-8">
              {activeEp.commentary.map((chat, idx) => {
                const speaker = chat.speaker || chat.role;
                const isHakase = speaker === "hakase" || speaker === "kabu";
                const isMirai = speaker === "mirai";
                const isUrakane = speaker === "urakane";
                
                let charaImg = CHARA.maneta;
                let charaName = "マネ太";
                let bgColor = "#F0F7FF";
                let alignmentClass = "flex-row-reverse"; // 他（マネ太など）は右
                let bubbleClass = "rounded-tr-none bg-[#F0F7FF]";

                if (isHakase) {
                  charaImg = CHARA.hakase;
                  charaName = "カブ先生";
                  bgColor = "#FFF5F5";
                  alignmentClass = ""; // カブ先生は左
                  bubbleClass = "rounded-tl-none bg-[#FFF5F5]";
                } else if (isMirai) {
                  charaImg = CHARA.mirai;
                  charaName = "ミライ";
                  bgColor = "#FFF0F5";
                  alignmentClass = "flex-row-reverse";
                  bubbleClass = "rounded-tr-none bg-[#FFF0F5]";
                } else if (isUrakane) {
                  charaImg = CHARA.urakane; // ウラ金さん修正
                  charaName = "ウラ金さん";
                  bgColor = "#F4F4F4";
                  alignmentClass = "flex-row-reverse";
                  bubbleClass = "rounded-tr-none bg-[#F4F4F4] border-gray-300";
                }
                
                return (
                  <div key={idx} className={`flex items-start gap-4 ${alignmentClass}`}>
                    <div className="flex flex-col items-center shrink-0">
                      <img src={charaImg} alt={speaker} className="w-16 h-16 object-contain" />
                      <div className="text-[10px] font-black text-text opacity-40 mt-1">{charaName}</div>
                    </div>
                    <div 
                      className={`flex-1 p-5 rounded-3xl relative border border-gray-100 shadow-sm ${bubbleClass}`}
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="text-text font-bold leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: chat.text }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- まとめポイント (NEW) --- */}
        {activeEp.summary_points && activeEp.summary_points.length > 0 && (
           <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-8 border-2 border-primary/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📝</div>
              <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                <span>📍</span> 今回のまとめ
              </h2>
              <ul className="space-y-4">
                {activeEp.summary_points.map((point, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
                    <span className="font-bold text-text leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
           </div>
        )}

        {/* --- よくある質問 (NEW) --- */}
        {activeEp.faq && activeEp.faq.length > 0 && (
           <div className="max-w-4xl mx-auto mt-12 bg-secondary-light/20 rounded-3xl p-8 border border-secondary/30">
              <h4 className="text-lg font-black text-secondary-dark mb-6 flex items-center gap-2">
                <span>❓</span> 関連するギモン
              </h4>
              <div className="space-y-4">
                {activeEp.faq.map((item, idx) => (
                  <details key={idx} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <summary className="p-5 font-black text-text cursor-pointer hover:bg-gray-50 flex justify-between items-center list-none">
                      <span>{item.q}</span>
                      <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-5 pt-0 text-muted font-bold text-sm leading-relaxed border-t border-gray-50">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
           </div>
        )}

        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-dashed border-gray-200">
           {/* 証券会社リンク */}
           <div className="bg-gray-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex-1 text-center md:text-left">
                 <div className="font-black text-text text-sm mb-1 uppercase tracking-widest">おつかれさま！✨</div>
                 <div className="text-muted text-xs font-bold leading-relaxed">
                    読み終わったら、実際に証券口座を開設して、少しずつ始めてみるのが一番の勉強になるぞ！
                 </div>
              </div>
              <div className="flex gap-4">
                 <a href="https://ad2.trafficgate.net/t/r/1222/738/317294_396520" target="_blank" rel="nofollow" className="block bg-white p-2 rounded-lg border border-gray-100 hover:border-primary transition-all h-12 w-32 flex items-center justify-center">
                   <img src="https://srv2.trafficgate.net/t/b/1222/738/317294_396520" alt="楽天証券" className="max-w-full max-h-full object-contain" />
                 </a>
                 <a href="https://ad2.trafficgate.net/t/r/212/6012/317294_396520" target="_blank" rel="nofollow" className="block bg-white p-2 rounded-lg border border-gray-100 hover:border-primary transition-all h-12 w-32 flex items-center justify-center">
                   <img src="https://srv2.trafficgate.net/t/b/212/6012/317294_396520" alt="松井証券" className="max-w-full max-h-full object-contain" />
                 </a>
              </div>
           </div>

           {/* ナビゲーション */}
           <div className="grid grid-cols-3 gap-4">
            <div>
              {activeEp.ep > 1 && (
                <button onClick={() => setSelectedEp(activeEp.ep - 1)} className="w-full p-4 bg-white border border-gray-100 font-bold rounded-xl shadow-sm hover:shadow-md hover:text-primary transition-all text-sm md:text-base">
                  ← 第{activeEp.ep - 1}話
                </button>
              )}
            </div>
            <div>
              <button onClick={() => { setSelectedEp(null); router.push('/manga/') }} className="w-full p-4 bg-white border border-gray-100 font-bold rounded-xl shadow-sm hover:shadow-md hover:text-primary transition-all text-sm md:text-base">
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
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <SectionHeader title="マンガでわかるお金の話｜楽しく学ぶ金融漫画" level={1} />
      
      <CharacterSpeech 
        chara={CHARA.mirai}
        text="投資の基本から最新の制度まで、マンガで楽しく学ぼう！🌸<br/>難しい言葉もキャラクターたちが分かりやすく解説してくれるよ。"
        color="#FFF5F5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MANGA_EPISODES.map((ep) => (
          <MangaCard 
            key={ep.ep} 
            href={`/manga/${ep.ep}/`} 
            className="p-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-white border border-gray-100 flex flex-col h-full" 
            onClick={(e) => { e.preventDefault(); setSelectedEp(ep.ep); router.push(`/manga/${ep.ep}/`) }}
          >
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative border-b border-gray-100">
                <img 
                  src={resolveImagePath(ep.thumbnail || (ep.manga_pages && ep.manga_pages[0]) || `Manga${String(ep.ep).padStart(2, '0')}.jpg`, "manga")} 
                  alt={ep.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  onError={handleImageError} 
                />
                {!ep.thumbnail && !ep.manga_pages && (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">📖</div>
                )}
                {ep.ep === MANGA_EPISODES.length && (
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
