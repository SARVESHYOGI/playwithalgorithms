import React from "react";

export default function HeapSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How HeapSort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          HeapSort is a comparison-based sorting algorithm that uses a binary
          heap data structure. It first builds a max heap, then repeatedly
          extracts the maximum element and places it at the end.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Phase 1:</strong> Build max heap (heapify from bottom-up) •
          <strong> Phase 2:</strong> Extract max elements one by one
        </div>
        <p className="text-background-600 text-sm mt-1">
          <strong>Time Complexity:</strong> O(n log n) always •
          <strong> Space Complexity:</strong> O(1) •<strong> In-place:</strong>{" "}
          Yes •<strong> Stable:</strong> No
        </p>
      </div>
    </div>
  );
}
