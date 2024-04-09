'use client'
import { InputLabel } from "@components/molecules";
import { Button } from "@components/ui/button";
import { DFLogin } from "@defaultValues";
import { TLogin } from "@organisms/types";
import Link from "next/link";
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
    console.log(formData)
  }

  return (
    <div className="flex items-center h-screen w-screen">
      <form className="flex flex-col bg-gray-900 w-96 p-8 rounded-lg gap-3 mx-auto my-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl">Welcome again!</h1>
        <InputLabel
          name="email"
          type="text"
          label="Email Address"
          control={control}
          required
          placeholder="Your email address"
        />
        <InputLabel
          name="password"
          type="password"
          label="Password"
          control={control}
          required
          placeholder="Your password"
        />
        
        <Button type="submit">Login</Button>

        <div className=" flex justify-between text">
          <Link
            className="text-base hover:text-black dark:hover:text-white"
            href={'/forgot-password'}
          >
            Can&apos;t login?
          </Link>
          <Link
            className="text-base hover:text-black dark:hover:text-white"
            href={'/register'}
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;