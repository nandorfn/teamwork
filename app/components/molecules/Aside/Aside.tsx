"use client";
import { cn } from "@func";
import Link from "next/link";
import { useState } from "react";
import { fetchData } from "@http";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";

import { TMenu } from "@molecules/types";
import { Icon } from "@components/atoms";
import { ModeToggle } from "../ModeToggle";
import { menus } from "@mocks/mockAsideMenu";
import { Button } from "@components/ui/button";
import { LogoutToggle } from "../LogoutToggle";
import { plusDark, plusIcon } from "@assets/svg";

const Aside: React.FC = () => {
  const [active, setActive] = useState('task')
  const { theme } = useTheme();

  const {
    data: projects
  } = useQuery({
    queryKey: ['projectMember'],
    queryFn: () => fetchData('/api/memberships'),
  })

  return (
    <div className="border-r border-dark-grey h-screen p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium">teamwork</h1>
        <ul className="flex flex-col gap-8">
          {
            menus?.map((item: TMenu) => (
              <Link key={item?.id} onClick={() => setActive(item.id)} href={item?.href}>
                <li className="flex justify-between cursor-pointer items-center">
                  <div className="flex items-center gap-3">
                    <Icon
                      src={
                        item?.id === active
                          ? theme === 'light'
                            ? item?.iconDark
                            : item?.iconFill
                          : item?.icon
                      }
                      alt={item?.label}
                      width={20}
                      height={20}
                    />
                    <p className={cn("text-nowrap text-[#A1A1A1]  hover:text-black dark:hover:text-white",
                      item?.id === active
                        ? 'dark:text-white text-black font-medium'
                        : ''
                    )}
                    >
                      {item?.label}
                    </p>
                  </div>
                  {item?.id === 'project' &&
                    <Button variant={'ghost'} size={'xs'} className="w-fit p-1 h-5">
                      <Icon
                        src={
                          theme === 'light'
                              ? plusDark
                              : plusIcon
                        }
                        alt={item?.label}
                        width={16}
                        height={16}
                      />
                    </Button>
                  }
                </li>
              </Link>
            ))
          }
        </ul>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <ModeToggle />
        <LogoutToggle />
      </div>
    </div>
  );
};

export default Aside;