import React from "react";

export default function BinarySearchDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Binary Search Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Binary Search is an efficient algorithm for finding an item from a
          sorted list. It works by repeatedly dividing the search interval in
          half. If the value is less than the middle element, it searches the
          left half; otherwise, it searches the right half. This continues until
          the value is found or the interval is empty.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Find middle element • 2) Compare with
          target • 3) Eliminate half of search space • 4) Repeat until found or
          exhausted
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> O(log n) •{" "}
          <strong>Space Complexity:</strong> O(1) •{" "}
          <strong>Prerequisite:</strong> Array must be sorted
        </div>
      </div>
    </div>
  );
}
