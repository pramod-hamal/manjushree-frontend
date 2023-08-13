"use client";

import { Tabs } from "antd";
import React, { useState } from "react";

export interface CusTabsProps {
  items: any[];
  type: "line" | "card" | "editable-card";
  onTabClick?: any;
}

export default function CusTabs(tabProps: CusTabsProps) {
  const [selectedTab, setSelectedTab] = useState<string>("1");

  /**
   * handle Tab change and set selected key as setSelectedTab
   * @param {any} key:string
   * @returns {void}
   */
  const handleTabChange = (key: string): void => {
    setSelectedTab(key);
  };

  return (
    <Tabs
      activeKey={selectedTab}
      onChange={handleTabChange}
      type={tabProps.type}
      className="border-0"
      items={tabProps.items.map((item: any) => {
        return {
          label: (
            <span
              className={`${
                selectedTab === item.key && "bg-primary-button text-white"
              } py-3 px-3 transition`}
            >
              {item.icon}
              <span>{item.label}</span>
            </span>
          ),
          key: item.key,
          children: <>{item.children}</>,
        };
      })}
    />
  );
}
