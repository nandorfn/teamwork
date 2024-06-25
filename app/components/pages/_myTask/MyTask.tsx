"use client";
import { api, fetchData } from "@http";
import { TProjectList } from "@molecules/types";
import { TIssuesByAssigne } from "@server/types";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Looping } from "@components/atoms";
import { Skeleton } from "@components/ui/skeleton";
import { IssueCard, ProjectCard } from "@components/molecules";

const MyTask: React.FC = () => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path === "/") router.replace("/my-task");
  }, [path, router]);

  const {
    data: projects,
    isLoading: isProjectLoading,
  } = useQuery({
    queryKey: ["projectMember"],
    refetchOnWindowFocus: false,
    queryFn: () => fetchData(api.memberships),
  });
  const {
    data: issues,
    isLoading: isIssueLoading,
  } = useQuery({
    queryKey: ["issuesUser"],
    refetchOnWindowFocus: false,
    queryFn: () => fetchData(api.issuesUser),
  });

  return (
    <div className="flex flex-col px-6 py-4 w-full">
      <h1 className=" text-2xl">Recent Projects</h1>
      <div className="flex flex-row gap-3 mt-4 overflow-x-auto">
        {isProjectLoading ? (
          <>
            <Skeleton className="h-[154px] w-[320px] my-4" />
            <Skeleton className="h-[154px] w-[320px] my-4" />
          </>
        ) : (
          projects?.data?.map((item: TProjectList) => (
            <Fragment key={item?.id}>
              <ProjectCard data={item} />
            </Fragment>
          ))
        )
        }
      </div>
      <h1 className=" text-2xl">Assigned to me</h1>
      <div className="flex flex-col gap-2 mt-4">
        {isIssueLoading ? (
          <Looping loopCount={5}>
            <Skeleton className="h-[56px] my-2 w-full" />
          </Looping>
        ) : (
          issues?.data?.map((item: TIssuesByAssigne, index: number) => (
            <React.Fragment key={index}>
              <IssueCard issue={item} />
            </React.Fragment>
          ))
        )
        }
      </div>
    </div>
  );
};

export default MyTask;