"use client";

import React from "react";
import { useRouter } from "next/navigation";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import SuccessModal from "./SuccessModal";
import useAddUser from "../hook/useAddUser";

export default function AddUserForm() {
  const router = useRouter(); 

  const { formik, showModal, setShowModal } = useAddUser();

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Personal details</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            value={formik.values.MemberId}
            name="MemberId"
            label="Member Id"
            required={true}
            placeHolder="Eg: 1"
            onChange={formik.handleChange}
            errors={formik.errors?.MemberId}
          />
          <FormInput
            value={formik.values.Name}
            name="Name"
            label="Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.Name}
          />
          <FormInput
            value={formik.values.Address}
            name="Address"
            label="Address"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.Address}
          />
          <FormInput
            value={formik.values.Email}
            name="Email"
            label="Email"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.Email}
          />
          <FormInput
            type="number"
            value={formik.values.ContactNo}
            name="ContactNo"
            label="Phone Number"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.ContactNo}
          />
          <CusSelect
            options={[{value: "Male", label: "Male"}, {value: "Female", label: "Female"}, {value: "Other", label: "Other"}]}
            placeHolder="Select Gender"
            label="Gender"
            onChange={(value: any) => formik.setFieldValue("Gender", value)}
            required={true}
            value={formik.values.Gender}
            errors={formik.errors.Gender}
          />
                    <CusSelect
            options={[{value: "Cardio", label: "Cardio"}, {value: "Muscle Strength", label: "Muscle Strength"}]}
            placeHolder="Select Class"
            label="Class"
            onChange={(value: any) => formik.setFieldValue("Class", value)}
            required={true}
            value={formik.values.Class}
            errors={formik.errors.Class}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            title="Submit"
            type="submit"
            loading={formik.isSubmitting}
            // onClick={() => formik.handleSubmit()}
          />
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
