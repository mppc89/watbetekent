import WordFilter from "../components/WordFilter";
import { Suspense } from "react";
import fetchWord from "../components/FetchWord";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Woordenlijst van A-Z",
  description:
    "Blader door de volledige lijst van woorden en ontdek hun betekenis.",
  robots: {
    index: false, // Niet indexeren
    follow: true, // Wel links volgen
  },
};

export default async function WordsPage(props) {
  const searchParams = await props.searchParams;
  const words = await fetchWord();
  const category = String(searchParams?.category || "");
  const letter = String(searchParams?.letter || "");

  return (
    <main id='main' className='space-y-8'>
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-4'>Woordenlijst</h1>
        <p className='text-xl text-gray-600 mb-8'>
          Ontdek de betekenis van woorden en afkortingen.
        </p>
      </section>

      <Suspense
        fallback={
          <div className='flex items-center justify-center py-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        }>
        <WordFilter
          words={words || []}
          initialCategory={category}
          initialLetter={letter}
        />
      </Suspense>
    </main>
  );
}
