"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";
import { organizationContact } from "@/constants/data/organizationalContactleanq_support_coordinator";

export default function OrganizationalContactList() {
  const router = useRouter();

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phoneNo" },
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add new"
          onClick={() => router.push(routes.addOrganizationalContact)}
        />
      </div>
      <CusTable
        columns={columns}
        dataSource={organizationContact}
        loading={false}
      />
    </div>
  );
}
