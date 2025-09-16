"use client";

import { sortingAlgorithms } from "@/lib/data";
import Link from "next/link";

export default function SortingPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-3xl font-bold text-gray-800 m-2">
        Sorting Algorithms
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4">
        {sortingAlgorithms.map((algorithm, index) => (
          <div
            key={index}
            className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform"
          >
            <div className="text-xl font-semibold text-gray-900">
              {algorithm.name}
            </div>
            <p className="text-gray-600">{algorithm.description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              <Link href={`/sorting/${algorithm.id}`}>Lets Try</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
