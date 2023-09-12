import React from "react";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

import { useAddMutation } from "@/store/features/participants/contact/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { toogleModal } from "@/store/features/participants/contact/contactDetailSliceleanq_support_coordinator";
import { useOrganizationContactQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import ErrorMessage from "@/components/form/ErrorMessageleanq_support_coordinator";

export interface ParticipantContactDTO {
  relation: string;
  participantId?: number;
  contactId: number | null;
}

export default function ContactForm() {
  const [addContact] = useAddMutation();
  const { participantDetail } = useAppSelector(participantDetailState);
  const { data}: any = useOrganizationContactQuery("");

  const dispatch = useAppDispatch();

  const showToast = useToast();

  const initialValues: ParticipantContactDTO = {
    relation: "",
    participantId: participantDetail?.id,
    contactId: null,
  };

  const handleSubmit = async (
    values: ParticipantContactDTO,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    await addContact(values).unwrap().then((_: APIBaseResponse<any>) => {
      dispatch(toogleModal(false));
      showToast({ title: "Contact Added", type: "success" });
      formik.resetForm()
    }).catch((error: any) => {
      console.log(error)
      formik.setErrors(error?.data?.error);
      showToast({ title: error?.data?.message, type: "error" });
    }).finally(() => {
      setSubmitting(false);
    })
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Add Contact</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-[366px]">
            <CusSelect
              placeHolder="Select Contact"
              onChange={(selectedData: any) => {
                formik.setFieldValue("contactId", selectedData);
              }}
              options={data?.data ?? []}
              value={formik.values.contactId}
            />
            {formik.errors.contactId && <ErrorMessage message={formik.errors.contactId}/>}
          </div>
         <div>
         <FlatButton
            icon={<PlusOutlined />}
            title="Create New"
            type="button"
            onClick={() => { }}
            color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
          />
         </div>
        </div>
        <div className="w-[366px]">
          <FormInput
            placeHolder="Relationship"
            onChange={formik.handleChange}
            name="relation"
            errors={formik.errors.relation}
            value={formik.values.relation}
          />
        </div>
      </div>
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
