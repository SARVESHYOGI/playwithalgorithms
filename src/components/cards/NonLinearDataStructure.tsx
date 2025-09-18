import React, { forwardRef } from "react";
import NonLinearDataStructuresTemp from "../Templates/NonLinearDataStructureTemp";

const NonLinearDataStructure = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      <NonLinearDataStructuresTemp />
    </div>
  );
});

NonLinearDataStructure.displayName = "NonLinearDataStructure";

export default NonLinearDataStructure;
