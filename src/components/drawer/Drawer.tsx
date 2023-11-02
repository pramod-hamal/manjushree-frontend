import React from "react";
import { Drawer } from "antd";

export interface CusDrawerProps {
  open: boolean;
  handleDrawerToogle: any;
  children: React.ReactNode;
  width?: number | string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function CusDrawer({
  open,
  handleDrawerToogle,
  children,
  footer,
  title,
  width,
}: CusDrawerProps) {
  return (
    <Drawer
      footer={footer ?? <></>}
      className="bg-white"
      title={title ?? <div></div>}
      width={width ?? 900}
      styles={{ header: { border: "none" } }}
      closable={false}
      onClose={handleDrawerToogle}
      open={open}
    >
      {children}
    </Drawer>
  );
}
