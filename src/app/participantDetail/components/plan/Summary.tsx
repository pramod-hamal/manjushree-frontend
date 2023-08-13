import { EyeOutlined } from "@ant-design/icons";
import React from "react";

export default function Summary() {
  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5">
      <span className="text-lg font-semibold">Plan Summary</span>
      <div className="flex flex-col gap-5">
        <span className="text-xs text-gray-400">Current Plan</span>
        <div className="flex items-center gap-5 justify-between">
          <span className="font-semibold text-sm">
            02/06/2023 - 01/06/2025{" "}
          </span>
          <span>
            <EyeOutlined className="text-primary-title mr-5" />
          </span>{" "}
        </div>
        <span className="text-xs text-gray-400">Days Remaining</span>
        <div className="flex items-center gap-5 font-semibold justify-between">
          <span className="font-semibold text-sm">54</span>
          <span>
            <EyeOutlined className="text-primary-title mr-5" />
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
