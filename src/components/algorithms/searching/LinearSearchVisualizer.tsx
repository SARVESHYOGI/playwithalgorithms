import { useState } from "react";

export default function LinearSearchVisualizer({
  array: initialArray,
  searchElement: tar = 22,
}: {
  array?: number[];
  searchElement?: number;
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90, 88, 76, 50]
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<number>(tar);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [comparisons, setComparisons] = useState(0);
  const [searchResult, setSearchResult] = useState<
    "found" | "not-found" | null
  >(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async () => {
    if (array.length === 0) return;

    setIsSearching(true);
    setCurrentStep(`Starting linear search for target: ${target}`);
    setComparisons(0);
    setFoundIndex(null);
    setSearchResult(null);
    await sleep(speed);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      setComparisons((prev) => prev + 1);
      setCurrentStep(`Checking index ${i}: Is ${array[i]} equal to ${target}?`);
      await sleep(speed);

      if (array[i] === target) {
        setFoundIndex(i);
        setSearchResult("found");
        setCurrentStep(`Found! Target ${target} found at index ${i}`);
        await sleep(speed * 2);
        break;
      } else {
        setCurrentStep(`${array[i]} ≠ ${target}, moving to next element...`);
        await sleep(speed / 2);
      }

      if (i === array.length - 1) {
        setSearchResult("not-found");
        setCurrentStep(
          `Search complete. Target ${target} not found in the array.`
        );
        await sleep(speed * 2);
      }
    }

    setCurrentIndex(null);
    setTimeout(() => {
      setCurrentStep("");
      setFoundIndex(null);
      setSearchResult(null);
    }, 3000);
    setIsSearching(false);
  };

  const resetArray = () => {
    if (isSearching) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setComparisons(0);
    setCurrentIndex(null);
    setFoundIndex(null);
    setSearchResult(null);
  };

  const getColor = (value: number, index: number) => {
    const hue = (value * 3.6 + index * 25) % 360;
    return `hsl(${hue}, 75%, 65%)`;
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
    const maxValue = Math.max(...array, 99);
    const normalizedValue = value / maxValue;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  const getBarColor = (index: number, value: number) => {
    if (foundIndex === index) return "#10b981";
    if (currentIndex === index) return "#ef4444";
    if (value === target && !isSearching) return "#8b5cf6";
    return getColor(value, index);
  };

  const getBarBorder = (index: number, value: number) => {
    if (foundIndex === index) return "ring-4 ring-green-400 border-green-300";
    if (currentIndex === index)
      return "ring-4 ring-red-400 border-red-300 animate-pulse";
    if (value === target) return "ring-2 ring-purple-400 border-purple-300";
    return "border-white/30";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-green-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Linear Search Visualizer
        </h2>
        <p className="text-slate-600">
          Watch how linear search checks each element one by one!
        </p>
      </div>

      {/* Statistics */}
      <div className="flex gap-6 bg-white rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{comparisons}</div>
          <div className="text-sm text-slate-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{target}</div>
          <div className="text-sm text-slate-600">Target</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {searchResult === "found"
              ? foundIndex
              : searchResult === "not-found"
              ? "N/A"
              : "-"}
          </div>
          <div className="text-sm text-slate-600">Found At</div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-green-500">
        <p className="text-slate-700 font-medium text-center">
          {currentStep ||
            `Ready to search for ${target}. Click 'Start Search' to begin.`}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSearching}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={1200}>Slow</option>
            <option value={800}>Medium</option>
            <option value={400}>Fast</option>
            <option value={150}>Very Fast</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">
            Array Size:
          </label>
          {array.length}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
          Array Elements{" "}
          {isSearching &&
            currentIndex !== null &&
            `(Checking Index ${currentIndex})`}
        </h3>
        <div className="flex gap-2 w-full items-end justify-center overflow-x-auto h-full ">
          {array.map((value, index) => {
            const isCurrent = currentIndex === index;
            const isFound = foundIndex === index;
            const isTarget = value === target;

            return (
              <div
                className="flex flex-col items-center transition-all duration-300"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-white font-bold shadow-lg transform transition-all duration-300 border-2 ${getBarBorder(
                    index,
                    value
                  )} hover:scale-105`}
                  style={{
                    width: `${Math.max(array.length <= 8 ? 60 : 50, 45)}px`,
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isCurrent
                      ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                      : isFound
                      ? "0 8px 25px rgba(16, 185, 129, 0.4)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <span className="pb-2 text-sm font-bold drop-shadow-sm">
                    {value}
                  </span>
                </div>

                <div className="h-12 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-slate-600 font-medium mb-1">
                    Index {index}
                  </div>
                  {isCurrent && (
                    <div className="text-red-600 font-bold animate-bounce">
                      <div className="text-lg">↑</div>
                      <div className="text-xs bg-red-600 text-white px-1 rounded">
                        Current
                      </div>
                    </div>
                  )}
                  {isFound && (
                    <div className="text-green-600 font-bold">
                      <div className="text-lg">✓</div>
                      <div className="text-xs bg-green-600 text-white px-1 rounded">
                        Found
                      </div>
                    </div>
                  )}
                  {isTarget && !isCurrent && !isFound && (
                    <div className="text-purple-600 font-bold">
                      <div className="text-lg">★</div>
                      <div className="text-xs bg-purple-600 text-white px-1 rounded">
                        Target
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isSearching && (
        <div className="bg-white rounded-lg p-4 shadow-md w-full max-w-2xl">
          <h4 className="font-bold text-slate-800 mb-2 text-center">
            Search Progress
          </h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(((currentIndex || 0) + 1) / array.length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-slate-600 font-medium">
              {currentIndex !== null
                ? `${currentIndex + 1}/${array.length}`
                : "0/0"}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-sm bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Currently Checking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Found Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Target Value</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={linearSearch}
          disabled={isSearching}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSearching
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          {isSearching ? "Searching..." : "Start Search"}
        </button>

        <button
          onClick={resetArray}
          disabled={isSearching}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSearching
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-slate-800 mb-2">
          How Linear Search Works:
        </h3>
        <p className="text-slate-600 text-sm mb-2">
          Linear search (also called sequential search) checks each element in
          the array one by one from start to finish until it finds the target
          value or reaches the end of the array.
        </p>
        <div className="text-slate-600 text-sm">
          <strong>Best Case:</strong> O(1) - target is first element •
          <strong> Average Case:</strong> O(n/2) •<strong> Worst Case:</strong>{" "}
          O(n) - target is last or not present
        </div>
        <p className="text-slate-600 text-sm mt-1">
          <strong>Space Complexity:</strong> O(1) •<strong> Works on:</strong>{" "}
          Sorted and unsorted arrays •<strong> Simple:</strong> Easy to
          implement and understand
        </p>
      </div>
    </div>
  );
}
