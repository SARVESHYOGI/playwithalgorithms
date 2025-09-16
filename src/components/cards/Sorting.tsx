import Link from "next/link";
import React, { forwardRef } from "react";

const Sorting = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/sorting">Sorting Page</Link>
      </div>
    </div>
  );
});

Sorting.displayName = "Sorting";

export default Sorting;
