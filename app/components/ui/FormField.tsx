"use client";

import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export function FormField<T extends FieldValues>({
  label,
  name,
  placeholder,
  type = "text",
  register,
  errors,
}: FormFieldProps<T>) {
  return (
    <div>
      <label>{label}</label>

      <input {...register(name)} type={type} placeholder={placeholder} />

      {errors[name] && (
        <p>{errors[name]?.message as string}</p>
      )}
    </div>
  );
}