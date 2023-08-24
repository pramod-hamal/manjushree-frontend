"use client";

import React, { useEffect } from "react";

import PersonalDetail from "@/app/(protected)/participants/add/components/PersonalDetailleanq_support_coordinator";
import ReferenceNumbers from "@/app/(protected)/participants/add/components/ReferenceNumbersleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { useUpdateProfileMutation } from "@/store/features/participants/detail/apiSliceleanq_support_coordinator";
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
import { defaultDateFormat } from "@/lib/date.utilsleanq_support_coordinator";

export default function EditProfile() {
  const showToast = useToast();
  const { participantDetail, disabled } = useAppSelector(
    participantDetailState
  );
  const [update] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const handleEdit = async (values: any, { setSubmitting }: any) => {
    try {
      const participantData = {
        ...values,
        phone: values.phone.toString(),
        dateOfBirth: defaultDateFormat(new Date(values.dateOfBirth)),
      };
      const { data, error }: any = await update(participantData);
      if (data) {
        const responseData: APIBaseResponse<any, any> = data;
        showToast({
          title: responseData.message,
          description: "Profile edited successfull",
          type: "success",
        });
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        showToast({
          title: errorData.message,
          description: errorData.error?.message,
          type: "error",
        });
      }
      dispatch(toogleEdit(!disabled));
    } catch (error: any) {
      showToast({
        title: "Something Went Wrong",
        description: error?.message,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
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
