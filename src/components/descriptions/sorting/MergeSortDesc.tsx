import React from "react";

export default function MergeSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Merge Sort Works:
        </h3>
        <p className="text-background-600 text-sm">
          Merge sort is a divide-and-conquer algorithm that splits the array
          into smaller subarrays, sorts them recursively, and then merges them
          back together. It has a time complexity of O(n log n) and is stable,
          meaning equal elements maintain their relative order.
        </p>
      </div>
    </div>
  );
}
