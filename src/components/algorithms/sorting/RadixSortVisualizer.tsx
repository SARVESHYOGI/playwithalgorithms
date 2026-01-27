import RadixSortDesc from "@/components/descriptions/sorting/RadixSortDesc";
import { accentColors, primaryColors, secondaryColors } from "@/lib/data";
import { useState } from "react";

export default function RadixSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90],
  );
  const [isSorting, setIsSorting] = useState(false);
  const [currentDigit, setCurrentDigit] = useState<number>(0);
  const [buckets, setBuckets] = useState<number[][]>(
    Array.from({ length: 10 }, () => []),
  );
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);
  const [arraySize, setArraySize] = useState(7);
  const [iterations, setIterations] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<number | null>(
    null,
  );
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(
    null,
  );
  const [showBuckets, setShowBuckets] = useState(true);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getDigit = (num: number, place: number): number => {
    return Math.floor(num / Math.pow(10, place)) % 10;
  };

  const getMaxDigits = (nums: number[]): number => {
    return Math.max(...nums).toString().length;
  };

  const radixSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting Radix Sort...");
    setIterations(0);

    const arr = [...array];
    const maxDigits = getMaxDigits(arr);
    setCurrentStep(`Maximum number of digits: ${maxDigits}`);
    await sleep(speed);

    for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
      setCurrentDigit(digitPlace);
      setIterations((prev) => prev + 1);

      const digitName =
        ["ones", "tens", "hundreds", "thousands"][digitPlace] ||
        `10^${digitPlace}`;
      setCurrentStep(`Sorting by ${digitName} place (digit ${digitPlace + 1})`);
      await sleep(speed);

      const newBuckets: number[][] = Array.from({ length: 10 }, () => []);
      setBuckets(newBuckets);
      await sleep(speed / 2);

      setCurrentStep(
        `Distributing numbers into buckets based on ${digitName} digit`,
      );
      for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        const digit = getDigit(num, digitPlace);

        setHighlightedElement(i);
        setHighlightedBucket(digit);
        setCurrentStep(
          `Number ${num}: ${digitName} digit is ${digit}, placing in bucket ${digit}`,
        );

        newBuckets[digit].push(num);
        setBuckets([...newBuckets]);
        await sleep(speed);
      }

      setHighlightedElement(null);
      setHighlightedBucket(null);
      setCurrentStep(
        `All numbers distributed. Collecting from buckets in order...`,
      );
      await sleep(speed);

      let index = 0;
      for (let bucketIndex = 0; bucketIndex < 10; bucketIndex++) {
        const bucket = newBuckets[bucketIndex];
        if (bucket.length > 0) {
          setHighlightedBucket(bucketIndex);
          setCurrentStep(
            `Collecting ${bucket.length} number(s) from bucket ${bucketIndex}`,
          );
          await sleep(speed);
        }

        for (let j = 0; j < bucket.length; j++) {
          arr[index] = bucket[j];
          setHighlightedElement(index);
          index++;
          setArray([...arr]);
          await sleep(speed / 2);
        }
      }

      setHighlightedBucket(null);
      setHighlightedElement(null);

      setBuckets(Array.from({ length: 10 }, () => []));
      setCurrentStep(
        `Completed sorting by ${digitName} place. Array after iteration ${
          digitPlace + 1
        }`,
      );
      await sleep(speed);
    }

    setCurrentStep("Radix Sort completed! Array is now sorted.");
    await sleep(1000);
    setCurrentStep("");
    setCurrentDigit(0);
    setIterations(0);
    setIsSorting(false);
  };

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 999) + 1,
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
    setCurrentDigit(0);
    setIterations(0);
    setHighlightedElement(null);
    setHighlightedBucket(null);
    setBuckets(Array.from({ length: 10 }, () => []));
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
    const maxValue = Math.max(...array);
    const normalizedValue = value / maxValue;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  const getBarColor = (index: number, value: number) => {
    if (highlightedElement === index) return "#ef4444";
    return getColor(value, index);
  };

  const getColor = (value: number, index: number) => {
    let colorSet = primaryColors;

    if (index % 3 === 1) colorSet = secondaryColors;
    if (index % 3 === 2) colorSet = accentColors;

    const colorIndex = (value + index) % colorSet.length;

    const colorVariable = colorSet[colorIndex];

    return getComputedStyle(document.documentElement)
      .getPropertyValue(colorVariable)
      .trim();
  };

  const getBucketColor = (bucketIndex: number) => {
    if (highlightedBucket === bucketIndex)
      return "bg-background-100 border-background-400";
    return "bg-background-50 border-background-200";
  };

  const getDigitHighlight = (value: number, digitPlace: number) => {
    const valueStr = value.toString().padStart(3, "0");
    const digits = valueStr.split("").reverse();

    return digits
      .map((digit, index) => (
        <span
          key={index}
          className={
            index === digitPlace ? "bg-yellow-300 px-1 rounded font-bold" : ""
          }
        >
          {digit}
        </span>
      ))
      .reverse();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Radix Sort Visualizer
        </h2>
        <p className="text-background-600">
          Watch how Radix Sort uses digit-by-digit sorting!
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {iterations}
          </div>
          <div className="text-sm text-background-600">Iterations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {isSorting ? currentDigit + 1 : 0}
          </div>
          <div className="text-sm text-background-600">Current Digit</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {getMaxDigits(array)}
          </div>
          <div className="text-sm text-background-600">Max Digits</div>
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
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={1200} className="bg-background">
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showBuckets"
            checked={showBuckets}
            onChange={(e) => setShowBuckets(e.target.checked)}
            className="rounded focus:ring-2 focus:ring-background-500"
          />
          <label
            htmlFor="showBuckets"
            className="text-sm font-medium text-background-700"
          >
            Show Buckets
          </label>
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Current Array {isSorting && `(Digit ${currentDigit + 1})`}
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
                  className={`rounded-lg flex items-end justify-center text-background font-bold shadow-lg transform transition-all duration-300 border-2 ${
                    isHighlighted
                      ? "ring-4 ring-red-400 scale-110 border-red-300 animate-pulse"
                      : "border-background/30"
                  } hover:scale-105`}
                  style={{
                    width: `${Math.max(array.length <= 7 ? 52 : 40, 35)}px`,
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isHighlighted
                      ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="pb-2 text-center">
                    <div className="text-sm font-bold drop-shadow-sm">
                      {isSorting && currentStep.includes("Distributing")
                        ? getDigitHighlight(value, currentDigit)
                        : value}
                    </div>
                  </div>
                </div>

                <div className="h-8 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-background-600 font-medium">
                    {index}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showBuckets && (
        <div className="bg-background rounded-xl p-6 shadow-md w-full">
          <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
            Digit Buckets (0-9)
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {buckets.map((bucket, bucketIndex) => (
              <div
                key={bucketIndex}
                className={`border-2 rounded-lg p-3 min-h-[100px] transition-all duration-300 ${getBucketColor(
                  bucketIndex,
                )}`}
              >
                <div className="text-center font-bold text-sm mb-2 text-background-700">
                  {bucketIndex}
                </div>
                <div className="flex flex-col gap-1">
                  {bucket.map((value, valueIndex) => (
                    <div
                      key={`${bucketIndex}-${valueIndex}-${value}`}
                      className="bg-background border border-slate-300 rounded px-2 py-1 text-xs font-medium text-center shadow-sm"
                      style={{ backgroundColor: getColor(value, valueIndex) }}
                    >
                      <span className="text-background font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSorting && (
        <div className="bg-background rounded-lg p-4 shadow-md">
          <h4 className="font-bold text-background-800 mb-2 text-center">
            Current Digit Position:{" "}
            {["Ones", "Tens", "Hundreds", "Thousands"][currentDigit] ||
              `10^${currentDigit}`}
          </h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {array.map((value, index) => (
              <div key={index} className="text-center">
                <div className="font-mono text-lg">
                  {getDigitHighlight(value, currentDigit)}
                </div>
                <div className="text-xs text-background-500">({value})</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={radixSort}
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
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Reset
        </button>
      </div>

      <div>
        <RadixSortDesc />
      </div>
    </div>
  );
}
