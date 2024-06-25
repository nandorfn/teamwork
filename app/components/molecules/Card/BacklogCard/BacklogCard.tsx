"use client";
import { TBacklogForm, TTodoCard } from "@molecules/types";
import { Avatar, Badge, Icon, InputSelect } from "@components/atoms";
import { bugIcon, epicIcon, storyIcon, taskIcon2, userIcon } from "@assets/svg";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, fetchData } from "@http";
import { usePathname } from "next/navigation";
import { TOptionSelect } from "@atoms/types";
import { useMainStore } from "provider/MainStore";
import { getInitials } from "@func";
import axios from "axios";

const BacklogCard = ({
  data,
  provided,
}: TTodoCard) => {
  const {
    control,
    watch,
  } = useForm<TBacklogForm>({
    defaultValues: {
      backlogStatus: data?.statusId,
    }
  });  
  const { setModal, setData } = useMainStore((state) => state);
  
  const updateStatus = useCallback(async () => {
    try {
      await axios.patch(`${api.backlogs}/${data?.id}`, watch("backlogStatus"));
    } catch (error) {
      console.error("Failed to update status:", error);
      throw error;
    }
  }, [data?.id, watch]);
  

  useEffect(() => {
    if (watch("backlogStatus") !== data?.statusId) {
      updateStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id, data?.statusId, watch("backlogStatus"), updateStatus]);
  const handleClickBacklog = () => {
    setModal(true);
    setData(data);
  };
  
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
  const valueOption = workflowDrop?.data?.find((item: any) => item.value === watch("backlogStatus"));
  
  return (
    <div onClick={handleClickBacklog} ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      className="flex flex-row justify-between items-center dark:bg-zinc-900 bg-white px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
      <div className="flex flex-row gap-3">
        <Icon 
          src={iconIssue(data?.type)} 
          alt="" 
          width={16} 
          height={16}
        />
        <h3>{data?.text}</h3>
      </div>
      
      <div className="flex flex-row gap-8 items-center">
        <Badge 
          variant={data?.parent?.color} 
          size={"backlog"} 
          className=" font-medium" 
          text={data?.parent?.name}
        />
        <InputSelect
          name={"backlogStatus"}
          control={control}
          required={false}
          className={`w-32 border-none bg-zinc-800 my-1  font-semibold capitalize ${color}`}
          datas={workflowDrop?.data}
          defaultValue={valueOption?.label}
        />
        <Avatar 
          name={data?.assignee?.name}
          alt={getInitials(data?.assignee?.name)}  
          color={data?.assignee?.color} 
          src={data?.assignee?.name ? data?.assignee?.avatar : userIcon}
          className="z-[1]"
        />
      </div>
    </div>
  );
};

export default BacklogCard;