import React, { useState, useEffect } from "react";

const linearStructures = [
  { id: "stack", name: "Stack" },
  { id: "queue", name: "Queue" },
  { id: "deque", name: "Deque" },
  { id: "vector", name: "Vector" },
  { id: "array", name: "Array" },
  { id: "linked-list", name: "Linked List" },
  { id: "doubly-linked-list", name: "Doubly Linked List" },
  { id: "circular-linked-list", name: "Circular Linked List" },
];

function LinearAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStructure, setCurrentStructure] = useState("stack");
  const [stackData, setStackData] = useState([]);
  const [queueData, setQueueData] = useState([]);
  const [arrayData, setArrayData] = useState([]);

  const animateStack = async () => {
    setIsAnimating(true);
    const newStack = [];
    for (let i = 1; i <= 5; i++) {
      newStack.push(i * 10);
      setStackData([...newStack]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    while (newStack.length > 2) {
      newStack.pop();
      setStackData([...newStack]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  const animateQueue = async () => {
    setIsAnimating(true);
    const newQueue = [];
    for (let i = 1; i <= 5; i++) {
      newQueue.push(i * 15);
      setQueueData([...newQueue]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    while (newQueue.length > 2) {
      newQueue.shift();
      setQueueData([...newQueue]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  const animateArray = async () => {
    setIsAnimating(true);
    const newArray = [];
    for (let i = 0; i < 6; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
      setArrayData([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArrayData([...newArray]);
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        if (currentStructure === "stack") {
          animateStack();
        } else if (currentStructure === "queue") {
          animateQueue();
        } else {
          animateArray();
        }
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating, currentStructure]);

  const getElementColor = (value, index) => {
    const hue = (value * 3 + index * 40) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="bg-white h-full rounded-xl shadow-lg border border-slate-200 flex flex-col">
      <div className="flex-shrink-0 p-4 border-b border-slate-100">
        <div className="text-center">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
            Linear Structure Demo
          </h3>
          <p className="text-slate-600 text-sm">
            Sequential data organization - {currentStructure.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 mx-4 my-2 rounded-lg">
        {currentStructure === "stack" && (
          <div className="flex flex-col items-center justify-between h-full w-full max-w-xs">
            <div className="flex-shrink-0 mb-4">
              <div className="text-blue-900 font-semibold text-sm flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                📚 STACK - LIFO
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end items-center w-full min-h-0 overflow-hidden">
              <div className="flex flex-col-reverse gap-2 items-center">
                {stackData.map((value, index) => (
                  <div
                    key={`stack-${index}-${value}`}
                    className="w-28 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md transition-all duration-500 border border-white/20 hover:scale-105"
                    style={{
                      backgroundColor: getElementColor(value, index),
                      transform: `translateY(${index * -2}px)`,
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="w-32 h-1 bg-slate-300 rounded-full mt-2 opacity-50"></div>
            </div>

            <div className="flex-shrink-0 mt-4">
              <div className="flex gap-1 text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  Push
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  Pop
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  Peek
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 p-3 border-t border-slate-100">
        <div className="text-center">
          <div
            className={`inline-flex items-center space-x-2 ${
              isAnimating ? "text-blue-600" : "text-slate-500"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isAnimating ? "bg-blue-500 animate-pulse" : "bg-slate-400"
              }`}
            ></div>
            <span className="font-medium text-xs">
              {isAnimating
                ? `${currentStructure.toUpperCase()} operations...`
                : "Ready for next demo"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinearExploreSection() {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-xl p-6 text-white shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">📈</div>
        <h2 className="text-4xl font-bold mb-3 text-center">
          Master Linear Structures!
        </h2>
        <p className="text-sm mb-4 text-blue-100 leading-relaxed text-center">
          Understand sequential data organization and efficient access patterns.
        </p>
        <div className="text-center">
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Explore Now! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function LinearTitle() {
  return (
    <div className="text-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-xl p-6 border border-blue-100 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-6xl font-extrabold text-gray-800 leading-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
        Linear Data Structures
      </h1>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed px-2 mb-4">
        Sequential organization where elements are arranged in linear order with
        clear predecessor-successor relationships.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          📚 Sequential
        </div>
        <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-medium">
          🔄 Ordered
        </div>
        <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ Simple
        </div>
      </div>
    </div>
  );
}

export default function LinearDataStructuresTemp() {
  return (
    <div className="h-screen p-4 bg-gray-50">
      <div className="grid grid-cols-12 grid-rows-12 gap-3 h-full max-h-screen">
        <div className="col-span-5 row-span-6 col-start-2 row-start-1">
          <LinearTitle />
        </div>

        <div className="col-span-6 row-span-4 col-start-1 row-start-7">
          <LinearExploreSection />
        </div>

        <div className="col-span-6 row-span-10 col-start-7 row-start-1">
          <LinearAnimation />
        </div>

        <div className="col-span-12 row-span-2 m-3 col-start-1 row-start-11 grid grid-cols-8 grid-rows-1 gap-5">
          {linearStructures.map((link, index) => (
            <button
              key={index}
              className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm hover:shadow-md min-h-12"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
