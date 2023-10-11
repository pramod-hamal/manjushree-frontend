"use client";
import React from "react";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import SuccessModal from "./SuccessModal";
import PersonalDetail from "./PersonalDetail";
import ReferenceNumbers from "./ReferenceNumbers";
import useAddParticipantHook from "../hook/useAddParticipantHook";


export default function ParticipantForm() {
  const { addParticipantsFormik, showModal, handleModalClose } = useAddParticipantHook();

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
      <SuccessModal show={showModal} onClose={handleModalClose} />
    </div>
  );
}
