import { TSelectLabel } from '@atoms/types';
import { InputSelect } from '@components/atoms';

const SelectLabel = ({
  label,
  name,
  placeholder,
  control,
  required,
  className,
  datas,
  watch,
  defaultValue
}: TSelectLabel) => {
    return (
        <div className='flex flex-col gap-1'>
          <label htmlFor={name}>{label}</label>
          <InputSelect 
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            control={control}
            required={required}
            className={className}
            datas={datas}
            watch={watch}
          />
        </div>
    );
};

export default SelectLabel;