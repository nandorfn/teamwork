"use client";
import { en } from "@en";
import axios from "axios";
import { api, fetchData } from "@http";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMainStore } from "provider/MainStore";
import XIcon from "@assets/svg-tsx/XIcon";

import { Badge } from "@components/atoms";
import { Button } from "@components/ui/button";
import { toast } from "@components/ui/use-toast";
import { Separator } from "@components/ui/separator";
import { Comment } from "@components/orgasims/Comment";
import { Accordion2, InputLabel, SelectLabel, TextareaLabel, Loader } from "@components/molecules";
import { TEditIssueForm } from "@schemas/issueSchemas";
import { TEditDetail } from "@server/types";
import PenIcon from "@assets/svg-tsx/PenIcon";
import ModalDeleteIssue from "@components/molecules/ModalDeleteIssue/ModalDeleteIssue";
import { Skeleton } from "@components/ui/skeleton";

const DetailBacklogForm: React.FC = () => {
  const path = usePathname()?.split("/");
  const currentProjectId = path[2];
  const { data, setModal } = useMainStore((state) => state);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
    handleSubmit
  } = useForm<TEditIssueForm>({
    defaultValues: {
      summary: data?.text,
      status: data?.statusId,
      description: data?.description,
      assignee: String(data?.assignee?.id)
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (edited: TEditDetail) => {
      return axios.put(`${api.backlogs}/${data?.id}`, edited);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["issues", `${currentProjectId}`] });
      toast({
        variant: "success",
        description: en.editIssueOk
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: en.editIssueErr
      });
    }
  });

  const onSubmit: SubmitHandler<TEditIssueForm> = async (data: TEditIssueForm) => {
    const newData = {
      summary: data?.summary ?? "",
      status: Number(data?.status) ?? null,
      assignee: Number(data?.assignee) ?? null,
      description: data?.description ?? "",
    };
    mutation.mutate(newData);
  };

  useEffect(() => {
    reset({
      summary: data?.text,
      status: data?.statusId,
      description: data?.description,
      assignee: data?.assignee?.id && String(data?.assignee?.id)
    });
  }, [data, reset]);

  return (
    <>
      {mutation.isPending && (<Loader />)}
      <div className="relative ">
        <h3 className=" text-xl font-semibold">Details</h3>
        <div className="flex flex-row gap-2 absolute right-8 top-0">
          <Button
            variant={"outline"}
            size={"iconXs"}
            onClick={() => setIsUpdate(!isUpdate)}>
            <PenIcon fill="fill-black dark:fill-white" />
          </Button>
          <ModalDeleteIssue projectId={currentProjectId} id={data?.id} />
        </div>
        <Button
          onClick={() => setModal(false)}
          className="absolute right-0 top-0"
          variant={"ghost"}
          size={"iconXs"}
        >
          <XIcon fill="fill-white" />
        </Button>

        {isUpdate ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mt-4">
              <InputLabel
                label="Summary"
                className="border-none hover:border-1"
                name="summary"
                required
                placeholder=""
                type="text"
                control={control}
              />
              {workflowLoading ? (
                <Skeleton className="w-full h-8" />
              ) : (
                <SelectLabel
                  label="Status"
                  name="status"
                  control={control}
                  defaultValue={data?.statusId}
                  datas={workflowDrop?.data}
                  isLoading={workflowLoading}
                  required={false}
                />
              )
              }
              {assigneeLoading ? (
                <Skeleton className="w-full h-8" />
              ) : (
                <SelectLabel
                  label="Assignee"
                  name="assignee"
                  control={control}
                  datas={assigneDrop?.data}
                  isLoading={assigneeLoading}
                  required={false}
                />
              )
              }
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
        ) : (
          <section className="flex flex-col gap-4">
            <h3>{data?.text}</h3>
            <Badge
              text={data?.status}
              variant={"blue"}
              size={"backlog"}
              className="w-fit py-1 px-6 text-black"
            />

            {data?.description &&
              <>
                <Accordion2 title={en.description}>
                  <p>{data?.description}</p>
                </Accordion2>
              </>
            }

            {(data?.assignee || data?.reporter) && (
              <Accordion2 title={en.details}>
                <table className="flex w-full">
                  <tbody className="border p-2 flex w-full rounded">
                    {data?.assignee &&
                      <tr className="flex flex-row gap-[1%] w-full">
                        <td className="w-[49%]">Assignee</td>
                        <Separator orientation="vertical" />
                        <td className="w-[49%]">{data?.assignee?.name}</td>
                      </tr>
                    }
                    {data?.reporter &&
                      <tr>
                        <td>Reporter</td>
                        <td>{data?.reporter?.name}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </Accordion2>
            )}

            <Comment issueId={Number(data?.id)} />
          </section>
        )
        }

      </div >
    </>

  );
};

export default DetailBacklogForm;