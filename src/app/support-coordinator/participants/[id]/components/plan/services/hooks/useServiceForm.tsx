import { useEffect } from "react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";
import { FormField } from "@/core/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useLazySupportGroupQuery, useServiceCoordinatorsQuery, useSupportCategoriesQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { useAddPlanServiceMutation, useLazyGetChargeListBySupportGroupIdQuery, useParticipantPlanQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { PlanInterface, PlanResponse } from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";

import { formFields, generateServiceFormValues } from "../form/form-utils";

export interface ServiceFormHookProps {
    serviceFormik: { formik: any, renderFormFields: any }
}

interface InitialValues {
    name: string,
    // managementType: string,
    budget: number,
    participantId: number,
    planId: number,
    scRate: number,
    serviceCoordinatorId: number | null,
    chargeItem?: null,
    chargeItems: any[],
}

const useServiceFormHook = (onClose: any): ServiceFormHookProps => {
    const showToast = useToast();
    const { participantDetail } = useAppSelector(participantDetailState);

    const { data } = useParticipantPlanQuery(participantDetail?.id!);
    const { data: serviceCategories } = useSupportCategoriesQuery("");
    const { data: serviceCoordinatorData, error } = useServiceCoordinatorsQuery("");

    const [fetchCategoryGroup, { data: supportGroupData, error: supportGroupError }] = useLazySupportGroupQuery()
    const [fetchChargeList, { data: chargeListData, error: chargeListError }] = useLazyGetChargeListBySupportGroupIdQuery()

    const [add] = useAddPlanServiceMutation();

    const planData: PlanResponse | undefined = data?.data;
    const plan: PlanInterface | null = planData && planData.length > 0 ? planData[0] : null;

    const initialValues: InitialValues = {
        name: "",
        // managementType: "",
        budget: 0,
        participantId: participantDetail?.id!,
        planId: plan?.id!,
        scRate: 0,
        serviceCoordinatorId: null,
        chargeItem: null,
        chargeItems: [],
    }

    const findChargeItemById = (id: string | number): any[] => chargeListData?.data?.filter((item: any) => item.id === id);

    const chargeListDropdown: Dropdown[] = chargeListData?.data ?
        chargeListData.data.map((item: any) => { return { label: item.supportItemName, value: item.id } })
        : []

    const serviceFormFields = ({ onChargeListChage }: any): FormField[] => formFields({
        serviceCategories: serviceCategories?.data ?? [],
        serviceCoordinatorData: serviceCoordinatorData?.data ?? [],
        supportGroupData: supportGroupData?.data ?? [],
        chargeListData: chargeListDropdown,
        onChargeListChage: onChargeListChage
    })
    const doesChargeItemExists = (id: string | number): boolean => formik.values?.chargeItems?.filter((item: any) => item.id === id).length > 0 ? true : false;

    const onSubmit = async (values: any) => {
        const serviceValue = generateServiceFormValues(values);
        delete serviceValue.chargeItem;
        return await add(serviceValue).unwrap()
            .then((data) => {
                showToast({ title: "Service Added", type: "success" });
                formik.resetForm();
                onClose()
            })
            .catch((err: any) => { formik.setErrors(err?.data?.error); })
            .finally(() => { });
    }

    const { formik, renderFormFields } = useFormBuilder({
        initialValues, onSubmit,
        formFields: serviceFormFields({
            onChargeListChage: (selectedValue: number | string) => {
                if (doesChargeItemExists(selectedValue)) {
                    showToast({ title: "Item already Selected", type: "warning" })
                } else {
                    formik.setFieldValue("chargeItems",
                        [...formik.values.chargeItems, findChargeItemById(selectedValue)[0]]
                    )
                }
            }
        })
    });

    useEffect(() => {
        if (formik.values.supportCategoryId) {
            fetchCategoryGroup(formik.values.supportCategoryId);
        }
    }, [formik.values.supportCategoryId])

    useEffect(() => {
        if (formik.values.supportGroupId) {
            fetchChargeList(formik.values.supportGroupId);
        }
    }, [formik.values.supportGroupId])

    return {
        serviceFormik: { renderFormFields, formik },
    }
}

export default useServiceFormHook