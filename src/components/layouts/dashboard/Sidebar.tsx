"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { routes } from "@/constants/routesleanq_support_coordinator";

export default function Sidebar({ minimize, handleToogle }: any) {
  return (
    <div
      className={`z-20 xs:hidden md:block transition-all bg-gradient-to-br from-violet-600 to-indigo-600 fixed h-[100vh] ${
        minimize ? "w-[55px]" : "w-[13%]"
      } md:block text-white flex flex-col gap-5`}
    >
      <div className="h-full justify-between flex flex-col">
        <div>
          <div onClick={handleToogle} className={`py-5 px-5 cursor-pointer`}>
            <MenuOutlined className="font-semibold" />
          </div>
          <SidebarItems minimize={minimize} />
        </div>
        <div
          className={`py-5 px-5 flex gap-5 hover:text-white hover:bg-primary-danger opacity-75 cursor-pointer`}
        >
          <LogoutOutlined />
          <span className={`${minimize && "hidden"} text-[13px] `}>Logout</span>
        </div>
      </div>
    </div>
  );
}

const SidebarItems = ({ minimize }: any) => {
  const path: string = usePathname();
  return (
    <div>
      {sidebarItems.map((sidebarItem: SidebarItem, index: number) => {
        return (
          <Link
            key={index}
            href={sidebarItem.link}
            className={`flex no-underline ${
              path.includes(sidebarItem.link)
                ? " text-black bg-white"
                : "text-white hover:text-black hover:bg-gray-200"
            } gap-5 items-center  cursor-pointer px-5 text-xs`}
          >
            <div className="py-5">{sidebarItem.icon}</div>
            <p
              className={`transition-all text-sm ${
                !minimize ? "block" : "hidden"
              }`}
            >
              {sidebarItem.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export interface SidebarItem {
  link: string;
  title: string;
  icon: JSX.Element;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    link: routes.dashboard,
    title: "Dashboard",
    icon: <DashboardOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.participants,
    title: "Participants",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.users,
    title: "User",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.projects,
    title: "Projects",
    icon: <UnorderedListOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.roles,
    title: "Role and Permission",
    icon: <UnorderedListOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: "#",
    title: "Contact",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
    children: [
      {
        link: "/dashboard/contact/individual",
        title: "Individual",
        icon: <UserOutlined style={{ fontSize: 14 }} />,
      },
      {
        link: "/dashboard/contact/organizational",
        title: "Organizational",
        icon: <UserOutlined style={{ fontSize: 14 }} />,
      },
    ],
  },
];
