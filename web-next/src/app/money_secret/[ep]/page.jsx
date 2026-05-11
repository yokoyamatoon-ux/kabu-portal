import { MoneySecretPage } from "../../../components/MoneySecret";
import MONEY_SECRETS from "../../../data/money_secrets.json";
import COLUMNS from "../../../data/columns.json";
import MANGA_EPISODES from "../../../data/manga.json";
import { resolveImagePath } from "../../../lib/image-utils";

export async function generateMetadata({ params }) {
  const { ep } = await params;
  const episode = MONEY_SECRETS.find(e => e.ep === parseInt(ep));
  
  if (!episode) {
    return {
      title: 'エピソードが見つかりません | カブ先生のお金の学校',
    };
  }

  const title = `第${episode.ep}話 ${episode.title} | カブ先生のお金の学校`;
  const description = episode.summary;
  const imageUrl = `https://okane-no-manabi.jp/images/Ura.jpg`;

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
      canonical: `/money_secret/${ep}/`,
    },
  };
}

export async function generateStaticParams() {
  return MONEY_SECRETS.map((ep) => ({
    ep: ep.ep.toString(),
  }));
}

function generateJsonLd(episode) {
  const schemas = [];
  
  // 画像パスから日付を推測 (urakane20260427_01.png -> 2026-04-27)
  const dateMatch = episode.image_path.match(/urakane(\d{4})(\d{2})(\d{2})_/);
  const datePublished = dateMatch 
    ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
    : new Date().toISOString().split('T')[0];

  // Article schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `第${episode.ep}話 ${episode.title} | お金の裏事情ファイル`,
    "description": episode.summary,
    "image": `https://okane-no-manabi.jp/images/Ura.jpg`,
    "datePublished": datePublished,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": { "@type": "Person", "name": "カブ先生" },
    "publisher": { 
      "@type": "Organization", 
      "name": "カブ先生のお金の学校",
      "logo": { "@type": "ImageObject", "url": "https://okane-no-manabi.jp/favicon.png" }
    }
  });
  
  // BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://okane-no-manabi.jp/" },
      { "@type": "ListItem", "position": 2, "name": "お金のウラ事情一覧", "item": "https://okane-no-manabi.jp/money_secret/" },
      { "@type": "ListItem", "position": 3, "name": `第${episode.ep}話 ${episode.title}` }
    ]
  });

  return schemas;
}

export default async function MoneySecretEpPage({ params }) {
  const { ep } = await params;
  const episode = MONEY_SECRETS.find(e => e.ep === parseInt(ep));
  const jsonLdSchemas = episode ? generateJsonLd(episode) : [];

  // 関連記事の解決
  let relatedHtml = '';
  const relatedContents = episode?.related_contents || [];
  
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
    <>
      {jsonLdSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <MoneySecretPage initialEp={parseInt(ep)} />
      {relatedHtml && (
        <div dangerouslySetInnerHTML={{ __html: relatedHtml }} />
      )}
    </>
  );
}