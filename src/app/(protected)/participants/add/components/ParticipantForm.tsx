"use client";
import React, { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import ReferenceNumbers from "./ReferenceNumbers";
import { useFormik } from "formik";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import SuccessModal from "./SuccessModal";
import { ParticipantAddDTO } from "@/store/features/participants/interface/addPrticipantDTOleanq_support_coordinator";
import { useAddParticipantMutation } from "@/store/features/participants/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { useRouter } from "next/navigation";
import { Participant } from "@/store/features/participants/interface/participantStateleanq_support_coordinator";

export default function ParticipantForm() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [add] = useAddParticipantMutation();

  const initialValues: ParticipantAddDTO = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    preferredLanguage: "",
    pronouns: "",
    ndisNumber: 0,
    referenceNo: [],
  };

  const onSubmit = async (
    values: ParticipantAddDTO,
    { setSubmitting }: any
  ) => {
    try {
      const participantData = { ...values, phone: Number(values.phone) };
      const { data, error }: any = await add(participantData);
      if (data) {
        const responseData: APIBaseResponse<Participant, null> = data;
        router.back();
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        console.log(errorData);
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const addParticipantsFormik = useFormik({
    initialValues,
    onSubmit,
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
