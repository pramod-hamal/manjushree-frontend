import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";

export type cardType = "budget" | "client" | "employee" | "projects";

export interface StatusCardProps {
  icon: React.ReactNode;
  title: string;
  count: string | number;
  bg: string;
  cardType: cardType;
}

export default function StatusCard({
  icon,
  title,
  count,
  bg,
  cardType,
}: StatusCardProps) {
  return (
    <div
      className={`h-[165px] rounded shadow hover:scale-105 cursor-pointer transition-all ${
        cardType === "budget" ? "text-black" : "text-white"
      } shadow flex flex-col justify-between p-5 gap-5 ${bg}`}
    >
      <div className="flex justify-between">
        <span className="p-3 hover:scale-105 cursor-pointer shadow text-black bg-white rounded">
          {icon}
        </span>
        <span>
          <InfoCircleOutlined className="hover:scale-105 cursor-pointer" />
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <span className="font-semibold">{title}</span>
        <span className="text-2xl font-semibold">{count}</span>
      </div>
    </div>
  );
}
