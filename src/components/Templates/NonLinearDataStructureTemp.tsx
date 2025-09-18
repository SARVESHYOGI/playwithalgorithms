import React, { useState, useEffect } from "react";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStructure, setCurrentStructure] = useState("tree");
  const [treeData, setTreeData] = useState([]);

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
        if (currentStructure === "tree") {
          animateTree();
        }
      }
    };

    startAnimation();
    const interval = setInterval(startAnimation, 10000);
    return () => clearInterval(interval);
  }, [isAnimating, currentStructure]);

  const switchStructure = () => {
    if (!isAnimating) {
      const structures = ["tree", "graph", "heap"];
      const currentIndex = structures.indexOf(currentStructure);
      const nextIndex = (currentIndex + 1) % structures.length;
      setCurrentStructure(structures[nextIndex]);
      setTreeData([]);
    }
  };

  const getElementColor = (value, index) => {
    const hue = (value * 4 + index * 50) % 360;
    return `hsl(${hue}, 75%, 65%)`;
  };

  const renderTreeNode = (value, x, y, level) => {
    return (
      <div
        key={`tree-${value}`}
        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md transition-all duration-300 border border-white"
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
    <div className="bg-white h-full w-full rounded-xl shadow-lg p-6 border border-purple-200 flex flex-col">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-3 mb-2">
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Non-Linear Structure Demo
          </h3>
        </div>
        <p className="text-slate-700 text-sm">
          Hierarchical data organization — {currentStructure.toUpperCase()}
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 min-h-[180px]">
        {currentStructure === "tree" && (
          <div className="flex flex-col items-center w-full h-full relative">
            <div className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
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

              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {treeData.length > 1 && (
                  <>
                    <line
                      x1="50%"
                      y1="15%"
                      x2="25%"
                      y2="35%"
                      stroke="#9333ea"
                      strokeWidth="2"
                    />
                    <line
                      x1="50%"
                      y1="15%"
                      x2="75%"
                      y2="35%"
                      stroke="#9333ea"
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
                      stroke="#9333ea"
                      strokeWidth="2"
                    />
                    <line
                      x1="25%"
                      y1="35%"
                      x2="37.5%"
                      y2="55%"
                      stroke="#9333ea"
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
                      stroke="#9333ea"
                      strokeWidth="2"
                    />
                    <line
                      x1="75%"
                      y1="35%"
                      x2="87.5%"
                      y2="55%"
                      stroke="#9333ea"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <div
          className={`inline-flex items-center space-x-2 ${
            isAnimating ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isAnimating ? "bg-purple-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="font-medium text-xs">
            {isAnimating
              ? `${currentStructure.toUpperCase()} operations...`
              : "Ready for next demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

function NonLinearExploreSection() {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-xl p-6 text-white shadow-lg h-full flex flex-col justify-center">
        <div className="text-4xl mb-3 text-center">🌐</div>
        <h2 className="text-2xl font-bold mb-3 text-center">
          Explore Hierarchies!
        </h2>
        <p className="text-sm mb-4 text-purple-100 leading-relaxed text-center">
          Master complex relationships and hierarchical data organization for
          networks and trees.
        </p>
        <div className="text-center">
          <button className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-2 text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Dive Deep! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

function NonLinearTitle() {
  return (
    <div className="text-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-xl p-6 border border-purple-100 h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
        Non-Linear Data Structures
      </h1>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed px-2 mb-4">
        Hierarchical and complex relationships where elements form networks,
        trees, and multi-dimensional structures.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
          🌳 Trees
        </div>
        <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
          🕸️ Networks
        </div>
        <div className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-medium">
          ⚡ Priority
        </div>
      </div>
    </div>
  );
}

export default function NonLinearDataStructuresTemp() {
  const linkData = nonLinearStructures;

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100">
      <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full max-h-screen">
        <div className="col-span-7 row-span-4 col-start-2 row-start-1 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 border border-pink-200 flex items-center justify-center">
            <NonLinearTitle />
          </div>
        </div>

        <div className="col-span-4 row-span-4 col-start-9 row-start-1 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 border border-purple-200 flex items-center justify-center">
            <NonLinearExploreSection />
          </div>
        </div>

        <div className="col-span-7 row-span-8 col-start-6 row-start-5 flex items-center justify-center">
          <div className="w-full h-full bg-white/90 rounded-xl shadow-xl p-6 border border-rose-200 flex items-center justify-center">
            <NonLinearAnimation />
          </div>
        </div>

        <div className="bg-gray-200 p-2 col-span-5 row-span-8 col-start-1 row-start-5">
          <div className="flex flex-wrap gap-4 bg-blue-400 p-4 rounded-xl items-center justify-center h-full">
            {linkData.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
                style={{ flex: "1 1 150px", minWidth: "150px" }}
              >
                <button
                  className="w-full h-14 px-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-xs md:text-sm shadow hover:shadow-lg border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
                  tabIndex={0}
                >
                  {link.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
