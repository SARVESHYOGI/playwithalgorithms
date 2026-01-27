import React from "react";

export default function DequeDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Deque Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Front Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>addFront:</strong> Insert element at front
              </li>
              <li>
                <strong>removeFront:</strong> Remove element from front
              </li>
              <li>
                <strong>peekFront:</strong> View front element
              </li>
            </ul>
            <h4 className="font-semibold text-background-700 mb-2 mt-3">
              Rear Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>addRear:</strong> Insert element at rear
              </li>
              <li>
                <strong>removeRear:</strong> Remove element from rear
              </li>
              <li>
                <strong>peekRear:</strong> View rear element
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Double-ended:</strong> Operations at both ends
              </li>
              <li>
                <strong>Time Complexity:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Palindrome checking, sliding window
                problems, A* algorithm
              </li>
              <li>
                <strong>Advantage:</strong> Combines stack and queue
                functionality
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
