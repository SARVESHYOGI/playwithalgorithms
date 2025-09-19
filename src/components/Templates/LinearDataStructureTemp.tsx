import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [stackData, setStackData] = useState<number[]>([]);

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

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        animateStack();
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getElementColor = (value: number, index: number) => {
    // const theme = document.documentElement.getAttribute("data-theme");

    const primaryColors = [
      // "--primary-50",
      // "--primary-100",
      "--primary-200",
      "--primary-300",
      "--primary-400",
      "--primary-500",
      "--primary-600",
      "--primary-700",
      "--primary-800",
      "--primary-900",
      "--primary-950",
    ];
    const secondaryColors = [
      // "--secondary-50",
      // "--secondary-100",
      "--secondary-200",
      "--secondary-300",
      "--secondary-400",
      "--secondary-500",
      "--secondary-600",
      "--secondary-700",
      "--secondary-800",
      "--secondary-900",
      "--secondary-950",
    ];
    const accentColors = [
      // "--accent-50",
      // "--accent-100",
      "--accent-200",
      "--accent-300",
      "--accent-400",
      "--accent-500",
      "--accent-600",
      "--accent-700",
      "--accent-800",
      "--accent-900",
      "--accent-950",
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-950 mb-1">
            Linear Structure Demo
          </h1>
          <p className="text-primary-600 text-sm">
            Sequential data organization - STACK
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-background-900 to-transparent mx-4 my-2 rounded-lg">
        <div className="flex flex-col items-center justify-between h-full w-full max-w-xs">
          <div className="flex-shrink-0 mb-4">
            <div className="text-primary-900 font-semibold text-sm flex items-center gap-2 bg-background-50 px-3 py-1 rounded-full shadow-sm">
              📚 STACK - LIFO
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end items-center w-full min-h-0 overflow-hidden">
            <div className="flex flex-col-reverse gap-2 items-center">
              {stackData.map((value, index) => (
                <div
                  key={`stack-${index}-${value}`}
                  className="w-28 h-10 rounded-lg flex items-center justify-center text-text-50 font-bold text-sm shadow-md transition-all duration-500 border border-primary/20 hover:scale-105"
                  style={{
                    backgroundColor: getElementColor(value, index),
                    transform: `translateY(${index * -2}px)`,
                  }}
                >
                  {value}
                </div>
              ))}
            </div>

            <div className="w-32 h-1 bg-background-700 rounded-full mt-2 opacity-50"></div>
          </div>

          <div className="flex-shrink-0 mt-4">
            <div className="flex gap-1 text-xs">
              <span className="px-2 py-1 bg-background-950 text-background rounded-full font-medium">
                Push
              </span>
              <span className="px-2 py-1 bg-background-950 text-background rounded-full font-medium">
                Pop
              </span>
              <span className="px-2 py-1 bg-background-950 text-background rounded-full font-medium">
                Peek
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-3 border-t border-background-100">
        <div className="text-center">
          <div
            className={`inline-flex items-center space-x-2 ${
              isAnimating ? "text-text-950" : "text-background-950"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isAnimating
                  ? "bg-background-950 animate-pulse"
                  : "bg-background-950"
              }`}
            ></div>
            <span className="font-medium text-xs">
              {isAnimating ? `STACK operations...` : "Ready for next demo"}
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
      <div className="bg-primary rounded-xl p-6 text-background shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">📈</div>
        <h2 className="text-4xl font-bold mb-3 text-center">
          Master Linear Structures!
        </h2>
        <p className="text-sm mb-4 text-background-100 leading-relaxed text-center">
          Understand sequential data organization and efficient access patterns.
        </p>
        <div className="text-center">
          <button className="px-4 py-2 text-2xl font-bold rounded-xl bg-secondary text-text-950  hover:cursor-pointer hover:bg-secondary/70 dark:text-black">
            Explore Now! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function LinearTitle() {
  return (
    <div className="text-center p-6 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-6xl font-extrabold text-primary-950 drop-shadow-sm mb-4">
        Linear Data Structures
      </h1>
      <p className="text-sm md:text-base text-primary-700 leading-relaxed px-2 mb-4">
        Sequential organization where elements are arranged in linear order with
        clear predecessor-successor relationships.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          📚 Sequential
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          🔄 Ordered
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ Simple
        </div>
      </div>
    </div>
  );
}

export default function LinearDataStructuresTemp() {
  return (
    <div className="h-screen p-4 bg-background">
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
            <Link
              key={link.id}
              href={`/searching/${link.id}`}
              className="h-full my-1 bg-accent-300 hover:cursor-pointer"
            >
              <Button
                key={index}
                className="w-full h-full bg-primary hover:cursor-pointer hover:bg-primary/70"
              >
                {link.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
