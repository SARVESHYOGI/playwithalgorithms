"use client";

import { sortingAlgorithms } from "@/lib/data";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BubbleSortVisualizer from "@/components/algorithms/sorting/BubbleSortVisualizer";

export default function SortingAlgorithmPage({
  params,
}: {
  params: { id: string };
}) {
  const [algorithm, setAlgorithm] = useState<
    { id: string; name: string; description: string } | undefined
  >(undefined);
  const [size, setSize] = useState<number>(0);
  const [elements, setElements] = useState<number[]>([]);
  const [visualize, setVisualize] = useState(false);

  useEffect(() => {
    const foundAlgorithm = sortingAlgorithms.find(
      (alg) => alg.id === params.id
    );
    setAlgorithm(foundAlgorithm);
  }, [params.id]);

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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 flex flex-col items-center">
      <div className="text-4xl font-extrabold text-gray-800 mb-4">
        {algorithm.name}
      </div>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-8">
        {algorithm.description}
      </p>

      <div className="flex flex-col w-full bg-white rounded-lg shadow p-6">
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
          <Button onClick={Randomize}>Randomize Elements</Button>
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
          className="mt-6 w-fit bg-green-600 hover:bg-green-700 mx-auto"
        >
          Visualize
        </Button>
      </div>

      <div className="mt-10 w-full">
        {visualize && <BubbleSortVisualizer array={elements} />}
      </div>
    </div>
  );
}
