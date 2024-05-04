import { Control, FieldValues } from "react-hook-form";

export type TInput = {
  name: string;
  type: string;
  placeholder: string;
  control: Control<any>;
  required: boolean;
  className?: string;
}