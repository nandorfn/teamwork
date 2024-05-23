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
  placeholder,
  className,
  datas,
  defaultValue
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
            <SelectValue placeholder={defaultValue} />
          </SelectTrigger>
          <SelectContent>
            {datas?.map((item: TOptionSelect, index: number) => (
              <SelectItem 
                key={index} 
                value={item?.value}>
                {item?.label}
              </SelectItem>
            ))
            }
          </SelectContent>
        </Select>
      }
    />
  );
};

export default InputSelect;