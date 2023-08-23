import React from "react";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";
import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { appendFormData } from "@/lib/append-form-dataleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";

export default function NewDocumentForm() {
  const { participantDetail } = useAppSelector(participantDetailState);

  const addNewDocument = (values: any) => {
    console.log(values);
    const formData = appendFormData(values);
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {
      name: "",
      file: null,
      participantId: participantDetail?.id,
      category: "",
    },
    onSubmit: addNewDocument,
    formFields,
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Documents</h3>
      <div className="flex flex-col gap-5">
        {renderFormFields()}
        <div />
        <FileUpload
          onChange={(file: any) => {
            formik.setFieldValue("file", file.file);
            formik.setFieldValue("name", file.file.name);
          }}
        />
      </div>
      <div className="flex gap-10 items-center">
        <FlatButton title="Submit" type="submit" />
        <CancelButton />
      </div>
    </form>
  );
}

const formFields: FormField[] = [
  { name: "name", label: "File Name", type: "text", required: true },
  {
    name: "category",
    label: "Select Category",
    type: "select",
    placeHolder: "Select Category",
    required: true,
    options: [
      { value: "Category 1", labeel: "Category 1" },
      { value: "Category 2", label: "Category 2" },
    ],
  },
];
