import { useState } from "react";

interface HashEntry {
  key: string;
  value: string;
  hash: number;
  id: string;
}

export default function HashMapVisualizer() {
  const [hashMap, setHashMap] = useState<(HashEntry | null)[]>(
    Array(8).fill(null)
  );
  const [inputKey, setInputKey] = useState<string>("apple");
  const [inputValue, setInputValue] = useState<string>("background");
  const [searchKey, setSearchKey] = useState<string>("apple");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(1000);
  const [tableSize, setTableSize] = useState(8);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);
  const [collisionCount, setCollisionCount] = useState(0);
  const [loadFactor, setLoadFactor] = useState(0);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % tableSize;
    }
    return Math.abs(hash);
  };

  const findSlot = (key: string, forInsertion: boolean = false): number => {
    const hash = hashFunction(key);
    let index = hash;
    let probeCount = 0;

    while (probeCount < tableSize) {
      if (hashMap[index] === null) {
        return index;
      }
      if (hashMap[index]?.key === key) {
        return index;
      }
      index = (index + 1) % tableSize;
      probeCount++;
    }
    return -1;
  };

  const put = async () => {
    if (!inputKey.trim() || !inputValue.trim() || isAnimating) return;
    if (loadFactor >= 0.75) {
      setCurrentOperation("Hash table is getting full! Consider resizing.");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("put");

    const hash = hashFunction(inputKey);
    setCurrentOperation(
      `Computing hash for "${inputKey}": hash("${inputKey}") = ${hash}`
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;
    let hasCollision = false;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashMap[index] === null) {
        setCurrentOperation(
          `Empty slot found at index ${index}. Inserting ("${inputKey}", "${inputValue}")`
        );
        await sleep(speed);
        break;
      } else if (hashMap[index]?.key === inputKey) {
        setCurrentOperation(
          `Key "${inputKey}" already exists at index ${index}. Updating value.`
        );
        await sleep(speed);
        break;
      } else {
        hasCollision = true;
        setCurrentOperation(
          `Collision at index ${index}! Probing to next slot...`
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (probeCount >= tableSize) {
      setCurrentOperation("Hash table is full!");
      setHighlightedIndex(null);
      setIsAnimating(false);
      return;
    }

    const newHashMap = [...hashMap];
    const newEntry: HashEntry = {
      key: inputKey,
      value: inputValue,
      hash: hash,
      id: `entry-${Date.now()}`,
    };

    newHashMap[index] = newEntry;
    setHashMap(newHashMap);

    if (hasCollision) {
      setCollisionCount((prev) => prev + 1);
    }

    const newLoadFactor =
      newHashMap.filter((entry) => entry !== null).length / tableSize;
    setLoadFactor(newLoadFactor);

    setLastOperation(
      `Inserted ("${inputKey}", "${inputValue}") at index ${index}${
        hasCollision ? " after collision" : ""
      }`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputKey("");
    setInputValue("");
    setIsAnimating(false);
  };

  const get = async () => {
    if (!searchKey.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("get");

    const hash = hashFunction(searchKey);
    setCurrentOperation(
      `Searching for "${searchKey}": hash("${searchKey}") = ${hash}`
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashMap[index] === null) {
        setCurrentOperation(
          `Empty slot at index ${index}. Key "${searchKey}" not found.`
        );
        await sleep(speed);
        break;
      } else if (hashMap[index]?.key === searchKey) {
        setCurrentOperation(
          `Found "${searchKey}" at index ${index}! Value: "${hashMap[index]?.value}"`
        );
        await sleep(speed * 2);
        break;
      } else {
        setCurrentOperation(
          `Key mismatch at index ${index}. Probing next slot...`
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (probeCount >= tableSize) {
      setCurrentOperation(
        `Key "${searchKey}" not found after checking all slots.`
      );
    }

    setLastOperation(`Search for "${searchKey}" completed`);
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedIndex(null);
    }, 2000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const remove = async () => {
    if (!searchKey.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("remove");

    const hash = hashFunction(searchKey);
    setCurrentOperation(
      `Removing "${searchKey}": hash("${searchKey}") = ${hash}`
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;
    let found = false;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashMap[index] === null) {
        setCurrentOperation(
          `Empty slot at index ${index}. Key "${searchKey}" not found.`
        );
        await sleep(speed);
        break;
      } else if (hashMap[index]?.key === searchKey) {
        setCurrentOperation(
          `Found "${searchKey}" at index ${index}. Removing...`
        );
        found = true;
        await sleep(speed);

        const newHashMap = [...hashMap];
        newHashMap[index] = null;
        setHashMap(newHashMap);

        const newLoadFactor =
          newHashMap.filter((entry) => entry !== null).length / tableSize;
        setLoadFactor(newLoadFactor);

        break;
      } else {
        setCurrentOperation(
          `Key mismatch at index ${index}. Probing next slot...`
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (!found && probeCount >= tableSize) {
      setCurrentOperation(`Key "${searchKey}" not found.`);
    }

    setLastOperation(
      found ? `Removed "${searchKey}"` : `Key "${searchKey}" not found`
    );
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedIndex(null);
    }, 1000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setHashMap(Array(tableSize).fill(null));
    setLoadFactor(0);
    setCollisionCount(0);
    setLastOperation("HashMap cleabackground");
    setCurrentOperation("");
  };

  const resize = () => {
    if (isAnimating) return;
    const newSize = tableSize === 8 ? 16 : 8;
    setTableSize(newSize);
    setHashMap(Array(newSize).fill(null));
    setLoadFactor(0);
    setCollisionCount(0);
    setLastOperation(`Resized hash table to ${newSize} slots`);
  };

  const getSlotColor = (index: number) => {
    if (highlightedIndex === index) {
      if (operationType === "put") return "primary";
      if (operationType === "get") return "secondary";
      if (operationType === "remove") return "accent";
    }

    const entry = hashMap[index];
    if (entry === null) return "background-50";

    const idealIndex = hashFunction(entry.key);
    if (index === idealIndex) {
      return "primary-200";
    } else {
      return "background-200";
    }
  };

  const getBorderColor = (index: number) => {
    if (highlightedIndex === index) return "#fbbf24";
    return "#e2e8f0";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          HashMap Visualizer
        </h2>
        <p className="text-background-600">
          Hash table with linear probing collision resolution
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {tableSize}
          </div>
          <div className="text-sm text-background-600">Table Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {hashMap.filter((entry) => entry !== null).length}
          </div>
          <div className="text-sm text-background-600">Entries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {(loadFactor * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-background-600">Load Factor</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {collisionCount}
          </div>
          <div className="text-sm text-background-600">Collisions</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation || lastOperation || "Ready for HashMap operations"}
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
            placeholder="background"
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
          Hash Function
        </h4>
        <div className="text-center font-mono text-sm bg-background-100 p-3 rounded">
          hash(key) = (Σ key[i] × (i+1)) % {tableSize}
        </div>
        <div className="text-xs text-background-500 text-center mt-2">
          Simple hash function for demonstration purposes
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Hash Table Structure
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hashMap.map((entry, index) => (
            <div
              key={index}
              className={`border-2 bg-background rounded-lg p-4 min-h-[120px] transition-all duration-300 ${
                highlightedIndex === index ? "scale-105 shadow-lg" : ""
              }`}
              style={{
                backgroundColor: getSlotColor(index),
                borderColor: getBorderColor(index),
              }}
            >
              <div className="text-xs font-bold text-background-500 mb-2">
                Index {index}
              </div>

              {entry === null ? (
                <div className="flex items-center justify-center h-full text-background-400">
                  Empty
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="font-bold text-background-800">
                      Key: {entry.key}
                    </div>
                    <div className="text-background-600">
                      Value: {entry.value}
                    </div>
                  </div>
                  <div className="text-xs text-background-500 pt-2 border-t">
                    <div>Hash: {entry.hash}</div>
                    <div>
                      Ideal: {entry.hash === index ? "✓" : `${entry.hash}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-background-50 border rounded"></div>
            <span>Empty Slot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-background-200 rounded"></div>
            <span>Ideal Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-background-200 rounded"></div>
            <span>Collision (Displaced)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-background-400 rounded"></div>
            <span>Currently Active</span>
          </div>
        </div>
      </div>

      {loadFactor > 0.7 && (
        <div className="bg-background-50 border border-background-200 rounded-lg p-4 w-full max-w-2xl">
          <div className="flex items-center gap-2 text-background-800">
            <div className="text-lg">⚠️</div>
            <div>
              <div className="font-bold">High Load Factor!</div>
              <div className="text-sm">
                Consider resizing the hash table to maintain good performance.
                Load factor: {(loadFactor * 100).toFixed(1)}%
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
          Resize ({tableSize === 8 ? "16" : "8"})
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
          HashMap Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Put(key, value):</strong> Insert or update key-value
                pair
              </li>
              <li>
                <strong>Get(key):</strong> Retrieve value for given key
              </li>
              <li>
                <strong>Remove(key):</strong> Delete key-value pair
              </li>
              <li>
                <strong>containsKey(key):</strong> Check if key exists
              </li>
            </ul>

            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Collision Resolution:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Linear Probing:</strong> Check next slot sequentially
              </li>
              <li>
                <strong>Load Factor:</strong> Ratio of entries to table size
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
                <strong>Worst Case:</strong> O(n) when many collisions occur
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                entries
              </li>
              <li>
                <strong>Load Factor:</strong> Keep below 0.75 for good
                performance
              </li>
              <li>
                <strong>Use Cases:</strong> Caches, databases, symbol tables,
                associative arrays
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>Key Insight:</strong> Hash functions distribute keys across
          table slots. Good hash functions minimize collisions, but collision
          resolution strategies like linear probing handle conflicts when they
          occur.
        </div>
      </div>
    </div>
  );
}
