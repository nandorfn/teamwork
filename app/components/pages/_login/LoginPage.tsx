'use client'
import { AuthForm } from "@components/orgasims";
import { DFLogin } from "@defaultValues";
import { TLogin } from "@organisms/types";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset
  } = useForm<TLogin>({
    defaultValues: DFLogin
  })

  const onSubmit: SubmitHandler<TLogin> = (formData) => {
  }

  return (
    <AuthForm 
      isRegister={false}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginPage;