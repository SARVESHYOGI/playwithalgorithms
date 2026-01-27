import React from "react";

export default function SelectionSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Selection Sort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Selection Sort divides the array into sorted and unsorted regions. It
          repeatedly finds the minimum element from the unsorted region and
          places it at the beginning of the unsorted region, effectively growing
          the sorted region.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Find minimum in unsorted portion • 2) Swap
          with first unsorted element • 3) Move boundary of sorted region • 4)
          Repeat until sorted
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n²), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
