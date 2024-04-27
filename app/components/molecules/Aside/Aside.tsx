"use client";
import { chatDark, chatFill, chatIcon, kanbanDark, kanbanFill, kanbanIcon, settingFill, settingIcon, taskDark, taskFill, taskIcon } from "@assets/svg";
import { Icon } from "@components/atoms";
import { cn } from "@func";
import { menus } from "@molecules/types";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

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
    <ul className="flex flex-col border-r border-dark-grey px-14 py-7 gap-8 h-full">
      {
        menus?.map((item: menus) => (
          <Link key={item?.id} onClick={() => setActive(item.id)} href={item?.href}>
            <li className="flex gap-3 cursor-pointer">
              <Icon
                src={
                  item?.id !== active 
                    ? item?.icon
                    : theme === 'dark'
                      ? item?.iconFill
                      : item?.iconDark
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
  );
};

export default Aside;