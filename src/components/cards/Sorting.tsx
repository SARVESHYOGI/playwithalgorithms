import React, { forwardRef } from "react";
import SortingTemp from "../SortingTemp";

const Sorting = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      <SortingTemp />
    </div>
  );
});

Sorting.displayName = "Sorting";

export default Sorting;
