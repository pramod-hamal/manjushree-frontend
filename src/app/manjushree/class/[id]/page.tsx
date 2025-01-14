"use client";

import React from "react";
import { ContactsFilled, HeartOutlined, UserOutlined } from "@ant-design/icons";

import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";

import ProfileHeader from "./components/profile/ProfileHeader";
import EdituserForm from "./components/profile/EditUserForm";
import UserRoles from "./components/roles/UserRoles";
import { useGetByIdQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";
import { Skeleton } from "antd";
import ContactList from "./components/contact/ContactList";

const items: any[] = [
  {
    label: "Profile",
    key: "1",
    children: <EdituserForm />,
    icon: <UserOutlined />,
  },
  {
    label: "Contact",
    key: "2",
    children: <ContactList />,
    icon: <ContactsFilled />,
  },
  {
    label: "Role",
    key: "3",
    children: <UserRoles />,
    icon: <HeartOutlined />,
  },
];

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id: string | number = params.id;
  const { data, isLoading } = useGetByIdQuery(id);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div>
      <ProfileHeader />
      <div className="py-5" />
      <CusTabs items={items} type="line" onTabClick={() => {}} />
    </div>
  );
}
