import StackDesc from "@/components/descriptions/linear/StackDesc";
import { useState } from "react";

export default function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>("40");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(800);
  const [maxSize, setMaxSize] = useState(8);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const push = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;
    if (stack.length >= maxSize) {
      setCurrentOperation("Stack Overflow! Cannot push to full stack");
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setCurrentOperation(`Pushing ${value} onto the stack...`);

    const newStack = [...stack, value];
    setStack(newStack);
    setHighlightedIndex(newStack.length - 1);

    await sleep(speed);

    setLastOperation(`Pushed ${value}. Stack size: ${newStack.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const pop = async () => {
    if (stack.length === 0 || isAnimating) {
      if (stack.length === 0) {
        setCurrentOperation("Stack Underflow! Cannot pop from empty stack");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    const topValue = stack[stack.length - 1];
    setCurrentOperation(`Popping ${topValue} from the stack...`);
    setHighlightedIndex(stack.length - 1);

    await sleep(speed);

    const newStack = stack.slice(0, -1);
    setStack(newStack);
    setLastOperation(`Popped ${topValue}. Stack size: ${newStack.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setIsAnimating(false);
  };

  const peek = async () => {
    if (stack.length === 0 || isAnimating) {
      if (stack.length === 0) {
        setCurrentOperation("Empty stack! Nothing to peek");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    const topValue = stack[stack.length - 1];
    setCurrentOperation(`Peeking at top element: ${topValue}`);
    setHighlightedIndex(stack.length - 1);

    await sleep(speed);

    setLastOperation(`Top element is ${topValue}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setStack([]);
    setLastOperation("Stack cleabackground");
    setCurrentOperation("");
  };

  const getElementColor = (index: number, value: number) => {
    if (highlightedIndex === index) return "#f0d332";
    const hue = (value * 2.5 + index * 30) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full  mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Stack Visualizer
        </h2>
        <p className="text-background-600">
          LIFO (Last In, First Out) - Operations happen at the top only
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {stack.length}
          </div>
          <div className="text-sm text-background-600">Size</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {stack.length > 0 ? stack[stack.length - 1] : "Empty"}
          </div>
          <div className="text-sm text-background-600">Top</div>
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
          {currentOperation || lastOperation || "Ready for stack operations"}
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

      <div className="bg-background rounded-xl p-6 shadow-md w-full max-w-md">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Stack Structure (Top → Bottom)
        </h3>

        <div className="relative">
          <div className="border-2 border-background-300 rounded-lg p-4 min-h-[300px] bg-gradient-to-b from-background-50 to-background-100 relative">
            <div className="absolute -top-6 left-1/2 transform -tranbackground-x-1/2 bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
              TOP
            </div>

            {stack.length === 0 && (
              <div className="flex items-center justify-center h-full text-background-400 font-medium">
                Empty Stack
              </div>
            )}

            <div className="flex flex-col-reverse gap-2">
              {stack.map((value, index) => (
                <div
                  key={`${index}-${value}`}
                  className={`rounded-lg p-4 text-background font-bold text-center transform transition-all duration-300 border-2 ${
                    highlightedIndex === index
                      ? "scale-105 border-background-400 shadow-lg animate-pulse"
                      : "border-background/30"
                  }`}
                  style={{
                    backgroundColor: getElementColor(index, value),
                    boxShadow:
                      highlightedIndex === index
                        ? "0 8px 25px rgba(239, 68, 68, 0.4)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="text-lg">{value}</div>
                  <div className="text-xs opacity-75">Index {index}</div>
                </div>
              ))}
            </div>

            <div className="absolute -right-8 top-0 h-full flex flex-col justify-between text-xs text-background-500">
              {Array.from({ length: maxSize }, (_, i) => (
                <div key={i} className="w-6 text-center">
                  {maxSize - 1 - i < stack.length ? "●" : "○"}
                </div>
              ))}
            </div>
          </div>

          {stack.length === maxSize && (
            <div className="absolute -bottom-6 left-1/2 transform -tranbackground-x-1/2 bg-background-600 text-background px-2 py-1 rounded text-xs font-bold animate-pulse">
              FULL
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={push}
          disabled={isAnimating || stack.length >= maxSize}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || stack.length >= maxSize
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Push
        </button>

        <button
          onClick={pop}
          disabled={isAnimating || stack.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || stack.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Pop
        </button>

        <button
          onClick={peek}
          disabled={isAnimating || stack.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || stack.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Peek
        </button>

        <button
          onClick={clear}
          disabled={isAnimating || stack.length === 0}
          className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || stack.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Clear
        </button>
      </div>

      <div>
        <StackDesc />
      </div>
    </div>
  );
}
