import React from "react";
import { Drawer } from "antd";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  projectData,
  toogleTaskDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";

import { CircularLoader } from "@/components/loaders/CircularLoaderleanq_support_coordinator";

import ProjectDetail from "./ProjectDetail";
import AddTask from "./AddTask";
import useGetProjectDetail from "../../hook/useGetProjectDetail";

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

  const { data, isFetching, participant, supportCoordinators } = useGetProjectDetail()

  return (
    <Drawer
      width={900}
      styles={{ header: { border: "none" } }}
      closable={false}
      onClose={handleDrawerToogle}
      open={open}
    >
      {isFetching ? <div className="h-full flex items-center justify-center">
        <CircularLoader />
      </div> : <>
        {data && <ProjectDetail data={data} />}
        <Drawer
          title="Add Task"
          width={500}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={showTaskDrawer}
        >
          <AddTask onClose={onChildrenDrawerClose} sc={supportCoordinators} participant={participant} />
        </Drawer>
      </>}
    </Drawer>
  );
}
