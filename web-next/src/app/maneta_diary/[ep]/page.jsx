import { ManetaDiaryPage } from "../../../components/ManetaDiary";
import MANETA_DIARY from "../../../data/maneta_diary.json";
import COLUMNS from "../../../data/columns.json";
import MANGA_EPISODES from "../../../data/manga.json";
import MONEY_SECRETS from "../../../data/money_secrets.json";
import { resolveImagePath } from "../../../lib/image-utils";

export async function generateMetadata({ params }) {
  const { ep } = await params;
  const episode = MANETA_DIARY.find(e => e.ep === parseInt(ep));
  
  if (!episode) {
    return {
      title: '日記が見つかりません | カブ先生のお金の学校',
    };
  }

  const title = `第${episode.ep}回 ${episode.title} | マネ太のはじめての投資日記`;
  const description = episode.summary;
  const imageUrl = `https://okane-no-manabi.jp${episode.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/maneta_diary/${ep}/`,
    },
  };
}

export async function generateStaticParams() {
  return MANETA_DIARY.map((ep) => ({
    ep: ep.ep.toString(),
  }));
}

function generateJsonLd(episode) {
  const schemas = [];
  
  // 日付の正規化 (2026年3月23日 (月) -> 2026-03-23)
  const dateMatch = episode.date.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  const datePublished = dateMatch 
    ? `${dateMatch[1]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[3].padStart(2, '0')}`
    : new Date().toISOString().split('T')[0];

  // Article schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `第${episode.ep}回 ${episode.title} | マネ太の投資日記`,
    "description": episode.summary,
    "image": `https://okane-no-manabi.jp${episode.image}`,
    "datePublished": datePublished,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": { "@type": "Person", "name": "マネ太" },
    "publisher": { 
      "@type": "Organization", 
      "name": "カブ先生のお金の学校",
      "logo": { "@type": "ImageObject", "url": "https://okane-no-manabi.jp/favicon.png" }
    }
  });

  // FAQPage schema (if chat_data exists, we could treat it as Q&A but Article is better)
  // If we had explicit FAQ in diary, we'd add it here.
  
  
  // BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://okane-no-manabi.jp/" },
      { "@type": "ListItem", "position": 2, "name": "マネ太日記一覧", "item": "https://okane-no-manabi.jp/maneta_diary/" },
      { "@type": "ListItem", "position": 3, "name": `第${episode.ep}回 ${episode.title}` }
    ]
  });
  
  return schemas;
}

export default async function ManetaDiaryEpPage({ params }) {
  const { ep } = await params;
  const activeEp = MANETA_DIARY.find(e => e.ep === parseInt(ep));

  if (!activeEp) return <div className="p-20 text-center">記事が見つかりません</div>;

  const jsonLdSchemas = generateJsonLd(activeEp);

  // 関連記事の解決
  let relatedHtml = '';
  const relatedContents = activeEp.related_contents || [];
  
  if (relatedContents.length > 0) {
    const relatedData = relatedContents.map(ref => {
      if (ref.type === 'column') {
        const item = COLUMNS.find(c => c.id === ref.id);
        return item ? { ...item, image: resolveImagePath(item.image, 'column'), link: `/column/${item.id}/`, typeLabel: 'COLUMN' } : null;
      }
      if (ref.type === 'manga') {
        const item = MANGA_EPISODES.find(m => m.ep === parseInt(ref.id));
        return item ? { ...item, title: `第${item.ep}話 ${item.title}`, image: resolveImagePath(item.thumbnail || item.manga_pages[0], 'manga'), link: `/manga/${item.ep}/`, typeLabel: 'MANGA', category: 'マンガで学ぶ' } : null;
      }
      if (ref.type === 'money_secret') {
        const item = MONEY_SECRETS.find(s => s.ep === parseInt(ref.id));
        return item ? { ...item, image: resolveImagePath(item.thumbnail || item.image_path, 'money_secret'), link: `/money_secret/${item.ep}/`, typeLabel: 'URA-KANE', category: 'お金のウラ事情' } : null;
      }
      return null;
    }).filter(Boolean);

    if (relatedData.length > 0) {
      relatedHtml = `
        <div class="max-w-4xl mx-auto mt-20 mb-16 px-4">
          <div class="flex items-center gap-3 mb-8">
            <span class="text-3xl">📚</span>
            <h3 class="text-2xl font-black text-text">あわせて読みたい関連コンテンツ</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${relatedData.map(item => `
              <a href="${item.link}" class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
                <div class="aspect-video overflow-hidden relative">
                  <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary shadow-sm tracking-widest">${item.typeLabel}</div>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                  <div class="text-[0.65rem] font-black text-primary mb-1 uppercase tracking-wider">${item.category}</div>
                  <h4 class="font-black text-text group-hover:text-primary transition-colors line-clamp-2">${item.title.replace(/\*\*/g, '')}</h4>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  return (
    <div>
      {jsonLdSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ManetaDiaryPage initialEp={parseInt(ep)} />
      {relatedHtml && (
        <div dangerouslySetInnerHTML={{ __html: relatedHtml }} />
      )}
    </div>
  );
}
