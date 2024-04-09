import { TInput } from "@atoms/types";
import { cn } from "@func";
import { Controller } from "react-hook-form";

const Input = ({
  name,
  type,
  control,
  required,
  placeholder,
  className
}: TInput) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required,
        }}
        render={({ field }) =>
          <input
            {...field}
            className={cn('bg-transparent border rounded-md p-2', className)}
            type={type}
            placeholder={placeholder}
          />
        }
      />
    </>
  );
};

export default Input;