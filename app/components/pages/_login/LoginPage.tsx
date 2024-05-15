'use client'
import { AuthForm } from "@components/orgasims";
import { DFLogin } from "@defaultValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLogin } from "@organisms/types";
import { loginSchema } from "@schemas/authSchemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isLoading, errors, isValid }
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema)
  })

  const router = useRouter();
  const onSubmit: SubmitHandler<TLogin> = (formData: TLogin) => {
    axios.post('/api/login', formData)
      .then(response => {
        if (response.data.status === 200) {
          router.refresh()
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          const errors = error.response.data.errors;
          if (errors.email) {
            setError("email", {
              type: "server",
              message: errors.email,
            });
          } else if (errors.password) {
            setError("password", {
              type: "server",
              message: errors.password,
            });
          } else {
            alert("Something went wrong");
          }
        }
      })
      .finally(() => {
        reset();
      })
  };

  return (
    <AuthForm
      disabled={false}
      errors={errors}
      isRegister={false}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginPage;