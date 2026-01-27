import React from "react";

export default function QuickSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How QuickSort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          QuickSort is a divide-and-conquer algorithm that selects a
          &rsquo;pivot&rsquo; element and partitions the array around it.
          Elements smaller than the pivot go to the left, larger elements go to
          the right.
        </p>
        <p className="text-background-600 text-sm">
          <strong>Time Complexity:</strong> Average O(n log n), Worst case O(n²)
          •<strong> Space Complexity:</strong> O(log n) •
          <strong> In-place:</strong> Yes •<strong> Stable:</strong> No
        </p>
      </div>
    </div>
  );
}
