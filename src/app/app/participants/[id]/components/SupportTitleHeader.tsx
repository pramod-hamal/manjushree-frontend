import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import React from "react";

export interface SupportTitleHeaderProps {
  title: string;
}

export default function SupportTitleHeader(props: SupportTitleHeaderProps) {
  const { title }: SupportTitleHeaderProps = props;

  return (
    <div className="flex justify-between">
      <span className="text-xl font-semibold">{title}</span>
      <div className="flex gap-5 items-center">
        <span className="font-semibold">Total Funded Support</span>
        <FormInput
          errors={null}
          name=""
          onChange={() => {}}
          value={null}
          placeHolder="Type budget"
        />
      </div>
    </div>
  );
}
