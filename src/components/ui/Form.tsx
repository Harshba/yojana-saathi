"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Field({
  id,
  label,
  required: isRequired,
  optionalLabel,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="ys-label">
        {label}
        {isRequired ? (
          <span aria-hidden className="ml-1 text-[#b3261e]">
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-1.5 text-[0.78rem] font-normal text-ash-500 normal-case">({optionalLabel})</span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mb-1.5 text-[0.83rem] leading-5 text-ash-600">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.84rem] font-semibold text-[#8a1c13]">
          <AlertCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ invalid, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${props.id}-error` : props["aria-describedby"]}
      className={cn("ys-input", invalid && "ys-input-error", className)}
    />
  );
}

export function TextArea({
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={cn("ys-input min-h-[108px] resize-y", invalid && "ys-input-error", className)}
    />
  );
}

export function SelectInput({
  invalid,
  options,
  placeholder,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      className={cn("ys-input appearance-none bg-[length:1rem] pr-9", invalid && "ys-input-error", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234c596b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.6rem center",
      }}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function OptionCards({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 3,
  required: isRequired,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string; note?: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3 | 4;
  required?: boolean;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="ys-label">
        {legend}
        {isRequired ? <span aria-hidden className="ml-1 text-[#b3261e]">*</span> : null}
      </legend>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-2 lg:grid-cols-4",
        )}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-md border px-3.5 py-2.5 text-[0.9rem] transition",
                checked
                  ? "border-navy-700 bg-navy-50 font-semibold text-navy-900 ring-1 ring-navy-300"
                  : "border-ash-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-ash-50",
                error && !checked && "border-[#e3a9a3]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2",
                  checked ? "border-navy-700" : "border-ash-400",
                )}
              >
                {checked ? <span className="block h-1.5 w-1.5 rounded-full bg-navy-700" /> : null}
              </span>
              <span>
                {option.label}
                {option.note ? <span className="mt-0.5 block text-[0.8rem] font-normal text-ash-600">{option.note}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-[0.84rem] font-semibold text-[#8a1c13]">
          <AlertCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxGroup({
  legend,
  options,
  values,
  onToggle,
  error,
  hint,
  columns = 2,
}: {
  legend: string;
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (value: string) => void;
  error?: string;
  hint?: string;
  columns?: 1 | 2 | 3;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="ys-label">{legend}</legend>
      {hint ? <p className="mb-2 text-[0.83rem] leading-5 text-ash-600">{hint}</p> : null}
      <div
        className={cn(
          "grid gap-1.5",
          columns === 1 && "grid-cols-1",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-md border px-3 py-2 text-[0.89rem] transition",
                checked
                  ? "border-navy-600 bg-navy-50 font-semibold text-navy-900"
                  : "border-ash-200 bg-white text-navy-800 hover:border-navy-300 hover:bg-ash-50",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border-2",
                  checked ? "border-navy-700 bg-navy-700 text-white" : "border-ash-400 bg-white",
                )}
              >
                {checked ? <Check className="h-3 w-3" strokeWidth={3.5} /> : null}
              </span>
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-[0.84rem] font-semibold text-[#8a1c13]">
          <AlertCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function ConsentBox({
  id,
  checked,
  onChange,
  error,
  children,
  link,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  error?: string;
  children: ReactNode;
  link?: ReactNode;
}) {
  return (
    <div className="rounded-md border border-ash-300 bg-ash-50 p-4">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-6 text-navy-800">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#163557]"
          aria-invalid={error ? true : undefined}
        />
        <span>
          {children} {link}
        </span>
      </label>
      {error ? (
        <p className="mt-2 flex items-start gap-1.5 text-[0.84rem] font-semibold text-[#8a1c13]">
          <AlertCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormStatus({ role = "status", children }: { role?: "status" | "alert"; children: ReactNode }) {
  return (
    <div role={role} aria-live="polite" className="mt-4">
      {children}
    </div>
  );
}
