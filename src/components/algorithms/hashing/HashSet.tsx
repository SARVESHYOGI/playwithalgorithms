import HashSetDesc from "@/components/descriptions/hashing/HashSetDesc";
import { HashSetEntry } from "@/types";
import { useState } from "react";

export default function HashSetVisualizer() {
  const [hashSet, setHashSet] = useState<(HashSetEntry | null)[]>(
    Array(8).fill(null),
  );
  const [inputValue, setInputValue] = useState<string>("apple");
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

  const hashFunction = (value: string): number => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash + value.charCodeAt(i) * (i + 1)) % tableSize;
    }
    return Math.abs(hash);
  };

  const add = async () => {
    if (!inputValue.trim() || isAnimating) return;
    if (loadFactor >= 0.75) {
      setCurrentOperation("Hash set is getting full! Consider resizing.");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("add");

    const hash = hashFunction(inputValue);
    setCurrentOperation(
      `Computing hash for "${inputValue}": hash("${inputValue}") = ${hash}`,
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;
    let hasCollision = false;
    let alreadyExists = false;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashSet[index] === null) {
        setCurrentOperation(
          `Empty slot found at index ${index}. Adding "${inputValue}"`,
        );
        await sleep(speed);
        break;
      } else if (hashSet[index]?.value === inputValue) {
        alreadyExists = true;
        setCurrentOperation(
          `Value "${inputValue}" already exists at index ${index}. No duplicates allowed in HashSet.`,
        );
        await sleep(speed * 2);
        break;
      } else {
        hasCollision = true;
        setCurrentOperation(
          `Collision at index ${index}! Probing to next slot...`,
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (probeCount >= tableSize) {
      setCurrentOperation("Hash set is full!");
      setHighlightedIndex(null);
      setIsAnimating(false);
      return;
    }

    if (!alreadyExists) {
      const newHashSet = [...hashSet];
      const newEntry: HashSetEntry = {
        value: inputValue,
        hash: hash,
        id: `entry-${Date.now()}`,
      };

      newHashSet[index] = newEntry;
      setHashSet(newHashSet);

      if (hasCollision) {
        setCollisionCount((prev) => prev + 1);
      }

      const newLoadFactor =
        newHashSet.filter((entry) => entry !== null).length / tableSize;
      setLoadFactor(newLoadFactor);

      setLastOperation(
        `Added "${inputValue}" to set at index ${index}${
          hasCollision ? " after collision" : ""
        }`,
      );
    } else {
      setLastOperation(`"${inputValue}" already exists in set - not added`);
    }

    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue("");
    setIsAnimating(false);
  };

  const contains = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("contains");

    const hash = hashFunction(inputValue);
    setCurrentOperation(
      `Checking if "${inputValue}" exists: hash("${inputValue}") = ${hash}`,
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;
    let found = false;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashSet[index] === null) {
        setCurrentOperation(
          `Empty slot at index ${index}. Value "${inputValue}" is not in the set.`,
        );
        await sleep(speed);
        break;
      } else if (hashSet[index]?.value === inputValue) {
        found = true;
        setCurrentOperation(
          `Found "${inputValue}" at index ${index}! Value exists in set.`,
        );
        await sleep(speed * 2);
        break;
      } else {
        setCurrentOperation(
          `Different value at index ${index}. Probing next slot...`,
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (probeCount >= tableSize && !found) {
      setCurrentOperation(
        `Value "${inputValue}" not found after checking all slots.`,
      );
    }

    setLastOperation(
      `"${inputValue}" ${found ? "exists" : "does not exist"} in set`,
    );
    setTimeout(() => {
      setCurrentOperation("");
      setHighlightedIndex(null);
    }, 2000);
    setOperationType(null);
    setIsAnimating(false);
  };

  const remove = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setIsAnimating(true);
    setOperationType("remove");

    const hash = hashFunction(inputValue);
    setCurrentOperation(
      `Removing "${inputValue}": hash("${inputValue}") = ${hash}`,
    );
    await sleep(speed);

    let index = hash;
    let probeCount = 0;
    let found = false;

    while (probeCount < tableSize) {
      setHighlightedIndex(index);

      if (hashSet[index] === null) {
        setCurrentOperation(
          `Empty slot at index ${index}. Value "${inputValue}" not found.`,
        );
        await sleep(speed);
        break;
      } else if (hashSet[index]?.value === inputValue) {
        setCurrentOperation(
          `Found "${inputValue}" at index ${index}. Removing...`,
        );
        found = true;
        await sleep(speed);

        const newHashSet = [...hashSet];
        newHashSet[index] = null;
        setHashSet(newHashSet);

        const newLoadFactor =
          newHashSet.filter((entry) => entry !== null).length / tableSize;
        setLoadFactor(newLoadFactor);

        break;
      } else {
        setCurrentOperation(
          `Different value at index ${index}. Probing next slot...`,
        );
        await sleep(speed / 2);
        index = (index + 1) % tableSize;
        probeCount++;
      }
    }

    if (!found && probeCount >= tableSize) {
      setCurrentOperation(`Value "${inputValue}" not found.`);
    }

    setLastOperation(
      found ? `Removed "${inputValue}"` : `Value "${inputValue}" not found`,
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
    setHashSet(Array(tableSize).fill(null));
    setLoadFactor(0);
    setCollisionCount(0);
    setLastOperation("HashSet cleabackground");
    setCurrentOperation("");
  };

  const resize = () => {
    if (isAnimating) return;
    const newSize = tableSize === 8 ? 16 : 8;
    setTableSize(newSize);
    setHashSet(Array(newSize).fill(null));
    setLoadFactor(0);
    setCollisionCount(0);
    setLastOperation(`Resized hash set to ${newSize} slots`);
  };

  const getSlotColor = (index: number) => {
    if (highlightedIndex === index) {
      if (operationType === "add") return "primary";
      if (operationType === "contains") return "secondary";
      if (operationType === "remove") return "accent";
    }

    const entry = hashSet[index];
    if (entry === null) return "background";

    const idealIndex = hashFunction(entry.value);
    if (index === idealIndex) {
      return "#e0e7ff";
    } else {
      return "#fecaca";
    }
  };

  const getBorderColor = (index: number) => {
    if (highlightedIndex === index) return "secondary";
    return "#8a8f06";
  };

  const getUniqueValues = (): string[] => {
    return hashSet
      .filter((entry) => entry !== null)
      .map((entry) => entry!.value);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full  mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          HashSet Visualizer
        </h2>
        <p className="text-background-600">
          Set data structure with no duplicate values allowed
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
            {hashSet.filter((entry) => entry !== null).length}
          </div>
          <div className="text-sm text-background-600">Elements</div>
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
          {currentOperation || lastOperation || "Ready for HashSet operations"}
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

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-3xl">
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

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-2xl">
        <h4 className="font-bold text-background-800 mb-2 text-center">
          Hash Function
        </h4>
        <div className="text-center font-mono text-sm bg-background-100 p-3 rounded">
          hash(value) = (Σ value[i] × (i+1)) % {tableSize}
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
          {hashSet.map((entry, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 min-h-[100px] transition-all duration-300 ${
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
                    <div className="font-bold text-background-800 break-all">
                      &quot;{entry.value}&quot;
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

      <div className="bg-background-50 border border-background-200 rounded-lg p-4 w-full max-w-3xl">
        <div className="flex items-center gap-2 text-background-800">
          <div className="text-lg">ℹ️</div>
          <div>
            <div className="font-bold">Set Properties</div>
            <div className="text-sm">
              • No duplicate values allowed - attempting to add existing values
              will be ignobackground
              <br />
              • Unordebackground collection - elements dont maintain insertion
              order
              <br />• Fast membership testing - O(1) average time to check if
              element exists
            </div>
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
          onClick={add}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Add
        </button>

        <button
          onClick={contains}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Contains
        </button>

        <button
          onClick={remove}
          disabled={isAnimating || !inputValue.trim()}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || !inputValue.trim()
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
      <div>
        <HashSetDesc />
      </div>
    </div>
  );
}
