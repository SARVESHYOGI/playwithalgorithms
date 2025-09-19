"use client";

import { sortingAlgorithms } from "@/lib/data";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BubbleSortVisualizer from "@/components/algorithms/sorting/BubbleSortVisualizer";
import SelectionSortVisualizer from "@/components/algorithms/sorting/SelectionSortVisualizer";
import MergeSortVisualizer from "@/components/algorithms/sorting/MergeSortVisualizer";
import QuickSortVisualizer from "@/components/algorithms/sorting/QuickSortVisualizer";
import HeapSortVisualizer from "@/components/algorithms/sorting/HeapSortVisualizer";
import RadixSortVisualizer from "@/components/algorithms/sorting/RadixSortVisualizer";
import BucketSortVisualizer from "@/components/algorithms/sorting/BucketSortVisualizer";
import InsertionSortVisualizer from "@/components/algorithms/sorting/InsertionSortVisualizer";
import ThemeToggle from "@/components/ThemeToggle";

export default function SortingAlgorithmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [algorithm, setAlgorithm] = useState<
    { id: string; name: string; description: string } | undefined
  >(undefined);
  const [size, setSize] = useState<number>(10);
  const [elements, setElements] = useState<number[]>([]);
  const [visualize, setVisualize] = useState(false);

  useEffect(() => {
    const foundAlgorithm = sortingAlgorithms.find((alg) => alg.id === id);
    setAlgorithm(foundAlgorithm);
  }, [id]);

  const Randomize = () => {
    setVisualize(false);
    if (size <= 0) {
      alert("Please enter a valid size greater than 0");
      return;
    }
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setElements(arr);
  };

  const handleElementChange = (index: number, value: string) => {
    const newElements = [...elements];
    const parsedValue = parseInt(value);
    newElements[index] = isNaN(parsedValue) ? 0 : parsedValue;
    setElements(newElements);
  };

  if (!algorithm) {
    return <div className="text-center text-lg p-8">Algorithm not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-background  py-10 px-4 flex flex-col items-center relative">
      <Button
        className="absolute top-6 left-8 bg-background-100 hover:bg-background-200 text-background-900 font-semibold py-2 px-4 rounded cursor-pointer shadow"
        onClick={() => router.back()}
      >
        ← Go Back
      </Button>
      <div className="absolute top-6 right-[10%]">
        <ThemeToggle />
      </div>
      <div className="text-4xl font-extrabold text-background-900 mb-4">
        {algorithm.name}
      </div>
      <p className="text-lg text-background-600 max-w-3xl text-center mb-8">
        {algorithm.description}
      </p>

      <div className="flex flex-col w-full bg-background rounded-lg shadow p-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <label htmlFor="size" className="font-medium">
            Number of Elements
          </label>
          <Input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            placeholder="e.g., 6"
            className="w-24"
          />
          <Button onClick={Randomize} className="cursor-pointer">
            Randomize Elements
          </Button>
        </div>

        <div className="mt-6 mx-auto">
          <h3 className="text-lg font-semibold mb-2">Enter Elements</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: size }).map((_, index) => {
              const value =
                elements[index] !== undefined ? elements[index].toString() : "";
              return (
                <Input
                  key={index}
                  value={value}
                  onChange={(e) => handleElementChange(index, e.target.value)}
                  className="w-20 text-center"
                />
              );
            })}
          </div>
        </div>

        <Button
          onClick={() => setVisualize(true)}
          className="mt-6 w-fit bg-background-600 hover:bg-background-500 mx-auto cursor-pointer"
        >
          Visualize
        </Button>
      </div>

      <div className="mt-10 w-full">
        {visualize && id === "bubble-sort" && (
          <BubbleSortVisualizer array={elements} />
        )}
        {visualize && id === "selection-sort" && (
          <SelectionSortVisualizer array={elements} />
        )}
        {visualize && id === "insertion-sort" && (
          <InsertionSortVisualizer array={elements} />
        )}
        {visualize && id === "merge-sort" && (
          <MergeSortVisualizer array={elements} />
        )}
        {visualize && id === "quick-sort" && (
          <QuickSortVisualizer array={elements} />
        )}
        {visualize && id === "heap-sort" && (
          <HeapSortVisualizer array={elements} />
        )}
        {visualize && id === "radix-sort" && (
          <RadixSortVisualizer array={elements} />
        )}
        {visualize && id === "bucket-sort" && (
          <BucketSortVisualizer array={elements} />
        )}
        {visualize &&
          id !== "bubble-sort" &&
          id !== "selection-sort" &&
          id !== "insertion-sort" &&
          id !== "merge-sort" &&
          id !== "quick-sort" &&
          id !== "heap-sort" &&
          id !== "radix-sort" &&
          id !== "bucket-sort" && (
            <div className="text-center text-lg p-8">
              Visualization for {algorithm.name} is not available yet.
            </div>
          )}
      </div>
    </div>
  );
}
