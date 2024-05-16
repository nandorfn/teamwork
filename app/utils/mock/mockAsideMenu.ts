import { TMenu } from "@molecules/types";
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

export const menus: TMenu[] = [
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