import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { TOptionSelect, TSelect } from "@atoms/types";

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
        <Select 
          defaultValue={field.value} 
          onValueChange={field.onChange}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={field.value} />
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