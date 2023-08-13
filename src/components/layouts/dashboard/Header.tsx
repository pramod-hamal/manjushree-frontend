import React from "react";

import { Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <div className="h-14 sticky top-0 z-20 bg-white shadow text-black flex items-center justify-between px-5">
      <span className="text-xl">Support Coordinator</span>
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
