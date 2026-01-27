import React from "react";

export default function InsertionSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Insertion Sort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Insertion Sort builds a sorted array one element at a time by taking
          each element from the unsorted portion and inserting it into its
          correct position within the already sorted portion. Its like sorting
          playing cards in your hand.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Start with second element as key • 2)
          Compare key with sorted elements • 3) Shift larger elements right • 4)
          Insert key at correct position
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n), Average case O(n²),
          Worst case O(n²) • <strong>Space Complexity:</strong> O(1)
        </div>
      </div>
    </div>
  );
}
