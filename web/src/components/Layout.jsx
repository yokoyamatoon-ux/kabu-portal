import React from 'react'

export const Layout = ({ children, currentPage, setPage }) => {
  const pages = [
    { id: 'home', label: '🏠 ホーム' },
    { id: 'manga', label: '📖 マンガで学ぶ' },
    { id: 'quiz', label: '❓ 投資クイズ' },
    { id: 'explore', label: '🔍 探す・体験' },
    { id: 'qa', label: '🎓 質問箱' },
    { id: 'column', label: '🥬 今日のコラム' },
    { id: 'money_secret', label: '⚠️ お金の裏事情ファイル' },
    { id: 'maneta_diary', label: '📈 マネ太の投資日記' },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-8 hidden md:flex shrink-0">
        <div>
          <h1 className="text-primary font-black text-xl leading-tight">
            🎓 カブ先生の<br />お金の学校
          </h1>
          <div className="mt-2 text-[0.65rem] font-bold">
            <div className="text-primary">🚀 Auto-Deploy active</div>
            <div className="text-success">🟢 Web App Version (Fast)</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setPage(page.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                currentPage === page.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-text hover:bg-primary-light hover:text-primary'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="bg-secondary-light border-2 border-secondary rounded-2xl p-4 text-center">
             <div className="text-3xl mb-1">🏦</div>
             <div className="text-[0.7rem] text-muted mb-1">あなたの仮想おさいふ</div>
             <div className="text-xl font-black text-text">¥1,000,000</div>
             <div className="text-[0.65rem] text-muted mt-2">※仮想のお金です</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header (Simplified) */}
        <header className="md:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-50">
           <h1 className="font-bold text-primary">🎓 カブ先生のお金の学校</h1>
           <button className="p-2 bg-primary-light rounded-lg">
             <span className="block w-6 h-0.5 bg-primary mb-1"></span>
             <span className="block w-6 h-0.5 bg-primary mb-1"></span>
             <span className="block w-6 h-0.5 bg-primary"></span>
           </button>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>

        <footer className="p-8 text-center text-muted text-sm border-t border-gray-100 bg-white/50">
           <p>© {new Date().getFullYear()} KABU PORTAL Project</p>
           <div className="mt-2 flex justify-center gap-4 text-[0.8rem]">
             <a href="#" className="hover:text-primary transition-colors">プライバシーポリシー</a>
             <a href="#" className="hover:text-primary transition-colors">免責事項</a>
             <a href="#" className="hover:text-primary transition-colors">お問い合わせ</a>
           </div>
        </footer>
      </main>
    </div>
  )
}
