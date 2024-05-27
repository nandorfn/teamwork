"use client";
import React, { useEffect } from "react";
import { mockIssue } from "@mocks/mockIssueCard";
import { usePathname, useRouter } from "next/navigation";
import { IssueCard, ProjectCard } from "@components/molecules";

const MyTask: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  
  useEffect(() => {
    if(path === "/") router.replace("/my-task");
  }, [path, router]);
  
  return (
    <div className="flex flex-col px-6 py-4 w-full">
      <h1 className=" text-2xl">Recent Projects</h1>
      <div className="flex flex-row gap-3 overflow-x-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <h1 className=" text-2xl">Assigned to me</h1>
      <div>
        {mockIssue?.map((item, index) => (
          <React.Fragment key={index}>
            <IssueCard issue={item} />
          </React.Fragment>
        ))
      }
      </div>
    </div>
  );
};

export default MyTask;