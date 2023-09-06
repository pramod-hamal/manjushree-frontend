import React from "react";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { DeleteFilled } from "@ant-design/icons";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";

export default function SelectedChargeItemList({ formik }: any) {
  const columns: any = [
    { title: "Number", dataIndex: "supportItemNumber" },
    { title: "Reference", dataIndex: "reference" },
    { title: "Unit", dataIndex: "unit" },
    {
      title: "Price",
      render: (data: any) => {
        const getIndexOfData = formik.values.chargeItems.indexOf(data);
        return (
          <FormInput
            name={`chargeItems[${getIndexOfData}].rate`}
            errors={null}
            onChange={formik.handleChange}
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
        pagination={false}
        columns={columns}
        dataSource={formik.values.chargeItems}
        loading={false}
      />
    </div>
  );
}
