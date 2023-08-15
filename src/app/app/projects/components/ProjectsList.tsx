"use client";

import React, { memo } from "react";
import { Avatar } from "antd";

import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ProjectDetailDrawer from "./projectDetail/ProjectDetailDrawer";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  clearSelected,
  projectData,
  selectProject,
  toogleProjectDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useProjectListQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";

function ProjectsList() {
  const { showProjectDetailDrawer } = useAppSelector(projectData);
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useProjectListQuery("");

  return (
    <div className="flex flex-col">
      <CusTable
        columns={columns}
        onRowClick={(row: any) => {
          dispatch(selectProject(row));
          dispatch(toogleProjectDrawer(true));
        }}
        dataSource={projects}
        loading={isLoading}
      />
      <ProjectDetailDrawer
        open={showProjectDetailDrawer}
        handleDrawerToogle={() => {
          dispatch(clearSelected());
          dispatch(toogleProjectDrawer(false));
        }}
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
    render: (employees: any[]) => {
      return (
        <div className="flex gap-2">
          {employees.map((employee: any, index: number) => {
            return <div key={index}>{employee.name}</div>;
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
    description: `The individual appears to be in good overall health. They have a
          normal body mass index (BMI) and no known chronic medical conditions.
          They engage in regular exercise and follow a balanced diet. They
          report no significant symptoms such as pain, fatigue, or difficulty
          breathing.`,
    date: "2021/5/8",
    participant: {
      image:
        "https://imgs.search.brave.com/0wcbtBae56MwJ434CvFFHDHKz1ojtYgmt5kof3wfgag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/ODk0MjQ3MzEwODQt/YTVkOGIyMTlhNWJi/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TVRs/OGZIVnpaWElsTWpC/d2NtOW1hV3hsZkdW/dWZEQjhmREI4Zkh3/dyZ3PTEwMDAmcT04/MA",
      name: "John Cena",
    },
    employee: [
      {
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        name: "John Cena",
      },
      {
        image:
          "https://imgs.search.brave.com/0wcbtBae56MwJ434CvFFHDHKz1ojtYgmt5kof3wfgag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/ODk0MjQ3MzEwODQt/YTVkOGIyMTlhNWJi/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TVRs/OGZIVnpaWElsTWpC/d2NtOW1hV3hsZkdW/dWZEQjhmREI4Zkh3/dyZ3PTEwMDAmcT04/MA",
        name: "John Cena",
      },
    ],
    status: "todo",
    tasks: [
      {
        title: "Personal Information",
        description: `Update info does nit work and displays an error personal
              information - update info does not work and displays an error`,
      },
    ],
  },
];
