import React from "react";
import { Metadata } from "next";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import StatusCard, { StatusCardProps } from "./components/StatusCard";
import {
  FolderOutlined,
  MoneyCollectOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ParticipantEnrolledChart = dynamic(
  () => import("./components/ParticipantEnrolledChart"),
  {
    ssr: false,
    loading: () => <>loading</>,
  }
);

import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Support Coordinator Dashboard",
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-4 gap-5">
        {dashboardStatus.map((status: StatusCardProps, index: number) => {
          return (
            <div key={index}>
              <StatusCard
                cardType={status.cardType}
                title={status.title}
                icon={status.icon}
                count={status.count}
                bg={status.bg}
              />
            </div>
          );
        })}
      </div>
      <ParticipantEnrolledChart />
    </div>
  );
}

const dashboardStatus: StatusCardProps[] = [
  {
    title: "Total Budget",
    icon: <MoneyCollectOutlined style={{ fontSize: 20 }} />,
    count: "$ 126,560",
    bg: "bg-white",
    cardType: "budget",
  },
  {
    title: "Total Clients",
    icon: <UserAddOutlined style={{ fontSize: 20 }} />,
    count: "$ 126,560",
    bg: "bg-card-clients",
    cardType: "client",
  },
  {
    title: "Total Employee",
    icon: <UserOutlined style={{ fontSize: 20 }} />,
    count: "$ 126,560",
    bg: "bg-card-employee",
    cardType: "employee",
  },
  {
    title: "Total Projects",
    icon: <FolderOutlined style={{ fontSize: 20 }} />,
    count: "$ 126,560",
    bg: "bg-card-projects",
    cardType: "projects",
  },
];
