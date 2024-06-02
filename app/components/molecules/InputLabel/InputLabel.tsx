import { Input } from "@components/atoms";
import { cn } from "@func";
import { TInputLabel } from "@molecules/types";

const InputLabel = ({
  name,
  type,
  label,
  control,
  required,
  placeholder,
  className,
}: TInputLabel) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={name}>
        {label}
      </label>
      <Input
        className={cn("border-zinc-800")}
        name={name}
        control={control}
        required={required}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default InputLabel;