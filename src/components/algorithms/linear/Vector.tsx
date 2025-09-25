import { useState } from "react";

export default function VectorVisualizer() {
  const [vector, setVector] = useState<number[]>([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState<string>("50");
  const [inputIndex, setInputIndex] = useState<string>("0");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [capacity, setCapacity] = useState(8);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const pushBack = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;

    setIsAnimating(true);
    setOperationType("push_back");

    if (vector.length >= capacity) {
      setCurrentOperation(
        `Capacity full! Resizing from ${capacity} to ${capacity * 2}...`
      );
      setCapacity(capacity * 2);
      await sleep(speed);
    }

    setCurrentOperation(`Pushing ${value} to back of vector...`);
    const newVector = [...vector, value];
    setVector(newVector);
    setHighlightedIndex(newVector.length - 1);

    await sleep(speed);

    setLastOperation(`Pushed ${value}. Size: ${newVector.length}/${capacity}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const popBack = async () => {
    if (vector.length === 0 || isAnimating) {
      if (vector.length === 0) {
        setCurrentOperation("Empty vector! Cannot pop from empty vector");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("pop_back");
    const lastValue = vector[vector.length - 1];
    setCurrentOperation(`Popping ${lastValue} from back of vector...`);
    setHighlightedIndex(vector.length - 1);

    await sleep(speed);

    const newVector = vector.slice(0, -1);
    setVector(newVector);
    setLastOperation(
      `Popped ${lastValue}. Size: ${newVector.length}/${capacity}`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const insertAt = async () => {
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    if (isNaN(value) || isNaN(index) || isAnimating) return;
    if (index < 0 || index > vector.length) {
      setCurrentOperation(
        `Invalid index! Must be between 0 and ${vector.length}`
      );
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("insert");

    if (vector.length >= capacity) {
      setCurrentOperation(
        `Capacity full! Resizing from ${capacity} to ${capacity * 2}...`
      );
      setCapacity(capacity * 2);
      await sleep(speed);
    }

    setCurrentOperation(`Inserting ${value} at index ${index}...`);

    for (let i = vector.length - 1; i >= index; i--) {
      setHighlightedIndex(i);
      await sleep(speed / 3);
    }

    const newVector = [...vector];
    newVector.splice(index, 0, value);
    setVector(newVector);
    setHighlightedIndex(index);

    await sleep(speed);

    setLastOperation(
      `Inserted ${value} at index ${index}. Size: ${newVector.length}/${capacity}`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const removeAt = async () => {
    const index = parseInt(inputIndex);
    if (isNaN(index) || isAnimating) return;
    if (index < 0 || index >= vector.length) {
      setCurrentOperation(
        `Invalid index! Must be between 0 and ${vector.length - 1}`
      );
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("remove");
    const valueToRemove = vector[index];
    setCurrentOperation(`Removing ${valueToRemove} from index ${index}...`);
    setHighlightedIndex(index);

    await sleep(speed);

    const newVector = [...vector];
    newVector.splice(index, 1);
    setVector(newVector);

    for (let i = index; i < newVector.length; i++) {
      setHighlightedIndex(i);
      await sleep(speed / 3);
    }

    setLastOperation(
      `Removed ${valueToRemove} from index ${index}. Size: ${newVector.length}/${capacity}`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const accessAt = async () => {
    const index = parseInt(inputIndex);
    if (isNaN(index) || isAnimating) return;
    if (index < 0 || index >= vector.length) {
      setCurrentOperation(
        `Invalid index! Must be between 0 and ${vector.length - 1}`
      );
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("access");
    setCurrentOperation(`Accessing element at index ${index}...`);
    setHighlightedIndex(index);

    await sleep(speed);

    setLastOperation(`Element at index ${index} is ${vector[index]}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setVector([]);
    setCapacity(8);
    setLastOperation("Vector cleabackground and capacity reset to 8");
    setCurrentOperation("");
    setOperationType(null);
  };

  const resize = () => {
    if (isAnimating) return;
    const newCapacity = Math.max(8, vector.length * 2);
    setCapacity(newCapacity);
    setLastOperation(`Capacity manually resized to ${newCapacity}`);
  };

  const getElementColor = (index: number, value: number) => {
    if (highlightedIndex === index) {
      if (operationType === "push_back" || operationType === "insert")
        return "#10b981";
      if (operationType === "pop_back" || operationType === "remove")
        return "#ef4444";
      if (operationType === "access") return "#3b82f6";
    }
    const hue = (value * 2.5 + index * 30) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-6xl mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Vector Visualizer
        </h2>
        <p className="text-background-600">
          Dynamic Array - Resizable array with random access
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {vector.length}
          </div>
          <div className="text-sm text-background-600">Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {capacity}
          </div>
          <div className="text-sm text-background-600">Capacity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {Math.round((vector.length / capacity) * 100)}%
          </div>
          <div className="text-sm text-background-600">Usage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {vector.length > 0 ? vector[vector.length - 1] : "Empty"}
          </div>
          <div className="text-sm text-background-600">Back</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation || lastOperation || "Ready for vector operations"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-background p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Value:
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Index:
          </label>
          <input
            type="number"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            disabled={isAnimating}
            min="0"
            max={vector.length}
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
            <option value={1200}>Slow</option>
            <option value={800}>Medium</option>
            <option value={400}>Fast</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Valid Range:
          </label>
          <div className="px-3 py-2 bg-background-100 rounded-md text-sm text-background-600">
            0 to {Math.max(0, vector.length - 1)}
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Vector Memory Layout
        </h3>

        <div className="relative">
          <div className="mb-4 text-center text-sm text-background-600">
            Allocated Capacity: {capacity} elements
          </div>

          <div className="border-2 border-background-300 rounded-lg p-4 bg-gradient-to-r from-background-50 to-background-100 relative overflow-x-auto">
            <div className="flex gap-1 justify-center min-h-[120px] items-center">
              {Array.from({ length: capacity }, (_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`rounded-lg border-2 text-center transform transition-all duration-300 min-w-[60px] h-[80px] flex items-center justify-center ${
                      index < vector.length
                        ? `text-background font-bold ${
                            highlightedIndex === index
                              ? "scale-110 border-background-400 shadow-lg animate-pulse"
                              : "border-background/30"
                          }`
                        : "border-dashed border-background-300 bg-background-50"
                    }`}
                    style={{
                      backgroundColor:
                        index < vector.length
                          ? getElementColor(index, vector[index])
                          : "transparent",
                    }}
                  >
                    {index < vector.length && (
                      <div>
                        <div className="text-lg">{vector[index]}</div>
                      </div>
                    )}
                    {index >= vector.length && (
                      <div className="text-background-400 text-xs">unused</div>
                    )}
                  </div>
                  <div className="text-xs text-background-500 mt-2">
                    [{index}]
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -tranbackground-x-1/2 text-sm text-background-500">
              Used:{" "}
              <span className="text-background-600 font-bold">
                {vector.length}
              </span>{" "}
              / Capacity:{" "}
              <span className="text-background-600 font-bold">{capacity}</span>
              {vector.length === capacity && (
                <span className="ml-2 bg-background-600 text-background px-2 py-1 rounded text-xs font-bold animate-pulse">
                  FULL - Will resize on next push
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-4xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Time Complexity
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(1)</div>
            <div className="text-background-600">Push Back*</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(1)</div>
            <div className="text-background-600">Pop Back</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(1)</div>
            <div className="text-background-600">Random Access</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(n)</div>
            <div className="text-background-600">Insert/Remove</div>
          </div>
        </div>
        <div className="text-xs text-background-500 mt-2 text-center">
          * Amortized O(1) - occasionally O(n) due to resizing
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl">
        <button
          onClick={pushBack}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Push Back
        </button>

        <button
          onClick={popBack}
          disabled={isAnimating || vector.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || vector.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Pop Back
        </button>

        <button
          onClick={insertAt}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Insert At
        </button>

        <button
          onClick={removeAt}
          disabled={isAnimating || vector.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || vector.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Remove At
        </button>

        <button
          onClick={accessAt}
          disabled={isAnimating || vector.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || vector.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Access At
        </button>

        <button
          onClick={resize}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Resize
        </button>
      </div>

      <button
        onClick={clear}
        disabled={isAnimating}
        className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
          isAnimating
            ? "bg-background-400 cursor-not-allowed"
            : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
        } text-background`}
      >
        Clear All
      </button>

      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Vector Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>push_back:</strong> Add element at end
              </li>
              <li>
                <strong>pop_back:</strong> Remove last element
              </li>
              <li>
                <strong>insert:</strong> Insert at specific position
              </li>
              <li>
                <strong>erase:</strong> Remove from specific position
              </li>
              <li>
                <strong>operator[]:</strong> Direct access by index
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Dynamic:</strong> Automatic resizing
              </li>
              <li>
                <strong>Contiguous:</strong> Elements stobackground in
                continuous memory
              </li>
              <li>
                <strong>Random Access:</strong> O(1) access by index
              </li>
              <li>
                <strong>Cache Friendly:</strong> Good memory locality
              </li>
              <li>
                <strong>Use Cases:</strong> General purpose dynamic arrays,
                matrices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
