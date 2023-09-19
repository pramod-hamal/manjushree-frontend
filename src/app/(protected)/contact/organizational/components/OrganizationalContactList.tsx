"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

import { withPaginatedTable } from "@/core/hoc/withPaginatedTableleanq_support_coordinator";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { useOrganizationalContactListQuery } from "@/store/features/contact/apiSliceleanq_support_coordinator";

function OrganizationalContactList({ value }: any) {
  const router = useRouter();
  const { paginationMeta, setPaginationMeta } = value;
  const [searchText, setSearchText] = useState("");

  const { isLoading, isFetching, error, data }: any = useOrganizationalContactListQuery({
    limit: paginationMeta.limit,
    page: paginationMeta.page ?? 1,
    searchText
  });

  useEffect(() => {
    let organizationData = data;
    if (organizationData) {
      if (data?.meta) {
        setPaginationMeta(organizationData?.meta);
      }
    }
  }, [data, setPaginationMeta]);

  if (isLoading === true) {
    return <Skeleton />;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="w-[360px]">
        <SearchInput onChange={(e: any) => { setSearchText(e.target.value) }} placeHolder="Search Existing" />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add new"
          link={routes.addOrganizationalContact}
        />
      </div>
      <CusTable
        columns={columns}
        onRowClick={(data: any) =>
          router.push(routes.editOrganizationalContact(data.id))
        }
        dataSource={data?.data ?? []}
        loading={isFetching}
      />
    </div>
  );
}

export default withPaginatedTable(OrganizationalContactList);

const columns: any = [
  {
    title: "Name",
    dataIndex: "name",
  },
  { title: "Email", dataIndex: "email" },
  {
    title: "Phone No", dataIndex: "phone", defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.phone.length - b.phone.length,
  },
  {
    title: "URL",
    dataIndex: "url",
    render: (url: string) => (
      <div className="truncate">
        <span className="text-clip">{url}</span>
      </div>
    ),
  },
];
