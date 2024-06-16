"use client";
import { Textarea } from "@components/atoms";
import { Button } from "@components/ui/button";
import { api, fetchData } from "@http";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type TComment = {
  comment: string;
}

type TSendComment = {
  issueId: number;
  projectId: number;
  text: string;
}

const Comment = ({ issueId}: {issueId: number}) => {
  const {
    control,
    handleSubmit,
  } = useForm<TComment>();
  
  const path = usePathname()?.split("/");
  
  const mutation = useMutation({
    mutationFn: (newComment: TSendComment) => {
      return axios.post(api.comments, newComment);
    },
  });
    
  const onSubmit: SubmitHandler<TComment> = async (data: TComment) => {
    const formattedData = {
      projectId: Number(path[2]),
      issueId: Number(issueId),
      text: data?.comment
    };
    mutation.mutate(formattedData);
  };

  return (
    <div className="flex flex-col w-full border rounded-md p-2">
      <h3 className="text-lg font-medium">Comments</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 justify-end">
        <Textarea
          name="comment"
          control={control}
          placeholder="Write your comment here!"
          required={false}
        />
        <Button type="submit" className="w-fit self-end">Send</Button>
      </form>
      <div>
      </div>
    </div>
  );
};

export default Comment;