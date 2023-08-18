import React from "react";
import type { TablePaginationConfig } from "antd/es/table";
import dynamic from "next/dynamic";
import SkeletonTable from "../loaders/TableSkeleton";
import { PaginationMetaDTO } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";

const ClientTableComponent = dynamic(() => import("antd/es/table"), {
  ssr: false,
  loading: () => <SkeletonTable />,
});

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
  paginationMeta?: PaginationMetaDTO;
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
    paginationMeta,
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
    <ClientTableComponent
      showSorterTooltip={true}
      columns={columns}
      footer={renderFooter}
      rowSelection={getSelectionType}
      dataSource={dataSource}
      bordered={bordered}
      rowClassName={onRowClick ? "cursor-pointer" : ""}
      sticky={sticky}
      pagination={
        paginationMeta
          ? {
              pageSize: paginationMeta.page_total,
              pageSizeOptions: [5, 10, 20, 30, 50, 100],
              total: paginationMeta.total_pages,
              onChange(page, pageSize) {
                console.log(page, pageSize);
              },
            }
          : pagination
      }
      loading={loading}
      onRow={onRow}
    />
  );
}
