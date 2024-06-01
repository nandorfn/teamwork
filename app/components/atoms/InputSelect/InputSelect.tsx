import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { TOptionSelect, TSelect } from "@atoms/types";
import { Loader } from "@components/molecules";

const InputSelect = ({
  name,
  control,
  required,
  className,
  datas,
  defaultValue,
  isLoading,
}: TSelect) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
      }}
      defaultValue={defaultValue}
      render={({ field }) =>
        <Select onValueChange={field.onChange}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={defaultValue === "" ? "Choose" : defaultValue} />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <div className="flex py-4">
                <div className="loader-sm mx-auto"></div>
              </div>
            ) : (
              datas?.map((item: TOptionSelect, index: number) => (
                <SelectItem
                  key={index}
                  value={item?.value}>
                  {item?.label}
                </SelectItem>
              ))
            )
            }
          </SelectContent>
        </Select>
      }
    />
  );
};

export default InputSelect;