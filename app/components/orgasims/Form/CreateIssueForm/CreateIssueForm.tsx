import axios from "axios";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { DFIssue } from "@defaultValues";
import { TCreateIssue } from "@organisms/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIssueForm, issueSchema } from "@schemas/issueSchemas";
import { InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";
import { useQuery } from "@tanstack/react-query";
import { api, fetchData } from "@http";

const CreateIssueForm =  ({
  refForm,
  setDisabled
}: TCreateIssue) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm<TIssueForm>({
    defaultValues: DFIssue,
    resolver: zodResolver(issueSchema)
  });
  
  const issueTypeDropdown = [
    {
      label: "Epic",
      value: "Epic",
    },
    {
      label: "Task",
      value: "Task",
    },
    {
      label: "Story",
      value: "Story",
    },
    {
      label: "Bug",
      value: "Bug",
    }
  ];
  const parentDropdown = [
    {
      label: "Parent1",
      value: "Parent1",
    },
    {
      label: "Parent2",
      value: "Parent2",
    },
    {
      label: "Parent3",
      value: "Parent3",
    },
    {
      label: "Parent4",
      value: "Parent4",
    },

  ];
  const assigneeDropdown = [
    {
      label: "Unassigned",
      value: "Unassigned",
    },
    {
      label: "User 1",
      value: "user1",
    },
    {
      label: "User 2",
      value: "User 2",
    },
    {
      label: "User 3",
      value: "User 4",
    }
  ];
  
  useEffect(() => {
    setDisabled(!isValid);
  }, [isValid, setDisabled]);
  
  const path = usePathname();
  const currentProjectId = path.split("/")[2];
  
  const {
    data: workflowDrop,
    isLoading: workflowLoading
  } = useQuery({
    queryKey: ["workflowDrop"],
    queryFn: () => fetchData(`${api.workflows}/${currentProjectId}`)
  });
  const {
    data: sprintDrop,
    isLoading: sprintLoading
  } = useQuery({
    queryKey: ["sprintDrop"],
    queryFn: () => fetchData(`${api.sprints}/${currentProjectId}`)
  });
  console.log(workflowDrop);
  console.log(watch("status"));

  const onSubmit: SubmitHandler<TIssueForm> = (data: TIssueForm) => {
    const newData = {
      ...data,
      projectId: currentProjectId,
    };

    console.log(newData);
    axios.post(api.issues, newData);
  };
  return (
    <form 
      ref={refForm}
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputLabel 
        name="summary"
        label="Summary"
        required
        placeholder=""
        type="text"
        control={control}
      />
      
      <SelectLabel
        label='Issue Type'
        name={"issueType"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={issueTypeDropdown}
        defaultValue={watch("issueType")}
      />
      
      <SelectLabel
        label='Status'
        name={"status"}
        control={control}
        required
        isLoading={workflowLoading}
        className={" border-zinc-800 h-[42px]"}
        datas={workflowDrop}
        defaultValue={watch("status")}
      />
      
      <TextareaLabel 
        label='Description'
        name='description'
        control={control}
        required={false}
        placeholder='Description'
      />
      
      <SelectLabel
        label='Assignee'
        name={"assigneeIssue"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={assigneeDropdown}
        defaultValue={watch("assigneeIssue")}
      />
      <SelectLabel
        label='Parent'
        name={"parent"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={parentDropdown}
        defaultValue={watch("parent")}
      />
      <SelectLabel
        label='Sprint'
        name={"sprint"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={sprintDrop?.data}
        defaultValue={watch("sprint")}
      />
      <SelectLabel
        label='Reporter'
        name={"reporter"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={parentDropdown}
        defaultValue={watch("reporter")}
      />
    </form>
  );
};

export default CreateIssueForm;