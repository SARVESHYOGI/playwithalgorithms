"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { sortingAlgorithms } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SortingPage() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative bg-background-50">
      <Button
        className="absolute top-6 left-8 bg-background-100 hover:bg-background-200 text-background-900 font-semibold py-2 px-4 rounded cursor-pointer shadow"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <div className="absolute top-6 right-[10%]">
        <ThemeToggle />
      </div>
      <div className="text-5xl font-bold text-background-900 m-2">
        Sorting Algorithms
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-6">
        {sortingAlgorithms.map((algorithm, index) => (
          <div
            key={index}
            className="max-w-xs w-full bg-primary-500 rounded-lg shadow-lg p-6 m-2 flex flex-col items-center text-center space-y-4 transform transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="text-3xl text-background font-bold">
              {algorithm.name}
            </div>
            <p className="text-background-950 ">{algorithm.description}</p>
            <Button className="bg-secondary-600 hover:bg-secondary-700 text-background py-2 px-4 rounded-md cursor-pointer">
              <Link href={`/sorting/${algorithm.id}`}>Lets Try</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
