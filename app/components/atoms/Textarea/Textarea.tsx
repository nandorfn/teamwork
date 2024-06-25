import { cn } from "@func";
import { TTextarea } from "@atoms/types";
import { Controller } from "react-hook-form";

const Textarea = ({ 
  className,
  placeholder,
  name,
  control,
  required,
  defaultValue = "",
}: TTextarea) => {
    return (
        <Controller
        name={name}
        control={control}
        rules={{
          required: required,
        }}
        defaultValue={defaultValue}
        render={({ field }) =>
          <textarea
            {...field}
            className={cn("bg-transparent border rounded-md p-2", className)}
            placeholder={placeholder}
          />
        }
      />
    );
};

export default Textarea;