import { useEffect } from "react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";
import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";

import { useLazySupportGroupQuery, useServiceCoordinatorsQuery, useSupportCategoriesQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";
import { useLazyGetChargeListBySupportGroupIdQuery, useLazyGetPlanServiceDetailQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";

export interface ServiceDetailDTO {
    id: number;
    name: string;
    scRate: string;
    budget: string;
    chargeItems: ChargeItem[];
    serviceCoordinator: ServiceCoordinator;
    supportGroup: ServiceCoordinator;
    supportCategory: ServiceCoordinator;
}

export interface ChargeItem {
    id: number;
    rate: string;
    managementType: string;
}

export interface ServiceCoordinator {
    id: number;
}

const useUpdateServiceDetailForm = ({ id }: { id: string | number }) => {
    const { data: serviceCategories } = useSupportCategoriesQuery("");
    const { data: serviceCoordinatorData, error: ServiceCoordinatorError } = useServiceCoordinatorsQuery("");
    const [fetchCategoryGroup, { data: supportGroupData, error: supportGroupError }] = useLazySupportGroupQuery()
    const [fetchChargeList, { data: chargeListData, error: chargeListError }] = useLazyGetChargeListBySupportGroupIdQuery()

    const [fetchPlanServiceDetail, { data, isLoading, isFetching, error }] = useLazyGetPlanServiceDetailQuery()

    const serviceDetail: ServiceDetailDTO = {
        ...data?.data,
        serviceCoordinator: data?.data.serviceCoordinator.id,
        supportGroup: data?.data.supportGroup.id,
        supportCategory: data?.data.supportCategory.id,
    };

    useEffect(() => {
        if (serviceDetail.supportCategory) {
            fetchCategoryGroup(serviceDetail.supportCategory)
        }
    }, [data])

    useEffect(() => {
        if (serviceDetail.supportGroup) {
            fetchChargeList(serviceDetail.supportGroup)
        }
    }, [data])

    useEffect(() => {
        fetchPlanServiceDetail(id)
    }, [id])

    const chargeListDropdown: Dropdown[] = chargeListData?.data ?
        chargeListData.data.map((item: any) => { return { label: item.supportItemName, value: item.id } })
        : []

    const { formik, renderFormFields } = useFormBuilder({
        initialValues: serviceDetail,
        onSubmit: () => { },
        formFields: [
            {
                name: "supportCategory",
                label: "Support Category Type",
                placeHolder: "Select Support Type",
                required: true,
                disabled: true,
                type: "select",
                options: serviceCategories?.data ?? [],
            },
            {
                name: "supportGroup",
                label: "Support Category Group",
                placeHolder: "Support Category Group",
                required: true,
                disabled: true,
                type: "select",
                options: supportGroupData?.data ?? [],
            },
            {
                name: "chargeItem",
                label: "Charge Items",
                placeHolder: "Select Charge Items",
                disabled: true,
                required: true,
                type: "select",
                onChange: () => { },
                options: chargeListDropdown,
            },
            {
                name: "budget",
                label: "Service Budget Amount",
                placeHolder: "Budget Amount",
                disabled: true,
                required: true,
                type: "text",
            },
            {
                name: "serviceCoordinator",
                label: "Employee",
                placeHolder: "Select Employeer",
                disabled: true,
                required: true,
                type: "select",
                options: serviceCoordinatorData?.data ?? []
            },
            {
                name: "scRate",
                label: "Employee Rate",
                placeHolder: "Employee Rate",
                disabled: true,
                required: true,
                type: "text",
            },
        ]
    })

    return { isLoading, isFetching, renderFormFields, formik }
}

export default useUpdateServiceDetailForm;