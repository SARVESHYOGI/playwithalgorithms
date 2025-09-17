import { useState } from "react";

export default function QuickSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90]
  );
  const [isSorting, setIsSorting] = useState(false);
  const [pointerI, setPointerI] = useState<number | null>(null);
  const [pointerJ, setPointerJ] = useState<number | null>(null);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [currentRange, setCurrentRange] = useState<[number, number] | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);
  const [arraySize, setArraySize] = useState(7);
  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const quickSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting QuickSort...");
    setSwaps(0);
    setComparisons(0);
    const arr = [...array];

    await quickSortHelper(arr, 0, arr.length - 1);

    setPointerI(null);
    setPointerJ(null);
    setPivotIndex(null);
    setCurrentRange(null);
    setCurrentStep("Sorting complete!");
    await sleep(1000);
    setCurrentStep("");
    setIsSorting(false);
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      setCurrentRange([low, high]);
      setCurrentStep(`Sorting subarray from index ${low} to ${high}`);
      await sleep(speed);

      const pivotIdx = await partition(arr, low, high);

      await quickSortHelper(arr, low, pivotIdx - 1);
      await quickSortHelper(arr, pivotIdx + 1, high);
    }
  };

  const partition = async (
    arr: number[],
    low: number,
    high: number
  ): Promise<number> => {
    const pivot = arr[high];
    setPivotIndex(high);
    setCurrentStep(`Chosen pivot: ${pivot} at index ${high}`);
    await sleep(speed);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      setPointerJ(j);
      setComparisons((prev) => prev + 1);
      setCurrentStep(`Comparing ${arr[j]} with pivot ${pivot}`);
      await sleep(speed);

      if (arr[j] <= pivot) {
        i++;
        setPointerI(i);

        if (i !== j) {
          setCurrentStep(
            `${arr[j]} ≤ ${pivot}, swapping positions ${i} and ${j}`
          );
          await sleep(speed);

          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          setSwaps((prev) => prev + 1);
          await sleep(speed);
        } else {
          setCurrentStep(`${arr[j]} ≤ ${pivot}, already in correct position`);
          await sleep(speed / 2);
        }
      } else {
        setCurrentStep(`${arr[j]} > ${pivot}, no swap needed`);
        await sleep(speed / 2);
      }
    }

    setCurrentStep(`Placing pivot ${pivot} in its final position`);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setSwaps((prev) => prev + 1);
    setPivotIndex(i + 1);
    await sleep(speed);

    setPointerI(null);
    setPointerJ(null);

    return i + 1;
  };

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 99) + 1
    );
    setArray(newArray);
    setCurrentStep("");
    resetCounters();
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    setCurrentStep("");
    resetCounters();
    clearPointers();
  };

  const resetCounters = () => {
    setSwaps(0);
    setComparisons(0);
  };

  const clearPointers = () => {
    setPointerI(null);
    setPointerJ(null);
    setPivotIndex(null);
    setCurrentRange(null);
  };

  const getColor = (value: number, index: number) => {
    const hue = (value * 3.6 + index * 25) % 360;
    return `hsl(${hue}, 75%, 65%)`;
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 250;
    const normalizedValue = value / 99;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  const getBarColor = (index: number, value: number) => {
    if (pivotIndex === index) return "#ef4444";
    if (pointerI === index) return "#f59e0b";
    if (pointerJ === index) return "#3b82f6";
    return getColor(value, index);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          QuickSort Visualizer
        </h2>
        <p className="text-slate-600">
          Watch the divide and conquer strategy in action!
        </p>
      </div>

      <div className="flex gap-6 bg-white rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{comparisons}</div>
          <div className="text-sm text-slate-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{swaps}</div>
          <div className="text-sm text-slate-600">Swaps</div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-orange-500">
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
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value={1000}>Slow</option>
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

      <div className="flex gap-2 w-full items-end justify-center overflow-x-auto border-2 border-slate-200 p-6 rounded-xl bg-gradient-to-t from-slate-100 to-white min-h-[350px] relative">
        {currentRange && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            Current Range: {currentRange[0]} - {currentRange[1]}
          </div>
        )}

        {array.map((value, index) => {
          const isInCurrentRange =
            currentRange &&
            index >= currentRange[0] &&
            index <= currentRange[1];
          const isPivot = pivotIndex === index;
          const isPointer = pointerI === index || pointerJ === index;

          return (
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                isInCurrentRange && !isPivot
                  ? "border-t-4 border-orange-400 pt-2 bg-orange-50 rounded-t-lg"
                  : ""
              }`}
              key={`${index}-${value}`}
            >
              <div
                className={`rounded-lg flex items-end justify-center text-white font-bold shadow-lg transform transition-all duration-300 border-2 ${
                  isPivot
                    ? "ring-4 ring-red-400 scale-110 border-red-300 animate-pulse"
                    : isPointer
                    ? "ring-4 ring-yellow-400 scale-110 border-yellow-300"
                    : "border-white/30"
                } hover:scale-105`}
                style={{
                  width: `${Math.max(array.length <= 7 ? 52 : 40, 35)}px`,
                  height: `${getBarHeight(value)}px`,
                  backgroundColor: getBarColor(index, value),
                  boxShadow: isPivot
                    ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                    : isPointer
                    ? "0 8px 25px rgba(255, 193, 7, 0.4)"
                    : "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <span className="pb-2 text-sm font-bold drop-shadow-sm">
                  {value}
                </span>
              </div>

              <div className="h-12 mt-2 flex flex-col items-center justify-center">
                {pivotIndex === index && (
                  <div className="text-red-600 font-bold">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-red-600 text-white px-1 rounded">
                      P
                    </div>
                  </div>
                )}
                {pointerI === index && pivotIndex !== index && (
                  <div className="text-orange-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-orange-600 text-white px-1 rounded">
                      i
                    </div>
                  </div>
                )}
                {pointerJ === index && pivotIndex !== index && (
                  <div className="text-blue-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-blue-600 text-white px-1 rounded">
                      j
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 text-sm bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Left Pointer (i)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Right Pointer (j)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-200 border-2 border-orange-400 rounded"></div>
          <span>Current Range</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={quickSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 active:scale-95 shadow-lg"
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
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-white`}
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-slate-800 mb-2">How QuickSort Works:</h3>
        <p className="text-slate-600 text-sm mb-2">
          QuickSort is a divide-and-conquer algorithm that selects a
          &rsquo;pivot&rsquo; element and partitions the array around it.
          Elements smaller than the pivot go to the left, larger elements go to
          the right.
        </p>
        <p className="text-slate-600 text-sm">
          <strong>Time Complexity:</strong> Average O(n log n), Worst case O(n²)
          •<strong> Space Complexity:</strong> O(log n) •
          <strong> In-place:</strong> Yes •<strong> Stable:</strong> No
        </p>
      </div>
    </div>
  );
}
