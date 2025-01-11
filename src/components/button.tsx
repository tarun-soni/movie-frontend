import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  disabled = false,
  ...rest
}) => {
  const baseClasses =
    'inline-block rounded px-4 py-2 text-sm font-medium focus:outline-none focus:ring';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-dark',
    secondary:
      'border border-primary text-primary hover:bg-primary-light hover:text-primary-foreground',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
  };

  const resolvedClasses = `${baseClasses} ${variantClasses[variant] || ''} ${
    disabled ? disabledClasses : ''
  }`;

  return (
    <button className={resolvedClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
