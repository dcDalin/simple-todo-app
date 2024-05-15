import React, { useRef, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

export type InputProps = {
  label?: string;
  id: string;
  icon?: React.ReactNode;
  placeholder?: string;
  loading?: boolean;
  type?: React.HTMLInputTypeAttribute;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function TextInput({
  label,
  placeholder = '',
  loading,
  id = '',
  icon,
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  function focusInput() {
    if (loading) return;

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  // Merge refs: react-hook-form and your own ref
  const { ref: registerRef, ...registerProps } = register(id, validation);

  return (
    <div className="w-full py-2">
      {label && (
        <label htmlFor={id} className="text-lg">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded-lg hover:cursor-pointer ${
          errors[id]
            ? 'border-red-500'
            : isFocused
              ? 'border-blue-500'
              : 'border-red-50'
        }`}
        onClick={focusInput}
      >
        {icon && <div className="px-2">{icon}</div>}
        <input
          ref={(element) => {
            registerRef(element); // Assign react-hook-form ref
            inputRef.current = element; // Assign your own ref
          }}
          className="w-full px-2 h-full py-3 bg-transparent placeholder-opacity-50 focus:outline-none"
          {...registerProps}
          {...rest}
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          aria-describedby={id}
          disabled={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className="h-4">
        {!hideError && errors[id] && (
          <p className="text-red-500 text-xs pt-1">{`${errors[id]?.message}`}</p>
        )}
      </div>
    </div>
  );
}
