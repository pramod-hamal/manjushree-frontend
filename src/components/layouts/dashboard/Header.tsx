import React from "react";

import { Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Header() {
  return (
    <div className="h-14 sticky top-0 z-20 bg-white shadow text-black flex items-center justify-between px-5">
      <div className="flex gap-4 items-center">
        <Image
          height={100}
          width={100}
          alt="Logo"
          className="w-8"
          src="/images/logo.svg"
        />
        <span className="text-lg">Support Coordinator</span>
      </div>
      <div className="flex gap-5 items-center">
        <BellOutlined />
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          U
        </Avatar>
        <p className="text-sm">Chris Thapa</p>
      </div>
    </div>
  );
}
