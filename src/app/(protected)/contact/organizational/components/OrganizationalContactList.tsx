"use client";

import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";

import { useOrganizationalContactListQuery } from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { contactState } from "@/store/features/contact/contactSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { useRouter } from "next/navigation";

export default function OrganizationalContactList() {
  const router = useRouter();
  const { isLoading } = useOrganizationalContactListQuery("");

  const { organizationalContactList, organizationalContactListPagination } =
    useAppSelector(contactState);

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
        paginationMeta={organizationalContactListPagination}
        dataSource={organizationalContactList}
        onRowClick={(data: any) =>
          router.push(routes.editOrganizationalContact(data.id))
        }
        loading={isLoading}
      />
    </div>
  );
}

const columns: any = [
  {
    title: "Name",
    dataIndex: "name",
  },
  { title: "Email", dataIndex: "email" },
  { title: "Phone No", dataIndex: "phone" },
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
