import React from "react";

const Looping = ({
  loopCount,
  children
}: {
  loopCount: number,
  children: React.ReactNode
}) => {
  const loopArray = Array.from({ length: loopCount });

  return (
    <div>
      {loopArray.map((_, index) => (
        <div key={index}>
          {children}
        </div>
      ))}
    </div>
  );
};

export default Looping;
