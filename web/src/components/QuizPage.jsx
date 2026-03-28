import React, { useState } from 'react'
import { SectionHeader } from './MangaComponents'

const QUIZZES = [
  {
      question: "投資の世界で「インデックス」ってどんな意味？",
      options: ["A: 世界中の会社の成績の平均点", "B: 銀行の手数料のこと", "C: 新しい仮想通貨", "D: 株式市場の休みのこと"],
      answer: "A: 世界中の会社の成績の平均点",
      explanation: "「S&P500」や「日経平均」などが有名だね。一つの会社だけでなく、たくさんの会社のまとまった動きを表す数字だよ。"
  },
  {
      question: "会社がもうかった時に、株主（かぶぬし）に配ってくれるお金のことを何という？",
      options: ["A: おこづかい", "B: ボーナス", "C: 配当金（はいとうきん）", "D: キャッシュバック"],
      answer: "C: 配当金（はいとうきん）",
      explanation: "会社が稼いだお金の一部を、株を持っているみんなで分けるんだ。「高配当株」はこれがたくさんもらえる株のことだよ。"
  },
  {
      question: "投資の神様と呼ばれるウォーレン・バフェットが「世界で一番の力」と呼んだものはどれ？",
      options: ["A: 気合", "B: 複利（ふくり）", "C: まぐれ", "D: インターネット"],
      answer: "B: 複利（ふくり）",
      explanation: "増えたお金をまた投資に回すことで、雪だるま式にどんどんお金が増えていくことを「複利」と言うよ。時間がたつほど力が強くなるんだ。"
  },
  {
      question: "株を買うときのリスク（ちゅうい点）について、正しいのはどれ？",
      options: ["A: ぜったいにお金は減らない", "B: 銀行に預けるより安全", "C: 買った時より値段が下がる（元本割れ）ことがある", "D: 買ったらすぐに売らないといけない"],
      answer: "C: 買った時より値段が下がる（元本割れ）ことがある",
      explanation: "株の値段は毎日上がったり下がったりするよ。だから、すぐ使う予定のない「よゆうのお金」で長く続けるのが大事なんだ。"
  }
]

export const QuizPage = ({ navigateTo }) => {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleCheck = () => {
    if (!selected) return
    setAnswered(true)
    if (selected === QUIZZES[idx].answer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    setIdx(i => i + 1)
    setAnswered(false)
    setSelected(null)
  }

  const handleRestart = () => {
    setIdx(0)
    setScore(0)
    setAnswered(false)
    setSelected(null)
  }

  if (idx >= QUIZZES.length) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6 text-center animate-in zoom-in duration-500">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-text mb-4">クイズしゅうりょう！</h2>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <p className="text-xl font-bold mb-2 text-muted">あなたのスコアは...</p>
          <div className="text-4xl font-black text-primary">{QUIZZES.length}問中 {score}問 正解</div>
        </div>
        <button onClick={handleRestart} className="px-8 py-4 bg-primary text-white font-black rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          もう一度チャレンジ！
        </button>
      </div>
    )
  }

  const q = QUIZZES[idx]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16 max-w-3xl mx-auto space-y-8">
      <SectionHeader title="投資クイズ — めざせ投資マスター！" icon="🕹️" />
      <p className="text-muted text-sm md:text-base font-bold bg-white p-4 rounded-xl border border-gray-100 mb-8 inline-block shadow-sm">
        投資のキホンをクイズで楽しく学ぼう。全問正解できるかな？
      </p>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 font-black text-primary/20 text-6xl select-none z-0">
          Q{idx + 1}
        </div>
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-black text-text mb-8 leading-snug">
            <span className="text-primary mr-2">Q{idx + 1}.</span> {q.question}
          </h3>

          <div className="space-y-3 mb-8">
            {q.options.map(opt => {
              const isSelected = selected === opt
              let btnClass = isSelected ? "border-primary bg-primary-light" : "border-gray-200 hover:border-primary/50"
              if (answered) {
                 if (opt === q.answer) btnClass = "border-success bg-success/10"
                 else if (isSelected && opt !== q.answer) btnClass = "border-danger bg-danger/10"
              }
              return (
                <button
                  key={opt}
                  disabled={answered}
                  onClick={() => setSelected(opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${btnClass} ${!answered && 'hover:-translate-y-0.5 shadow-sm hover:shadow'} disabled:opacity-90 disabled:cursor-default`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {!answered ? (
            <button
              disabled={!selected}
              onClick={handleCheck}
              className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-md disabled:bg-gray-300 disabled:shadow-none hover:bg-primary-dark transition-all"
            >
              こたえあわせ！
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-2">
              <div className="mb-6 p-4 rounded-xl border flex items-start gap-4 bg-gray-50">
                 <div className="text-3xl shrink-0 mt-1">🤖</div>
                 <div>
                    <div className="font-black text-lg mb-1">
                      {selected === q.answer ? <span className="text-success">⭕ 大正解！</span> : <span className="text-danger">❌ ざんねん！正解は「{q.answer}」でした。</span>}
                    </div>
                    <p className="text-muted text-sm leading-relaxed"><span className="font-bold">AIの解説:</span><br/>{q.explanation}</p>
                 </div>
              </div>
              <button onClick={handleNext} className="w-full py-4 bg-text text-white font-black rounded-xl shadow-md hover:bg-black transition-all flex justify-center items-center gap-2">
                つぎの問題へ ➡️
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-[#E3F2FD] to-white rounded-2xl p-6 border-2 border-[#BBDEFB] shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between group">
        <div className="flex items-center gap-4">
          <div className="text-5xl group-hover:scale-110 transition-transform">🎮</div>
          <div>
            <div className="text-lg font-black text-[#1565C0] mb-1">次は実践！仮想投資ゲーム</div>
            <div className="text-sm font-bold text-[#546E7A]">クイズで学んだ知識を使って、100万円をどこまで増やせるかな？</div>
          </div>
        </div>
        <button onClick={() => navigateTo('explore')} className="shrink-0 px-6 py-3 bg-[#1565C0] text-white font-black rounded-full shadow-md hover:bg-[#0D47A1] transition-colors w-full md:w-auto">
          シミュレーションへ 🚀
        </button>
      </div>
    </div>
  )
}
