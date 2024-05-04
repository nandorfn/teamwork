'use client'
import React, { useState } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { TIssueContainer } from "@molecules/types";
import { cn } from "@func";
import { Button } from "@components/ui/button";
import { Badge, Icon } from "@components/atoms";
import { caretDown, caretDownDark, caretRight, caretRightDark, plusDark, plusIcon } from "@assets/svg";
import { useTheme } from "next-themes";
import { DatePickerRange } from "@components/molecules/DatePickerRange";

const IssueContainerCard = ({
  children,
  length,
  title,
  droppabledId,
  containerClass,
  containerChildClass,
  isBacklog = false,
}: TIssueContainer) => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  return (
    <Droppable droppableId={droppabledId}>
      {(provided: DroppableProvided, snap: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            cn("flex flex-col py-3 px-3 gap-5 bg-white-100 dark:bg-black rounded-xl w-full dark:border dark:shadow-md ",
              containerClass
            )}>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-5">
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant={'ghost'}
                className="p-0 m-0 hover:bg-black">
                <Icon
                  src={
                    isCollapsed
                      ? (theme === 'dark' ? caretDown : caretDownDark)
                      : (theme === 'dark' ? caretRight : caretRightDark)
                  }
                  width={20}
                  height={20}
                  alt="collapse" />
              </Button>
              <h3 className="font-medium text-lg flex items-center">{title}</h3>
              {isBacklog &&
                <>
                  <DatePickerRange />
                  <p>{`(${length} issues)`}</p>
                </>
              }
            </div>

            <div className="flex flex-row items-center gap-4">
              {isBacklog &&
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    <Badge className="px-3 bg-zinc-900" text="0" />
                    <Badge className="px-3 bg-blue-600" text="1" />
                    <Badge className="px-3 bg-emerald-600" text="2" />
                  </div>
                  <Button className="font-semibold" variant={'secondary'} size={'xs'}>
                    Create sprint
                  </Button>
                </div>
              }
              <Button variant={'secondary'} size={'iconXs'}>
                <Icon src={theme === 'dark' ? plusIcon : plusDark} alt="plus" width={16} height={16} />
              </Button>
            </div>
          </div>
          {isCollapsed &&
            <div className={cn("flex flex-col dark:divide-y dark:divide-zinc-800", containerChildClass)}>
              {children}
            </div>
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueContainerCard;