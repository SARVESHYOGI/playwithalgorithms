import React from "react";

export default function HashSetDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          HashSet Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>add(value):</strong> Insert value into set (ignores
                duplicates)
              </li>
              <li>
                <strong>contains(value):</strong> Check if value exists in set
              </li>
              <li>
                <strong>remove(value):</strong> Delete value from set
              </li>
              <li>
                <strong>size():</strong> Get number of elements in set
              </li>
              <li>
                <strong>isEmpty():</strong> Check if set is empty
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
                <strong>Average Time:</strong> O(1) for add, contains, remove
              </li>
              <li>
                <strong>Worst Case:</strong> O(n) when many collisions occur
              </li>
              <li>
                <strong>Space:</strong> O(n) where n is number of unique
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Removing duplicates, membership
                testing, mathematical set operations
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>vs HashMap:</strong> HashSet only stores values (no key-value
          pairs) and automatically prevents duplicates. Its essentially a
          HashMap where the value is also used as the key.
        </div>
      </div>
    </div>
  );
}
