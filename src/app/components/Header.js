"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch suggestions based on the search query
  const fetchSuggestions = async (searchQuery) => {
    if (searchQuery.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/words?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Handle input change and fetch suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (slug) => {
    router.push(`/woorden/${slug}`);
    setSuggestions([]);
    setQuery("");
    setIsMenuOpen(false); // Close the mobile menu after navigation
  };

  // Fetch AI answer and navigate to the AI page
  const fetchAIAnswer = async () => {
    setIsLoading(true);
    try {
      const userId = sessionStorage.getItem("userId") || `user-${Date.now()}`;
      sessionStorage.setItem("userId", userId);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: query, userId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Er ging iets mis");

      // Gebruik encodeURIComponent om query-parameters veilig te maken
      const encodedWord = encodeURIComponent(query);
      const encodedDefinition = encodeURIComponent(data.definition);

      router.push(`/ai?word=${encodedWord}&definition=${encodedDefinition}`);
    } catch (err) {
      console.error("Error fetching AI answer:", err);
      setError("Er ging iets mis bij het ophalen van het AI-antwoord.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Controleer of het woord exact bestaat in de suggesties
    const wordExists = suggestions.some(
      (suggestion) => suggestion.title.toLowerCase() === query.toLowerCase()
    );

    if (wordExists) {
      const suggestion = suggestions.find(
        (s) => s.title.toLowerCase() === query.toLowerCase()
      );
      router.push(`/woorden/${suggestion.slug}`);
      setIsMenuOpen(false); // Close the mobile menu after navigation
    } else {
      // Indien het woord niet bestaat, gebruik ChatGPT via fetchAIAnswer
      await fetchAIAnswer();
    }
  };

  return (
    <header id='header' className='bg-white border-b border-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo */}
          <a href='/' className='flex items-center gap-3'>
            <i className='fa-solid fa-book-open text-indigo-600 text-2xl'></i>
            <span className='text-lg md:text-xl font-bold text-gray-800'>
              WatBetekent.be
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-gray-600 hover:text-indigo-600'>
            <i
              className={`fa-solid ${
                isMenuOpen ? "fa-xmark" : "fa-bars"
              } text-xl`}></i>
          </button>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            <a
              href='/woorden'
              className='text-gray-600 hover:text-indigo-600 font-medium transition-colors'>
              Woordenlijst
            </a>
          </nav>

          {/* Search Field */}
          <form
            onSubmit={handleSearchSubmit}
            className='hidden md:block w-[280px]'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Zoeken...'
                value={query}
                onChange={handleSearchChange}
                className='w-full px-4 py-2 border border-gray-200 rounded-lg'
              />
              <button
                type='submit'
                className='absolute right-3 top-1/2 -translate-y-1/2'>
                <i
                  className={`fa-solid fa-magnifying-glass ${
                    isLoading ? "animate-spin" : ""
                  } text-gray-400`}></i>
              </button>
              {suggestions.length > 0 && (
                <div className='absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.slug)}
                      className='block w-full text-left px-4 py-2 hover:bg-gray-50'>
                      {suggestion.title}
                    </button>
                  ))}
                  {!suggestions.some(
                    (suggestion) =>
                      suggestion.title.toLowerCase() === query.toLowerCase()
                  ) && (
                    <button
                      onClick={() => fetchAIAnswer()}
                      className='block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600'>
                      Zoek via AI
                    </button>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <nav className='py-4 space-y-4'>
            <a
              href='/woorden'
              className='block text-gray-600 hover:text-indigo-600 font-medium transition-colors'
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              Woordenlijst
            </a>
            <form onSubmit={handleSearchSubmit}>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Zoeken...'
                  value={query}
                  onChange={handleSearchChange}
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                />
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <i
                    className={`fa-solid fa-magnifying-glass ${
                      isLoading ? "animate-spin" : ""
                    } text-gray-400`}></i>
                </button>
                {suggestions.length > 0 && (
                  <div className='absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.slug)}
                        className='block w-full text-left px-4 py-2 hover:bg-gray-50'>
                        {suggestion.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
