"use client";
import axios from "axios";
import { useState } from "react";
import { TLogin } from "@organisms/types";
import { useRouter } from "next/navigation";
import { api, getHttpMetaMessage } from "@http";
import { AuthForm } from "@components/orgasims";
import { loginSchema } from "@schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const message = getHttpMetaMessage(500, "");
  const onSubmit: SubmitHandler<TLogin> = (formData: TLogin) => { 
    setLoading(true);
    axios.post(api.login, formData)
      .then(response => {
        if (response?.status === 200) {
          router.refresh();
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          const { errors } = error?.response?.data;
          if (errors?.email) {
            setError("email", {
              type: "server",
              message: errors.email,
            });
          } else if (errors?.password) {
            setError("password", {
              type: "server",
              message: errors.password,
            });
          } else {
            setError("password", {
              type: "server",
              message,
            });          
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <AuthForm
      isLoading={loading}
      disabled={false}
      errors={errors}
      isRegister={false}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginPage;