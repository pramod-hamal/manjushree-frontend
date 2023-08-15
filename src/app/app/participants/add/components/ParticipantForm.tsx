"use client";
import React, { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import ReferenceNumbers from "./ReferenceNumbers";
import { useFormik } from "formik";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import SuccessModal from "./SuccessModal";

export default function ParticipantForm() {
  const [showModal, setShowModal] = useState(false);

  const addParticipantsFormik = useFormik({
    initialValues: {
      personalDetail: {},
      referenceNumbers: [],
    },
    onSubmit: () => { },
  });

  return (
    <div className="flex flex-col gap-5 p-5">
      <PersonalDetail />
      <div />
      <ReferenceNumbers formik={addParticipantsFormik} />
      <div className="flex items-center gap-10">
        <FlatButton title="Submit" type="submit" />
        <CancelButton />
      </div>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
