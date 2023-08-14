import React from "react";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

export default function ChargeItemList() {
  const columns: any = [
    { title: "Number", dataIndex: "number" },
    { title: "Reference", dataIndex: "reference" },
    { title: "Unit", dataIndex: "unit" },
    { title: "Price", dataIndex: "unit" },
  ];

  return (
    <div className="flex flex-col bg-white gap-5 border-t">
      <div className="flex ">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
      </div>
      <div>
        <CusTable columns={columns} dataSource={[]} loading={false} />
      </div>
    </div>
  );
}
