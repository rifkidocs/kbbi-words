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
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic py-4">{emptyMessage}</p>
      )}
    </div>
  );
}
