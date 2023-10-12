import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormikHelpers, useFormik } from "formik";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";

import { Participant } from "@/store/features/participants/interface/participantStateleanq_support_coordinator";
import { ParticipantAddDTO } from "@/store/features/participants/interface/addPrticipantDTOleanq_support_coordinator";
import { useAddParticipantMutation } from "@/store/features/participants/apiSliceleanq_support_coordinator";

import { validationSchema, initialValues } from "../form-utils";

const useAddParticipantHook = () => {
    const showToast = useToast();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const [add] = useAddParticipantMutation();

    const handleModalClose = () => setShowModal(false)

    const onSubmit = async (
        values: ParticipantAddDTO,
        { setSubmitting }: FormikHelpers<ParticipantAddDTO>
    ) => {
        const participantData = {
            ...values,
            phone: values.phone.toString(),
            dateOfBirth: values.dateOfBirth,
        };
        await add(participantData).unwrap().then((data: APIBaseResponse<Participant>) => {
            setShowModal(true);
            addParticipantsFormik.resetForm();
            router.back();
        }).catch((error: any) => {
            const errorData: APIBaseResponse<any> = error.data;
            addParticipantsFormik.setErrors(errorData.error)
            showToast({
                title: errorData.message,
                description: errorData.error?.message,
                type: "error",
            });
        })
    };

    const addParticipantsFormik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
    });
    return { addParticipantsFormik, showModal, handleModalClose }
}

export default useAddParticipantHook;