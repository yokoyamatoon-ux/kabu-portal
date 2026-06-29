import React from 'react';

const AffiliateBanner = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl border-4 border-primary/20 shadow-xl overflow-hidden group hover:border-primary/40 transition-all">
        <div className="p-1 bg-primary/10 text-center">
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">Sponsored / カブ先生のおすすめ</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
          <div className="w-full md:w-auto flex justify-center">
            <a 
              href="//af.moshimo.com/af/c/click?a_id=5560818&p_id=7356&pc_id=21162&pl_id=92615" 
              rel="nofollow" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="block hover:opacity-90 transition-opacity"
            >
              <img 
                src="//image.moshimo.com/af-img/3025/000000092615.jpg" 
                width="199" 
                height="120" 
                style={{ border: 'none' }} 
                alt="FP相談バナー"
                className="rounded-xl shadow-md"
              />
            </a>
            <img 
              src="//i.moshimo.com/af/i/impression?a_id=5560818&p_id=7356&pc_id=21162&pl_id=92615" 
              width="1" 
              height="1" 
              style={{ border: 'none' }} 
              loading="lazy" 
              alt=""
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-black text-text mb-3 leading-tight">
              お金の不安は、<br />
              プロと一緒に解消するのじゃ！
            </h4>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              記事を読んだ後は、専門家のアドバイスを聞いてみるのが近道じゃぞい。<br />
              まずは無料でFPさんに相談してみるのじゃ！
            </p>
            <a 
              href="//af.moshimo.com/af/c/click?a_id=5560818&p_id=7356&pc_id=21162&pl_id=92615" 
              rel="nofollow" 
              referrerPolicy="no-referrer-when-downgrade"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-black hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              FP相談の詳細をチェック
              <span className="text-xl">👉</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
