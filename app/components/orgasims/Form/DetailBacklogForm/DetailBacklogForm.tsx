"use client";
import XIcon from "@assets/svg-tsx/XIcon";
import { TOptionSelect } from "@atoms/types";
import { InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";
import { Button } from "@components/ui/button";
import { api, fetchData } from "@http";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMainStore } from "provider/MainStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DetailBacklogForm: React.FC = () => {
  const { data, setModal } = useMainStore((state) => state);
  const path = usePathname()?.split("/");
  const currentProjectId = path[2];
  console.log(data);
  const {
    data: workflowDrop,
    isLoading: workflowLoading
  } = useQuery({
    queryKey: ["workflowDrop"],
    queryFn: () => fetchData(`${api.workflows}/${currentProjectId}`)
  });
  
  const {
    data: assigneDrop,
    isLoading: assigneeLoading
  } = useQuery({
    queryKey: ["assigneeDrop"],
    queryFn: () => fetchData(`${api.usersDrop}/${currentProjectId}`)
  });
  
  const {
    control,
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: data?.text,
      status: data?.statusId,
      description: data?.description,
      assignee: data?.assignee?.id
    }
  });

  useEffect(() => {
    reset({
      name: data?.text,
      status: data?.statusId,
      description: data?.description,
      assignee: data?.assignee?.id
    });
  }, [data, reset]);

  return (
    <form className="relative">
      <h2 className=" text-xl font-semibold">Details</h2>
      <Button 
        onClick={() => setModal(false)} 
        className="absolute right-0 top-0" 
        variant={"ghost"} 
        size={"iconXs"}
      >
        <XIcon fill="fill-white" />
      </Button>

      <div className="flex flex-col gap-4 mt-4">
        <InputLabel
          label="Summary"
          className="border-none hover:border-1"
          name="name"
          required
          placeholder=""
          type="text"
          control={control}
        />
        <SelectLabel
          label="Status"
          name="status"
          control={control}
          defaultValue={data?.statusId}
          datas={workflowDrop?.data}
          isLoading={workflowLoading}
          required={false}
        />
        <SelectLabel
          label="Assignee"
          name="assignee"
          control={control}
          datas={assigneDrop?.data}
          isLoading={assigneeLoading}
          required={false}
          defaultValue={data?.assignee?.id}
        />
        <TextareaLabel 
          name="description" 
          required={false} 
          placeholder="" 
          label="Description"
          control={control}
        />
      </div>
      
      <div className="flex w-full justify-end mt-4">
      <Button className=" justify-end" variant={"primary"} type="submit">
        Update
      </Button>
      </div>
    </form>
  );
};

export default DetailBacklogForm;