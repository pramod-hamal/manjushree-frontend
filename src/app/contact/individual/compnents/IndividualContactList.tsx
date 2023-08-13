"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

import { individualContact } from "@/constants/data/individualContactleanq_support_coordinator";
import { routes } from "@/constants/routesleanq_support_coordinator";

export default function IndividualContactList() {
  const router = useRouter();

  const columns: any = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phoneNo" },
    { title: "Relation", dataIndex: "relation" },
    { title: "Organization", dataIndex: "organization" },
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
          onClick={() => router.push(routes.addIndividualContact)}
        />
      </div>
      <CusTable
        selectionType="checkbox"
        columns={columns}
        dataSource={individualContact}
        loading={false}
      />
    </div>
  );
}
