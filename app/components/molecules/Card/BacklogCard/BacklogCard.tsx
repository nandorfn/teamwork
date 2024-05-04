import { TTodoCard } from "@molecules/types";
import { Avatar, Badge, Icon } from "@components/atoms";
import dummyAvatar from "@assets/dummy/avatar.svg"
import { bugIcon, epicIcon, storyIcon, taskIcon2 } from "@assets/svg";

const BacklogCard = ({
  data,
  provided,
  snap
}: TTodoCard) => {
  const iconIssue = (type: string) => {
    switch(type) {
      case "task":
        return taskIcon2
      case "epic":
        return epicIcon;
      case "bug":
        return bugIcon;
      case "story":
        return storyIcon;
    }
  }

  return (
    <div ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      className="flex flex-row justify-between items-center dark:bg-zinc-900 bg-white p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800">
      <div className="flex flex-row gap-3">
        <Icon 
          src={iconIssue(data?.type)} 
          alt="" 
          width={16} 
          height={16}
        />
        <h3>{data?.text}</h3>
      </div>

      <Badge variant={data?.parent?.color} size={"backlog"} className=" font-medium" text={data?.parent?.name} />
      <Avatar src={dummyAvatar} className="z-[1]" />
    </div>
  );
};

export default BacklogCard;