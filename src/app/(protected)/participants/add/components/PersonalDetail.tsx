import React from "react";

import useFormBuilder from "@/hooks/useFormBuilderleanq_support_coordinator";

export default function PersonalDetail() {
  const { formik: personalDetailFormik, renderFormFields } = useFormBuilder({
    initialValues: {},
    onSubmit: () => {},
    formFields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeHolder: "First name",
        required: true,
      },
      {
        name: "middleName",
        label: "Middle Name",
        placeHolder: "Middle Name",
        type: "text",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        placeHolder: "Last Name",
        type: "text",
        required: true,
      },
      {
        name: "phoneNo",
        label: "Phone Number",
        placeHolder: "Phone Number",
        type: "number",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        placeHolder: "Email",
        type: "email",
        required: true,
      },
      {
        name: "dob",
        label: "Date of Birth",
        type: "date",
        placeHolder: "Select Date",
        required: true,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        placeHolder: "Select Gender",
        options: [{ value: "Male", label: "Male" }],
        required: true,
      },
      {
        name: "preferedLanguage",
        label: "Prefered Language",
        placeHolder: "Prefered Language",
        type: "text",
        required: true,
      },
      {
        name: "pronounces",
        label: "Pronounces",
        type: "text",
        placeHolder: "Text here",
        required: true,
      },
      {
        name: "ndis",
        label: "NDIS Number",
        type: "number",
        placeHolder: "Text here",
        required: true,
      },
      {
        name: "supportCoordinator",
        label: "Support Coordinator",
        type: "select",
        placeHolder: "Support Coordinator",
        options: [{ value: "", label: "" }],
        required: true,
      },
    ],
  });

  return (
    <div>
      <span className="text-2xl font-semibold ">Personal details</span>
      <form className="mt-5" onSubmit={personalDetailFormik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          {renderFormFields()}
        </div>
      </form>
    </div>
  );
}
