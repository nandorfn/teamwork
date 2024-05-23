import { TTextarea } from '@atoms/types';
import { cn } from '@func';
import { Controller } from 'react-hook-form';

const Textarea = ({ 
  className,
  placeholder,
  name,
  control,
  required
}: TTextarea) => {
    return (
        <Controller
        name={name}
        control={control}
        rules={{
          required: required,
        }}
        render={({ field }) =>
          <textarea
            {...field}
            className={cn('bg-transparent border rounded-md p-2', className)}
            placeholder={placeholder}
          />
        }
      />
    );
};

export default Textarea;