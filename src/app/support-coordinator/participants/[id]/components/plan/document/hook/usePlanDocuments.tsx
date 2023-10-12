import { useFormik } from "formik";
import { appendFormData } from "@/core/lib/append-form-dataleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useAddPlanDocumentMutation, useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { PlanInterface, PlanResponse } from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";

const usePlanDocuments = ({ onClose }: { onClose: () => void }) => {

    const { participantDetail } = useAppSelector(participantDetailState);
    const { data } = useParticipantPlanQuery(participantDetail?.id!);
    const [createDocument] = useAddPlanDocumentMutation();
    const showToast = useToast();

    const planData: PlanResponse | undefined = data?.data;
    const plan: PlanInterface | null =
        planData && planData.length > 0 ? planData[0] : null;

    const handleDocumentUpload = async (values: any, { setSubmitting }: any) => {
        const appendedFormData = appendFormData(values);
        return createDocument(appendedFormData)
            .unwrap()
            .then((data) => {
                showToast({ title: "Document Added", type: "success" });
                setSubmitting(false);
                onClose();
            })
            .catch((error) => {
                showToast({ title: error?.data?.message ?? "Error on Saving Documents", type: "error" });
            });
    };

    const initialValues = {
        name: "",
        file: null,
        participantId: participantDetail?.id,
        planId: plan?.id,
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleDocumentUpload,
    });

    return { formik }
}

export default usePlanDocuments;