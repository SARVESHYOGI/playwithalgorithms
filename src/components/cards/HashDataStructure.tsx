import React, { forwardRef } from "react";
import HashDataStructuresTemp from "../Templates/HashDataStructureTemp";

const HashDataStructure = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      <HashDataStructuresTemp />
    </div>
  );
});

HashDataStructure.displayName = "HashDataStructure";

export default HashDataStructure;
