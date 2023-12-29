import { Control, FieldValues, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
  name: string;
  label: string;
  type?: HTMLInputElement['type'];
  className?: string;
  control: any;
  rules?: any;
}

const Input = ({
  name,
  label,
  type = 'text',
  className,
  control,
  rules = {},
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <div>
            <label>{label}</label>
            <input
              {...field}
              type={type}
              placeholder={label}
              className={twMerge(
                'border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300', // custom styling
                error?.message ? 'border border-red-500' : 'border-gray-300',
                className
              )}
            />
            {error?.message && (
              <label className="text-red-500">{error.message}</label>
            )}
          </div>
        );
      }}
    />
  );
};

export default Input;
