import UnorderedSetDesc from "@/components/descriptions/hashing/UnorderedSetDesc";
import { SetEntry } from "@/types";
import { useState } from "react";

export default function UnorderedSetVisualizer() {
  const [unorderedSet, setUnorderedSet] = useState<SetEntry[][]>(
    Array(6)
      .fill(null)
      .map(() => []),
  );
  const [inputValue, setInputValue] = useState<string>("apple");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(1000);
  const [bucketCount, setBucketCount] = useState(6);
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(
    null,
  );
  const [highlightedEntry, setHighlightedEntry] = useState<{
    bucket: number;
    index: number;
  } | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const hashFunction = (value: string): number => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash + value.charCodeAt(i) * 31) % bucketCount;
    }
    return Math.abs(hash);
  };

  const insert = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("insert");

    const bucketIndex = hashFunction(inputValue);
    setCurrentOperation(
      `Computing hash for "${inputValue}": hash("${inputValue}") = ${bucketIndex}`,
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedSet[bucketIndex];
    const existingIndex = bucket.findIndex(
      (entry) => entry.value === inputValue,
    );

    if (existingIndex !== -1) {
      setHighlightedEntry({ bucket: bucketIndex, index: existingIndex });
      setCurrentOperation(
        `Value "${inputValue}" already exists in bucket ${bucketIndex}. Sets don't allow duplicates.`,
      );
      await sleep(speed * 2);
      setLastOperation(`"${inputValue}" already exists - not added`);
    } else {
      setCurrentOperation(`Adding "${inputValue}" to bucket ${bucketIndex}`);
      await sleep(speed);

      const newSet = [...unorderedSet];
      const newEntry: SetEntry = {
        value: inputValue,
        id: `entry-${Date.now()}`,
      };

      newSet[bucketIndex] = [...newSet[bucketIndex], newEntry];
      setUnorderedSet(newSet);
      setHighlightedEntry({
        bucket: bucketIndex,
        index: newSet[bucketIndex].length - 1,
      });
      setLastOperation(`Added "${inputValue}" to set in bucket ${bucketIndex}`);
    }

    setCurrentOperation("");
    setHighlightedBucket(null);
    setHighlightedEntry(null);
    setOperationType(null);
    setInputValue("");
    setIsAnimating(false);
  };

  const find = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("find");

    const bucketIndex = hashFunction(inputValue);
    setCurrentOperation(
      `Searching for "${inputValue}": hash("${inputValue}") = ${bucketIndex}`,
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedSet[bucketIndex];
    setCurrentOperation(
      `Searching in bucket ${bucketIndex} (chain length: ${bucket.length})`,
    );
    await sleep(speed);

    let found = false;
    for (let i = 0; i < bucket.length; i++) {
      setHighlightedEntry({ bucket: bucketIndex, index: i });
      setCurrentOperation(
        `Checking entry ${i + 1}/${bucket.length}: "${
          bucket[i].value
        }" == "${inputValue}"?`,
      );
      await sleep(speed);

      if (bucket[i].value === inputValue) {
        found = true;
        setCurrentOperation(
          `Found "${inputValue}" in bucket ${bucketIndex}! Value exists in set.`,
        );
        await sleep(speed * 2);
        break;
      }
    }

    if (!found) {
      setCurrentOperation(
        `Value "${inputValue}" not found in bucket ${bucketIndex}`,
      );
      await sleep(speed);
    }

    setLastOperation(
      found
        ? `"${inputValue}" exists in set`
        : `"${inputValue}" not found in set`,
    );
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedBucket(null);
      setHighlightedEntry(null);
    }, 1000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const erase = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("erase");

    const bucketIndex = hashFunction(inputValue);
    setCurrentOperation(
      `Removing "${inputValue}": hash("${inputValue}") = ${bucketIndex}`,
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedSet[bucketIndex];
    setCurrentOperation(`Searching in bucket ${bucketIndex} for removal`);
    await sleep(speed);

    let found = false;
    for (let i = 0; i < bucket.length; i++) {
      setHighlightedEntry({ bucket: bucketIndex, index: i });
      setCurrentOperation(
        `Checking entry ${i + 1}/${bucket.length}: "${
          bucket[i].value
        }" == "${inputValue}"?`,
      );
      await sleep(speed);

      if (bucket[i].value === inputValue) {
        found = true;
        setCurrentOperation(
          `Found "${inputValue}"! Removing from bucket ${bucketIndex}`,
        );
        await sleep(speed);

        const newSet = [...unorderedSet];
        newSet[bucketIndex] = newSet[bucketIndex].filter(
          (_, index) => index !== i,
        );
        setUnorderedSet(newSet);
        break;
      }
    }

    if (!found) {
      setCurrentOperation(`Value "${inputValue}" not found for removal`);
      await sleep(speed);
    }

    setLastOperation(
      found ? `Removed "${inputValue}"` : `Value "${inputValue}" not found`,
    );
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedBucket(null);
      setHighlightedEntry(null);
    }, 1000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setUnorderedSet(
      Array(bucketCount)
        .fill(null)
        .map(() => []),
    );
    setLastOperation("UnorderedSet cleared");
    setCurrentOperation("");
  };

  const resize = () => {
    if (isAnimating) return;
    const newBucketCount = bucketCount === 6 ? 10 : 6;
    setBucketCount(newBucketCount);
    setUnorderedSet(
      Array(newBucketCount)
        .fill(null)
        .map(() => []),
    );
    setLastOperation(`Resized to ${newBucketCount} buckets`);
  };

  const getBucketColor = (bucketIndex: number) => {
    if (highlightedBucket === bucketIndex) {
      if (operationType === "insert") return "primary";
      if (operationType === "find") return "background";
      if (operationType === "erase") return "accent";
    }
    return "secondary";
  };

  const getEntryColor = (bucketIndex: number, entryIndex: number) => {
    if (
      highlightedEntry?.bucket === bucketIndex &&
      highlightedEntry?.index === entryIndex
    ) {
      if (operationType === "insert") return "primary";
      if (operationType === "find") return "background";
      if (operationType === "erase") return "accent";
    }

    const colors = ["primary", "secondary", "accent", "background"];
    return colors[entryIndex % colors.length];
  };

  const getTotalEntries = () => {
    return unorderedSet.reduce((total, bucket) => total + bucket.length, 0);
  };

  const getUniqueValues = (): string[] => {
    const values: string[] = [];
    unorderedSet.forEach((bucket) => {
      bucket.forEach((entry) => values.push(entry.value));
    });
    return values;
  };

  const getAverageChainLength = () => {
    const totalEntries = getTotalEntries();
    return totalEntries === 0 ? 0 : (totalEntries / bucketCount).toFixed(2);
  };

  const getLongestChain = () => {
    return Math.max(...unorderedSet.map((bucket) => bucket.length));
  };

  const getLoadFactor = () => {
    return getTotalEntries() / bucketCount;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          UnorderedSet Visualizer
        </h2>
        <p className="text-background-600">
          Set with separate chaining - no duplicates, no ordering
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {bucketCount}
          </div>
          <div className="text-sm text-background-600">Buckets</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {getTotalEntries()}
          </div>
          <div className="text-sm text-background-600">Elements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {getAverageChainLength()}
          </div>
          <div className="text-sm text-background-600">Avg Chain Length</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {(getLoadFactor() * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-background-600">Load Factor</div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-4xl">
        <h4 className="font-bold text-background-800 mb-2 text-center">
          Current Set Contents
        </h4>
        <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center">
          {getUniqueValues().length === 0 ? (
            <div className="text-background-400 italic">Set is empty</div>
          ) : (
            <>
              <span className="text-background-600">{"{"}</span>
              {getUniqueValues().map((value, index) => (
                <span key={value}>
                  <span className="bg-background-100 text-background-800 px-2 py-1 rounded font-mono text-sm">
                    &quot;{value}&quot;
                  </span>
                  {index < getUniqueValues().length - 1 && (
                    <span className="text-background-600 mx-1">,</span>
                  )}
                </span>
              ))}
              <span className="text-background-600">{"}"}</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation ||
            lastOperation ||
            "Ready for UnorderedSet operations"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-background p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Value:
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            placeholder="apple"
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Speed:
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={1500}>Slow</option>
            <option value={1000}>Medium</option>
            <option value={600}>Fast</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Unique Count:
          </label>
          <div className="px-3 py-2 bg-background-100 rounded-md text-sm text-background-600">
            {getUniqueValues().length} unique values
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-2xl">
        <h4 className="font-bold text-background-800 mb-2 text-center">
          Hash Function with Separate Chaining
        </h4>
        <div className="text-center font-mono text-sm bg-background-100 p-3 rounded mb-2">
          hash(value) = (Σ value[i] × 31) % {bucketCount}
        </div>
        <div className="text-xs text-background-500 text-center">
          Collisions resolved by chaining - duplicates automatically prevented
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Hash Table Structure with Separate Chaining
        </h3>

        <div className="space-y-4">
          {unorderedSet.map((bucket, bucketIndex) => (
            <div
              key={bucketIndex}
              className={`border-2 rounded-lg p-4 transition-all duration-300 ${
                highlightedBucket === bucketIndex
                  ? "border-background-400 shadow-lg"
                  : "border-background-200"
              }`}
              style={{ backgroundColor: getBucketColor(bucketIndex) }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-background-600 text-background px-2 py-1 rounded text-sm font-bold">
                    [{bucketIndex}]
                  </div>
                  <div className="text-xs text-background-500 mt-1">
                    {bucket.length} items
                  </div>
                </div>

                <div className="flex-1 min-h-[60px] flex items-center">
                  {bucket.length === 0 ? (
                    <div className="text-background-400 italic">
                      Empty bucket
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 flex-wrap">
                      {bucket.map((entry, entryIndex) => (
                        <div key={entry.id} className="flex items-center gap-2">
                          <div
                            className={`rounded-lg p-3 text-background text-sm font-bold border-2 transition-all duration-300 ${
                              highlightedEntry?.bucket === bucketIndex &&
                              highlightedEntry?.index === entryIndex
                                ? "border-background-400 scale-110 shadow-lg"
                                : "border-background/30"
                            }`}
                            style={{
                              backgroundColor: getEntryColor(
                                bucketIndex,
                                entryIndex,
                              ),
                            }}
                          >
                            <div className="text-center font-bold">
                              &quot;{entry.value}&quot;
                            </div>
                          </div>

                          {entryIndex < bucket.length - 1 && (
                            <div className="text-background-400 text-lg">→</div>
                          )}
                        </div>
                      ))}

                      {bucket.length > 0 && (
                        <>
                          <div className="text-background-400 text-lg">→</div>
                          <div className="bg-background-300 text-background-600 px-2 py-1 rounded text-xs">
                            NULL
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-3xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Chain Length Distribution
        </h4>
        <div className="flex items-end gap-2 justify-center">
          {unorderedSet.map((bucket, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-background-500 rounded-t transition-all duration-300 w-8 flex items-end justify-center text-background text-xs font-bold"
                style={{ height: `${Math.max(bucket.length * 20, 4)}px` }}
              >
                {bucket.length > 0 && (
                  <span className="pb-1">{bucket.length}</span>
                )}
              </div>
              <div className="text-xs text-background-500 mt-1">B{index}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-background-500 text-center mt-2">
          Height represents chain length in each bucket
        </div>
      </div>

      <div className="bg-background-50 border border-background-200 rounded-lg p-4 w-full max-w-3xl">
        <div className="flex items-center gap-2 text-background-800">
          <div className="text-lg">ℹ️</div>
          <div>
            <div className="font-bold">Set Properties</div>
            <div className="text-sm">
              • No duplicate values allowed - duplicate insertions are
              automatically ignored
              <br />
              • Unordered collection - elements have no specific order
              <br />• Fast operations - average O(1) time for insert, find, and
              erase
            </div>
          </div>
        </div>
      </div>

      {getLongestChain() > 3 && (
        <div className="bg-background-50 border border-background-200 rounded-lg p-4 w-full max-w-3xl">
          <div className="flex items-center gap-2 text-background-800">
            <div className="text-lg">⚠️</div>
            <div>
              <div className="font-bold">Long Chains Detected!</div>
              <div className="text-sm">
                Maximum chain length is {getLongestChain()}. Consider using more
                buckets or a better hash function to improve performance.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={insert}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Insert
        </button>

        <button
          onClick={find}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Find
        </button>

        <button
          onClick={erase}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Erase
        </button>

        <button
          onClick={resize}
          disabled={isAnimating}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Resize ({bucketCount === 6 ? "10" : "6"})
        </button>

        <button
          onClick={clear}
          disabled={isAnimating}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Clear
        </button>
      </div>

      <div>
        <UnorderedSetDesc />
      </div>
    </div>
  );
}
