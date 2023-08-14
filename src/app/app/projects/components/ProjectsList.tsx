"use client";

import React, { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ProjectDetailDrawer from "./projectDetail/ProjectDetailDrawer";

function ProjectsList() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <CusTable
        columns={columns}
        onRowClick={() => setOpen(true)}
        dataSource={projects}
        loading={false}
      />
      <ProjectDetailDrawer
        open={open}
        handleDrawerToogle={() => setOpen(false)}
      />
    </div>
  );
}

export default memo(ProjectsList);

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
