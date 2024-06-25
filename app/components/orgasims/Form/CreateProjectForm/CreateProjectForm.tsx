"use client";
import { useState } from "react";
import { InputLabel, Loader } from "@components/molecules";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogClose } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { TProjectForm, projectSchema } from "@schemas/projectSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@http";

const CreateProjectForm = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid }
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      key: "",
    }
  });

  const queryClient = useQueryClient();
  
  const onSubmit: SubmitHandler<TProjectForm> = async (formData: TProjectForm) => {
    setLoading(true);
    axios.post(api.memberships, formData)
      .then(response => {
        if (response?.status === 201) {
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["projectMember"] });
        }
      })
      .catch(error => {
        if (error.response) {
          const { errors } = error?.response?.data;
          if (errors?.name) {
            setError("name", {
              type: "server",
              message: errors.name,
            });
          } else if (errors?.key) {
            setError("key", {
              type: "server",
              message: errors.key,
            });
          } else {
            setError("key", {
              type: "server",
              message: "Something went wrong",
            });
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
      >
        <span className="text-sm">Discover what you can achieve by collaborating with your team. Modify project details anytime in the project settings.</span>
        <div>
          <InputLabel
            name="name"
            type="text"
            label="Project Name"
            control={control}
            required
            placeholder=""
          />
          <p className=" text-red-500">{errors?.name?.message}</p>
        </div>

        <div>
          <InputLabel
            name="key"
            type="text"
            label="Key"
            control={control}
            required
            placeholder=""
          />
          <p className=" text-red-500">{errors?.key?.message}</p>
        </div>

        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button className="w-20">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
            type="submit"
            variant={"primary"}
            className="w-20">
            Create
          </Button>
        </div>
      </form >
    </div >
  );
};

export default CreateProjectForm;