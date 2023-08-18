"use client";
import PersonalDetail from "@/app/(protected)/participants/add/components/PersonalDetailleanq_support_coordinator";
import ReferenceNumbers from "@/app/(protected)/participants/add/components/ReferenceNumbersleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import {
  participantDetailState,
  toogleEdit,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { EditFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import React, { useEffect } from "react";

export default function EditProfile() {
  const { participantDetail, disabled } = useAppSelector(
    participantDetailState
  );
  const dispatch = useAppDispatch();

  const handleEdit = (values: any, { setSubmitting }: any) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: participantDetail ?? {},
    onSubmit: handleEdit,
  });

  useEffect(() => {
    if (participantDetail !== null) {
      let participantDetailData = {
        ...participantDetail,
        referenceNo: participantDetail?.referenceNo ?? [],
      };
      formik.setValues(participantDetailData);
    }
  }, [formik, participantDetail]);

  return (
    <div className="relative">
      <div
        className="flex p-2 rounded cursor-pointer top-5 items-center  gap-4 text-primary-button absolute right-0"
        onClick={() => dispatch(toogleEdit(!disabled))}
      >
        <EditFilled />
        Edit
      </div>
      <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
        <PersonalDetail formik={formik} disabled={disabled} />
        <ReferenceNumbers formik={formik} editMode={true} disabled={disabled} />
        {!disabled && (
          <div>
            <FlatButton title="Edit" type="submit" />
          </div>
        )}
      </form>
    </div>
  );
}
