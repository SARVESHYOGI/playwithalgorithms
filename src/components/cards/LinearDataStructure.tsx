import React, { forwardRef } from "react";
import LinearDataStructuresTemp from "../Templates/LinearDataStructureTemp";

const LinearDataStructure = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      <LinearDataStructuresTemp />
    </div>
  );
});

LinearDataStructure.displayName = "LinearDataStructure";

export default LinearDataStructure;
