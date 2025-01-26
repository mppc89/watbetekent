import CategoryList from "./components/CategoryList?v=2";
import ChatWidget from "./components/ChatWidget";

async function getCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/words`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const words = await res.json();
  return [...new Set(words.map((word) => word.category))];
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <main id='main' className='space-y-8'>
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-4'>Ontdek de betekenis</h1>
        <p className='text-xl text-gray-600 mb-8'>
          Vind de betekenis van woorden en afkortingen.
        </p>
      </section>
      {/* Chat Section */}
      <section>
        <div className='max-w-3xl mx-auto'>
          <ChatWidget suggestionsApi='/api/words' />
        </div>
      </section>
      <section className='bg-white rounded-xl p-8 shadow-sm'>
        <h2 className='text-2xl font-bold mb-6'>Categorieën</h2>
        <CategoryList categories={categories} />
      </section>

      <section className='bg-white rounded-xl p-8 shadow-sm my-8'>
        <h2 className='text-2xl font-bold mb-6'>Aanbevolen Producten</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Product Card 1 */}
          <a
            href='https://partner.bol.com/click/click?p=1&t=url&s=12345&url=https://www.bol.com/product1'
            target='_blank'
            rel='nofollow noopener'
            className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
            <div className='aspect-w-16 aspect-h-9'>
              <img
                src='https://media.s-bol.com/EVgR7pQgZEyY/Kr5rw1x/545x840.jpg'
                alt='Product 1'
                className='object-cover w-full h-48'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-bold text-lg group-hover:text-blue-600'>
                Product Titel
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                Korte productbeschrijving hier
              </p>
              <span className='text-lg font-bold text-blue-600'>€29.99</span>
            </div>
          </a>

          {/* Product Card 2 */}
          <a
            href='https://partner.bol.com/click/click?p=2&t=url&s=12345&url=https://www.bol.com/product2'
            target='_blank'
            rel='nofollow noopener'
            className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
            <div className='aspect-w-16 aspect-h-9'>
              <img
                src='https://media.s-bol.com/EVgR7pQgZEyY/Kr5rw1x/545x840.jpg'
                alt='Product 2'
                className='object-cover w-full h-48'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-bold text-lg group-hover:text-blue-600'>
                Product Titel
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                Korte productbeschrijving hier
              </p>
              <span className='text-lg font-bold text-blue-600'>€39.99</span>
            </div>
          </a>

          {/* Product Card 3 */}
          <a
            href='https://partner.bol.com/click/click?p=3&t=url&s=12345&url=https://www.bol.com/product3'
            target='_blank'
            rel='nofollow noopener'
            className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
            <div className='aspect-w-16 aspect-h-9'>
              <img
                src='https://media.s-bol.com/EVgR7pQgZEyY/Kr5rw1x/545x840.jpg'
                alt='Product 3'
                className='object-cover w-full h-48'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-bold text-lg group-hover:text-blue-600'>
                Product Titel
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                Korte productbeschrijving hier
              </p>
              <span className='text-lg font-bold text-blue-600'>€49.99</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
