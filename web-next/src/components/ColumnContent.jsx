import React from 'react'
import COLUMNS from '../data/columns.json'
import { resolveImagePath, handleImageErrorServer } from '../lib/image-utils'
import { BackButton } from './BackButton'

// サーバーコンポーネント用の画像パス解決（クライアントサイドのハンドラは使わない）
const resolveImg = (path, type) => {
  if (!path) return "/images/placeholder.png";
  if (path.startsWith('http')) return path;
  return path;
};

export const ColumnList = ({ limit }) => {
  const displayColumns = limit ? COLUMNS.slice(0, limit) : COLUMNS

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayColumns.map((col, index) => (
          <a 
            key={col.id} 
            href={`/column/${col.id}/`}
            className="p-0 overflow-hidden cursor-pointer flex flex-col h-full bg-white shadow-xl hover:shadow-2xl transition-all border border-gray-100 rounded-2xl group"
          >
            <div className="h-full flex flex-col">
              <div className="h-44 overflow-hidden relative border-b border-gray-100">
                <img 
                  src={resolveImg(col.image, "column")} 
                  alt={col.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
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
          </a>
        ))}
      </div>
    </div>
  )
}

export const ColumnDetail = ({ columnId }) => {
  const col = COLUMNS.find(c => c.id === columnId)

  if (!col) return <div>Column not found</div>

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <nav aria-label="パンくずリスト" className="mb-6 text-[0.65rem] md:text-xs font-bold text-muted flex items-center gap-2 px-4 md:px-0">
        <a href="/" className="hover:text-primary transition-colors">ホーム</a>
        <span className="text-gray-300">/</span>
        <a href="/column/" className="hover:text-primary transition-colors">コラム一覧</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400 truncate max-w-[200px] md:max-w-none">{col.title.replace(/\*\*/g, '')}</span>
      </nav>

      <BackButton className="flex items-center gap-2 text-primary font-black hover:translate-x-[-4px] transition-transform">
        ← コラム一覧に戻る
      </BackButton>

      <article className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
        <div className="relative">
          <img 
            src={resolveImg(col.image, "column")} 
            alt={col.title.replace(/\*\*/g, '')} 
            className="w-full h-auto block" 
          />
        </div>

        <div className="p-8 md:p-12 space-y-6">
          {/* アフィリエイト表示（景品表示法対応） */}
          <div className="ad-notice text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
            ※本ページにはプロモーション（広告）が含まれています。
          </div>

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
            <div className="flex gap-2 flex-wrap">
               {col.tags.map(tag => (
                 <span key={tag} className="bg-gray-50 px-3 py-1 rounded-full text-xs">#{tag}</span>
               ))}
            </div>
          </div>

          {/* 定義段落（AIO対策） */}
          {col.definition && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl">
              <p className="text-base font-bold text-blue-900 leading-relaxed">
                {col.definition}
              </p>
            </div>
          )}

          <p className="text-xl font-bold bg-primary-light p-6 rounded-2xl border-l-8 border-primary text-text italic leading-relaxed">
            {col.lead.replace(/\*\*/g, '')}
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-text prose-p:text-muted prose-p:leading-loose">
            {col.body.split('\n').map((rawLine, i) => {
              const line = rawLine.replace(/\*\*/g, '').trim();
              if (line.startsWith('##')) {
                const headingText = line.replace(/^##\s*/, '');
                return <h2 key={i} className="text-2xl font-black mt-12 mb-6 border-b-2 border-primary-light pb-2">{headingText}</h2>
              }
              if (line.startsWith('###')) {
                const headingText = line.replace(/^###\s*/, '');
                return <h3 key={i} className="text-xl font-black mt-8 mb-4">{headingText}</h3>
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

          {/* 内部リンク（あわせて読みたい） */}
          {col.related_links && col.related_links.length > 0 && (
            <div className="mt-10 bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="font-black text-lg text-text mb-4 flex items-center gap-2">
                <span>📚</span> あわせて読みたい
              </h3>
              <ul className="space-y-3">
                {col.related_links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="text-primary font-bold hover:underline flex items-center gap-2">
                      <span>→</span> {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQセクション (AIO対策) */}
          {col.faq && col.faq.length > 0 && (
            <section className="faq-section mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black text-text mb-8 border-l-4 border-secondary pl-4">
                よくある質問
              </h2>
              <div className="space-y-6">
                {col.faq.map((item, idx) => (
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

          {/* 参考・出典 */}
          {col.sources && col.sources.length > 0 && (
            <div className="mt-8 text-sm text-gray-400 border-t pt-6">
              <p className="font-bold text-gray-500 mb-2">【参考・出典】</p>
              <ul className="space-y-1">
                {col.sources.map((src, i) => (
                  <li key={i}>・{src}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 bg-gradient-to-br from-secondary-light/30 to-white rounded-3xl p-8 border-2 border-dashed border-secondary/50 text-center">
             <div className="font-black text-text mb-4 flex items-center justify-center gap-3">
                <span className="text-2xl">🌱</span>
                <span>まずは小さな一歩から始めてみよう</span>
             </div>
             <p className="text-sm text-muted font-bold mb-8 leading-relaxed">
                解説を読んで知識がついたら、実際に口座を作って少額から触ってみるのが一番の道じゃ！<br/>
                カブ先生おすすめの証券会社をチェックしてみるのじゃ。
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-xl mx-auto">
                <a 
                  href="https://ad2.trafficgate.net/t/r/1222/738/317294_396520" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="block bg-white p-3 rounded-xl border-2 border-gray-100 hover:border-primary transition-all flex items-center justify-center h-16 group shadow-sm hover:shadow-md"
                >
                  <img src="https://srv2.trafficgate.net/t/b/1222/738/317294_396520" alt="楽天証券" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                </a>
                <a 
                  href="https://ad2.trafficgate.net/t/r/212/6012/317294_396520" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="block bg-white p-3 rounded-xl border-2 border-gray-100 hover:border-primary transition-all flex items-center justify-center h-16 group shadow-sm hover:shadow-md"
                >
                  <img src="https://srv2.trafficgate.net/t/b/212/6012/317294_396520" alt="松井証券" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                </a>
             </div>
          </div>

          <div className="mt-12 pt-8 border-t flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-secondary-light flex items-center justify-center border-2 border-secondary overflow-hidden shrink-0">
                <img src="/images/kabuhakase_new.png" alt="カブ先生" className="w-16 h-16 object-contain" />
             </div>
             <div>
                <div className="font-black text-text mb-1">カブ先生より一言</div>
                <p className="text-sm text-muted leading-relaxed italic">
                  {col.kabu_message || "難しいことがあれば、いつでも「質問箱」から送ってほしい。一つひとつ丁寧に答えるぞ。"}
                </p>
                <p className="text-xs text-gray-400 mt-2">監修：カブ先生（投資歴30年・元証券会社勤務）</p>
             </div>
          </div>
        </div>
      </article>
      
      <div className="text-center">
        <BackButton className="bg-secondary text-text font-black px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
          すべて解説を見終えたら戻る
        </BackButton>
      </div>
    </div>
  )
}
