'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthForm } from "@components/orgasims";
import { DFLogin } from "@defaultValues";
import { TLogin } from "@organisms/types";

const RegisterPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset
  } = useForm<TLogin>({
    defaultValues: DFLogin
  })

  const onSubmit: SubmitHandler<TLogin> = (formData) => {
    console.log(formData)
  }
  return (
    <AuthForm
      isRegister={true}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterPage;