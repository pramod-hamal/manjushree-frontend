import React from "react";
import * as yup from "yup";

import useFormBuilder from "@/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { useAddHealthConditionMutation } from "@/store/features/participants/health/apiSliceleanq_support_coordinator";
import { HealthConditionInitialState } from "@/store/features/participants/health/interface/health-condition.interfaceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { FormikHelpers } from "formik";
import { toogleModal } from "@/store/features/participants/health/participantHealthSliceleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

export default function HealthConditionForm() {
  const dispatch = useAppDispatch();
  const showToast = useToast();
  const { participantDetail } = useAppSelector(participantDetailState);

  const [addHealthCondition] = useAddHealthConditionMutation();

  const initialValues: HealthConditionInitialState = {
    participantId: participantDetail?.id,
    title: "",
    description: "",
    type: "NORMAL",
  };

  const handleSubmit = async (
    values: HealthConditionInitialState,
    { setSubmitting }: FormikHelpers<HealthConditionInitialState>
  ) => {
    await addHealthCondition(values)
      .unwrap()
      .then((_) => {
        formik.resetForm();
        showToast({ title: "Health Condition Added", type: "success" });
        dispatch(toogleModal(false));
      })
      .catch((error) => {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({ title: errorData.message, type: "error" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const { formik, renderFormFields } = useFormBuilder({
    initialValues,
    onSubmit: handleSubmit,
    formFields,
    validationSchema,
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Health Condition</h3>
      <div className="flex flex-col gap-5">{renderFormFields()}</div>
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

const formFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeHolder: "Title",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeHolder: "Select Type",
    required: true,
    options: [
      { value: "CRITICAL", label: "CRITICAL" },
      { value: "NORMAL", label: "NORMAL" },
    ],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeHolder: "Type Here",
    required: true,
  },
];
