import React from "react";

export default function VectorDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-4xl">
        <h3 className="font-bold text-background-800 mb-3">
          Vector Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>push_back:</strong> Add element at end
              </li>
              <li>
                <strong>pop_back:</strong> Remove last element
              </li>
              <li>
                <strong>insert:</strong> Insert at specific position
              </li>
              <li>
                <strong>erase:</strong> Remove from specific position
              </li>
              <li>
                <strong>operator[]:</strong> Direct access by index
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Dynamic:</strong> Automatic resizing
              </li>
              <li>
                <strong>Contiguous:</strong> Elements stobackground in
                continuous memory
              </li>
              <li>
                <strong>Random Access:</strong> O(1) access by index
              </li>
              <li>
                <strong>Cache Friendly:</strong> Good memory locality
              </li>
              <li>
                <strong>Use Cases:</strong> General purpose dynamic arrays,
                matrices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
