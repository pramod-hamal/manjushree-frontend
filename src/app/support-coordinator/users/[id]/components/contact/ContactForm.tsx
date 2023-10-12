import React, { useState } from "react";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { useContactQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import {
  UserSliceState,
  userState,
} from "@/store/features/users/userSliceleanq_support_coordinator";
import { UserContactDTO } from "@/store/features/users/interface/user.contact.interfaceleanq_support_coordinator";
import { useAddContactMutation } from "@/store/features/users/apiSliceleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import ErrorMessage from "@/components/form/ErrorMessageleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import IndividualContactForm from "@/app/support-coordinator/contact/individual/components/IndividualContactFormleanq_support_coordinator";

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const { userDetail }: UserSliceState = useAppSelector(userState);
  const { data, refetch }: any = useContactQuery("");
  const [addContact] = useAddContactMutation();

  const showToast = useToast();

  const handleToogleShow = () => setShowContactForm(!showContactForm)

  const initialValues: UserContactDTO = {
    relation: "",
    userId: userDetail?.id!,
    contactId: null,
  };

  const handleSubmit = async (
    values: UserContactDTO,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    await addContact(values).unwrap().then((_: APIBaseResponse<any>) => {
      onClose();
      formik.resetForm();
      showToast({ title: "Contact Added", type: "success" });
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
  });

  return (
    <>
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
              {formik.errors.contactId && <ErrorMessage message={formik.errors.contactId} />}
            </div>
            <div>
              <FlatButton
                icon={<PlusOutlined />}
                title="Create New"
                type="button"
                onClick={handleToogleShow}
                color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
              />
            </div>
          </div>
          <div className="w-[366px]">
            <FormInput
              placeHolder="Relationship"
              onChange={formik.handleChange}
              name="relation"
              errors={formik.errors?.relation}
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
      <CusModal width={800} show={showContactForm} onClose={handleToogleShow}>
        <IndividualContactForm handleOnClose={() => {
          refetch();
          handleToogleShow();
        }} />
      </CusModal>
    </>
  );
}
