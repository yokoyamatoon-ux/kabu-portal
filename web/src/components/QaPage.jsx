import React, { useState } from 'react'
import { chara_img, CHARA, CharacterSpeech } from './MangaComponents'

const QA_DATABASE = {
    "円安ってなに？": "日本円の価値が他の国の通貨（ドルなど）に対して低くなることじゃ。輸入品が値上がりする反面、海外に物を売る輸出企業にとってはチャンスになるぞ！",
    "配当金はどうやってもらうの？": "投資商品を買って「権利確定日」まで持っていると、後日証券口座にお金が振り込まれるぞ。持ってるだけでお小遣いになる嬉しい仕組みじゃな！",
    "いくらから投資できるの？": "最近は100円から買える投資信託や、1株（数百円〜）から買えるミニ投資も充実しておるぞ。無理のない範囲で始めるのが一番じゃ！",
    "NISAって本当にお得なの？": "普通は投資で儲かると20%くらいの税金が取られるんじゃが、NISAならそれがゼロ！国が認めた「投資のご褒美」のようなものじゃな。",
    "おすすめの銘柄は？": "ワシは投資の最終判断は自分ですべきだと考えておる。まずはキミが知っている身近な会社や、応援したい会社を『探す』ページでチェックしてみるとよいぞ！",
}

export const QaPage = () => {
  const [chatHistory, setChatHistory] = useState([
    { role: "teacher", text: "こんにちは！カブ先生じゃ。投資のことで何かわからないことはあるかな？下のボタンを選ぶか、自由に質問してみておくれ。" }
  ])
  const [inputText, setInputText] = useState("")

  const handleFAQ = (q, a) => {
    setChatHistory(prev => [
      ...prev,
      { role: "user", text: q },
      { role: "teacher", text: a }
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const q = inputText.trim()
    let response = "むむ、それは鋭い質問じゃな。今はまだ勉強中なのじゃが、もっと詳しくなったら答えてみせるぞ！まずは基本の『よくある質問』をチェックしてみておくれ。"
    
    // Simple keyword matching
    for (const [keyword, answer] of Object.entries(QA_DATABASE)) {
       if (q.includes(keyword.substring(0, 2))) {
           response = answer
           break
       }
    }

    setChatHistory(prev => [
      ...prev,
      { role: "user", text: q },
      { role: "teacher", text: response }
    ])
    setInputText("")
  }

  const handleReset = () => {
    setChatHistory([{ role: "teacher", text: "こんにちは！カブ先生じゃ。投資のことで何かわからないことはあるかな？下のボタンを選ぶか、自由に質問してみておくれ。" }])
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-text mb-2 flex items-center gap-2">
          <span>🎓</span> カブ先生の質問箱
        </h2>
        <p className="text-muted text-sm md:text-base font-bold">
          投資のわからないこと、なんでもカブ先生に聞いてみよう！
        </p>
      </div>

      <div className="bg-[#FFF9F0] rounded-3xl p-4 md:p-8 min-h-[400px] border border-[#FFE082] shadow-sm flex flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto mb-6">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'teacher' && (
                 <div className="w-12 h-12 shrink-0 rounded-full border-2 border-[#FFE082] overflow-hidden bg-white">
                   <img src="/images/kabuhakase_new.png" alt="hakase" className="w-full h-full object-cover" />
                 </div>
              )}
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm md:text-base shadow-sm leading-relaxed ${
                msg.role === 'teacher' 
                  ? 'bg-white text-text border-2 border-[#FFE082] rounded-tl-none' 
                  : 'bg-primary text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="text-xs font-black text-muted mb-3 flex items-center gap-2">
             <span className="shrink-0 text-xl">👇</span> よくある質問
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(QA_DATABASE).map(([q, a]) => (
              <button 
                key={q} 
                onClick={() => handleFAQ(q, a)}
                className="px-4 py-2 bg-white border border-gray-200 text-text font-bold text-xs md:text-sm rounded-full shadow-sm hover:border-primary hover:text-primary transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="カブ先生に自由に質問する（β版）..." 
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm md:text-base"
            />
            <button type="submit" className="px-6 py-3 bg-text text-white font-black rounded-xl hover:bg-black transition-colors whitespace-nowrap shadow-md">
              送信 🚀
            </button>
          </form>
          <div className="mt-4 text-center">
             <button onClick={handleReset} className="text-xs text-muted font-bold hover:text-primary transition-colors underline bg-transparent border-none">
               チャットをリセット 🧹
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
