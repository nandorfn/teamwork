"use client";
import { Avatar } from "@components/atoms";
import { Button } from "@components/ui/button";
import { cn } from "@func";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dummyAvatar from "@assets/dummy/avatar.svg";
import { Modal } from "@components/molecules";
import { DialogClose } from "@components/ui/dialog";
import { CreateIssueForm } from "@components/orgasims";


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
    if (!currentPath) {
      router.push(`/projects/${path[2]}/${submenus[0]}`);
    }
  }, [currentPath, path, router, submenus]);
  if (!path[2]) return null;

  return (
    <div className="flex flex-col pt-8 gap-8 w-full">
      <div className="px-8 flex flex-row justify-between items-center">
        <div>
          <Link href={"/projects"}>Projects</Link>
          {currentPath &&
            <>
              <Link
                className="capitalize"
                href={`/projects/${currentProject}`}
              >
                {` / ${currentProject}`}
              </Link>
              <Link
                className="capitalize"
                href={`/projects/${currentProject}/${currentPath}`}
              >
                {` / ${currentPath}`}
              </Link>
            </>
          }
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-row relative">
            <Avatar src={dummyAvatar} className="z-[1]" />
            <Avatar src={dummyAvatar} className="z-[2] -ml-1" />
            <Avatar src={dummyAvatar} className="z-[3] -ml-2" />
          </div>
          <Button variant={"secondary"} size={"xs"}>Invite</Button>
        </div>
      </div>
      <h2 className="text-5xl font-light px-8">Project 2</h2>

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