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
            value={formik.values.firstName}
            name="firstName"
            label="First Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.firstName}
          />
          <FormInput
            value={formik.values.middleName}
            name="middleName"
            label="Middle Name"
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.middleName}
          />
          <FormInput
            value={formik.values.lastName}
            name="lastName"
            label="Last Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.lastName}
          />
          <FormInput
            value={formik.values.email}
            name="email"
            label="Email"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.email}
          />
          <FormInput
            type="number"
            value={formik.values.phone}
            name="phone"
            label="Phone Number"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.phone}
          />
          <CusSelect
            options={[]}
            placeHolder="Select Role"
            label="Role"
            onChange={() => { }}
            required={true}
            value={formik.values.role}
            errors={formik.errors.role}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            title="Submit"
            type="submit"
            loading={formik.isSubmitting}
          />
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
