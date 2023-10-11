"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { withPaginatedTable } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { useAllParticipantsQuery } from "@/store/features/participants/apiSliceleanq_support_coordinator";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";

function ParticipantList({ value }: any) {
  const router = useRouter();
  const { paginationMeta, setPaginationMeta } = value;

  const [searchText, setSearchText] = useState("");

  const { isLoading, isFetching, error, data }: any = useAllParticipantsQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText
  });

  useEffect(() => {
    let organizationData = data;
    if (organizationData) {
      if (organizationData?.meta) {
        setPaginationMeta(organizationData?.meta);
      }
    }
  }, [data, setPaginationMeta]);

  if (isLoading === true) {
    return <Skeleton />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput onChange={(e: any) => { setSearchText(e.target.value) }} placeHolder="Search Existing" />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add New"
          link={routes.addParticipants}
        />
      </div>
      <CusTable
        onRowClick={(data: any) => {
          const id = data.id;
          router.push(routes.participantDetails(id));
        }}
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isFetching}
      />
    </div>
  );
}
export default withPaginatedTable(ParticipantList);

const columns: any = [
  {
    title: "First Name", dataIndex: "firstName",
    sorter: (a: any, b: any) => a.firstName.length - b.firstName.length,
    sortDirections: ['descend'],
  },
  { title: "Middle Name", dataIndex: "middleName" },
  { title: "Last Name", dataIndex: "lastName" },
  { title: "Email", dataIndex: "email" },
  {
    title: "Phone No", dataIndex: "phone",
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.phone - b.phone,
  },
  {
    title: "NIDS Number", dataIndex: "ndisNumber",
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.ndisNumber - b.ndisNumber,
  },
];