"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<
    "fade-enter" | "fade-exit"
  >("fade-enter");

  useEffect(() => {
    setTransitionStage("fade-exit");

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fade-enter");
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      className={clsx(transitionStage, {
        "fade-enter-active": transitionStage === "fade-enter",
        "fade-exit-active": transitionStage === "fade-exit",
      })}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
