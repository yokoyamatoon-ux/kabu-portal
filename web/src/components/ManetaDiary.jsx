import React from 'react'
import { CharacterSpeech } from './MangaComponents'
import { CHARA } from '../lib/constants'

export const ManetaDiaryPage = ({ navigateTo }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16 max-w-3xl mx-auto space-y-8">
      <div className="bg-[#FFF9F0] p-6 md:p-10 rounded-3xl border-[3px] border-[#ffcc5c] shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        <h2 className="text-secondary-dark text-center text-2xl md:text-3xl font-black mb-6 pb-4 border-b-2 border-dashed border-[#ffcc5c]">
          📈 マネ太のはじめての投資日記
        </h2>

        <CharacterSpeech 
          chara={CHARA.maneta}
          text="みんな、こんにちは！マネ太だよ👦<br/>ボクが自腹で10万円から投資を始めて、100万円を目指すリアルな日記をつけていくよ！<br/>失敗も成功も全部見せるから、一緒に勉強しよう！"
          color="#FFFFFF"
        />

        <div className="mt-12 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 font-black text-secondary/20 text-6xl select-none group-hover:scale-110 transition-transform">#1</div>
             <div className="text-muted text-sm font-bold mb-2">2026年3月23日 (月)</div>
             <h3 className="text-xl font-black text-text mb-4 relative z-10">第1回：ついに口座を作ったぞ！</h3>
             <div className="text-muted leading-relaxed relative z-10 text-sm md:text-base">
                ついに、証券口座っていうのを作ったよ！<br/>
                カブ先生に教えてもらいながら、スマホでポチポチ……。<br/>
                マイナンバーカードとか、色んなものが必要でちょっと大変だったけど、これでボクも「投資家」の仲間入りだ✨<br/><br/>
                まずはカブ先生に言われた通り、<b>「NISA」</b>っていうおトクな制度の設定をしてみたよ。<br/>
                来月から毎月1万円ずつ、お小遣いを積み立てていくんだ。<br/>
                来月の今頃には、ボクの1万円はどうなってるのかな？ ワクワクするなぁ！
             </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 font-black text-secondary/20 text-6xl select-none group-hover:scale-110 transition-transform">#2</div>
             <div className="text-muted text-sm font-bold mb-2">2026年3月28日 (土)</div>
             <h3 className="text-xl font-black text-text mb-4 relative z-10">第2回：はじめての株購入！</h3>
             <div className="text-muted leading-relaxed relative z-10 text-sm md:text-base">
                今日は記念すべき日！ ついに、はじめて「株」を買ってみたよ！<br/>
                といっても、1株から買える<b>「単元未満株（SML）」</b>っていう仕組みを使ったから、数千円で済みました。<br/><br/>
                ボクが選んだのは、いつもお世話になっているゲーム会社の株。<br/>
                「自分が応援したい会社に投資する」のが基本ってカブ先生が言ってたからね！<br/>
                あと、1万円で<b>「全世界株式」の投資信託</b>も買ってみたよ。これで世界中の会社に少しずつ投資してることになるんだって。すごい！<br/><br/>
                株価が上がったり下がったりすると、スマホの画面を見るのがちょっとドキドキするけど、これも投資家としての第一歩だね！
             </div>
          </div>
        </div>

        <div className="text-center text-muted font-bold italic mt-12 mb-8 text-sm">
           —— 次回の更新をお楽しみに！ ——
        </div>

        <button onClick={() => navigateTo('home')} className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          ← ホームにもどる
        </button>
      </div>
    </div>
  )
}
