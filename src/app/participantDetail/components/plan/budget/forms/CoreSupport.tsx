import React from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import SupportTitleHeader from "../../../SupportTitleHeader";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import CusCheckbox from "@/components/form/Checkboxleanq_support_coordinator";

export default function CoreSupport({ formik }: any) {
  return (
    <div className="border border-solid border-gray-300 p-5 rounded flex flex-col gap-5">
      <SupportTitleHeader title="Core Support" />
      <div className="grid grid-cols-2 gap-5 w-full ">
        <FormInput
          label="Description"
          required={true}
          placeHolder="Text Here"
          onChange={() => {}}
          name=""
          errors={null}
          value={null}
        />
        <div className="flex gap-5">
          <CusSelect
            value={null}
            onChange={() => {}}
            label="Management Type"
            required={true}
            options={[]}
            placeHolder="Select Type"
          />
          <FormInput
            label="Budget"
            required={true}
            placeHolder="Text Here"
            onChange={() => {}}
            name=""
            errors={null}
            value={null}
          />
          <CusCheckbox
            name=""
            onChange={() => {}}
            title=""
            label="Stated"
            value={false}
          />
          <MoreOutlined className="pt-7" />
        </div>
      </div>
      <div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Funded Support"
          onClick={() => {}}
          color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
        />
      </div>
    </div>
  );
}
