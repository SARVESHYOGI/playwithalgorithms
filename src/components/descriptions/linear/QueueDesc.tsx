import React from "react";

export default function QueueDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Queue Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Enqueue:</strong> Add element to rear of queue
              </li>
              <li>
                <strong>Dequeue:</strong> Remove and return front element
              </li>
              <li>
                <strong>Peek/Front:</strong> View front element without removing
              </li>
              <li>
                <strong>isEmpty:</strong> Check if queue is empty
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>FIFO:</strong> First In, First Out principle
              </li>
              <li>
                <strong>Time Complexity:</strong> O(1) for all operations
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) where n is number of
                elements
              </li>
              <li>
                <strong>Use Cases:</strong> Task scheduling, breadth-first
                search, print queues
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
