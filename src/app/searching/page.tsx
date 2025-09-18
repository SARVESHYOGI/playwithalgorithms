"use client";

import { Button } from "@/components/ui/button";
import { searchAlgorithms } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchingPage() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <Button
        className="absolute top-6 left-8 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <div className="text-3xl font-bold text-gray-800 m-2">
        Sorting Algorithms
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4">
        {searchAlgorithms.map((algorithm, index) => (
          <div
            key={index}
            className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform"
          >
            <div className="text-xl font-semibold text-gray-900">
              {algorithm.name}
            </div>
            <p className="text-gray-600">{algorithm.description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              <Link href={`/searching/${algorithm.id}`}>Lets Try</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
