import { en } from "@en";
import axios from "axios";
import { api } from "@http";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "@components/ui/button";
import XIcon from "@assets/svg-tsx/XIcon";
import { DialogClose } from "@components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@components/ui/use-toast";
import { Icon } from "@components/atoms";
import CircleNotchIcon from "@assets/svg-tsx/CircleNotchIcon";

const ModalDeleteSprint = ({ id, projectId }: { id: string | number, projectId: string | number }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${api.sprints}/${projectId}/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["issues", `${projectId}`]});
      toast({
        variant: "success",
        description: en.deleteSprintOk
      });
    },
    onError() {
      toast({
        variant: "success",
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
      title={en.deleteSprint}
      childrenTrigger={
        <Button
          variant={"secondary"}
          className="bg-none hover:bg-none"
          size={"iconXs"}
        >
          <XIcon
            width="16"
            height="16"
            fill="dark:fill-secondary-foreground fill-black" />
        </Button>
      }
      childrenContent={en.confirmDelete}
      childrenFooter={
        <div className="flex gap-4">
          <DialogClose asChild>
            <Button className="w-20">
              {en.cancel}
            </Button>
          </DialogClose>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            variant={"primary"}
            className="w-20">
            { mutation.isPending 
              ? <CircleNotchIcon />
              : en.yes
            }
          </Button>
        </div>
      }
    />
  );
};

export default ModalDeleteSprint;