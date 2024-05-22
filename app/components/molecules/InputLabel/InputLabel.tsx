import { Input } from "@components/atoms";
import { TInputLabel } from "@molecules/types";

const InputLabel = ({
  name,
  type,
  label,
  control,
  required,
  placeholder,
}: TInputLabel) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
      </label>
      <Input
        className="border-zinc-800"
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