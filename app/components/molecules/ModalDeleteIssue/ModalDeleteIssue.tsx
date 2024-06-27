import { Button } from "@components/ui/button";
import { en } from "@en";
import { DialogClose } from "@radix-ui/react-dialog";
import Modal from "../Modal/Modal";
import CircleNotchIcon from "@assets/svg-tsx/CircleNotchIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { toast } from "@components/ui/use-toast";
import { api } from "@http";
import TrashIcon from "@assets/svg-tsx/TrashIcon";

const ModalDeleteIssue = ({ projectId, id }: { projectId: string, id: string}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${api.issues}/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["issues", `${projectId}`]});
      toast({
        variant: "success",
        description: en.deleteIssueOk
      });
    },
    onError() {
      toast({
        variant: "success",
        description: en.deleteIssueErr
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
      title={en.deleteIssue}
      childrenTrigger={
        <Button
        variant={"outline"}
        size={"iconXs"}
        >
        <TrashIcon fill="fill-black dark:fill-white" />
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

export default ModalDeleteIssue;