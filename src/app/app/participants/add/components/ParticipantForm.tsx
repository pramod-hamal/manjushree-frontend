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
  const [showModal, setShowModal] = useState(true);

  const addParticipantsFormik = useFormik({
    initialValues: {
      personalDetail: {},
      referenceNumbers: [],
    },
    onSubmit: () => {},
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <PersonalDetail />
      <div />
      <ReferenceNumbers formik={addParticipantsFormik} />
      <div className="flex gap-10 items-center">
        <FlatButton title="Submit" type="submit" />
        <CancelButton />
      </div>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
