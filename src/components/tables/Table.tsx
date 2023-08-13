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

  const getSelectionType = selectionType
    ? {
        type: selectionType ?? undefined,
      }
    : undefined;

  /**
   * Handle Row Click Events
   * @param {any} record:any
   * @param {any} _:any
   * @returns {any}
   */
  const onRow = (record: any, _: any): any => {
    return {
      onClick: (_: any) => {
        onRowClick(record);
      },
    };
  };

  return (
    <Table
      showSorterTooltip={true}
      columns={columns}
      footer={renderFooter}
      rowSelection={getSelectionType}
      dataSource={dataSource}
      bordered={bordered}
      rowClassName={onRowClick ? "cursor-pointer" : ""}
      sticky={sticky}
      pagination={pagination}
      loading={loading}
      onRow={onRow}
    />
  );
}
