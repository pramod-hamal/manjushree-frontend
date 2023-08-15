import React from "react";
import { Drawer } from "antd";

export interface CusDrawerProps {
  open: boolean;
  handleDrawerToogle: any;
  children: React.ReactNode;
  width?: number;
  title?: React.ReactNode;
}

export default function CusDrawer({
  open,
  handleDrawerToogle,
  children,
  title,
  width,
}: CusDrawerProps) {
  return (
    <Drawer
      className="bg-white"
      title={title ?? <div></div>}
      width={width ?? 900}
      headerStyle={{ border: "none" }}
      closable={false}
      onClose={handleDrawerToogle}
      open={open}
    >
      {children}
    </Drawer>
  );
}
