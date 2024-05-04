import { BaseSyntheticEvent } from "react";
import { Control, SubmitHandler } from "react-hook-form";

export type TLogin = {
  email: string;
  password: string;
}

export type TAuthForm = {
  isRegister: boolean;
  control: Control<any>;
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}