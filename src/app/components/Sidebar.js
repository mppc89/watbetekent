"use client";

import { useState, useEffect } from "react";
import ChatWidget from "../components/ChatWidget";

export default function Sidebar() {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        const res = await fetch("/api/words");
        if (!res.ok) throw new Error("Failed to fetch words");
        const words = await res.json();

        // Get the last word of the day from local storage
        const lastWordOfTheDay = localStorage.getItem("lastWordOfTheDay");

        // Filter out the last word of the day to avoid repetition
        const filteredWords = words.filter(
          (word) => word.title !== lastWordOfTheDay
        );

        // Select a random word from the filtered list
        const randomWord =
          filteredWords[Math.floor(Math.random() * filteredWords.length)];

        // Set the word of the day
        setWordOfTheDay(randomWord);

        // Store the current word of the day in local storage
        localStorage.setItem("lastWordOfTheDay", randomWord.title);
      } catch (error) {
        console.error("Error fetching word of the day:", error);
      }
    };

    fetchWordOfTheDay();
  }, []);
  return (
    <aside className='space-y-8'>
      {/* Advertisement */}
      <div className='bg-gray-100 w-[300px] h-[250px] rounded-lg flex items-center justify-center shadow-sm mx-auto'>
        <span className='text-gray-400'>300px250px</span>
      </div>
      <ChatWidget suggestionsApi='/api/words' />
      {/* Advertisement */}
      <div className='bg-gray-100 w-[300px] h-[250px] rounded-lg flex items-center justify-center shadow-sm mx-auto'>
        <span className='text-gray-400'>300px250px</span>
      </div>
      {/* Word of the Day */}

      {wordOfTheDay && (
        <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl  p-8 shadow-sm my-8 text-white shadow-lg'>
          <div className='flex items-center gap-3 mb-6'>
            <i className='fa-solid fa-graduation-cap text-white text-2xl'></i>
            <h2 className='text-xl font-bold text-white'>
              {wordOfTheDay.title}
            </h2>
          </div>

          <p className='text-blue-100 mb-4'>{wordOfTheDay.shortDescription}</p>
          <a href={`/woorden/${wordOfTheDay.slug}`}>
            <button
              disabled={isLoading}
              className='w-full bg-white text-blue-600 rounded-lg py-3 font-semibold shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 '>
              {" "}
              {isLoading ? (
                <>
                  <i className='fa-solid fa-circle-notch animate-spin'></i>
                  Zoeken...
                </>
              ) : (
                <>
                  <i className='fa-solid fa-book-open-reader'></i>
                  Lees betekenis
                </>
              )}
            </button>
          </a>
        </div>
      )}

      {/* Trending Words
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h4 className='font-semibold text-lg mb-4'>Populaire woorden</h4>
        <div className='space-y-1'>
          {[
            {
              rank: "#1",
              title: "Quisquam",
              searches: "5562",
              url: "https://1",
            },
            {
              rank: "#2",
              title: "Ipsum",
              searches: "4801",
              url: "https://2",
            },
            {
              rank: "#3",
              title: "Lorem",
              searches: "3932",
              url: "https://2",
            },
          ].map((word) => (
            <a key={word.rank} href={word.url}>
              <div
                key={word.rank}
                className='flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg'>
                <span className='font-bold text-lg text-blue-600'>
                  {word.rank}
                </span>
                <div>
                  <h5 className='text-gray-800 font-semibold'>{word.title}</h5>
                  <p className='text-sm text-gray-500'>
                    {word.searches} zoekopdrachten
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
 */}

      {/* Advertisement */}
      <div className='bg-gray-100 w-[300px] h-[250px] rounded-lg flex items-center justify-center shadow-sm mx-auto'>
        <span className='text-gray-400'>300px250px</span>
      </div>

      {/* Recente Zoekopdrachten 
      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <h4 className='font-semibold text-lg mb-4'>Recente zoekopdrachten</h4>
        <div className='space-y-3'>
          <div className='flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer'>
            <span className='text-gray-800'>Ephemeral</span>
            <i className='fa-solid fa-clock text-gray-400'></i>
          </div>
          <div className='flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer'>
            <span className='text-gray-800'>Ubiquitous</span>
            <i className='fa-solid fa-clock text-gray-400'></i>
          </div>
          <div className='flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer'>
            <span className='text-gray-800'>Serendipity</span>
            <i className='fa-solid fa-clock text-gray-400'></i>
          </div>
        </div>
      </div>*/}
    </aside>
  );
}
