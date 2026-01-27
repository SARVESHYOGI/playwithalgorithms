import React from "react";

export default function LinearSearchDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Linear Search Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Linear search (also called sequential search) checks each element in
          the array one by one from start to finish until it finds the target
          value or reaches the end of the array.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Best Case:</strong> O(1) - target is first element •
          <strong> Average Case:</strong> O(n/2) •<strong> Worst Case:</strong>{" "}
          O(n) - target is last or not present
        </div>
        <p className="text-background-600 text-sm mt-1">
          <strong>Space Complexity:</strong> O(1) •<strong> Works on:</strong>{" "}
          Sorted and unsorted arrays •<strong> Simple:</strong> Easy to
          implement and understand
        </p>
      </div>
    </div>
  );
}
