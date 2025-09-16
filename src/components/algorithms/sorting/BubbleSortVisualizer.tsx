"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BubbleSortVisualizer({
  array: initialArray,
}: {
  array?: number[];
}) {
  const [array, setArray] = useState<number[]>(
    initialArray || [64, 34, 25, 12, 22, 11, 90]
  );
  const [isSorting, setIsSorting] = useState(false);
  const [pointerI, setPointerI] = useState<number | null>(null);
  const [pointerJ, setPointerJ] = useState<number | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setPointerI(j);
        setPointerJ(j + 1);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await sleep(600);
      }
    }

    setPointerI(null);
    setPointerJ(null);
    setIsSorting(false);
  };

  const getColor = (value: number, index: number) => {
    const hue = (value * 4 + index * 15) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Bubble Sort Visualization
      </h2>

      <div className="flex gap-3 w-full items-end justify-center overflow-x-auto border p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 min-h-[300px]">
        {array.map((value, index) => (
          <div className="flex flex-col items-center" key={index}>
            <motion.div
              layout
              className={`rounded-t-lg flex items-end justify-center text-white font-bold shadow-md ${
                pointerI === index || pointerJ === index
                  ? "ring-4 ring-yellow-400 scale-105"
                  : ""
              }`}
              style={{
                width: "48px",
                height: `${Math.max(value * 3, 36)}px`,
                backgroundColor: getColor(value, index),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <span className="pb-2 text-lg">{value}</span>
            </motion.div>

            <div className="h-10 mt-2 flex flex-col items-center justify-center">
              {pointerI === index && (
                <div className="text-sm text-red-500 font-bold">
                  <div>↓</div>
                  <div>i</div>
                </div>
              )}
              {pointerJ === index && (
                <div className="text-sm text-blue-500 font-bold">
                  <div>↓</div>
                  <div>j</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={bubbleSort}
          disabled={isSorting}
          className="px-6 py-2 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
        >
          {isSorting ? "Sorting..." : "Start Sort"}
        </Button>
      </div>
    </div>
  );
}
