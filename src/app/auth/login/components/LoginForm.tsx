"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import { useSignInMutation } from "@/store/features/auth/apiSliceleanq_support_coordinator";
import { LoginFormDTO } from "../interface/loginFormDTO";
import {
  APIBaseResponse,
} from "@/core/interface/api.responseleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { LoginResponseData } from "@/store/features/auth/interface/auth.responseleanq_support_coordinator";

const initialValues: LoginFormDTO = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export default function LoginForm() {
  const showToast = useToast();
  const router = useRouter();
  const [login] = useSignInMutation();

  const handleLogin = (
    values: LoginFormDTO,
    { setSubmitting }: FormikHelpers<LoginFormDTO>
  ) =>
    login(values)
      .unwrap()
      .then((data: APIBaseResponse<LoginResponseData>) => {
        router.push("/dashboard");
        localStorage.setItem("token", data.data.accessToken);
        showToast({ title: "Login Successfull", type: "success" });
      })
      .catch((error) => {
        const errorData: APIBaseResponse<any> = error.data;
        showToast({ title: errorData.error?.message, type: "error" });
        setSubmitting(false);
      });

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

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
      <FlatButton type="submit" title="Sign In" loading={formik.isSubmitting} />
    </form>
  );
}
