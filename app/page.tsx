"use client";

import React, { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox";
import ResultList from "@/components/ResultList";

export default function Home() {
  const [kbbiData, setKbbiData] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/kbbi.json");
        if (!response.ok) {
          throw new Error("Failed to load KBBI data");
        }
        const data = await response.json();
        setKbbiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Utility to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSearch = (prefix: string) => {
    if (!prefix) {
      setSearchResults([]);
      return;
    }
    const searchPrefix = prefix.toLowerCase();
    const matches = kbbiData.filter((word) =>
      word.toLowerCase().startsWith(searchPrefix)
    );

    // Filter words that end with 'x', 'y', or 'z'
    const prioritized = matches.filter((word) => {
      const lowerWord = word.toLowerCase();
      return lowerWord.endsWith("x") || lowerWord.endsWith("y") || lowerWord.endsWith("z");
    });
    const others = matches.filter((word) => {
      const lowerWord = word.toLowerCase();
      return !lowerWord.endsWith("x") && !lowerWord.endsWith("y") && !lowerWord.endsWith("z");
    });

    // Shuffle both groups to keep the "random" requirement
    const shuffledPrioritized = shuffleArray(prioritized);
    const shuffledOthers = shuffleArray(others);

    // Combine: prioritized words first, then others, limit to 15
    const results = [...shuffledPrioritized, ...shuffledOthers].slice(0, 15);
    setSearchResults(results);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <header className="w-full py-6 px-8 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            KBBI Word Search
          </h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto py-12 px-8 flex flex-col gap-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-medium">Loading vocabulary data...</p>
          </div>
        ) : (
          <>
            <section className="w-full">
              <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <SearchBox
                  label="Cari Kata Berawalan..."
                  placeholder="Masukkan awalan kata (misal: as, ba, ce)"
                  onSearch={handleSearch}
                />
              </div>
            </section>

            <section className="w-full">
              <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 min-h-[400px]">
                <ResultList
                  title="Hasil Pencarian"
                  items={searchResults}
                  emptyMessage="Belum ada hasil. Masukkan awalan kata dan tekan Enter."
                />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="w-full py-8 px-8 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} KBBI Word Search. Data dari dataset publik KBBI.</p>
          <p className="mt-2 text-zinc-400 dark:text-zinc-500">
            by{" "}
            <a 
              href="https://rifkidocs.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Rifki
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
