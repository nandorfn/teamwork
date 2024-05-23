import { TTextareaLabel } from '@atoms/types';
import { Textarea } from '@components/atoms';

const TextareaLabel = ({
  label,
  name,
  placeholder,
  control,
  required,
  className,
}: TTextareaLabel) => {
    return (
        <div className='flex flex-col gap-1'>
          <label htmlFor={name}>{label}</label>
          <Textarea
            name={name}
            placeholder={placeholder}
            control={control}
            required={required}
            className={className}
          />
        </div>
    );
};

export default TextareaLabel;