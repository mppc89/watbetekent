export default function Footer({ words = [] }) {
  const wordsByCategory = words.reduce((acc, word) => {
    if (!word.category) return acc;
    if (!acc[word.category]) {
      acc[word.category] = [];
    }
    acc[word.category].push(word);
    return acc;
  }, {});

  // Calculate optimal number of columns (min 2, max 4)
  const categoryCount = Object.keys(wordsByCategory).length;
  const columnCount = Math.min(4, Math.max(3, Math.ceil(categoryCount / 4))); // Changed from 6 to 4

  if (words.length === 0) return null;

  return (
    <footer className='bg-gradient-to-b from-white to-gray-100'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
            Ontdek alle categorieën
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columnCount} gap-8`}
            style={{ gridAutoFlow: "dense" }}>
            {Object.entries(wordsByCategory)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, categoryWords]) => (
                <div
                  key={category}
                  className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
                  <h3 className='text-xl font-bold text-indigo-600 pb-3 mb-4 '>
                    {category}
                  </h3>
                  <ul className='grid gap-y-2'>
                    {categoryWords
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((word) => (
                        <li key={word.slug}>
                          <a
                            href={`/woorden/${word.slug}`}
                            className='text-sm text-gray-600 hover:text-indigo-600 transition-colors'>
                            {word.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className=' pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='flex items-center gap-3'>
              <i className='fa-solid fa-book-open text-indigo-600 text-2xl'></i>
              <span className='text-xl font-bold text-gray-800'>
                WatBetekent.be
              </span>
            </div>
            <nav className='flex gap-8'>
              <a
                href='/woorden'
                className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'>
                Woordenlijst
              </a>
              <a
                href='/privacy'
                className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'>
                Privacy
              </a>
              <a
                href='/contact'
                className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'>
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
