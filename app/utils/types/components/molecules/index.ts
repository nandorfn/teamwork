import { TInput } from "@atoms/types"
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd"
import { StaticImageData } from "next/image"

export type IconTypes = {
  src: StaticImageData,
  alt: string,
  width: number,
  height: number
}

export type menus = {
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
  title: string;
  children: React.ReactNode,
  droppabledId: string,
  containerClass?: string,
  containerChildClass?: string
}
