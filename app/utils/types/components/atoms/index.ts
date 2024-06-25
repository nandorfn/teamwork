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
  control: Control<any>;
  required: boolean;
  className?: string;
  datas: any;
  defaultValue?: string | null;
  isLoading?: boolean;
  watch?: UseFormWatch<any>;
}

export type TOptionSelect = {
  label: string;
  value: string;
  class?: string;
}

export type TSvg = {
  fill?: string;
  width?: string;
  height?: string;
}

export type TTextarea = {
  name: string;
  placeholder: string;
  control: Control<any>;
  required: boolean;
  className?: string;
  defaultValue?: string;
}

export type TSelectLabel = TSelect & {
  label: string;
}

export type TTextareaLabel = TTextarea & {
  label: string;
}