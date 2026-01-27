import React from "react";

export default function BucketSortDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-2">
          How Bucket Sort Works:
        </h3>
        <p className="text-background-600 text-sm mb-2">
          Bucket Sort distributes elements into a fixed number of buckets based
          on their value ranges. Each bucket is then sorted individually
          (usually with insertion sort), and finally all elements are collected
          from the buckets in order to produce the sorted array.
        </p>
        <div className="text-background-600 text-sm">
          <strong>Steps:</strong> 1) Create buckets for value ranges • 2)
          Distribute elements into appropriate buckets • 3) Sort each bucket
          individually • 4) Collect elements from buckets in order
        </div>
        <div className="text-background-600 text-sm mt-2">
          <strong>Time Complexity:</strong> Best case O(n + k), Average case O(n
          + k), Worst case O(n²) where k is the number of buckets
        </div>
      </div>
    </div>
  );
}
