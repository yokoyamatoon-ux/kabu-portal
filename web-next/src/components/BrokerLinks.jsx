"use client";
import React from 'react';

export const BrokerLinks = () => {
  return (
    <section className="py-12 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 justify-items-center">
        {/* SBI証券 */}
        <a 
          href="https://ad2.trafficgate.net/t/r/11/6478/317294_396520" 
          target="_blank" 
          rel="nofollow noopener noreferrer"
          className="block w-full max-w-[300px] hover:scale-105 transition-transform duration-300 shadow-md rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl"
        >
          <img 
            src="https://srv2.trafficgate.net/t/b/11/6478/317294_396520" 
            alt="SBI証券"
            className="w-full h-auto object-contain block mx-auto"
            width={300}
            height={250}
          />
        </a>

        {/* 楽天証券 */}
        <a 
          href="https://ad2.trafficgate.net/t/r/1221/738/317294_396520" 
          target="_blank" 
          rel="nofollow noopener noreferrer"
          className="block w-full max-w-[300px] hover:scale-105 transition-transform duration-300 shadow-md rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl"
        >
          <img 
            src="https://srv2.trafficgate.net/t/b/1221/738/317294_396520" 
            alt="楽天証券"
            className="w-full h-auto object-contain block mx-auto"
            width={300}
            height={250}
          />
        </a>

        {/* 松井証券 */}
        <a 
          href="https://ad2.trafficgate.net/t/r/217/6012/317294_396520" 
          target="_blank" 
          rel="nofollow noopener noreferrer"
          className="block w-full max-w-[300px] hover:scale-105 transition-transform duration-300 shadow-md rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl"
        >
          <img 
            src="https://srv2.trafficgate.net/t/b/217/6012/317294_396520" 
            alt="松井証券"
            className="w-full h-auto object-contain block mx-auto"
            width={300}
            height={250}
          />
        </a>
      </div>
      
      <p className="text-center text-[0.65rem] text-muted font-bold mt-8 opacity-40 px-4">
        ※当サイトは特定の証券会社を推薦するものではありません。投資は自己責任でお願いします。
      </p>
    </section>
  );
};
