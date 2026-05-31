"use client";

import React, { useState } from "react";

interface SearchBoxProps {
  label: string;
  placeholder: string;
  onSearch: (value: string) => void;
  maxLength?: number;
}

export default function SearchBox({
  label,
  placeholder,
  onSearch,
  maxLength,
}: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value.trim());
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ml-1">
        {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full pl-5 pr-14 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200"
        />
        <button
          onClick={() => onSearch(value.trim())}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2 px-1">
        <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">ENTER</kbd>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
          Tekan Enter untuk mulai mencari kata
        </p>
      </div>
    </div>
  );
}
