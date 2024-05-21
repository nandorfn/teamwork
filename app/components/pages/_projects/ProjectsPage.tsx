'use client'
import { Avatar } from "@components/atoms";
import { Button } from "@components/ui/button";
import { cn } from "@func";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import dummyAvatar from "@assets/dummy/avatar.svg"
import { Modal } from "@components/molecules";
import CreateIssueForm from "@components/orgasims/Form/CreateIssueForm/CreateIssueForm";


const ProjectsPage = ({
  children
}: {
  children: React.ReactNode
}) => {
  const path = usePathname();
  const currentPath = path.split("/")[3];
  const submenus = ["timeline", "backlog", "board"];

  if (!path?.split('/')[2]) return null;

  return (
    <div className="flex flex-col pt-8 gap-8 w-full">
      <div className="px-8 flex flex-row justify-between items-center">
        <div>
          <Link href={'/projects'}>Projects</Link>
          {currentPath &&
            <Link
              className="capitalize"
              href={`/projects/${currentPath}`}
            >
              {` / ${currentPath}`}
            </Link>
          }
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-row relative">
            <Avatar src={dummyAvatar} className="z-[1]" />
            <Avatar src={dummyAvatar} className="z-[2] -ml-1" />
            <Avatar src={dummyAvatar} className="z-[3] -ml-2" />
          </div>
          <Button variant={'secondary'} size={'xs'}>Invite</Button>
        </div>
      </div>
      <h2 className="text-5xl font-light px-8">Project 2</h2>

      <div className="border-b flex flex-row justify-between px-8">
        <div className="flex flex-row gap-20">
          {submenus?.map((item, index) => (
            <Link
              key={index}
              href={`/projects/${path?.split('/')[2]}/${item}`}
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
            <Button variant={'primary'}>Add Task</Button>
          }
          childrenContent={
            <CreateIssueForm />
          }
          childrenFooter={
            <Button variant={'default'}>Create Issue</Button>
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