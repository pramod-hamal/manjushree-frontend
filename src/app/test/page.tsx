"use client";

import React from "react";
import { Pagination, Skeleton, Table } from "antd";

import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { useAllParticipantsQuery } from "@/store/features/participants/apiSliceleanq_support_coordinator";
import { ParticipanSliceState } from "@/store/features/participants/interface/participantStateleanq_support_coordinator";
import {
  changePage,
  participantState,
} from "@/store/features/participants/participantSliceleanq_support_coordinator";
import { useDispatch } from "react-redux";

export default function TestPage() {
  const dispatch = useDispatch();

  const { participants, paginationMeta }: ParticipanSliceState =
    useAppSelector(participantState);

  const { isLoading, error }: any = useAllParticipantsQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
  });

  if (isLoading) {
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

  const pg = paginationMeta;

  return (
    <div className="flex flex-col gap-8">
      <Table loading={isLoading} columns={columns} pagination={false} />
      <Pagination
        defaultCurrent={1}
        total={pg.total}
        current={pg.page ?? 1}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        pageSize={pg.page_total}
        onChange={(page) => {
          dispatch(changePage(page));
        }}
      />
    </div>
  );
}
