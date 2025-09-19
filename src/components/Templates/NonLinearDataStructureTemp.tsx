import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

const nonLinearStructures = [
  { id: "binary-tree", name: "Binary Tree" },
  { id: "binary-search-tree", name: "BST" },
  { id: "avl-tree", name: "AVL Tree" },
  { id: "red-black-tree", name: "Red-Black" },
  { id: "heap", name: "Heap" },
  { id: "graph", name: "Graph" },
  { id: "trie", name: "Trie" },
  { id: "b-tree", name: "B-Tree" },
];

function NonLinearAnimation() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<number[]>([]);

  const animateTree = async () => {
    setIsAnimating(true);
    const nodes = [50, 30, 70, 20, 40, 60, 80];

    for (let i = 0; i < nodes.length; i++) {
      setTreeData(nodes.slice(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    for (let i = nodes.length - 1; i >= 4; i--) {
      setTreeData(nodes.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        animateTree();
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getElementColor = (value: number, index: number) => {
    // const theme = document.documentElement.getAttribute("data-theme");

    const primaryColors = [
      // "--primary-50",
      // "--primary-100",
      "--primary-200",
      "--primary-300",
      "--primary-400",
      "--primary-500",
      "--primary-600",
      "--primary-700",
      "--primary-800",
      "--primary-900",
      "--primary-950",
    ];
    const secondaryColors = [
      // "--secondary-50",
      // "--secondary-100",
      "--secondary-200",
      "--secondary-300",
      "--secondary-400",
      "--secondary-500",
      "--secondary-600",
      "--secondary-700",
      "--secondary-800",
      "--secondary-900",
      "--secondary-950",
    ];
    const accentColors = [
      // "--accent-50",
      // "--accent-100",
      "--accent-200",
      "--accent-300",
      "--accent-400",
      "--accent-500",
      "--accent-600",
      "--accent-700",
      "--accent-800",
      "--accent-900",
      "--accent-950",
    ];

    let colorSet = primaryColors;

    if (index % 3 === 1) colorSet = secondaryColors;
    if (index % 3 === 2) colorSet = accentColors;

    const colorIndex = (value + index) % colorSet.length;

    const colorVariable = colorSet[colorIndex];

    return getComputedStyle(document.documentElement)
      .getPropertyValue(colorVariable)
      .trim();
  };

  const renderTreeNode = (
    value: number,
    x: number,
    y: number,
    level: number
  ) => {
    return (
      <div
        key={`tree-${value}`}
        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-text-50 font-bold text-xs shadow-md transition-all duration-300 border border-accent-200 z-10"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: getElementColor(value, level),
          transform: "translate(-50%, -50%)",
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <div className=" h-full w-full rounded-xl p-6 flex flex-col">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-3 mb-2">
          <h3 className="text-3xl font-bold text-primary-950">
            Non-Linear Structure Demo
          </h3>
        </div>
        <p className="text-primary-700 text-sm">
          Hierarchical data organization — TREE
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-background-950 to-transparent rounded-lg p-4 min-h-[180px]">
        <div className="flex flex-col items-center w-full h-full relative">
          <div className="text-sm font-bold text-primary-50 mb-2 flex items-center gap-2">
            🌳 BINARY TREE
          </div>
          <div className="relative w-full flex-1 min-h-[140px]">
            {treeData.length > 0 && renderTreeNode(treeData[0], 50, 15, 0)}
            {treeData.length > 1 && renderTreeNode(treeData[1], 25, 35, 1)}
            {treeData.length > 2 && renderTreeNode(treeData[2], 75, 35, 1)}
            {treeData.length > 3 && renderTreeNode(treeData[3], 12.5, 55, 2)}
            {treeData.length > 4 && renderTreeNode(treeData[4], 37.5, 55, 2)}
            {treeData.length > 5 && renderTreeNode(treeData[5], 62.5, 55, 2)}
            {treeData.length > 6 && renderTreeNode(treeData[6], 87.5, 55, 2)}

            <svg className="absolute inset-0 w-full h-full pointer-events-none ">
              {treeData.length > 1 && (
                <>
                  <line
                    x1="50%"
                    y1="15%"
                    x2="25%"
                    y2="35%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                  <line
                    x1="50%"
                    y1="15%"
                    x2="75%"
                    y2="35%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                </>
              )}
              {treeData.length > 3 && (
                <>
                  <line
                    x1="25%"
                    y1="35%"
                    x2="12.5%"
                    y2="55%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                  <line
                    x1="25%"
                    y1="35%"
                    x2="37.5%"
                    y2="55%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                </>
              )}
              {treeData.length > 5 && (
                <>
                  <line
                    x1="75%"
                    y1="35%"
                    x2="62.5%"
                    y2="55%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                  <line
                    x1="75%"
                    y1="35%"
                    x2="87.5%"
                    y2="55%"
                    stroke="#f5d238"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <div
          className={`inline-flex items-center space-x-2 ${
            isAnimating ? "text-background-950" : "text-text-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isAnimating
                ? "bg-background-500 animate-pulse"
                : "bg-background-400"
            }`}
          ></div>
          <span className="font-medium text-xs">
            {isAnimating ? `TREE operations...` : "Ready for next demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

function NonLinearExploreSection() {
  return (
    <div className="h-full">
      <div className="bg-primary rounded-xl p-6 text-background shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">🌐</div>
        <h2 className="text-3xl font-bold mb-3 text-center">
          Explore Hierarchies!
        </h2>
        <p className="text-sm mb-4 text-purple-100 leading-relaxed text-center">
          Master complex relationships and hierarchical data organization for
          networks and trees.
        </p>
        <div className="text-center">
          <Button className="px-4 py-2 text-2xl font-bold rounded-xl bg-secondary text-text-950  hover:cursor-pointer hover:bg-secondary/70 dark:text-black">
            Dive Deep! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}

function NonLinearTitle() {
  return (
    <div className="text-center rounded-xl p-6 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-5xl font-extrabold text-primary-950 drop-shadow-sm mb-4">
        Non-Linear Data Structures
      </h1>
      <p className="text-sm md:text-base text-primary-700 leading-relaxed px-2 mb-4">
        Hierarchical and complex relationships where elements form networks,
        trees, and multi-dimensional structures.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          🌳 Trees
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          🕸️ Networks
        </div>
        <div className="bg-background-200 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ Priority
        </div>
      </div>
    </div>
  );
}

export default function NonLinearDataStructuresTemp() {
  const linkData = nonLinearStructures;

  return (
    <div className="h-screen p-4 bg-background">
      <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full max-h-screen">
        <div className="col-span-7 row-span-4 col-start-2 row-start-1 flex items-center justify-center">
          <NonLinearTitle />
        </div>

        <div className="col-span-4 row-span-4 col-start-9 row-start-1 flex items-center justify-center">
          <NonLinearExploreSection />
        </div>

        <div className="col-span-7 row-span-8 col-start-6 row-start-5 flex items-center justify-center">
          <NonLinearAnimation />
        </div>

        <div className="col-span-5 row-span-8  col-start-1 row-start-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl items-center justify-center h-full">
            {linkData.map((link, index) => (
              <Button
                key={index}
                className="w-full h-full bg-primary hover:cursor-pointer hover:bg-primary/70"
                tabIndex={0}
              >
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
