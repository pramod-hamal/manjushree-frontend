"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";
import { useGetAllQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";
import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";
import { data } from "autoprefixer";

function UsersList({ value }: { value: PaginatedTableValue }) {
  const { paginationMeta, setPaginationMeta } = value;
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText
  });

  useEffect(() => {
    if (data && data?.meta) {
      setPaginationMeta(data?.meta);
    }
  }, [data, setPaginationMeta]);

  console.log("data", data);
  if (isLoading === true) {
    return <Skeleton />;
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
          link={routes.addUser}
        />
      </div>
      <CusTable
        onRowClick={(rowData: any) =>
          router.push(routes.userProfile(rowData.id))
        }
        columns={columns}
        dataSource={data ?? []}
        loading={isFetching}
      />
    </div>
  );
}

export default withPaginatedTable(UsersList);

const columns: any = [
  {
    title: "Full Name",
    // sorter: (a: any, b: any) 
    sortDirections: ['descend'],
    render: (data: any) => {
      return (
        <div>
          {data.Name}
        </div>
      );
    },
  },
  { title: "Email", dataIndex: "Email" },
  {
    title: "Phone No", dataIndex: "ContactNo",
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.phone - b.phone,
  },
  {
    title: "Joined Date",
    dataIndex: "JoinDate",
  },{
    title: "Class",
    dataIndex: "Class",
  }
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
