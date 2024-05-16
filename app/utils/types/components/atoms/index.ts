import { Control, UseFormWatch } from "react-hook-form";

export type TInput = {
  name: string;
  type: string;
  placeholder: string;
  control: Control<any>;
  required: boolean;
  className?: string;
}

export type TSelect = TInput & {
  datas: any;
  watch?: UseFormWatch<any>;
}

export type TOptionSelect = {
  label: string;
  value: string;
  class: string;
}