"use client";
import { en } from "@en";
import axios from "axios";
import { api, fetchData } from "@http";
import { TCommentRes } from "@server/types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getInitials, getTimeAgo } from "@func";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AscIcon from "@assets/svg-tsx/AscIcon";
import DescIcon from "@assets/svg-tsx/DescIcon";

import { DeleteModal } from "./DeleteModal";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { Separator } from "@components/ui/separator";
import { CommentSkeleton } from "@components/molecules";
import { Avatar, Looping, Textarea } from "@components/atoms";

type TComment = {
  comment: string;
}
type TCommentEdit = {
  commentEdit: string;
}

type TSendComment = {
  issueId: number;
  projectId: number;
  text: string;
}

const Comment = ({ issueId }: { issueId: number }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch
  } = useForm<TComment>({
    defaultValues: {
      comment: ""
    }
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    setValue
  } = useForm<TCommentEdit>();

  const path = usePathname()?.split("/");
  const [isDesc, setIsDesc] = useState(false);
  const [isEditId, setIsEditId] = useState<number | null>(null);

  const {
    data: commentList,
    isLoading: commentLoading
  } = useQuery({
    queryKey: ["comments", issueId, isDesc],
    queryFn: () => fetchData(`${api.comments}/${issueId}?orderBy=${isDesc ? "asc" : "desc"}`)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment: TSendComment) => {
      return axios.post(api.comments, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(({ queryKey: ["comments", issueId, isDesc] }));
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: (newComment: TSendComment) => {
      return axios.put(`${api.comments}/${issueId}/${isEditId}`, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(({ queryKey: ["comments", issueId, isDesc] }));
    },
    onSettled: () => {
      setIsEditId(null);
      reset2({
        commentEdit: "",
      });
    }
  });

  const onSubmit: SubmitHandler<TComment> = async (data: TComment) => {
    const formattedData = {
      projectId: Number(path[2]),
      issueId: Number(issueId),
      text: data?.comment
    };
    reset({
      comment: "",
    });
    mutation.mutate(formattedData);
  };

  const onEdit: SubmitHandler<TCommentEdit> = async (data: TCommentEdit) => {
    const formattedData = {
      projectId: Number(path[2]),
      issueId: Number(issueId),
      text: data?.commentEdit
    };
    mutationUpdate.mutate(formattedData);
  };

  const [timeAgoList, setTimeAgoList] = useState<string[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      if (commentList?.data) {
        const newTimeAgoList = commentList.data.map((item: TCommentRes) => getTimeAgo(item.createdAt));
        setTimeAgoList(newTimeAgoList);
      }
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 60000);

    return () => clearInterval(intervalId);
  }, [commentList]);

  const isDisabled = (commentLoading || mutationUpdate.isPending || mutationUpdate.isPending);

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-lg font-medium mb-4">{en.comments}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 justify-end">
        <Textarea
          name="comment"
          control={control}
          placeholder={en.commentPlaceholder}
          required={false}
        />
        {(watch("comment").length > 0) && (
          <Button type="submit" variant={"primary"} className="w-fit self-end">{en.save}</Button>
        )}
      </form>

      {(commentList?.data?.length > 0 || mutation.isPending) && (
        <div className="inline-flex justify-between items-center my-2">
          <h4 className="font-semibold ">{en.activity}</h4>
          <Button
            disabled={isDisabled}
            onClick={() => setIsDesc(!isDesc)}
            variant={"menu"}
            size={"xs"}
            className="p-0"
          >
            {isDesc ? (
              <div className="inline-flex gap-2">
                <p>{en.oldest}</p>
                <DescIcon width="16" height="16" fill="dark:fill-secondary-foreground fill-black" />
              </div>
            ) : (
              <div className="inline-flex gap-2">
                <p>{en.newest}</p>
                <AscIcon width="16" height="16" fill="dark:fill-secondary-foreground fill-black" />
              </div>
            )
            }
          </Button>
        </div>
      )
      }

      <div className="flex flex-col mt-2 h-[calc(100vh-38.6rem)] gap-2 overflow-y-scroll">
        {mutation.isPending && (
          <>
            <div className="flex flex-row gap-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="flex flex-col w-[calc(100%- 1.5rem)]">
                <div className="flex flex-row items-center gap-2">
                <p className="font-medium text-zinc-400">{"You"}</p>
                <span className=" text-zinc-400">{"0 second ago"}</span>
                </div>
            <p className="text-zinc-500">{mutation?.variables?.text}</p>
            <div className="flex flex-row gap-4">
              <Button
                disabled
                variant={"text"}
                size={"text"}
              >
                {en.edit}
              </Button>
              <Separator
                className="h-4 my-auto"
                orientation="vertical"
              />
              <Button
                disabled
                variant={"text"}
                size={"text"}
              >
                {en.delete}
              </Button>
            </div>
            </div>
            </div>
          </>
        )
        }
        {commentLoading ? (
          <Looping className="gap-2" loopCount={5}>
            <CommentSkeleton />
          </Looping>
        ) : (
          commentList?.data?.map((item: TCommentRes, index: number) => (
            <div className="flex flex-row gap-2" key={item?.id}>
              <Avatar
                src={item?.user?.avatar}
                alt={getInitials(item?.user?.name)}
                name={item?.user?.name}
              />
              <div className="flex flex-col w-[calc(100%- 1.5rem)]">
                <div className="flex flex-row gap-2">
                  <p className="font-medium text-zinc-400">{item?.user?.name}</p>
                  <span className=" text-zinc-400">{timeAgoList[index]}</span>
                </div>
                {isEditId === item?.id ? (
                  <form onSubmit={handleSubmit2(onEdit)} className="flex flex-col w-full gap-2 justify-end">
                    <Textarea
                      name="commentEdit"
                      className="w-[99.3%]"
                      control={control2}
                      defaultValue={item?.text}
                      placeholder={""}
                      required={false}
                    />
                    <div className="inline-flex gap-4 justify-end">
                      <Button
                        disabled={isDisabled}
                        onClick={() => setIsEditId(null)}
                        type="button"
                        variant={"ghost"}
                        className="w-fit self-end">
                        {en.cancel}
                      </Button>
                      <Button
                        disabled={isDisabled}
                        type="submit"
                        variant={"primary"}
                        className="w-fit self-end">
                        {en.save}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p>{item?.text}</p>
                    <div className="flex flex-row gap-4">
                      <Button
                        disabled={isDisabled}
                        onClick={() => {
                          setValue("commentEdit", item?.text);
                          setIsEditId(item?.id);
                        }}
                        variant={"text"}
                        size={"text"}
                      >
                        {en.edit}
                      </Button>
                      <Separator
                        className="h-4 my-auto"
                        orientation="vertical"
                      />
                      <DeleteModal
                        isDisabled={isDisabled}
                        issueId={issueId}
                        commentId={item?.id}
                      />
                    </div>
                  </>
                )
                }
              </div>
            </div>
          )
          ))}
      </div>
    </div>
  );
};

export default Comment;