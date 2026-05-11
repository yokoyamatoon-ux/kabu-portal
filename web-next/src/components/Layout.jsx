"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Layout = ({ children, marketData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname();

  const pages = [
    { id: 'home', label: '🏠 ホーム', href: '/' },
    { id: 'about', label: '🎓 入学案内', href: '/about' },
    { id: 'manga', label: '📖 マンガで学ぶ', href: '/manga' },
    { id: 'quiz', label: '❓ 投資クイズ', href: '/quiz' },
    { id: 'explore', label: '🔍 探す・体験', href: '/explore' },
    { id: 'qa', label: '🎓 質問箱', href: '/qa' },
    { id: 'column', label: '🥬 今日のコラム', href: '/column' },
    { id: 'money_secret', label: '⚠️ お金の裏事情ファイル', href: '/money_secret' },
    { id: 'maneta_diary', label: '📈 マネ太の投資日記', href: '/maneta_diary' },
  ]

  return (
    <div className="min-h-screen bg-background text-text w-full">
      <div className="site-container flex min-h-screen bg-background relative">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col gap-8 shrink-0 relative z-20">
          <Link href="/" className="flex flex-col gap-6 group">
            <div className="text-primary font-black text-xl leading-tight group-hover:scale-105 transition-transform duration-300">
              🎓 カブ先生の<br />お金の学校
            </div>
            
            <div className="bg-secondary-light border-2 border-secondary rounded-2xl p-4 text-center shadow-sm">
               <div className="text-3xl mb-1">🏦</div>
               <div className="text-[0.7rem] text-secondary-dark font-black mb-1">あなたの仮想おさいふ</div>
               <div className="text-2xl font-black text-text">¥1,000,000</div>
               <div className="text-[0.65rem] text-muted mt-2">※仮想のお金です</div>
            </div>
          </Link>

          <nav className="flex flex-col gap-1.5 overflow-y-auto pr-4 -mr-2 custom-scrollbar flex-1">
            {pages.map((page) => {
              const isActive = pathname === page.href || (pathname && pathname.startsWith(page.href) && page.href !== '/');
              return (
                <Link
                  key={page.id}
                  href={page.href}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all block ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-text hover:bg-primary-light hover:text-primary'
                  }`}
                >
                  {page.label}
                </Link>
              );
            })}

            <div className="mt-6 pt-6 border-t border-gray-100 pb-8">
               <div className="text-[0.65rem] font-black text-muted mb-3 uppercase tracking-wider">今日のマーケット</div>
               <div className="space-y-3">
                  {marketData?.slice(0, 3).map(m => (
                    <div key={m.label} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                       <div className="text-[0.6rem] font-bold text-text">{m.label?.split(' ')[0]}</div>
                       <div className="text-right">
                          <div className="text-[0.75rem] font-black text-text">{m.price}</div>
                          <div className={`text-[0.6rem] font-black ${Number(m.change) >= 0 ? 'text-success' : 'text-danger'}`}>
                            {Number(m.change) >= 0 ? '▲' : '▼'}{Math.abs(m.change)}%
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 relative bg-background">
          {/* Mobile Header (Fixed) */}
          <header className="md:hidden bg-white/95 backdrop-blur-md p-4 border-b flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
             <Link href="/" className="font-bold text-primary flex items-center gap-2">
               <span className="text-xl">🎓</span>
               <span>カブ先生のお金の学校</span>
             </Link>
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="p-2 bg-primary-light rounded-lg relative z-[60]"
             >
               <div className="space-y-1.5 flex flex-col items-center justify-center w-6 h-6">
                 <motion.span 
                   animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                   className="block w-6 h-0.5 bg-primary origin-center"
                 ></motion.span>
                 <motion.span 
                   animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                   className="block w-6 h-0.5 bg-primary"
                 ></motion.span>
                 <motion.span 
                   animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                   className="block w-6 h-0.5 bg-primary origin-center"
                 ></motion.span>
               </div>
             </button>
          </header>

          {/* Mobile Menu Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
                />
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-[60] md:hidden p-8 flex flex-col gap-8"
                >
                  <div className="text-primary font-black text-2xl">メニュー</div>
                  <nav className="flex flex-col gap-3 overflow-y-auto pb-8 custom-scrollbar">
                    {pages.map((page) => {
                      const isActive = pathname === page.href || (pathname && pathname.startsWith(page.href) && page.href !== '/');
                      return (
                        <Link
                          key={page.id}
                          href={page.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all text-lg block ${
                            isActive
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'text-text hover:bg-primary-light hover:text-primary'
                          }`}
                        >
                          {page.label}
                        </Link>
                      );
                    })}
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="pt-20 md:pt-0 p-4 md:p-8 max-w-6xl mx-auto min-h-screen flex flex-col">
            <div className="flex-1">
               {children}
            </div>
            
            <footer className="mt-16 pt-8 text-center text-muted text-sm border-t border-gray-200/50 relative z-10 pb-8">
               <p>© {new Date().getFullYear()} KABU PORTAL Project</p>
               <div className="mt-4 flex justify-center gap-6 text-[0.8rem] font-bold">
                 <Link href="/privacy" className="hover:text-primary transition-colors">
                   プライバシーポリシー
                 </Link>
                 <Link href="/disclaimer" className="hover:text-primary transition-colors">
                   免責事項
                 </Link>
                 <Link href="/contact" className="hover:text-primary transition-colors">
                   お問い合わせ
                 </Link>
               </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
