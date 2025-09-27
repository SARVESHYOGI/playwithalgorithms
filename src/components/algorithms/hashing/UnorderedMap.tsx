import { useState } from "react";

interface ChainEntry {
  key: string;
  value: string;
  id: string;
}

export default function UnorderedMapVisualizer() {
  const [unorderedMap, setUnorderedMap] = useState<ChainEntry[][]>(
    Array(6)
      .fill(null)
      .map(() => [])
  );
  const [inputKey, setInputKey] = useState<string>("apple");
  const [inputValue, setInputValue] = useState<string>("red");
  const [searchKey, setSearchKey] = useState<string>("apple");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(1000);
  const [bucketCount, setBucketCount] = useState(6);
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(
    null
  );
  const [highlightedEntry, setHighlightedEntry] = useState<{
    bucket: number;
    index: number;
  } | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % bucketCount;
    }
    return Math.abs(hash);
  };

  const put = async () => {
    if (!inputKey.trim() || !inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("put");

    const bucketIndex = hashFunction(inputKey);
    setCurrentOperation(
      `Computing hash for "${inputKey}": hash("${inputKey}") = ${bucketIndex}`
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedMap[bucketIndex];
    const existingIndex = bucket.findIndex((entry) => entry.key === inputKey);

    if (existingIndex !== -1) {
      setHighlightedEntry({ bucket: bucketIndex, index: existingIndex });
      setCurrentOperation(
        `Key "${inputKey}" exists at bucket ${bucketIndex}. Updating value from "${bucket[existingIndex].value}" to "${inputValue}"`
      );
      await sleep(speed);

      const newMap = [...unorderedMap];
      newMap[bucketIndex][existingIndex] = {
        key: inputKey,
        value: inputValue,
        id: `entry-${Date.now()}`,
      };
      setUnorderedMap(newMap);
    } else {
      setCurrentOperation(
        `Adding new entry ("${inputKey}", "${inputValue}") to bucket ${bucketIndex}`
      );
      await sleep(speed);

      const newMap = [...unorderedMap];
      const newEntry: ChainEntry = {
        key: inputKey,
        value: inputValue,
        id: `entry-${Date.now()}`,
      };

      newMap[bucketIndex] = [...newMap[bucketIndex], newEntry];
      setUnorderedMap(newMap);
      setHighlightedEntry({
        bucket: bucketIndex,
        index: newMap[bucketIndex].length - 1,
      });
    }

    setLastOperation(
      `${
        existingIndex !== -1 ? "Updated" : "Inserted"
      } ("${inputKey}", "${inputValue}") in bucket ${bucketIndex}`
    );
    setCurrentOperation("");
    setHighlightedBucket(null);
    setHighlightedEntry(null);
    setOperationType(null);
    setInputKey("");
    setInputValue("");
    setIsAnimating(false);
  };

  const get = async () => {
    if (!searchKey.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("get");

    const bucketIndex = hashFunction(searchKey);
    setCurrentOperation(
      `Searching for "${searchKey}": hash("${searchKey}") = ${bucketIndex}`
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedMap[bucketIndex];
    setCurrentOperation(
      `Searching in bucket ${bucketIndex} (chain length: ${bucket.length})`
    );
    await sleep(speed);

    let found = false;
    for (let i = 0; i < bucket.length; i++) {
      setHighlightedEntry({ bucket: bucketIndex, index: i });
      setCurrentOperation(
        `Checking entry ${i + 1}/${bucket.length}: "${
          bucket[i].key
        }" == "${searchKey}"?`
      );
      await sleep(speed);

      if (bucket[i].key === searchKey) {
        found = true;
        setCurrentOperation(
          `Found "${searchKey}" in bucket ${bucketIndex}! Value: "${bucket[i].value}"`
        );
        await sleep(speed * 2);
        break;
      }
    }

    if (!found) {
      setCurrentOperation(
        `Key "${searchKey}" not found in bucket ${bucketIndex}`
      );
      await sleep(speed);
    }

    setLastOperation(
      found ? `Found "${searchKey}"` : `Key "${searchKey}" not found`
    );
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedBucket(null);
      setHighlightedEntry(null);
    }, 1000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const remove = async () => {
    if (!searchKey.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("remove");

    const bucketIndex = hashFunction(searchKey);
    setCurrentOperation(
      `Removing "${searchKey}": hash("${searchKey}") = ${bucketIndex}`
    );
    setHighlightedBucket(bucketIndex);
    await sleep(speed);

    const bucket = unorderedMap[bucketIndex];
    setCurrentOperation(`Searching in bucket ${bucketIndex} for removal`);
    await sleep(speed);

    let found = false;
    for (let i = 0; i < bucket.length; i++) {
      setHighlightedEntry({ bucket: bucketIndex, index: i });
      setCurrentOperation(
        `Checking entry ${i + 1}/${bucket.length}: "${
          bucket[i].key
        }" == "${searchKey}"?`
      );
      await sleep(speed);

      if (bucket[i].key === searchKey) {
        found = true;
        setCurrentOperation(
          `Found "${searchKey}"! Removing from bucket ${bucketIndex}`
        );
        await sleep(speed);

        const newMap = [...unorderedMap];
        newMap[bucketIndex] = newMap[bucketIndex].filter(
          (_, index) => index !== i
        );
        setUnorderedMap(newMap);
        break;
      }
    }

    if (!found) {
      setCurrentOperation(`Key "${searchKey}" not found for removal`);
      await sleep(speed);
    }

    setLastOperation(
      found ? `Removed "${searchKey}"` : `Key "${searchKey}" not found`
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
    setUnorderedMap(
      Array(bucketCount)
        .fill(null)
        .map(() => [])
    );
    setLastOperation("UnorderedMap cleared");
    setCurrentOperation("");
  };

  const resize = () => {
    if (isAnimating) return;
    const newBucketCount = bucketCount === 6 ? 10 : 6;
    setBucketCount(newBucketCount);
    setUnorderedMap(
      Array(newBucketCount)
        .fill(null)
        .map(() => [])
    );
    setLastOperation(`Resized to ${newBucketCount} buckets`);
  };

  const getBucketColor = (bucketIndex: number) => {
    if (highlightedBucket === bucketIndex) {
      if (operationType === "put") return "background";
      if (operationType === "get") return "accent";
      if (operationType === "remove") return "primary";
    }
    return "secondary";
  };

  const getEntryColor = (bucketIndex: number, entryIndex: number) => {
    if (
      highlightedEntry?.bucket === bucketIndex &&
      highlightedEntry?.index === entryIndex
    ) {
      if (operationType === "put") return "background";
      if (operationType === "get") return "accent";
      if (operationType === "remove") return "primary";
    }

    const colors = ["secondary", "background", "accent", "primary", "text-50"];
    return colors[entryIndex % colors.length];
  };

  const getTotalEntries = () => {
    return unorderedMap.reduce((total, bucket) => total + bucket.length, 0);
  };

  const getAverageChainLength = () => {
    const totalEntries = getTotalEntries();
    return totalEntries === 0 ? 0 : (totalEntries / bucketCount).toFixed(2);
  };

  const getLongestChain = () => {
    return Math.max(...unorderedMap.map((bucket) => bucket.length));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          UnorderedMap Visualizer
        </h2>
        <p className="text-background-600">
          Hash table using separate chaining for collision resolution
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
          <div className="text-sm text-background-600">Total Entries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {getAverageChainLength()}
          </div>
          <div className="text-sm text-background-600">Avg Chain Length</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {getLongestChain()}
          </div>
          <div className="text-sm text-background-600">Max Chain Length</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation ||
            lastOperation ||
            "Ready for UnorderedMap operations"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-background p-4 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Key:
          </label>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            disabled={isAnimating}
            placeholder="apple"
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Value:
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            placeholder="red"
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Search Key:
          </label>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
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
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-2xl">
        <h4 className="font-bold text-background-800 mb-2 text-center">
          Hash Function with Separate Chaining
        </h4>
        <div className="text-center font-mono text-sm bg-background-100 p-3 rounded mb-2">
          hash(key) = (Σ key[i] × 31) % {bucketCount}
        </div>
        <div className="text-xs text-background-500 text-center">
          Collisions are resolved by chaining entries in linked lists
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Hash Table with Separate Chaining
        </h3>

        <div className="space-y-4">
          {unorderedMap.map((bucket, bucketIndex) => (
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
                                entryIndex
                              ),
                            }}
                          >
                            <div className="text-center">
                              <div className="font-bold">
                                &quot;{entry.key}&quot;
                              </div>
                              <div className="text-xs opacity-80">
                                : &quot;{entry.value}&quot;
                              </div>
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
          {unorderedMap.map((bucket, index) => (
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

      {getLongestChain() > 3 && (
        <div className="bg-background-50 border border-background-200 rounded-lg p-4 w-full max-w-3xl">
          <div className="flex items-center gap-2 text-background-800">
            <div className="text-lg">⚠️</div>
            <div>
              <div className="font-bold">Long Chains Detected!</div>
              <div className="text-sm">
                Maximum chain length is {getLongestChain()}. Long chains can
                degrade performance. Consider using more buckets or a better
                hash function.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={put}
          disabled={isAnimating || !inputKey.trim() || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputKey.trim() || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Put
        </button>

        <button
          onClick={get}
          disabled={isAnimating || !searchKey.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !searchKey.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Get
        </button>

        <button
          onClick={remove}
          disabled={isAnimating || !searchKey.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !searchKey.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Remove
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

      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          UnorderedMap Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>insert/put(key, value):</strong> Add or update key-value
                pair
              </li>
              <li>
                <strong>find/get(key):</strong> Retrieve value for given key
              </li>
              <li>
                <strong>erase/remove(key):</strong> Delete key-value pair
              </li>
              <li>
                <strong>count/contains(key):</strong> Check if key exists
              </li>
            </ul>

            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Collision Handling:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Separate Chaining:</strong> Each bucket is a linked list
              </li>
              <li>
                <strong>Chain Traversal:</strong> Linear search within each
                chain
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Average Time:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Worst Case:</strong> O(n) if all keys hash to same
                bucket
              </li>
              <li>
                <strong>Space:</strong> O(n) for entries + O(b) for buckets
              </li>
              <li>
                <strong>No Ordering:</strong> Keys are not stored in any
                particular order
              </li>
              <li>
                <strong>Dynamic Resizing:</strong> Can resize to maintain
                performance
              </li>
              <li>
                <strong>Use Cases:</strong> Caches, frequency counting, graph
                adjacency lists
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>Separate Chaining vs Linear Probing:</strong> Separate
          chaining handles collisions by storing multiple entries in each bucket
          using linked lists, while linear probing finds the next empty slot.
          Chaining never runs out of space but uses extra memory for pointers.
        </div>
      </div>
    </div>
  );
}
