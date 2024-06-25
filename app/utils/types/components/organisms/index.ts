import { SprintMapValue } from "@server/types";
import { BaseSyntheticEvent, LegacyRef, MutableRefObject, RefObject } from "react";
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

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

export type TCreateIssue = {
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  refForm: LegacyRef<HTMLFormElement> | null;
  defaultValue: any;
}

export type TStartSprintForm = {
  data: SprintMapValue;
  refForm: LegacyRef<HTMLFormElement> | null;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
