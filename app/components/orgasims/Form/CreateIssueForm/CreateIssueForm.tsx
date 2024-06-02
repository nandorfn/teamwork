import axios from "axios";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { DFIssue } from "@defaultValues";
import { TCreateIssue } from "@organisms/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TIssueForm, issueSchema } from "@schemas/issueSchemas";
import { InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetchData } from "@http";
import { TOptionSelect } from "@atoms/types";

const CreateIssueForm = ({
  refForm,
  setDisabled,
  defaultValue,
}: TCreateIssue) => {
  const path = usePathname();
  const currentProjectId = path.split("/")[2];

  const {
    data: workflowDrop,
    isLoading: workflowLoading
  } = useQuery({
    queryKey: ["workflowDrop"],
    queryFn: () => fetchData(`${api.workflows}/${currentProjectId}`)
  });
  const getTodoWorkflow = workflowDrop?.data?.find((item: TOptionSelect) => item?.label?.toLowerCase() === "todo");

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, defaultValues: test }
  } = useForm<TIssueForm>({
    defaultValues: {
      ...DFIssue,
      sprint: defaultValue?.sprint
    },
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

  useEffect(() => {
    setDisabled(!isValid);
  }, [isValid, setDisabled, test]);


  const {
    data: issueParent,
    isLoading: issueParentLoading
  } = useQuery({
    queryKey: ["issueParent"],
    queryFn: () => fetchData(`${api.issues}/${currentProjectId}/Epic`)
  });
  const {
    data: sprintDrop,
    isLoading: sprintLoading
  } = useQuery({
    queryKey: ["sprintDrop"],
    queryFn: () => fetchData(`${api.sprints}/${currentProjectId}`)
  });
  const {
    data: assigneDrop,
    isLoading: assigneeLoading
  } = useQuery({
    queryKey: ["assigneeDrop"],
    queryFn: () => fetchData(`${api.usersDrop}/${currentProjectId}`)
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newIssue: any) => {
      return axios.post(api.issues, newIssue);
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["issues", `${currentProjectId}`] });
    }
  });

  const onSubmit: SubmitHandler<TIssueForm> = (data: TIssueForm) => {
    const newData = {
      ...data,
      projectId: currentProjectId,
    };

    mutation.mutate(newData);
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
        datas={workflowDrop?.data}
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
        datas={assigneDrop?.data}
        defaultValue={watch("assigneeIssue")}
      />
      <SelectLabel
        label='Parent'
        name={"parent"}
        control={control}
        required
        className={" border-zinc-800 h-[42px]"}
        datas={issueParent?.data}
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