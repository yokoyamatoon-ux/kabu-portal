import { MangaPage } from "../../../components/MangaPage";
import MANGA_EPISODES from "../../../data/manga.json";
import COLUMNS from "../../../data/columns.json";
import { resolveImagePath } from "../../../lib/image-utils";

export async function generateMetadata({ params }) {
  const { ep } = await params;
  const episode = MANGA_EPISODES.find(e => e.ep === parseInt(ep));
  
  if (!episode) {
    return {
      title: 'エピソードが見つかりません | カブ先生のお金の学校',
    };
  }

  const title = `第${episode.ep}話 ${episode.title} | カブ先生のお金の学校`;
  const description = episode.description_long || episode.summary;
  const imageUrl = `https://okane-no-manabi.jp${episode.thumbnail || episode.manga_pages[0]}`;

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
  };
}

export async function generateStaticParams() {
  return MANGA_EPISODES.map((ep) => ({
    ep: ep.ep.toString(),
  }));
}

function generateJsonLd(episode) {
  const schemas = [];

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `第${episode.ep}話 ${episode.title}`,
    "description": episode.description_long || episode.summary,
    "image": `https://okane-no-manabi.jp${episode.thumbnail || episode.manga_pages[0]}`,
    "author": {
      "@type": "Person",
      "name": "カブ先生"
    },
    "publisher": {
      "@type": "Organization",
      "name": "カブ先生のお金の学校",
      "logo": {
        "@type": "ImageObject",
        "url": "https://okane-no-manabi.jp/favicon.png"
      }
    },
    "datePublished": episode.date ? episode.date.replace(/\./g, '-') : "2024-04-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };
  schemas.push(articleSchema);

  // FAQPage schema
  if (episode.faq && episode.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": episode.faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
    schemas.push(faqSchema);
  }

  // BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://okane-no-manabi.jp/" },
      { "@type": "ListItem", "position": 2, "name": "マンガ一覧", "item": "https://okane-no-manabi.jp/manga/" },
      { "@type": "ListItem", "position": 3, "name": `第${episode.ep}話 ${episode.title}` }
    ]
  });

  return schemas;
}

export default async function MangaEpPage({ params }) {
  const { ep } = await params;
  const episode = MANGA_EPISODES.find(e => e.ep === parseInt(ep));
  const jsonLdSchemas = episode ? generateJsonLd(episode) : [];

  // 関連記事の解決
  let relatedHtml = '';
  const relatedContents = episode?.related_contents || episode?.related_columns?.map(id => ({ type: 'column', id })) || [];
  
  if (relatedContents.length > 0) {
    const MANGA = MANGA_EPISODES;
    const MONEY_SECRETS = require("../../../data/money_secrets.json");
    
    const relatedData = relatedContents.map(ref => {
      if (ref.type === 'column') {
        const item = COLUMNS.find(c => c.id === ref.id);
        return item ? { ...item, image: resolveImagePath(item.image, 'column'), link: `/column/${item.id}/`, typeLabel: 'COLUMN' } : null;
      }
      if (ref.type === 'manga') {
        const item = MANGA.find(m => m.ep === parseInt(ref.id));
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
            <h3 class="text-2xl font-black text-text">おすすめの関連コンテンツ</h3>
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
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <MangaPage initialEp={parseInt(ep)} />
      {relatedHtml && (
        <div dangerouslySetInnerHTML={{ __html: relatedHtml }} />
      )}
    </>
  );
}