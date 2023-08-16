"use client";

import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";
import { organizationContact } from "@/constants/data/organizationalContactleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";

export default function OrganizationalContactList() {
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
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add new"
          link={routes.addOrganizationalContact}
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
