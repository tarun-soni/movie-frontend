import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-transparent hover:text-primary'
      : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground';
  return (
    <button
      className={`inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ${variantClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
