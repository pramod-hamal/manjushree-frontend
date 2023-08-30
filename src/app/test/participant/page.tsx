"use client";
import React, { useEffect } from "react";
import { withPaginatedTable } from "../hoc/usePaginatedTable";
import { useAllParticipantsQuery } from "@/store/features/participants/apiSliceleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { Skeleton } from "antd";

function ParticipantTestPage({ value }: any) {
  const { paginationMeta, setPaginationMeta } = value;

  const { isLoading, error, data }: any = useAllParticipantsQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
  });

  useEffect(() => {
    setPaginationMeta({
      ...paginationMeta,
      total_pages: 5,
      total: 12,
      limit: 2,
    });
  }, []);

  useEffect(() => {
    if (data?.meta) {
      setPaginationMeta(data?.meta);
    }
  }, [data]);

  console.log(isLoading);

  if (isLoading === true) {
    return <Skeleton />;
  }

  const columns: any = [
    { title: "First Name", dataIndex: "firstName" },
    { title: "Middle Name", dataIndex: "middleName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phone" },
    { title: "NIDS Number", dataIndex: "ndisNumber" },
  ];

  return (
    <div>
      <CusTable
        onRowClick={(data: any) => {}}
        paginationMeta={paginationMeta}
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isLoading}
      />
    </div>
  );
}

export default withPaginatedTable(ParticipantTestPage);
