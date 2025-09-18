import { forwardRef } from "react";
import { useRef } from "react";
import Searching from "./cards/Searching";
import Sorting from "./cards/Sorting";
import LinearDataStructure from "./cards/LinearDataStructure";
import HashDataStructure from "./cards/HashDataStructure";
import NonLinearDataStructure from "./cards/NonLinearDataStructure";

const InboxSection = forwardRef<HTMLDivElement>((_, ref) => {
  const SortingRef = useRef<HTMLDivElement>(null);
  const SearchingRef = useRef<HTMLDivElement>(null);
  const LinearDataStructureRef = useRef<HTMLDivElement>(null);
  const HashDataStructureRef = useRef<HTMLDivElement>(null);
  const NonLinearDataStructureRef = useRef<HTMLDivElement>(null);
  const scrollToSorting = () => {
    SortingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSearching = () => {
    SearchingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToLinearDataStructure = () => {
    LinearDataStructureRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHashDataStructure = () => {
    HashDataStructureRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToNonLinearDataStructure = () => {
    NonLinearDataStructureRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        ref={ref}
        className="p-10 bg-background-50 min-h-screen w-full flex flex-col justify-between items-stretch my-auto"
      >
        <ul className="flex h-screen flex-col justify-evenly">
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
            onClick={scrollToLinearDataStructure}
          >
            Linear Data Structure{" "}
          </li>
          <li
            className="p-4 border rounded shadow-sm"
            onClick={scrollToHashDataStructure}
          >
            Hash Data Structure
          </li>
          <li
            className="p-4 border rounded shadow-sm"
            onClick={scrollToNonLinearDataStructure}
          >
            Non-Linear Data Structure
          </li>
        </ul>
      </div>
      <div>
        <Sorting ref={SortingRef} />
        <Searching ref={SearchingRef} />
        <LinearDataStructure ref={LinearDataStructureRef} />
        <HashDataStructure ref={HashDataStructureRef} />
        <NonLinearDataStructure ref={NonLinearDataStructureRef} />
      </div>
    </>
  );
});

InboxSection.displayName = "InboxSection";

export default InboxSection;
