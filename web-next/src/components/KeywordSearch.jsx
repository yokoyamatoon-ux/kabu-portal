"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MessageSquare, HelpCircle, ChevronRight, Search } from 'lucide-react';
import columns from '../data/columns.json';
import manga from '../data/manga.json';
import money_secrets from '../data/money_secrets.json';
import keywords from '../data/keywords.json';

const STATIC_CONTENTS = [
  { type: "quiz", title: "投資クイズに挑戦", url: "/quiz/", tags: ["初心者", "NISA", "株"], category: "投資のキホン" },
  { type: "qa",   title: "カブ先生の質問箱", url: "/qa/",   tags: ["初心者", "NISA"], category: "よくある質問" },
];

const BADGE = {
  column: { label: "コラム", icon: <BookOpen size={10} />, className: "bg-blue-50 text-blue-600 border-blue-100" },
  manga:  { label: "マンガ", icon: <Search size={10} />, className: "bg-green-50 text-green-600 border-green-100" },
  money_secret: { label: "URA-KANE", icon: <Search size={10} />, className: "bg-red-50 text-red-600 border-red-100" },
  quiz:   { label: "クイズ", icon: <HelpCircle size={10} />, className: "bg-amber-50 text-amber-600 border-amber-100" },
  qa:     { label: "質問箱", icon: <MessageSquare size={10} />, className: "bg-purple-50 text-purple-600 border-purple-100" },
};

export default function KeywordSearch() {
  const [activeTag, setActiveTag] = useState(null);

  const allContents = useMemo(() => [
    ...columns.map(c => ({ 
      type: "column", 
      title: c.title, 
      url: `/column/${c.id}/`, 
      tags: c.tags ?? [],
      category: c.category || "コラム"
    })),
    ...manga.map(m => ({ 
      type: "manga", 
      title: `第${m.ep}話 ${m.title}`, 
      url: `/manga/${m.ep}/`, 
      tags: m.tags ?? [],
      category: "マンガで学ぶ"
    })),
    ...money_secrets.map(s => ({
      type: "money_secret",
      title: s.title,
      url: `/money_secret/${s.ep}/`,
      tags: s.tags ?? [],
      category: "お金のウラ事情"
    })),
    ...STATIC_CONTENTS,
  ], []);

  const results = useMemo(() => 
    activeTag ? allContents.filter(c => c.tags.includes(activeTag)) : []
  , [activeTag, allContents]);

  const activeKeyword = keywords.find(k => k.tag === activeTag);

  return (
    <section className="px-2 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
          <Search size={18} strokeWidth={3} />
        </div>
        <h2 className="text-xl font-black text-text tracking-tight">気になるテーマから探す</h2>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Search size={120} strokeWidth={1} />
        </div>

        <p className="text-xs font-black text-muted mb-4 uppercase tracking-widest">KEYWORDS</p>
        
        <div className="flex flex-wrap gap-2 relative z-10">
          {keywords.map((kw, idx) => (
            <motion.button
              key={kw.tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => setActiveTag(activeTag === kw.tag ? null : kw.tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-black transition-all border-2
                ${activeTag === kw.tag 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-white border-gray-100 text-text hover:border-primary-light hover:text-primary hover:bg-primary-light/5'
                }
              `}
            >
              {kw.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTag && (
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="mt-8 pt-8 border-t border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-primary rounded-full"></div>
                  <h3 className="text-lg font-black text-text">「{activeKeyword?.label}」の検索結果</h3>
                  <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-black ml-1">{results.length}件</span>
                </div>
                {results.length > 0 && (
                  <button onClick={() => setActiveTag(null)} className="text-[10px] font-black text-muted hover:text-primary transition-colors">
                    閉じる ✕
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold">まだ記事がないようじゃ。別のキーワードを試してみておくれ！</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((item, i) => {
                    const badge = BADGE[item.type] || BADGE.column;
                    return (
                      <motion.a
                        key={item.url}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        href={item.url}
                        className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${badge.className}`}>
                            {badge.icon}
                            {badge.label}
                          </span>
                          <span className="text-[9px] font-black text-muted/60 uppercase tracking-tighter truncate">{item.category}</span>
                        </div>
                        <h4 className="text-sm font-black text-text group-hover:text-primary transition-colors line-clamp-2 flex-1 mb-3">
                          {item.title}
                        </h4>
                        <div className="flex justify-end">
                           <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-muted group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                             <ChevronRight size={14} />
                           </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
