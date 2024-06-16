"use client";
import XIcon from "@assets/svg-tsx/XIcon";
import { TOptionSelect } from "@atoms/types";
import { Badge } from "@components/atoms";
import { InputLabel, SelectLabel, TextareaLabel } from "@components/molecules";
import { Comment } from "@components/orgasims/Comment";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { api, fetchData } from "@http";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMainStore } from "provider/MainStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const DetailBacklogForm: React.FC = () => {
  const { data, setModal } = useMainStore((state) => state);
  const path = usePathname()?.split("/");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
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
  console.log(data);

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
    <div className="relative">

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
              <h3 className=" text-xl font-semibold">Description</h3>
              <p>{data?.description}</p>
            </>
          }

          {(data?.assignee || data?.reporter) &&
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">Details</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          }
          <Comment issueId={Number(data?.id)} />
        </section>
      )
      }

    </div>

  );
};

export default DetailBacklogForm;