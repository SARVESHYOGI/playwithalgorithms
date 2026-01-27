import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  accentColors,
  primaryColors,
  secondaryColors,
  sortingAlgorithms,
} from "@/lib/data";

function SortingAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState<number[]>([]);

  const generateRandomArray = () => {
    return Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 80) + 10,
    );
  };

  const animateSorting = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const arr = generateRandomArray();
    setAnimationData([...arr]);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setAnimationData([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnimating(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        animateSorting();
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 6000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const getBarHeight = (value: number) => {
    return (value / 90) * 120 + 20;
  };

  const getBarColor = (value: number, index: number) => {
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
    <div className="bg-background rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-950 mb-2">
          Live Sorting Animation
        </h3>
        <p className="text-text-700">
          Watch as numbers get sorted in real-time!
        </p>
      </div>

      <div className="flex justify-center items-end gap-2 h-48 bg-gradient-to-b from-background-200 to-transparent rounded-lg p-4">
        {animationData.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className="rounded-t-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
            style={{
              width: "28px",
              height: `${getBarHeight(value)}px`,
              backgroundColor: getBarColor(value, index),
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div className="w-full h-full flex items-end justify-center pb-2">
              <span className="text-xs font-semibold text-white drop-shadow-sm">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <div
          className={`inline-flex items-center space-x-2 ${
            isAnimating ? "text-background-950" : "text-background-500"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isAnimating
                ? "bg-background-950 animate-pulse"
                : "bg-background-400"
            }`}
          ></div>
          <span className="font-medium">
            {isAnimating ? "Sorting in progress..." : "Ready to sort again"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Exp() {
  return (
    <div className="text-center">
      <div className="bg-primary rounded-3xl p-10 text-background  shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-background ">
          Ready to Explore?
        </h2>
        <p className="text-xl mb-8 text-background-100">
          Dive into interactive visualizations and see these algorithms in
          action!
        </p>
        <Link
          href="/sorting"
          className="w-full h-full bg-primary hover:cursor-pointer"
        >
          <Button className="p-12 text-2xl font-bold rounded-xl bg-secondary text-text-950 cursor-pointer hover:bg-secondary/70 dark:text-black">
            Let&apos;s Sort! 🚀
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SortingTitle() {
  return (
    <div className="text-center my-2">
      <h1 className="text-6xl md:text-7xl font-extrabold text-primary-950 leading-tight  drop-shadow-lg">
        Sorting Algorithms
      </h1>
      <p className="text-lg md:text-xl text-primary-800 max-w-3xl mx-auto leading-relaxed px-4">
        Explore the fascinating world of sorting algorithms through interactive
        visualizations. Understanding how data gets organized is fundamental to
        computer science and programming.
      </p>
    </div>
  );
}

export default function SortingTemp() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 bg-background h-full m-0 p-0">
      <div className="col-span-1 lg:col-span-5 flex flex-col items-center">
        <SortingTitle />
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full">
          <div className="w-full lg:w-2/3">
            <SortingAnimation />
          </div>
          <div className="w-full lg:w-1/3">
            <Exp />
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col p-4 text-background h-full justify-around">
        {sortingAlgorithms.map((algorithm) => (
          <Link
            key={algorithm.id}
            href={`/sorting/${algorithm.id}`}
            className="h-full my-1 bg-accent-300 hover:cursor-pointer"
          >
            <Button className="w-full h-full bg-primary hover:cursor-pointer hover:bg-primary/70">
              {algorithm.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
