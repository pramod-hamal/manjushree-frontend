import React from "react";
import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";

export default function AlertForm() {
  const initialValues = {
    title: "",
    type: "",
    content: "",
    to: "",
  };

  const formFields: FormField[] = [
    {
      name: "title",
      label: "Alert Title",
      placeHolder: "Title",
      required: true,
      type: "text",
    },
    {
      name: "type",
      label: "Alert Type",
      placeHolder: "Select Type",
      required: true,
      type: "select",
      options: [],
    },
    {
      name: "content",
      label: "Alert Content",
      placeHolder: "Content",
      required: true,
      type: "textarea",
    },
    {
      name: "to",
      label: "Alert To",
      placeHolder: "Select To",
      required: true,
      type: "select",
      options: [],
    },
  ];

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    onSubmit: (values: any) => {},
    formFields,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold">Create Alert</h2>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5">{renderFormFields()}</div>
        <div className="flex gap-5 items-center">
          <FlatButton title="Create Alert" onClick={() => {}} />
          <FlatButton
            title="Cancel"
            onClick={() => {}}
            color="text-black bg-white shadow border"
          />
        </div>
      </form>
    </div>
  );
}
