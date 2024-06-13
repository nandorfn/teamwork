"use client";
import React, { Fragment, useEffect } from "react";
import { mockIssue } from "@mocks/mockIssueCard";
import { usePathname, useRouter } from "next/navigation";
import { IssueCard, ProjectCard } from "@components/molecules";
import { useQuery } from "@tanstack/react-query";
import { api, fetchData } from "@http";
import { TProjects } from "@server/types";
import { TProjectList } from "@molecules/types";

const MyTask: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  
  useEffect(() => {
    if(path === "/") router.replace("/my-task");
  }, [path, router]);
  
  const {
    data: projects,
    isLoading: isProjectLoading,
  } = useQuery({
    queryKey: ["projectMember"],
    refetchOnWindowFocus: false,
    queryFn: () => fetchData(api.memberships),
  });
  
  return (
    <div className="flex flex-col px-6 py-4 w-full">
      <h1 className=" text-2xl">Recent Projects</h1>
      <div className="flex flex-row gap-3 overflow-x-auto">
        {projects?.data?.map((item: TProjectList ) => (
          <Fragment key={item?.id}>
            <ProjectCard data={item} />
          </Fragment>
        ))
        }
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