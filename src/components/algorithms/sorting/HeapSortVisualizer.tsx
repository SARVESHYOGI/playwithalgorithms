import { useState } from "react";

export default function HeapSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90]
  );
  const [isSorting, setIsSorting] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [comparingNodes, setComparingNodes] = useState<number[]>([]);
  const [heapSize, setHeapSize] = useState<number | null>(null);
  const [sortedPortion, setSortedPortion] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [phase, setPhase] = useState<"building" | "sorting" | "idle">("idle");
  const [speed, setSpeed] = useState(800);
  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [showTree, setShowTree] = useState(true);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const heapSort = async () => {
    if (array.length <= 1) return;

    setIsSorting(true);
    setCurrentStep("Starting HeapSort...");
    setSwaps(0);
    setComparisons(0);
    setSortedPortion([]);
    const arr = [...array];
    const n = arr.length;
    setHeapSize(n);

    setPhase("building");
    setCurrentStep("Building max heap...");
    await sleep(speed);

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i, true);
    }

    setCurrentStep("Max heap built! Now extracting elements...");
    await sleep(speed);

    setPhase("sorting");
    for (let i = n - 1; i > 0; i--) {
      setCurrentStep(`Extracting maximum element (${arr[0]}) to position ${i}`);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSortedPortion((prev) => [...prev, i]);
      setSwaps((prev) => prev + 1);
      await sleep(speed);

      setHeapSize(i);
      await heapify(arr, i, 0, false);
    }

    setCurrentNode(null);
    setComparingNodes([]);
    setHeapSize(null);
    setSortedPortion([]);
    setPhase("idle");
    setCurrentStep("HeapSort complete!");
    await sleep(1000);
    setCurrentStep("");
    setIsSorting(false);
  };

  const heapify = async (
    arr: number[],
    n: number,
    rootIdx: number,
    isBuilding: boolean
  ) => {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    setCurrentNode(rootIdx);
    setCurrentStep(
      isBuilding
        ? `Heapifying subtree rooted at index ${rootIdx} (value: ${arr[rootIdx]})`
        : `Heapifying root after extraction`
    );
    await sleep(speed);

    if (left < n) {
      setComparingNodes([rootIdx, left]);
      setComparisons((prev) => prev + 1);
      setCurrentStep(`Comparing ${arr[rootIdx]} with left child ${arr[left]}`);
      await sleep(speed);

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      setComparingNodes([largest, right]);
      setComparisons((prev) => prev + 1);
      setCurrentStep(
        `Comparing ${arr[largest]} with right child ${arr[right]}`
      );
      await sleep(speed);

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIdx) {
      setCurrentStep(`Swapping ${arr[rootIdx]} with ${arr[largest]}`);
      setComparingNodes([rootIdx, largest]);
      await sleep(speed);

      [arr[rootIdx], arr[largest]] = [arr[largest], arr[rootIdx]];
      setArray([...arr]);
      setSwaps((prev) => prev + 1);
      await sleep(speed);

      await heapify(arr, n, largest, isBuilding);
    }

    setComparingNodes([]);
  };

  const resetArray = () => {
    if (isSorting) return;
    setArray(initialArray || [64, 34, 25, 12, 22, 11, 90]);
    resetVisualization();
  };

  const resetVisualization = () => {
    setCurrentStep("");
    setSwaps(0);
    setComparisons(0);
    setCurrentNode(null);
    setComparingNodes([]);
    setHeapSize(null);
    setSortedPortion([]);
    setPhase("idle");
  };

  const getBarHeight = (value: number) => {
    const minHeight = 40;
    const maxHeight = 200;
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

  const getTreePosition = (
    index: number,
    level: number,
    positionInLevel: number
  ) => {
    const totalWidth = 600;
    const levelHeight = 80;
    const nodesInLevel = Math.pow(2, level);
    const nodeWidth = totalWidth / (nodesInLevel + 1);

    return {
      x: nodeWidth * (positionInLevel + 1),
      y: level * levelHeight + 50,
    };
  };

  const TreeNode = ({
    index,
    value,
    level,
    positionInLevel,
  }: {
    index: number;
    value: number;
    level: number;
    positionInLevel: number;
  }) => {
    const pos = getTreePosition(index, level, positionInLevel);
    const isActive = currentNode === index;
    const isComparing = comparingNodes.includes(index);
    const isSorted = sortedPortion.includes(index);
    const isOutOfHeap = heapSize !== null && index >= heapSize;

    return (
      <g key={index}>
        {2 * index + 1 < array.length && (
          <line
            x1={pos.x}
            y1={pos.y + 20}
            x2={
              getTreePosition(2 * index + 1, level + 1, positionInLevel * 2).x
            }
            y2={
              getTreePosition(2 * index + 1, level + 1, positionInLevel * 2).y -
              20
            }
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}
        {2 * index + 2 < array.length && (
          <line
            x1={pos.x}
            y1={pos.y + 20}
            x2={
              getTreePosition(2 * index + 2, level + 1, positionInLevel * 2 + 1)
                .x
            }
            y2={
              getTreePosition(2 * index + 2, level + 1, positionInLevel * 2 + 1)
                .y - 20
            }
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}

        <circle
          cx={pos.x}
          cy={pos.y}
          r="20"
          fill={getBarColor(index, value)}
          stroke={isActive || isComparing ? "#fbbf24" : "#ffffff"}
          strokeWidth={isActive || isComparing ? "3" : "2"}
          className={isActive ? "animate-pulse" : ""}
        />

        <text
          x={pos.x}
          y={pos.y + 5}
          textAnchor="middle"
          fill="background"
          fontSize="14"
          fontWeight="bold"
        >
          {value}
        </text>

        <text
          x={pos.x}
          y={pos.y + 35}
          textAnchor="middle"
          fill="#64748b"
          fontSize="10"
        >
          {index}
        </text>
      </g>
    );
  };

  const renderTree = () => {
    const nodes = [];
    let currentLevel = 0;
    let currentLevelStart = 0;
    let nextLevelStart = 1;

    for (let i = 0; i < array.length; i++) {
      if (i === nextLevelStart) {
        currentLevel++;
        currentLevelStart = nextLevelStart;
        nextLevelStart = currentLevelStart + Math.pow(2, currentLevel);
      }

      const positionInLevel = i - currentLevelStart;
      nodes.push(
        <TreeNode
          key={i}
          index={i}
          value={array[i]}
          level={currentLevel}
          positionInLevel={positionInLevel}
        />
      );
    }

    return nodes;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-7xl mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 ">
          HeapSort Visualizer
        </h2>
        <p className="text-background-600">
          Watch the heap property in action!
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
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {phase === "building"
              ? "Building"
              : phase === "sorting"
              ? "Sorting"
              : "Ready"}
          </div>
          <div className="text-sm text-background-600">Phase</div>
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
            <option value={800} className="bg-background">
              Medium
            </option>
            <option value={400} className="bg-background">
              Fast
            </option>
            <option value={150} className="bg-background">
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
            id="showTree"
            checked={showTree}
            onChange={(e) => setShowTree(e.target.checked)}
            className="rounded focus:ring-2 focus:ring-background-500"
          />
          <label
            htmlFor="showTree"
            className="text-sm font-medium text-background-700"
          >
            Show Tree View
          </label>
        </div>
      </div>

      {showTree && array.length <= 15 && (
        <div className="bg-background rounded-xl p-6 shadow-md w-full">
          <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
            Heap Tree Structure
          </h3>
          <div className="flex justify-center">
            <svg
              width="650"
              height={Math.ceil(Math.log2(array.length + 1)) * 80 + 100}
              className="overflow-visible"
            >
              {renderTree()}
            </svg>
          </div>
        </div>
      )}

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Array Representation
        </h3>
        <div className="flex gap-2 w-full items-end justify-center overflow-x-auto min-h-[250px]">
          {heapSize !== null && (
            <div className="  bg-background-background-500 text-background px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              Heap Size: {heapSize}
            </div>
          )}

          {array.map((value, index) => {
            const isSorted = sortedPortion.includes(index);
            const isActive = currentNode === index;
            const isComparing = comparingNodes.includes(index);
            const isOutOfHeap = heapSize !== null && index >= heapSize;

            return (
              <div
                className="flex flex-col items-center transition-all duration-300"
                key={`${index}-${value}`}
              >
                <div
                  className={`rounded-lg flex items-end justify-center text-background font-bold shadow-lg transform transition-all duration-300 border-2 ${
                    isActive
                      ? "ring-4 ring-red-background-400 scale-110 border-red-background-300 animate-pulse"
                      : isComparing
                      ? "ring-4 ring-yellow-background-400 scale-105 border-yellow-background-300"
                      : isSorted
                      ? "ring-2 ring-background-background-400 border-background-background-300"
                      : "border-background/30"
                  } hover:scale-105`}
                  style={{
                    width: Math.max(array.length <= 7 ? 50 : 40, 35),
                    height: `${getBarHeight(value)}px`,
                    backgroundColor: getBarColor(index, value),
                    opacity: isOutOfHeap ? 0.5 : 1,
                  }}
                >
                  <span className="pb-2 text-sm font-bold drop-shadow-sm">
                    {value}
                  </span>
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

      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={heapSort}
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
          How HeapSort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          HeapSort is a comparison-based sorting algorithm that uses a binary
          heap data structure. It first builds a max heap, then repeatedly
          extracts the maximum element and places it at the end.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Phase 1:</strong> Build max heap (heapify from bottom-up) •
          <strong> Phase 2:</strong> Extract max elements one by one
        </div>
        <p className="text-background-600 text-sm mt-1">
          <strong>Time Complexity:</strong> O(n log n) always •
          <strong> Space Complexity:</strong> O(1) •<strong> In-place:</strong>{" "}
          Yes •<strong> Stable:</strong> No
        </p>
      </div>
    </div>
  );
}
