import { TSelectLabel } from '@atoms/types';
import { InputSelect } from '@components/atoms';

const SelectLabel = ({
  label,
  name,
  control,
  required,
  className,
  datas,
  watch,
  defaultValue,
  isLoading,
}: TSelectLabel) => {
    return (
        <div className='flex flex-col gap-1'>
          <label htmlFor={name}>{label}</label>
          <InputSelect 
            name={name}
            defaultValue={defaultValue}
            control={control}
            required={required}
            className={className}
            datas={datas}
            watch={watch}
            isLoading={isLoading}
          />
        </div>
    );
};

export default SelectLabel;