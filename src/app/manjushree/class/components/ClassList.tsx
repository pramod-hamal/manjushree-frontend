"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";
import {
  PaginatedTableValue,
  withPaginatedTable,
} from "@/core/hoc/withPaginatedTableleanq_support_coordinator";
import { useGetAllQuery } from "@/store/features/class/apiSliceleanq_support_coordinator";

function ClassList({ value }: { value: PaginatedTableValue }) {
  const { paginationMeta, setPaginationMeta } = value;
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText,
  });
  console.log("class data", data);

  useEffect(() => {
    if (data && data?.meta) {
      setPaginationMeta(data?.meta);
    }
  }, [data, setPaginationMeta]);

  if (isLoading === true) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput
            onChange={(e: any) => {
              setSearchText(e.target.value);
            }}
            placeHolder="Search Existing"
          />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add New"
          link={routes.addClass}
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

export default withPaginatedTable(ClassList);

const columns: any = [
  {
    title: "Instructor",
    // sorter: (a: any, b: any)
    sortDirections: ["descend"],
    render: (data: any) => {
      return <div>{data.instructor}</div>;
    },
  },
  { title: "Name", dataIndex: "name" },
  {
    title: "Description",
    dataIndex: "description",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.phone - b.phone,
  },
  {
    title: "Day",
    dataIndex: "schedule",
    key: "dayOfWeek",
    render: (data: any) => {
      return <div>{data?.dayOfWeek}</div>;
    }
  },
  {
    title: "Start Time",
    dataIndex: "schedule",
    key: "startTime",
    render: (data: any) => {
      return <div>{data?.startTime}</div>;
    }
  },
  {
    title: "End Time",
    dataIndex: "schedule",
    key: "endTime",
    render: (data: any) => {
      return <div>{data?.endTime}</div>;
    }
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
  },
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
