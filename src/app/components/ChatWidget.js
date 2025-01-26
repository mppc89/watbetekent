"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatWidget({
  suggestionsApi = "/api/words",
  initialWord = "",
  initialResponse = "",
}) {
  const [word, setWord] = useState(initialWord); // Gebruik initialWord als startwaarde
  const [response, setResponse] = useState(initialResponse); // Gebruik initialResponse als startwaarde
  const [suggestions, setSuggestions] = useState([]); // Voor autocompletion
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Haal suggesties op
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `${suggestionsApi}?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err.message);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();

    if (!word.trim()) return;

    setIsLoading(true);
    setError("");
    setResponse("");
    setSuggestions([]); // Verberg suggesties bij submit

    try {
      const wordRes = await fetch(
        `${suggestionsApi}?query=${encodeURIComponent(word)}`
      );
      const wordData = await wordRes.json();

      const exactMatch = wordData.find(
        (item) => item.title.toLowerCase() === word.toLowerCase()
      );

      if (exactMatch) {
        setWord("");
        setResponse("");
        router.push(`/woorden/${exactMatch.slug}`);
        return;
      }

      const userId = sessionStorage.getItem("userId") || `user-${Date.now()}`;
      sessionStorage.setItem("userId", userId);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, userId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Er ging iets mis");

      setResponse(data.definition);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update de state wanneer de props veranderen
  useEffect(() => {
    setWord(initialWord);
    setResponse(initialResponse);
  }, [initialWord, initialResponse]);

  return (
    <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 shadow-sm my-8 text-white'>
      <div className='flex items-center gap-3 mb-6'>
        <i className='fa-solid fa-robot text-white text-2xl'></i>
        <h2 className='text-xl font-bold text-white'>Woordenboek</h2>
      </div>
      <form onSubmit={handleSearch} className='space-y-4 '>
        <input
          type='text'
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder='Typ een woord...'
          className='w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
        />

        {/* Suggesties */}
        {suggestions.length > 0 && (
          <ul className='absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md w-full max-h-40 overflow-y-auto mt-1'>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className='px-4 py-2 text-gray-700 hover:bg-indigo-50 cursor-pointer'
                onClick={() => {
                  setWord(suggestion.title);
                  setSuggestions([]); // Verberg suggesties bij selectie
                }}>
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-white text-blue-600 rounded-lg py-3 font-semibold shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 mb-6'>
          {isLoading ? (
            <>
              <i className='fa-solid fa-circle-notch animate-spin'></i>
              Zoeken...
            </>
          ) : (
            <>
              <i className='fa-solid fa-magnifying-glass'></i>
              Zoek betekenis
            </>
          )}
        </button>
      </form>

      {error && (
        <div className='p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2'>
          <i className='fa-solid fa-circle-exclamation'></i>
          {error}
        </div>
      )}

      {response && (
        <div className='p-4 bg-white rounded-lg border border-gray-100 shadow-sm mt-4'>
          <div className='flex items-center gap-2 text-indigo-600 font-medium mb-2'>
            <i className='fa-solid fa-lightbulb'></i>
            Betekenis
          </div>
          <p className='text-gray-700'>{response}</p>
        </div>
      )}
    </div>
  );
}
