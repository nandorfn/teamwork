"use client";
import { TBacklogForm, TTodoCard } from "@molecules/types";
import { Avatar, Badge, Icon, InputSelect } from "@components/atoms";
import dummyAvatar from "@assets/dummy/avatar.svg";
import { bugIcon, epicIcon, storyIcon, taskIcon2 } from "@assets/svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, fetchData } from "@http";
import { usePathname } from "next/navigation";
import { TOptionSelect } from "@atoms/types";

const BacklogCard = ({
  data,
  provided,
  snap
}: TTodoCard) => {
  const {
    control,
    watch
  } = useForm<TBacklogForm>({
    defaultValues: {
      [data?.id]: "todo",
    },
  });
  const iconIssue = (type: string) => {
    switch(type?.toLowerCase()) {
      case "task":
        return taskIcon2;
      case "epic":
        return epicIcon;
      case "bug":
        return bugIcon;
      case "story":
        return storyIcon;
      default: 
        return taskIcon2;
    }
  };
  const path = usePathname()?.split("/");
  const currentProjectId = path[2];
  const {
    data: workflowDrop,
    isLoading: workflowLoading
  } = useQuery({
    queryKey: ["workflowDrop"],
    queryFn: () => fetchData(`${api.workflows}/${currentProjectId}`)
  });
    
  const [color, setColor] = useState("");
  useEffect(() => {
    const selectedColor = workflowDrop?.data?.find((item: TOptionSelect) => item.value === watch(data?.id));
    if (selectedColor) {
      setColor(selectedColor.class);
    }
  }, [watch, data?.id, workflowDrop]);

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
      
      <div className="flex flex-row gap-8">
        <Badge 
          variant={data?.parent?.color} 
          size={"backlog"} 
          className=" font-medium" 
          text={data?.parent?.name}
        />
        <InputSelect
          name={data?.id}
          control={control}
          required={false}
          className={`w-32 border-none font-semibold capitalize ${color}`}
          datas={workflowDrop?.data}
          defaultValue={watch(data?.id)}
        />
        <Avatar src={dummyAvatar} className="z-[1]" />
      </div>
    </div>
  );
};

export default BacklogCard;