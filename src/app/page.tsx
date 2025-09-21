"use client";

import InboxSection from "@/components/InboxSection";
import PageToggle from "@/components/PageToggle";
// import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const inboxRef = useRef<HTMLDivElement>(null);
  const scrollToInbox = () => {
    inboxRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-background relative">
        <div className="text-9xl text-center font-bold">
          Play with Algorithms
        </div>
        <div className="absolute top-2 left-2">
          {/* <ThemeToggle /> */}
          <PageToggle />
        </div>
        <Button
          className="absolute left-1 bottom-1 text-lg m-4 bg-background-100 hover:bg-background-200 text-background-950"
          onClick={scrollToInbox}
        >
          Inbox
        </Button>
      </div>
      <InboxSection ref={inboxRef} />
    </>
  );
}
