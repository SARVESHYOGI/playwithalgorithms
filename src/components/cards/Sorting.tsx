import React, { forwardRef } from "react";
import SortingTemp from "../Templates/SortingTemp";

const Sorting = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center bg-background "
    >
      <SortingTemp />
    </div>
  );
});

Sorting.displayName = "Sorting";

export default Sorting;
