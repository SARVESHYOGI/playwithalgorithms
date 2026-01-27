import React from "react";

export default function StackDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-3xl">
        <h3 className="font-bold text-background-800 mb-3">
          Stack Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Push:</strong> Add element to top of stack
              </li>
              <li>
                <strong>Pop:</strong> Remove and return top element
              </li>
              <li>
                <strong>Peek/Top:</strong> View top element without removing
              </li>
              <li>
                <strong>isEmpty:</strong> Check if stack is empty
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>LIFO:</strong> Last In, First Out principle
              </li>
              <li>
                <strong>Time Complexity:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Function calls, undo operations,
                expression parsing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
