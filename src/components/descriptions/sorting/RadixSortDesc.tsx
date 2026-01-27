import React from "react";

export default function RadixSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Radix Sort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Radix Sort is a non-comparison sorting algorithm that processes digits
          from least significant to most significant. It uses counting sort as a
          subroutine to sort by individual digits, using buckets (0-9) for
          decimal numbers.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Find maximum digits • 2) Sort by each digit
          position using stable sorting • 3) Collect from buckets in order
        </div>
        <p className="text-background-600 text-sm mt-1">
          <strong>Time Complexity:</strong> O(d × (n + k)) where d=digits,
          k=range •<strong> Space Complexity:</strong> O(n + k) •
          <strong> Stable:</strong> Yes •<strong> Comparison-based:</strong> No
        </p>
      </div>
    </div>
  );
}
