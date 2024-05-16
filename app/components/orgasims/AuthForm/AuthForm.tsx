import Link from "next/link";
import { Button } from "@components/ui/button";
import { InputLabel, Loader } from "@components/molecules";
import { TAuthForm } from "@organisms/types";

const AuthForm = ({
  isLoading,
  disabled,
  errors,
  isRegister,
  control,
  handleSubmit
}: TAuthForm) => {
  return (
    <>
      <div className="flex items-center h-screen w-screen shadow-lg">
        {isLoading &&
          <Loader />
        }
        <form
          className="flex flex-col bg-gray-900 w-96 p-8 rounded-lg gap-3 mx-auto my-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl">{isRegister ? 'Welcome!' : 'Welcome again!'}</h1>
          {isRegister &&
            <>
              <InputLabel
                name="name"
                type="text"
                label="Name"
                control={control}
                required
                placeholder="Your name"
              />
              <p className=" text-red-500">{errors?.name?.message}</p>
            </>
          }

          <div>
            <InputLabel
              name="email"
              type="text"
              label="Email Address"
              control={control}
              required
              placeholder="Your email address"
            />
            <p className=" text-red-500">{errors?.email?.message}</p>
          </div>

          <div>
            <InputLabel
              name="password"
              type="password"
              label="Password"
              control={control}
              required
              placeholder="Your password"
            />
            <p className=" text-red-500">{errors?.password?.message}</p>
          </div>
          {isRegister &&
            <>
              <InputLabel
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                control={control}
                required
                placeholder="Confirm password"
              />
              <p className=" text-red-500">{errors?.confirmPassword?.message}</p>
            </>
          }

          <Button
            disabled={disabled}
            type="submit"
          >{isRegister
            ? 'Register'
            : 'Login'
            }
          </Button>

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