import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const hashStructures = [
  { id: "hash-map", name: "Hash Map" },
  { id: "hash-set", name: "Hash Set" },
  { id: "unordered-map", name: "Unordered Map" },
  { id: "unordered-set", name: "Unordered Set" },
];

function HashAnimation() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hashTableData, setHashTableData] = useState<(string | null)[][]>([]);

  const hashFunction = (key: string, tableSize = 6) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % tableSize;
    }
    return hash;
  };

  const animateHashTable = async () => {
    setIsAnimating(true);
    const keys = ["apple", "banana", "cherry", "date"];
    const table: string[][] = new Array(6).fill(null).map(() => []);

    for (const key of keys) {
      const index = hashFunction(key);
      table[index].push(key);
      setHashTableData([...table]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    for (let i = 0; i < 2; i++) {
      const keyToRemove = keys[i];
      const index = hashFunction(keyToRemove);
      table[index] = table[index].filter((item) => item !== keyToRemove);
      setHashTableData([...table]);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        animateHashTable();
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getHashColor = (index: number) => {
    // const theme = document.documentElement.getAttribute("data-theme");
    const value = Math.floor(Math.random() * 100);
    const primaryColors = [
      // "--primary-50",
      // "--primary-100",
      "--primary-200",
      "--primary-300",
      "--primary-400",
      "--primary-500",
      "--primary-600",
      "--primary-700",
      "--primary-800",
      "--primary-900",
      "--primary-950",
    ];
    const secondaryColors = [
      // "--secondary-50",
      // "--secondary-100",
      "--secondary-200",
      "--secondary-300",
      "--secondary-400",
      "--secondary-500",
      "--secondary-600",
      "--secondary-700",
      "--secondary-800",
      "--secondary-900",
      "--secondary-950",
    ];
    const accentColors = [
      // "--accent-50",
      // "--accent-100",
      "--accent-200",
      "--accent-300",
      "--accent-400",
      "--accent-500",
      "--accent-600",
      "--accent-700",
      "--accent-800",
      "--accent-900",
      "--accent-950",
    ];

    let colorSet = primaryColors;

    if (index % 3 === 1) colorSet = secondaryColors;
    if (index % 3 === 2) colorSet = accentColors;

    const colorIndex = (value + index) % colorSet.length;

    const colorVariable = colorSet[colorIndex];

    return getComputedStyle(document.documentElement)
      .getPropertyValue(colorVariable)
      .trim();
  };

  return (
    <div className="w-full h-full rounded-xl  px-6 py-6">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-3 mb-3">
          <h3 className="text-3xl font-bold text-primary-950">
            Hash Structure Demo
          </h3>
        </div>
        <p className="text-primary-700 text-sm">
          Fast access using hash functions - HASH
        </p>
      </div>

      <div className="h-56 flex items-center justify-center bg-gradient-to-b from-background-500 to-transparent rounded-lg p-4">
        <div className="flex flex-col items-center w-full h-full">
          <div className="text-sm font-bold text-background mb-3 flex items-center gap-1">
            🗂️ HASH TABLE
          </div>

          <div className="grid grid-cols-6 gap-2 w-full flex-1">
            {hashTableData.map((bucket, index) => (
              <div
                key={`bucket-${index}`}
                className="flex flex-col items-center justify-between h-full"
              >
                <div className="text-xs font-medium text-background mb-2">
                  {index}
                </div>

                <div className="flex-1 w-full bg-gradient-to-b from-background to-background-50 border-b  rounded p-2 flex flex-col gap-2 min-h-20">
                  {bucket.map((item, itemIndex) => (
                    <div
                      key={`item-${index}-${itemIndex}`}
                      className="bg-background-500 text-background-50 text-xl border px-2 py-1 rounded truncate"
                      style={{ backgroundColor: getHashColor(index) }}
                    >
                      {item && item.slice(0, item.length)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <div
          className={`inline-flex items-center space-x-2 ${
            isAnimating ? "text-primary-900" : "text-primary-500"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isAnimating
                ? "bg-background-500 animate-pulse"
                : "bg-background-400"
            }`}
          ></div>
          <span className="font-medium text-sm">
            {isAnimating ? `HASH operations...` : "Ready for next demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

function HashExploreSection() {
  return (
    <div className="h-full">
      <div className="bg-primary text-background rounded-xl p-6 shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">⚡</div>
        <h2 className="text-4xl font-bold mb-3 text-center">
          Lightning Fast Access!
        </h2>
        <p className="text-sm mb-4 text-primary-100 leading-relaxed text-center">
          Master hash-based structures for O(1) average-case performance and
          efficient data retrieval.
        </p>
        <div className="text-center">
          <Link href="/hash" className="w-full h-full">
            <Button className="px-6 py-2 text-lg font-bold rounded-lg shadow-md hover:shadow-lg  transition-all duration-300 cursor-pointer  bg-secondary text-text-950  hover:cursor-pointer hover:bg-secondary/70 dark:text-black">
              Hash It Out! ⚡
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function HashTitle() {
  return (
    <div className="text-center rounded-xl p-6 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-6xl font-extrabold text-primary-950 drop-shadow-sm mb-4">
        Hash-Based Data Structures
      </h1>
      <p className="text-sm md:text-base text-primary-700 leading-relaxed px-2 mb-4">
        Ultra-fast data access using hash functions for O(1) average-case
        performance in insertions, deletions, and lookups.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ O(1) Access
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          🗝️ Key-Value
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          🎯 Unique
        </div>
      </div>
    </div>
  );
}

export default function HashDataStructuresTemp() {
  const linkData = hashStructures;

  return (
    <div className="h-screen p-4 bg-background-50">
      <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full max-h-screen">
        <div className="col-span-10 row-span-4 col-start-2 row-start-1 flex items-center justify-center">
          <HashTitle />
        </div>

        <div className="col-span-5 row-span-5 col-start-8 row-start-7 flex items-center justify-center">
          <HashExploreSection />
        </div>

        <div className="col-span-7 row-span-8 col-start-1 row-start-5 flex items-center justify-center">
          <HashAnimation />
        </div>

        <div className="col-span-5 row-span-4 col-start-8 row-start-5 grid grid-cols-4 grid-rows-4 gap-3">
          {linkData.map((link, index) => (
            <div key={index} className={`flex items-center justify-center`}>
              <Link href={`/hash/${link.id}`} className="w-full h-full">
                <Button
                  className=" transition-colors duration-200 text-text-50 font-medium rounded-lg text-xs shadow-sm hover:shadow-md min-h-12 border-2 border-background-200 cursor-pointer w-full h-full bg-primary hover:cursor-pointer
              hover:bg-primary/70"
                >
                  {link.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
