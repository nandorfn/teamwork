import { useState } from "react";
import Modal from "../Modal";
import { Button } from "@components/ui/button";
import { en } from "@en";
import CircleNotchIcon from "@assets/svg-tsx/CircleNotchIcon";
import { DialogClose } from "@components/ui/dialog";
import { toast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SprintDataItem, TCompleteSprint } from "@server/types";
import axios from "axios";
import { api } from "@http";
import { SelectLabel } from "@components/molecules/SelectLabel";
import { useForm } from "react-hook-form";

export type TModalCompleteSprint = {
  projectId: number,
  data: {
    data: SprintDataItem[];
    id: number,
  }
};

const ModalCompleteSprint = ({ projectId, data }: TModalCompleteSprint) => {
  const {
    control
  } = useForm();

  const openId = data?.data?.filter((item: SprintDataItem) => item.status?.toLowerCase() !== "done")
    .map((item: SprintDataItem) => parseInt(item.id));

  const closeId = data?.data?.filter((item: SprintDataItem) => item.status?.toLowerCase() === "done")
    .map((item: SprintDataItem) => parseInt(item.id));

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const newData = {
    id: data?.id,
    data: openId,
  };
  const mutation = useMutation({
    mutationFn: (data: TCompleteSprint) => {
      return axios.put(`${api.sprints}/${projectId}`, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["issues", `${projectId}`] });
      toast({
        variant: "success",
        description: en.deleteSprintOk
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: en.deleteSprintErr
      });
    },
    onSettled() {
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={en.completeSprint}
      childrenTrigger={
        <Button
          className="font-semibold"
          variant={"secondary"}
          size={"xs"}
        >
          {en.completeSprint}
        </Button>
      }
      childrenContent={
        <div>
          <p>This sprint contains:</p>
            <ul className="ps-10 my-4">
              <li>{`${closeId?.length} complete issue`}</li>
              <li>{`${openId?.length} open issue`}</li>
            </ul>
          {/* <SelectLabel 
            label="Move open issue to" 
            name="sprint" 
            control={control}
            required
          /> */}
        </div>
      }
      childrenFooter={
        <div className="flex gap-4">
          <DialogClose asChild>
            <Button className="w-20">
              {en.cancel}
            </Button>
          </DialogClose>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(newData)}
            variant={"primary"}
            className="w-20">
            {mutation.isPending
              ? <CircleNotchIcon />
              : en.yes
            }
          </Button>
        </div>
      }
    />
  );
};

export default ModalCompleteSprint;