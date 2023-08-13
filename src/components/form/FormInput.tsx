import React from "react";
import { Input, InputNumber, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ErrorMessage from "./ErrorMessage";

export interface FormInputProps {
  name: string;
  onChange: any;
  placeHolder?: string;
  value: any;
  errors: any;
  disabled?: boolean;
  key?: any;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: FormInputTypes;
  label?: string;
  required?: boolean;
  onKeyDown?: any;
  ref?: React.Ref<InputRef> | undefined;
}

/**
 * FormInput Component
 * @param {any} inputProps:FormInputProps
 * @returns {any}
 */
export default function FormInput(inputProps: FormInputProps): any {
  const {
    name,
    type,
    onChange,
    placeHolder,
    suffix,
    prefix,
    value,
    required,
    errors,
    key,
    disabled,
    ref,
    label,
    onKeyDown,
  } = inputProps;
  return (
    <div className="flex flex-col gap-3 text-sm" key={key}>
      {label && (
        <div className="flex gap-2 items-center">
          {required && <span className="text-primary-danger text-sm">*</span>}
          <span>{label}</span>
        </div>
      )}
      <Input
        ref={ref}
        className="h-[40px] rounded-none"
        placeholder={placeHolder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        disabled={disabled}
        name={name}
        type={type ?? "text"}
        suffix={suffix}
        prefix={prefix}
      />
      {errors && <ErrorMessage message={errors} />}
    </div>
  );
}

/**
 * Password Input Component
 * @param {any} inputProps:FormInputProps
 * @returns {React.ReactNode}
 */
export const PasswordFormInput = (
  inputProps: FormInputProps
): React.ReactNode => {
  return (
    <div key={inputProps.key} className="flex flex-col gap-3">
      <Input.Password
        className="h-[40px] rounded-none"
        prefix={inputProps.prefix}
        placeholder={inputProps.placeHolder}
        onChange={inputProps.onChange}
        value={inputProps.value}
        name={inputProps.name}
        type="password"
      />
      {inputProps.errors && <ErrorMessage message={inputProps.errors} />}
    </div>
  );
};

/**
 * Textarea Component
 * @param {any} inputProps:FormInputProps
 * @returns {React.ReactNode}
 */
export const TextAreaInput = (inputProps: FormInputProps): React.ReactNode => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      {inputProps.label && (
        <div className="flex gap-2 items-center">
          {inputProps.required && (
            <span className="text-primary-danger text-sm">*</span>
          )}
          <span>{inputProps.label}</span>
        </div>
      )}
      <Input.TextArea
        className="h-[100px]"
        placeholder={inputProps.placeHolder}
        onChange={inputProps.onChange}
        value={inputProps.value}
        name={inputProps.name}
      />
      {inputProps.errors && <ErrorMessage message={inputProps.errors} />}
    </div>
  );
};

export interface NumberInputProps {
  placeHolder?: string;
  onChange: any;
  value: number;
  name: string;
  max: number;
  min: number;
  errors?: any;
  label?: string;
  required?: boolean;
  class?: string;
}

/**
 * Number Input Component
 * @param {NumberInputProps} numberInputProps:NumberInputProps
 * @returns {React.ReactNode}
 */
export const NumberInput = (
  numberInputProps: NumberInputProps
): React.ReactNode => {
  return (
    <div
      className={`flex flex-col gap-3 text-sm w-full ${numberInputProps.class}`}
    >
      {numberInputProps.label && (
        <div className="flex gap-2 items-center">
          {numberInputProps.required && (
            <span className="text-primary-danger text-sm">*</span>
          )}
          <span>{numberInputProps.label}</span>
        </div>
      )}
      <InputNumber
        className="w-full text-sm rounded-none"
        size="large"
        placeholder={numberInputProps.placeHolder}
        onChange={numberInputProps.onChange}
        value={numberInputProps.value}
        name={numberInputProps.name}
        min={numberInputProps.min}
        max={numberInputProps.max}
      />
      {numberInputProps.errors && (
        <ErrorMessage message={numberInputProps.errors} />
      )}
    </div>
  );
};

export const SearchInput = (inputProps: any) => {
  const {
    name,
    type,
    onChange,
    placeHolder = "Search",
    suffix,
    prefix,
    value,
  } = inputProps;
  return (
    <Input
      className="h-[40px] rounded-none"
      name={name}
      onChange={onChange}
      placeholder={placeHolder}
      suffix={<SearchOutlined />}
      value={value}
    />
  );
};

type FormInputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
