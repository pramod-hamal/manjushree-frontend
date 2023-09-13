import React from "react";

import Image from "next/image";
import Avatar from "antd/es/avatar/avatar";
import { useGetMeQuery } from "@/store/features/auth/apiSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { appState } from "@/store/features/appSliceleanq_support_coordinator";

export default function Header() {
  useGetMeQuery("");
  const { user } = useAppSelector(appState);

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between px-5 text-black bg-white shadow h-14">
      <div className="flex items-center gap-4">
        <Image
          height={100}
          width={100}
          alt="Logo"
          className="w-8"
          src="/images/logo.svg"
        />
        <h3 className="text-lg">Support Coordinator</h3>
      </div>
      <div className="flex items-center gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
         {user?.firstName}
        </Avatar>
        <p className="text-sm uppercase">{user?.firstName + " " + user?.lastName}</p>
      </div>
    </div>
  );
}
