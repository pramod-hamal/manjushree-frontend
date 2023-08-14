"use client";

import React, { useState } from "react";
import { useFormik } from "formik";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import SuccessModal from "./SuccessModal";

export default function AddUserForm() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    role: "",
    rate: "",
    relation: "",
    contact: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any, { setSubmitting }: any) => {
      console.log(values);
    },
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
            value={formik.values.phoneNo}
            name="phoneNo"
            label="Phone Number"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.phoneNo}
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
          <CusSelect
            options={[{ label: "One", value: "One" }]}
            placeHolder="Select Rate"
            label="Rate"
            onChange={(value: any) => formik.setFieldValue("rate", value)}
            required={true}
            value={formik.values.rate}
            errors={formik.errors.rate}
          />
        </div>
        <span className="text-2xl font-semibold pt-4">Contacts</span>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <CusSelect
            options={[]}
            placeHolder="Choose Contact"
            label="Choose Contact"
            onChange={() => {}}
            required={true}
            value={formik.values.contact}
            errors={formik.errors.contact}
          />
          <FormInput
            value={formik.values.relation}
            name="relation"
            label="Relation"
            required={true}
            placeHolder="Type Relation"
            onChange={formik.handleChange}
            errors={formik.errors.email}
          />
          <CusSelect
            options={[]}
            placeHolder="Type"
            label="Type"
            onChange={() => {}}
            required={true}
            value={formik.values.rate}
            errors={formik.errors.rate}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton title="Submit" type="submit" />
          <CancelButton />
        </div>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
