"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";

import { routes } from "@/constants/routesleanq_support_coordinator";
import { users } from "@/constants/data/usersleanq_support_coordinator";

export default function UsersList() {
  const router = useRouter();

  const columns: any = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone No", dataIndex: "phoneNo" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <div
          className={`px-4 text-center py-1  text-white ${getStatusBackground(
            status.toLowerCase()
          )}`}
        >
          {status}
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
        <FlatButton
          icon={<PlusOutlined />}
          title="Add New"
          onClick={() => {
            router.push(routes.addUser);
          }}
        />
      </div>
      <CusTable
        onRowClick={(rowData: any) =>
          router.push(routes.userProfile(rowData.id.$oid))
        }
        columns={columns}
        dataSource={users}
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
