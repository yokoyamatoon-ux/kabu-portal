"use client";
import React from 'react'
import { useRouter } from "next/navigation";

export const ColumnClientShell = ({ children, columnId }) => {
  const router = useRouter();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [columnId]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <button 
        onClick={() => router.push("/column")} 
        className="flex items-center gap-2 text-primary font-black hover:translate-x-[-4px] transition-transform"
      >
        ← コラム一覧に戻る
      </button>

      {children}

      <div className="text-center mt-12">
        <button 
          onClick={() => router.push("/column")} 
          className="bg-secondary text-text font-black px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          すべて解説を見終えたら戻る
        </button>
      </div>
    </div>
  );
};
