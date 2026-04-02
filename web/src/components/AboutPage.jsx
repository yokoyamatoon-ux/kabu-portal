import React from 'react'
import { MangaCard } from './MangaComponents'

export const AboutPage = () => {
  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
        <img 
          src="/images/banner_nyugaku.jpg" 
          alt="入学案内" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-black text-text leading-tight">
          🎓 カブ先生の学校に<br />入学しよう！
        </h1>
        <p className="text-muted font-bold italic">
          むずかしい言葉ゼロ。あなたのペースで、お金のことを学べる場所じゃ。
        </p>
      </div>

      {/* Manga content */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <img src="/images/Nyugaku01.png?v=2" alt="カブ先生の学校 マンガ1" className="w-full h-auto rounded-2xl shadow-md border-2 border-gray-100" />
        <img src="/images/Nyugaku02.png?v=2" alt="カブ先生の学校 マンガ2" className="w-full h-auto rounded-2xl shadow-md border-2 border-gray-100" />
      </div>

      {/* Section 1: Checklist */}
      <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFF0F0] rounded-[2rem] p-8 md:p-10 border border-[#FFE0D0] shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B6B] opacity-5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000"></div>
        <h2 className="text-xl font-black text-text mb-6 flex items-center gap-2">
          🤔 こんなこと、思ったことない？
        </h2>
        <div className="space-y-4">
          {[
            '貯金はしてるけど、このままでいいのか不安…',
            'NISAってよく聞くけど、何をすればいいかわからない',
            '投資って難しそうで、自分には無理そう',
            'お金のことを誰かにわかりやすく教えてほしい'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 text-text font-bold leading-relaxed">
              <span className="text-[#E85555] text-xl">☑</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white/80 backdrop-blur rounded-2xl p-6 flex items-center gap-6 border border-white shadow-sm">
          <span className="text-4xl">🥬</span>
          <p className="text-muted font-black leading-relaxed">
            1つでも当てはまったら、このサイトはあなたのためにあるじゃ！
          </p>
        </div>
      </div>

      {/* Section 2: Why now? */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-text border-l-8 border-primary pl-6 py-2">
          ⚠️ 実は、「貯めるだけ」では間に合わない時代になっています
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '👴', title: '年金だけでは不足', desc: '老後2,000万円問題が話題に。公的年金だけでは生活費が足りない可能性が高まっています。', color: '#FFF5F5', border: '#FFD0D0', text: '#E85555' },
            { icon: '📈', title: '物価は上がり続けている', desc: '食料品・光熱費・日用品…ここ数年で10〜20%以上値上がり。同じお金で買えるものが減っています。', color: '#FFFAF0', border: '#FFE0A0', text: '#E8A000' },
            { icon: '🏦', title: '銀行の金利はほぼゼロ', desc: '100万円を1年預けても増えるのは100円ほど。物価上昇を考えると、実質的にお金が減っています。', color: '#F0FFF8', border: '#A0E8C8', text: '#009688' },
          ].map((card, i) => (
            <MangaCard key={i} className="p-8 text-center" style={{ backgroundColor: card.color, borderColor: card.border, borderWidth: '2px' }}>
              <div className="text-4xl mb-4">{card.icon}</div>
              <div className="font-black mb-4" style={{ color: card.text }}>{card.title}</div>
              <p className="text-xs text-muted leading-relaxed font-bold">
                {card.desc}
              </p>
            </MangaCard>
          ))}
        </div>
        <div className="bg-gray-100 rounded-2xl p-8 text-center">
          <p className="text-muted font-black leading-loose italic">
            💡 だからといって、いきなり難しい株取引をする必要はありません。<br />
            <span className="text-text text-lg">まずは「お金の仕組み」を知るだけで、選択肢がぐっと広がります。</span><br />
            それがこのサイトの目的じゃ！
          </p>
        </div>
      </div>

      {/* Section 3: Comparison */}
      <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-inner">
        <h2 className="text-lg font-black text-text mb-8 text-center">
          📊 100万円を20年運用したら？
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-gray-200">
              <div className="text-3xl mb-1">🏦</div>
              <div className="text-[0.7rem] text-muted mb-1">銀行に預けると</div>
              <div className="text-2xl font-black text-text">約100万円</div>
              <div className="text-[0.65rem] text-muted mt-2">ほぼ変わらず</div>
            </div>
            <div className="hidden md:flex justify-center text-4xl text-gray-200">→</div>
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-secondary shadow-lg shadow-secondary/10">
              <div className="text-3xl mb-1">📈</div>
              <div className="text-[0.7rem] text-muted mb-1">年3%で運用すると</div>
              <div className="text-2xl font-black text-secondary-dark">約180万円</div>
              <div className="text-[0.65rem] text-muted mt-2">+80万円</div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 bg-white rounded-2xl p-6 text-center border-2 border-primary shadow-xl shadow-primary/10">
              <div className="text-4xl mb-1">🌱</div>
              <div className="text-[0.7rem] text-muted mb-1">年5%で運用すると</div>
              <div className="text-3xl font-black text-primary">約265万円</div>
              <div className="text-[0.65rem] text-muted mt-2">+165万円</div>
            </div>
          </div>
        </div>
        <p className="text-[0.65rem] text-muted mt-8 text-right italic">
          ※投資にはリスクがあります。上記はあくまで参考値です。元本割れの可能性もあります。
        </p>
      </div>

      <div className="text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="bg-primary text-white font-black px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          ホームに戻って冒険を始める！
        </button>
      </div>
    </div>
  )
}
