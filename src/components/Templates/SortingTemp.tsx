import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { sortingAlgorithms } from "@/lib/data";

function SortingAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState<number[]>([]);

  const generateRandomArray = () => {
    return Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 80) + 10
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
    const hue = (value * 4 + index * 30) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="bg-background-100 rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Live Sorting Animation
        </h3>
        <p className="text-gray-600">
          Watch as numbers get sorted in real-time!
        </p>
      </div>

      <div className="flex justify-center items-end gap-2 h-48 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
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
            isAnimating ? "text-green-600" : "text-gray-500"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              isAnimating ? "bg-green-500 animate-pulse" : "bg-gray-400"
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
      <div className="bg-gradient-to-r from-background-400 via-background-500 to-background-600 rounded-3xl p-10 text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-text-950">
          Ready to Explore?
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Dive into interactive visualizations and see these algorithms in
          action!
        </p>
        <Link href="/sorting">
          <Button className="p-12 text-2xl font-bold rounded-xl bg-background-700 hover:bg-background-800 hover:cursor-pointer">
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

      <div className="col-span-1 flex flex-col p-4 text-white rounded-lg shadow-md bg-background-100 h-full justify-around">
        {sortingAlgorithms.map((algorithm) => (
          <Link
            key={algorithm.id}
            href={`/sorting/${algorithm.id}`}
            className="h-full my-1 bg-accent-300 hover:cursor-pointer"
          >
            <Button className="w-full h-full bg-accent hover:cursor-pointer">
              {algorithm.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
