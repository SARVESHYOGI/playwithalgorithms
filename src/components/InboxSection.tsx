import { forwardRef } from "react";
import { useRef } from "react";
import Searching from "./cards/Searching";
import Sorting from "./cards/Sorting";

const InboxSection = forwardRef<HTMLDivElement>((_, ref) => {
  const SortingRef = useRef<HTMLDivElement>(null);
  const SearchingRef = useRef<HTMLDivElement>(null);
  const scrollToSorting = () => {
    SortingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSearching = () => {
    SearchingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={ref} className="p-10 bg-white min-h-screen">
        <ul className="space-y-2">
          <li
            className="p-4 border rounded shadow-sm"
            onClick={scrollToSorting}
          >
            Sorting
          </li>
          <li
            className="p-4 border rounded shadow-sm"
            onClick={scrollToSearching}
          >
            Searching
          </li>
        </ul>
      </div>
      <Sorting ref={SortingRef} />

      <Searching ref={SearchingRef} />
    </>
  );
});

InboxSection.displayName = "InboxSection";

export default InboxSection;
