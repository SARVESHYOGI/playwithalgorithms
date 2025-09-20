import { useState } from "react";

export default function MergeSortVisualizer({
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
  const [dividingRange, setDividingRange] = useState<[number, number] | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const mergeSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting merge sort...");
    const arr = [...array];
    const len = arr.length;

    await mergeSortHelper(arr, 0, len - 1);
    setPointerI(null);
    setPointerJ(null);
    setDividingRange(null);
    setCurrentStep("Sorting complete!");
    await sleep(1000);
    setCurrentStep("");
    setIsSorting(false);
  };

  const mergeSortHelper = async (
    arr: number[],
    left: number,
    right: number
  ) => {
    if (left >= right) return;

    setDividingRange([left, right]);
    setCurrentStep(`Dividing array from index ${left} to ${right}`);
    await sleep(speed);

    const mid = Math.floor((left + right) / 2);
    setCurrentStep(`Splitting at index ${mid}`);
    await sleep(speed);

    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);

    setCurrentStep(
      `Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`
    );
    await merge(arr, left, mid, right);
  };

  const merge = async (
    arr: number[],
    left: number,
    mid: number,
    right: number
  ) => {
    const merged = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      setPointerI(i);
      setPointerJ(j);
      setCurrentStep(`Comparing ${arr[i]} and ${arr[j]}`);
      await sleep(speed);

      if (arr[i] <= arr[j]) {
        merged.push(arr[i]);
        setCurrentStep(`${arr[i]} is smaller, adding to merged array`);
        i++;
      } else {
        merged.push(arr[j]);
        setCurrentStep(`${arr[j]} is smaller, adding to merged array`);
        j++;
      }
      await sleep(speed / 2);
    }

    while (i <= mid) {
      merged.push(arr[i]);
      i++;
    }
    while (j <= right) {
      merged.push(arr[j]);
      j++;
    }

    for (let k = left; k <= right; k++) {
      arr[k] = merged[k - left];
    }

    setArray([...arr]);
    setCurrentStep(`Merged subarray from ${left} to ${right}`);
    await sleep(speed);
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    setCurrentStep("");
    setPointerI(null);
    setPointerJ(null);
    setDividingRange(null);
  };

  const getColor = (value: number, index: number) => {
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
  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 250;
    const normalizedValue = value / 99;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto   bg-background-100 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800">
          Merge Sort Visualizer
        </h2>
        <p className="text-background-600">
          Watch how merge sort divides and conquers!
        </p>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center">
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
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
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

      <div className="flex gap-2 items-end justify-center overflow-x-auto p-6   min-h-[350px] relative bg-gradient-to-b from-background-950 to-transparent  rounded-xl w-full">
        {dividingRange && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-background-500 text-background px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            Dividing: {dividingRange[0]} - {dividingRange[1]}
          </div>
        )}

        {array.map((value, index) => {
          const isDividing =
            dividingRange &&
            index >= dividingRange[0] &&
            index <= dividingRange[1];
          const isComparing = pointerI === index || pointerJ === index;

          return (
            <div
              className={`flex flex-col items-center transition-all duration-300 ${
                isDividing
                  ? "border-t-4 borderbackground-500 pt-2 bgbackground-50 rounded-t-lg"
                  : ""
              }`}
              key={`${index}-${value}`}
            >
              <div
                className={`rounded-lg flex items-end justify-center text-background font-bold shadow-lg transform transition-all duration-300 border-2 ${
                  isComparing
                    ? "ring-4 ring-background-400 scale-110 border-background-300"
                    : "border-background/30"
                } hover:scale-105`}
                style={{
                  width: `${Math.max(array.length <= 7 ? 52 : 40, 35)}px`,
                  height: `${getBarHeight(value)}px`,
                  backgroundColor: getColor(value, index),
                  boxShadow: isComparing
                    ? "0 8px 25px rgba(255, 193, 7, 0.4)"
                    : "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <span className="pb-2 text-sm font-bold drop-shadow-sm">
                  {value}
                </span>
              </div>

              <div className="h-12 mt-2 flex flex-col items-center justify-center">
                {pointerI === index && (
                  <div className="text-background-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-background-600 text-background px-1 rounded">
                      i
                    </div>
                  </div>
                )}
                {pointerJ === index && (
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
          onClick={mergeSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
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
          How Merge Sort Works:
        </h3>
        <p className="text-background-600 text-sm">
          Merge sort is a divide-and-conquer algorithm that splits the array
          into smaller subarrays, sorts them recursively, and then merges them
          back together. It has a time complexity of O(n log n) and is stable,
          meaning equal elements maintain their relative order.
        </p>
      </div>
    </div>
  );
}
