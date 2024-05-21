import { Control, UseFormWatch } from "react-hook-form";

export type TInput = {
  name: string;
  type: string;
  placeholder: string;
  control: Control<any>;
  required: boolean;
  className?: string;
}

export type TSelect = {
  name: string;
  placeholder: string;
  control: Control<any>;
  required: boolean;
  className?: string;
  datas: any;
  watch?: UseFormWatch<any>;
}

export type TOptionSelect = {
  label: string;
  value: string;
  class: string;
}

export type TSvg = {
  fill: string;
  width?: string;
  height?: string;
}