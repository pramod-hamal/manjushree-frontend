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
import { useGetAllQuery } from "@/store/features/payment/apiSliceleanq_support_coordinator";

function PaymentList({ value }: { value: PaginatedTableValue }) {
  const { paginationMeta, setPaginationMeta } = value;
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText,
  });

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
          link={routes.addPayment}
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

export default withPaginatedTable(PaymentList);

const columns: any = [
  {
    title: "Name",
    // sorter: (a: any, b: any)
    sortDirections: ["descend"],
    render: (data: any) => {
      return <div>{data?.MemberId?.Name}</div>;
    },
  },
  {
    title: "Email",
    // sorter: (a: any, b: any)
    sortDirections: ["descend"],
    render: (data: any) => {
      return <div>{data?.MemberId?.Email}</div>;
    },
  },
  { title: "Payment Method", dataIndex: "PaymentMethod" },
  {
    title: "Amount",
    dataIndex: "Amount",
    defaultSortOrder: "descend",
  },
  {
    title: "Status",
    render: (data: any) => {
      return <div>{data?.Status ? "Paid" : "Unpaid"}</div>;
    },
  },
  {
    title: "Payment Date",
    dataIndex: "PaymentDate",
  }
];
