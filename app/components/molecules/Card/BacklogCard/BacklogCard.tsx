import { Separator } from "@components/ui/separator";
import Link from "next/link";
import { TMockIssue } from "../../../../utils/mock/mockIssueCard";
import { TTodoCard } from "@molecules/types";
import { Avatar } from "@components/atoms";
import dummyAvatar from "@assets/dummy/avatar.svg"

const BacklogCard = ({
  data,
  provided,
  snap
}: TTodoCard) => {
  return (
    <div ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      className="flex flex-row justify-between items-center dark:bg-[#101315] bg-white p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800  border">
      <div>
        <h3>{data?.text}</h3>
        <div className="flex items-center flex-row text-xs text-base-100 gap-1">
          <p>{'TT-1'}</p>
          <Separator className="w-1" />
          <p>{'Project 2'}</p>
        </div>
      </div>

      <p className="text-xs text-base-100">{'In Progress'}</p>
      <Avatar src={dummyAvatar} className="z-[1]" />
    </div>
  );
};

export default BacklogCard;