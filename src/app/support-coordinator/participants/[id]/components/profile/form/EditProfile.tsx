"use client";

import React, { useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { useFormik } from "formik";

import PersonalDetail from "@/app/support-coordinator/participants/add/components/PersonalDetailleanq_support_coordinator";
import ReferenceNumbers from "@/app/support-coordinator/participants/add/components/ReferenceNumbersleanq_support_coordinator";

import {
  defaultDateFormat,
  formatDateToYYYYMMDD,
} from "@/core/lib/date.utilsleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

import { useUpdateProfileMutation } from "@/store/features/participants/detail/apiSliceleanq_support_coordinator";
import {
  participantDetailState,
  toogleEdit,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { validationSchema } from "@/app/support-coordinator/participants/add/form-utilsleanq_support_coordinator";

export default function EditProfile() {
  const showToast = useToast();
  const { participantDetail, disabled } = useAppSelector(
    participantDetailState
  );
  const [update] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const handleEdit = async (values: any, { setSubmitting }: any) => {
    const participantData = {
      ...values,
      phone: values.phone.toString(),
      dateOfBirth: defaultDateFormat(new Date(values.dateOfBirth)),
    };
    await update(participantData)
      .unwrap()
      .then((data: APIBaseResponse<any>) => {
        showToast({ title: data.message, description: "Profile edited successfull", type: "success" });
        dispatch(toogleEdit(!disabled));
      })
      .catch((error) => {
        const errorData: APIBaseResponse<any> = error.data;
        formik.setErrors(errorData.error)
        showToast({ title: errorData.message, description: errorData.error?.message, type: "error" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: participantDetail ?? {},
    onSubmit: handleEdit,
    validationSchema: validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (participantDetail !== null) {
      let participantDetailData = {
        ...participantDetail,
        referenceNo: participantDetail?.referenceNo ?? [],
        dateOfBirth: formatDateToYYYYMMDD(participantDetail.dateOfBirth),
      };
      formik.setValues(participantDetailData);
    }
  }, [participantDetail]);

  return (
    <div className="relative">
      <div
        className="absolute right-0 flex items-center gap-4 p-2 rounded cursor-pointer top-5 text-primary-button"
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
            <FlatButton
              loading={formik.isSubmitting}
              title="Update"
              type="submit"
            />
          </div>
        )}
      </form>
    </div>
  );
}
