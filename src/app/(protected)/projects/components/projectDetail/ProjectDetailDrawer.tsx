import React, { useState } from "react";
import { Drawer } from "antd";

import ProjectDetail from "./ProjectDetail";
import AddTask from "./AddTask";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  projectData,
  toogleTaskDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";

export interface ProjectDetailDrawerProps {
  open: boolean;
  handleDrawerToogle: () => void;
}

export default function ProjectDetailDrawer({ open, handleDrawerToogle }: any) {
  const { showTaskDrawer } = useAppSelector(projectData);

  const dispatch = useAppDispatch();

  const onChildrenDrawerClose = () => {
    dispatch(toogleTaskDrawer(false));
  };

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
        open={showTaskDrawer}
      >
        <AddTask />
      </Drawer>
    </Drawer>
  );
}
