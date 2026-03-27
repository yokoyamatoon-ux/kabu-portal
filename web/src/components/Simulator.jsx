import React, { useState } from 'react'
import { MangaCard, CharacterSpeech, SectionHeader } from './MangaComponents'
import { CHARA } from '../lib/constants'

export const Simulator = () => {
  const [balance, setBalance] = useState(10000)
  const [monthly, setMonthly] = useState(30000)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(5)

  const calculateResult = () => {
    let current = balance
    const monthlyRate = rate / 100 / 12
    const totalMonths = years * 12
    
    for (let i = 0; i < totalMonths; i++) {
      current = (current + monthly) * (1 + monthlyRate)
    }
    return Math.round(current)
  }

  const result = calculateResult()
  const totalInvested = balance + (monthly * years * 12)
  const profit = result - totalInvested

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionHeader title="つみたてシミュレーター" icon="📈" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MangaCard className="p-8 space-y-6 bg-white shadow-2xl">
           <h3 className="font-black text-lg text-text border-b-2 border-primary/20 pb-2">設定を入力するのじゃ</h3>
           
           <div className="space-y-4">
             <label className="block">
               <span className="text-sm font-bold text-muted">初期金額 (円)</span>
               <input 
                type="number" 
                value={balance} 
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-primary outline-none transition-colors" 
               />
             </label>

             <label className="block">
               <span className="text-sm font-bold text-muted">毎月の積立額 (円)</span>
               <input 
                type="number" 
                value={monthly} 
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-primary outline-none" 
               />
             </label>

             <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-bold text-muted">積立期間 (年)</span>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full mt-1 p-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-primary outline-none" 
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-muted">想定利回り (%)</span>
                  <input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full mt-1 p-3 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold focus:border-primary outline-none" 
                  />
                </label>
             </div>
           </div>

           <div className="bg-primary/5 p-4 rounded-xl text-[0.7rem] text-primary/70 font-bold leading-relaxed">
             ※この計算はあくまでシミュレーションであり、将来の運用成果をお約束するものではありません。
           </div>
        </MangaCard>

        <div className="space-y-6">
          <MangaCard className="bg-primary text-white p-8 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">💰</div>
             <div className="text-lg font-bold mb-2 opacity-90">{years}年後の資産額は...</div>
             <div className="text-5xl font-black mb-4">¥{result.toLocaleString()}</div>
             <div className="text-sm font-bold bg-white/20 inline-block px-4 py-1 rounded-full">
               運用益: +¥{profit.toLocaleString()}
             </div>
          </MangaCard>

          <CharacterSpeech 
            chara={CHARA.mirai} 
            text={`わぁ！{years}年でこんなに増えることもあるんだね！✨<br>コツコツ積み立てるのが一番の近道かも。`}
            color="#E8FFF8"
          />

          <MangaCard className="bg-white p-6">
             <h4 className="font-bold text-muted mb-4 flex items-center gap-2">
                📌 内訳の確認
             </h4>
             <div className="flex justify-between items-end gap-2 h-32">
                <div className="flex-1 flex flex-col justify-end items-center gap-2">
                   <div className="w-full bg-gray-200 rounded-t-lg transition-all duration-500" style={{ height: '60%' }}></div>
                   <span className="text-[0.6rem] font-bold text-muted">元本</span>
                </div>
                <div className="flex-1 flex flex-col justify-end items-center gap-2">
                   <div className="w-full bg-primary rounded-t-lg transition-all duration-500" style={{ height: '100%' }}></div>
                   <span className="text-[0.6rem] font-bold text-primary">運用成果</span>
                </div>
             </div>
          </MangaCard>
        </div>
      </div>
    </div>
  )
}
