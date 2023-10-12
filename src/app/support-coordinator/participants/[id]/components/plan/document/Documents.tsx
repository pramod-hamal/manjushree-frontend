import React from "react";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import usePlanDocuments from "./hook/usePlanDocuments";

export default function Documents({ onClose }: { onClose: () => void }) {

  const { formik } = usePlanDocuments({ onClose });

  return (
    <div className="bg-white rounded flex flex-col gap-5 ">
      <span className="text-lg font-semibold">Documents</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <FormInput
          errors={null}
          onChange={formik.handleChange}
          name="name"
          label="File Name"
          placeHolder="File Name"
          value={formik.values.name}
        />
        <FileUpload
          value={formik.values.file}
          onChange={(file: any) => {
            formik.setFieldValue("file", file.file);
            formik.setFieldValue("name", file.file.name);
          }}
        />
        <div className="flex gap-10 items-center">
          <FlatButton
            title="Submit"
            type="submit"
            loading={formik.isSubmitting}
          />
          <CancelButton onClose={() => onClose()} />
        </div>
      </form>
    </div>
  );
}
