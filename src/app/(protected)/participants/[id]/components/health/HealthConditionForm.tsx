import React from "react";

import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

export default function HealthConditionForm() {
  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {},
    onSubmit: (values: any) => {
      console.log(values);
    },
    formFields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        placeHolder: "Select Type",
        required: true,
        options: [
          { value: "General", label: "General" },
          { value: "Medication", label: "Medication" },
          { value: "Serious", label: "Serious" },
          { value: "Support Needed", label: "Support Needed" },
        ],
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeHolder: "Type Here",
        required: true,
      },
    ],
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Health Condition</h3>
      <div className="flex flex-col gap-5">{renderFormFields()}</div>
      <div className="flex gap-10 items-center">
        <FlatButton title="Submit" onClick={() => {}} />
        <CancelButton />
      </div>
    </form>
  );
}
