import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";
import useFormBuilder from "@/hooks/useFormBuilderleanq_support_coordinator";
import React from "react";

export default function NewDocumentForm() {
  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {},
    onSubmit: (values: any) => {
      console.log(values);
    },
    formFields: [
      { name: "title", label: "File Name", type: "text", required: true },
      {
        name: "category",
        label: "Select Category",
        type: "select",
        placeHolder: "Select Category",
        required: true,
        options: [
          { value: "Category 1", label: "Category 1" },
          { value: "Category 2", label: "Category 2" },
        ],
      },
    ],
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Documents</h3>
      <div className="flex flex-col gap-5">
        {renderFormFields()}
        <div />
        <FileUpload />
      </div>
      <div className="flex gap-10 items-center">
        <FlatButton title="Submit" onClick={() => {}} />
        <FlatButton
          title="Cancel"
          onClick={() => {}}
          color="text-black bg-white shadow"
        />
      </div>
    </form>
  );
}
