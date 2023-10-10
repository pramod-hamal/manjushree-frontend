import React from "react";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import { appendFormData } from "@/core/lib/append-form-dataleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useAddNewDocumentMutation } from "@/store/features/participants/documents/apiSliceleanq_support_coordinator";
import { toogleModal } from "@/store/features/participants/documents/participantDocumentSliceleanq_support_coordinator";

import { formFields, validationSchema } from "./form-utils";

export default function NewDocumentForm() {
  const { participantDetail } = useAppSelector(participantDetailState);
  const [add] = useAddNewDocumentMutation();
  const showToast = useToast();

  const dispatch = useAppDispatch();

  const addNewDocument = async (values: any, { setSubmitting }: any) => {
    try {
      const formData = appendFormData(values);
      const { data, error }: any = await add(formData);
      if (data) {
        formik.resetForm();
        dispatch(toogleModal(false));
        showToast({ title: "Document Added", type: "success" });
      } else {
        const errorData: APIBaseResponse<any> = error.data;
        showToast({ title: errorData.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {
      name: "",
      file: null,
      participantId: participantDetail?.id,
      category: "Default Category",
    },
    validationSchema,
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
          value={formik.values.file}
          onChange={(file: any) => {
            formik.setFieldValue("file", file.file);
            formik.setFieldValue("name", file.file.name);
          }}
        />
      </div>
      <div className="flex gap-10 items-center">
        <FlatButton
          title="Submit"
          type="submit"
          loading={formik.isSubmitting}
        />
        <CancelButton />
      </div>
    </form>
  );
}
