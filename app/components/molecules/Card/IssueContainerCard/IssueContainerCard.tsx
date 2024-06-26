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
import { Modal, ModalCompleteSprint } from "@components/molecules/Modal";
import { CreateIssueForm } from "@components/orgasims";
import { DialogClose } from "@components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@http";
import { usePathname } from "next/navigation";
import { en } from "@en";
import { useForm } from "react-hook-form";
import { sprintStatus } from "@mocks/mockData";
import ModalDeleteSprint from "@components/molecules/ModalDeleteSprint/ModalDeleteSprint";
import { ModalSprintForm } from "@components/molecules/ModalSprintForm";

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
    mutationFn: (status: string) => {
      return axios.post(`${api.sprints}/${currentProjectId}`);
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["issues", `${currentProjectId}`] });
    }
  });

  const {
    control
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
      case sprintStatus.todo:
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
            onClick={() => mutateSprint.mutate(data?.status)}
            className="font-semibold"
            variant={"secondary"}
            size={"xs"}
          >
            {buttonStatus(data?.status)}
          </Button>
        );
      case sprintStatus.complete:
        const newData = {
          id: Number(data?.id),
          data: data?.data
        };
        return (
          <ModalCompleteSprint
            data={newData}
            projectId={Number(currentProjectId)}
          />
        );
      case "start":
        return (
          <ModalSprintForm
            status="start"
            refFormStart={refFormStart}
            setDisabled={setDisabled}
            data={data}
            disabled={disabled}
          />
        );
      case "edit":
        return (
          <ModalSprintForm
            status="edit"
            refFormStart={refFormStart}
            setDisabled={setDisabled}
            data={data}
            disabled={disabled}
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
                  <div className="flex-row gap-2 flex">
                    <Badge className="px-3 bg-zinc-300 dark:bg-zinc-900" text={totalTodo} />
                    <Badge className="px-3 bg-blue-600" text={totalTask} />
                    <Badge className="px-3 bg-red-600" text={totalBug} />
                  </div>
                  {droppabledId === "backlog"
                    ? (
                      <ButtonStatusComp status={"create"} />
                    ) : (
                      <>
                        <ButtonStatusComp
                          status={
                            data?.status === sprintStatus.progress
                              ? sprintStatus.complete
                              : "start"
                          } />
                        <ButtonStatusComp status={"edit"} />
                        <ModalDeleteSprint id={data?.id} projectId={currentProjectId} />
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