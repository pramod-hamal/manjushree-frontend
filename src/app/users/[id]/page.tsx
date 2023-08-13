"use client";

import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";

const items: any[] = [
  {
    label: "Profile",
    key: "1",
    children: <>Profile</>,
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
