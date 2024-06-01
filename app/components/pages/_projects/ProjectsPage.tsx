"use client";
import { Avatar } from "@components/atoms";
import { Button } from "@components/ui/button";
import { cn } from "@func";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import dummyAvatar from "@assets/dummy/avatar.svg";
import { Modal } from "@components/molecules";
import { DialogClose } from "@components/ui/dialog";
import { CreateIssueForm } from "@components/orgasims";
import { useQuery } from "@tanstack/react-query";
import { api, fetchData } from "@http";
import { Loader } from "@components/molecules";
const ProjectsPage = ({
  children
}: {
  children: React.ReactNode
}) => {
  const path = usePathname()?.split("/");
  const router = useRouter();

  const currentPath = path[3];
  const currentProject = path[2];
  const refForm = useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = useState(false);

  const submenus = useMemo(() => ["timeline", "backlog", "board"], []);
  useEffect(() => {
    if (!currentPath && path[2]) {
      router.push(`/projects/${path[2]}/${submenus[0]}`);
    }
  }, [currentPath, path, router, submenus]);


  const {
    data: project,
    isLoading: projectLoading,
    isFetching: projectFetching
  } = useQuery({
    queryKey: ["projectByID",`${path[2]}`],
    queryFn: () => fetchData(`${api.projects}/${path[2]}`)
  });
  const {
    data: memberList,
    isLoading: memberLoading,
    isFetching: memberFetching
  } = useQuery({
    queryKey: ["memberList",`${path[2]}`],
    queryFn: () => fetchData(`${api.usersList}/${path[2]}`)
  });

  if (!path[2] || path[2] === "undefined") {
    return (
      <p className="absolute left-1/2 top-1/2">Your project is empty</p>
    );
  }
  
  return (
    <div className="flex flex-col pt-8 gap-8 w-full">
      {projectLoading || projectFetching &&
        <Loader />
      }
      <div className="px-8 flex flex-row justify-between items-center">
        <div>
          <Link href={"/projects"}>Projects</Link>
          {currentPath &&
            <>
              <Link
                className="capitalize"
                href={`/projects/${project?.data?.id}`}
              >
                {` / ${project?.data?.name}`}
              </Link>
              <Link
                className="capitalize"
                href={`/projects/${project?.data?.name}/${currentPath}`}
              >
                {` / ${currentPath}`}
              </Link>
            </>
          }
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-row relative">
            {memberList?.data?.map((item: any, index: number) => (
              <Fragment key={index}>
                <Avatar src={item?.avatar} name={item?.name} color={item?.color} alt={item?.altAvatar} className="z-[1]" />
              </Fragment>
            ))
            }
          </div>
          <Button variant={"secondary"} size={"xs"}>Invite</Button>
        </div>
      </div>
      <h2 className="text-5xl font-light px-8">{project?.data?.name}</h2>

      <div className="border-b flex flex-row justify-between px-8">
        <div className="flex flex-row gap-20">
          {submenus?.map((item, index) => (
            <Link
              key={index}
              href={`/projects/${path[2]}/${item}`}
              className={cn("capitalize text-base-100 pb-4 pt-2", {
                "border-b border-green-500 transition-colors duration-300 animate-in dark:text-white text-black": currentPath === item
              })}            >
              {item}
            </Link>
          ))
          }
        </div>
        <Modal
          title="Create Issue"
          childrenTrigger={
            <Button variant={"primary"}>Add Task</Button>
          }
          childrenContent={
            <CreateIssueForm setDisabled={setDisabled} refForm={refForm} />
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
      <div className="overflow-auto w-full px-8">
        {children}
      </div>
    </div>
  );
};

export default ProjectsPage;