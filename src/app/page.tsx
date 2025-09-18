"use client";

import InboxSection from "@/components/InboxSection";
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
        <div
          className="absolute left-0 bottom-0 text-lg m-4"
          onClick={scrollToInbox}
        >
          Inbox
        </div>
      </div>
      <InboxSection ref={inboxRef} />
    </>
  );
}
