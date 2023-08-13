import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { Avatar } from "antd";

function ProjectsList() {
  const router = useRouter();

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
    },
    { title: "Date", dataIndex: "date" },
    {
      title: "Participant",
      dataIndex: "participant",
      render: (participant: any) => {
        return (
          <div className="flex gap-5 items-center">
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              C
            </Avatar>
            <span>{participant.name}</span>
          </div>
        );
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      render: (employees: string[]) => {
        return (
          <div className="flex gap-2">
            {employees.map((employee: string, index: number) => {
              return <div key={index}>{employee}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <div
          className={`px-4 text-center py-1  text-white ${getStatusBackground(
            status.toLowerCase()
          )}`}
        >
          {status.toUpperCase()}
        </div>
      ),
      width: 150,
    },
  ];
  return (
    <div className="flex flex-col">
      <CusTable columns={columns} dataSource={projects} loading={false} />
    </div>
  );
}

export default memo(ProjectsList);

const getStatusBackground = (status: string): string | undefined => {
  switch (status) {
    case "completed":
      return "bg-status-active";
    case "todo":
      return "bg-status-restricted";
    case "deactivated":
      return "bg-status-deactivated";
    default:
      break;
  }
};

const projects = [
  {
    name: "Support Coordinator",
    date: "2021/5/8",
    participant: {
      image: "",
      name: "John Cena",
    },
    employee: ["One", "Two"],
    status: "todo",
  },
];
