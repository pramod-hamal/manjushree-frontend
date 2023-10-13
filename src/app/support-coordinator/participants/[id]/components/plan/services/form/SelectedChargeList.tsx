import React from 'react'
import { DeleteFilled } from '@ant-design/icons';

import FormInput from '@/components/form/FormInputleanq_support_coordinator';
import CusSelect from '@/components/form/Selectleanq_support_coordinator';
import CusTable from '@/components/tables/Tableleanq_support_coordinator'

export default function SelectedChargeList({ data, formik, isEdit }: { isEdit?: boolean, data: any[], formik: any }) {
    const columns: any = [
        { title: "Name", dataIndex: isEdit ? ["chargeItem", "supportItemName"] : "supportItemName" },
        { title: "Number", dataIndex: isEdit ? ["chargeItem", "supportItemNumber"] : "supportItemNumber" },
        { title: "Unit", dataIndex: isEdit ? ["chargeItem", "unit"] : "unit", width: 100 },
        {
            title: "Management Type", render: (data: any) => {
                const index = formik.values?.chargeItems?.indexOf(data);
                return <CusSelect
                    errors={formik.errors?.chargeItems?.length > 0 && formik.errors?.chargeItems[index]?.managementType}
                    onChange={(selectedValue: string) => {
                        formik.setFieldValue(`chargeItems[${index}][managementType]`, selectedValue)
                    }}
                    options={[{ label: "NDIA Managed", value: "NDIA Managed" },
                    { label: "Plan Managed", value: "Plan Managed" },
                    { label: "Self Managed", value: "Self Managed" },]}
                    placeHolder='Select Management Type'
                    value={data.managementType} />
            }
        },
        {
            title: "Price",
            render: (data: any) => {
                const index = formik.values?.chargeItems?.indexOf(data);
                return (
                    <FormInput
                        name={``}
                        errors={formik.errors?.chargeItems?.length > 0 && formik.errors?.chargeItems[index]?.rate}
                        onChange={(e: any) => {
                            formik.setFieldValue(`chargeItems[${index}][rate]`, e.target.value)
                        }}
                        value={data.rate}
                    />
                );
            },
            width: 120
        },
    ];
    return (
        <div className='h-[400px] overflow-y-auto'>
            <CusTable
                columns={isEdit ? columns : [...columns, {
                    title: "Action",
                    dataIndex: "",
                    render: (data: any) => {
                        const index = formik.values?.chargeItems?.indexOf(data);
                        const handleElementDelete = () => {
                            if (isEdit) { } else {
                                let newChargeItems = formik.values?.chargeItems;
                                newChargeItems.splice(index, 1);
                                formik.setFieldValue("chargeItems", [...newChargeItems]);
                            }
                        };
                        return <div>
                            <DeleteFilled
                                onClick={handleElementDelete}
                                className="text-primary-danger cursor-pointer "
                                style={{ fontSize: 14 }}
                            />
                        </div>
                    },
                    width: 100
                },]}
                dataSource={data}
                loading={false}
            />
        </div>
    )
}
