"use client";

import React from "react";
import { Skeleton } from "antd";
import {
  BarChartOutlined,
  ContactsOutlined,
  FolderOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useGetUserByIdQuery } from "@/store/features/participants/detail/apiSliceleanq_support_coordinator";

import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";

import ProfileHeader from "./components/ProfileHeader";
import HealthList from "./components/health/HealthList";
import DocumentsList from "./components/documents/DocumentsList";
import ContactList from "./components/contact/ContactList";
import Plan from "./components/plan/Plan";
import Profile from "./components/profile/Profile";

const items: any[] = [
  {
    label: "Profile",
    key: "1",
    children: <Profile />,
    icon: <UserOutlined />,
  },
  {
    label: "Care Plan",
    key: "2",
    children: <HealthList />,
    icon: <HeartOutlined />,
  },
  {
    label: "Documents",
    key: "3",
    children: <DocumentsList />,
    icon: <FolderOutlined />,
  },
  {
    label: "Contact",
    key: "4",
    children: <ContactList />,
    icon: <ContactsOutlined />,
  },
  { label: "Budget", key: "5", children: <Plan />, icon: <BarChartOutlined /> },
];

export default function ParticipantDetail({
  params,
}: {
  params: { id: string };
}) {
  const { isLoading, error }: any = useGetUserByIdQuery(params.id,);

  return (
    <div className="relative">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <ProfileHeader />
          <div className="py-5" />

          <CusTabs items={items} type="line" onTabClick={() => { }} />
        </>
      )}
    </div>
  );
}
