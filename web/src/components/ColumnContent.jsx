import React from 'react'
import { MangaCard } from './MangaComponents'
import { COLUMNS } from '../lib/columns'

export const ColumnList = ({ onSelect, limit }) => {
  const displayColumns = limit ? COLUMNS.slice(0, limit) : COLUMNS

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayColumns.map((col, index) => (
          <MangaCard 
            key={col.id} 
            className="p-0 overflow-hidden cursor-pointer flex flex-col h-full bg-white shadow-xl hover:shadow-2xl transition-all border border-gray-100"
          >
            <div onClick={() => onSelect(col.id)} className="h-full flex flex-col">
              <div className="h-44 overflow-hidden relative border-b border-gray-100">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none">
                  <div className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[0.65rem] font-black shadow-sm shrink-0" style={{ color: col.category_color }}>
                    {col.category}
                  </div>
                  {index === 0 && (
                    <div className="bg-danger/90 text-white px-3 py-1 rounded-full text-[0.65rem] font-black shadow-md z-10 shrink-0 border border-white/50">
                      NEW!
                    </div>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[0.65rem] text-muted mb-2 font-bold">{col.date}</div>
                <h3 className="font-black text-lg text-text leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {col.title.replace(/\*\*/g, '')}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                  {col.lead.replace(/\*\*/g, '')}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex gap-1">
                    {col.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[0.6rem] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-[0.7rem] font-bold text-primary">続きを読む →</span>
                </div>
              </div>
            </div>
          </MangaCard>
        ))}
      </div>
    </div>
  )
}

export const ColumnDetail = ({ columnId, onBack }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [columnId])

  const col = COLUMNS.find(c => c.id === columnId)
  if (!col) return <div>Column not found</div>

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-primary font-black hover:translate-x-[-4px] transition-transform">
        ← コラム一覧に戻る
      </button>

      <article className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
        <div className="relative">
          <img src={col.image} alt={col.title.replace(/\*\*/g, '')} className="w-full h-auto block" />
        </div>

        <div className="p-8 md:p-12 space-y-6">
          <div className="space-y-4">
             <div className="inline-block px-4 py-1 rounded-full text-sm font-black shadow-sm border border-gray-100" style={{ backgroundColor: `${col.category_color}15`, color: col.category_color }}>
                {col.category}
             </div>
             <h1 className="text-3xl md:text-5xl font-black text-text leading-tight">
               {col.title.replace(/\*\*/g, '')}
             </h1>
          </div>

          <div className="flex items-center justify-between text-muted text-sm border-b pb-6">
            <div className="flex items-center gap-4">
               <span>📅 {col.date}</span>
               <span>⏱️ 読了まで約{col.reading_time}分</span>
            </div>
            <div className="flex gap-2">
               {col.tags.map(tag => (
                 <span key={tag} className="bg-gray-50 px-3 py-1 rounded-full text-xs">#{tag}</span>
               ))}
            </div>
          </div>

          <p className="text-xl font-bold bg-primary-light p-6 rounded-2xl border-l-8 border-primary text-text italic leading-relaxed">
            {col.lead.replace(/\*\*/g, '')}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-text prose-p:text-muted prose-p:leading-loose">
            {col.body.split('\n').map((rawLine, i) => {
              const line = rawLine.replace(/\*\*/g, '');
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-black mt-12 mb-6">{line.replace('### ', '')}</h3>
              }
              if (line.startsWith('#### ')) {
                return <h4 key={i} className="text-xl font-black mt-8 mb-4">{line.replace('#### ', '')}</h4>
              }
              if (line.trim() === '') return <br key={i} />
              if (line.match(/^\d\./)) {
                return <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                  <span className="font-black text-primary text-2xl">{line.split('.')[0]}</span>
                  <span className="text-text font-bold leading-relaxed">{line.split('.').slice(1).join('.').trim()}</span>
                </div>
              }
              return <p key={i} className="mb-6">{line}</p>
            })}
          </div>

          <div className="mt-12 pt-8 border-t flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-secondary-light flex items-center justify-center border-2 border-secondary overflow-hidden shrink-0">
                <img src="/images/kabuhakase_new.png" alt="hakase" className="w-16 h-16 object-contain" />
             </div>
             <div>
                <div className="font-black text-text mb-1">カブ先生より一言</div>
                <p className="text-sm text-muted leading-relaxed italic">
                  {col.kabu_message || "難しいことがあれば、いつでも「質問箱」から送ってほしい。一つひとつ丁寧に答えるぞ。"}
                </p>
             </div>
          </div>
        </div>
      </article>
      
      <div className="text-center">
        <button onClick={onBack} className="bg-secondary text-text font-black px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          すべて解説を見終えたら戻る
        </button>
      </div>
    </div>
  )
}
