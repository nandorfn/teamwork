import Link from "next/link";
import { Button } from "@components/ui/button";
import { InputLabel } from "@components/molecules";
import { TAuthForm } from "@organisms/types";

const AuthForm = ({
  isRegister,
  control,
  handleSubmit
}: TAuthForm) => {
  return (
    <>
      <div className="flex items-center h-screen w-screen shadow-lg">
        <form
          className="flex flex-col bg-gray-900 w-96 p-8 rounded-lg gap-3 mx-auto my-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl">{isRegister ? 'Welcome!' : 'Welcome again!'}</h1>
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

          <Button type="submit">{isRegister ? 'Register' : 'Login'}</Button>

          {isRegister ? (
            <div className="flex gap-2">
              <p className="text-base">Already have an account?</p>
              <Link className="hover:font-medium" href={'/login'}>
                Login here
              </Link>
            </div>
          ) : (
            <div className=" flex justify-between text">
              <Link className={'text-base hover:text-black dark:hover:text-white'} href={'/forgot-password'}>
                Can&apos;t login?
              </Link>
              <Link className={'text-base hover:text-black dark:hover:text-white'} href={'/register'}>
                Create an account
              </Link>
            </div>
          )
          }
        </form >
      </div >
    </>
  );
};

export default AuthForm;