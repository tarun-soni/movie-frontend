import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, placeholder, type, id, ...rest }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        {...rest}
      />
    </div>
  );
};

export default Input;
