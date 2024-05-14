import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isActive = true,
  disabled = false,
  ...props
}: IButtonProps) {
  const baseStyles =
    'w-full font-semibold rounded-lg focus:outline-none transition duration-200 ease-in-out';

  const variantStyles = {
    primary: `bg-blue-500 text-white hover:${isActive ? 'bg-blue-600' : 'bg-blue-600 bg-opacity-50'}`,
    secondary: `bg-gray-500 text-white hover:${isActive ? 'bg-gray-600' : 'bg-gray-600 bg-opacity-50'}`,
    danger: `bg-red-500 text-white hover:${isActive ? 'bg-red-600' : 'bg-red-600 bg-opacity-50'}`,
    success: `bg-green-500 text-white hover:${isActive ? 'bg-green-600' : 'bg-green-600 bg-opacity-50'}`,
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Combine all the styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
