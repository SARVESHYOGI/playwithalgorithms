"use client";
import Stack from "@/components/algorithms/linear/Stack";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import QueueVisualizer from "@/components/algorithms/linear/Queue";
import DequeVisualizer from "@/components/algorithms/linear/Deque";

function Linear({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <div>
      {/* <div> */}
      <Button
        className="absolute top-6 left-8 bg-background-100 hover:bg-background-200 text-background-900 font-semibold py-2 px-4 rounded cursor-pointer shadow"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <div className="absolute top-6 right-[10%]">
        <ThemeToggle />
      </div>
      {/* </div> */}
      {id === "stack" && <Stack />}
      {id === "queue" && <QueueVisualizer />}
      {id === "deque" && <DequeVisualizer />}
      {id === "vector" && <Stack />}
    </div>
  );
}

export default Linear;
