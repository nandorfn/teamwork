import { Modal } from "@components/molecules";
import { Button } from "@components/ui/button";
import { DialogClose } from "@components/ui/dialog";
import { toast } from "@components/ui/use-toast";
import { en } from "@en";
import { api } from "@http";
import { TDeleteComment } from "@molecules/types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const DeleteModal = ({
  issueId,
  commentId,
  isDisabled
}: TDeleteComment) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const handleLogout = async () => {
    setLoading(true);
    await axios.delete(`${api.comments}/${issueId}/${commentId}`)
      .then((res) => {
        if (res?.status === 200) {
          queryClient.invalidateQueries(({ queryKey: ["comments", issueId] }));
          toast({
            variant: "success",
            description: en.deleteCommentOk,
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: en.deleteCommentErr,
        });
        setLoading(false);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title={en.deleteComment}
        childrenTrigger={
          <Button
            disabled={isDisabled}
            variant={"text"}
            size={"text"}
          >
            {en.delete}
          </Button>
        }
        childrenContent={
          <p>{en.confirmDelete}</p>
        }
        childrenFooter={
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button className="w-20">
                {en.cancel}
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={handleLogout}
              variant={"primary"}
              className="w-20">
              {en.yes}
            </Button>
          </div>
        }
      />

    </>
  );
};

export default DeleteModal;