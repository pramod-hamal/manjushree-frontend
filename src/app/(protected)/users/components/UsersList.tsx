"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";
import { useGetAllQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";
import { withPaginatedTable } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

function UsersList({ value }: any) {
  const { paginationMeta, setPaginationMeta } = value;

  const router = useRouter();

  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
  });

  useEffect(() => {
    let organizationData = data;
    if (organizationData) {
      if (data?.meta) {
        setPaginationMeta(organizationData?.meta);
      }
    }
  }, [data, setPaginationMeta]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add New"
          link={routes.addUser}
        />
      </div>
      <CusTable
        onRowClick={(rowData: any) =>
          router.push(routes.userProfile(rowData.id))
        }
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isFetching}
      />
    </div>
  );
}

export default withPaginatedTable(UsersList);

const columns: any = [
  {
    title: "Full Name",
    render: (data: any) => {
      return (
        <div>
          {data.firstName} {""} {data.middleName} {""} {data.lastName}
        </div>
      );
    },
  },
  { title: "Email", dataIndex: "email" },
  { title: "Phone No", dataIndex: "phone" },
];

/**
 * Get Status Background Color using user status
 * @param {any} status:string
 * @returns {string | undefined}
 */
const getStatusBackground = (status: string): string | undefined => {
  switch (status) {
    case "active":
      return "bg-status-active";
    case "restricted":
      return "bg-status-restricted";
    case "deactivated":
      return "bg-status-deactivated";
    default:
      break;
  }
};
