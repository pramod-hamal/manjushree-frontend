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
  LoginResponseData,
} from "@/store/features/auth/interface/api.responseleanq_support_coordinator";

const initialValues: LoginFormDTO = {
  email: "leanq@digital.com",
  password: "Pa$$w0rd",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export default function LoginForm() {
  const router = useRouter();
  const [login] = useSignInMutation();

  const handleLogin = async (
    values: LoginFormDTO,
    { setSubmitting }: FormikHelpers<LoginFormDTO>
  ) => {
    try {
      const { data, error }: any = await login(values);
      if (data) {
        const responseData: APIBaseResponse<LoginResponseData | any, null> =
          data;
        localStorage.setItem("token", responseData.data.accessToken);
        router.push("/dashboard");
      } else {
        const errorData: APIBaseResponse<any, null> = error.data;
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
          name="email"
          placeHolder="Email"
          errors={formik.errors?.email}
          onChange={formik.handleChange}
          value={formik.values.email}
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
          value={false}
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
