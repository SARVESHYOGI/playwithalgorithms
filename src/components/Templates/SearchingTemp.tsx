"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { searchAlgorithms } from "@/lib/data";

function SearchingAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const generateRandomArray = () => {
    const arr = Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 80) + 10
    );
    return arr.sort((a, b) => a - b);
  };

  const animateLinearSearch = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const arr = generateRandomArray();
    setAnimationData([...arr]);

    const randomTarget = arr[Math.floor(Math.random() * arr.length)];
    setTarget(randomTarget);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    let found = false;
    for (let i = 0; i < arr.length; i++) {
      setCurrentIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (arr[i] === randomTarget) {
        setFoundIndex(i);
        found = true;
        break;
      }
    }

    if (!found) {
      setFoundIndex(-1);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnimating(false);
    setCurrentIndex(null);
    setFoundIndex(null);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        animateLinearSearch();
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 8000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const getBarHeight = (value: number) => {
    return (value / 90) * 120 + 20;
  };

  const getBarStyle = (value: number, index: number) => {
    if (foundIndex === index) {
      return {
        width: "36px",
        height: `${getBarHeight(value)}px`,
        backgroundColor: "hsl(120, 70%, 50%)",
        borderRadius: "50%",
        transform: "scale(1.3)",
        transition: "all 0.5s ease",
        boxShadow: "0 6px 12px rgba(0, 128, 0, 0.4)",
      };
    }
    if (currentIndex === index) {
      return {
        width: "28px",
        height: `${getBarHeight(value)}px`,
        backgroundColor: "hsl(40, 90%, 60%)",
        borderRadius: "6px",
        transition: "all 0.3s ease",
      };
    }
    const hue = (value * 4 + index * 30) % 360;
    return {
      width: "28px",
      height: `${getBarHeight(value)}px`,
      backgroundColor: `hsl(${hue}, 70%, 60%)`,
      borderRadius: "6px",
      transition: "all 0.3s ease",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Live Searching Animation
        </h3>
        <p className="text-gray-600">
          Searching for the number{" "}
          <span className="font-bold text-indigo-600 text-lg">{target}</span>{" "}
          using Linear Search!
        </p>
      </div>

      <div className="flex justify-center items-end gap-2 h-48 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-4">
        {animationData.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm flex items-end justify-center"
            style={getBarStyle(value, index)}
          >
            <span className="text-xs font-semibold text-white drop-shadow-sm pb-2">
              {value}
            </span>
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
            {isAnimating
              ? "Searching in progress..."
              : foundIndex !== null && foundIndex !== -1
              ? `Target found at index ${foundIndex}!`
              : foundIndex === -1
              ? "Target not found."
              : "Ready to search again"}
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
        <h2 className="text-4xl font-bold mb-6 text-text-900">
          Ready to Explore?
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Dive into interactive visualizations and see these algorithms in
          action!
        </p>
        <Link href="/searching">
          <Button className="p-12 text-2xl font-bold rounded-xl bg-background-700 hover:bg-background-800 hover:cursor-pointer">
            Let&apos;s Search! 🔎
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SearchingTitle() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-6xl md:text-7xl font-extrabold text-accent-950 drop-shadow-lg">
        Searching Algorithms
      </h1>
      <p className="text-lg md:text-xl text-accent-800 max-w-3xl mx-auto leading-relaxed px-4">
        Discover how computers find data efficiently. From simple linear scans
        to highly optimized binary searches, this is a core concept in computer
        science.
      </p>
    </div>
  );
}

export default function SearchingTemp() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-5 bg-background-50">
      <div className="col-span-1 lg:col-span-5 flex flex-col items-center">
        <SearchingTitle />
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full">
          <div className="w-full lg:w-2/3">
            <SearchingAnimation />
          </div>
          <div className="w-full lg:w-1/3">
            <Exp />
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col p-4 bg-background text-white rounded-lg shadow-md h-full justify-evenly">
        {searchAlgorithms.map((algorithm) => (
          <Link
            key={algorithm.id}
            href={`/searching/${algorithm.id}`}
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
