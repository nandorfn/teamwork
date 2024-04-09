"use client";
import { kanbanIcon, lightningIcon, settingIcon, taskIcon } from "@assets/index";
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
      id: 'activity',
      label: 'Activity',
      href: '/activity',
      icon: lightningIcon,
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
    <ul className="flex flex-col border-r border-dark-grey px-14 py-7 gap-8 h-screen">
      {
        menus?.map((item: menus) => (
          <Link href={item?.href}>
            <li className="flex gap-3 cursor-pointer " key={item?.id}>
              <Icon
                src={item?.icon}
                alt={item?.label}
                width={20}
                height={20}
              />
              <p className=" text-[#A1A1A1]  hover:text-black dark:hover:text-white">{item?.label}</p>
            </li>
          </Link>
        ))
      }
    </ul>
  );
};

export default Aside;