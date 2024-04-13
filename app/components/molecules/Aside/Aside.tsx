"use client";
import { chatIcon, kanbanIcon, settingIcon, taskIcon } from "@assets/svg";
import { Icon } from "@components/atoms";
import { menus } from "@molecules/types";
import Link from "next/link";

const Aside: React.FC = () => {
  const menus: menus[] = [
    {
      id: 'task',
      label: 'My Task',
      href: '/',
      icon: taskIcon,
    },
    {
      id: 'chats',
      label: 'Chats',
      href: '/chats',
      icon: chatIcon,
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: settingIcon,
    },
    {
      id: 'project',
      label: 'Project',
      href: '/projects',
      icon: kanbanIcon,
    }
  ]
  return (
    <ul className="flex flex-col border-r border-dark-grey px-14 py-7 gap-8 h-full">
      {
        menus?.map((item: menus) => (
          <Link key={item?.id} href={item?.href}>
            <li className="flex gap-3 cursor-pointer">
              <Icon
                src={item?.icon}
                alt={item?.label}
                width={20}
                height={20}
              />
              <p className=" text-nowrap text-[#A1A1A1]  hover:text-black dark:hover:text-white">{item?.label}</p>
            </li>
          </Link>
        ))
      }
    </ul>
  );
};

export default Aside;