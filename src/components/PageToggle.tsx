"use client";

import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

export default function PageToggle() {
  const scrollUp = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed left-6 top-6 flex flex-col space-y-3 z-50">
      <ThemeToggle />
      <button
        onClick={scrollUp}
        className="rounded-full bg-background-100 p-3 shadow-md transition hover:bg-background-200"
        aria-label="Scroll up"
      >
        <MdArrowUpward className="text-2xl" />
      </button>

      <button
        onClick={scrollDown}
        className="rounded-full bg-background-100 p-3 shadow-md transition hover:bg-background-200"
        aria-label="Scroll down"
      >
        <MdArrowDownward className="text-2xl" />
      </button>
    </div>
  );
}
