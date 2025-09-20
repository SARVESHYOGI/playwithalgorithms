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

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
    const maxValue = Math.max(...array, 100);
    const normalizedValue = value / maxValue;
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
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-background-100 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800">
          Insertion Sort Visualizer
        </h2>
        <p className="text-background-600">
          Watch how Insertion Sort builds a sorted array one element at a time
          by inserting each element into its correct position!
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
          <div className="text-2xl font-bold text-background-600">{shifts}</div>
          <div className="text-sm text-background-600">Shifts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {currentPass}
          </div>
          <div className="text-sm text-background-600">Current Pass</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {sortedElements.size}
          </div>
          <div className="text-sm text-background-600">Elements Sorted</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center ">
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
      </div>

      <div className="bg-gradient-to-b from-background-950 to-transparent  rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
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
                  className={`rounded-lg flex items-end justify-center text-background font-bold shadow-lg transform transition-all duration-300 border-2 ${getBarBorder(
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
                  <div className="text-xs text-background-600 font-medium mb-1">
                    {index}
                  </div>
                  {currentKey === index && (
                    <div className="text-xs text-background-600 font-bold">
                      <div>↑</div>
                      <div>key</div>
                    </div>
                  )}
                  {currentPosition === index && (
                    <div className="text-xs text-background-500 font-bold">
                      <div>↑</div>
                      <div>j</div>
                    </div>
                  )}
                  {isSorted && (
                    <div className="text-xs text-background-600 font-bold">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isSorting && (
        <div className="bg-background rounded-lg p-4 shadow-md w-full max-w-2xl">
          <h4 className="font-bold text-background-800 mb-3 text-center">
            Pass Progress
          </h4>
          <div className="flex justify-center gap-2">
            {Array.from({ length: array.length - 1 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < currentPass
                    ? "bg-background-500 text-background"
                    : i === currentPass - 1
                    ? "bg-background-500 text-background animate-pulse"
                    : "bg-background-200 text-background-500"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-background-600 mt-2">
            {currentPass > 0
              ? `Completed ${currentPass - 1} pass${
                  currentPass - 1 !== 1 ? "es" : ""
                }`
              : "Ready to start"}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={insertionSort}
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
          How Insertion Sort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Insertion Sort builds a sorted array one element at a time by taking
          each element from the unsorted portion and inserting it into its
          correct position within the already sorted portion. Its like sorting
          playing cards in your hand.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Start with second element as key • 2)
          Compare key with sorted elements • 3) Shift larger elements right • 4)
          Insert key at correct position
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
