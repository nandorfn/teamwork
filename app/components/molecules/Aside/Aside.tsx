import { kanbanIcon, lightningIcon, settingIcon, taskIcon } from "@assets/index";
import { Icon } from "@components/atoms";
import { menus } from "@molecules/types";
import Image from "next/image";

const Aside: React.FC = () => {
  const menus: menus[] = [
    {
      id: 'task',
      label: 'My Task',
      icon: taskIcon,
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: lightningIcon,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: settingIcon,
    },
    {
      id: 'project',
      label: 'Project',
      icon: kanbanIcon,
    }
  ]
    return (
        <ul className="flex flex-col border-r-2 border-dark-grey px-14 py-7 gap-8 h-screen">
          {
            menus?.map((item: menus) => (
              <li className="flex gap-3" key={item?.id}>
                <Icon
                  src={item?.icon}
                  alt={item?.label}
                  width={20}
                  height={20}
                  />
                <p>{item?.label}</p>
              </li>
            ))
          }
        </ul>
    );
};

export default Aside;