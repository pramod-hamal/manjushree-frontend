"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BankOutlined,
  ContactsOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { routes } from "@/constants/routesleanq_support_coordinator";
import { AppState, LayoutState, appState, toogleDrawer } from "@/store/features/appSliceleanq_support_coordinator";
import { useAppDispatch, useAppSelector } from "@/store/hooksleanq_support_coordinator";

export default function Sidebar() {
  const { layoutState }: AppState = useAppSelector(appState);
  const dispatch = useAppDispatch();

  const { minimized }: LayoutState = layoutState;
  const handleToogle = () => { dispatch(toogleDrawer(!minimized)) }

  return (
    <div
      className={`z-20 xs:hidden md:block transition-all bg-gradient-to-br from-violet-600 to-indigo-600 fixed h-[100vh] ${minimized ? "w-[55px]" : "w-[13%]"
        } md:block text-white flex flex-col gap-5`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div onClick={handleToogle} className={`py-5 px-5 cursor-pointer`}>
            <MenuOutlined className="font-semibold" />
          </div>
          <SidebarItems minimize={minimized} />
        </div>
        <div
          className={`py-5 px-5 flex gap-5 hover:text-white hover:bg-primary-danger opacity-75 cursor-pointer`}
        >
          <LogoutOutlined />
          <span className={`${minimized && "hidden"} text-[13px] `}>Logout</span>
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
        if (sidebarItem.children) {
          return (
            <SidebarItemsDropdown
              key={index}
              index={index}
              item={sidebarItem}
              minimize={minimize}
            />
          );
        }
        return (
          <Link
            key={index}
            href={sidebarItem.link}
            className={`flex no-underline ${path.includes(sidebarItem.link)
              ? " text-black bg-white"
              : "text-white hover:text-black hover:bg-gray-200"
              } gap-5 items-center  cursor-pointer px-5 text-xs`}
          >
            <div className="py-5">{sidebarItem.icon}</div>
            <p
              className={`transition-all text-sm ${!minimize ? "block" : "hidden"
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

export interface SidebarItemsDropdownProps {
  item: SidebarItem;
  index: number;
  minimize: boolean;
}

const SidebarItemsDropdown = ({
  item,
  index,
  minimize,
}: SidebarItemsDropdownProps) => {
  const path: string = usePathname();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (path.includes("contact")) {
      setShow(true);
    }
  }, [path]);

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        key={index}
        className={`flex no-underline ${minimize && path.includes("/app/contact")
          ? " text-black bg-white"
          : "text-white hover:text-black hover:bg-gray-200"
          } gap-5 items-center justify-between cursor-pointer px-5 text-xs`}
      >
        <div className="flex items-center gap-5">
          <div className="py-5">{item.icon}</div>
          <p
            className={`transition-all text-sm ${!minimize ? "block" : "hidden"
              }`}
          >
            {item.title}
          </p>
        </div>
        {!minimize && (!show ? <ArrowDownOutlined /> : <ArrowUpOutlined />)}
      </div>
      {show && !minimize && (
        <div className="transition-all">
          {item?.children?.map((sidebarItem: any, index: number) => {
            return (
              <Link
                key={index}
                href={sidebarItem.link}
                className={`flex no-underline ${path.includes(sidebarItem.link)
                  ? " text-black bg-white"
                  : "text-white hover:text-black hover:bg-gray-200"
                  } gap-5 items-center  cursor-pointer px-8 text-xs`}
              >
                <div className="py-5">{sidebarItem.icon}</div>
                <p
                  className={`transition-all text-sm ${!minimize ? "block" : "hidden"
                    }`}
                >
                  {sidebarItem.title}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
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
    icon: <TeamOutlined style={{ fontSize: 14 }} />,
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
    icon: <UnlockOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: "#",
    title: "Contact",
    icon: <ContactsOutlined style={{ fontSize: 14 }} />,
    children: [
      {
        link: "/app/contact/individual",
        title: "Individual",
        icon: <UserOutlined style={{ fontSize: 14 }} />,
      },
      {
        link: "/app/contact/organizational",
        title: "Organizational",
        icon: <BankOutlined style={{ fontSize: 14 }} />,
      },
    ],
  },
];
