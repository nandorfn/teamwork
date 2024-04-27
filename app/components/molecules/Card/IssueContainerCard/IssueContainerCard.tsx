'use client'
import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { TIssueContainer } from "@molecules/types";
import { cn } from "@func";
import { Button, buttonVariants } from "@components/ui/button";
import { Icon } from "@components/atoms";
import { plusIcon } from "@assets/svg";

const IssueContainerCard = ({
  children,
  length,
  title,
  droppabledId,
  containerClass,
  containerChildClass,
}: TIssueContainer) => {
  return (
    <Droppable droppableId={droppabledId}>
      {(provided: DroppableProvided, snap: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            cn("flex flex-col py-5 px-3 gap-5 dark:bg-[#0F1213] rounded-xl w-full border dark:shadow-md ",
              containerClass
            )}>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-5">
              <h3 className="font-medium">{title}</h3>
              <p className=" text-white bg-zinc-800 px-2 rounded-sm">{length}</p>
            </div>
            <Button variant={'secondary'}  size={'iconXs'}>
              <Icon src={plusIcon} alt="plus" width={16} height={16} />
            </Button>
          </div>
          <div className={cn("flex flex-col ", containerChildClass)}>
            {children}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueContainerCard;