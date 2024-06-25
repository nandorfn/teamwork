import Modal from "../Modal/Modal";
import { useRef, useState } from "react";
import { Button } from "@components/ui/button";
import { InputLabel } from "../InputLabel";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogClose } from "@components/ui/dialog";
import { en } from "@en";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@http";
import { TMemberSchema } from "@schemas/memberSchemas";
import CircleNotchIcon from "@assets/svg-tsx/CircleNotchIcon";
import { toast } from "@components/ui/use-toast";
import { usePathname } from "next/navigation";

const ModalInviteMember: React.FC = () => {
  const path = usePathname()?.split("/")[2];
  const [open, setOpen] = useState<boolean>(false);
  const refForm = useRef<HTMLFormElement>(null);
  const { control, handleSubmit } = useForm<TMemberSchema>({
    defaultValues: {
      email: "",
    }
  });

  const mutation = useMutation({
    mutationFn: (data: TMemberSchema) => {
      return axios.post(`${api.memberships}/${path}`, data);
    },
    onSuccess() {
      toast({
        variant: "success",
        description: en.addMemberOk
      });
    },
    onError() {
      toast({
        variant: "destructive",
        description: en.addMemberErr
      });
    },
    onSettled() {
      setOpen(false);
    }
  });

  const onSubmit: SubmitHandler<TMemberSchema> = (data: TMemberSchema) => {
    mutation.mutate(data);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Invite Member"
      childrenTrigger={
        <Button variant={"secondary"} size={"xs"}>Invite</Button>
      }
      childrenContent={
        <form ref={refForm} onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-4">Input email for a new member</p>
          <InputLabel 
            type="text" 
            name="email" 
            label="Email" 
            control={control} 
            placeholder="input email..."
            required
            />
        </form>
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
            onClick={() => refForm?.current?.requestSubmit()}
            variant={"primary"}
            className="w-20">
            { mutation.isPending 
              ? <CircleNotchIcon />
              : en.yes
            }
          </Button>
        </div>
      }
    >
    </Modal>
  );
};

export default ModalInviteMember;