"use client";

import React from "react";
import Link from "next/link";
import { FormikHelpers, useFormik } from "formik";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import * as yup from "yup";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusCheckbox from "@/components/form/Checkboxleanq_support_coordinator";
import FormInput, {
  PasswordFormInput,
} from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

interface LoginFormDTO {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const initialValues: LoginFormDTO = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  const handleLogin = (
    values: any,
    { setSubmitting }: FormikHelpers<LoginFormDTO>
  ) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <FormInput
          prefix={<UserOutlined className="text-primary-title pr-4" />}
          name="username"
          placeHolder="Username"
          errors={formik.errors?.username}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <PasswordFormInput
          prefix={<LockOutlined className="text-primary-title pr-4" />}
          name="password"
          placeHolder="******"
          errors={formik.errors?.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <div className="flex items-center justify-between py-3">
        <CusCheckbox
          name="rememberPassword"
          value={formik.values.rememberMe}
          onChange={formik.handleChange}
          title="Remember Password"
        />
        <Link
          href={routes.forgetPassword}
          className="no-underline transition hover:scale-105"
        >
          <p className="text-primary-title font-semibold">Forgot Password?</p>
        </Link>
      </div>
      <FlatButton type="submit" title="Sign In" loading={formik.isSubmitting} />
    </form>
  );
}
