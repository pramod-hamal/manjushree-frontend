"use client";

import React, { useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import {
  UserSliceState,
  userState,
} from "@/store/features/users/userSliceleanq_support_coordinator";
import { EditUserDTO } from "@/store/features/users/interface/user.interfaceleanq_support_coordinator";
import { useUpdateMutation } from "@/store/features/users/apiSliceleanq_support_coordinator";
import { EditFilled } from "@ant-design/icons";

export default function EdituserForm() {
  const { userDetail }: UserSliceState = useAppSelector(userState);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [updateUser] = useUpdateMutation();

  const initialValues: EditUserDTO = {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const handleEditUser = (
    values: EditUserDTO,
    { setSubmitting }: FormikHelpers<EditUserDTO>
  ) =>
    updateUser(values)
      .unwrap()
      .then((data) => {
        setDisabled(true);
      })
      .catch((error) => {})
      .finally(() => {
        setSubmitting(false);
      });

  const formik = useFormik({
    initialValues,
    onSubmit: handleEditUser,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (userDetail !== null) {
      formik.setValues(userDetail);
    }
  }, [userDetail]);

  return (
    <div className="p-5 bg-white flex flex-col gap-5">
      <div>
        <span className="text-2xl font-semibold">Personal details</span>
        <div
          className="absolute right-0 flex items-center gap-4 p-2 rounded cursor-pointer top-5 text-primary-button"
          onClick={() => setDisabled(!disabled)}
        >
          <EditFilled />
          Edit
        </div>
      </div>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            value={formik.values.firstName}
            name="firstName"
            disabled={disabled}
            label="First Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.firstName}
          />
          <FormInput
            value={formik.values.middleName}
            name="middleName"
            disabled={disabled}
            label="Middle Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.middleName}
          />
          <FormInput
            value={formik.values.lastName}
            name="lastName"
            disabled={disabled}
            label="Last Name"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.lastName}
          />
          <FormInput
            value={formik.values.email}
            name="email"
            disabled={disabled}
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
            disabled={disabled}
            label="Phone Number"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors.phone}
          />
        </div>
        {!disabled && (
          <div className="flex gap-10 items-center">
            <FlatButton title="Edit" type="submit" />
            <CancelButton />
          </div>
        )}
      </form>
    </div>
  );
}
