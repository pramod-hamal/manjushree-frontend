import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { DeleteFilled } from "@ant-design/icons";
import React from "react";

export default function SelectedChargeItemList() {
  const columns: any = [
    { title: "Number", dataIndex: "number" },
    { title: "Reference", dataIndex: "reference" },
    { title: "Unit", dataIndex: "unit" },
    { title: "Price", dataIndex: "unit" },
    {
      title: "",
      dataIndex: "",
      render: () => (
        <div>
          <DeleteFilled className="bg-primary-danger" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <CusTable
        pagination={false}
        columns={columns}
        dataSource={[]}
        loading={false}
      />
    </div>
  );
}
