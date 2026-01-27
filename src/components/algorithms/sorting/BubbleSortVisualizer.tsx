import BubbleSortDesc from "@/components/descriptions/BubbleSortDesc";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BubbleSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90],
  );
  const [isSorting, setIsSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [speed, setSpeed] = useState(600);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [pointerI, setPointerI] = useState<number | null>(null);
  const [pointerJ, setPointerJ] = useState<number | null>(null);
  const [sortedElements, setSortedElements] = useState<Set<number>>(new Set());

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting Bubble Sort...");
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
      setCurrentStep(
        `Pass ${i + 1}: Bubbling largest unsorted element to position ${
          len - 1 - i
        }`,
      );
      await sleep(speed);

      let swapped = false;

      for (let j = 0; j < len - i - 1; j++) {
        setPointerI(j);
        setPointerJ(j + 1);

        setCurrentStep(
          `Pass ${i + 1}: Comparing elements at positions ${j} and ${j + 1} (${
            arr[j]
          } vs ${arr[j + 1]})`,
        );
        totalComparisons++;
        setComparisons(totalComparisons);

        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setCurrentStep(
            `Pass ${i + 1}: Swapping ${arr[j]} and ${arr[j + 1]} (${arr[j]} > ${
              arr[j + 1]
            })`,
          );

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          totalSwaps++;
          setSwaps(totalSwaps);
          swapped = true;

          await sleep(speed);
        } else {
          setCurrentStep(
            `Pass ${i + 1}: No swap needed (${arr[j]} ≤ ${arr[j + 1]})`,
          );
          await sleep(speed / 2);
        }
      }

      setSortedElements((prev) => new Set([...prev, len - i - 1]));
      setCurrentStep(
        `Pass ${i + 1} completed: Element ${
          arr[len - i - 1]
        } is now in its final position`,
      );
      await sleep(speed);

      if (!swapped) {
        setCurrentStep("No swaps in this pass - array is already sorted!");
        const newSorted = new Set<number>();
        for (let k = 0; k < len; k++) {
          newSorted.add(k);
        }
        setSortedElements(newSorted);
        await sleep(speed);
        break;
      }
    }

    setSortedElements((prev) => new Set([...prev, 0]));

    setPointerI(null);
    setPointerJ(null);
    setCurrentStep(
      `Bubble Sort completed! Array sorted in ${currentPass} passes with ${totalComparisons} comparisons and ${totalSwaps} swaps.`,
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
    setSwaps(0);
    setCurrentPass(0);
    setPointerI(null);
    setPointerJ(null);
    setSortedElements(new Set());
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
    const maxValue = Math.max(...array, 100);
    const normalizedValue = value / maxValue;
    return Math.max(minHeight, normalizedValue * maxHeight);
  };

  const getBarColor = (index: number, value: number) => {
    const primaryColors = [
      "--primary-400",
      "--primary-500",
      "--primary-600",
      "--primary-700",
      "--primary-800",
    ];
    const secondaryColors = [
      "--secondary-400",
      "--secondary-500",
      "--secondary-600",
      "--secondary-700",
      "--secondary-800",
    ];
    const accentColors = [
      "--accent-400",
      "--accent-500",
      "--accent-600",
      "--accent-700",
      "--accent-800",
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
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-background-100 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-background-950">
          Bubble Sort Visualizer
        </h2>
        <p className="text-background-600 ">
          Watch how Bubble Sort compares adjacent elements and bubbles larger
          values to the end!
        </p>
      </div>

      <div className="flex gap-6 bg-background-50 rounded-lg px-6 py-3 shadow-md">
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

      <div className="bg-background-50 rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center ">
        <p className="text-text-700 font-medium text-center">
          {currentStep || "Click 'Start Sort' to begin visualization"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center bg-background p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-text-700">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="px-3 py-1 text-sm focus:outline-none"
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
          <label className="text-sm font-medium text-text-700">
            Array Size:
          </label>
          {array.length}
        </div>
      </div>

      <div className="bg-gradient-to-b from-background-300 to-transparent rounded-xl p-6 w-full">
        <h3 className="text-lg font-bold text-text-50 mb-4 text-center">
          Current Array {isSorting && `(Pass ${currentPass})`}
        </h3>
        <div className="flex gap-2 w-full items-end justify-center overflow-x-auto overflow-auto min-h-[250px] relative">
          {array.map((value, index) => {
            const isPointer = pointerI === index || pointerJ === index;
            const isSorted = sortedElements.has(index);

            return (
              <div
                data-testid="array-bar"
                className="flex flex-col items-center transition-all duration-300"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-text-50 font-bold transform transition-all duration-300 border-2 hover:scale-105`}
                  style={{
                    width: Math.max(array.length <= 10 ? 50 : 40, 35),
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    boxShadow: isPointer
                      ? "0 4px 5px background"
                      : isSorted
                        ? "0 4px 5px background-400"
                        : "0 4px 5px primary",
                  }}
                >
                  <div className="pb-2 text-center">
                    <div className="text-sm text-text-950 font-bold">
                      {value}
                    </div>
                  </div>
                </div>

                <div className="h-12 mt-2 flex flex-col items-center justify-center">
                  <div className="text-xs text-text-900 font-medium mb-1">
                    {index}
                  </div>
                  {pointerI === index && (
                    <div className="text-xs text-text-500 font-bold">
                      <div>↑</div>
                      <div>i</div>
                    </div>
                  )}
                  {pointerJ === index && (
                    <div className="text-xs text-text-950 font-bold">
                      <div>↑</div>
                      <div>j</div>
                    </div>
                  )}
                  {isSorted && (
                    <div className="text-xs text-text-900 font-bold">✓</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isSorting && (
        <div className="bg-background rounded-lg p-4 shadow-md w-full max-w-2xl">
          <h4 className="font-bold text-text-800 mb-3 text-center">
            Pass Progress
          </h4>
          <div className="flex justify-center gap-2">
            {Array.from({ length: array.length - 1 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < currentPass
                    ? "bg-background-500 text-text-900"
                    : i === currentPass - 1
                      ? "bg-background-500 text-text-900 animate-pulse"
                      : "bg-background-200 text-text-500"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-text-900 mt-2">
            {currentPass > 0
              ? `Completed ${currentPass - 1} pass${
                  currentPass - 1 !== 1 ? "es" : ""
                }`
              : "Ready to start"}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        <Button
          onClick={bubbleSort}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:cursor-pointer hover:bg-primary/70 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          {isSorting ? "Sorting..." : "Start Sort"}
        </Button>

        <Button
          onClick={resetArray}
          disabled={isSorting}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary hover:cursor-pointer hover:bg-secondary/70 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Reset
        </Button>
      </div>

      <div>
        <BubbleSortDesc />
      </div>
    </div>
  );
}
