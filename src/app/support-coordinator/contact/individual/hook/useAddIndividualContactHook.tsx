import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";
import { OpenNotification } from "@/core/lib/toast/interface/toastProvider.interfaceleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import { useAddIndividualContactMutation, useUpdateIndividualContactMutation } from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { useOrganizationContactQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { initialValues, formFields, validationSchema } from "../add/form-utils";
import { AddIndividualContactDTO } from "../interface/contact.interface";

interface AddIndividualContactHookProps { editMode: boolean | undefined }

const useAddIndividualContactHook = ({ editMode }: AddIndividualContactHookProps) => {

    const router: AppRouterInstance = useRouter();
    const showToast: (props: OpenNotification) => any = useToast();

    const { data: organizationContact } = useOrganizationContactQuery("");

    const [addContact] = useAddIndividualContactMutation();
    const [updateContact] = useUpdateIndividualContactMutation();

    const handleAddContact = async (values: AddIndividualContactDTO, { setSubmitting }: FormikHelpers<AddIndividualContactDTO>): Promise<void> =>
        await addContact(values).unwrap().then((_: any) => {
            formik.resetForm();
            showToast({ title: "Contact Created Successfully", type: "success" });
            router.replace(routes.individualContact)
        }).catch((error: any) => {
            console.log(error)
            const errorData: APIBaseResponse<any> = error.data;
            formik.setErrors(errorData.error)
        }).finally(() => { setSubmitting(false) });

    const handleEditContact = async (values: any, { setSubmitting }: FormikHelpers<any>): Promise<void> =>
        await updateContact(values).unwrap().then((_) => {
            showToast({ title: "Contact Updated Successfully", type: "success" });
            router.replace(routes.individualContact);
        }).catch((error) => {
            const errorData: APIBaseResponse<any> = error.data;
            formik.setErrors(errorData.error)
            showToast({ title: errorData.data?.message, type: "error" });
        }).finally(() => {
            setSubmitting(false);
        });

    const { formik, renderFormFields } = useFormBuilder({
        initialValues,
        validationSchema,
        formFields,
        onSubmit: editMode === true ? handleEditContact : handleAddContact,
    });

    return { formik, renderFormFields, organizationContact }
}

export default useAddIndividualContactHook;