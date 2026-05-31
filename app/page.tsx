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
          throw new Error("Gagal memuat data KBBI");
        }
        const data = await response.json();
        setKbbiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      word.toLowerCase().startsWith(searchPrefix) && !word.trim().includes(" ")
    );

    const prioritized = matches.filter((word) => {
      const lowerWord = word.toLowerCase();
      return ["x", "y", "z", "q", "f", "v", "w"].some(char => lowerWord.endsWith(char));
    });
    const others = matches.filter((word) => {
      const lowerWord = word.toLowerCase();
      return !["x", "y", "z", "q", "f", "v", "w"].some(char => lowerWord.endsWith(char));
    });

    const shuffledPrioritized = shuffleArray(prioritized);
    const shuffledOthers = shuffleArray(others);

    const results = [...shuffledPrioritized, ...shuffledOthers].slice(0, 40);
    setSearchResults(results);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-3xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-2">Waduh!</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-500/10"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* Dynamic Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full"></div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                KBBI <span className="text-blue-600">Search</span>
              </h1>
              <h2 className="sr-only">Pencarian Kamus Besar Bahasa Indonesia</h2>
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                Kamus Besar Bahasa Indonesia
              </p>
            </div>
          </div>
          
          <nav className="hidden sm:flex items-center gap-1">
            <a href="#" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Beranda</a>
            <a href="https://rifkidocs.vercel.app/" target="_blank" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Tentang</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-6 flex flex-col gap-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-zinc-900 dark:text-zinc-100 font-black text-xl">Menyiapkan Kamus...</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Memuat ribuan kosa kata untuk Anda</p>
            </div>
          </div>
        ) : (
          <>
            <section className="w-full max-w-3xl mx-auto">
              <div className="p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[1.75rem] shadow-xl shadow-zinc-200/30 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                  <SearchBox
                    label="Cari Kata Berawalan..."
                    placeholder="Contoh: as, ba, ce, atau kosa kata lainnya"
                    onSearch={handleSearch}
                  />
                </div>
              </div>
            </section>

            <section className="w-full">
              <div className="relative group">
                <div className="relative p-6 sm:p-8 bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-[2rem] shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <ResultList
                    title="Hasil Pencarian"
                    items={searchResults}
                    emptyMessage="Masukkan awalan kata pada kotak pencarian di atas untuk memulai."
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="w-full py-16 px-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center text-white dark:text-zinc-900 font-black text-sm">K</div>
                <h3 className="font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">KBBI SEARCH</h3>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                Proyek open-source untuk membantu akses bahasa Indonesia yang baik dan benar melalui teknologi web modern.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">Status Dataset</p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm font-black">
                    {kbbiData.length.toLocaleString()} Kata Unik
                  </p>
                </div>
                <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">Tahun</p>
                  <p className="text-zinc-900 dark:text-zinc-100 text-sm font-black">
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
              
              <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">
                Dibuat dengan <span className="text-red-500 animate-pulse inline-block">❤️</span> oleh{" "}
                <a 
                  href="https://rifkidocs.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-black"
                >
                  Rifki
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
