"use client";

import React from "react";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";

import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";

import ProfileHeader from "./components/ProfileHeader";
import EdituserForm from "./components/EditUserForm";

const items: any[] = [
  {
    label: "Profile",
    key: "1",
    children: <EdituserForm />,
    icon: <UserOutlined />,
  },
  {
    label: "Role",
    key: "2",
    children: <>Role</>,
    icon: <HeartOutlined />,
  },
];

export default function page() {
  return (
    <div>
      <ProfileHeader />
      <div className="py-5" />
      <CusTabs items={items} type="line" onTabClick={() => {}} />
    </div>
  );
}
