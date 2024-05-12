import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

import { useSignInMutation } from "@/store/features/auth/apiSliceleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";

import { LoginFormDTO } from "../interface/loginFormDTO";

const useLoginForm = () => {
    const router = useRouter();
    const showToast = useToast();

    const [login] = useSignInMutation();

    const [loader, setLoader] = useState<boolean>(false);

    const initialValues: LoginFormDTO = { email: "", password: "" };

    const validationSchema = yup.object().shape({
        email: yup.string().required("Required"),
        password: yup.string().required("Required"),
    });

    const handleLogin = async (values: LoginFormDTO, { setSubmitting }: FormikHelpers<LoginFormDTO>) => {
        setLoader(true)
        try {
            const data = await login(values).unwrap();
            router.push(routes.dashboard);
            setCookie("token", data.token)
            showToast({ title: "Login Successfull", type: "success" });
        } catch (error: any) {
            const errorData: APIBaseResponse<any> = error.data;
            showToast({ title: errorData?.msg, type: "error" });
            setSubmitting(false);
            setLoader(false);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleLogin,
        validationSchema,
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
    });

    return { formik, loader }
}

export default useLoginForm;