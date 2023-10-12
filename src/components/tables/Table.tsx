import React, { useEffect, useState } from "react";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import dynamic from "next/dynamic";
import SkeletonTable from "../loaders/TableSkeleton";
import { PaginationMetaDTO } from "@/core/interface/pagination.metaleanq_support_coordinator";

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
    paginationMeta,
    onRowClick,
    renderFooter,
  }: CusTableProps = tableProps;

  const [meta, setMeta] = useState<PaginationMetaDTO | null>(null);

  const getSelectionType = selectionType
    ? {
      type: selectionType ?? undefined,
    }
    : undefined;

  const onRow = (record: any, _: any): any => {
    return {
      onClick: (_: any) => {
        onRowClick ? onRowClick(record) : () => { };
      },
    };
  };

  useEffect(() => {
    if (paginationMeta !== null) {
      setMeta(paginationMeta!);
    }
  }, [paginationMeta]);

  return (
    <ClientTableComponent
      showSorterTooltip={true}
      columns={columns}
      footer={renderFooter}
      rowSelection={getSelectionType}
      dataSource={dataSource}
      bordered={bordered}
      pagination={false}
      rowClassName={onRowClick ? "cursor-pointer" : ""}
      sticky={sticky}
      loading={loading}
      onRow={onRow}
    />
  );
}
