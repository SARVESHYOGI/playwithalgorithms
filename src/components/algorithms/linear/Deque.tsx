import { useState } from "react";

export default function DequeVisualizer() {
  const [deque, setDeque] = useState<number[]>([20, 30, 40]);
  const [inputValue, setInputValue] = useState<string>("50");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [maxSize, setMaxSize] = useState(8);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operationType, setOperationType] = useState<
    | "addFront"
    | "addRear"
    | "removeFront"
    | "removeRear"
    | "peekFront"
    | "peekRear"
    | null
  >(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const addFront = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;
    if (deque.length >= maxSize) {
      setCurrentOperation("Deque Overflow! Cannot add to full deque");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("addFront");
    setCurrentOperation(`Adding ${value} to the front of deque...`);

    const newDeque = [value, ...deque];
    setDeque(newDeque);
    setHighlightedIndex(0);

    await sleep(speed);

    setLastOperation(`Added ${value} to front. Deque size: ${newDeque.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const addRear = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;
    if (deque.length >= maxSize) {
      setCurrentOperation("Deque Overflow! Cannot add to full deque");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("addRear");
    setCurrentOperation(`Adding ${value} to the rear of deque...`);

    const newDeque = [...deque, value];
    setDeque(newDeque);
    setHighlightedIndex(newDeque.length - 1);

    await sleep(speed);

    setLastOperation(`Added ${value} to rear. Deque size: ${newDeque.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const removeFront = async () => {
    if (deque.length === 0 || isAnimating) {
      if (deque.length === 0) {
        setCurrentOperation("Deque Underflow! Cannot remove from empty deque");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("removeFront");
    const frontValue = deque[0];
    setCurrentOperation(`Removing ${frontValue} from the front of deque...`);
    setHighlightedIndex(0);

    await sleep(speed);

    const newDeque = deque.slice(1);
    setDeque(newDeque);
    setLastOperation(
      `Removed ${frontValue} from front. Deque size: ${newDeque.length}`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const removeRear = async () => {
    if (deque.length === 0 || isAnimating) {
      if (deque.length === 0) {
        setCurrentOperation("Deque Underflow! Cannot remove from empty deque");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("removeRear");
    const rearValue = deque[deque.length - 1];
    setCurrentOperation(`Removing ${rearValue} from the rear of deque...`);
    setHighlightedIndex(deque.length - 1);

    await sleep(speed);

    const newDeque = deque.slice(0, -1);
    setDeque(newDeque);
    setLastOperation(
      `Removed ${rearValue} from rear. Deque size: ${newDeque.length}`
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const peekFront = async () => {
    if (deque.length === 0 || isAnimating) {
      if (deque.length === 0) {
        setCurrentOperation("Empty deque! Nothing to peek at front");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("peekFront");
    const frontValue = deque[0];
    setCurrentOperation(`Peeking at front element: ${frontValue}`);
    setHighlightedIndex(0);

    await sleep(speed);

    setLastOperation(`Front element is ${frontValue}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const peekRear = async () => {
    if (deque.length === 0 || isAnimating) {
      if (deque.length === 0) {
        setCurrentOperation("Empty deque! Nothing to peek at rear");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("peekRear");
    const rearValue = deque[deque.length - 1];
    setCurrentOperation(`Peeking at rear element: ${rearValue}`);
    setHighlightedIndex(deque.length - 1);

    await sleep(speed);

    setLastOperation(`Rear element is ${rearValue}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setDeque([]);
    setLastOperation("Deque cleabackground");
    setCurrentOperation("");
    setOperationType(null);
  };

  const getElementColor = (index: number, value: number) => {
    if (highlightedIndex === index) {
      if (operationType === "addFront" || operationType === "addRear")
        return "#10b981"; // background for add operations
      if (operationType === "removeFront" || operationType === "removeRear")
        return "#ef4444"; // background for remove operations
      if (operationType === "peekFront" || operationType === "peekRear")
        return "#3b82f6"; // background for peek operations
    }
    const hue = (value * 2.5 + index * 30) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full  mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Deque Visualizer
        </h2>
        <p className="text-background-600">
          Double-ended Queue - Operations allowed at both ends
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {deque.length}
          </div>
          <div className="text-sm text-background-600">Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {deque.length > 0 ? deque[0] : "Empty"}
          </div>
          <div className="text-sm text-background-600">Front</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {deque.length > 0 ? deque[deque.length - 1] : "Empty"}
          </div>
          <div className="text-sm text-background-600">Rear</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {maxSize}
          </div>
          <div className="text-sm text-background-600">Max Size</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation || lastOperation || "Ready for deque operations"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center bg-background p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Value:
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500 w-20"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Speed:
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={1200}>Slow</option>
            <option value={800}>Medium</option>
            <option value={400}>Fast</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-background-700">
            Max Size:
          </label>
          <select
            value={maxSize}
            onChange={(e) => setMaxSize(Number(e.target.value))}
            disabled={isAnimating}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Deque Structure (Front ↔ Rear)
        </h3>

        <div className="relative">
          <div className="border-2 border-background-300 rounded-lg p-6 min-h-[220px] bg-gradient-to-r from-background-50 to-background-100 relative overflow-x-auto">
            <div className="absolute -top-8 left-4 bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              FRONT (Add/Remove)
            </div>
            <div className="absolute -top-8 right-4 bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              REAR (Add/Remove)
            </div>

            {deque.length === 0 && (
              <div className="flex items-center justify-center h-full text-background-400 font-medium">
                Empty Deque
              </div>
            )}

            <div className="flex gap-3 items-center justify-center min-h-[140px]">
              {deque.map((value, index) => (
                <div
                  key={`${index}-${value}`}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`rounded-lg p-4 text-background font-bold text-center transform transition-all duration-300 border-2 min-w-[80px] ${
                      highlightedIndex === index
                        ? "scale-110 border-background-400 shadow-lg animate-pulse"
                        : "border-background/30"
                    }`}
                    style={{
                      backgroundColor: getElementColor(index, value),
                      boxShadow:
                        highlightedIndex === index
                          ? "0 8px 25px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="text-lg">{value}</div>
                  </div>
                  <div className="text-xs text-background-500 mt-2">
                    Index {index}
                  </div>

                  {index === 0 && deque.length > 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Front
                    </div>
                  )}
                  {index === deque.length - 1 && deque.length > 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Rear
                    </div>
                  )}
                  {deque.length === 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Front & Rear
                    </div>
                  )}

                  {index < deque.length - 1 && (
                    <div
                      className="absolute top-1/2 transform -tranbackground-y-1/2 text-background-400 text-lg"
                      style={{ left: `${(index + 1) * 100 + 60}px` }}
                    >
                      ↔
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -tranbackground-x-1/2 text-sm text-background-500">
              Capacity: {deque.length}/{maxSize}
              {deque.length === maxSize && (
                <span className="ml-2 bg-background-600 text-background px-2 py-1 rounded text-xs font-bold animate-pulse">
                  FULL
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-4xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Deque Operations Flow
        </h4>
        <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              ADD FRONT
            </div>
            <div className="text-xs text-background-600 mt-1">addFront()</div>
          </div>
          <div className="text-xl text-background-400">↓</div>
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              REMOVE FRONT
            </div>
            <div className="text-xs text-background-600 mt-1">
              removeFront()
            </div>
          </div>
          <div className="text-2xl text-background-400 mx-4">←</div>
          <div className="border-2 border-background-300 rounded px-4 py-2 bg-background-50">
            <div className="text-center font-medium">DEQUE</div>
            <div className="text-xs text-background-500">Double-ended</div>
          </div>
          <div className="text-2xl text-background-400 mx-4">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              ADD REAR
            </div>
            <div className="text-xs text-background-600 mt-1">addRear()</div>
          </div>
          <div className="text-xl text-background-400">↓</div>
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              REMOVE REAR
            </div>
            <div className="text-xs text-background-600 mt-1">removeRear()</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl">
        <button
          onClick={addFront}
          disabled={isAnimating || deque.length >= maxSize}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length >= maxSize
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Add Front
        </button>

        <button
          onClick={addRear}
          disabled={isAnimating || deque.length >= maxSize}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length >= maxSize
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Add Rear
        </button>

        <button
          onClick={removeFront}
          disabled={isAnimating || deque.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Remove Front
        </button>

        <button
          onClick={removeRear}
          disabled={isAnimating || deque.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Remove Rear
        </button>

        <button
          onClick={peekFront}
          disabled={isAnimating || deque.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Peek Front
        </button>

        <button
          onClick={peekRear}
          disabled={isAnimating || deque.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || deque.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Peek Rear
        </button>
      </div>

      <button
        onClick={clear}
        disabled={isAnimating || deque.length === 0}
        className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
          isAnimating || deque.length === 0
            ? "bg-background-400 cursor-not-allowed"
            : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
        } text-background`}
      >
        Clear All
      </button>

      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Deque Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Front Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>addFront:</strong> Insert element at front
              </li>
              <li>
                <strong>removeFront:</strong> Remove element from front
              </li>
              <li>
                <strong>peekFront:</strong> View front element
              </li>
            </ul>
            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Rear Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>addRear:</strong> Insert element at rear
              </li>
              <li>
                <strong>removeRear:</strong> Remove element from rear
              </li>
              <li>
                <strong>peekRear:</strong> View rear element
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Double-ended:</strong> Operations at both ends
              </li>
              <li>
                <strong>Time Complexity:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Palindrome checking, sliding window
                problems, A* algorithm
              </li>
              <li>
                <strong>Advantage:</strong> Combines stack and queue
                functionality
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
