import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';

export type InputProps = {
  label: string;
  id: string;
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

  return (
    <div>
      <label className="">{label}</label>
      <div>
        <span>hey</span>
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          aria-describedby={id}
          disabled={readOnly}
        />
        <span>hey</span>
      </div>
    </div>
    // <label className="flex flex-col w-full" htmlFor={id}>
    //   <div className="label">
    //     <span className="label-text">{label}</span>
    //     {loading && (
    //       <span className="label-text-alt">
    //         {' '}
    //         <ImSpinner2 className="animate-spin" />
    //       </span>
    //     )}
    //   </div>
    //   <input
    //     {...register(id, validation)}
    //     {...rest}
    //     type={type}
    //     name={id}
    //     id={id}
    //     placeholder={placeholder}
    //     aria-describedby={id}
    //     autoComplete={autocomplete}
    //     className={clsx(
    //       'input w-full',
    //       errors[id] ? 'input-error' : 'input-bordered'
    //     )}
    //     disabled={readOnly}
    //   />
    //   <div className="label">
    //     {!hideError && errors[id]?.message ? (
    //       <span className="label-text-alt text-sm text-error">
    //         {`${errors[id]?.message}`}
    //       </span>
    //     ) : null}
    //   </div>
    // </label>
  );
}
