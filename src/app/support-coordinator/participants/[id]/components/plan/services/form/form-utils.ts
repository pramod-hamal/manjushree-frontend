import { FormField } from "@/core/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

export interface ServiceFormFieldsProps {
    serviceCategories: Dropdown[], serviceCoordinatorData: Dropdown[],
    supportGroupData: Dropdown[], chargeListData: Dropdown[],
    onChargeListChage: (selectedValue: number | string) => void
}

export const generateServiceFormValues = (values: any) => {
    return {
        ...values,
        budget: Number(values.budget),
        scRate: Number(values.scRate),
        chargeItems: values.chargeItems.map((item: any) => {
            return {
                id: item.id,
                rate: Number(item.rate),
                managementType: item.managementType
            };
        }),
    }
}

export const formFields = ({ serviceCategories, onChargeListChage, serviceCoordinatorData, supportGroupData, chargeListData }: ServiceFormFieldsProps): FormField[] => [
    {
        name: "supportCategoryId",
        label: "Support Category Type",
        placeHolder: "Select Support Type",
        required: true,
        type: "select",
        options: serviceCategories,
    },
    {
        name: "supportGroupId",
        label: "Support Category Group",
        placeHolder: "Budget Amount",
        required: true,
        type: "select",
        options: supportGroupData,
    },
    {
        name: "chargeItem",
        label: "Charge Items",
        placeHolder: "Select Charge Items",
        required: true,
        type: "select",
        onChange: onChargeListChage,
        options: chargeListData,
    },
    {
        name: "budget",
        label: "Service Budget Amount",
        placeHolder: "Budget Amount",
        required: true,
        type: "text",
    },
    {
        name: "serviceCoordinatorId",
        label: "Employee",
        placeHolder: "Select Employeer",
        required: true,
        type: "select",
        options: serviceCoordinatorData
    },
    {
        name: "scRate",
        label: "Employee Rate",
        placeHolder: "SC Rate",
        required: true,
        type: "text",
    },
];
