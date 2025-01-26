import { notFound } from "next/navigation";
import fetchWord from "../../components/FetchWord";

export const dynamic = "force-dynamic";

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = String(params?.slug || "");
  const word = await fetchWord(slug);

  if (!word) {
    return {
      title: "Woord niet gevonden | WatBetekent",
      description: "Het opgezochte woord werd niet gevonden.",
      openGraph: {
        title: "Woord niet gevonden | WatBetekent",
        description: "Het opgezochte woord werd niet gevonden.",
        url: `https://www.watbetekent.be/woorden/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: "Woord niet gevonden | WatBetekent",
        description: "Het opgezochte woord werd niet gevonden.",
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `Wat betekent ${word.title}?`,
    description: word.shortDescription,
    openGraph: {
      title: `${word.title} - Wat Betekent Het?`,
      description: word.shortDescription,
      url: `https://www.watbetekent.be/woorden/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `Wat betekent ${word.title}?`,
      description: word.shortDescription,
    },
    keywords: [
      word.title,
      `betekenis ${word.title}`,
      `wat betekent ${word.title}`,
      "woordenboek",
      "WatBetekent",
      `definities ${word.title}`,
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function WordDetailPage(props) {
  const params = await props.params;
  const slug = String(params?.slug || "");
  const word = await fetchWord(slug);

  if (!word) {
    notFound();
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Wat betekent ${word.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: word.description,
        },
      },
      {
        "@type": "Question",
        name: `Wat is de korte definitie van ${word.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: word.shortDescription,
        },
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id='main' className='space-y-8'>
        <section className='text-center py-12'>
          <article className='max-w-4xl mx-auto'>
            <section className='text-center py-12'>
              <h1 className='text-4xl font-bold mb-4'>{word.title}</h1>
              <p className='text-xl text-gray-600 mb-8'>
                {word.shortDescription}
              </p>
            </section>
            <div className='text-left bg-white rounded-xl p-8 shadow-sm'>
              <div className='prose prose-lg max-w-none'>
                <h2 className='text-2xl font-bold mb-4'>Betekenis</h2>
                <p className='text-gray-700'>{word.description}</p>
              </div>

              <div className='text-left mt-8 pt-8 border-t border-gray-200'>
                <div className='flex items-center justify-between'>
                  <a
                    href={`/woorden?category=${encodeURIComponent(
                      word.category
                    )}`}
                    className='text-sm font-medium text-gray-500 bg-blue-50 px-3 py-1 rounded hover:bg-gray-200 transition'>
                    {word.category}
                  </a>
                </div>
              </div>
            </div>
            {/* Ad Banner */}
            <div
              id='ad-banner-top'
              className='bg-gray-100 h-[90px] w-[728px] my-10 rounded-lg flex items-center justify-center shadow-sm mx-auto'>
              <span className='text-gray-400'>728px90px</span>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
