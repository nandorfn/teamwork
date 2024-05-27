"use client";
import { cn } from "@func";
import Link from "next/link";
import { useState } from "react";
import { api, fetchData } from "@http";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// Components
import { ModeToggle } from "../ModeToggle";
import { menus } from "@mocks/mockAsideMenu";
import { TMenu, TProjectList } from "@molecules/types";
import { Icon } from "@components/atoms";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible";
import { LogoutToggle } from "../LogoutToggle";
import { ModalCreateProject } from "../ModalCreateProject";

// assets
import SquareIcon from "@assets/svg-tsx/SquareIcon";
import TeamworkIcon from "@assets/svg-tsx/TeamworkIcon";
import ChevronUpDown from "@assets/svg-tsx/ChevronUpDown";
import CaretLeftIcon from "@assets/svg-tsx/CaretLeftIcon";
import CaretRightIcon from "@assets/svg-tsx/CaretRightIcon";
import { kanbanDark, kanbanFill, kanbanIcon } from "@assets/svg";

const Aside = () => {
  const path = usePathname();
  const { theme } = useTheme();
  const currentProject = path?.split("/")[2];
  
  const [active, setActive] = useState<string>("task");
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const {
    data: projects,
    isLoading: isProjectLoading,
  } = useQuery({
    queryKey: ["projectMember"],
    queryFn: () => fetchData(api.memberships),
  });

  return (
    <div className={cn("border-r relative border-dark-grey h-screen flex flex-col justify-between",
      collapsed
        ? "py-6 px-2"
        : " min-w-64 p-6"
    )}
    >
      <Button
        className="absolute -right-4"
        onClick={() => setCollapsed(!collapsed)}
        variant={"outline"}
        size={"iconXs"}
      >
        {collapsed
          ? (
            <CaretRightIcon fill="fill-black dark:fill-white" />
          ) : (
            <CaretLeftIcon fill="fill-black dark:fill-white" />
          )
        }
      </Button>

      <div className={cn("flex flex-col gap-8", collapsed && "mx-auto")}>
        {collapsed ? (
          <TeamworkIcon />
        ) : (
          <h1 className="text-3xl font-medium">teamwork</h1>
        )}

        <ul className="flex flex-col gap-8">
          {
            menus?.map((item: TMenu) => (
              <Link
                key={item?.id}
                href={item?.href}
                onClick={() => setActive(item?.id)}
              >
                <li className="flex justify-between cursor-pointer items-center">
                  <div className={cn("flex items-center gap-3", collapsed && "mx-auto")}>
                    <Icon
                      src={
                        item?.id === active
                          ? theme === "light"
                            ? item?.iconDark
                            : item?.iconFill
                          : item?.icon
                      }
                      alt={item?.label}
                      width={collapsed ? 30 : 20}
                      height={collapsed ? 30 : 20}
                    />
                    {!collapsed &&
                      <p className={cn("text-nowrap text-[#A1A1A1]  hover:text-black dark:hover:text-white",
                        item?.id === active
                          ? "dark:text-white text-black font-medium"
                          : ""
                      )}
                      >
                        {item?.label}
                      </p>
                    }
                  </div>
                </li>
              </Link>
            ))
          }
        </ul>

        <Link
          onClick={() => setActive("project")}
          href={currentProject ? `/projects/${currentProject}` : "/projects"}
        >
          <Collapsible className="flex flex-col gap-2 cursor-pointer ">
            <div className={cn("flex items-center  gap-1", collapsed && "mx-auto")}>
              <Icon
                src={
                  active === "project"
                    ? theme === "light"
                      ? kanbanDark
                      : kanbanFill
                    : kanbanIcon
                }
                alt={""}
                width={collapsed ? 30 : 20}
                height={collapsed ? 30 : 20}
              />

              {!collapsed &&
                <div className="flex flex-row w-full justify-between items-center">
                  <CollapsibleTrigger asChild>
                    <Button
                      size={"xs"}
                      className="px-2"
                      variant={"ghost"}
                    >
                      <p className={cn("text-nowrap text-[#A1A1A1] mr-2 text-base hover:text-black dark:hover:text-white",
                        active === "project"
                          ? "dark:text-white text-black font-medium"
                          : ""
                      )}>
                        {"Projects"}
                      </p>
                      <ChevronUpDown fill={"fill-dark dark:fill-white"} />
                    </Button>
                  </CollapsibleTrigger>
                  <ModalCreateProject />
                </div>
              }
            </div>

            {!collapsed &&
              <CollapsibleContent>
                <ul className="flex flex-col gap-2">
                  {isProjectLoading ? (
                    <ProjectListSkeleton />
                  ) : (
                    projects?.data?.map((item: TProjectList) => (
                      <Link
                        key={item?.id}
                        href={`/projects/${item.id}`}
                        onClick={() => setActiveProject(item?.id)}
                        className="flex flex-row items-center gap-4"
                      >
                        <SquareIcon
                          fill={cn("fill-blue-400",
                            item?.id === activeProject
                            && "bg-blue-400 rounded-xl"
                          )}
                        />
                        <p
                          className={cn("",
                            item?.id === activeProject
                              ? "text-dark dark:text-white"
                              : "text-[#A1A1A1]"
                          )}
                        >
                          {item?.name}
                        </p>
                      </Link>
                    ))
                  )
                  }
                </ul>
              </CollapsibleContent>
            }
          </Collapsible>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <ModeToggle />
        <LogoutToggle />
      </div>
    </div>
  );
};

const ProjectListSkeleton = () => {
  const skeletonItems = new Array(4).fill(null);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <li
          key={index}
          className="flex flex-row items-center gap-4"
        >
          <SquareIcon fill="fill-blue-400" />
          <Skeleton className="h-4 w-full" />
        </li>
      ))}
    </>
  );
};

export default Aside;