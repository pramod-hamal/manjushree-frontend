import React from "react";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

  return (
    <form className="p-5 gap-5 flex flex-col">
      <h3 className="text-2xl font-semibold m-0">Add Contact</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-[366px]">
            <SearchInput />
          </div>
          <FlatButton
            icon={<PlusOutlined />}
            title="Create New"
            onClick={() => {}}
            color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
          />
        </div>
        <div className="w-[366px]">
          <CusSelect
            placeHolder="Relationship"
            onChange={() => {}}
            options={[]}
            value={null}
          />
        </div>
      </div>
      <div className="flex gap-10 items-center">
        <FlatButton title="Submit" onClick={() => {}} />
        <CancelButton />
      </div>
    </form>
  );
}
