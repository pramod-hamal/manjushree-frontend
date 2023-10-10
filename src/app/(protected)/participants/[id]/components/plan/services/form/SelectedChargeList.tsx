import FormInput from '@/components/form/FormInputleanq_support_coordinator';
import CusSelect from '@/components/form/Selectleanq_support_coordinator';
import CusTable from '@/components/tables/Tableleanq_support_coordinator'
import { DeleteFilled } from '@ant-design/icons';
import React from 'react'

export default function SelectedChargeList() {
    const data = [{ supportItemNumber: "452-45211-4785", "reference": "Viral", "unit": "H", managementType: "NDIA Managed", price: "2500" }]

    const columns: any = [
        { title: "Number", dataIndex: "supportItemNumber" },
        { title: "Reference", dataIndex: "reference" },
        { title: "Unit", dataIndex: "unit" },
        {
            title: "Management Type", render: () => {
                return <CusSelect onChange={() => { }} options={[]} placeHolder='Select Management Type' value={""} />
            }
        },
        {
            title: "Price",
            render: (data: any) => {
                return (
                    <FormInput
                        name={``}
                        errors={null}
                        onChange={() => { }}
                        value={data.rate}
                    />
                );
            },
        },
        {
            title: "Action",
            dataIndex: "",
            render: () => (
                <div>
                    <DeleteFilled
                        className="text-primary-danger cursor-pointer "
                        style={{ fontSize: 14 }}
                    />
                </div>
            ),
        },
    ];
    return (
        <div>
            <CusTable
                columns={columns}
                dataSource={data}
                loading={false}
            />
        </div>
    )
}
