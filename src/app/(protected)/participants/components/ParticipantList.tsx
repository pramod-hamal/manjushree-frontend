"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import { routes } from "@/constants/routesleanq_support_coordinator";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import { participants } from "@/constants/data/participantsleanq_support_coordinator";
import NavigateButton from "@/components/buttons/Navigateleanq_support_coordinator";

export default function ParticipantList() {
  const router = useRouter();
  const columns: any = [
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phoneNo" },
    { title: "NIDS Number", dataIndex: "nidsNo" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: number) => (
        <div
          className={`px-4 text-xs text-center py-2  text-white ${getStatusBackground(
            status
          )}`}
        >
          {getStatusTitle(status)}
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-5">
        <div className="w-[360px]">
          <SearchInput placeHolder="Search Existing" />
        </div>
        <NavigateButton
          icon={<PlusOutlined />}
          title="Add New"
          link={routes.addParticipants}
        />
      </div>
      <CusTable
        onRowClick={(data: any) => {
          router.push(routes.participantDetails);
        }}
        columns={columns}
        dataSource={participants}
        loading={false}
      />
    </div>
  );
}

/**
 * Get Status Background Color using user status
 * @param {any} status:string
 * @returns {string | undefined}
 */
const getStatusBackground = (status: number): string | undefined => {
  switch (status) {
    case 1:
      return "bg-budgetStatus-on";
    case 2:
      return "bg-budgetStatus-over";
    case 3:
      return "bg-budgetStatus-under";
    default:
      break;
  }
};

const getStatusTitle = (status: number): string | undefined => {
  switch (status) {
    case 1:
      return "On Budget";
    case 2:
      return "Over Budget";
    case 3:
      return "Under Budget";
    default:
      break;
  }
};
