import React, { useState, useEffect } from "react";

const hashStructures = [
  { id: "hash-table", name: "Hash Table" },
  { id: "hash-map", name: "Hash Map" },
  { id: "hash-set", name: "Hash Set" },
  { id: "unordered-map", name: "Unordered Map" },
  { id: "unordered-set", name: "Unordered Set" },
];

function HashAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStructure, setCurrentStructure] = useState("hashtable");
  const [hashTableData, setHashTableData] = useState([]);
  const [hashSetData, setHashSetData] = useState([]);
  const [hashMapData, setHashMapData] = useState([]);

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
    const table = new Array(6).fill(null).map(() => []);

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

  const animateHashSet = async () => {
    setIsAnimating(true);
    const values = [15, 23, 8, 42, 16, 35];
    const set = [];

    for (const value of values) {
      if (!set.includes(value)) {
        set.push(value);
        setHashSetData([...set]);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));

    for (let i = 0; i < 2; i++) {
      set.shift();
      setHashSetData([...set]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  const animateHashMap = async () => {
    setIsAnimating(true);
    const pairs = [
      { key: "name", value: "John" },
      { key: "age", value: "25" },
      { key: "city", value: "NYC" },
      { key: "job", value: "Dev" },
    ];

    const map = [];

    for (const pair of pairs) {
      map.push(pair);
      setHashMapData([...map]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));

    map[1] = { key: "age", value: "26" };
    setHashMapData([...map]);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        if (currentStructure === "hashtable") {
          animateHashTable();
        } else if (currentStructure === "hashset") {
          animateHashSet();
        } else {
          animateHashMap();
        }
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating, currentStructure]);

  const switchStructure = () => {
    if (!isAnimating) {
      const structures = ["hashtable", "hashset", "hashmap"];
      const currentIndex = structures.indexOf(currentStructure);
      const nextIndex = (currentIndex + 1) % structures.length;
      setCurrentStructure(structures[nextIndex]);
      setHashTableData([]);
      setHashSetData([]);
      setHashMapData([]);
    }
  };

  const getHashColor = (index) => {
    const hue = (index * 45) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="bg-white/40 w-full h-full rounded-xl shadow-lg p-4 border border-emerald-200">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Hash Structure Demo
          </h3>
        </div>
        <p className="text-gray-700 text-sm">
          Fast access using hash functions - {currentStructure.toUpperCase()}
        </p>
      </div>

      <div className="h-48 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3">
        {currentStructure === "hashtable" && (
          <div className="flex flex-col items-center w-full h-full">
            <div className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-1">
              🗂️ HASH TABLE
            </div>
            <div className="grid grid-cols-6 gap-1 w-full flex-1">
              {hashTableData.map((bucket, index) => (
                <div
                  key={`bucket-${index}`}
                  className="flex flex-col items-center h-full"
                >
                  <div className="text-xs font-medium text-emerald-600 mb-1">
                    {index}
                  </div>
                  <div className="flex-1 w-full bg-white border border-emerald-200 rounded p-1 flex flex-col gap-1 min-h-20">
                    {bucket.map((item, itemIndex) => (
                      <div
                        key={`item-${index}-${itemIndex}`}
                        className="bg-emerald-500 text-white text-xs px-1 py-0.5 rounded truncate"
                        style={{ backgroundColor: getHashColor(index) }}
                      >
                        {item.slice(0, 4)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-3">
        <div
          className={`inline-flex items-center space-x-2 ${
            isAnimating ? "text-emerald-600" : "text-gray-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isAnimating ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="font-medium text-xs">
            {isAnimating
              ? `${currentStructure.toUpperCase()} operations...`
              : "Ready for next demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

function HashExploreSection() {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">⚡</div>
        <h2 className="text-2xl font-bold mb-3 text-center">
          Lightning Fast Access!
        </h2>
        <p className="text-sm mb-4 text-emerald-100 leading-relaxed text-center">
          Master hash-based structures for O(1) average-case performance and
          efficient data retrieval.
        </p>
        <div className="text-center">
          <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-2 text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Hash It Out! ⚡
          </button>
        </div>
      </div>
    </div>
  );
}

function HashTitle() {
  return (
    <div className="text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border border-emerald-100 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-6xl font-extrabold text-gray-800 leading-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
        Hash-Based Data Structures
      </h1>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed px-2 mb-4">
        Ultra-fast data access using hash functions for O(1) average-case
        performance in insertions, deletions, and lookups.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ O(1) Access
        </div>
        <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
          🗝️ Key-Value
        </div>
        <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
          🎯 Unique
        </div>
      </div>
    </div>
  );
}

export default function HashDataStructuresTemp() {
  const linkData = hashStructures;

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full max-h-screen">
        <div className="col-span-10 row-span-4 col-start-2 row-start-1 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 flex items-center justify-center border border-cyan-200">
            <HashTitle />
          </div>
        </div>

        <div className="col-span-5 row-span-5 col-start-8 row-start-7 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 border border-emerald-200 flex items-center justify-center">
            <HashExploreSection />
          </div>
        </div>

        <div className="col-span-7 row-span-8 col-start-1 row-start-5 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 border border-teal-200 flex items-center justify-center">
            <HashAnimation />
          </div>
        </div>

        <div className="col-span-5 row-span-4 col-start-8 row-start-5 grid grid-cols-4 grid-rows-4 gap-3">
          {linkData.map((link, index) => (
            <div key={index} className={`flex items-center justify-center`}>
              <button className="w-full h-full bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-white font-medium rounded-lg text-xs shadow-sm hover:shadow-md min-h-12 border-2 border-emerald-200">
                {link.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
