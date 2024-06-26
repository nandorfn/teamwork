import { Avatar, Badge } from "@components/atoms";
import React from "react";
import { TTodoCard } from "@molecules/types";
import { cn, getInitials } from "@func";

const TodoCard = ({ data, provided, snap }: TTodoCard) => {
  console.log(data);
  const badges = ["Slicing", "UI/UX"];
  return (
    <div ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      className={cn("border rounded-lg p-3 gap-3 flex flex-col bg-white dark:bg-zinc-900", snap.isDragging ? "border-white" : "")}
      style={{
        ...provided.draggableProps.style 
      }}
    >
      {/* <div className="flex flex-row gap-3">
        {
          badges.map((item, index) => (
            <React.Fragment key={index}>
              <Badge size={"board"} variant={"green"} text={item} />
            </React.Fragment>
          ))
        }
      </div> */}

      <div>
        <h4 className="text-xl">{data?.summary}</h4>
        <p className="text-base-grey line-clamp-2">{data?.description}</p>
      </div>

      <div className="flex flex-row relative">
        {data?.assignee && (
          <Avatar 
            src={data.assignee?.avatar} 
            name={data.assignee?.name} 
            color={data.assignee?.color} 
            alt={getInitials(data.assignee?.name)} 
            className="z-[1]"
          />
        )
        }
      </div>

    </div>
  );
};

export default TodoCard;