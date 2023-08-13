import React from "react";
import { Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";

export interface CusTableProps {
  columns: any[];
  dataSource: any;
  loading: boolean;
  bordered?: boolean;
  sticky?: boolean;
  selectionType?: "checkbox" | "radio";
  renderFooter?: any;
  pagination?: false | TablePaginationConfig | undefined;
  onRowClick?: any;
}

export default function CusTable(tableProps: CusTableProps) {
  const {
    columns,
    dataSource,
    loading,
    bordered = false,
    sticky = true,
    selectionType,
    pagination,
    onRowClick,
    renderFooter,
  }: CusTableProps = tableProps;
  return (
    <Table
      showSorterTooltip={true}
      columns={columns}
      footer={renderFooter}
      rowSelection={
        selectionType
          ? {
              type: selectionType ?? undefined,
            }
          : undefined
      }
      dataSource={dataSource}
      bordered={bordered}
      sticky={sticky}
      pagination={pagination}
      loading={loading}
      onRow={(record: any, _: any) => {
        return {
          onClick: (_: any) => {
            onRowClick(record);
          },
        };
      }}
    />
  );
}
