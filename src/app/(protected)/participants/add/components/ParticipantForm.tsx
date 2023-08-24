"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { Participant } from "@/store/features/participants/interface/participantStateleanq_support_coordinator";
import { ParticipantAddDTO } from "@/store/features/participants/interface/addPrticipantDTOleanq_support_coordinator";
import { useAddParticipantMutation } from "@/store/features/participants/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";

import { defaultDateFormat } from "@/lib/date.utilsleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import SuccessModal from "./SuccessModal";
import PersonalDetail from "./PersonalDetail";
import ReferenceNumbers from "./ReferenceNumbers";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";

import { validationSchema, initialValues } from "../form-utils";

export default function ParticipantForm() {
  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [add] = useAddParticipantMutation();

  const onSubmit = async (
    values: ParticipantAddDTO,
    { setSubmitting }: any
  ) => {
    try {
      const participantData = {
        ...values,
        phone: values.phone.toString(),
        dateOfBirth: defaultDateFormat(new Date(values.dateOfBirth)),
      };
      const { data, error }: any = await add(participantData);
      if (data) {
        const responseData: APIBaseResponse<Participant, null> = data;
        setShowModal(true);
        addParticipantsFormik.resetForm();
        router.back();
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({
          title: errorData.message,
          description: errorData.error?.message,
          type: "error",
        });
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
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
