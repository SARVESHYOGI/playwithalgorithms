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
  const [arraySize, _setArraySize] = useState(7);
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

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 250;
    const normalizedValue = value / 99;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

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

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto   bg-background-100 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800">
          QuickSort Visualizer
        </h2>
        <p className="text-background-600">
          Watch the divide and conquer strategy in action!
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {comparisons}
          </div>
          <div className="text-sm text-background-600">Comparisons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">{swaps}</div>
          <div className="text-sm text-background-600">Swaps</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentStep || "Click 'Start Sort' to begin visualization"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center bg-background p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Speed:
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-backgrounborder-background-500"
          >
            <option value={1000} className="bg-background">
              Slow
            </option>
            <option value={600} className="bg-background">
              Medium
            </option>
            <option value={300} className="bg-background">
              Fast
            </option>
            <option value={100} className="bg-background">
              Very Fast
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Array Size:
          </label>
          {array.length}
        </div>
      </div>

      <div className="flex gap-2 w-full items-end justify-center overflow-x-auto border-2 border-background-200 p-6 rounded-xl  min-h-[350px] relative bg-gradient-to-b from-background-950 to-transparent">
        {currentRange && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-background-500 text-background px-3 py-1 rounded-full text-sm font-bold">
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
                  ? "border-t-4 border-background-400 pt-2 bg-background  rounded-t-lg"
                  : ""
              }`}
              key={`${index}-${value}`}
            >
              <div
                className={`rounded-lg flex items-end justify-center text-background font-bold transform transition-all duration-300 border-2 ${
                  isPivot
                    ? "ring-4 ring-background-400 scale-110 border-background-300 animate-pulse"
                    : isPointer
                    ? "ring-4 ring-background-400 scale-110 border-background-300"
                    : "border-background/30"
                } hover:scale-105`}
                style={{
                  width: `${Math.max(array.length <= 7 ? 52 : 40, 35)}px`,
                  height: `${getBarHeight(value)}px`,
                  backgroundColor: getBarColor(index, value),
                }}
              >
                <span className="pb-2 text-sm font-bold">{value}</span>
              </div>

              <div className="h-12 mt-2 flex flex-col items-center justify-center">
                {pivotIndex === index && (
                  <div className="text-background-600 font-bold">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-background-600 text-background px-1 rounded">
                      P
                    </div>
                  </div>
                )}
                {pointerI === index && pivotIndex !== index && (
                  <div className="text-background-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-background-600 text-background px-1 rounded">
                      i
                    </div>
                  </div>
                )}
                {pointerJ === index && pivotIndex !== index && (
                  <div className="text-background-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-background-600 text-background px-1 rounded">
                      j
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={quickSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-600 hover:from-background-700 hover:to-background-700 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          {isSorting ? "Sorting..." : "Start Sort"}
        </button>

        <button
          onClick={resetArray}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Reset
        </button>
      </div>

      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How QuickSort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          QuickSort is a divide-and-conquer algorithm that selects a
          &rsquo;pivot&rsquo; element and partitions the array around it.
          Elements smaller than the pivot go to the left, larger elements go to
          the right.
        </p>
        <p className="text-background-600 text-sm">
          <strong>Time Complexity:</strong> Average O(n log n), Worst case O(n²)
          •<strong> Space Complexity:</strong> O(log n) •
          <strong> In-place:</strong> Yes •<strong> Stable:</strong> No
        </p>
      </div>
    </div>
  );
}
