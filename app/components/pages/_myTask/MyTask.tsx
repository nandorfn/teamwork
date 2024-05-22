'use client';
import { IssueCard, ProjectCard } from "@components/molecules";
import { mockIssue } from "../../../utils/mock/mockIssueCard";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const MyTask: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  
  useEffect(() => {
    if(path === '/') router.replace('/my-task');
  }, [path]);
  
  return (
    <div className="flex flex-col p-4">
      <h1 className=" text-2xl">Recent Projects</h1>
      <div className="flex flex-row gap-3 overflow-x-auto w-[calc(100vw-230px)]">
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