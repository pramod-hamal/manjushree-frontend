"use client";

import React from "react";
import { PlusOutlined } from "@ant-design/icons";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";
import { useIndividualContactListQuery } from "@/store/features/contact/apiSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { contactState } from "@/store/features/contact/contactSliceleanq_support_coordinator";

export default function IndividualContactList() {
  const { isLoading, error } = useIndividualContactListQuery("");

  const { individialContactList } = useAppSelector(contactState);

  const columns: any = [
    {
      title: "Full Name",
      dataIndex: "name",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phone" },
    { title: "Relation", dataIndex: "relation" },
    { title: "Organization", dataIndex: "organization" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add New"
          link={routes.addIndividualContact}
        />
      </div>
      <CusTable
        selectionType="checkbox"
        columns={columns}
        dataSource={individialContactList}
        loading={isLoading}
      />
    </div>
  );
}
