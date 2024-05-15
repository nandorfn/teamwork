"use client";
import { 
  chatDark,
  chatFill,
  chatIcon,
  kanbanDark,
  kanbanFill,
  kanbanIcon,
  taskDark,
  taskFill,
  taskIcon
} from "@assets/svg";
import { Icon } from "@components/atoms";
import { cn } from "@func";
import { menus } from "@molecules/types";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";

const Aside: React.FC = () => {
  const [active, setActive] = useState('task')
  const menus: menus[] = [
    {
      id: 'task',
      label: 'My Task',
      href: '/',
      icon: taskIcon,
      iconFill: taskFill,
      iconDark: taskDark,
    },
    {
      id: 'chats',
      label: 'Chats',
      href: '/chats',
      icon: chatIcon,
      iconFill: chatFill,
      iconDark: chatDark,
    },
    {
      id: 'project',
      label: 'Project',
      href: '/projects',
      icon: kanbanIcon,
      iconFill: kanbanFill,
      iconDark: kanbanDark
    }
  ];

  const { theme } = useTheme();

  const segments: string[] = useSelectedLayoutSegments();

  return (
    <div className="border-r border-dark-grey h-screen p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium">teamwork</h1>
        <ul className="flex flex-col gap-8">
          {
            menus?.map((item: menus) => (
              <Link key={item?.id} onClick={() => setActive(item.id)} href={item?.href}>
                <li className="flex gap-3 cursor-pointer">
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
                </li>
              </Link>
            ))
          }
        </ul>
      </div>

      <div className="flex w-full">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Aside;