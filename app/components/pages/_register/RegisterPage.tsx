"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, getHttpMetaMessage, httpMetaMessages } from "@http";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { hashPass } from "@func";
import { TRegister } from "@organisms/types";
import { AuthForm } from "@components/orgasims";
import { registerSchema } from "@schemas/authSchemas";

const RegisterPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isLoading, errors, isValid }
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema)
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<TRegister> = async (formData) => {
    setLoading(true);
    const { 
      salt, 
      hashedPassword: password
    } = hashPass(formData.password);
    const newData = {
      name: formData.name,
      email: formData.email,
      salt,
      password
    };
    const message = getHttpMetaMessage(500, "");
    axios.post(api.register, newData)
      .then(response => {
        if (response.status === 201) {
          router.push("/login");
        } else {
          setError("password", {
            type: "server",
            message,
          });;
        }
      })
      .catch(error => {
        let { errors } = error?.response?.data;
        if (errors?.name) {
          setError("name", {
            type: "server",
            message: errors?.name,
          });
        }
        else if (errors?.email) {
          setError("email", {
            type: "server",
            message: errors?.email,
          });
        } else if (errors?.hashedPassword) {
          setError("password", {
            type: "server",
            message: errors?.password,
          });
        } else {
          setError("password", {
            type: "server",
            message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
};
return (
  <AuthForm 
    isLoading={loading}
    disabled={!isValid || isLoading}
    errors={errors}
    isRegister={true}
    control={control}
    handleSubmit={handleSubmit(onSubmit)}
  />
);
};

export default RegisterPage;