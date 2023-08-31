"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { useAllParticipantsQuery } from "@/store/features/participants/apiSliceleanq_support_coordinator";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";
import { withPaginatedTable } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

function ParticipantList({ value }: any) {
  const router = useRouter();
  const { paginationMeta, setPaginationMeta } = value;

  const { isLoading, isFetching, error, data }: any = useAllParticipantsQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
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

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
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
  { title: "First Name", dataIndex: "firstName" },
  { title: "Middle Name", dataIndex: "middleName" },
  { title: "Last Name", dataIndex: "lastName" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone No", dataIndex: "phone" },
  { title: "NIDS Number", dataIndex: "ndisNumber" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: number) => (
      <div
        className={`px-4 text-xs text-center py-2  text-white ${getStatusBackground(
          status
        )}`}
      >
        {getStatusTitle(status)}
      </div>
    ),
    width: 150,
  },
];

/**
 * Get Status Background Color using user status
 * @param {any} status:string
 * @returns {string | undefined}
 */
const getStatusBackground = (status: number): string | undefined => {
  switch (status) {
    case 1:
      return "bg-budgetStatus-on";
    case 2:
      return "bg-budgetStatus-over";
    case 3:
      return "bg-budgetStatus-under";
    default:
      break;
  }
};

const getStatusTitle = (status: number): string | undefined => {
  switch (status) {
    case 1:
      return "On Budget";
    case 2:
      return "Over Budget";
    case 3:
      return "Under Budget";
    default:
      break;
  }
};
