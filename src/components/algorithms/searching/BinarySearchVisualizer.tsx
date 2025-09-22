import { useEffect, useState } from "react";

export default function BinarySearchVisualizer({
  array: initialArray,
  searchElement: initialSearchElement,
}: {
  array?: number[];
  searchElement?: number;
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]
  );
  const [isSorted, setIsSorted] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [arraySize, setArraySize] = useState(11);
  const [target, setTarget] = useState<number>(initialSearchElement || 0);
  const [comparisons, setComparisons] = useState(0);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [searchHistory, setSearchHistory] = useState<
    { left: number; right: number; mid: number; comparison: string }[]
  >([]);
  const [currentComparison, setCurrentComparison] = useState<string>("");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const checkSorted = (arr: number[]) => {
    const sorted = arr.slice().sort((a, b) => a - b);
    return JSON.stringify(arr) === JSON.stringify(sorted);
  };

  useEffect(() => {
    setIsSorted(checkSorted(array));
  }, [array]);

  const binarySearch = async () => {
    if (!isSorted) {
      alert(
        "Array must be sorted for binary search! Please generate a sorted array first."
      );
      return;
    }

    if (!target || target === 0) {
      alert("Please enter a target value to search for!");
      return;
    }

    setIsSearching(true);
    setCurrentStep("Starting Binary Search...");
    setComparisons(0);
    setCurrentIteration(0);
    setFound(null);
    setSearchHistory([]);
    setCurrentComparison("");

    let leftPtr = 0;
    let rightPtr = array.length - 1;
    let totalComparisons = 0;
    let iteration = 0;
    const history: {
      left: number;
      right: number;
      mid: number;
      comparison: string;
    }[] = [];

    await sleep(speed);

    while (leftPtr <= rightPtr) {
      iteration++;
      setCurrentIteration(iteration);

      const midPtr = Math.floor((leftPtr + rightPtr) / 2);

      setLeft(leftPtr);
      setRight(rightPtr);
      setMid(midPtr);

      setCurrentStep(
        `Iteration ${iteration}: Searching in range [${leftPtr}, ${rightPtr}]. Middle index: ${midPtr}`
      );
      await sleep(speed);

      totalComparisons++;
      setComparisons(totalComparisons);

      const midValue = array[midPtr];
      let comparison = "";

      if (midValue === target) {
        comparison = `${midValue} == ${target}`;
        setCurrentComparison(comparison);
        setCurrentStep(
          `Iteration ${iteration}: Found target! ${midValue} == ${target} at index ${midPtr}`
        );

        history.push({
          left: leftPtr,
          right: rightPtr,
          mid: midPtr,
          comparison,
        });
        setSearchHistory([...history]);

        setFound(midPtr);
        await sleep(speed * 1.5);
        break;
      } else if (midValue < target) {
        comparison = `${midValue} < ${target}`;
        setCurrentComparison(comparison);
        setCurrentStep(
          `Iteration ${iteration}: ${midValue} < ${target}, search right half`
        );

        history.push({
          left: leftPtr,
          right: rightPtr,
          mid: midPtr,
          comparison,
        });
        setSearchHistory([...history]);

        await sleep(speed);
        leftPtr = midPtr + 1;

        setCurrentStep(
          `Iteration ${iteration}: Updating left boundary to ${leftPtr}`
        );
        await sleep(speed);
      } else {
        comparison = `${midValue} > ${target}`;
        setCurrentComparison(comparison);
        setCurrentStep(
          `Iteration ${iteration}: ${midValue} > ${target}, search left half`
        );

        history.push({
          left: leftPtr,
          right: rightPtr,
          mid: midPtr,
          comparison,
        });
        setSearchHistory([...history]);

        await sleep(speed);
        rightPtr = midPtr - 1;

        setCurrentStep(
          `Iteration ${iteration}: Updating right boundary to ${rightPtr}`
        );
        await sleep(speed);
      }
    }

    if (found === null) {
      setCurrentStep(
        `Binary Search completed: Target ${target} not found in array after ${totalComparisons} comparisons`
      );
      setLeft(null);
      setRight(null);
      setMid(null);
    } else {
      setCurrentStep(
        `Binary Search completed: Found target ${target} at index ${found} after ${totalComparisons} comparisons in ${iteration} iterations`
      );
    }

    await sleep(2000);
    setCurrentStep("");
    setIsSearching(false);
  };

  const generateSortedArray = () => {
    if (isSearching) return;
    const newArray: number[] = [];
    let value = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < arraySize; i++) {
      newArray.push(value);
      value += Math.floor(Math.random() * 8) + 2;
    }

    setArray(newArray);
    resetVisualization();
  };

  const resetArray = () => {
    if (isSearching) return;
    setArray(initialArray || [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setComparisons(0);
    setCurrentIteration(0);
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setSearchHistory([]);
    setCurrentComparison("");
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 180;
    const maxValue = Math.max(...array, 100);
    const normalizedValue = value / maxValue;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  // const getBarColor = (index: number, value: number) => {
  //   if (found === index) return "#10b981";
  //   if (mid === index) return "#f59e0b";
  //   if (left !== null && right !== null && index >= left && index <= right) {
  //     return "#3b82f6";
  //   }
  //   if (left !== null && right !== null && (index < left || index > right)) {
  //     return "#9ca3af";
  //   }

  //   const hue = (value * 2.5 + index * 25) % 360;
  //   return `hsl(${hue}, 65%, 55%)`;
  // };

  const getBarColor = (index: number, value: number) => {
    // const theme = document.documentElement.getAttribute("data-theme");

    const primaryColors = [
      // "--primary-50",
      // "--primary-100",
      // "--primary-200",
      // "--primary-300",
      "--primary-400",
      "--primary-500",
      "--primary-600",
      "--primary-700",
      "--primary-800",
      // "--primary-900",
      // "--primary-950",
    ];
    const secondaryColors = [
      // "--secondary-50",
      // "--secondary-100",
      // "--secondary-200",
      // "--secondary-300",
      "--secondary-400",
      "--secondary-500",
      "--secondary-600",
      "--secondary-700",
      "--secondary-800",
      // "--secondary-900",
      // "--secondary-950",
    ];
    const accentColors = [
      // "--accent-50",
      // "--accent-100",
      // "--accent-200",
      // "--accent-300",
      "--accent-400",
      "--accent-500",
      "--accent-600",
      "--accent-700",
      "--accent-800",
      // "--accent-900",
      // "--accent-950",
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

  const getBarBorder = (index: number) => {
    if (found === index) {
      return "ring-4 ring-background-400 scale-110 animate-pulse";
    }
    if (mid === index) {
      return "ring-4 ring-background-400 scale-110 animate-bounce";
    }
    if (left === index) {
      return "ring-4 ring-background-400 scale-105";
    }
    if (right === index) {
      return "ring-4 ring-background-400 scale-105";
    }
    if (left !== null && right !== null && index >= left && index <= right) {
      return "ring-2 ring-background-300";
    }
    return "border-background/30";
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTarget(value === "" ? 0 : parseInt(value));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Binary Search Visualizer
        </h2>
        <p className="text-background-600">
          Watch how Binary Search efficiently finds elements in sorted arrays by
          repeatedly dividing the search space!
        </p>
      </div>

      {/* Statistics */}
      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {comparisons}
          </div>
          <div className="text-sm text-background-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {currentIteration}
          </div>
          <div className="text-sm text-background-600">Current Iteration</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {target || "None"}
          </div>
          <div className="text-sm text-background-600">Target Value</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {found !== null ? found : "Not Found"}
          </div>
          <div className="text-sm text-background-600">Found at Index</div>
        </div>
      </div>

      {/* Current Step Display */}
      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentStep ||
            "Enter a target value and click 'Start Search' to begin"}
        </p>
      </div>

      {/* Current Comparison */}
      {currentComparison && (
        <div className="bg-gradient-to-r from-background-100 to-background-200 rounded-lg px-4 py-2 shadow-md border border-background-300">
          <p className="text-background-800 font-bold text-center">
            Current Comparison: {currentComparison}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-center bg-background p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Target:
          </label>
          <input
            type="number"
            value={target || ""}
            onChange={handleTargetChange}
            disabled={isSearching}
            placeholder="Enter target"
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500 w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Speed:
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSearching}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={1200}>Slow</option>
            <option value={800}>Medium</option>
            <option value={400}>Fast</option>
            <option value={200}>Very Fast</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Array Size:
          </label>
          <select
            value={arraySize}
            onChange={(e) => {
              setArraySize(Number(e.target.value));
              if (!isSearching) generateSortedArray();
            }}
            disabled={isSearching}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={7}>7</option>
            <option value={11}>11</option>
            <option value={15}>15</option>
            <option value={19}>19</option>
            <option value={23}>23</option>
          </select>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Sorted Array {isSearching && `(Iteration ${currentIteration})`}
        </h3>
        <div className="flex gap-1 w-full items-end justify-center overflow-x-auto min-h-[220px] relative">
          {array.map((value, index) => {
            const isLeft = left === index;
            const isRight = right === index;
            const isMid = mid === index;
            const isFound = found === index;
            const inRange =
              left !== null &&
              right !== null &&
              index >= left &&
              index <= right;

            return (
              <div
                className="flex flex-col items-center transition-all duration-500"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-background font-bold shadow-lg transform transition-all duration-500 border-2 ${getBarBorder(
                    index
                  )} hover:scale-105`}
                  style={{
                    width: Math.max(array.length <= 15 ? 45 : 35, 30),
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isFound
                      ? "0 8px 25px rgba(16, 185, 129, 0.5)"
                      : isMid
                      ? "0 8px 25px rgba(245, 158, 11, 0.5)"
                      : inRange
                      ? "0 4px 15px rgba(59, 130, 246, 0.4)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="pb-2 text-center">
                    <div className="text-sm font-bold drop-shadow-sm">
                      {value}
                    </div>
                  </div>
                </div>

                <div className="h-16 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-background-600 font-medium mb-1">
                    {index}
                  </div>
                  {isLeft && (
                    <div className="text-xs text-background-600 font-bold">
                      <div>↑</div>
                      <div>L</div>
                    </div>
                  )}
                  {isRight && (
                    <div className="text-xs text-background-600 font-bold">
                      <div>↑</div>
                      <div>R</div>
                    </div>
                  )}
                  {isMid && (
                    <div className="text-xs text-background-600 font-bold">
                      <div>↑</div>
                      <div>M</div>
                    </div>
                  )}
                  {isFound && (
                    <div className="text-xs text-background-600 font-bold">
                      <div>✓</div>
                      <div>Found!</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="bg-background rounded-lg p-4 shadow-md w-full max-w-4xl">
          <h4 className="font-bold text-background-800 mb-3 text-center">
            Search History
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Iteration</th>
                  <th className="text-left p-2">Left</th>
                  <th className="text-left p-2">Right</th>
                  <th className="text-left p-2">Mid</th>
                  <th className="text-left p-2">Comparison</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchHistory.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{entry.left}</td>
                    <td className="p-2">{entry.right}</td>
                    <td className="p-2">{entry.mid}</td>
                    <td className="p-2 font-mono">{entry.comparison}</td>
                    <td className="p-2">
                      {entry.comparison.includes("==")
                        ? "Found!"
                        : entry.comparison.includes("<")
                        ? "Search right"
                        : "Search left"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legend */}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={binarySearch}
          disabled={isSearching || !target}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSearching || !target
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-600 hover:from-background-700 hover:to-background-700 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          {isSearching ? "Searching..." : "Start Search"}
        </button>

        <button
          onClick={generateSortedArray}
          disabled={isSearching}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSearching
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Another Sorted Random Array
        </button>

        <button
          onClick={resetArray}
          disabled={isSearching}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSearching
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Reset
        </button>
      </div>

      {/* Algorithm Info */}
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Binary Search Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Binary Search is an efficient algorithm for finding an item from a
          sorted list. It works by repeatedly dividing the search interval in
          half. If the value is less than the middle element, it searches the
          left half; otherwise, it searches the right half. This continues until
          the value is found or the interval is empty.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Find middle element • 2) Compare with
          target • 3) Eliminate half of search space • 4) Repeat until found or
          exhausted
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> O(log n) •{" "}
          <strong>Space Complexity:</strong> O(1) •{" "}
          <strong>Prerequisite:</strong> Array must be sorted
        </div>
      </div>
    </div>
  );
}
