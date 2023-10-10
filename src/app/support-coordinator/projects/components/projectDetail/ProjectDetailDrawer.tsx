import React from "react";
import { Drawer } from "antd";

import AddTask from "./AddTask";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  projectData,
  selectProject,
  toogleTaskDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useGetByIdQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";
import { CircularLoader } from "@/components/loaders/CircularLoaderleanq_support_coordinator";
import ProjectDetail from "./ProjectDetail";

export interface ProjectDetailDrawerProps {
  open: boolean;
  handleDrawerToogle: () => void;
}

export default function ProjectDetailDrawer({ open, handleDrawerToogle }: any) {
  const { showTaskDrawer, selectedProject } = useAppSelector(projectData);

  const dispatch = useAppDispatch();

  const onChildrenDrawerClose = () => {
    dispatch(toogleTaskDrawer(false));
    dispatch(selectProject(null))
  };

  const { data, isLoading, isFetching, error } = useGetByIdQuery(selectedProject?.id);

  return (
    <Drawer
      title={<div></div>}
      width={600}
      headerStyle={{ border: "none" }}
      closable={false}
      onClose={handleDrawerToogle}
      open={open}
    >
      {isFetching ? <div className="h-full flex items-center justify-center">
        <CircularLoader />
      </div> : <>
        <ProjectDetail data={data} />
        {/* <Drawer
          title="Add Task"
          width={500}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={showTaskDrawer}
        >
          <AddTask />
        </Drawer> */}
      </>}
    </Drawer>
  );
}
