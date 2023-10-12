"use client";

import React from "react";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusCheckbox from "@/components/form/Checkboxleanq_support_coordinator";
import FormInput, {
  PasswordFormInput,
} from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import useLoginForm from "../hook/useLogin";

export default function LoginForm() {
  const { formik, loader } = useLoginForm();
  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <FormInput
          prefix={<UserOutlined className="pr-4 text-primary-title" />}
          name="email"
          placeHolder="Email"
          errors={formik.errors?.email}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <PasswordFormInput
          prefix={<LockOutlined className="pr-4 text-primary-title" />}
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
          value={false}
          onChange={formik.handleChange}
          title="Remember Password"
        />
        <Link
          href={routes.forgetPassword}
          className="no-underline transition hover:scale-105"
        >
          <p className="font-semibold text-primary-title">Forgot Password?</p>
        </Link>
      </div>
      <FlatButton type="submit" title="Sign In" loading={loader} />
    </form>
  );
}
