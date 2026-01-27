import React from "react";

export default function UnorderedMapDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          UnorderedMap Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>insert/put(key, value):</strong> Add or update key-value
                pair
              </li>
              <li>
                <strong>find/get(key):</strong> Retrieve value for given key
              </li>
              <li>
                <strong>erase/remove(key):</strong> Delete key-value pair
              </li>
              <li>
                <strong>count/contains(key):</strong> Check if key exists
              </li>
            </ul>

            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Collision Handling:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Separate Chaining:</strong> Each bucket is a linked list
              </li>
              <li>
                <strong>Chain Traversal:</strong> Linear search within each
                chain
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Average Time:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Worst Case:</strong> O(n) if all keys hash to same
                bucket
              </li>
              <li>
                <strong>Space:</strong> O(n) for entries + O(b) for buckets
              </li>
              <li>
                <strong>No Ordering:</strong> Keys are not stored in any
                particular order
              </li>
              <li>
                <strong>Dynamic Resizing:</strong> Can resize to maintain
                performance
              </li>
              <li>
                <strong>Use Cases:</strong> Caches, frequency counting, graph
                adjacency lists
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>Separate Chaining vs Linear Probing:</strong> Separate
          chaining handles collisions by storing multiple entries in each bucket
          using linked lists, while linear probing finds the next empty slot.
          Chaining never runs out of space but uses extra memory for pointers.
        </div>
      </div>
    </div>
  );
}
