import { TInput } from "@atoms/types";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { SprintMapValue } from "@server/types";
import { StaticImageData } from "next/image";
import { Control } from "react-hook-form";

export type IconTypes = {
  src: StaticImageData,
  alt: string,
  width: number,
  height: number
}

export type TMenu = {
  id: string,
  label: string,
  icon: StaticImageData,
  iconFill: StaticImageData,
  iconDark: StaticImageData,
  href: string
}

export type TInputLabel = TInput & {
  label: string,
} 

export type TTodoCard = {
  data: any,
  provided: DraggableProvided,
  snap: DraggableStateSnapshot
}

export type TIssueContainer = {
  length: number,
  title: string,
  data: SprintMapValue,
  children: React.ReactNode,
  droppabledId: string,
  containerClass?: string,
  containerChildClass?: string,
  isBacklog?: boolean
}

export type TModal = {
  title: string;
  childrenContent: React.ReactNode;
  childrenFooter?: React.ReactNode;
  childrenTrigger: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export type TBacklogForm = {
  backlogStatus: string;
}

export type TProjectList = {
  id: number;
  name: string;
  key: string;
  description?: null | string;
  icon?: null | string,
  createdAt: string;
  updatedAt: string;
}

export type TDatePickerRange = {
  className?: string;
  control: Control<any>;
  name: string;
  label?: string;
  defaultValue?: any;
  disabled: boolean;
}
