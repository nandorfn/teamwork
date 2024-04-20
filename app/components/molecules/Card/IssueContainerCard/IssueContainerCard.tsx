'use client'
import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { TIssueContainer } from "@molecules/types";

const IssueContainerCard = ({
  children,
  title,
  droppabledId,
}: TIssueContainer) => {
  return (
    <Droppable droppableId={droppabledId}>
      {(provided: DroppableProvided, snap: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col py-5 px-3 gap-5 bg-[#0F1213] rounded-xl border-2 shadow-md w-80">
          <h3>{title}</h3>
          <div className="flex flex-col gap-[10px]">
            {children}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueContainerCard;