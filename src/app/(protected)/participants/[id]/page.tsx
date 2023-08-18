"use client";

import {
  BarChartOutlined,
  ContactsOutlined,
  EditFilled,
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
import { useGetUserByIdQuery } from "@/store/features/participants/detail/apiSliceleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  ParticipantDetailSlice,
  participantDetailState,
} from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { Skeleton } from "antd";

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

export default function ParticipantDetail({
  params,
}: {
  params: { id: string };
}) {
  const { isLoading }: any = useGetUserByIdQuery(params.id);

  return (
    <div className="relative">
      <ProfileHeader />
      <div className="py-5" />
      {isLoading ? (
        <Skeleton />
      ) : (
        <CusTabs items={items} type="line" onTabClick={() => {}} />
      )}
    </div>
  );
}
