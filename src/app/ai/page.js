"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatWidget from "../components/ChatWidget";

export default function AIPage() {
  const searchParams = useSearchParams();

  // State voor het opslaan van initiële waarden
  const [initialWord, setInitialWord] = useState("");
  const [initialResponse, setInitialResponse] = useState("");
  const [hydrated, setHydrated] = useState(false); // Zorg ervoor dat alles consistent hydrateert

  // Gebruik useEffect om de queryparameters op de client te synchroniseren
  useEffect(() => {
    // Haal de parameters op van de URL
    const word = searchParams.get("word") || "";
    const definition = searchParams.get("definition") || "";

    // Update de state
    setInitialWord(word);
    setInitialResponse(definition);
    setHydrated(true); // Markeer als gehydrateerd
  }, [searchParams]);

  // Toon een loading-indicator als de pagina nog niet volledig gehydrateerd is
  if (!hydrated) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl text-gray-600'>Laden...</p>
      </div>
    );
  }

  return (
    <main id='main' className='space-y-8'>
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-4'>
          Ontdek de betekenis van {initialWord}
        </h1>
      </section>
      {/* Chat Section */}
      <section>
        <div className='max-w-3xl mx-auto'>
          <ChatWidget
            initialWord={initialWord}
            initialResponse={initialResponse}
          />
        </div>
      </section>

      {/* Geef initiële waarden door aan de widget */}
    </main>
  );
}
