import { useState } from "react";

export default function BucketSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90]
  );
  const [isSorting, setIsSorting] = useState(false);
  const [buckets, setBuckets] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);
  const [numBuckets, setNumBuckets] = useState(5);
  const [highlightedElement, setHighlightedElement] = useState<number | null>(
    null
  );
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(
    null
  );
  const [sortingBucket, setSortingBucket] = useState<number | null>(null);
  const [showBuckets, setShowBuckets] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<
    "distributing" | "sorting" | "collecting" | "idle"
  >("idle");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bucketSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting Bucket Sort...");

    const arr = [...array];
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);
    const range = maxValue - minValue + 1;
    const bucketSize = Math.ceil(range / numBuckets);

    setCurrentStep(
      `Range: ${minValue} to ${maxValue}, Bucket size: ${bucketSize}`
    );
    await sleep(speed);

    const bucketArray: number[][] = Array.from(
      { length: numBuckets },
      () => []
    );
    setBuckets([...bucketArray]);

    setCurrentPhase("distributing");
    setCurrentStep(
      "Phase 1: Distributing elements into buckets based on value ranges"
    );
    await sleep(speed);

    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      const bucketIndex = Math.min(
        Math.floor((value - minValue) / bucketSize),
        numBuckets - 1
      );

      setHighlightedElement(i);
      setHighlightedBucket(bucketIndex);

      const rangeStart = minValue + bucketIndex * bucketSize;
      const rangeEnd = rangeStart + bucketSize - 1;
      setCurrentStep(
        `Element ${value}: fits in bucket ${bucketIndex} (range ${rangeStart}-${rangeEnd})`
      );

      bucketArray[bucketIndex].push(value);
      setBuckets([...bucketArray]);
      await sleep(speed);
    }

    setHighlightedElement(null);
    setHighlightedBucket(null);
    setCurrentStep("All elements distributed into buckets");
    await sleep(speed);

    setCurrentPhase("sorting");
    setCurrentStep("Phase 2: Sorting individual buckets using insertion sort");
    await sleep(speed);

    for (let bucketIndex = 0; bucketIndex < bucketArray.length; bucketIndex++) {
      const bucket = bucketArray[bucketIndex];
      if (bucket.length <= 1) continue;

      setSortingBucket(bucketIndex);
      setCurrentStep(
        `Sorting bucket ${bucketIndex} with ${bucket.length} elements`
      );
      await sleep(speed);

      for (let i = 1; i < bucket.length; i++) {
        const key = bucket[i];
        let j = i - 1;

        setCurrentStep(
          `Sorting bucket ${bucketIndex}: comparing ${key} with previous elements`
        );
        await sleep(speed / 2);

        while (j >= 0 && bucket[j] > key) {
          bucket[j + 1] = bucket[j];
          j--;
          setBuckets([...bucketArray]);
          await sleep(speed / 3);
        }

        bucket[j + 1] = key;
        setBuckets([...bucketArray]);
        await sleep(speed / 2);
      }

      setCurrentStep(`Bucket ${bucketIndex} sorted: [${bucket.join(", ")}]`);
      await sleep(speed);
    }

    setSortingBucket(null);
    setCurrentStep("All buckets sorted individually");
    await sleep(speed);

    setCurrentPhase("collecting");
    setCurrentStep("Phase 3: Collecting elements from buckets in order");
    await sleep(speed);

    let index = 0;
    for (let bucketIndex = 0; bucketIndex < bucketArray.length; bucketIndex++) {
      const bucket = bucketArray[bucketIndex];

      if (bucket.length > 0) {
        setHighlightedBucket(bucketIndex);
        setCurrentStep(
          `Collecting ${bucket.length} element(s) from bucket ${bucketIndex}`
        );
        await sleep(speed);
      }

      for (let j = 0; j < bucket.length; j++) {
        arr[index] = bucket[j];
        setHighlightedElement(index);
        setArray([...arr]);
        index++;
        await sleep(speed / 2);
      }
    }

    setHighlightedBucket(null);
    setHighlightedElement(null);
    setCurrentPhase("idle");
    setCurrentStep("Bucket Sort completed! Array is now sorted.");
    await sleep(1000);
    setCurrentStep("");
    setBuckets([]);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setHighlightedElement(null);
    setHighlightedBucket(null);
    setSortingBucket(null);
    setBuckets([]);
    setCurrentPhase("idle");
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
    if (highlightedElement === index) return "#ef4444";
    return getColor(value, index);
  };

  const getBucketColor = (bucketIndex: number) => {
    if (sortingBucket === bucketIndex)
      return "bg-green-100 border-green-400 ring-2 ring-green-300";
    if (highlightedBucket === bucketIndex) return "bg-red-100 border-red-400";
    return "bg-blue-50 border-blue-200";
  };

  const getBucketRange = (bucketIndex: number) => {
    const minValue = Math.min(...array);
    const maxValue = Math.max(...array);
    const range = maxValue - minValue + 1;
    const bucketSize = Math.ceil(range / numBuckets);
    const start = minValue + bucketIndex * bucketSize;
    const end = Math.min(start + bucketSize - 1, maxValue);
    return `${start}-${end}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Bucket Sort Visualizer
        </h2>
        <p className="text-slate-600">
          Watch how Bucket Sort distributes elements into value-based buckets
          and sorts them!
        </p>
      </div>

      <div className="flex gap-6 bg-white rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{numBuckets}</div>
          <div className="text-sm text-slate-600">Buckets</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-600">{array.length}</div>
          <div className="text-sm text-slate-600">Elements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {currentPhase === "idle"
              ? "Ready"
              : currentPhase === "distributing"
              ? "Distributing"
              : currentPhase === "sorting"
              ? "Sorting"
              : "Collecting"}
          </div>
          <div className="text-sm text-slate-600">Phase</div>
        </div>
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

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Buckets:</label>
          <select
            value={numBuckets}
            onChange={(e) => setNumBuckets(Number(e.target.value))}
            disabled={isSorting}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showBuckets"
            checked={showBuckets}
            onChange={(e) => setShowBuckets(e.target.checked)}
            className="rounded focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="showBuckets"
            className="text-sm font-medium text-slate-700"
          >
            Show Buckets
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
          Current Array
        </h3>
        <div className="flex gap-2 w-full items-end justify-center overflow-x-auto min-h-[250px] relative">
          {array.map((value, index) => {
            const isHighlighted = highlightedElement === index;

            return (
              <div
                className="flex flex-col items-center transition-all duration-300"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-white font-bold shadow-lg transform transition-all duration-300 border-2 ${
                    isHighlighted
                      ? "ring-4 ring-red-400 scale-110 border-red-300 animate-pulse"
                      : "border-white/30"
                  } hover:scale-105`}
                  style={{
                    width: Math.max(array.length <= 10 ? 50 : 40, 35),
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isHighlighted
                      ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="pb-2 text-center">
                    <div className="text-sm font-bold drop-shadow-sm">
                      {value}
                    </div>
                  </div>
                </div>
                <div className="h-8 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-slate-600 font-medium">
                    {index}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showBuckets && buckets.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md w-full">
          <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
            Value-Based Buckets
          </h3>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${Math.min(numBuckets, 4)}, 1fr)`,
            }}
          >
            {buckets.map((bucket, bucketIndex) => (
              <div
                key={bucketIndex}
                className={`border-2 rounded-lg p-4 min-h-[120px] transition-all duration-300 ${getBucketColor(
                  bucketIndex
                )}`}
              >
                <div className="text-center mb-3">
                  <div className="font-bold text-sm text-slate-700">
                    Bucket {bucketIndex}
                  </div>
                  <div className="text-xs text-slate-500">
                    Range: {getBucketRange(bucketIndex)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {bucket.map((value, valueIndex) => (
                    <div
                      key={`${bucketIndex}-${valueIndex}-${value}`}
                      className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-center shadow-sm transition-all duration-200"
                      style={{
                        backgroundColor: getColor(value, valueIndex),
                        color: "white",
                      }}
                    >
                      {value}
                    </div>
                  ))}
                </div>
                {bucket.length === 0 && (
                  <div className="text-center text-slate-400 text-xs mt-4">
                    Empty
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-sm bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Current Element</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
          <span>Target Bucket</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
          <span>Sorting Bucket</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={bucketSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-105 active:scale-95 shadow-lg"
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
        <h3 className="font-bold text-slate-800 mb-2">
          How Bucket Sort Works:
        </h3>
        <p className="text-slate-600 text-sm mb-2">
          Bucket Sort distributes elements into a fixed number of buckets based
          on their value ranges. Each bucket is then sorted individually
          (usually with insertion sort), and finally all elements are collected
          from the buckets in order to produce the sorted array.
        </p>
        <div className="text-slate-600 text-sm">
          <strong>Steps:</strong> 1) Create buckets for value ranges • 2)
          Distribute elements into appropriate buckets • 3) Sort each bucket
          individually • 4) Collect elements from buckets in order
        </div>
        <div className="text-slate-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n + k), Average case O(n
          + k), Worst case O(n²) where k is the number of buckets
        </div>
      </div>
    </div>
  );
}
