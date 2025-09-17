import { useState } from "react";

export default function SelectionSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90]
  );
  const [isSorting, setIsSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);
  const [arraySize, setArraySize] = useState(7);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [minIndex, setMinIndex] = useState<number | null>(null);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const [sortedElements, setSortedElements] = useState<Set<number>>(new Set());
  const [isSwapping, setIsSwapping] = useState(false);
  const [swappingIndices, setSwappingIndices] = useState<
    [number, number] | null
  >(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const selectionSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting Selection Sort...");
    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setSortedElements(new Set());

    const arr = [...array];
    const len = arr.length;
    let totalComparisons = 0;
    let totalSwaps = 0;

    await sleep(speed);

    for (let i = 0; i < len - 1; i++) {
      setCurrentPass(i + 1);
      setCurrentIndex(i);
      setCurrentStep(
        `Pass ${
          i + 1
        }: Finding minimum element in unsorted portion starting at position ${i}`
      );

      let minIdx = i;
      setMinIndex(minIdx);
      await sleep(speed);

      for (let j = i + 1; j < len; j++) {
        setCompareIndex(j);
        totalComparisons++;
        setComparisons(totalComparisons);
        setCurrentStep(
          `Pass ${i + 1}: Comparing ${
            arr[j]
          } at position ${j} with current minimum ${
            arr[minIdx]
          } at position ${minIdx}`
        );
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          setCurrentStep(
            `Pass ${i + 1}: Found new minimum! ${arr[j]} < ${arr[minIdx]}`
          );
          minIdx = j;
          setMinIndex(minIdx);
          await sleep(speed);
        } else {
          setCurrentStep(
            `Pass ${i + 1}: ${arr[j]} ≥ ${arr[minIdx]}, keeping current minimum`
          );
          await sleep(speed / 2);
        }
      }

      setCompareIndex(null);

      if (minIdx !== i) {
        setIsSwapping(true);
        setSwappingIndices([i, minIdx]);
        setCurrentStep(
          `Pass ${i + 1}: Swapping minimum element ${
            arr[minIdx]
          } from position ${minIdx} with ${arr[i]} at position ${i}`
        );

        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        totalSwaps++;
        setSwaps(totalSwaps);

        await sleep(speed);
        setIsSwapping(false);
        setSwappingIndices(null);
      } else {
        setCurrentStep(
          `Pass ${i + 1}: Element ${
            arr[i]
          } is already in correct position (no swap needed)`
        );
        await sleep(speed);
      }

      setSortedElements((prev) => new Set([...prev, i]));
      setCurrentStep(
        `Pass ${i + 1} completed: Element ${
          arr[i]
        } is now in its final sorted position`
      );
      await sleep(speed);
    }

    setSortedElements((prev) => new Set([...prev, len - 1]));

    setCurrentIndex(null);
    setMinIndex(null);
    setCurrentStep(
      `Selection Sort completed! Array sorted in ${currentPass} passes with ${totalComparisons} comparisons and ${totalSwaps} swaps.`
    );
    await sleep(1500);
    setCurrentStep("");
    setIsSorting(false);
  };

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    resetVisualization();
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setCurrentIndex(null);
    setMinIndex(null);
    setCompareIndex(null);
    setSortedElements(new Set());
    setIsSwapping(false);
    setSwappingIndices(null);
  };

  const getColor = (value: number, index: number) => {
    const hue = (value * 3.6 + index * 30) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
    const maxValue = Math.max(...array, 100);
    const normalizedValue = value / maxValue;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  const getBarColor = (index: number, value: number) => {
    if (sortedElements.has(index)) return "#10b981";
    if (
      swappingIndices &&
      (swappingIndices[0] === index || swappingIndices[1] === index)
    ) {
      return "#f59e0b";
    }
    if (currentIndex === index) return "#8b5cf6";
    if (minIndex === index) return "#ef4444";
    if (compareIndex === index) return "#06b6d4";
    return getColor(value, index);
  };

  const getBarBorder = (index: number) => {
    if (
      isSwapping &&
      swappingIndices &&
      (swappingIndices[0] === index || swappingIndices[1] === index)
    ) {
      return "ring-4 ring-orange-400 animate-pulse";
    }
    if (currentIndex === index) {
      return "ring-4 ring-purple-400 scale-110";
    }
    if (minIndex === index) {
      return "ring-4 ring-red-400 scale-110 animate-pulse";
    }
    if (compareIndex === index) {
      return "ring-4 ring-cyan-400 scale-105";
    }
    if (sortedElements.has(index)) {
      return "ring-2 ring-green-400";
    }
    return "border-white/30";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Selection Sort Visualizer
        </h2>
        <p className="text-slate-600">
          Watch how Selection Sort finds the minimum element and places it in
          the correct position!
        </p>
      </div>

      <div className="flex gap-6 bg-white rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">{comparisons}</div>
          <div className="text-sm text-slate-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{swaps}</div>
          <div className="text-sm text-slate-600">Swaps</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {currentPass}
          </div>
          <div className="text-sm text-slate-600">Current Pass</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {sortedElements.size}
          </div>
          <div className="text-sm text-slate-600">Elements Sorted</div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-cyan-500">
        <p className="text-slate-700 font-medium text-center">
          {currentStep || "Click 'Start Sort' to begin visualization"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value={1200}>Slow</option>
            <option value={600}>Medium</option>
            <option value={300}>Fast</option>
            <option value={100}>Very Fast</option>
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
          Current Array {isSorting && `(Pass ${currentPass})`}
        </h3>
        <div className="flex gap-2 w-full items-end justify-center overflow-x-auto min-h-[250px] relative">
          {array.map((value, index) => {
            const isCurrent = currentIndex === index;
            const isMin = minIndex === index;
            const isCompare = compareIndex === index;
            const isSorted = sortedElements.has(index);

            return (
              <div
                className="flex flex-col items-center transition-all duration-300"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-white font-bold shadow-lg transform transition-all duration-300 border-2 ${getBarBorder(
                    index
                  )} hover:scale-105`}
                  style={{
                    width: Math.max(array.length <= 10 ? 50 : 40, 35),
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isCurrent
                      ? "0 8px 25px rgba(139, 92, 246, 0.4)"
                      : isMin
                      ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                      : isCompare
                      ? "0 8px 25px rgba(6, 182, 212, 0.4)"
                      : isSorted
                      ? "0 4px 15px rgba(16, 185, 129, 0.4)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="pb-2 text-center">
                    <div className="text-sm font-bold drop-shadow-sm">
                      {value}
                    </div>
                  </div>
                </div>

                <div className="h-12 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-slate-600 font-medium mb-1">
                    {index}
                  </div>
                  {currentIndex === index && (
                    <div className="text-xs text-purple-600 font-bold">
                      <div>↑</div>
                      <div>i</div>
                    </div>
                  )}
                  {minIndex === index && (
                    <div className="text-xs text-red-500 font-bold">
                      <div>↑</div>
                      <div>min</div>
                    </div>
                  )}
                  {compareIndex === index && (
                    <div className="text-xs text-cyan-500 font-bold">
                      <div>↑</div>
                      <div>j</div>
                    </div>
                  )}
                  {isSorted && (
                    <div className="text-xs text-green-600 font-bold">✓</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isSorting && (
        <div className="bg-white rounded-lg p-4 shadow-md w-full max-w-2xl">
          <h4 className="font-bold text-slate-800 mb-3 text-center">
            Pass Progress
          </h4>
          <div className="flex justify-center gap-2">
            {Array.from({ length: array.length - 1 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < currentPass
                    ? "bg-green-500 text-white"
                    : i === currentPass - 1
                    ? "bg-cyan-500 text-white animate-pulse"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-slate-600 mt-2">
            {currentPass > 0
              ? `Completed ${currentPass - 1} pass${
                  currentPass - 1 !== 1 ? "es" : ""
                }`
              : "Ready to start"}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-sm bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Current Position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Minimum Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Unsorted</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={selectionSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          {isSorting ? "Sorting..." : "Start Sort"}
        </button>

        <button
          onClick={resetArray}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-slate-800 mb-2">
          How Selection Sort Works:
        </h3>
        <p className="text-slate-600 text-sm mb-2">
          Selection Sort divides the array into sorted and unsorted regions. It
          repeatedly finds the minimum element from the unsorted region and
          places it at the beginning of the unsorted region, effectively growing
          the sorted region.
        </p>
        <div className="text-slate-600 text-sm">
          <strong>Steps:</strong> 1) Find minimum in unsorted portion • 2) Swap
          with first unsorted element • 3) Move boundary of sorted region • 4)
          Repeat until sorted
        </div>
        <div className="text-slate-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n²), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
