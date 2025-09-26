"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import HashMapVisualizer from "@/components/algorithms/hashing/HashMap";

function HashStructures({ params }: { params: Promise<{ id: string }> }) {
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
      {id === "hash-map" && <HashMapVisualizer />}
      {id === "hash-set" && <div>Hash Set Visualizer Coming Soon!</div>}
      {id === "unordered-map" && (
        <div>Unordered Map Visualizer Coming Soon!</div>
      )}
      {id === "unordered-set" && (
        <div>Unordered Set Visualizer Coming Soon!</div>
      )}
    </div>
  );
}

export default HashStructures;
