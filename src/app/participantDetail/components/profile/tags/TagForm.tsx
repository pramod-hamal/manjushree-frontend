import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import { useFormik } from "formik";
import React from "react";

export default function TagForm() {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any) => {},
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-xl font-semibold">Create Tag</span>
      <FormInput
        name=""
        placeHolder="Enter Tag"
        onChange={() => {}}
        errors={null}
        value={""}
      />
      <div>
        <FlatButton title="Create Tag" />
      </div>
    </div>
  );
}
