import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

import { emailRegex } from "@/core/lib/regexleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useAddMutation } from "@/store/features/users/apiSliceleanq_support_coordinator";
import { CreateUserDTO } from "@/store/features/users/interface/user.interfaceleanq_support_coordinator";

const useAddUser = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const showToast = useToast();
    const router = useRouter();
    const [addUser] = useAddMutation();

    const initialValues: CreateUserDTO = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        role: null,
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        email: yup.string().matches(emailRegex, "Invalid Email").required("Required"),
        phone: yup.string().required("Required"),
    });


    const handleAddUser = async (
        values: CreateUserDTO,
        { setSubmitting }: FormikHelpers<CreateUserDTO>
    ) => {
        await addUser({ ...values, phone: values.phone.toString() })
            .unwrap()
            .then(() => {
                setShowModal(true);
                showToast({ title: "User Added", type: "success" });
                router.back();
            })
            .catch((error: any) => {
                formik.setErrors(error?.data?.error)
                showToast({ title: error.data.message, type: "error" });
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleAddUser,
        validationSchema,
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
    });

    return { formik, showModal, setShowModal }
}

export default useAddUser;