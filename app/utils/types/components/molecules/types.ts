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
}
