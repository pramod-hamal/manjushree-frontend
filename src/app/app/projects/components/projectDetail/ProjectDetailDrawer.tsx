import React, { useState } from "react";
import { Drawer } from "antd";

import ProjectDetail from "./ProjectDetail";
import AddTask from "./AddTask";

export interface ProjectDetailDrawerProps {
  open: boolean;
  handleDrawerToogle: () => void;
}

export default function ProjectDetailDrawer({ open, handleDrawerToogle }: any) {
  const [childrenDrawer, setChildrenDrawer] = useState<boolean>(false);

  const showChildrenDrawer = () => setChildrenDrawer(true);

  const onChildrenDrawerClose = () => setChildrenDrawer(false);

  return (
    <Drawer
      title={<div></div>}
      width={600}
      headerStyle={{ border: "none" }}
      closable={false}
      onClose={handleDrawerToogle}
      open={open}
    >
      <ProjectDetail />

      <Drawer
        title="Add Task"
        width={500}
        closable={false}
        onClose={onChildrenDrawerClose}
        open={childrenDrawer}
      >
        <AddTask />
      </Drawer>
    </Drawer>
  );
}
