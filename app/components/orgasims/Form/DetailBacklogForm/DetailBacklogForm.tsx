"use client";
import { en } from "@en";
import { api, fetchData } from "@http";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "provider/MainStore";
import XIcon from "@assets/svg-tsx/XIcon";

import { Badge } from "@components/atoms";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Comment } from "@components/orgasims/Comment";
import { Accordion2, InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";

const DetailBacklogForm: React.FC = () => {
  const { data, setModal } = useMainStore((state) => state);
  const path = usePathname()?.split("/");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const currentProjectId = path[2];
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
      assignee: String(data?.assignee?.id)
    }
  });

  useEffect(() => {
    reset({
      name: data?.text,
      status: data?.statusId,
      description: data?.description,
      assignee: data?.assignee?.id && String(data?.assignee?.id)
    });
  }, [data, reset]);

  return (
    <div className="relative ">
      <h3 className=" text-xl font-semibold">Details</h3>
      <Button
        variant={"outline"}
        size={"xs"}
        className="absolute right-8 top-0"
        onClick={() => setIsUpdate(!isUpdate)}>
        Update
      </Button>
      <Button
        onClick={() => setModal(false)}
        className="absolute right-0 top-0"
        variant={"ghost"}
        size={"iconXs"}
      >
        <XIcon fill="fill-white" />
      </Button>

      {isUpdate ? (
        <form>
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

  );
};

export default DetailBacklogForm;