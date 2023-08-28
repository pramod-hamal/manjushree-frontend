"use client";

import React, { useState } from "react";
import { useFormik } from "formik";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import SuccessModal from "./SuccessModal";
import { useAddMutation } from "@/store/features/users/apiSliceleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const showToast = useToast();
  const router = useRouter();
  const [addUser] = useAddMutation();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  };

  const handleAddUser = async (values: any, { setSubmitting }: any) => {
    await addUser(values)
      .unwrap()
      .then(() => {
        showToast({ title: "User Added", type: "success" });
        router.back();
      })
      .catch((error) => {
        console.log(error);
        showToast({ title: error.message, type: "error" });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleAddUser,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

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
            errors={formik.errors.firstName}
          />
          <FormInput
            value={formik.values.middleName}
            name="middleName"
            label="Middle Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.middleName}
          />
          <FormInput
            value={formik.values.lastName}
            name="lastName"
            label="Last Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.lastName}
          />
          <FormInput
            value={formik.values.email}
            name="email"
            label="Email"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.email}
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
            onChange={() => {}}
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
          <CancelButton />
        </div>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
