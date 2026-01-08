export const sortingAlgorithms = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them.",
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    description:
      "A simple comparison-based sorting algorithm that repeatedly selects the minimum element from the unsorted part and swaps it with the first unsorted element.",
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    description:
      "A simple sorting algorithm that builds the final sorted array one item at a time.",
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    description:
      "A divide-and-conquer algorithm that splits the array into smaller sub-arrays and merges them back together in sorted order.",
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    description:
      "A divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it.",
  },
  // {
  //   id: "heap-sort",
  //   name: "Heap Sort",
  //   description:
  //     "A comparison-based sorting algorithm that builds a heap structure and then sorts the array.",
  // },
  // {
  //   id: "radix-sort",
  //   name: "Radix Sort",
  //   description:
  //     "A non-comparative sorting algorithm that sorts numbers by processing individual digits.",
  // },
  {
    id: "bucket-sort",
    name: "Bucket Sort",
    description:
      "A sorting algorithm that divides the data into several buckets and then sorts each bucket.",
  },
];


export const searchAlgorithms = [
  { 
    id: "linear", 
    name: "Linear Search", 
    description: "Checks each element one by one until the target is found or the list ends." 
  },
  { 
    id: "binary", 
    name: "Binary Search", 
    description: "Efficiently finds the target by repeatedly dividing a sorted list in half." 
  },
];
