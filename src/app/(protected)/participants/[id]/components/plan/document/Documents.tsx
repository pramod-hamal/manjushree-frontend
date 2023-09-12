import React from "react";
import { useFormik } from "formik";
import FileUpload from "@/components/form/FileUploadleanq_support_coordinator";

import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import {
  useAddPlanDocumentMutation,
  useParticipantPlanQuery,
} from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import {
  PlanInterface,
  PlanResponse,
} from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { appendFormData } from "@/core/lib/append-form-dataleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

export default function Documents({ onClose }: { onClose: () => void }) {
  const { participantDetail } = useAppSelector(participantDetailState);
  const { data } = useParticipantPlanQuery(participantDetail?.id!);
  const [createDocument] = useAddPlanDocumentMutation();
  const showToast = useToast();

  const planData: PlanResponse | undefined = data?.data;
  const plan: PlanInterface | null =
    planData && planData.length > 0 ? planData[0] : null;

  const handleDocumentUpload = async (values: any, { setSubmitting }: any) => {
    const appendedFormData = appendFormData(values);
    return createDocument(appendedFormData)
      .unwrap()
      .then((data) => {
        showToast({ title: "Document Added", type: "success" });
        setSubmitting(false);
        onClose();
      })
      .catch((error) => {
        showToast({ title: error?.data?.message, type: "error" });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      file: null,
      participantId: participantDetail?.id,
      planId: plan?.id,
    },
    onSubmit: handleDocumentUpload,
  });

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
