import React from 'react'

export const ColumnStaticContent = ({ col }) => {
  if (!col) return null;

  // キャラクター設定（アイコンと配置）
  const charConfigs = {
    'カブ先生': { icon: '/images/kabuhakase_new.png', align: 'left' },
    'マネ太': { icon: '/images/maneta_new.png', align: 'right' },
    'ミライ': { icon: '/images/mirai_new.png', align: 'right' }
  };

  // 物理的なHTMLタグとして出力。会話形式をキャラごとに左右に振り分ける。
  const processedBody = col.body.split('\n')
    .map(rawLine => {
      let line = rawLine.replace(/\*\*/g, '').trim();
      
      // 画像記法の処理
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2];
        return `<div class="my-12"><img src="${src}" alt="${alt}" class="w-full h-auto rounded-3xl shadow-xl border border-gray-100" /></div>`;
      }

      const speechMatch = line.match(/^([^：]+)：(.+)$/);
      if (speechMatch) {
        const name = speechMatch[1];
        const text = speechMatch[2];
        const config = charConfigs[name];

        if (config) {
          const isLeft = config.align === 'left';
          return `
            <div class="flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-start gap-3 md:gap-4 mb-10">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-100 overflow-hidden shrink-0 bg-gray-50 shadow-sm">
                <img src="${config.icon}" alt="${name}" class="w-full h-full object-contain" />
              </div>
              <div class="relative max-w-[85%] md:max-w-[75%] ${isLeft ? 'bg-gray-50' : 'bg-primary-light'} p-4 md:p-5 rounded-2xl border border-gray-100 text-text font-bold leading-relaxed shadow-sm">
                <div class="text-[0.65rem] md:text-xs ${isLeft ? 'text-primary' : 'text-primary-dark'} font-black mb-1 ${isLeft ? 'text-left' : 'text-right'}">${name}</div>
                ${text}
                ${isLeft 
                  ? '<div class="absolute top-4 -left-2 w-4 h-4 bg-gray-50 border-l border-b border-gray-100 rotate-45"></div>'
                  : '<div class="absolute top-4 -right-2 w-4 h-4 bg-primary-light border-r border-t border-gray-100 rotate-45"></div>'
                }
              </div>
            </div>
          `;
        }
      }

      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-black mt-16 mb-8 text-text border-b-4 border-primary-light pb-3 flex items-center gap-2"><span class="text-primary">●</span>${line.replace('## ', '')}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-black mt-10 mb-6 text-text border-l-4 border-primary-light pl-3">${line.replace('### ', '')}</h3>`;
      }
      if (line === '') return '<div class="h-4"></div>';
      if (line.match(/^\d\./)) {
        const num = line.split('.')[0];
        const text = line.split('.').slice(1).join('.').trim();
        return `
          <div class="flex gap-4 p-5 bg-gray-50 rounded-2xl mb-6 border border-gray-100 shadow-inner">
            <span class="font-black text-primary text-3xl opacity-50">${num}</span>
            <span class="text-text font-bold leading-relaxed">${text}</span>
          </div>
        `;
      }
      return `<p class="mb-8 text-muted font-bold leading-loose px-2">${line}</p>`;
    })
    .join('');

  const rawHtml = `
    <article class="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
      <nav aria-label="パンくずリスト" class="px-6 md:px-14 pt-8 text-[0.65rem] md:text-xs font-bold text-muted flex items-center gap-2">
        <a href="/" class="hover:text-primary transition-colors">ホーム</a>
        <span class="text-gray-300">/</span>
        <a href="/column/" class="hover:text-primary transition-colors">コラム一覧</a>
        <span class="text-gray-300">/</span>
        <span class="text-gray-400 truncate max-w-[150px] md:max-w-none">${col.title.replace(/\*\*/g, '')}</span>
      </nav>
      <div class="relative">
        <img src="${col.image}" alt="${col.title.replace(/\*\*/g, '')}" class="w-full h-auto block" />
      </div>
      <div class="p-6 md:p-14 space-y-8">
        <div class="ad-notice text-[0.6rem] md:text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 inline-block">
          ※本ページにはプロモーション（広告）が含まれています。
        </div>
        <div class="space-y-4">
           <div class="inline-block px-5 py-1.5 rounded-full text-sm font-black shadow-sm border border-gray-100" style="background-color: ${col.category_color}15; color: ${col.category_color}">
              ${col.category}
           </div>
           <h1 class="text-3xl md:text-5xl font-black text-text leading-tight tracking-tighter">
             ${col.title.replace(/\*\*/g, '')}
           </h1>
        </div>
        <div class="flex items-center justify-between text-muted text-xs md:text-sm border-b border-dashed pb-8">
          <div class="flex items-center gap-6">
             <span class="flex items-center gap-1">📅 ${col.date}</span>
             <span class="flex items-center gap-1">⏱️ 約${col.reading_time}分</span>
          </div>
        </div>
        ${col.definition ? `<div class="bg-blue-50 border-l-8 border-blue-400 p-6 rounded-r-2xl shadow-sm"><p class="text-lg font-bold text-blue-900 leading-relaxed">${col.definition}</p></div>` : ''}
        
        ${col.conclusion ? `
          <div class="bg-primary/5 rounded-[2rem] p-8 border-2 border-primary/20 relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <span class="text-6xl">💡</span>
            </div>
            <h2 class="text-xl font-black text-primary mb-4 flex items-center gap-2">
              <span class="bg-primary text-white text-xs px-2 py-1 rounded uppercase tracking-widest">Answer First</span>
              この記事の結論
            </h2>
            <p class="text-text font-black text-xl md:text-2xl leading-relaxed relative z-10">
              ${col.conclusion}
            </p>
          </div>
        ` : ''}

        <div class="bg-gray-50/50 p-8 rounded-[2rem] border-2 border-gray-100 text-text font-bold italic text-lg md:text-xl leading-relaxed relative">
          <span class="absolute -top-4 -left-2 text-4xl text-primary opacity-20">"</span>
          ${col.lead.replace(/\*\*/g, '')}
        </div>
        <div class="prose prose-lg max-w-none mt-16">
          ${processedBody}
        </div>

        ${col.sources && col.sources.length > 0 ? `
          <div class="mt-16 pt-12 border-t border-gray-100">
            <h3 class="text-lg font-black text-text mb-6 flex items-center gap-3">
              <span class="text-xl">🔍</span>
              出典・参考文献
            </h3>
            <ul class="space-y-3">
              ${col.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="text-sm text-muted hover:text-primary transition-colors flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    ${source.name}
                    <span class="text-[10px] opacity-50">🔗</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${col.related_links && col.related_links.length > 0 ? `
          <div class="mt-16 bg-amber-50 rounded-[2rem] p-8 border border-amber-100 shadow-sm">
            <h3 class="font-black text-xl text-text mb-6 flex items-center gap-3">
              <span class="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-sm">📚</span>
              あわせて読みたい
            </h3>
            <ul class="space-y-4">
              ${col.related_links.map(link => `<li><a href="${link.url}" class="text-primary font-black hover:underline flex items-center gap-3 group"><span class="group-hover:translate-x-1 transition-transform">→</span> ${link.text}</a></li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${col.faq && col.faq.length > 0 ? `
          <section class="faq-section mt-24 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
            <h2 class="text-3xl font-black text-text mb-10 flex items-center gap-4">
              <span class="text-secondary text-4xl">🤔</span>
              よくある質問
            </h2>
            <div class="space-y-8">
              ${col.faq.map(item => `
                <div class="faq-item bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 class="text-xl font-black text-text mb-4 flex gap-3">
                    <span class="text-secondary">Q.</span>
                    ${item.q}
                  </h3>
                  <div class="flex gap-3 text-muted font-bold leading-loose">
                    <span class="text-primary">A.</span>
                    <p>${item.a}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        <div class="mt-24 bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
           <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
           <div class="relative z-10">
             <div class="font-black mb-6 flex items-center justify-center gap-3 text-2xl">
                <span>🌱</span>
                <span>まずは小さな一歩から始めてみよう</span>
             </div>
             <p class="text-white/90 font-bold mb-12 leading-relaxed max-w-2xl mx-auto text-lg">
                解説を読んで知識がついたら、実際に口座を作って少額から触ってみるのが一番の道じゃ！<br/>カブ先生おすすめの証券会社をチェックしてみるのじゃ。
             </p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <a href="https://ad2.trafficgate.net/t/r/1222/738/317294_396520" target="_blank" rel="nofollow noopener noreferrer" class="block bg-white p-5 rounded-2xl hover:scale-105 transition-all flex items-center justify-center h-20 group shadow-xl">
                  <img src="https://srv2.trafficgate.net/t/b/1222/738/317294_396520" alt="楽天証券" class="max-w-full max-h-full object-contain" />
                </a>
                <a href="https://ad2.trafficgate.net/t/r/212/6012/317294_396520" target="_blank" rel="nofollow noopener noreferrer" class="block bg-white p-5 rounded-2xl hover:scale-105 transition-all flex items-center justify-center h-20 group shadow-xl">
                  <img src="https://srv2.trafficgate.net/t/b/212/6012/317294_396520" alt="松井証券" class="max-w-full max-h-full object-contain" />
                </a>
             </div>
           </div>
        </div>
        
        <div class="mt-24 bg-white rounded-[3rem] border-4 border-primary/10 p-8 md:p-12 shadow-xl relative">
          <div class="absolute -top-6 left-12 bg-primary text-white px-6 py-2 rounded-full font-black text-sm tracking-widest shadow-lg">
            AUTHOR & SUPERVISOR
          </div>
          <div class="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div class="relative">
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-50 flex items-center justify-center border-4 border-white overflow-hidden shadow-2xl relative z-10">
                <img src="/images/kabuhakase_new.png" alt="カブ先生" class="w-28 h-28 md:w-32 md:h-32 object-contain" />
              </div>
              <div class="absolute -bottom-2 -right-2 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg z-20 border-4 border-white">
                🎓
              </div>
            </div>
            <div class="flex-1 text-center md:text-left space-y-4">
              <div>
                <div class="text-primary font-black text-sm uppercase tracking-widest mb-1">投資教育専門家・元証券マン</div>
                <h3 class="text-3xl font-black text-text">カブ先生 <span class="text-lg font-bold text-muted ml-2">(Kabu Hakase)</span></h3>
              </div>
              <p class="text-muted font-bold leading-relaxed">
                大手証券会社にて個人投資家向けの資産運用アドバイザーとして15年以上勤務。現在は「お金の学校」校長として、1,000名以上の初心者にNISAやiDeCoを通じた資産形成のノウハウを伝授している。座右の銘は「果報は寝て待て」。
              </p>
              <div class="pt-4 flex flex-col md:flex-row items-center gap-4 text-xs font-black">
                <span class="px-4 py-2 bg-primary/10 text-primary rounded-full">日本FP協会認定 AFPR</span>
                <span class="px-4 py-2 bg-primary/10 text-primary rounded-full">証券外務員一種</span>
                <span class="px-4 py-2 bg-primary/10 text-primary rounded-full">元大手証券アドバイザー</span>
              </div>
              <div class="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 italic font-bold text-text relative">
                <span class="absolute -top-3 left-4 text-primary bg-gray-50 px-2 text-sm">カブ先生より一言</span>
                「${col.kabu_message || "難しいことがあれば、いつでも『質問箱』から送ってほしい。"}」
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
};
