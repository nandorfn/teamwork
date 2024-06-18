import { cn } from "@func";
import React from "react";

const Looping = ({
  loopCount,
  children,
  className
}: {
  loopCount: number,
  children: React.ReactNode
  className?: string
}) => {
  const loopArray = Array.from({ length: loopCount });

  return (
    <div className={cn("flex flex-col", className)}>
      {loopArray.map((_, index) => (
        <div key={index}>
          {children}
        </div>
      ))}
    </div>
  );
};

export default Looping;
