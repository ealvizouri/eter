import { Control, FieldValues, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import React from 'react';

interface Props {
  name: string;
  label: string;
  type?: HTMLInputElement['type'];
  className?: string;
  control: any;
  rules?: any;
  children?: React.ReactNode; // Nueva propiedad children
}

const Input = ({
  name,
  label,
  type = 'text',
  className,
  control,
  rules = {},
  children, // Agrega la propiedad children
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="flex flex-col mb-4 relative"> {/* Contenedor flex para colocar elementos en columna */}
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
            {children && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                {children}
              </div>
            )}
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
