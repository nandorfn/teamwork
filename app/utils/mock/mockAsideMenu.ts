import { TMenu } from "@molecules/types";
import { 
  chatDark,
  chatFill,
  chatIcon,
  taskDark,
  taskFill,
  taskIcon
} from "@assets/svg";

export const menus: TMenu[] = [
  {
    id: "task",
    label: "My Task",
    href: "/",
    icon: taskIcon,
    iconFill: taskFill,
    iconDark: taskDark,
  },
  // {
  //   id: "chats",
  //   label: "Chats",
  //   href: "/chats",
  //   icon: chatIcon,
  //   iconFill: chatFill,
  //   iconDark: chatDark,
  // },
];