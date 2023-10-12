import React, { useEffect } from "react";
import { Drawer } from "antd";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import {
  projectData,
  toogleTaskDrawer,
} from "@/store/features/projects/projectSliceleanq_support_coordinator";
import { useLazyGetByIdQuery } from "@/store/features/projects/apiSliceleanq_support_coordinator";

import { CircularLoader } from "@/components/loaders/CircularLoaderleanq_support_coordinator";

import ProjectDetail from "./ProjectDetail";
import AddTask from "./AddTask";

export interface ProjectDetailDrawerProps {
  open: boolean;
  handleDrawerToogle: () => void;
}

export default function ProjectDetailDrawer({ open, handleDrawerToogle }: any) {
  const { showTaskDrawer, selectedProject } = useAppSelector(projectData);

  const dispatch = useAppDispatch();

  const onChildrenDrawerClose = () => {
    dispatch(toogleTaskDrawer(false));
  };

  const [fetch, { data, isLoading, isFetching, error }] = useLazyGetByIdQuery();

  const supportCoordinators: Dropdown[] = data?.supportCoordinators?.map((sc: any) => {
    return { label: sc.firstName + sc.middleName ?? " " + sc.lastName ?? " ", value: sc.id }
  });
  const participant: Dropdown[] = [{
    label: data?.participant?.firstName + data?.participant?.middleName ?? " " + data?.participant?.lastName,
    value: data?.participant?.id
  }]

  useEffect(() => {
    if (selectedProject) {
      fetch(selectedProject?.id);
    }
  }, [fetch, selectedProject])

  return (
    <Drawer
      width={900}
      headerStyle={{ border: "none" }}
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
