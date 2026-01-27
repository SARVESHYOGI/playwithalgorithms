import LinkedListDesc from "@/components/descriptions/linear/LinkedListDesc";
import { ListNode } from "@/types";
import { useState } from "react";

export default function LinkedListVisualizer() {
  const [linkedList, setLinkedList] = useState<ListNode[]>([
    { value: 10, id: "node-1" },
    { value: 20, id: "node-2" },
    { value: 30, id: "node-3" },
  ]);
  const [inputValue, setInputValue] = useState<string>("40");
  const [inputIndex, setInputIndex] = useState<string>("0");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [lastOperation, setLastOperation] = useState<string>("");
  const [speed, setSpeed] = useState(1000);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);
  const [traversalIndex, setTraversalIndex] = useState<number | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const insertAtHead = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;

    setIsAnimating(true);
    setOperationType("insertHead");
    setCurrentOperation(`Inserting ${value} at head of linked list...`);

    const newNode: ListNode = {
      value,
      id: `node-${Date.now()}`,
    };

    const newList = [newNode, ...linkedList];
    setLinkedList(newList);
    setHighlightedIndex(0);

    await sleep(speed);

    setLastOperation(`Inserted ${value} at head. Length: ${newList.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const insertAtTail = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;

    setIsAnimating(true);
    setOperationType("insertTail");
    setCurrentOperation(`Inserting ${value} at tail of linked list...`);

    if (linkedList.length > 0) {
      setCurrentOperation("Traversing to tail...");
      for (let i = 0; i < linkedList.length; i++) {
        setTraversalIndex(i);
        await sleep(speed / 3);
      }
    }

    const newNode: ListNode = {
      value,
      id: `node-${Date.now()}`,
    };

    setCurrentOperation(`Adding ${value} at tail...`);
    const newList = [...linkedList, newNode];
    setLinkedList(newList);
    setHighlightedIndex(newList.length - 1);
    setTraversalIndex(null);

    await sleep(speed);

    setLastOperation(`Inserted ${value} at tail. Length: ${newList.length}`);
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const insertAt = async () => {
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    if (isNaN(value) || isNaN(index) || isAnimating) return;
    if (index < 0 || index > linkedList.length) {
      setCurrentOperation(
        `Invalid index! Must be between 0 and ${linkedList.length}`,
      );
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("insertAt");
    setCurrentOperation(`Inserting ${value} at index ${index}...`);

    if (index > 0) {
      setCurrentOperation(`Traversing to position ${index}...`);
      for (let i = 0; i < index; i++) {
        setTraversalIndex(i);
        await sleep(speed / 2);
      }
    }

    const newNode: ListNode = {
      value,
      id: `node-${Date.now()}`,
    };

    setCurrentOperation(`Inserting ${value} at position ${index}...`);
    const newList = [...linkedList];
    newList.splice(index, 0, newNode);
    setLinkedList(newList);
    setHighlightedIndex(index);
    setTraversalIndex(null);

    await sleep(speed);

    setLastOperation(
      `Inserted ${value} at index ${index}. Length: ${newList.length}`,
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setInputValue((value + 10).toString());
    setIsAnimating(false);
  };

  const deleteAtHead = async () => {
    if (linkedList.length === 0 || isAnimating) {
      if (linkedList.length === 0) {
        setCurrentOperation("Empty list! Cannot delete from empty list");
        setTimeout(() => setCurrentOperation(""), 2000);
      }
      return;
    }

    setIsAnimating(true);
    setOperationType("deleteHead");
    const headValue = linkedList[0].value;
    setCurrentOperation(`Deleting head node with value ${headValue}...`);
    setHighlightedIndex(0);

    await sleep(speed);

    const newList = linkedList.slice(1);
    setLinkedList(newList);
    setLastOperation(
      `Deleted head node ${headValue}. Length: ${newList.length}`,
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const deleteAt = async () => {
    const index = parseInt(inputIndex);
    if (isNaN(index) || isAnimating) return;
    if (index < 0 || index >= linkedList.length) {
      setCurrentOperation(
        `Invalid index! Must be between 0 and ${linkedList.length - 1}`,
      );
      setTimeout(() => setCurrentOperation(""), 2000);
      return;
    }

    setIsAnimating(true);
    setOperationType("deleteAt");
    const valueToDelete = linkedList[index].value;

    if (index > 0) {
      setCurrentOperation(`Traversing to position ${index}...`);
      for (let i = 0; i < index; i++) {
        setTraversalIndex(i);
        await sleep(speed / 2);
      }
    }

    setCurrentOperation(
      `Deleting node at index ${index} with value ${valueToDelete}...`,
    );
    setHighlightedIndex(index);
    setTraversalIndex(null);

    await sleep(speed);

    const newList = [...linkedList];
    newList.splice(index, 1);
    setLinkedList(newList);

    setLastOperation(
      `Deleted node ${valueToDelete} at index ${index}. Length: ${newList.length}`,
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const search = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || isAnimating) return;

    setIsAnimating(true);
    setOperationType("search");
    setCurrentOperation(`Searching for value ${value}...`);

    let found = false;
    let foundIndex = -1;

    for (let i = 0; i < linkedList.length; i++) {
      setTraversalIndex(i);
      setCurrentOperation(
        `Checking node ${i}: ${linkedList[i].value} == ${value}?`,
      );
      await sleep(speed);

      if (linkedList[i].value === value) {
        found = true;
        foundIndex = i;
        setHighlightedIndex(i);
        setCurrentOperation(`Found ${value} at index ${i}!`);
        break;
      }
    }

    if (!found) {
      setCurrentOperation(`Value ${value} not found in the list`);
    }

    setTraversalIndex(null);
    await sleep(speed);

    setLastOperation(
      found ? `Found ${value} at index ${foundIndex}` : `${value} not found`,
    );
    setCurrentOperation("");
    setHighlightedIndex(null);
    setOperationType(null);
    setIsAnimating(false);
  };

  const clear = () => {
    if (isAnimating) return;
    setLinkedList([]);
    setLastOperation("Linked list cleabackground");
    setCurrentOperation("");
    setOperationType(null);
  };

  const getNodeColor = (index: number, value: number) => {
    if (highlightedIndex === index) {
      if (operationType?.includes("insert")) return "#10b981";
      if (operationType?.includes("delete")) return "#ef4444";
      if (operationType === "search") return "#3b82f6";
    }
    if (traversalIndex === index) return "#f59e0b";

    const hue = (value * 2.5 + index * 30) % 360;
    return `hsl(${hue}, 70%, 65%)`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full mx-auto bg-gradient-to-br from-background-50 to-background-50 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-background-800 mb-2 bg-gradient-to-r from-background-600 to-background-600 bg-clip-text text-transparent">
          Linked List Visualizer
        </h2>
        <p className="text-background-600">
          Dynamic data structure with nodes connected via pointers
        </p>
      </div>

      <div className="flex gap-6 bg-background rounded-lg px-6 py-3 shadow-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {linkedList.length}
          </div>
          <div className="text-sm text-background-600">Length</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {linkedList.length > 0 ? linkedList[0].value : "NULL"}
          </div>
          <div className="text-sm text-background-600">Head</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">
            {linkedList.length > 0
              ? linkedList[linkedList.length - 1].value
              : "NULL"}
          </div>
          <div className="text-sm text-background-600">Tail</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-background-600">O(n)</div>
          <div className="text-sm text-background-600">Search Time</div>
        </div>
      </div>

      <div className="bg-background rounded-lg px-4 py-2 shadow-md min-h-[50px] flex items-center justify-center border-l-4 border-background-500">
        <p className="text-background-700 font-medium text-center">
          {currentOperation ||
            lastOperation ||
            "Ready for linked list operations"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-background p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Value:
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Index:
          </label>
          <input
            type="number"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            disabled={isAnimating}
            min="0"
            max={linkedList.length}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-background-700">
            Speed:
          </label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-background-500"
          >
            <option value={1500}>Slow</option>
            <option value={1000}>Medium</option>
            <option value={600}>Fast</option>
          </select>
        </div>
      </div>

      <div className="bg-background rounded-xl p-6 shadow-md w-full">
        <h3 className="text-lg font-bold text-background-800 mb-4 text-center">
          Linked List Structure
        </h3>

        <div className="relative overflow-x-auto">
          {linkedList.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-background-400 font-medium border-2 border-dashed border-background-300 rounded-lg">
              Empty Linked List - HEAD → NULL
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-start min-h-[150px] pb-4">
              <div className="flex flex-col items-center">
                <div className="bg-background-600 text-background px-3 py-1 rounded font-bold text-sm">
                  HEAD
                </div>
                <div className="text-2xl text-background-400 mt-2">↓</div>
              </div>

              {linkedList.map((node, index) => (
                <div key={node.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`border-2 rounded-lg p-4 transform transition-all duration-300 min-w-[100px] ${
                        highlightedIndex === index
                          ? "scale-110 border-background-400 shadow-lg animate-pulse"
                          : traversalIndex === index
                            ? "scale-105 border-background-400 shadow-md"
                            : "border-background-300"
                      }`}
                      style={{
                        backgroundColor: getNodeColor(index, node.value),
                        color:
                          highlightedIndex === index || traversalIndex === index
                            ? "background"
                            : "background",
                      }}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-background">
                          {node.value}
                        </div>
                        <div className="text-xs text-background/80 mt-1">
                          Node {index}
                        </div>
                        <div className="border-t border-background/30 mt-2 pt-2">
                          <div className="text-xs text-background/80">
                            next →
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-background-500 mt-2">
                      Index {index}
                    </div>

                    {index === 0 && linkedList.length > 1 && (
                      <div className="text-xs text-background-600 font-bold mt-1">
                        Head Node
                      </div>
                    )}
                    {index === linkedList.length - 1 &&
                      linkedList.length > 1 && (
                        <div className="text-xs text-background-600 font-bold mt-1">
                          Tail Node
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col items-center mx-2">
                    {index < linkedList.length - 1 ? (
                      <>
                        <div className="text-2xl text-background-400">→</div>
                        <div className="text-xs text-background-500">next</div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="text-2xl text-background-400">→</div>
                        <div className="bg-background-500 text-background px-2 py-1 rounded text-xs font-bold">
                          NULL
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-4xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Memory Layout Concept
        </h4>
        <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <div className="bg-background-100 px-3 py-2 rounded font-mono text-xs">
              0x1A2B
            </div>
            <div className="text-xs text-background-600 mt-1">Address</div>
          </div>
          <div className="text-xl text-background-400">→</div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <div className="bg-background-100 px-3 py-2 rounded font-mono text-xs">
              Data | Next*
            </div>
            <div className="text-xs text-background-600 mt-1">
              Node Structure
            </div>
          </div>
          <div className="text-xl text-background-400">→</div>
          <div className="flex flex-col items-center p-3 border rounded-lg">
            <div className="bg-background-100 px-3 py-2 rounded font-mono text-xs">
              0x3C4D
            </div>
            <div className="text-xs text-background-600 mt-1">Next Address</div>
          </div>
        </div>
        <div className="text-xs text-background-500 text-center mt-2">
          Each node stores data and a pointer to the next nodes memory address
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 shadow-md w-full max-w-4xl">
        <h4 className="font-bold text-background-800 mb-3 text-center">
          Time Complexity Comparison
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(n)</div>
            <div className="text-background-600">Access/Search</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(1)</div>
            <div className="text-background-600">Insert at Head</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(n)</div>
            <div className="text-background-600">Insert at Tail</div>
          </div>
          <div className="text-center p-3 bg-background-50 rounded-lg">
            <div className="font-bold text-background-700">O(n)</div>
            <div className="text-background-600">Delete at Index</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-4xl">
        <button
          onClick={insertAtHead}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Insert at Head
        </button>

        <button
          onClick={insertAtTail}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Insert at Tail
        </button>

        <button
          onClick={insertAt}
          disabled={isAnimating}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Insert at Index
        </button>

        <button
          onClick={deleteAtHead}
          disabled={isAnimating || linkedList.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || linkedList.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Delete Head
        </button>

        <button
          onClick={deleteAt}
          disabled={isAnimating || linkedList.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || linkedList.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Delete at Index
        </button>

        <button
          onClick={search}
          disabled={isAnimating || linkedList.length === 0}
          className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 transform ${
            isAnimating || linkedList.length === 0
              ? "bg-background-400 cursor-not-allowed"
              : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
          } text-background`}
        >
          Search Value
        </button>
      </div>

      <button
        onClick={clear}
        disabled={isAnimating}
        className={`px-6 py-3 text-lg rounded-xl font-semibold transition-all duration-200 transform ${
          isAnimating
            ? "bg-background-400 cursor-not-allowed"
            : "bg-gradient-to-r from-background-600 to-background-700 hover:from-background-700 hover:to-background-800 hover:scale-105 active:scale-95 shadow-lg"
        } text-background`}
      >
        Clear All
      </button>

      <div>
        <LinkedListDesc />
      </div>
    </div>
  );
}
