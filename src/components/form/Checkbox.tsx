import React from "react";
import { Checkbox } from "antd";
import { CusCheckBoxProps } from "./interface/form.interface";

export default function CusCheckbox(checkBoxProps: CusCheckBoxProps) {
  const {
    onChange,
    name,
    title,
    disabled,
    value,
    required,
    label,
  }: CusCheckBoxProps = checkBoxProps;
  return (
    <div className="flex flex-col gap-3 text-sm">
      {checkBoxProps.label && (
        <div className="flex gap-2 items-center">
          {checkBoxProps.required && (
            <span className="text-primary-danger text-sm">*</span>
          )}
          <span>{checkBoxProps.label}</span>
        </div>
      )}
      <Checkbox
        checked={value}
        disabled={disabled}
        name={name}
        onChange={onChange}
      >
        {title}
      </Checkbox>
    </div>
  );
}

export const MultipleCheckBox = () => { };
