import React from "react";

export default function HashMapDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          HashMap Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Put(key, value):</strong> Insert or update key-value
                pair
              </li>
              <li>
                <strong>Get(key):</strong> Retrieve value for given key
              </li>
              <li>
                <strong>Remove(key):</strong> Delete key-value pair
              </li>
              <li>
                <strong>containsKey(key):</strong> Check if key exists
              </li>
            </ul>

            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Collision Resolution:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Linear Probing:</strong> Check next slot sequentially
              </li>
              <li>
                <strong>Load Factor:</strong> Ratio of entries to table size
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
                <strong>Worst Case:</strong> O(n) when many collisions occur
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                entries
              </li>
              <li>
                <strong>Load Factor:</strong> Keep below 0.75 for good
                performance
              </li>
              <li>
                <strong>Use Cases:</strong> Caches, databases, symbol tables,
                associative arrays
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>Key Insight:</strong> Hash functions distribute keys across
          table slots. Good hash functions minimize collisions, but collision
          resolution strategies like linear probing handle conflicts when they
          occur.
        </div>
      </div>
    </div>
  );
}
