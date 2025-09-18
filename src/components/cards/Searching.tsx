import React, { forwardRef } from "react";
import SearchingTemp from "../Templates/SearchingTemp";

const Searching = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center bg-background "
    >
      <SearchingTemp />
    </div>
  );
});

Searching.displayName = "Searching";

export default Searching;
