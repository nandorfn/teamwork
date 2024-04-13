import React from "react";

const IssueContainerCard = ({
  children,
  title
}: {
  title: string;
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col py-5 px-3 gap-5 bg-[#0F1213] rounded-xl border-2 shadow-md w-80">
      <h3>{title}</h3>
      <div className="flex flex-col gap-[10px]">
        {children}
      </div>
    </div>
  );
};

export default IssueContainerCard;