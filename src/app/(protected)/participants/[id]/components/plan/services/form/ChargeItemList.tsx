import React from "react";
import { Table } from "antd";

import { useGetChargeItemsQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import SkeletonTable from "@/components/loaders/TableSkeletonleanq_support_coordinator";
import { TableRowSelection } from "antd/es/table/interface";

export default function ChargeItemList({ formik }: any) {
  const { data, error, isLoading, isFetching } = useGetChargeItemsQuery("");

  const columns: any = [
    { title: "Number", dataIndex: "supportItemNumber" },
    { title: "Reference", dataIndex: "reference" },
    { title: "Unit", dataIndex: "unit" },
    { title: "Price", dataIndex: "act" },
  ];

  if (isLoading) {
    return <SkeletonTable />;
  }

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        formik.setFieldValue("chargeItems", [
          ...formik.values.chargeItems,
          { ...record, rate: record.act },
        ]);
      } else {
        const newChargeItems = formik.values.chargeItems.filter(
          (item: any) => item.id !== record.id
        );
        formik.setFieldValue("chargeItems", newChargeItems);
      }
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(selected, selectedRows);
    },
  };
  return (
    <div className="flex flex-col bg-white gap-5 border-t">
      <div className="flex ">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
      </div>
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={
            data?.data.map((item: any, index: number) => {
              return { ...item, key: index };
            }) ?? []
          }
          loading={isFetching}
        />
      </div>
    </div>
  );
}
