import { useState } from "react";

export default function InsertionSortVisualizer({
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
  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [currentKey, setCurrentKey] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [sortedElements, setSortedElements] = useState<Set<number>>(
    new Set([0])
  );
  const [isShifting, setIsShifting] = useState(false);
  const [shiftingElement, setShiftingElement] = useState<number | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const insertionSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting Insertion Sort...");
    setComparisons(0);
    setShifts(0);
    setCurrentPass(0);
    setSortedElements(new Set([0]));

    const arr = [...array];
    const len = arr.length;
    let totalComparisons = 0;
    let totalShifts = 0;

    await sleep(speed);

    for (let i = 1; i < len; i++) {
      setCurrentPass(i);
      const key = arr[i];
      setCurrentKey(i);
      setCurrentStep(
        `Pass ${i}: Inserting element ${key} from position ${i} into sorted portion`
      );
      await sleep(speed);

      let j = i - 1;
      setCurrentPosition(j);

      while (j >= 0) {
        totalComparisons++;
        setComparisons(totalComparisons);
        setCurrentStep(
          `Pass ${i}: Comparing ${key} with ${arr[j]} at position ${j}`
        );
        await sleep(speed);

        if (arr[j] > key) {
          setIsShifting(true);
          setShiftingElement(j);
          setCurrentStep(
            `Pass ${i}: Shifting ${arr[j]} right (${arr[j]} > ${key})`
          );

          arr[j + 1] = arr[j];
          setArray([...arr]);
          totalShifts++;
          setShifts(totalShifts);

          await sleep(speed);
          setIsShifting(false);
          setShiftingElement(null);

          j--;
          setCurrentPosition(j >= 0 ? j : null);
        } else {
          setCurrentStep(
            `Pass ${i}: Found correct position (${arr[j]} ≤ ${key})`
          );
          await sleep(speed / 2);
          break;
        }
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setCurrentStep(`Pass ${i}: Inserted ${key} at position ${j + 1}`);

      const newSorted = new Set<number>();
      for (let k = 0; k <= i; k++) {
        newSorted.add(k);
      }
      setSortedElements(newSorted);

      await sleep(speed);
    }

    setCurrentKey(null);
    setCurrentPosition(null);
    setCurrentStep(
      `Insertion Sort completed! Array sorted in ${currentPass} passes with ${totalComparisons} comparisons and ${totalShifts} shifts.`
    );
    await sleep(1500);
    setCurrentStep("");
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setComparisons(0);
    setShifts(0);
    setCurrentPass(0);
    setCurrentKey(null);
    setCurrentPosition(null);
    setSortedElements(new Set([0]));
    setIsShifting(false);
    setShiftingElement(null);
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
    if (sortedElements.has(index) && index !== currentKey) return "#10b981";
    if (currentKey === index) return "#8b5cf6";
    if (shiftingElement === index) return "#f59e0b";
    if (currentPosition === index) return "#ef4444";
    return getColor(value, index);
  };

  const getBarBorder = (index: number) => {
    if (currentKey === index) {
      return "ring-4 ring-purple-400 scale-110 animate-pulse";
    }
    if (isShifting && shiftingElement === index) {
      return "ring-4 ring-orange-400 animate-bounce";
    }
    if (currentPosition === index) {
      return "ring-4 ring-red-400 scale-105";
    }
    if (sortedElements.has(index) && index !== currentKey) {
      return "ring-2 ring-green-400";
    }
    return "border-white/30";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Insertion Sort Visualizer
        </h2>
        <p className="text-slate-600">
          Watch how Insertion Sort builds a sorted array one element at a time
          by inserting each element into its correct position!
        </p>
      </div>

      <div className="flex gap-6 bg-white rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {comparisons}
          </div>
          <div className="text-sm text-slate-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{shifts}</div>
          <div className="text-sm text-slate-600">Shifts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentPass}</div>
          <div className="text-sm text-slate-600">Current Pass</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {sortedElements.size}
          </div>
          <div className="text-sm text-slate-600">Elements Sorted</div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-purple-500">
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
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            const isKey = currentKey === index;
            const isPosition = currentPosition === index;
            const isSorted = sortedElements.has(index) && index !== currentKey;

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
                    boxShadow: isKey
                      ? "0 8px 25px rgba(139, 92, 246, 0.4)"
                      : isPosition
                      ? "0 8px 25px rgba(239, 68, 68, 0.4)"
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
                  {currentKey === index && (
                    <div className="text-xs text-purple-600 font-bold">
                      <div>↑</div>
                      <div>key</div>
                    </div>
                  )}
                  {currentPosition === index && (
                    <div className="text-xs text-red-500 font-bold">
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
                    ? "bg-purple-500 text-white animate-pulse"
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
          <span>Current Key</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Shifting</span>
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
          onClick={insertionSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg"
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
              : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-slate-800 mb-2">
          How Insertion Sort Works:
        </h3>
        <p className="text-slate-600 text-sm mb-2">
          Insertion Sort builds a sorted array one element at a time by taking
          each element from the unsorted portion and inserting it into its
          correct position within the already sorted portion. Its like sorting
          playing cards in your hand.
        </p>
        <div className="text-slate-600 text-sm">
          <strong>Steps:</strong> 1) Start with second element as key • 2)
          Compare key with sorted elements • 3) Shift larger elements right • 4)
          Insert key at correct position
        </div>
        <div className="text-slate-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
