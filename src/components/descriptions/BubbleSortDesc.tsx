import React from "react";

export default function BubbleSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-text-800 mb-2">How Bubble Sort Works:</h3>
        <p className="text-text-600 text-sm mb-2">
          Bubble Sort repeatedly compares adjacent elements and swaps them if
          theyre in the wrong order. After each pass, the largest unsorted
          element bubbles to its correct position at the end of the array. The
          algorithm continues until no swaps are needed.
        </p>
        <div className="text-text-600 text-sm">
          <strong>Steps:</strong> 1. Compare adjacent elements • 2. Swap if left
          &gt; right • 3. Continue through array • 4. Repeat until no swaps
          needed
        </div>
        <div className="text-text-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
