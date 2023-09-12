"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormikHelpers, useFormik } from "formik";

import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import { defaultDateFormat } from "@/core/lib/date.utilsleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { Participant } from "@/store/features/participants/interface/participantStateleanq_support_coordinator";
import { ParticipantAddDTO } from "@/store/features/participants/interface/addPrticipantDTOleanq_support_coordinator";
import { useAddParticipantMutation } from "@/store/features/participants/apiSliceleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import SuccessModal from "./SuccessModal";
import PersonalDetail from "./PersonalDetail";
import ReferenceNumbers from "./ReferenceNumbers";

import { validationSchema, initialValues } from "../form-utils";

export default function ParticipantForm() {
  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [add] = useAddParticipantMutation();

  const onSubmit = async (
    values: ParticipantAddDTO,
    { setSubmitting }: FormikHelpers<ParticipantAddDTO>
  ) => {
    const participantData = {
      ...values,
      phone: values.phone.toString(),
      dateOfBirth: defaultDateFormat(new Date(values.dateOfBirth)),
    };
    await add(participantData).unwrap().then((data: APIBaseResponse<Participant>) => {
      setShowModal(true);
      addParticipantsFormik.resetForm();
      router.back();
    }).catch((error: any) => {
      const errorData: APIBaseResponse<any> = error.data;
      console.log(errorData)
      addParticipantsFormik.setErrors(errorData.error)
      showToast({
        title: errorData.message,
        description: errorData.error?.message,
        type: "error",
      });
    })
  };

  const addParticipantsFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  return (
    <div className="flex flex-col gap-5 p-5">
      <PersonalDetail formik={addParticipantsFormik} />
      <div />
      <ReferenceNumbers formik={addParticipantsFormik} />
      <div className="flex items-center gap-10">
        <FlatButton
          title="Submit"
          loading={addParticipantsFormik.isSubmitting}
          type="submit"
          onClick={() => addParticipantsFormik.handleSubmit()}
        />
        <CancelButton />
      </div>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
