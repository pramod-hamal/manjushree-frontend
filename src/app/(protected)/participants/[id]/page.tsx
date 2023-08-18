"use client";

import {
  BarChartOutlined,
  ContactsOutlined,
  FileOutlined,
  FolderOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import CusTabs from "@/components/tabs/Tabsleanq_support_coordinator";
import HealthList from "./components/health/HealthList";
import DocumentsList from "./components/documents/DocumentsList";
import ContactList from "./components/contact/ContactList";
import Plan from "./components/plan/Plan";
import NotesList from "./components/notes/NotesList";
import Profile from "./components/profile/Profile";

const items: any[] = [
  {
    label: "Profile",
    key: "1",
    children: <Profile />,
    icon: <UserOutlined />,
  },
  {
    label: "Health",
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
  { label: "Plan", key: "5", children: <Plan />, icon: <BarChartOutlined /> },
  { label: "Memo", key: "6", children: <NotesList />, icon: <FileOutlined /> },
];

export default function ParticipantDetail() {
  return (
    <div>
      <ProfileHeader />
      <div className="py-5" />
      <CusTabs items={items} type="line" onTabClick={() => {}} />
    </div>
  );
}