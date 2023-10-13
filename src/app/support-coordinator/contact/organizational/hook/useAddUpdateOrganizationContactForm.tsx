import { useEffect } from "react";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

import useCurrentLocation from "@/core/hooks/currentLocation/useCurrentLocationleanq_support_coordinator";
import { multiFormData } from "@/core/lib/append-form-dataleanq_support_coordinator";
import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { APIBaseResponse } from "@/core/interface/api.responseleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useAddOrganizationalContactMutation, useUpdateOrganizationalContactMutation } from "@/store/features/contact/apiSliceleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import { OrganizationContactDTO } from "../add/interface/add-organization.interface";
import { initialValues, validationSchema, formFields } from "../add/form-utils";

const useAddUpdateOrganizationalContactForm = ({
    editMode,
    value,
}: {
    editMode: boolean | undefined,
    value: any
}) => {
    const router = useRouter();

    const { location, error } = useCurrentLocation();
    const showToast = useToast();

    const [add] = useAddOrganizationalContactMutation();
    const [update] = useUpdateOrganizationalContactMutation();


    const handleAdd = async (
        values: OrganizationContactDTO,
        { setSubmitting }: FormikHelpers<OrganizationContactDTO>
    ) => {
        const formData = multiFormData(values);
        return await add(formData).unwrap().then((_: any) => {
            showToast({ title: "Organization Added", type: "success" });
            router.replace(routes.organizationalContact);
        }).catch((error: any) => {
            const errorData: APIBaseResponse<any> = error.data;
            formik.setErrors(errorData.error)
            showToast({ title: errorData.message, type: "error" });
        }).finally(() => { setSubmitting(false) });
    };

    const handleEdit = async (
        values: OrganizationContactDTO,
        { setSubmitting }: FormikHelpers<OrganizationContactDTO>
    ) => {
        await update(values).unwrap().then(() => {
            showToast({ title: "Update Successfully", type: "success" });
            router.replace(routes.organizationalContact);
        }).catch(() => {
            const errorData: APIBaseResponse<any> = error.data;
            showToast({ title: errorData.message, type: "error" });
        }).finally(() => {
            setSubmitting(false);
        });
    };

    const { formik, renderFormFields } = useFormBuilder({
        initialValues,
        validationSchema,
        formFields,
        onSubmit: editMode === true ? handleEdit : handleAdd,
    });

    useEffect(() => {
        if (editMode === true && value !== null) {
            formik.setValues({
                ...value, address: {
                    ...value.address,
                    latitude: value.address.latitude ? Number(value.address.latitude) : location.lat,
                    longitude: value.address.longitude ? Number(value.address.longitude) : location.lng,
                }
            });
        }
    }, [editMode, value]);


    return { formik, renderFormFields, location }
}
export default useAddUpdateOrganizationalContactForm;
