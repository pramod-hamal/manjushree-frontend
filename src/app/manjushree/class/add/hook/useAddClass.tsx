import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { GetClassDTO } from "@/store/features/class/interface/user.interfaceleanq_support_coordinator";
import { useAddMutation } from "@/store/features/class/apiSliceleanq_support_coordinator";

const useAddClass = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const showToast = useToast();
    const router = useRouter();
    const [addClass] = useAddMutation();

    const initialValues: GetClassDTO = {
        name: "",
        instructor: "",
        description: "",
        schedule: {
          dayOfWeek: "",
          startTime: "",
          endTime: "",
        },
        capacity: 0,
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("Required"),
        instructor: yup.string().required("Required"),
        description: yup.string().required("Required"),
        capacity: yup.string().required("Required"),
        schedule: yup.object().shape({
            dayOfWeek: yup.string().required("Required"),
            startTime: yup.string().required("Required"),
            endTime: yup.string().required("Required"),
        }),
    });


    const handleAddClass = async (
        values: GetClassDTO,
        { setSubmitting }: FormikHelpers<any>
    ) => {
        await addClass({ ...values})
            .unwrap()
            .then(() => {
                setShowModal(true);
                showToast({ title: "Class Added", type: "success" });
                router.back();
            })
            .catch((error: any) => {
                formik.setErrors(error?.data?.error)
                showToast({ title: error.data.message, type: "error" });
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleAddClass,
        validationSchema,
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
    });

    return { formik, showModal, setShowModal }
}

export default useAddClass;