import { Select } from "antd";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import { CusSelectProps } from "./interface/form.interface";

export default function CusSelect(selectProps: CusSelectProps) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      {selectProps.label && (
        <div className="flex gap-2 items-center">
          {selectProps.required && (
            <span className="text-primary-danger text-sm">*</span>
          )}
          <span>{selectProps.label}</span>
        </div>
      )}
      <Select
        disabled={selectProps.disabled}
        className="w-full rounded-none text-sm placeholder:text-sm"
        size="large"
        value={selectProps.value}
        placeholder={selectProps.placeHolder ?? ""}
        onChange={selectProps.onChange}
        options={selectProps.options}
      />
      {selectProps.errors && <ErrorMessage message={selectProps.errors} />}
    </div>
  );
}
