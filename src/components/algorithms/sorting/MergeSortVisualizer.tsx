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
    const hue = (value * 3.6 + index * 20) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 250;
    const normalizedValue = value / 99;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Merge Sort Visualizer
        </h2>
        <p className="text-slate-600">
          Watch how merge sort divides and conquers!
        </p>
      </div>

      <div className="bg-white rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-blue-500">
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
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {dividingRange && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
                  ? "border-t-4 border-red-500 pt-2 bg-red-50 rounded-t-lg"
                  : ""
              }`}
              key={`${index}-${value}`}
            >
              <div
                className={`rounded-lg flex items-end justify-center text-white font-bold shadow-lg transform transition-all duration-300 border-2 ${
                  isComparing
                    ? "ring-4 ring-yellow-400 scale-110 border-yellow-300"
                    : "border-white/30"
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
                  <div className="text-red-600 font-bold animate-bounce">
                    <div className="text-lg">↑</div>
                    <div className="text-xs bg-red-600 text-white px-1 rounded">
                      i
                    </div>
                  </div>
                )}
                {pointerJ === index && (
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

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={mergeSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 shadow-lg"
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
        <h3 className="font-bold text-slate-800 mb-2">How Merge Sort Works:</h3>
        <p className="text-slate-600 text-sm">
          Merge sort is a divide-and-conquer algorithm that splits the array
          into smaller subarrays, sorts them recursively, and then merges them
          back together. It has a time complexity of O(n log n) and is stable,
          meaning equal elements maintain their relative order.
        </p>
      </div>
    </div>
  );
}
