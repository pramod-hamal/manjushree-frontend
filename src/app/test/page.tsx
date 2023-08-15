"use client";

import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

export default function page() {
  return (
    <div className="m-auto h-screen flex flex-col justify-center w-[200px] gap-5">
      <RangePicker
        cellRender={(current, info) => {
          if (info.type !== "date") return info.originNode;
          const style: React.CSSProperties = {};
          if (current.date() === 1) {
            style.border = "1px solid #1677ff";
            style.borderRadius = "50%";
          }
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }}
      />
    </div>
  );
}
