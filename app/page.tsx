"use client";

import React, { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox";
import ResultList from "@/components/ResultList";

export default function Home() {
  const [kbbiData, setKbbiData] = useState<string[]>([]);
  const [letterResults, setLetterResults] = useState<string[]>([]);
  const [prefixResults, setPrefixResults] = useState<string[]>([]);
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

  const handleLetterSearch = (letter: string) => {
    if (!letter) {
      setLetterResults([]);
      return;
    }
    const searchChar = letter[0].toLowerCase();
    const matches = kbbiData.filter((word) =>
      word.toLowerCase().startsWith(searchChar)
    );
    // Shuffle and pick 10 random matches
    const results = shuffleArray(matches).slice(0, 10);
    setLetterResults(results);
  };

  const handlePrefixSearch = (prefix: string) => {
    if (!prefix) {
      setPrefixResults([]);
      return;
    }
    const searchPrefix = prefix.toLowerCase();
    const matches = kbbiData.filter((word) =>
      word.toLowerCase().startsWith(searchPrefix)
    );
    // Shuffle and pick 10 random matches
    const results = shuffleArray(matches).slice(0, 10);
    setPrefixResults(results);
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

      <main className="flex-1 w-full max-w-4xl mx-auto py-12 px-8 flex flex-col gap-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-medium">Loading vocabulary data...</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <SearchBox
                  label="Search by Single Letter"
                  placeholder="Enter a letter (e.g., a)"
                  onSearch={handleLetterSearch}
                  maxLength={1}
                />
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <SearchBox
                  label="Search by Prefix"
                  placeholder="Enter prefix (e.g., ab)"
                  onSearch={handlePrefixSearch}
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 min-h-[300px]">
                <ResultList
                  title="Results by Letter"
                  items={letterResults}
                  emptyMessage="No results found or search not performed yet."
                />
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 min-h-[300px]">
                <ResultList
                  title="Results by Prefix"
                  items={prefixResults}
                  emptyMessage="No results found or search not performed yet."
                />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="w-full py-8 px-8 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} KBBI Word Search Dashboard. Data from public KBBI records.</p>
        </div>
      </footer>
    </div>
  );
}
