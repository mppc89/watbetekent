"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WordFilter({ words, initialCategory, initialLetter }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || ""
  );
  const [selectedLetter, setSelectedLetter] = useState(initialLetter || "");
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    filterWords(initialCategory, initialLetter);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterWords(category, selectedLetter);
    updateURL(category, selectedLetter);
  };

  const handleLetterChange = (letter) => {
    setSelectedLetter(letter);
    filterWords(selectedCategory, letter);
    updateURL(selectedCategory, letter);
  };

  const filterWords = (category, letter) => {
    console.log("Filtering with:", { category, letter }); // Debug log

    const filtered = words.filter((word) => {
      const matchesCategory = !category || word.category === category;
      const matchesLetter =
        !letter || word.title.toLowerCase().startsWith(letter.toLowerCase());

      console.log("Word:", word.title, { matchesCategory, matchesLetter }); // Debug log
      return matchesCategory && matchesLetter;
    });

    console.log("Filtered results:", filtered.length); // Debug log
    setFilteredWords(filtered);
  };

  const updateURL = (category, letter) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (letter) params.set("letter", letter);
    router.push(`/woorden${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      <section id='filters' className='bg-white p-8 shadow-sm rounded-xl mb-8'>
        <div className='flex items-center gap-3 mb-6'>
          <i className='fa-solid fa-filter text-indigo-600'></i>
          <h2 className='text-xl font-bold text-gray-800'>Filters</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700'>
              Categorie
            </label>
            <div className='relative'>
              <select
                id='category'
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className='w-full h-12 px-4 py-3 bg-white border border-gray-200 rounded-lg 
                text-gray-700 text-sm font-medium leading-6
                shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                appearance-none cursor-pointer'>
                <option value=''>Alle Categorieën</option>
                {[...new Set(words.map((word) => word.category))].map(
                  (category) => (
                    <option key={category} value={category} className='py-2'>
                      {category}
                    </option>
                  )
                )}
              </select>
              <i className='fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'></i>
            </div>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='letter'
              className='block text-sm font-medium text-gray-700'>
              Beginletter
            </label>
            <div className='relative'>
              <select
                id='letter'
                value={selectedLetter}
                onChange={(e) => handleLetterChange(e.target.value)}
                className='w-full h-12 px-4 py-3 bg-white border border-gray-200 rounded-lg 
                text-gray-700 text-sm font-medium leading-6
                shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                appearance-none [-webkit-appearance:none] [-moz-appearance:none] cursor-pointer'
                style={{ backgroundImage: "none" }}>
                <option value=''>Alle Letters</option>
                {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                  <option key={letter} value={letter} className='py-2'>
                    {letter}
                  </option>
                ))}
              </select>
              <i className='fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'></i>
            </div>
          </div>
        </div>
      </section>

      <div className='words-list space-y-8'>
        {Object.entries(
          [...filteredWords]
            .sort((a, b) => a.title.localeCompare(b.title))
            .reduce((acc, word) => {
              const firstLetter = word.title[0].toUpperCase();
              if (!acc[firstLetter]) acc[firstLetter] = [];
              acc[firstLetter].push(word);
              return acc;
            }, {})
        ).map(([letter, words]) => (
          <section key={letter} id={letter}>
            <div className='bg-white rounded-xl p-6 shadow-sm'>
              <h2 className='text-3xl font-bold mb-6 text-blue-600'>
                {letter}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {words.map((word) => (
                  <div
                    key={`wf-${word.slug}`}
                    className='border border-gray-200 rounded-lg p-4 hover:shadow-lg transition'>
                    <h3 className='text-lg font-bold mb-2'>
                      <a
                        href={`/woorden/${word.slug}`}
                        className='text-blue-600 hover:text-blue-700'>
                        {word.title}
                      </a>
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      {word.shortDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <section>
              <div
                id='ad-banner-top'
                className='bg-gray-100 h-[90px] w-[728px] my-10 rounded-lg flex items-center justify-center shadow-sm mx-auto'>
                <span className='text-gray-400'>728px90px</span>
              </div>
            </section>
          </section>
        ))}
      </div>
    </>
  );
}
