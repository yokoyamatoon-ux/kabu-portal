import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, MangaCard } from './MangaComponents'

export const LegalPage = ({ type = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(type)
  const [formData, setFormData] = useState({ name: '', email: '', category: 'サイトに関するご意見・ご感想', message: '', agree: false })
  const [submitted, setSubmitted] = useState(false)

  const tabs = [
    { id: 'privacy', label: '🔒 プライバシーポリシー', title: 'プライバシーポリシー' },
    { id: 'disclaimer', label: '⚠️ 免責事項', title: '免責事項' },
    { id: 'tokushoho', label: '📋 特定商取引法表記', title: '特定商取引法に基づく表記' },
    { id: 'contact', label: '✉️ お問い合わせ', title: 'お問い合わせ' },
  ]

  const renderPrivacy = () => (
    <div className="space-y-6 text-text/80 leading-relaxed text-sm md:text-base">
      <div className="text-[0.65rem] text-muted font-bold">最終更新日：2026年3月13日</div>
      <p>カブ先生のだれでもわかるお金の学校（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
      
      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-primary pl-3 mb-3">1. 収集する情報</h3>
        <p>当サイトでは、現在以下の情報を収集する場合があります。</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時）</li>
          <li>Cookieによるセッション情報（ページ遷移・診断結果の一時保存）</li>
          <li>お問い合わせフォームからご入力いただいた情報</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-primary pl-3 mb-3">2. 収集した情報の利用目的</h3>
        <p>収集した情報は以下の目的にのみ使用します：</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>サービスの改善・機能開発</li>
          <li>アクセス解析（Google Analytics などの第三者サービスを利用する場合があります）</li>
          <li>お問い合わせへの回答</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-primary pl-3 mb-3">3. 第三者への提供</h3>
        <p>当サイトは、以下の場合を除き、ユーザーの個人情報を第三者に提供・開示しません：</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-primary pl-3 mb-3">4. Cookieについて</h3>
        <p>当サイトではセッション管理のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることが可能ですが、一部機能が正常に動作しなくなる場合があります。</p>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-primary pl-3 mb-3">5. アクセス解析ツール</h3>
        <p>当サイトでは、Google Analytics を使用する場合があります。Google Analytics はCookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。詳しくは <a href="https://policies.google.com/privacy" target="_blank" className="text-primary hover:underline">Googleのプライバシーポリシー</a> をご参照ください。</p>
      </section>

      <div className="bg-secondary-light p-4 rounded-xl text-xs text-secondary-dark font-bold">
        本ポリシーに関するお問い合わせは、お問い合わせページよりお願いします。
      </div>
    </div>
  )

  const renderDisclaimer = () => (
    <div className="space-y-6 text-text/80 leading-relaxed text-sm md:text-base">
      <div className="text-[0.65rem] text-muted font-bold">最終更新日：2026年3月13日</div>
      
      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-danger pl-3 mb-3">1. 投資に関する免責</h3>
        <p>当サイトで提供する情報は、<strong>教育・情報提供を目的としたものです</strong>。特定の金融商品・有価証券の購入、売却、保有を推薦するものではありません。</p>
        <p className="mt-2 text-danger font-bold">投資判断はご自身の責任のもとで行ってください。当サイトの情報を利用したことで生じた損失・損害について、当サイトは一切責任を負いません。</p>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-danger pl-3 mb-3">2. 情報の正確性について</h3>
        <p>当サイトでは正確な情報の提供に努めますが、掲載情報の完全性・正確性・最新性を保証するものではありません。株価・為替・金融商品の情報は、実際の市場価格と異なる場合があります。</p>
      </section>

      <section>
        <h3 className="text-lg font-black text-text border-l-4 border-danger pl-3 mb-3">3. AI診断・コンテンツについて</h3>
        <p>当サイトの「AI投資診断」や「カブ先生の質問箱」などのコンテンツは、教育目的のエンターテイメントです。投資アドバイスや金融相談の代替となるものではありません。</p>
      </section>

      <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs text-muted italic">
        当サイトのキャラクター・テキスト・デザイン・画像等のコンテンツは、当サイトに帰属します。無断転載・複製を禁じます。
      </div>
    </div>
  )

  const renderTokushoho = () => (
    <div className="space-y-6 text-text/80 leading-relaxed text-sm md:text-base">
      <div className="text-[0.65rem] text-muted font-bold">最終更新日：2026年3月13日</div>
      <p>当サイトは現在、有料サービス・商品の販売は行っておりません。ただし、法令に準じて運営者情報を開示します。</p>

      <div className="overflow-hidden border border-gray-100 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-gray-100">
            {[
              ['運営者名', 'TooN合同会社'],
              ['代表者名', '横山 将明'],
              ['所在地', '〒520-0044 滋賀県大津市京町4-4-8'],
              ['電話番号', '077-576-4779'],
              ['メールアドレス', 'お問い合わせページよりご連絡ください'],
              ['サービス内容', '投資教育・情報提供コンテンツ（無料）'],
              ['料金', '無料（別途有料サービスが生じる場合は別途明示）'],
            ].map(([label, val]) => (
              <tr key={label} className="hover:bg-gray-50/50">
                <th className="bg-secondary-light/30 p-4 w-1/3 text-xs md:text-sm font-black text-text/70">{label}</th>
                <td className="p-4 text-xs md:text-sm font-bold text-text">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted">※当サイトに掲載している証券会社等のリンクはアフィリエイトリンクを含む場合があります（<strong>PR</strong>）。</p>
    </div>
  )

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert('必須項目をすべて入力してください。')
      return
    }
    if (!formData.agree) {
      alert('プライバシーポリシーへの同意が必要です。')
      return
    }
    setSubmitted(true)
  }

  const renderContact = () => (
    <div className="space-y-8">
      <div className="text-text/80 leading-relaxed">
        <p>ご質問・ご意見・不具合の報告などは以下のフォームよりお気軽にお送りください。</p>
        <p className="text-sm text-muted mt-1 underline decoration-primary/30 underline-offset-4 font-bold">通常、数日以内に返信いたします。</p>
      </div>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-success/10 border-2 border-success/30 p-8 rounded-[2rem] text-center space-y-4"
        >
          <div className="text-5xl">✅</div>
          <h3 className="text-xl font-black text-success">送信を受け付けました！</h3>
          <p className="text-success/80 font-bold">{formData.name} 様、ありがとうございます。<br />内容を確認次第、折り返しご連絡いたします。</p>
          <p className="text-[0.65rem] text-muted">※ 現在はデモ送信です。実際の送信機能は準備中です。</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary font-black hover:underline text-sm pt-4"
          >
            ← フォームに戻る
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleContactSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-[2rem] border-2 border-primary-light/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black text-muted uppercase tracking-widest ml-1">お名前 *</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all font-bold text-text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black text-muted uppercase tracking-widest ml-1">メールアドレス *</label>
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all font-bold text-text"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-muted uppercase tracking-widest ml-1">お問い合わせの種類</label>
            <select 
              className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all font-bold text-text appearance-none cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>サイトに関するご意見・ご感想</option>
              <option>掲載情報の誤りのご指摘</option>
              <option>不具合・エラーの報告</option>
              <option>著作権・掲載内容に関するご連絡</option>
              <option>その他</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-muted uppercase tracking-widest ml-1">お問い合わせ内容 *</label>
            <textarea 
              required
              rows={5}
              className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all font-bold text-text resize-none"
              placeholder="お気軽にご記入ください"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary pointer-events-none"
              checked={formData.agree}
              onChange={e => setFormData({...formData, agree: e.target.checked})}
            />
            <span className="text-xs font-bold text-muted group-hover:text-text transition-colors">
              <a href="?page=privacy" onClick={(e) => { e.preventDefault(); setActiveTab('privacy'); }} className="text-primary hover:underline">プライバシーポリシー</a> に同意する
            </span>
          </label>

          <button 
            type="submit"
            className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span>送信する</span>
            <span className="text-xl">🚀</span>
          </button>

          <div className="bg-secondary-light/50 border-l-4 border-secondary p-4 rounded-r-xl text-[0.7rem] text-muted italic">
            投資の具体的なアドバイスについてはお答えできません。また、外部の証券会社に関するサポートは各社の窓口へお願いします。
          </div>
        </form>
      )}
    </div>
  )

  const activeTabInfo = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-2 lg:px-0">
      <SectionHeader title={activeTabInfo.title} />

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-black text-sm transition-all border-2 ${
              activeTab === tab.id
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                : 'bg-white border-gray-100 text-text hover:border-primary-light hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <MangaCard className="bg-white/70 backdrop-blur-md p-6 md:p-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'privacy' && renderPrivacy()}
          {activeTab === 'disclaimer' && renderDisclaimer()}
          {activeTab === 'tokushoho' && renderTokushoho()}
          {activeTab === 'contact' && renderContact()}
        </motion.div>
      </MangaCard>
    </div>
  )
}
