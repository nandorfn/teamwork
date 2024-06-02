"use client";
import React, { useRef, useState } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { TIssueContainer } from "@molecules/types";
import { cn, countFilterArr } from "@func";
import { Button } from "@components/ui/button";
import { Badge, Icon } from "@components/atoms";
import { caretDown, caretDownDark, caretRight, caretRightDark, plusDark, plusIcon } from "@assets/svg";
import { useTheme } from "next-themes";
import { DatePickerRange } from "@components/molecules/DatePickerRange";
import { Modal } from "@components/molecules/Modal";
import { CreateIssueForm, StartSprintForm } from "@components/orgasims";
import { DialogClose } from "@components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@http";
import { usePathname } from "next/navigation";
import { en } from "@en";
import { useForm } from "react-hook-form";
import PenIcon from "@assets/svg-tsx/PenIcon";
import XIcon from "@assets/svg-tsx/XIcon";

const IssueContainerCard = ({
  children,
  length,
  title,
  droppabledId,
  containerClass,
  containerChildClass,
  data,
  isBacklog = false,
}: TIssueContainer) => {
  const { theme } = useTheme();
  const refForm = useRef<HTMLFormElement>(null);
  const refFormStart = useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const path = usePathname();
  const currentProjectId = path.split("/")[2];

  const totalTodo = countFilterArr(data?.data, "status", "todo");
  const totalTask = countFilterArr(data?.data, "status", "in progress");
  const totalBug = countFilterArr(data?.data, "status", "done");

  const mutateSprint = useMutation({
    mutationFn: () => {
      return axios.post(`${api.sprints}/${currentProjectId}`);
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["issues", `${currentProjectId}`] });
    }
  });

  const {
    control, watch, setValue
  } = useForm({
    defaultValues: {
      dateRange: {
        from: data?.startDate,
        to: data?.endDate
      }
    }
  });

  const buttonStatus = (status: string) => {
    switch (status) {
      case "todo":
        return en.startSprint;
      case "backlog":
        return en.createSprint;
      default:
        return en.completeSprint;
    }
  };

  const ButtonStatusComp = ({ status }: { status: string }) => {
    switch (status) {
      case "create":
        return (
          <Button
            onClick={() => mutateSprint.mutate()}
            className="font-semibold"
            variant={"secondary"}
            size={"xs"}
          >
            {buttonStatus(data?.status)}
          </Button>
        );
      case "start":
        return (
          <Modal
            title="Start Sprint"
            childrenTrigger={
              <Button
                className="font-semibold"
                variant={"secondary"}
                size={"xs"}
              >
                {buttonStatus(data?.status)}
              </Button>
            }
            childrenContent={
              <StartSprintForm
                refForm={refFormStart}
                data={data}
                setDisabled={setDisabled}
              />
            }
            childrenFooter={
              <DialogClose asChild>
                <Button
                  disabled={disabled}
                  onClick={() => refFormStart?.current?.requestSubmit()}
                  variant={"default"}>
                  Start
                </Button>
              </DialogClose>
            }
          />
        );
      case "edit":
        return (
          <Modal
            title="Edit Sprint"
            childrenTrigger={
              <Button variant={"secondary"} className="bg-none hover:bg-none" size={"iconXs"}>
                <PenIcon width="16" height="16" fill="dark:fill-secondary-foreground fill-black" />
              </Button>
            }
            childrenContent={
              <StartSprintForm
                refForm={refFormStart}
                data={data}
                setDisabled={setDisabled}
              />
            }
            childrenFooter={
              <DialogClose asChild>
                <Button
                  disabled={disabled}
                  onClick={() => refFormStart?.current?.requestSubmit()}
                  variant={"default"}>
                  Edit
                </Button>
              </DialogClose>
            }
          />
        );
    }
  };

  return (
    <Droppable droppableId={droppabledId}>
      {(provided: DroppableProvided, snap: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            cn("flex flex-col py-3 px-3 gap-5 bg-white-100 dark:bg-black rounded-xl w-full dark:border dark:shadow-md ",
              containerClass
            )}>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-5">
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant={"ghost"}
                className="p-0 m-0 hover:bg-black">
                <Icon
                  src={
                    isCollapsed
                      ? (theme === "dark" ? caretDown : caretDownDark)
                      : (theme === "dark" ? caretRight : caretRightDark)
                  }
                  width={20}
                  height={20}
                  alt="collapse" />
              </Button>
              <h3 className="font-medium text-lg flex items-center">{title}</h3>
              {(isBacklog && title !== "Backlog") &&
                <>
                  <DatePickerRange
                    disabled={false}
                    control={control}
                    name="dateRange"
                  />
                  <p>{`(${length} issues)`}</p>
                </>
              }
            </div>

            <div className="flex flex-row items-center gap-4">
              {isBacklog &&
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-2">
                    <Badge className="px-3 bg-zinc-900" text={totalTodo} />
                    <Badge className="px-3 bg-blue-600" text={totalTask} />
                    <Badge className="px-3 bg-red-600" text={totalBug} />
                  </div>
                  {droppabledId === "backlog"
                    ? (
                      <ButtonStatusComp status={"create"} />
                    ) : (
                      <>
                        <ButtonStatusComp status={"start"} />
                        <ButtonStatusComp status={"edit"} />
                        <Button variant={"secondary"} className="bg-none hover:bg-none" size={"iconXs"}>
                          <XIcon width="16" height="16" fill="dark:fill-secondary-foreground fill-black" />
                        </Button>
                      </>
                    )
                  }
                </div>
              }

            </div>
          </div>
          {isCollapsed &&
            <div className={cn("flex flex-col dark:divide-y dark:divide-zinc-800", containerChildClass)}>
              {children}
            </div>
          }
          {provided.placeholder}

          <Modal
            title="Create Issue"
            childrenTrigger={
              <Button variant={"ghost"} className="w-full gap-2 justify-start p-2" size={"iconXs"}>
                <Icon
                  src={theme === "dark" ? plusIcon : plusDark}
                  alt="plus"
                  width={16}
                  height={16} />
                <p>Create Issue</p>
              </Button>}
            childrenContent={
              <CreateIssueForm
                defaultValue={{
                  sprint: droppabledId
                }}
                setDisabled={setDisabled}
                refForm={refForm}
              />
            }
            childrenFooter={
              <DialogClose asChild>
                <Button
                  disabled={disabled}
                  onClick={() => refForm?.current?.requestSubmit()}
                  variant={"default"}>
                  Create Issue
                </Button>
              </DialogClose>
            }
          />
        </div>
      )}
    </Droppable>
  );
};

export default IssueContainerCard;