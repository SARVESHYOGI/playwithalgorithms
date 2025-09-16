import React, { forwardRef } from "react";

const Searching = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="text-2xl font-bold text-gray-800">Searching Page</div>
    </div>
  );
});

Searching.displayName = "Searching";

export default Searching;
