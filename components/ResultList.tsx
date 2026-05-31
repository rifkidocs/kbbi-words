"use client";

import React from "react";

interface ResultListProps {
  title: string;
  items: string[];
  emptyMessage: string;
}

export default function ResultList({
  title,
  items,
  emptyMessage,
}: ResultListProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
          {title}
        </h3>
        {items.length > 0 && (
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-md border border-blue-100 dark:border-blue-800/50 uppercase tracking-wider">
            {items.length} Hasil
          </span>
        )}
      </div>
      
      {items.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="group relative flex items-center justify-center px-3 py-2 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 rounded-xl text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span className="relative z-10 truncate w-full text-center">{item}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/5 dark:to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-xs mx-auto">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}
