import React from 'react'
import { DeleteFilled } from '@ant-design/icons';

import FormInput from '@/components/form/FormInputleanq_support_coordinator';
import CusSelect from '@/components/form/Selectleanq_support_coordinator';
import CusTable from '@/components/tables/Tableleanq_support_coordinator'

export default function SelectedChargeList({ data, formik }: { data: any[], formik: any }) {
    const columns: any = [
        { title: "Name", dataIndex: "supportItemName" },
        { title: "Number", dataIndex: "supportItemNumber" },
        { title: "Unit", dataIndex: "unit", width: 100 },
        {
            title: "Management Type", render: (data: any) => {
                const index = formik.values?.chargeItems?.indexOf(data);
                return <CusSelect
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
                        errors={null}
                        onChange={(e: any) => {
                            formik.setFieldValue(`chargeItems[${index}][rate]`, e.target.value)
                        }}
                        value={data.rate}
                    />
                );
            },
            width: 120
        },
        {
            title: "Action",
            dataIndex: "",
            render: (data: any) => {
                const index = formik.values?.chargeItems?.indexOf(data);
                const handleElementDelete = () => {
                    let newChargeItems = formik.values?.chargeItems;
                    newChargeItems.splice(index, 1);
                    formik.setFieldValue("chargeItems", [...newChargeItems]);
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
        },
    ];
    return (
        <div className='h-[400px] overflow-y-auto'>
            <CusTable
                columns={columns}
                dataSource={data}
                loading={false}
            />
        </div>
    )
}
