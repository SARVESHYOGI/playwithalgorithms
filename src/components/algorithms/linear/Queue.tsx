import { useState } from "react";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>("40");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [maxSize, setMaxSize] = useState(8);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operationType, setOperationType] = useState<
    "enqueue" | "dequeue" | "peek" | null
  >(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const enqueue = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;
    if (queue.length >= maxSize) {
      setCurrentOperation("Queue Overflow! Cannot enqueue to full queue");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("enqueue");
    setCurrentOperation(`Enqueuing ${value} to the rear of queue...`);

    const newQueue = [...queue, value];
    setQueue(newQueue);
    setHighlightedIndex(newQueue.length - 1);

    await sleep(speed);

    setLastOperation(`Enqueued ${value}. Queue size: ${newQueue.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const dequeue = async () => {
    if (queue.length === 0 || isAnimating) {
      if (queue.length === 0) {
        setCurrentOperation("Queue Underflow! Cannot dequeue from empty queue");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("dequeue");
    const frontValue = queue[0];
    setCurrentOperation(`Dequeuing ${frontValue} from the front of queue...`);
    setHighlightedIndex(0);

    await sleep(speed);

    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setLastOperation(`Dequeued ${frontValue}. Queue size: ${newQueue.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const peek = async () => {
    if (queue.length === 0 || isAnimating) {
      if (queue.length === 0) {
        setCurrentOperation("Empty queue! Nothing to peek");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("peek");
    const frontValue = queue[0];
    setCurrentOperation(`Peeking at front element: ${frontValue}`);
    setHighlightedIndex(0);

    await sleep(speed);

    setLastOperation(`Front element is ${frontValue}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setQueue([]);
    setLastOperation("Queue cleabackground");
    setCurrentOperation("");
    setOperationType(null);
  };

  const getElementColor = (index: number, value: number) => {
    if (highlightedIndex === index) {
      if (operationType === "enqueue") return "#10b981";
      if (operationType === "dequeue") return "#ef4444";
      if (operationType === "peek") return "#3b82f6";
    }
    const hue = (value * 2.5 + index * 30) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Queue Visualizer
        </h2>
        <p className="text-background-600">
          FIFO (First In, First Out) - Enqueue at rear, Dequeue from front
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {queue.length}
          </div>
          <div className="text-sm text-background-600">Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {queue.length > 0 ? queue[0] : "Empty"}
          </div>
          <div className="text-sm text-background-600">Front</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {queue.length > 0 ? queue[queue.length - 1] : "Empty"}
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
          {currentOperation || lastOperation || "Ready for queue operations"}
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
          Queue Structure (Front ← → Rear)
        </h3>

        <div className="relative">
          <div className="border-2 border-background-300 rounded-lg p-6 min-h-[200px] bg-gradient-to-r from-background-50 to-background-100 relative overflow-x-auto">
            <div className="absolute -top-8 left-4 bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              FRONT (Dequeue)
            </div>
            <div className="absolute -top-8 right-4 bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              REAR (Enqueue)
            </div>

            {queue.length === 0 && (
              <div className="flex items-center justify-center h-full text-background-400 font-medium">
                Empty Queue
              </div>
            )}

            <div className="flex gap-3 items-center justify-center min-h-[120px]">
              {queue.map((value, index) => (
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

                  {index === 0 && queue.length > 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Front
                    </div>
                  )}
                  {index === queue.length - 1 && queue.length > 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Rear
                    </div>
                  )}
                  {queue.length === 1 && (
                    <div className="text-xs text-background-600 font-bold mt-1">
                      Front & Rear
                    </div>
                  )}

                  {index < queue.length - 1 && (
                    <div
                      className="absolute top-1/2 transform -tranbackground-y-1/2 text-background-400 text-2xl"
                      style={{ left: `${(index + 1) * 100 + 60}px` }}
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -tranbackground-x-1/2 text-sm text-background-500">
              Capacity: {queue.length}/{maxSize}
              {queue.length === maxSize && (
                <span className="ml-2 bg-background-600 text-background px-2 py-1 rounded text-xs font-bold animate-pulse">
                  FULL
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-2xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Operation Flow
        </h4>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-3 py-2 rounded font-bold">
              ENQUEUE
            </div>
            <div className="text-xs text-background-600 mt-1">Add to rear</div>
          </div>
          <div className="text-2xl text-background-400">→</div>
          <div className="border-2 border-background-300 rounded px-4 py-2 bg-background-50">
            <div className="text-center font-medium">QUEUE</div>
            <div className="text-xs text-background-500">FIFO Structure</div>
          </div>
          <div className="text-2xl text-background-400">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-background-500 text-background px-3 py-2 rounded font-bold">
              DEQUEUE
            </div>
            <div className="text-xs text-background-600 mt-1">
              Remove from front
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={enqueue}
          disabled={isAnimating || queue.length >= maxSize}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || queue.length >= maxSize
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Enqueue
        </button>

        <button
          onClick={dequeue}
          disabled={isAnimating || queue.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || queue.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Dequeue
        </button>

        <button
          onClick={peek}
          disabled={isAnimating || queue.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || queue.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Peek
        </button>

        <button
          onClick={clear}
          disabled={isAnimating || queue.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || queue.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Clear
        </button>
      </div>

      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Queue Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Enqueue:</strong> Add element to rear of queue
              </li>
              <li>
                <strong>Dequeue:</strong> Remove and return front element
              </li>
              <li>
                <strong>Peek/Front:</strong> View front element without removing
              </li>
              <li>
                <strong>isEmpty:</strong> Check if queue is empty
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>FIFO:</strong> First In, First Out principle
              </li>
              <li>
                <strong>Time Complexity:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Task scheduling, breadth-first
                search, print queues
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
