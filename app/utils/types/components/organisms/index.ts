import { BaseSyntheticEvent } from "react";
import { Control, FieldErrors, MultipleFieldErrors, SubmitHandler } from "react-hook-form";

export type TLogin = {
  email: string;
  password: string;
}

export type TRegister = TLogin & {
  name: string;
  confirmPassword: string;
}

export type TAuthForm = {
  isLoading: boolean;
  disabled: boolean;
  errors: FieldErrors<TRegister>;
  isRegister: boolean;
  control: Control<any>;
  handleSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}
