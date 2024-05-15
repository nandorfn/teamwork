'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
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
    reset,
    setError,
    formState: { isLoading, errors, isValid }
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema)
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<TRegister> = async (formData) => {
    const { salt, hashedPassword: password } = hashPass(formData.password);
    const newData = {
      name: formData.name,
      email: formData.email,
      salt,
      password
    }
    axios.post('/api/register', newData)
      .then(response => {
        if (response.status === 200) {
          router.push('/login')
        } else {
          throw new Error('Submitting form failed');
        }
      })
      .catch(error => {
        let { errors } = error?.response?.data
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
          alert("Something went wrong");
        }
      })
      .finally(() => {
        reset();
      });
}
return (
  <AuthForm 
    disabled={!isValid || isLoading}
    errors={errors}
    isRegister={true}
    control={control}
    handleSubmit={handleSubmit(onSubmit)}
  />
);
};

export default RegisterPage;