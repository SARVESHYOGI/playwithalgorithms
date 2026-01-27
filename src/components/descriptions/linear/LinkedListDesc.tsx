import React from "react";

export default function LinkedListDesc() {
  return (
    <div>
      <div className="bg-background rounded-lg p-4 shadow-md max-w-5xl">
        <h3 className="font-bold text-background-800 mb-3">
          Linked List Operations:
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Basic Operations:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Insert at Head:</strong> Add new node at beginning -
                O(1)
              </li>
              <li>
                <strong>Insert at Tail:</strong> Add new node at end - O(n)
              </li>
              <li>
                <strong>Insert at Index:</strong> Add node at specific position
                - O(n)
              </li>
              <li>
                <strong>Delete:</strong> Remove node from list - O(n) for search
                + O(1) for removal
              </li>
              <li>
                <strong>Search:</strong> Find node with specific value - O(n)
              </li>
              <li>
                <strong>Traverse:</strong> Visit all nodes in sequence - O(n)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background-700 mb-2">
              Characteristics:
            </h4>
            <ul className="space-y-1 text-background-600">
              <li>
                <strong>Dynamic Size:</strong> Can grow/shrink during runtime
              </li>
              <li>
                <strong>Memory Efficient:</strong> Allocates memory as needed
              </li>
              <li>
                <strong>Non-contiguous:</strong> Nodes can be anywhere in memory
              </li>
              <li>
                <strong>Sequential Access:</strong> Must traverse from head to
                reach elements
              </li>
              <li>
                <strong>Extra Memory:</strong> Requires storage for pointers
              </li>
              <li>
                <strong>Use Cases:</strong> Implementation of stacks, queues,
                graphs
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background-50 rounded-lg text-sm">
          <strong>vs Arrays:</strong> Linked lists excel at insertions/deletions
          but have slower random access. Arrays have faster access but expensive
          insertions/deletions in the middle.
        </div>
      </div>
    </div>
  );
}
