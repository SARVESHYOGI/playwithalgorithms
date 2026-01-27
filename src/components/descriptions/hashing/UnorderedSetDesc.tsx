import React from "react";

export default function UnorderedSetDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          UnorderedSet Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>insert(value):</strong> Add value to set (ignores
                duplicates)
              </li>
              <li>
                <strong>find(value):</strong> Check if value exists in set
              </li>
              <li>
                <strong>erase(value):</strong> Remove value from set
              </li>
              <li>
                <strong>size():</strong> Get number of elements in set
              </li>
              <li>
                <strong>empty():</strong> Check if set is empty
              </li>
            </ul>

            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Set Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Union:</strong> Combine elements from multiple sets
              </li>
              <li>
                <strong>Intersection:</strong> Find common elements
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>No Duplicates:</strong> Each element appears at most
                once
              </li>
              <li>
                <strong>Unordered:</strong> No specific ordering of elements
              </li>
              <li>
                <strong>Average Time:</strong> O(1) for insert, find, erase
              </li>
              <li>
                <strong>Worst Case:</strong> O(n) when all elements hash to same
                bucket
              </li>
              <li>
                <strong>Space:</strong> O(n) for elements + O(b) for buckets
              </li>
              <li>
                <strong>Use Cases:</strong> Membership testing, removing
                duplicates, set operations
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>C++ STL Context:</strong> unordered_set is the hash table
          implementation of a set, while std::set uses a balanced binary search
          tree (red-black tree). Use unordered_set when you need fast
          average-case performance and dont need ordered iteration.
        </div>
      </div>
    </div>
  );
}
