import { forwardRef } from "react";
import { useRef } from "react";
import Searching from "./cards/Searching";
import Sorting from "./cards/Sorting";
import DataStructure from "./cards/DataStructure";

const InboxSection = forwardRef<HTMLDivElement>((_, ref) => {
  const SortingRef = useRef<HTMLDivElement>(null);
  const SearchingRef = useRef<HTMLDivElement>(null);
  const DataStructureRef = useRef<HTMLDivElement>(null);
  const scrollToSorting = () => {
    SortingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSearching = () => {
    SearchingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToDataStructure = () => {
    DataStructureRef.current?.scrollIntoView({ behavior: "smooth" });
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
          <li
            className="p-4 border rounded shadow-sm"
            onClick={scrollToDataStructure}
          >
            Data Structure
          </li>
        </ul>
      </div>
      <div>
        <Sorting ref={SortingRef} />
        <Searching ref={SearchingRef} />
        <DataStructure ref={DataStructureRef} />
      </div>
    </>
  );
});

InboxSection.displayName = "InboxSection";

export default InboxSection;
